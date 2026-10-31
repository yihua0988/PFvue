<template>
 <main class="content dashboard-page">
    
   <!-- 1. 簡潔置中的主標題與副標題 -->
   <header class="page-header">
     <h1 class="dashboard-title">🏠我住的縣市安全嗎？各縣市詐騙熱度比較</h1>
     <p class="dashboard-subtitle">
        結合警政報案統計與戶政實際人口，帶您看懂各縣市「真實受騙密度」與「近期增減趨勢」
     </p>
   </header>

    <div class="subpages" style="grid-template-columns: repeat(5, 1fr); margin: 0 auto;">
	  <router-link to="/fraud-patterns" :class="{ 'router-link-exact-active': $route.path === '/fraud-patterns' }"><i class="fas fa-map-marked-alt"></i>&nbsp;我住的縣市安全嗎？</router-link>
	  <router-link to="/fraud-trends" :class="{ 'router-link-exact-active': $route.path === '/fraud-trends' }"><i class="fas fa-users"></i>&nbsp;哪種人最容易被騙？</router-link>
	  <router-link to="/fraud-interception" :class="{ 'router-link-exact-active': $route.path === '/fraud-interception' }"><i class="fas fa-phone-slash"></i>&nbsp;假電話與盜刷防範</router-link>
	  <router-link to="/anti-fraud-results" :class="{ 'router-link-exact-active': $route.path === '/anti-fraud-results' }"><i class="fas fa-shield-alt"></i>&nbsp;警示戶與打詐成效</router-link>
	  <router-link to="/one-page-scam" :class="{ 'router-link-exact-active': $route.path === '/one-page-scam' }"><i class="fas fa-shopping-cart"></i>&nbsp;假網購長怎樣？</router-link>
	</div>
   <!-- 讀取中狀態 -->
   <div v-if="isLoading" class="status-box">
     <div class="spinner"></div>
     <h2>⏳正在從雲端載入統計資料...</h2>
   </div>

   <!-- 錯誤狀態 -->
   <div v-else-if="errorMsg" class="status-box error">
     <h2>⚠️資料讀取失敗</h2>
     <p>{{ errorMsg }}</p>
   </div>

   <!-- 3. 主體視覺化內容 -->
   <template v-else>
      
     <!-- 頂部 3 張一目了然的 KPI 摘要卡 (大字結論 + 一句話說明) -->
     <section class="kpi-grid">
       <div class="kpi-card kpi-danger">
         <div class="kpi-header">
           <span class="kpi-badge badge-red">🎯期間受騙密度最高</span>
           <span class="kpi-period-hint">{{ periodLabel }}</span>
         </div>
         <div class="kpi-main-row">
           <span class="kpi-city">{{ topRateCity.city }}</span>
           <span class="kpi-highlight text-red">每萬人{{ topRateCity.per10kRate }}件<small>/月</small></span>
         </div>
         <p class="kpi-desc">
            扣除人口多寡影響後，相當於每月案發率<strong>{{ topRateCity.probPct }}%</strong>期間累計{{ topRateCity.totalCases.toLocaleString() }}件）
         </p>
       </div>

       <div class="kpi-card kpi-warning">
         <div class="kpi-header">
           <span class="kpi-badge badge-amber">📈較前一期升溫最快</span>
           <span class="kpi-period-hint">對比前{{ monthCount }}個月</span>
         </div>
         <div class="kpi-main-row">
           <span class="kpi-city">{{ topRisingCity.city }}</span>
           <span :class="['kpi-highlight', topRisingCity.changePct >0 ? 'text-red' : 'text-green']">
              {{ formatChange(topRisingCity.changePct) }}
           </span>
         </div>
         <p class="kpi-desc">
            每萬人月均件數由前期<strong>{{ topRisingCity.prevPer10kRate }}件</strong>變化至本期<strong>{{ topRisingCity.per10kRate }}件</strong>
         </p>
       </div>

       <div class="kpi-card kpi-info">
         <div class="kpi-header">
           <span class="kpi-badge badge-blue">🚔全台期間累計規模</span>
           <span class="kpi-period-hint">共{{ monthCount }}個月總計</span>
         </div>
         <div class="kpi-main-row">
           <span class="kpi-city">{{ totalPeriodCases.toLocaleString() }}<small>件</small></span>
           <span class="kpi-highlight text-blue">破獲率{{ avgClearanceRate }}%</span>
         </div>
         <p class="kpi-desc">
            期間累計報案被害人<strong>{{ totalPeriodVictims.toLocaleString() }}人次</strong>｜查獲嫌犯<strong>{{ totalPeriodSuspects.toLocaleString() }}人次</strong>
         </p>
       </div>
     </section>

     <!-- 4. 清楚分區的雙層篩選控制列 -->
     <section class="filter-panel">
       <!-- 第一排：步驟 1 選時間 -->
       <div class="filter-row">
         <div class="filter-group">
           <span class="step-tag">步驟1</span>
           <span class="filter-title">選擇查詢期間：</span>
           <div class="btn-group">
             <button :class="['pill-btn', { active: presetPeriod === '3m' }]" @click="applyPreset('3m')">近3個月</button>
             <button :class="['pill-btn', { active: presetPeriod === '6m' }]" @click="applyPreset('6m')">近6個月</button>
             <button :class="['pill-btn', { active: presetPeriod === '1y' }]" @click="applyPreset('1y')">近1年</button>
             <button :class="['pill-btn', { active: presetPeriod === '3y' }]" @click="applyPreset('3y')">近3年</button>
           </div>
         </div>

         <div class="custom-date-box">
           <span class="date-label">自訂區間：</span>
           <select v-model.number="startYear" class="clean-select" @change=" onCustomDateChange()">
             <option v-for="y in yearOptions" :key="'sy'+y" :value="y">民國{{ y - 1911 }}年</option>
           </select>
           <select v-model.number="startMonth" class="clean-select" @change="onCustomDateChange()">
             <option v-for="m in 12" :key="'sm'+m" :value="m">{{ m }}月</option>
           </select>
           <span class="date-sep">～</span>
           <select v-model.number="endYear" class="clean-select" @change="onCustomDateChange()">
             <option v-for="y in yearOptions" :key="'ey'+y" :value="y">民國{{ y - 1911 }}年</option>
           </select>
           <select v-model.number="endMonth" class="clean-select" @change="onCustomDateChange()">
             <option v-for="m in 12" :key="'em'+m" :value="m">{{ m }}月</option>
           </select>
         </div>
       </div>

       <div class="filter-divider"></div>

       <!-- 第二排：步驟 2 選指標 + 離島開關 -->
       <div class="filter-row">
         <div class="filter-group">
           <span class="step-tag">步驟2</span>
           <span class="filter-title">選擇排行方式：</span>
           <div class="btn-group">
             <button :class="['mode-tab', { active: sortBy === 'rate' }]" @click="sortBy = 'rate'">
                🎯按「每萬人受騙件數」排行(最準確)
             </button>
             <button :class="['mode-tab', { active: sortBy === 'change' }]" @click="sortBy = 'change'">
                📈按「較前一期增減幅度」排行
             </button>
             <button :class="['mode-tab', { active: sortBy === 'raw' }]" @click="sortBy = 'raw'">
                📊按「期間發生總件數」排行
             </button>
           </div>
         </div>

         <label class="clean-checkbox">
           <input type="checkbox" v-model="excludeIslands" />
           <span>排除離島小樣本極端值(金門/連江/澎湖)</span>
         </label>
       </div>
     </section>

     <!-- 5. 左右雙欄主視覺看板 -->
     <section class="dashboard-main-grid">
        
       <!-- 左欄：各縣市互動排行榜 -->
       <div class="card-box ranking-card">
         <div class="box-header">
           <div>
             <h2>📊{{ periodLabel }}各縣市排行（共{{ monthCount }}個月</h2>
             <p class="box-subtitle">
                👆<strong>點擊下方任一縣市</strong>，右側會即時更新該縣市的詳細診斷報告
             </p>
           </div>
         </div>

         <!-- 表頭欄位說明 -->
         <div class="ranking-table-head">
           <span>排名/縣市</span>
           <span>視覺化比例尺</span>
           <span style="text-align: right;">
              {{ sortBy === 'rate' ? '每月每萬人件數(較前期)' : sortBy === 'change' ? '較前期增減率(每萬人)' : '期間總件數(較前期)' }}
           </span>
         </div>

         <!-- 縣市列表 -->
         <div class="ranking-list">
           <div 
              v-for="(item, index) in sortedCities" 
              :key="item.city"
              :class="['rank-row', { active: selectedCityName === item.city }]"
              @click="selectedCityName = item.city"
            >
             <!-- 左：名次與縣市名 -->
             <div class="rank-city-col">
               <span :class="['rank-num', getRankBadgeClass(index)]">{{ index + 1 }}</span>
               <span class="rank-city-name">{{ item.city }}</span>
             </div>

             <!-- 中：長條圖 -->
             <div class="rank-bar-col">
               <div class="bar-bg">
                 <div 
                    class="bar-fg" 
                    :style="{ 
                      width: getBarWidth(item) + '%',
                      background: getBarColor(index, item)
                    }"
                  ></div>
               </div>
             </div>

             <!-- 右：數值與增減標籤 -->
             <div class="rank-val-col">
               <template v-if="sortBy === 'rate'">
                 <span class="primary-val"><strong>{{ item.per10kRate }}</strong>件/萬人</span>
                 <span :class="['delta-pill', getTrendClass(item.changePct)]">
                    {{ formatChange(item.changePct) }}
                 </span>
               </template>
               <template v-else-if="sortBy === 'change'">
                 <span :class="['primary-val', item.changePct >0 ? 'text-red' : 'text-green']">
                   <strong>{{ formatChange(item.changePct) }}</strong>
                 </span>
                 <span class="delta-pill pill-neutral">{{ item.per10kRate }}件/萬人</span>
               </template>
               <template v-else>
                 <span class="primary-val"><strong>{{ item.totalCases.toLocaleString() }}</strong>件</span>
                 <span :class="['delta-pill', getTrendClass(item.changePct)]">
                    {{ formatChange(item.changePct) }}
                 </span>
               </template>
             </div>
           </div>
         </div>
       </div>

       <!-- 右欄：選中縣市深度體檢卡 (支援 Sticky 跟隨捲動) -->
       <div class="card-box detail-card" v-if="currentCity">
          
         <!-- 縣市藍色橫幅 -->
         <div class="detail-banner">
           <div>
             <span class="banner-tag">📍{{ periodLabel }}期間診斷報告</span>
             <div class="banner-title-row">
               <h2>{{ currentCity.city }}</h2>
               <span class="banner-rank-pill">目前排行第{{ currentCityRank }}名</span>
             </div>
           </div>
           <div class="banner-pop">
             <span>期間平均人口</span>
             <strong>{{ (currentCity.avgPop/10000).toFixed(1) }}萬人</strong>
           </div>
         </div>

         <!-- 4 格清晰數據盒 -->
         <div class="metrics-2x2">
           <div class="metric-item">
             <span class="metric-title">🎯每萬人月均發生</span>
             <div class="metric-value text-red">
                {{ currentCity.per10kRate }}<small>件/萬人</small>
             </div>
             <span class="metric-note">相當於月均發生機率{{ currentCity.probPct }}%</span>
           </div>

           <div class="metric-item">
             <span class="metric-title">📈與前{{ monthCount }}個月相比</span>
             <div :class="['metric-value', currentCity.changePct >0 ? 'text-red' : 'text-green']">
                {{ formatChange(currentCity.changePct) }}
             </div>
             <span class="metric-note">前一期為每萬人{{ currentCity.prevPer10kRate }}件/月</span>
           </div>

           <div class="metric-item">
             <span class="metric-title">🚨期間累計發生件數</span>
             <div class="metric-value text-orange">
                {{ currentCity.totalCases.toLocaleString() }}<small>件</small>
             </div>
             <span class="metric-note">累計報案被害人{{ currentCity.totalVictims.toLocaleString() }}人次</span>
           </div>

           <div class="metric-item">
             <span class="metric-title">🚔期間破獲與查獲嫌犯</span>
             <div class="metric-value text-purple">
                {{ currentCity.totalCleared.toLocaleString() }}<small>件 ({{ currentCity.clearanceRate }}%)</small>
             </div>
             <span class="metric-note">查獲詐欺嫌疑犯{{ currentCity.totalSuspects.toLocaleString() }}人次</span>
           </div>
         </div>

         <!-- 被害人 vs 嫌疑犯 視覺化比例條 -->
         <div class="compare-block">
           <div class="compare-header">
             <h4>⚖️【{{ currentCity.city }}】報案被害人vs.查獲嫌疑犯人數對比</h4>
           </div>
           <div class="compare-bar">
             <div 
                class="compare-seg seg-victim" 
                :style="{ width: getVictimRatio(currentCity) + '%' }"
              >
                被害人{{ currentCity.totalVictims.toLocaleString() }}人({{ getVictimRatio(currentCity) }}%)
             </div>
             <div 
                class="compare-seg seg-suspect" 
                :style="{ width: (100 - getVictimRatio(currentCity)) + '%' }"
              >
                嫌疑犯{{ currentCity.totalSuspects.toLocaleString() }}人({{ 100 - getVictimRatio(currentCity) }}%)
             </div>
           </div>
           <p class="compare-caption">
              💡 警政統計中「嫌疑犯」人數幾乎與「被害人」相當！提醒民眾：切勿因求職、貸款而寄出提款卡或提供網銀帳密，以免淪為洗錢共犯。
           </p>
         </div>

         <!-- 保命防詐的三個習慣 -->
         <div class="habits-block">
           <h4>🛡️ 保命防詐的三個習慣</h4>
           <ol class="habits-list">
             <li>
               <strong>看到「穩賺不賠、老師帶牌」先關掉：</strong>
                LINE投資群組裡每天貼獲利對帳單的成員，全都是詐騙集團自己人演的樁腳。
             </li>
             <li>
               <strong>找工作、辦貸款「不寄卡、不給密碼」：</strong>
                只要要求「寄送提款卡核對金流、美化帳戶才能貸款」，100%是騙取人頭帳戶！
             </li>
             <li>
               <strong>接到「+886開頭」或「解除分期」先掛斷：</strong>
                ATM只有匯款與提款功能，絕對沒有「解除分期設定」或「身分認證」功能。
             </li>
           </ol>
         </div>

       </div>

     </section>
   </template>

 </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_KEY

