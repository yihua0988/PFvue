<template>
 <main class="content dashboard-page">
    
   <!-- 1. 主標題與副標題 -->
   <header class="page-header">
     <h1 class="dashboard-title">👥哪種人最容易被騙？高風險族群期間比較分析</h1>
     <p class="dashboard-subtitle">
        切換「年齡性別、職業、學歷」三大維度，結合戶政同齡人口基數，揭開詐騙集團最常鎖定的目標族群！
     </p>
   </header>

   <!-- 讀取中狀態 -->
   <div v-if="isLoading" class="status-box">
	 <div class="spinner"></div>
     <h2>⏳正在從雲端載入統計資料...</h2>
   </div>

   <!-- 錯誤狀態 -->
   <div v-else-if="errorMsg" class="status-box">
     <h2 class="text-red">⚠️資料讀取失敗</h2>
     <p>{{ errorMsg }}</p>
   </div>

   <!-- 3. 主體視覺化內容 -->
   <template v-else>
      
     <!-- 頂部 3 張 KPI 重點摘要卡 -->
     <section class="kpi-grid">
       <div class="kpi-card kpi-danger">
         <div class="kpi-header">
           <span class="kpi-badge badge-red">🎯{{ dimensionLabel }}風險最高</span>
           <span class="kpi-period-hint">{{ periodLabel }}</span>
         </div>
         <div class="kpi-main-row">
           <span class="kpi-city">{{ topRateItem.name }}</span>
           <span class="kpi-highlight text-red">
             <template v-if="activeDimension === 'age'">
                每萬人{{ topRateItem.per10kRate }}人<small>/月</small>
             </template>
             <template v-else>
                佔全體{{ topRateItem.sharePct }}%
             </template>
           </span>
         </div>
         <p class="kpi-desc">
           <template v-if="activeDimension === 'age'">
              依全台同齡人口換算，該年齡層每月受騙/涉案密度居冠（期間累計<strong>{{ topRateItem.totalCount.toLocaleString() }}人次</strong>）
           </template>
           <template v-else>
              在所有{{ dimensionLabel }}中人數最多，期間累計達<strong>{{ topRateItem.totalCount.toLocaleString() }}人次</strong>（月均{{ topRateItem.monthlyAvg.toLocaleString() }}人）
           </template>
         </p>
       </div>

       <div class="kpi-card kpi-warning">
         <div class="kpi-header">
           <span class="kpi-badge badge-amber">📈較前一期升溫最快</span>
           <span class="kpi-period-hint">對比前{{ monthCount }}個月</span>
         </div>
         <div class="kpi-main-row">
           <span class="kpi-city">{{ topRisingItem.name }}</span>
           <span :class="['kpi-highlight', topRisingItem.changePct >0 ? 'text-red' : 'text-green']">
              {{ formatChange(topRisingItem.changePct) }}
           </span>
         </div>
         <p class="kpi-desc">
            與前一期（{{ monthCount }}個月）相比，<strong>{{ topRisingItem.name }}</strong>的月均人數增幅最劇烈，近期需特別防範！
         </p>
       </div>

       <div class="kpi-card kpi-info">
         <div class="kpi-header">
           <span class="kpi-badge badge-blue">👥期間累計總人次</span>
           <span class="kpi-period-hint">共{{ monthCount }}個月總計</span>
         </div>
         <div class="kpi-main-row">
           <span class="kpi-city">{{ totalPeriodCount.toLocaleString() }}<small>人次</small></span>
           <span class="kpi-highlight text-blue">月均{{ Math.round(totalPeriodCount/monthCount).toLocaleString() }}人</span>
         </div>
         <p class="kpi-desc">
           <template v-if="activeDimension === 'age'">
              12歲以上期間男性佔<strong>{{ totalMalePct }}%</strong>｜女性佔<strong>{{ 100 - totalMalePct }}%</strong>點擊下方排行可看各年齡層男女比）
           </template>
           <template v-else>
              涵蓋全台共<strong>{{ sortedItems.length }}類{{ dimensionLabel }}</strong>之警政統計紀錄，點選下方項目可查看詳細診斷
           </template>
         </p>
       </div>
     </section>

     <!-- 4. 步驟化篩選控制面板 -->
     <section class="filter-panel">
        
       <!-- 第一排：步驟 1 選分析維度 (年齡性別/職業/學歷) -->
       <div class="filter-row">
         <div class="filter-group">
           <span class="step-tag">步驟1</span>
           <span class="filter-title">選擇想分析的族群維度：</span>
           <div class="btn-group">
             <button 
                :class="['mode-tab', { active: activeDimension === 'age' }]" 
                @click="switchDimension('age')">
                🎂年齡層×性別(12歲以上)
             </button>
             <button 
                :class="['mode-tab', { active: activeDimension === 'occupation' }]" 
                @click="switchDimension('occupation')">
                💼職業別排行
             </button>
             <button 
                :class="['mode-tab', { active: activeDimension === 'education' }]" 
                @click="switchDimension('education')">
                🎓教育程度分析
             </button>
           </div>
         </div>

         <!-- 當處於「年齡層」模式時，可額外篩選性別 -->
         <div class="btn-group" v-if="activeDimension === 'age'">
           <span class="date-label">性別篩選：</span>
           <button :class="['pill-btn', { active: genderFilter === 'all' }]" @click="genderFilter = 'all'">全體</button>
           <button :class="['pill-btn', { active: genderFilter === '男' }]" @click="genderFilter = '男'">👨僅看男性</button>
           <button :class="['pill-btn', { active: genderFilter === '女' }]" @click="genderFilter = '女'">👩僅看女性</button>
         </div>
       </div>

       <div class="filter-divider"></div>

       <!-- 第二排：步驟 2 選時間區間 -->
       <div class="filter-row">
         <div class="filter-group">
           <span class="step-tag">步驟2</span>
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
           <select v-model.number="startYear" class="clean-select" @change="onCustomDateChange()">
             <option v-for="y in yearOptions" :key="'sy'+y" :value="y">民國{{ y - 1911 }}年</option>
           </select>
           <select v-model.number="startMonth" class="clean-select" @change="onCustomDateChange()">
             <option v-for="m in 12" :key="'sm'+m" :value="m">{{ m }}月</option>
           </select>
           <span class="date-label">～</span>
           <select v-model.number="endYear" class="clean-select" @change="onCustomDateChange()">
             <option v-for="y in yearOptions" :key="'ey'+y" :value="y">民國{{ y - 1911 }}年</option>
           </select>
           <select v-model.number="endMonth" class="clean-select" @change="onCustomDateChange()">
             <option v-for="m in 12" :key="'em'+m" :value="m">{{ m }}月</option>
           </select>
         </div>
       </div>

       <div class="filter-divider"></div>

       <!-- 第三排：步驟 3 選排序依據 -->
       <div class="filter-row">
         <div class="filter-group">
           <span class="step-tag">步驟3</span>
           <span class="filter-title">選擇排行方式：</span>
           <div class="btn-group">
             <button :class="['mode-tab', { active: sortBy === 'rate' }]" @click="sortBy = 'rate'">
                🎯{{ activeDimension === 'age' ? '按「每萬名同齡人口發生率」排行(最準確)':'按「佔全體比例(%)」排行'}}
             </button>
             <button :class="['mode-tab', { active: sortBy === 'change' }]" @click="sortBy = 'change'">
                📈按「較前一期增減幅度 (%)」排行
             </button>
             <button :class="['mode-tab', { active: sortBy === 'raw' }]" @click="sortBy = 'raw'">
                📊按「期間累計總人數」排行
             </button>
           </div>
         </div>
       </div>
     </section>

     <!-- 5. 左右雙欄主視覺看板 -->
     <section class="dashboard-main-grid">
        
       <!-- 左欄：各族群互動排行榜 -->
       <div class="card-box">
         <div class="box-header">
           <h2>📊{{ periodLabel }} 【{{ dimensionLabel }}】風險排行（共{{ monthCount }}個月）</h2>
           <p class="box-subtitle">
              👆<strong>點擊下方任一族群</strong>，右側會即時更新該族群的詳細風險診斷與防詐重點
           </p>
         </div>

         <div class="ranking-list">
           <div 
              v-for="(item, index) in sortedItems" 
              :key="item.name"
              :class="['rank-row', { active: currentItem && currentItem.name === item.name }]"
              @click="selectedItemName = item.name"
            >
             <!-- 左：名次與族群名稱 -->
             <div class="rank-city-col">
               <span :class="['rank-num', getRankBadgeClass(index)]">{{ index + 1 }}</span>
               <span class="rank-city-name">{{ item.name }}</span>
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
                 <span class="primary-val" v-if="activeDimension === 'age' && item.avgPop >0">
                   <strong>{{ item.per10kRate }}</strong>人/萬人
                 </span>
                 <span class="primary-val" v-else>
                    佔比<strong>{{ item.sharePct }}%</strong>
                 </span>
                 <span :class="['delta-pill', getTrendClass(item.changePct)]">
                    {{ formatChange(item.changePct) }}
                 </span>
               </template>

               <template v-else-if="sortBy === 'change'">
                 <span :class="['primary-val', item.changePct >0 ? 'text-red' : 'text-green']">
                   <strong>{{ formatChange(item.changePct) }}</strong>
                 </span>
                 <span class="delta-pill pill-neutral">
                    {{ activeDimension === 'age' && item.avgPop >0 ? `${item.per10kRate}人/萬人` : `佔比 ${item.sharePct}%` }}
                 </span>
               </template>

               <template v-else>
                 <span class="primary-val"><strong>{{ item.totalCount.toLocaleString() }}</strong>人</span>
                 <span :class="['delta-pill', getTrendClass(item.changePct)]">
                    {{ formatChange(item.changePct) }}
                 </span>
               </template>
             </div>
           </div>
         </div>
       </div>

       <!-- 右欄：選中族群深度體檢卡 (支援 Sticky 跟隨捲動) -->
       <div class="card-box detail-card" v-if="currentItem">
          
         <!-- 頂部藍色橫幅 -->
         <div class="detail-banner">
           <div>
             <span class="banner-tag">📍{{ periodLabel }}族群風險體檢</span>
             <h2>{{ currentItem.name }}</h2>
           </div>
           <div class="banner-pop">
             <template v-if="activeDimension === 'age' && currentItem.avgPop >0">
               <span>全台同齡人口數</span><br>
               <strong>約 {{ (currentItem.avgPop/10000).toFixed(1) }}萬人</strong>
             </template>
             <template v-else>
               <span>目前風險排名</span><br>
               <strong>第{{ currentItemRank }}名/共{{ sortedItems.length }}類</strong>
             </template>
           </div>
         </div>

         <!-- 4 格清晰數據盒 -->
         <div class="metrics-2x2">
           <div class="metric-item">
             <span class="metric-title">
                {{ activeDimension === 'age' && currentItem.avgPop >0 ? '🎯每萬名同齡人口月均' : '🎯佔全體總人數比例' }}
             </span>
             <div class="metric-value text-red">
               <template v-if="activeDimension === 'age' && currentItem.avgPop >0">
                  {{ currentItem.per10kRate }}<small>人/萬人</small>
               </template>
               <template v-else>
                  {{ currentItem.sharePct }}<small>%</small>
               </template>
             </div>
             <span class="metric-note">
               <template v-if="activeDimension === 'age' && currentItem.avgPop >0">
                  佔 12 歲以上總涉案/受害人數之{{ currentItem.sharePct }}%
               </template>
               <template v-else>
                  每 100 位涉案/受害人中有{{ Math.round(currentItem.sharePct) }}位屬此族群
               </template>
             </span>
           </div>

           <div class="metric-item">
             <span class="metric-title">📈與前{{ monthCount }}個月相比</span>
             <div :class="['metric-value', currentItem.changePct >0 ? 'text-red' : 'text-green']">
                {{ formatChange(currentItem.changePct) }}
             </div>
             <span class="metric-note">
                前期月均為{{ currentItem.prevMonthlyAvg.toLocaleString() }}人/月
             </span>
           </div>

           <div class="metric-item">
             <span class="metric-title">🚨期間累計總人數</span>
             <div class="metric-value text-orange">
                {{ currentItem.totalCount.toLocaleString() }}<small>人次</small>
             </div>
             <span class="metric-note">
                本期平均每月{{ currentItem.monthlyAvg.toLocaleString() }}人次
             </span>
           </div>

           <div class="metric-item">
             <span class="metric-title">
                {{ activeDimension === 'age' ? '⚖️該年齡層男女比例' : '📊前一期累計總人數' }}
             </span>
             <div class="metric-value text-purple">
               <template v-if="activeDimension === 'age'">
                  男{{ getMaleRatio(currentItem) }}%<small>/女{{ 100 - getMaleRatio(currentItem) }}%</small>
               </template>
               <template v-else>
                  {{ currentItem.prevTotalCount.toLocaleString() }}<small>人次</small>
               </template>
             </div>
             <span class="metric-note">
               <template v-if="activeDimension === 'age'">
                  男{{ currentItem.maleCount.toLocaleString() }}人｜女{{ currentItem.femaleCount.toLocaleString() }}人
               </template>
               <template v-else>
                  與前{{ monthCount }}個月累計人數直接對照
               </template>
             </span>
           </div>
         </div>

         <!-- 視覺化比例對比條 -->
         <div class="compare-block">
           <template v-if="activeDimension === 'age'">
             <div class="compare-header">
               <h4>👫【{{ currentItem.name }}】男性vs.女性人數比例對比：</h4>
             </div>
             <div class="compare-bar">
               <div 
                  class="seg-victim" 
                  style="background: #2563eb;"
                  :style="{ width: getMaleRatio(currentItem)+'%' }"
                >
                  男性{{ currentItem.maleCount.toLocaleString() }}人({{ getMaleRatio(currentItem) }}%)
               </div>
               <div 
                  class="seg-suspect" 
                  style="background: #ec4899;"
                  :style="{ width: (100 - getMaleRatio(currentItem))+'%' }"
                >
                  女性{{ currentItem.femaleCount.toLocaleString() }}人({{ 100 - getMaleRatio(currentItem) }}%)
               </div>
             </div>
             <p class="compare-caption">
                💡數據結合警政性別年齡統計與戶政人口資料（12歲以上）。青壯年族群常因「網路投資、遊戲點數、求職借出帳戶」涉案，長輩則以「假檢警、假親友、高息養老專案」為主。
             </p>
           </template>

           <template v-else>
             <div class="compare-header">
               <h4>📊【{{ currentItem.name }}】本期vs.前一期({{ monthCount }}個月)規模對比：</h4>
             </div>
             <div class="compare-bar">
               <div 
                  class="seg-victim" 
                  :style="{ width: getPeriodCompareRatio(currentItem)+'%' }"
                >
                  本期{{ currentItem.totalCount.toLocaleString() }}人({{ getPeriodCompareRatio(currentItem) }}%)
               </div>
               <div 
                  class="seg-suspect" 
                  :style="{ width: (100 - getPeriodCompareRatio(currentItem))+'%' }"
                >
                  前一期{{ currentItem.prevTotalCount.toLocaleString() }}人({{ 100 - getPeriodCompareRatio(currentItem) }}%)
               </div>
             </div>
             <p class="compare-caption">
                💡詐騙集團會針對不同職業與學歷設計話術！無論學歷高低或從事何種行業，只要遇到「保證獲利、要求操作ATM或交付提款卡」務必提高警覺。
             </p>
           </template>
         </div>

         <!-- 動態對應族群的：保命防詐的三個習慣 -->
         <div class="habits-block">
           <h4>🛡️保命防詐的三個習慣</h4>
           <ol class="habits-list">
             <li v-for="(tip, idx) in currentPreventionTips" :key="idx">
               <strong>{{ tip.title }}：</strong>{{ tip.body }}
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

