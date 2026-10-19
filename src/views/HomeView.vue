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
           <a href="https://github.com/yihua0988/PFvue/tree/main/ppt" target="_blank" rel="noopener noreferrer" class="dev-btn ppt-btn">
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

<style scoped>
/* =========================================================================
   🌟 傳說級旗艦首頁樣式 (Cyber Command & Interactive Mouse Spotlight)
   ========================================================================= */

.dashboard-page {
  text-align: left !important;
}

.section-block {
  margin-top: 38px;
}

/* -------------------------------------------------------------------------
   1. 頂部戰情指揮中心 Hero Banner
   ------------------------------------------------------------------------- */
.legend-hero {
  position: relative;
  background: radial-gradient(circle at 85% 15%, #1e3a8a 0%, #090d16 58%, #020617 100%) !important;
  color: #f8fafc !important;
  border-radius: 22px;
  padding: 40px 44px;
  overflow: hidden;
  box-shadow: 0 25px 55px rgba(2, 6, 23, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(56, 189, 248, 0.3);
}

/* 戰術科技方格網底 */
.cyber-grid-overlay {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(to right, rgba(56, 189, 248, 0.06) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(56, 189, 248, 0.06) 1px, transparent 1px);
  background-size: 36px 36px;
  mask-image: radial-gradient(ellipse at 60% 40%, black 30%, transparent 80%);
  pointer-events: none;
}

/* 動態全息掃描線 */
.scanline-bar {
  position: absolute;
  top: 0;
  left: -100%;
  width: 60%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #38bdf8, transparent);
  box-shadow: 0 0 20px #38bdf8;
  animation: cyberScan 6s ease-in-out infinite;
  pointer-events: none;
}

@keyframes cyberScan {
  0% { left: -60%; opacity: 0; }
  30% { opacity: 1; }
  70% { opacity: 1; }
  100% { left: 110%; opacity: 0; }
}

.hero-glow { position: absolute; border-radius: 50%; filter: blur(80px); pointer-events: none; opacity: 0.35; }
.hero-glow-1 { width: 320px; height: 320px; background: #0ea5e9; top: -100px; right: -50px; }
.hero-glow-2 { width: 260px; height: 260px; background: #6366f1; bottom: -90px; left: 10%; }

.hero-top-bar { position: relative; z-index: 2; display: flex; align-items: center; gap: 14px; margin-bottom: 18px; flex-wrap: wrap; }

.live-badge {
  display: inline-flex; align-items: center; gap: 8px;
  background: rgba(239, 68, 68, 0.2); border: 1px solid rgba(248, 113, 113, 0.5);
  color: #fca5a5; font-size: 14px; font-weight: 900;
  letter-spacing: 1.2px; padding: 6px 14px; border-radius: 99px;
}
.pulse-dot { width: 10px; height: 10px; background-color: #ef4444; border-radius: 50%; box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.8); animation: pulseRed 1.8s infinite; }
@keyframes pulseRed { 0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.8); } 70% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); } 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); } }

.system-tag {
  font-size: 14px; font-weight: 800; letter-spacing: 1.5px; color: #38bdf8;
  background: rgba(56, 189, 248, 0.12); padding: 6px 14px;
  border-radius: 99px; border: 1px solid rgba(56, 189, 248, 0.3);
}

.hero-main-title {
  position: relative; z-index: 2;
  font-size: clamp(32px, 4vw, 46px) !important; font-weight: 900 !important; margin: 0 0 14px 0 !important;
  background: linear-gradient(95deg, #ffffff 0%, #e0f2fe 55%, #38bdf8 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  text-align: left !important;
}

.hero-subtitle {
  position: relative; z-index: 2;
  font-size: 21px !important; color: #cbd5e1 !important; line-height: 1.7 !important;
  margin: 0 0 30px 0 !important; max-width: 920px; text-align: left !important;
}

/* 🌟 動態戰情看板樣式 */
.hero-stats-board {
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  background: rgba(8, 17, 38, 0.75);
  border: 1px solid rgba(56, 189, 248, 0.2);
  border-radius: 16px;
  padding: 24px 28px;
  margin: 25px 0;
  backdrop-filter: blur(12px);
  gap: 20px;
}

.stat-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 0;
}

