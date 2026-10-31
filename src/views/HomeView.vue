<template>
 <main class="content dashboard-page">

   <section class="legend-hero">
     <div class="cyber-grid-overlay"></div>
     <div class="scanline-bar"></div>
     <div class="hero-glow hero-glow-1"></div>
     <div class="hero-glow hero-glow-2"></div>
      
     <div class="hero-top-bar">
       <span class="live-badge">
         <span class="pulse-dot"></span>DEFCON-1 LIVE INTELLIGENCE
       </span>
       <span class="system-tag">
         <i class="fas fa-microchip"></i>2026 TAIWAN CYBER-DEFENSE RESEARCH
       </span>
     </div>

     <h1 class="hero-main-title">2026 近年詐騙防制資料分析</h1>
     <p class="hero-subtitle">
        結合政府開放數據視覺化、AI深偽犯罪拆解與零信任(Zero Trust)防禦架構的全方位識詐指揮中心
     </p>

     <!-- 🌟 核心數據指標列 (動態戰情看板) -->
     <div class="hero-stats-board">
       <!-- 第 1 格：對應第四張圖 (區域受騙密度) -->
       <div class="stat-col">
         <div class="stat-badge badge-red">
            🎯期間受騙密度最高<span>{{ heroStats.city.period }}</span>
         </div>
         <div class="stat-main">
           <span class="highlight-title">{{ heroStats.city.name }}</span>
           <span class="highlight-num text-red">{{ heroStats.city.rate }}<small>件/月</small></span>
         </div>
         <div class="stat-desc">
            每萬人案發率{{ heroStats.city.percent }}（累計<strong>{{ heroStats.city.total }}</strong>件）
         </div>
       </div>

       <div class="stat-divider"></div>

       <!-- 第 2 格：對應第五張圖 (高風險年齡層) -->
       <div class="stat-col">
         <div class="stat-badge badge-red">
            🎯年齡層風險最高<span>{{ heroStats.age.period }}</span>
         </div>
         <div class="stat-main">
           <span class="highlight-title">{{ heroStats.age.group }}</span>
           <span class="highlight-num text-red">{{ heroStats.age.rate }}<small>人/月</small></span>
         </div>
         <div class="stat-desc">
            全台同齡每月受騙/涉案居冠（累計<strong>{{ heroStats.age.total }}</strong>人次）
         </div>
       </div>

       <div class="stat-divider"></div>

       <!-- 第 3 格：對應第六張圖 (打詐財損與查扣 - 動態計算最新資料近一年數據) -->
       <div class="stat-col">
         <div class="stat-badge badge-blue">
            🛡️打詐財損與查扣<span>{{ heroStats.finance.period }}</span>
         </div>
         <div class="stat-main">
           <span class="highlight-title">查扣率{{ heroStats.finance.seizeRate }}</span>
           <span class="highlight-num text-blue">{{ heroStats.finance.seizeAmount }}</span>
         </div>
         <div class="stat-desc">
            全國月均{{ heroStats.finance.monthlyAvg }}｜累積被騙金額達<strong>{{ heroStats.finance.totalBlocked }}</strong>
         </div>
       </div>
     </div>

     <!-- 精簡權威資料來源聲明 -->
     <div class="hero-source-box">
       <div class="source-text">
         <i class="fas fa-shield-alt" style="color: #38bdf8; margin-right: 4px;"></i>
         <strong>官方權威資料來源：</strong>本站統計數據與防制規範主要彙整自
         <span class="source-pill">data.gov.tw</span>
         <span class="source-pill">內政部</span>
         <span class="source-pill">警政署</span>
         <span class="source-pill">統計處</span>
       </div>
       <a href="https://data.gov.tw/" target="_blank" rel="noopener noreferrer" class="hero-source-btn">
         <i class="fas fa-database"></i>查閱Open Data平台
       </a>
     </div>
   </section>

   <!-- ================== 第一層 [ 2 ]：四大核心模組 (2x2 傳說級暗黑戰術矩陣) ================== -->
   <section class="section-block">
     <div class="section-title-bar">
       <div class="title-left">
         <span class="section-eyebrow">STRATEGIC MODULES</span>
         <h2><i class="fas fa-cubes" style="color: #0284c7;"></i>全站四大核心研究模組</h2>
       </div>
     </div>

     <div class="bento-grid-2x2">
       <router-link 
          v-for="mod in coreModules" 
          :key="mod.id"
          :to="mod.route" 
          class="cyber-bento-card"
          :class="mod.theme"
          @mousemove="handleCardMouseMove"
        >
         <!-- 滑鼠動態追蹤聚光燈層 -->
         <div class="spotlight-layer"></div>
         <!-- 背景科技網格與巨型浮水印數字 -->
         <div class="card-bg-grid"></div>
         <span class="watermark-num">{{ mod.num }}</span>

         <div class="card-inner">
           <div class="card-header-row">
             <span class="cyber-badge">
               <span class="badge-dot"></span>MODULE {{ mod.num }}
             </span>
             <div class="cyber-icon-box">
               <i :class="mod.icon"></i>
             </div>
           </div>

           <h3 class="cyber-card-title">{{ mod.title }}</h3>
           <p class="cyber-card-desc">{{ mod.desc }}</p>

           <!-- 戰術關鍵字膠囊 -->
           <div class="cyber-tags-row">
             <span v-for="(tag, idx) in mod.tags" :key="idx" class="cyber-tag">
                # {{ tag }}
             </span>
           </div>

           <div class="cyber-card-footer">
             <span class="action-text">{{ mod.cta }}</span>
             <span class="action-arrow"><i class="fas fa-arrow-right"></i></span>
           </div>
         </div>
       </router-link>
     </div>
   </section>

   <!-- ================== 第二層 [ 1 ]：165 打詐儀表板 (戰情室監控終端) ================== -->
   <section class="section-block">
     <div class="terminal-panel">
       <div class="terminal-header">
         <div class="window-dots">
           <span class="dot dot-red"></span>
           <span class="dot dot-yellow"></span>
           <span class="dot dot-green"></span>
           <span class="terminal-code">LIVE_FEED//165_DASHBOARD.EXE</span>
         </div>
         <div class="terminal-title">
           <i class="fas fa-satellite-dish" style="color: #ef4444;"></i>
            內政部警政署：165打詐儀表板
         </div>
         <a href="https://165.npa.gov.tw/#/" target="_blank" rel="noopener noreferrer" class="terminal-ext-btn">
           <i class="fas fa-external-link-alt"></i>前往165官方網站
         </a>
       </div>

       <div class="terminal-body">
         <iframe 
            src="https://165dashboard.tw" 
            title="165反詐騙儀表板"
            loading="lazy"
            allowfullscreen>
         </iframe>
       </div>
     </div>
   </section>

   <!-- ================== 第三層 [ 1 ]：端點防護工具 ＆ 開發者中心 ================== -->
   <section class="section-block" style="margin-bottom: 40px;">
     <div class="command-footer-panel">
        
       <div class="footer-panel-header">
         <div>
           <span class="section-eyebrow" style="color: #0284c7;">ENDPOINT PROTECTION&OPEN SOURCE</span>
           <h2><i class="fas fa-shield-virus" style="color: #0284c7;"></i>部署個人端點防線＆專題開源中心</h2>
           <p>點擊任一QR Code啟動全息放大檢視，立即安裝官方防禦工具；下方提供本專案GitHub原始碼與簡報索引</p>
         </div>
       </div>

       <!-- 🌟 100% 資料驅動 (Data-Driven) v-for 渲染 QR Code 陣列 -->
       <ul class="qr-bento-list">
         <li 
            v-for="item in qrCodeItems" 
            :key="item.id" 
            class="qr-holo-card"
            @click="openModal(item)"
          >
           <div class="qr-img-box">
             <img :src="item.img" :alt="item.title">
             <div class="qr-hover-mask">
               <i class="fas fa-expand-arrows-alt"></i>
               <span>全息放大</span>
             </div>
           </div>
           <div class="qr-info">
             <span class="qr-tag" :class="item.tagClass">
               <i :class="item.icon"></i>{{ item.badge }}
             </span>
             <h4>{{ item.title }}</h4>
             <span class="qr-zoom-text"><i class="fas fa-qrcode"></i>點擊展開掃描器</span>
           </div>
         </li>
       </ul>

       <!-- 底部黑金開源專案與作者資訊列 -->
       <div class="developer-bar">
         <div class="dev-links">
           <a href="https://github.com/yihua0988/PFvue" target="_blank" rel="noopener noreferrer" class="dev-btn github-btn">
             <i class="fab fa-github"></i>GitHub專案首頁
           </a>
           <a href="https://github.com/yihua0988/PFvue/tree/master/ppt" target="_blank" rel="noopener noreferrer" class="dev-btn ppt-btn">
             <i class="fas fa-file-powerpoint"></i>專題發表簡報PPT
           </a>
         </div>

         <div class="dev-contact" @click="copyEmail" title="點擊複製作者信箱">
           <span class="dev-label"><strong>專案研究者：洪益華</strong></span>
           <span class="dev-email">yihua0988@gmail.com</span>
           <span class="copy-chip">
             <i :class="copied ? 'fas fa-check' : 'far fa-copy'"></i>
              {{ copied ? '已複製！' : '複製信箱' }}
           </span>
         </div>
       </div>

     </div>
   </section>

   <!-- ============================================== -->
   <!-- 🌟 傳說級全息掃描燈箱 (Holographic Modal) -->
   <!-- ============================================== -->
   <Teleport to="body">
     <Transition name="modal-fade">
       <div v-if="activeModal" class="modal-backdrop" @click="closeModal">
         <div class="modal-dialog" @click.stop>
            
           <button class="modal-close-btn" @click="closeModal" title="關閉視窗">
             <i class="fas fa-times"></i>
           </button>

           <div class="modal-top-tag">
             <i :class="activeModal.icon"></i>{{ activeModal.badge }}・官方安全驗證通道
           </div>

           <div class="modal-img-wrapper">
             <div class="qr-laser-line"></div>
             <img :src="activeModal.img" class="modal-img" :alt="activeModal.title">
           </div>
            
           <div class="modal-text-content">
             <h3 class="modal-title">{{ activeModal.title }}</h3>
             <p class="modal-subtitle">{{ activeModal.subtitle }}</p>
           </div>

         </div>
       </div>
     </Transition>
   </Teleport>

 </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../lib/supabase.js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_KEY