const isLoading = ref(true)
const errorMsg = ref('')

const minDbYear = ref(2014)
const maxDbYear = ref(2026)
const latestDbMonth = ref(8)

const yearOptions = computed(() =>{
  const len = maxDbYear.value - minDbYear.value + 1
  return Array.from({ length: Math.max(1, len) }, (_, i) =>minDbYear.value + i)
})

const presetPeriod = ref('3m')
const startYear = ref(2026)
const startMonth = ref(6)
const endYear = ref(2026)
const endMonth = ref(8)

const sortBy = ref('rate') // 'rate' | 'change' | 'raw'
const excludeIslands = ref(false)
const selectedCityName = ref('')

const rawMonthlyRecords = ref([])
const ISLAND_CITIES = new Set(['連江縣', '金門縣', '澎湖縣'])

function toMonthIndex(y, m) {
  return y * 12 + (m - 1)
}

function normalizeCityName(name) {
  if (!name) return ''
  let clean = String(name).trim().replace(/\s+/g, '').replace(/台/g, '臺')
  if (clean === '桃園縣') clean = '桃園市'
  return clean
}

function onCustomDateChange() {
  presetPeriod.value = 'custom'
  // 防呆：若起日大於迄日，自動交換
  if (toMonthIndex(startYear.value, startMonth.value) >toMonthIndex(endYear.value, endMonth.value)) {
    const tmpY = startYear.value
    const tmpM = startMonth.value
    startYear.value = endYear.value
    startMonth.value = endMonth.value
    endYear.value = tmpY
    endMonth.value = tmpM
  }
}