.stat-divider {
  width: 1px;
  background: rgba(255, 255, 255, 0.12);
  margin: 4px 0;
}

.stat-badge {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.8rem;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 20px;
  margin-bottom: 12px;
  gap: 8px;
}
.stat-badge span {
  opacity: 0.8;
  font-weight: 500;
  font-size: 0.75rem;
}
.badge-red {
  background: rgba(239, 68, 68, 0.15);
  color: #fca5a5;
  border: 1px solid rgba(239, 68, 68, 0.3);
}
.badge-blue {
  background: rgba(14, 165, 233, 0.15);
  color: #7dd3fc;
  border: 1px solid rgba(14, 165, 233, 0.3);
}

.stat-main {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 10px;
  flex-wrap: wrap;
}
.highlight-title {
  font-size: 1.5rem;
  font-weight: 900;
  color: #ffffff;
  letter-spacing: 0.5px;
}
.highlight-num {
  font-size: 1.35rem;
  font-weight: 900;
  font-family: 'Segoe UI', Roboto, sans-serif;
}
.highlight-num small {
  font-size: 0.85rem;
  font-weight: 700;
}
.text-red { color: #f87171; text-shadow: 0 0 12px rgba(248, 113, 113, 0.4); }
.text-blue { color: #38bdf8; text-shadow: 0 0 12px rgba(56, 189, 248, 0.4); }

.stat-desc {
  font-size: 0.85rem;
  color: #94a3b8;
  line-height: 1.5;
}
.stat-desc strong {
  color: #e2e8f0;
}

@media (max-width: 992px) {
  .hero-stats-board {
    flex-direction: column;
    padding: 20px;
    gap: 18px;
  }
  .stat-divider {
    width: 100%;
    height: 1px;
    margin: 0;
  }
  .highlight-title { font-size: 1.35rem; }
  .highlight-num { font-size: 1.2rem; }
}

.hero-source-box {
  position: relative; z-index: 2;
  display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap;
  background: rgba(255, 255, 255, 0.05) !important; border: 1px solid rgba(255, 255, 255, 0.14);
  padding: 16px 24px; border-radius: 14px;
}
.source-text { font-size: 18px; color: #f1f5f9 !important; display: flex; align-items: center; flex-wrap: wrap; gap: 8px; line-height: 1.6; }
.source-pill { background: rgba(56, 189, 248, 0.2); color: #7dd3fc !important; border: 1px solid rgba(56, 189, 248, 0.4); padding: 4px 12px; border-radius: 8px; font-weight: 800; font-size: 16px; }

.hero-source-btn {
  text-decoration: none !important; background: linear-gradient(135deg, #0284c7, #2563eb) !important; color: #ffffff !important;
  font-size: 17px !important; font-weight: 800 !important; padding: 10px 22px !important; border-radius: 10px !important;
  border: 1px solid rgba(125, 211, 252, 0.4) !important; transition: all 0.25s ease; white-space: nowrap;
  box-shadow: 0 6px 18px rgba(2, 132, 199, 0.35) !important;
}
.hero-source-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 25px rgba(2, 132, 199, 0.55) !important; }

/* -------------------------------------------------------------------------
   2. 第一層 [ 2 ]：2x2 傳說級暗黑曜石裝甲矩陣
   ------------------------------------------------------------------------- */
.section-title-bar { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 22px; flex-wrap: wrap; gap: 12px; }
.section-eyebrow { display: block; font-size: 13px; font-weight: 900; letter-spacing: 2px; color: #0284c7; margin-bottom: 4px; }
.section-title-bar h2 { font-size: 32px !important; font-weight: 900 !important; color: #0f172a !important; margin: 0 !important; }
.section-hint { font-size: 16px; color: #475569; font-weight: 700; background: #e2e8f0; padding: 6px 14px; border-radius: 99px; }

.bento-grid-2x2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 26px; }

.cyber-bento-card {
  --mouse-x: 50%;
  --mouse-y: 50%;
  --accent-color: #38bdf8;
  --accent-glow: rgba(56, 189, 248, 0.22);

  position: relative !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: space-between !important;
  text-decoration: none !important;
  background: linear-gradient(155deg, #0f172a 0%, #1e293b 100%) !important;
  color: #f8fafc !important;
  border-radius: 22px !important;
  padding: 34px 32px !important;
  border: 1px solid rgba(148, 163, 184, 0.22) !important;
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.22) !important;
  overflow: hidden !important;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease, border-color 0.35s ease !important;
}

.cyber-bento-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; width: 100%; height: 5px;
  background: var(--accent-color);
  box-shadow: 0 0 20px var(--accent-color);
  z-index: 3;
}

.spotlight-layer {
  position: absolute;
  inset: 0;
  background: radial-gradient(550px circle at var(--mouse-x) var(--mouse-y), var(--accent-glow), transparent 45%);
  opacity: 0;
  transition: opacity 0.35s ease;
  pointer-events: none;
  z-index: 1;
}

.card-bg-grid {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(255, 255, 255, 0.07) 1px, transparent 1px);
  background-size: 20px 20px;
  pointer-events: none;
  z-index: 0;
}

.watermark-num {
  position: absolute;
  right: 18px;
  bottom: -15px;
  font-size: 135px;
  font-weight: 900;
  line-height: 1;
  color: rgba(255, 255, 255, 0.035);
  pointer-events: none;
  user-select: none;
  z-index: 0;
  transition: transform 0.4s ease, color 0.4s ease;
}

.cyber-bento-card:hover {
  transform: translateY(-8px) scale(1.01) !important;
  border-color: var(--accent-color) !important;
  box-shadow: 0 25px 55px rgba(2, 6, 23, 0.4), 0 0 28px var(--accent-glow) !important;
}

.cyber-bento-card:hover .spotlight-layer { opacity: 1; }
.cyber-bento-card:hover .watermark-num { transform: scale(1.08) translateX(-6px); color: rgba(255, 255, 255, 0.07); }

.card-inner { position: relative; z-index: 0; display: flex; flex-direction: column; height: 100%; }

.card-header-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }

.cyber-badge {
  display: inline-flex; align-items: center; gap: 8px;
  font-size: 14px; font-weight: 900; letter-spacing: 1.5px;
  padding: 6px 14px; border-radius: 99px;
  background: rgba(255, 255, 255, 0.08);
  color: var(--accent-color) !important;
  border: 1px solid rgba(255, 255, 255, 0.14);
}

.badge-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--accent-color); box-shadow: 0 0 8px var(--accent-color); }

.cyber-icon-box {
  position: relative;
  z-index: 10;
  width: 54px; height: 54px; border-radius: 14px;
  display: flex; align-items: center; justify-content: center;
  font-size: 24px; color: var(--accent-color) !important;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15);
  transition: transform 0.3s ease, background 0.3s ease;
}
.cyber-bento-card:hover .cyber-icon-box { transform: rotate(-6deg) scale(1.1); background: rgba(255, 255, 255, 0.12); }