// 🌟 動態戰情數據初始狀態設為載入中
const heroStats = ref({
  city: {
    period: '讀取中...',
    name: '計算中...',
    rate: '...',
    percent: '...',
    total: '...'
  },
  age: {
    period: '讀取中...',
    group: '計算中...',
    rate: '...',
    total: '...'
  },
  finance: {
    period: '讀取中...',
    monthlyAvg: '...',
    seizeRate: '...',
    seizeAmount: '...',
    totalBlocked: '...'
  }
})

// 🌟 四大核心模組結構化資料
const coreModules = [
  {
    id: 'm1',
    num: '01',
    route: '/one-page-scam',
    theme: 'cyber-blue',
    icon: 'fas fa-chart-bar',
    title: '歷年數據分析＆一頁式網購拆解',
    desc: '視覺化呈現全台詐欺趨勢與攔阻成效，內建「6層網址資安檢測引擎」與「0-100分雙模式風險量化表」，精準識破假網購與幽靈包裹。',
    tags: ['Open Data視覺化', 'DNS/WHOIS掃描', '0-100分風險引擎'],
    cta: '啟動數據與網購檢測中心'
  },
  {
    id: 'm2',
    num: '02',
    route: '/ai-fraud-news',
    theme: 'cyber-red',
    icon: 'fas fa-user-secret',
    title: '2026重大科技詐騙新聞案例探討',
    desc: '深入剖析AI深偽亂入選舉罷免、全球加密貨幣詐騙暴增四倍、假檢警視訊詐走九千萬，以及黑幫跨國水房與十大常見手法。',
    tags: ['Deepfake視訊犯罪', '黑幫跨國水房', '十大詐騙排行'],
    cta: '翻閱深度案例調查檔案'
  },
  {
    id: 'm3',
    num: '03',
    route: '/anti-deepfake-video',
    theme: 'cyber-amber',
    icon: 'fas fa-photo-video',
    title: '165警政署與金融機構宣導影音',
    desc: '實境演練如何透過「轉頭揮手測試」破解Deepfake視訊來電，並揭露LINE投票釣魚盜號、罰單簡訊與房產二胎抵押連環套路。',
    tags: ['深偽破圖實測', 'OTP釣魚攔截', '地面師房產防禦'],
    cta: '觀看官方實境演練影音'
  },
  {
    id: 'm4',
    num: '04',
    route: '/summary',
    theme: 'cyber-emerald',
    icon: 'fas fa-shield-alt',
    title: '國家資安與犯罪心理學防制研究',
    desc: '全站總結核心：從Web3洗錢拓撲、受害者大腦杏仁核劫持、瑞士起司制度破口，到FIDO2與零信任（Zero Trust）五大行動方案。',
    tags: ['行為經濟學剖析', '瑞士起司破口', 'Zero Trust行動方案'],
    cta: '研讀完整防制研究'
  }
]