function applyPreset(type) {
  presetPeriod.value = type
  const latestY = maxDbYear.value
  const latestM = latestDbMonth.value
  const endIdx = toMonthIndex(latestY, latestM)
  let span = 3
  if (type === '3m') span = 3
  else if (type === '6m') span = 6
  else if (type === '1y') span = 12
  else if (type === '3y') span = 36

  const startIdx = endIdx - span + 1
  startYear.value = Math.floor(startIdx/12)
  startMonth.value = (startIdx % 12) + 1
  endYear.value = latestY
  endMonth.value = latestM
}

const periodLabel = computed(() =>{
  return `${startYear.value - 1911}年${startMonth.value}月 ~ ${endYear.value - 1911}年${endMonth.value}月`
})

const monthCount = computed(() =>{
  const diff = toMonthIndex(endYear.value, endMonth.value) - toMonthIndex(startYear.value, startMonth.value) + 1
  return Math.max(1, diff)
})

// =========================================================================
// 核心期間比較運算：以「各期實際有效月份之月均發生率」對比，彻底消除缺漏月誤差
// =========================================================================
const periodAnalysisList = computed(() =>{
  const curStart = toMonthIndex(startYear.value, startMonth.value)
  const curEnd = toMonthIndex(endYear.value, endMonth.value)
  const span = Math.max(1, curEnd - curStart + 1)

  const prevStart = curStart - span
  const prevEnd = curStart - 1

  const cityMap = {}

  for (const r of rawMonthlyRecords.value) {
    if (excludeIslands.value && ISLAND_CITIES.has(r.city)) continue

    if (!cityMap[r.city]) {
      cityMap[r.city] = {
        city: r.city,
        curCases: 0, curCleared: 0, curVictims: 0, curSuspects: 0, curPopSum: 0, curValidMonths: 0,
        prevCases: 0, prevPopSum: 0, prevValidMonths: 0,
        latestPop: r.pop || 0
      }
    }
    const obj = cityMap[r.city]
    if (r.pop >0) obj.latestPop = r.pop

    const idx = toMonthIndex(r.yr, r.mo)
    // 只有當該月確實有警政數據時，才計入有效月份與人口分母
    if (idx >= curStart && idx<= curEnd && r.hasCrimeRecord) {
      obj.curCases += r.cases
      obj.curCleared += r.cleared
      obj.curVictims += r.victims
      obj.curSuspects += r.suspects
      obj.curPopSum += (r.pop || obj.latestPop)
      obj.curValidMonths += 1
    } else if (idx >= prevStart && idx<= prevEnd && r.hasCrimeRecord) {
      obj.prevCases += r.cases
      obj.prevPopSum += (r.pop || obj.latestPop)
      obj.prevValidMonths += 1
    }
  }

  return Object.values(cityMap).map(c =>{
    const avgPop = c.curValidMonths >0
      ? Math.round(c.curPopSum/c.curValidMonths)
      : c.latestPop

    // 本期與前期的「月均發生率 (%)」= 本期總發生數/本期有效月份之人口總和 * 100
    const curProb = c.curPopSum >0 ? (c.curCases/c.curPopSum) * 100 : 0
    const prevProb = c.prevPopSum >0 ? (c.prevCases/c.prevPopSum) * 100 : 0

    // 每萬人每月平均發生件數 (一般民眾最直覺的指標)
    const per10kRate = Number((curProb * 100).toFixed(2))
    const prevPer10kRate = Number((prevProb * 100).toFixed(2))

    let changePct = 0
    if (prevProb >0 && c.prevValidMonths >0) {
      changePct = ((curProb - prevProb)/prevProb) * 100
    }

    const clearanceRate = c.curCases >0 ? Math.round((c.curCleared/c.curCases) * 100) : 0

    return {
      city: c.city,
      avgPop,
      totalCases: Math.round(c.curCases),
      totalCleared: Math.round(c.curCleared),
      totalVictims: Math.round(c.curVictims),
      totalSuspects: Math.round(c.curSuspects),
      clearanceRate,
      probPct: Number(curProb.toFixed(4)),
      prevProbPct: Number(prevProb.toFixed(4)),
      per10kRate,
      prevPer10kRate,
      changePct: Number(changePct.toFixed(1))
    }
  })
})