// 🔒嚴格鎖定只計算這9個年齡層（徹底排除 0-5歲、6-11歲 等未滿 12 歲資料）
const VALID_AGE_GROUPS = new Set([
  '12-17歲',
  '18-23歲',
  '24-29歲',
  '30-39歲',
  '40-49歲',
  '50-59歲',
  '60-64歲',
  '65-69歲',
  '70歲以上'
])

const minDbYear = ref(2014)
const maxDbYear = ref(2026)
const latestDbMonth = ref(8)

const yearOptions = computed(() =>{
  const len = maxDbYear.value - minDbYear.value + 1
  return Array.from({ length: Math.max(1, len) }, (_, i) =>minDbYear.value + i)
})

const activeDimension = ref('age') // 'age' | 'occupation' | 'education'
const genderFilter = ref('all')    // 'all' | '男' | '女'
const selectedItemName = ref('')   // 預設空字串，自動聚焦當前第 1 名

const presetPeriod = ref('3m')
const startYear = ref(2026)
const startMonth = ref(6)
const endYear = ref(2026)
const endMonth = ref(8)
const sortBy = ref('rate') // 'rate' | 'change' | 'raw'

const ageGenderRecords = ref([])
const occupationRecords = ref([])
const educationRecords = ref([])
const popByYearAgeGender = ref({})