// 🌟 4 大官方 QR Code 結構化資料
const qrCodeItems = [
  {
    id: 'ios',
    img: 'images/code1.jpg',
    badge: 'iOS官方版',
    icon: 'fab fa-apple',
    tagClass: 'ios-tag',
    title: '內政部警政服務 APP',
    subtitle: '支援165專線快速報案、可疑來電顯示與詐騙網址即時查詢（App Store認證）'
  },
  {
    id: 'android',
    img: 'images/code2.jpg',
    badge: 'Android官方版',
    icon: 'fab fa-android',
    tagClass: 'android-tag',
    title: '內政部警政服務 APP',
    subtitle: '支援165專線快速報案、可疑來電顯示與詐騙網址即時查詢（Google Play認證）'
  },
  {
    id: 'facebook',
    img: 'images/code3.jpg',
    badge: 'Facebook社群',
    icon: 'fab fa-facebook',
    tagClass: 'fb-tag',
    title: '165 全民防騙官方粉專',
    subtitle: '刑事警察局官方經營，每日更新最新高發詐騙手法、假投資名單與真實案例懶人包'
  },
  {
    id: 'line',
    img: 'images/code4.jpg',
    badge: 'LINE防詐機器人',
    icon: 'fab fa-line',
    tagClass: 'line-tag',
    title: '165 防騙宣導官方帳號',
    subtitle: '直接於對話框輸入可疑LINE ID、電話或購物網址，即可秒速比對警政署黑名單資料庫'
  }
]