const sortedCities = computed(() =>{
  const list = [...periodAnalysisList.value]
  if (sortBy.value === 'rate') return list.sort((a, b) =>b.per10kRate - a.per10kRate)
  if (sortBy.value === 'change') return list.sort((a, b) =>b.changePct - a.changePct)
  return list.sort((a, b) =>b.totalCases - a.totalCases)
})

const currentCity = computed(() =>{
  return periodAnalysisList.value.find(c =>c.city === selectedCityName.value) || sortedCities.value[0]
})

const currentCityRank = computed(() =>{
  const idx = sortedCities.value.findIndex(c =>c.city === (currentCity.value?.city))
  return idx >= 0 ? idx + 1 : 1
})

// 頂部 3 張摘要卡
const topRateCity = computed(() =>{
  const list = [...periodAnalysisList.value].sort((a, b) =>b.per10kRate - a.per10kRate)
  return list[0] || { city: '無', probPct: 0, per10kRate: 0, totalCases: 0 }
})
const topRisingCity = computed(() =>{
  const list = [...periodAnalysisList.value].sort((a, b) =>b.changePct - a.changePct)
  return list[0] || { city: '無', changePct: 0, per10kRate: 0, prevPer10kRate: 0 }
})
const totalPeriodCases = computed(() =>periodAnalysisList.value.reduce((s, c) =>s + c.totalCases, 0))
const totalPeriodVictims = computed(() =>periodAnalysisList.value.reduce((s, c) =>s + c.totalVictims, 0))
const totalPeriodSuspects = computed(() =>periodAnalysisList.value.reduce((s, c) =>s + c.totalSuspects, 0))
const avgClearanceRate = computed(() =>{
  const cases = totalPeriodCases.value
  const cleared = periodAnalysisList.value.reduce((s, c) =>s + c.totalCleared, 0)
  return cases >0 ? Math.round((cleared/cases) * 100) : 0
})