.cyber-card-title {
  font-size: 26px !important; font-weight: 900 !important;
  color: #ffffff !important; margin: 0 0 14px 0 !important;
  line-height: 1.4 !important; text-align: left !important;
}

.cyber-card-desc {
  font-size: 20px !important; line-height: 1.75 !important;
  color: #cbd5e1 !important; margin: 0 0 22px 0 !important;
  text-align: left !important; flex-grow: 1;
}

.cyber-tags-row { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 24px; }
.cyber-tag {
  font-size: 14px; font-weight: 700; color: #e2e8f0 !important;
  background: rgba(15, 23, 42, 0.65); border: 1px solid rgba(148, 163, 184, 0.25);
  padding: 5px 12px; border-radius: 8px;
}

.cyber-card-footer {
  display: flex; align-items: center; justify-content: space-between;
  padding-top: 18px; border-top: 1px solid rgba(148, 163, 184, 0.2);
  font-size: 19px; font-weight: 900; color: var(--accent-color) !important;
}

.action-arrow {
  width: 38px; height: 38px; border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  display: flex; align-items: center; justify-content: center;
  transition: transform 0.3s ease, background 0.3s ease, color 0.3s ease;
}
.cyber-bento-card:hover .action-arrow {
  transform: translateX(6px);
  background: var(--accent-color);
  color: #020617 !important;
}