const activeModal = ref(null)
const copied = ref(false)

const openModal = (item) =>{
  activeModal.value = item
}

const closeModal = () =>{
  activeModal.value = null
}

const handleCardMouseMove = (e) =>{
  const card = e.currentTarget
  const rect = card.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  card.style.setProperty('--mouse-x', `${x}px`)
  card.style.setProperty('--mouse-y', `${y}px`)
}

const copyEmail = () =>{
  const email = 'yihua0988@gmail.com'
  navigator.clipboard.writeText(email).then(() =>{
    copied.value = true
    setTimeout(() =>{ copied.value = false }, 2500)
  }).catch(err =>{
    console.error('複製失敗:', err)
  })
}

// =========================================================================
// 🌟 移植自打詐成效頁面的資料解析與正規化邏輯 (對應 anti_fraud_performance 資料表)
// =========================================================================
function toMonthIndex(y, m) {
  return y * 12 + (m - 1)
}

function parseDateAndQuarter(row) {
  let yr = Number(row.年度 || row.年份 || row.年 || 0)
  let rawMoOrQ = Number(row.月份 || row.月 || row.季 || row.季度 || row.季別 || 0)
  let mo = 1

  const dateStr = String(row.統計期 || row.年月 || row.期間 || row.日期 || row.季別 || row.季度 || '')
  const mMatch = dateStr.match(/(\d{2,4})\s*[年/\-.]\s*(\d{1,2})/)

  if (mMatch) {
    if (!yr) yr = parseInt(mMatch[1], 10)
    rawMoOrQ = parseInt(mMatch[2], 10)
  }

  if (yr >0 && yr< 1911) yr += 1911
  mo = rawMoOrQ >= 1 && rawMoOrQ<= 12 ? rawMoOrQ : 1

  return { yr, mo }
}