function toMonthIndex(y, m) {
  return y * 12 + (m - 1)
}

function normalizeAgeGroupName(raw) {
  if (!raw) return ''
  return String(raw).trim().replace(/~/g, '-').replace(/～/g, '-')
}

function switchDimension(dim) {
  activeDimension.value = dim
  selectedItemName.value = ''
}

function onCustomDateChange() {
  presetPeriod.value = 'custom'
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

const dimensionLabel = computed(() =>{
  if (activeDimension.value === 'age') return '年齡層'
  if (activeDimension.value === 'occupation') return '職業別'
  return '教育程度'
})

const periodLabel = computed(() =>{
  return `${startYear.value - 1911}年${startMonth.value}月 ~ ${endYear.value - 1911}年${endMonth.value}月`
})

const monthCount = computed(() =>{
  const diff = toMonthIndex(endYear.value, endMonth.value) - toMonthIndex(startYear.value, startMonth.value) + 1
  return Math.max(1, diff)
})

function getNationalAgePop(yr, ageGroup, gender) {
  const map = popByYearAgeGender.value
  if (gender === 'all') {
    const m = map[`${yr}-${ageGroup}-男`] || map[`latest-${ageGroup}-男`] || 0
    const f = map[`${yr}-${ageGroup}-女`] || map[`latest-${ageGroup}-女`] || 0
    return m + f
  }
  return map[`${yr}-${ageGroup}-${gender}`] || map[`latest-${ageGroup}-${gender}`] || 0
}

const periodAnalysisList = computed(() =>{
  const curStart = toMonthIndex(startYear.value, startMonth.value)
  const curEnd = toMonthIndex(endYear.value, endMonth.value)
  const span = Math.max(1, curEnd - curStart + 1)

  const prevStart = curStart - span
  const prevEnd = curStart - 1

  const groupMap = {}

  if (activeDimension.value === 'age') {
    for (const r of ageGenderRecords.value) {
      // 再次確保只處理 9 個目標年齡層
      if (!VALID_AGE_GROUPS.has(r.group)) continue
      if (genderFilter.value !== 'all' && r.gender !== genderFilter.value) continue

      if (!groupMap[r.group]) {
        groupMap[r.group] = {
          name: r.group,
          curTotal: 0, curMale: 0, curFemale: 0, curMonthsSet: new Set(),
          prevTotal: 0, prevMonthsSet: new Set()
        }
      }
      const obj = groupMap[r.group]
      const idx = toMonthIndex(r.yr, r.mo)
      if (idx >= curStart && idx<= curEnd) {
        obj.curTotal += r.val
        if (r.gender === '男') obj.curMale += r.val
        else if (r.gender === '女') obj.curFemale += r.val
        obj.curMonthsSet.add(idx)
      } else if (idx >= prevStart && idx<= prevEnd) {
        obj.prevTotal += r.val
        obj.prevMonthsSet.add(idx)
      }
    }
  } else {
    const sourceList = activeDimension.value === 'occupation' ? occupationRecords.value : educationRecords.value
    for (const r of sourceList) {
      if (!groupMap[r.group]) {
        groupMap[r.group] = {
          name: r.group,
          curTotal: 0, curMale: 0, curFemale: 0, curMonthsSet: new Set(),
          prevTotal: 0, prevMonthsSet: new Set()
        }
      }
      const obj = groupMap[r.group]
      const idx = toMonthIndex(r.yr, r.mo)
      if (idx >= curStart && idx<= curEnd) {
        obj.curTotal += r.val
        obj.curMonthsSet.add(idx)
      } else if (idx >= prevStart && idx<= prevEnd) {
        obj.prevTotal += r.val
        obj.prevMonthsSet.add(idx)
      }
    }
  }

  const rawList = Object.values(groupMap)
  const grandTotalCur = rawList.reduce((s, g) =>s + g.curTotal, 0)

  return rawList.map(g =>{
    const curMonths = Math.max(1, g.curMonthsSet.size || span)
    const prevMonths = Math.max(1, g.prevMonthsSet.size || span)

    const monthlyAvg = g.curTotal/curMonths
    const prevMonthlyAvg = g.prevTotal/prevMonths

    let avgPop = 0
    let per10kRate = 0
    if (activeDimension.value === 'age') {
      avgPop = getNationalAgePop(endYear.value, g.name, genderFilter.value)
      if (avgPop >0) {
        per10kRate = Number(((monthlyAvg/avgPop) * 10000).toFixed(2))
      }
    }

    const sharePct = grandTotalCur >0 ? Number(((g.curTotal/grandTotalCur) * 100).toFixed(1)) : 0

    let changePct = 0
    if (prevMonthlyAvg >0 && g.prevMonthsSet.size >0) {
      changePct = ((monthlyAvg - prevMonthlyAvg)/prevMonthlyAvg) * 100
    }

    return {
      name: g.name,
      avgPop,
      totalCount: Math.round(g.curTotal),
      prevTotalCount: Math.round(g.prevTotal),
      maleCount: Math.round(g.curMale),
      femaleCount: Math.round(g.curFemale),
      monthlyAvg: Math.round(monthlyAvg),
      prevMonthlyAvg: Math.round(prevMonthlyAvg),
      per10kRate,
      sharePct,
      changePct: Number(changePct.toFixed(1))
    }
  })
})

const sortedItems = computed(() =>{
  const list = [...periodAnalysisList.value]
  if (sortBy.value === 'rate') {
    if (activeDimension.value === 'age') {
      return list.sort((a, b) =>(b.per10kRate || b.sharePct) - (a.per10kRate || a.sharePct))
    }
    return list.sort((a, b) =>b.sharePct - a.sharePct)
  }
  if (sortBy.value === 'change') {
    return list.sort((a, b) =>b.changePct - a.changePct)
  }
  return list.sort((a, b) =>b.totalCount - a.totalCount)
})

const currentItem = computed(() =>{
  if (selectedItemName.value) {
    const found = periodAnalysisList.value.find(i =>i.name === selectedItemName.value)
    if (found) return found
  }
  return sortedItems.value[0] || null
})

const currentItemRank = computed(() =>{
  const idx = sortedItems.value.findIndex(i =>i.name === currentItem.value?.name)
  return idx >= 0 ? idx + 1 : 1
})

const topRateItem = computed(() =>{
  const list = [...periodAnalysisList.value]
  if (activeDimension.value === 'age') {
    list.sort((a, b) =>b.per10kRate - a.per10kRate)
  } else {
    list.sort((a, b) =>b.sharePct - a.sharePct)
  }
  return list[0] || { name: '無', per10kRate: 0, sharePct: 0, totalCount: 0, monthlyAvg: 0 }
})

const topRisingItem = computed(() =>{
  const list = [...periodAnalysisList.value].sort((a, b) =>b.changePct - a.changePct)
  return list[0] || { name: '無', changePct: 0 }
})

const totalPeriodCount = computed(() =>{
  return periodAnalysisList.value.reduce((s, i) =>s + i.totalCount, 0)
})

const totalMalePct = computed(() =>{
  const m = periodAnalysisList.value.reduce((s, i) =>s + i.maleCount, 0)
  const f = periodAnalysisList.value.reduce((s, i) =>s + i.femaleCount, 0)
  return (m + f) >0 ? Math.round((m/(m + f)) * 100) : 50
})

const currentPreventionTips = computed(() =>{
  const name = currentItem.value?.name || ''
  if (name.includes('12-17') || name.includes('18-23') || name.includes('學生') || name.includes('中學')) {
    return [
      { title: '打工求職絕不寄出提款卡與存摺', body: '凡是標榜「輕鬆領現、幫忙代收貨款、寄提款卡領取實習津貼」，100%是誘騙青年淪為洗錢人頭戶與車手。' },
      { title: '買賣遊戲點數、虛擬寶物堅持走官方平台', body: '私下LINE交易要求「購買點數拍照回傳開通帳號」或「掃描QR Code實名驗證」，全都是假買家真詐財。' },
      { title: '網購遇到「訂單錯誤、扣款失敗」立即掛斷', body: '真正電商客服不會要求你操作ATM或網銀，聽到「解除分期設定」請直接撥打165查證。' }
    ]
  }
  if (name.includes('60') || name.includes('65') || name.includes('70') || name.includes('退') || name.includes('無業')) {
    return [
      { title: '接到「檢察官、警察說帳戶涉洗錢」直接掛斷', body: '真正的檢警絕對不會在電話中製作筆錄，更不會要求「監管帳戶、領出現金面交保管」。' },
      { title: '親友急電「換電話號碼、急需借錢周轉」先查證', body: '收到「猜猜我是誰」或自稱兒女急用錢的LINE訊息，務必撥打原有的舊電話號碼向本人親自確認。' },
      { title: '拒絕「高配息養老專案、內線飆股代操」群組', body: '不聽信來路不明的理財老師與領飆股簡訊，大額提款或匯款前請務必與家人及銀行行員商量。' }
    ]
  }
  return [
    { title: '看到「穩賺不賠、老師帶牌抽股票」先關掉', body: 'Facebook 與 LINE 投資群組裡每天曬獲利對帳單的「學員」，全都是詐騙集團自己人演的樁腳。' },
    { title: '辦理信貸、資金周轉「不寄卡、不做金流美化」', body: '正規銀行不會要求你「先把存摺提款卡寄過去刷金流紀錄」，一旦寄出就會直接變成警示帳戶！' },
    { title: '收到「積分到期、水電費催繳、包裹補稅」簡訊別點網址', body: '釣魚簡訊常偽裝成政府或銀行騙取信用卡號與OTP驗證碼，輸入驗證碼前請看清楚刷卡金額與幣別。' }
  ]
})

function getBarWidth(item) {
  const list = periodAnalysisList.value
  if (!list.length) return 0
  if (sortBy.value === 'rate') {
    if (activeDimension.value === 'age') {
      const max = Math.max(...list.map(i =>i.per10kRate || i.sharePct), 0.01)
      return Math.min(100, Math.max(8, Math.round(((item.per10kRate || item.sharePct)/max) * 100)))
    }
    const max = Math.max(...list.map(i =>i.sharePct), 0.1)
    return Math.min(100, Math.max(8, Math.round((item.sharePct/max) * 100)))
  } else if (sortBy.value === 'change') {
    const max = Math.max(...list.map(i =>Math.abs(i.changePct)), 1)
    return Math.min(100, Math.max(8, Math.round((Math.abs(item.changePct)/max) * 100)))
  } else {
    const max = Math.max(...list.map(i =>i.totalCount), 1)
    return Math.min(100, Math.max(8, Math.round((item.totalCount/max) * 100)))
  }
}

function getBarColor(index, item) {
  if (sortBy.value === 'change') {
    return item.changePct >0
      ? 'linear-gradient(90deg, #f97316, #ef4444)'
      : 'linear-gradient(90deg, #10b981, #059669)'
  }
  if (index< 2) return 'linear-gradient(90deg, #ef4444, #dc2626)'
  if (index< 5) return 'linear-gradient(90deg, #f59e0b, #ea580c)'
  return 'linear-gradient(90deg, #38bdf8, #2563eb)'
}

function getRankBadgeClass(index) {
  if (index< 3) return 'rank-top3'
  if (index< 6) return 'rank-mid'
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

function getMaleRatio(item) {
  const total = item.maleCount + item.femaleCount
  if (!total) return 50
  return Math.round((item.maleCount/total) * 100)
}

function getPeriodCompareRatio(item) {
  const total = item.totalCount + item.prevTotalCount
  if (!total) return 50
  return Math.round((item.totalCount/total) * 100)
}

async function fetchAllRows(tableName, headers, orderCols, extraQuery = '') {
  const pageSize = 1000
  let offset = 0
  let allData = []

  while (true) {
    const queryPrefix = extraQuery ? `${extraQuery}&` : ''
    const url = `${SUPABASE_URL}/rest/v1/${tableName}?select=*&${queryPrefix}order=${orderCols}&limit=${pageSize}&offset=${offset}`
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

function extractCategoryLabel(row, preferredKeys) {
  for (const k of preferredKeys) {
    if (row[k] !== undefined && row[k] !== null && String(row[k]).trim() !== '') {
      return String(row[k]).trim()
    }
  }
  const ignoreCols = new Set(['年度', '月份', '單位', '數值', '性別', '縣市別', 'id', 'created_at', 'updated_at'])
  for (const [k, v] of Object.entries(row)) {
    if (!ignoreCols.has(k) && typeof v === 'string' && v.trim() !== '人' && v.trim() !== '件') {
      return v.trim()
    }
  }
  return ''
}

async function fetchFromSupabase() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    errorMsg.value = '尚未設定 .env 中的 VITE_SUPABASE_URL 或 VITE_SUPABASE_ANON_KEY！'
    isLoading.value = false
    return
  }

  try {
    isLoading.value = true
    const headers = {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`
    }

    const [ageData, occData, eduData, popAgeData] = await Promise.all([
      fetchAllRows('police_gender_age', headers, '年度.asc,月份.asc'),
      fetchAllRows('police_occupation', headers, '年度.asc,月份.asc'),
      fetchAllRows('police_education', headers, '年度.asc,月份.asc'),
      fetchAllRows('city_population_age_gender', headers, '年度.asc,縣市別.asc,年齡層.asc,性別.asc', '月份=eq.6')
    ])

    // 1. 彙整各年度全國同齡人口基數 (僅保留 12 歲以上之 9 個年齡層)
    const popMap = {}
    popAgeData.forEach(p =>{
      const yr = Number(p.年度)
      const ageGrp = normalizeAgeGroupName(p.年齡層)
      const gender = String(p.性別 || '').trim()
      const val = Number(p.數值) || 0
      if (!yr || !VALID_AGE_GROUPS.has(ageGrp) || !gender) return

      const key = `${yr}-${ageGrp}-${gender}`
      popMap[key] = (popMap[key] || 0) + val
      popMap[`latest-${ageGrp}-${gender}`] = popMap[key]
    })
    popByYearAgeGender.value = popMap

    // 2. 解析警政性別年紀 (直接剔除 0-5歲、6-11歲 等不在 VALID_AGE_GROUPS 內的紀錄)
    let maxIdx = 0
    let minYr = 9999
    const parsedAge = []

    ageData.forEach(r =>{
      const yr = Number(r.年度)
      const mo = Number(r.月份)
      const val = Number(r.數值) || 0
      const gender = String(r.性別 || '男').trim()
      const rawGroup = extractCategoryLabel(r, ['年齡層', '年齡', '年齡區間', '類別'])
      const group = normalizeAgeGroupName(rawGroup)

      // 🚫 若不是 12 歲以上的 9 個指定年齡層（例如 0-5歲、6-11歲），直接跳過不計算！
      if (!yr || !mo || !VALID_AGE_GROUPS.has(group)) return

      parsedAge.push({ yr, mo, group, gender, val })
      if (val >0) {
        const idx = toMonthIndex(yr, mo)
        if (idx >maxIdx) maxIdx = idx
        if (yr< minYr) minYr = yr
      }
    })
    ageGenderRecords.value = parsedAge

    // 3. 解析警政職業
    const parsedOcc = []
    occData.forEach(r =>{
      const yr = Number(r.年度)
      const mo = Number(r.月份)
      const val = Number(r.數值) || 0
      const group = extractCategoryLabel(r, ['職業別', '職業', '類別'])
      if (!yr || !mo || !group || group.includes('總計') || group.includes('合計')) return
      parsedOcc.push({ yr, mo, group, val })
    })
    occupationRecords.value = parsedOcc

    // 4. 解析警政學歷
    const parsedEdu = []
    eduData.forEach(r =>{
      const yr = Number(r.年度)
      const mo = Number(r.月份)
      const val = Number(r.數值) || 0
      const group = extractCategoryLabel(r, ['教育程度', '學歷', '學歷別', '類別'])
      if (!yr || !mo || !group || group.includes('總計') || group.includes('合計')) return
      parsedEdu.push({ yr, mo, group, val })
    })
    educationRecords.value = parsedEdu

    if (maxIdx >0) {
      minDbYear.value = minYr< 9999 ? minYr : 2014
      maxDbYear.value = Math.floor(maxIdx/12)
      latestDbMonth.value = (maxIdx % 12) + 1
      applyPreset('3m')
    }
  } catch (err) {
    console.error('載入族群資料失敗:', err)
    errorMsg.value = err.message || '連線至Supabase失敗，請確認網路與RLS權限設定。'
  } finally {
    isLoading.value = false
  }
}

onMounted(() =>{
  fetchFromSupabase()
})
</script>