// 長條圖視覺輔助
function getBarWidth(item) {
  const list = periodAnalysisList.value
  if (!list.length) return 0
  if (sortBy.value === 'rate') {
    const max = Math.max(...list.map(c =>c.per10kRate), 0.01)
    return Math.min(100, Math.max(8, Math.round((item.per10kRate/max) * 100)))
  } else if (sortBy.value === 'change') {
    const max = Math.max(...list.map(c =>Math.abs(c.changePct)), 1)
    return Math.min(100, Math.max(8, Math.round((Math.abs(item.changePct)/max) * 100)))
  } else {
    const max = Math.max(...list.map(c =>c.totalCases), 1)
    return Math.min(100, Math.max(8, Math.round((item.totalCases/max) * 100)))
  }
}

function getBarColor(index, item) {
  if (sortBy.value === 'change') {
    return item.changePct >0
      ? 'linear-gradient(90deg, #f97316, #ef4444)'
      : 'linear-gradient(90deg, #10b981, #059669)'
  }
  if (index< 3) return 'linear-gradient(90deg, #ef4444, #dc2626)'
  if (index< 9) return 'linear-gradient(90deg, #f59e0b, #ea580c)'
  return 'linear-gradient(90deg, #38bdf8, #2563eb)'
}

function getRankBadgeClass(index) {
  if (index< 3) return 'rank-top3'
  if (index< 9) return 'rank-mid'
  return 'rank-normal'
}