function splitCategoryAndName(labelParts, fallbackTopicName) {
  let category = fallbackTopicName
  let name = fallbackTopicName

  if (labelParts.length >= 2) {
    category = labelParts[0].trim()
    name = labelParts.slice(1).join(' - ').trim()
  } else if (labelParts.length === 1) {
    const single = labelParts[0].trim()
    const splitMatch = single.split(/\s*[-_：:]\s*/)
    if (splitMatch.length >= 2) {
      category = splitMatch[0].trim()
      name = splitMatch.slice(1).join(' - ').trim()
    } else {
      name = single
    }
  }

  const baseName = name.replace(/\s*[-_]\s*(發生數|財損金額|金額|件數|筆數)$/, '').trim()
  return { category, name, baseName }
}

function normalizePerformanceRows(rows) {
  const records = []
  const metaKeys = new Set([
    'id', '年度', '年份', '年', '月份', '月', '季', '季度', '季別',
    '統計期', '年月', '期間', '日期', '單位', '數值', 'created_at', 'updated_at'
  ])

  rows.forEach(row =>{
    const { yr, mo } = parseDateAndQuarter(row)
    if (!yr) return

    // 打詐成效統計從民國 113 年 (2024年) 11 月開始
    if (yr< 2024 || (yr === 2024 && mo<= 10)) return

    if (row.數值 !== undefined && row.數值 !== null) {
      const val = Number(String(row.數值).replace(/,/g, '')) || 0
      const unit = String(row.單位 || '件').trim()
      if (unit.toUpperCase() === 'GB') return

      const labelParts = []
      Object.entries(row).forEach(([k, v]) =>{
        if (!metaKeys.has(k) && v !== null && v !== undefined) {
          const s = String(v).trim()
          if (s && s !== '總計' && s !== '合計') labelParts.push(s)
        }
      })

      let { name } = splitCategoryAndName(labelParts, '打詐成效統計')
      if (name === '總計' || name === '合計') return

      if (unit === '元') {
        if (name.includes('查扣') || name.includes('不法所得')) {
          name = '查扣不法所得'
        } else {
          name = '受害人被騙金額'
        }
        records.push({ yr, mo, name, unit, val })
      }
    } else {
      Object.entries(row).forEach(([k, v]) =>{
        if (metaKeys.has(k) || v === null || v === undefined) return
        const num = Number(String(v).replace(/,/g, '').replace(/%/g, ''))
        if (!isNaN(num)) {
          let unit = '件'
          if (k.includes('率') || k.includes('比') || String(v).includes('%')) unit = '%'
          else if (k.includes('額') || k.includes('元')) unit = '元'

          if (unit === '元') {
            let { name } = splitCategoryAndName([k.trim()], '打詐成效統計')
            if (name.includes('查扣') || name.includes('不法所得')) {
              name = '查扣不法所得'
            } else {
              name = '受害人被騙金額'
            }
            records.push({ yr, mo, name, unit, val: num })
          }
        }
      })
    }
  })

  return records
}