.cyber-blue { --accent-color: #38bdf8; --accent-glow: rgba(56, 189, 248, 0.25); }
.cyber-red { --accent-color: #fb7185; --accent-glow: rgba(251, 113, 133, 0.25); }
.cyber-amber { --accent-color: #fbbf24; --accent-glow: rgba(251, 191, 36, 0.25); }
.cyber-emerald { --accent-color: #34d399; --accent-glow: rgba(52, 211, 153, 0.25); }

/* -------------------------------------------------------------------------
   3. 第二層 [ 1 ]：165 戰情室大螢幕終端機容器
   ------------------------------------------------------------------------- */
.terminal-panel { background: #0f172a; border-radius: 20px; overflow: hidden; border: 1px solid #334155; box-shadow: 0 20px 45px rgba(15, 23, 42, 0.22); }
.terminal-header { display: flex; align-items: center; justify-content: space-between; padding: 18px 26px; background: #1e293b; border-bottom: 1px solid #334155; flex-wrap: wrap; gap: 12px; }
.window-dots { display: flex; align-items: center; gap: 8px; }
.dot { width: 13px; height: 13px; border-radius: 50%; }
.dot-red { background: #ef4444; } .dot-yellow { background: #f59e0b; } .dot-green { background: #10b981; }
.terminal-code { font-family: monospace; font-size: 13px; color: #94a3b8; margin-left: 8px; letter-spacing: 1px; }
.terminal-title { color: #f8fafc; font-size: 18px; font-weight: 800; display: flex; align-items: center; gap: 9px; }

.terminal-ext-btn {
  text-decoration: none !important; background: rgba(56, 189, 248, 0.18) !important; color: #38bdf8 !important;
  border: 1px solid rgba(56, 189, 248, 0.4) !important; padding: 8px 18px !important; border-radius: 10px !important;
  font-size: 16px !important; font-weight: 800 !important; transition: all 0.2s;
}
.terminal-ext-btn:hover { background: #0284c7 !important; color: #ffffff !important; }
.terminal-body iframe { width: 100%; height: 75vh; min-height: 650px; border: none; display: block; background: #ffffff; }

/* -------------------------------------------------------------------------
   4. 第三層 [ 1 ]：防詐 App 磁貼與開源資訊面板
   ------------------------------------------------------------------------- */
.command-footer-panel { background: #ffffff; border: 1px solid #cbd5e1; border-radius: 22px; padding: 38px 40px; box-shadow: 0 15px 40px rgba(15, 23, 42, 0.08); }
.footer-panel-header { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; margin-bottom: 28px; padding-bottom: 20px; border-bottom: 1px solid #e2e8f0; }
.footer-panel-header h2 { font-size: 30px !important; font-weight: 900 !important; color: #0f172a !important; margin: 4px 0 8px 0 !important; }
.footer-panel-header p { font-size: 19px !important; color: #475569 !important; margin: 0 !important; }
.qr-bento-list { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; list-style: none; padding: 0; margin: 0 0 32px 0; }
.qr-holo-card {
  background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%) !important;
  border: 2px solid #e2e8f0 !important; border-radius: 18px !important; padding: 22px 18px !important;
  display: flex; flex-direction: column; align-items: center; text-align: center; cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.qr-holo-card:hover { transform: translateY(-8px); background: #ffffff !important; border-color: #0284c7 !important; box-shadow: 0 18px 35px rgba(2, 132, 199, 0.16) !important; }

.qr-img-box {
  position: relative; width: 145px; height: 145px; background: #ffffff; padding: 8px;
  border-radius: 14px; border: 1px solid #cbd5e1; margin-bottom: 16px; overflow: hidden;
}
.qr-img-box img { width: 100%; height: 100%; object-fit: contain; display: block; }

.qr-hover-mask {
  position: absolute; inset: 0; background: rgba(15, 23, 42, 0.78); color: #38bdf8;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px;
  font-size: 15px; font-weight: 900; opacity: 0; transition: opacity 0.25s ease;
}
.qr-hover-mask i { font-size: 26px; }
.qr-holo-card:hover .qr-hover-mask { opacity: 1; }

.qr-info h4 { font-size: 20px !important; font-weight: 900 !important; color: #0f172a !important; margin: 10px 0 6px 0 !important; }
.qr-tag { font-size: 14px; font-weight: 900; padding: 4px 12px; border-radius: 99px; display: inline-block; }
.ios-tag { background: #0f172a; color: #ffffff; } .android-tag { background: #dcfce7; color: #166534; } .fb-tag { background: #dbeafe; color: #1e40af; } .line-tag { background: #d1fae5; color: #065f46; }
.qr-zoom-text { font-size: 16px; color: #0284c7; font-weight: 800; display: inline-flex; align-items: center; gap: 6px; }

.developer-bar { background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: #f8fafc; padding: 24px 30px; border-radius: 16px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 20px; border: 1px solid #334155; }
.dev-links { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }

.dev-btn {
  text-decoration: none !important; font-size: 18px !important; font-weight: 800 !important; padding: 12px 24px !important;
  border-radius: 10px !important; display: inline-flex !important; align-items: center; gap: 10px; transition: all 0.2s;
}
.github-btn { background: #334155 !important; color: #ffffff !important; border: 1px solid #475569 !important; }
.github-btn:hover { background: #475569 !important; transform: translateY(-2px); }
.ppt-btn { background: rgba(249, 115, 22, 0.22) !important; color: #fdba74 !important; border: 1px solid rgba(249, 115, 22, 0.45) !important; }
.ppt-btn:hover { background: #ea580c !important; color: #ffffff !important; transform: translateY(-2px); }

.dev-contact { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; cursor: pointer; background: rgba(255, 255, 255, 0.07); padding: 12px 20px; border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.15); transition: all 0.2s; }
.dev-contact:hover { background: rgba(255, 255, 255, 0.14); border-color: #38bdf8; }
.dev-label { font-size: 18px; color: #e2e8f0; } .dev-email { font-size: 21px; font-weight: 900; color: #38bdf8; }
.copy-chip { font-size: 15px; background: #0284c7; color: #ffffff; padding: 5px 12px; border-radius: 8px; font-weight: 800; }

/* ======================================= */
/* 🌟 傳說級全息掃描燈箱 (Holographic Modal) */
/* ======================================= */
:global(.modal-backdrop) {
  position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
  background-color: rgba(2, 6, 23, 0.82); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
  display: flex; justify-content: center; align-items: center; z-index: 999999;
}

:global(.modal-dialog) {
  background: linear-gradient(165deg, #0f172a 0%, #1e293b 100%);
  color: #f8fafc; padding: 36px 32px; border-radius: 26px;
  position: relative; text-align: center; max-width: 440px; width: 90vw;
  border: 1px solid rgba(56, 189, 248, 0.4);
  box-shadow: 0 30px 70px rgba(0, 0, 0, 0.65), 0 0 40px rgba(56, 189, 248, 0.2);
  display: flex; flex-direction: column; align-items: center;
}

:global(.modal-close-btn) {
  position: absolute; top: 16px; right: 16px;
  background-color: rgba(255, 255, 255, 0.1); color: #cbd5e1; border: 1px solid rgba(255, 255, 255, 0.15);
  width: 38px; height: 38px; border-radius: 50%;
  display: flex; justify-content: center; align-items: center;
  font-size: 18px; cursor: pointer; transition: all 0.25s;
}
:global(.modal-close-btn:hover) { background-color: #ef4444; color: #ffffff; transform: rotate(90deg); }

:global(.modal-top-tag) {
  font-size: 13px; font-weight: 800; color: #38bdf8;
  background: rgba(56, 189, 248, 0.15); border: 1px solid rgba(56, 189, 248, 0.35);
  padding: 5px 14px; border-radius: 99px; margin-bottom: 18px;
}

:global(.modal-img-wrapper) {
  position: relative; width: 260px; max-width: 75vw; background: #ffffff;
  padding: 14px; border-radius: 18px; border: 2px solid #38bdf8;
  margin-bottom: 22px; overflow: hidden;
  box-shadow: 0 0 25px rgba(56, 189, 248, 0.25);
}
:global(.modal-img) { width: 100%; height: auto; border-radius: 8px; display: block; }

:global(.qr-laser-line) {
  position: absolute; left: 0; top: 0; width: 100%; height: 3px;
  background: linear-gradient(90deg, transparent, #ef4444, #38bdf8, transparent);
  box-shadow: 0 0 12px #38bdf8;
  animation: qrLaserScan 2.4s ease-in-out infinite;
}
@keyframes qrLaserScan { 0%, 100% { top: 6%; } 50% { top: 92%; } }

:global(.modal-title) { font-size: 24px; font-weight: 900; color: #ffffff; margin: 0 0 10px 0; }
:global(.modal-subtitle) { font-size: 17px; color: #cbd5e1; margin: 0; line-height: 1.65; font-weight: 500; }

.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity 0.28s ease; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }
.modal-fade-enter-active .modal-dialog { animation: modalPopUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes modalPopUp { 0% { transform: scale(0.9) translateY(20px); opacity: 0; } 100% { transform: scale(1) translateY(0); opacity: 1; } }

@media (max-width: 960px) { .bento-grid-2x2 { grid-template-columns: 1fr; } .qr-bento-list { grid-template-columns: repeat(2, 1fr); } .stat-divider { display: none; } }

@media (max-width: 767px) {
  .developer-bar, .dev-links, .dev-contact {
    max-width: 100% !important;
    box-sizing: border-box !important;
    overflow: hidden !important;
	padding: 10px 12px!important;
  }
  .developer-bar a, .developer-bar button {
    width: 100% !important;
    max-width: 100% !important;
    white-space: normal !important;
    box-sizing: border-box !important;
    justify-content: center !important;
    padding: 10px 12px !important;
    font-size: 1rem !important;
  }
  .developer-bar, .developer-bar span, .developer-bar p, .developer-bar div, .dev-email {
    word-break: break-all !important;
    overflow-wrap: break-word !important;
  }
  .dev-label ,.dev-email,.copy-chip { font-size: 1rem !important;
  }
  .footer-panel-header h2 { font-size: 24px !important; font-weight: 800 !important; color: #0f172a !important; margin: 4px 0 8px 0 !important; 
  }
}

@media (max-width: 600px) { .legend-hero { padding: 28px 22px; } .qr-bento-list { grid-template-columns: 1fr; } .developer-bar { flex-direction: column; align-items: flex-start; } }
</style>