function formatChange(val) {
  if (val >0) return `▲ +${val}%`
  if (val< 0) return `▼ ${val}%`
  return '持平 0%'
}

function getTrendClass(val) {
  if (val >0) return 'pill-up'
  if (val< 0) return 'pill-down'
  return 'pill-neutral'
}

function getVictimRatio(cityObj) {
  const total = cityObj.totalVictims + cityObj.totalSuspects
  if (!total) return 50
  return Math.round((cityObj.totalVictims/total) * 100)
}

async function fetchAllRows(tableName, headers, orderCols) {
  const pageSize = 1000
  let offset = 0
  let allData = []

  while (true) {
    const url = `${SUPABASE_URL}/rest/v1/${tableName}?select=*&order=${orderCols}&limit=${pageSize}&offset=${offset}`
    const res = await fetch(url, { headers })
    if (!res.ok) {
      throw new Error(`讀取資料表 ${tableName} 失敗 (HTTP ${res.status})`)
    }
    const chunk = await res.json()
    allData = allData.concat(chunk)
    if (chunk.length< pageSize) break
    offset += pageSize
  }
  return allData
}

async function fetchFromSupabase() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    errorMsg.value = '尚未設定.env中的VITE_SUPABASE_URL或VITE_SUPABASE_ANON_KEY！'
    isLoading.value = false
    return
  }

  try {
    isLoading.value = true
    const headers = {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`
    }

    const [locData, popData] = await Promise.all([
      fetchAllRows('police_location', headers, '年度.asc,月份.asc,縣市別.asc,類別.asc'),
      fetchAllRows('city_population', headers, '年度.asc,月份.asc,縣市別.asc')
    ])

    const map = {}
    const latestPopByCity = {}

    // 1. 建立各縣市各月人口索引，並記住各縣市最新人口作為備援
    popData.forEach(p =>{
      const yr = Number(p.年度)
      const mo = Number(p.月份)
      const city = normalizeCityName(p.縣市別)
      const val = Number(p.數值) || 0
      if (!yr || !mo || !city) return

      const key = `${yr}-${mo}-${city}`
      map[key] = {
        yr, mo, city,
        cases: 0, cleared: 0, victims: 0, suspects: 0,
        pop: val,
        hasCrimeRecord: false
      }
      if (val >0) latestPopByCity[city] = val
    })

    // 2. 寫入警政數據，並標記該月確實有警政統計 (hasCrimeRecord = true)
    let maxIdx = 0
    let minYr = 9999

    locData.forEach(r =>{
      const yr = Number(r.年度)
      const mo = Number(r.月份)
      const city = normalizeCityName(r.縣市別)
      const val = Number(r.數值) || 0
      if (!yr || !mo || !city || city === '總計' || city === '合計') return

      const key = `${yr}-${mo}-${city}`
      if (!map[key]) {
        map[key] = {
          yr, mo, city,
          cases: 0, cleared: 0, victims: 0, suspects: 0,
          pop: latestPopByCity[city] || 0,
          hasCrimeRecord: false
        }
      }

      map[key].hasCrimeRecord = true

      if (r.類別 === '發生數') {
        map[key].cases = val
        if (val >0) {
          const idx = toMonthIndex(yr, mo)
          if (idx >maxIdx) maxIdx = idx
          if (yr< minYr) minYr = yr
        }
      } else if (r.類別 === '破獲數') {
        map[key].cleared = val
      } else if (r.類別 === '被害人') {
        map[key].victims = val
      } else if (r.類別 === '嫌疑犯') {
        map[key].suspects = val
      }
    })

    // 補齊可能缺漏的單月人口
    Object.values(map).forEach(item =>{
      if (!item.pop && latestPopByCity[item.city]) {
        item.pop = latestPopByCity[item.city]
      }
    })

    rawMonthlyRecords.value = Object.values(map)

    if (maxIdx >0) {
      minDbYear.value = minYr< 9999 ? minYr : 2014
      maxDbYear.value = Math.floor(maxIdx/12)
      latestDbMonth.value = (maxIdx % 12) + 1
      applyPreset('3m')
    }
  } catch (err) {
    console.error('Supabase資料載入失敗:', err)
    errorMsg.value = err.message || '連線失敗，請檢查網路或Supabase RLS設定。'
  } finally {
    isLoading.value = false
  }
}

onMounted(() =>{
  fetchFromSupabase()
})
</script>