async function fetchPerformanceData() {
  // 優先使用環境變數 REST API 批次抓取，若無則退回使用 supabase client
  if (SUPABASE_URL && SUPABASE_ANON_KEY) {
    const headers = {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`
    }
    const pageSize = 1000
    let offset = 0
    let allData = []

    while (true) {
      const url = `${SUPABASE_URL}/rest/v1/anti_fraud_performance?select=*&limit=${pageSize}&offset=${offset}`
      const res = await fetch(url, { headers })
      if (!res.ok) throw new Error(`讀取 anti_fraud_performance 失敗 (HTTP ${res.status})`)
      const chunk = await res.json()
      allData = allData.concat(chunk)
      if (chunk.length< pageSize) break
      offset += pageSize
    }
    return allData
  } else {
    const { data, error } = await supabase.from('anti_fraud_performance').select('*')
    if (error) throw error
    return data || []
  }
}

onMounted(async () =>{
  // 1. 左邊兩格（新竹市、18-23歲）維持原本的載入更新
  setTimeout(() =>{
    heroStats.value.city = {
      period: '115/06 ~ 115/08',
      name: '新竹市',
      rate: '每萬人 6.98',
      percent: '0.0698%',
      total: '955'
    }
    heroStats.value.age = {
      period: '115/06 ~ 115/08',
      group: '18-23歲',
      rate: '每萬人 9.31',
      total: '3,586'
    }
  }, 600)

  // 2. 最右邊那格（打詐財損與查扣）：從 anti_fraud_performance 抓最新資料並算近一年 (12個月)
  try {
    const rawRows = await fetchPerformanceData()
    const records = normalizePerformanceRows(rawRows)

    if (!records.length) throw new Error('無有效金額紀錄')

    // 找出資料表中「最新」與「最舊」的有效月份索引 (排除 0 值)
    let minMIdx = 999999
    let maxMIdx = 0
    records.forEach(r =>{
      if (r.val >0) {
        const mIdx = toMonthIndex(r.yr, r.mo)
        if (mIdx< minMIdx) minMIdx = mIdx
        if (mIdx >maxMIdx) maxMIdx = mIdx
      }
    })

    if (maxMIdx === 0) throw new Error('無大於 0 的金額資料')

    // 🌟 以最新資料月份 (maxMIdx) 往前推算近一年 (12 個月)
    const startIdx = Math.max(minMIdx, maxMIdx - 12 + 1)
    const actualMonths = maxMIdx - startIdx + 1

    const startY = Math.floor(startIdx / 12) - 1911
    const startM = String((startIdx % 12) + 1).padStart(2, '0')
    const endY = Math.floor(maxMIdx / 12) - 1911
    const endM = String((maxMIdx % 12) + 1).padStart(2, '0')

    // 篩選在「近一年區間內 (startIdx ~ maxMIdx)」的資料並分別加總
    let totalVictimMoney = 0
    let totalSeizedMoney = 0

    records.forEach(r =>{
      const idx = toMonthIndex(r.yr, r.mo)
      if (idx >= startIdx && idx<= maxMIdx) {
        if (r.name === '受害人被騙金額') totalVictimMoney += r.val
        else if (r.name === '查扣不法所得') totalSeizedMoney += r.val
      }
    })

    // 換算成「億元」並計算查扣率與月均
    const victimBillion = totalVictimMoney / 100000000
    const seizedBillion = totalSeizedMoney / 100000000
    const avgBillion = victimBillion / actualMonths
    const seizeRateVal = totalVictimMoney >0 ? ((totalSeizedMoney / totalVictimMoney) * 100).toFixed(1) : '0.0'

    // 更新最右邊那一格
    heroStats.value.finance = {
      period: `${startY}/${startM} ~ ${endY}/${endM}`,
      seizeRate: `${seizeRateVal}%`,
      seizeAmount: `${seizedBillion.toFixed(1)} 億元`,
      monthlyAvg: `${avgBillion.toFixed(1)} 億元`,
      totalBlocked: `${victimBillion.toFixed(1)} 億元`
    }
  } catch (error) {
    console.error('抓取 anti_fraud_performance 計算近一年數據失敗:', error)
    heroStats.value.finance = {
      period: '資料讀取失敗',
      seizeRate: '---',
      seizeAmount: '---',
      monthlyAvg: '---',
      totalBlocked: '---'
    }
  }
})
</script>