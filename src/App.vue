<template>
  <!-- 主導覽列 -->
  <nav>
    <router-link to="/" :class="{ 'router-link-exact-active': $route.path === '/' }">
      <i class="fas fa-home"></i>&nbsp;首頁
    </router-link>

    <router-link to="/fraud-patterns" :class="{ 'router-link-active': ['/fraud-patterns', '/fraud-trends', '/fraud-interception', '/anti-fraud-results', '/one-page-scam'].includes($route.path) }">
      <i class="fas fa-chart-bar"></i>&nbsp;資料視覺化
    </router-link>

    <router-link to="/prevention" :class="{ 'router-link-active': ['/prevention', '/fraud-growth-stats', '/ai-fraud-news', '/top-10-frauds'].includes($route.path) }">
      <i class="fas fa-chart-line"></i>&nbsp;案例分析
    </router-link>

    <router-link to="/anti-deepfake-video" :class="{ 'router-link-active': ['/anti-deepfake-video', '/anti-phishing-video', '/anti-investment-video'].includes($route.path) }">
      <i class="fas fa-shield-alt"></i>&nbsp;165反詐影片
    </router-link>

    <router-link to="/summary" :class="{ 'router-link-active': ['/summary', '/victim-profile', '/fraud-vulnerabilities', '/action-plan'].includes($route.path) }">
      <i class="fas fa-file-alt"></i>&nbsp;總結
    </router-link>
  </nav>
  <!-- ========================================== -->
    <!-- 2. 全站集中管理：動態子導覽列區塊 -->
    <!-- ========================================== -->
    
    <!-- A. 資料庫儀表板 (5欄) -->
    <div v-if="currentSubnav === 'dashboard'" class="subpages" style="grid-template-columns: repeat(5, 1fr);">
      <router-link to="/fraud-patterns"><i class="fas fa-map-marked-alt"></i>&nbsp;我住的縣市安全嗎？</router-link>
      <router-link to="/fraud-trends"><i class="fas fa-users"></i>&nbsp;哪種人最容易被騙？</router-link>
      <router-link to="/fraud-interception"><i class="fas fa-phone-slash"></i>&nbsp;假電話與盜刷防範</router-link>
      <router-link to="/anti-fraud-results"><i class="fas fa-shield-alt"></i>&nbsp;警示戶與打詐成效</router-link>
      <router-link to="/one-page-scam"><i class="fas fa-shopping-cart"></i>&nbsp;假網購長怎樣？</router-link>
    </div>

    <!-- B. 案例分析 (4欄) -->
    <div v-else-if="currentSubnav === 'cases'" class="subpages" style="grid-template-columns: repeat(4, 1fr);">
      <router-link to="/prevention"><i class="fas fa-project-diagram"></i>&nbsp;AI深偽亂入罷免案例</router-link>
      <router-link to="/fraud-growth-stats"><i class="fas fa-user-shield"></i>&nbsp;AI詐騙一年暴增四倍</router-link>
      <router-link to="/ai-fraud-news"><i class="fas fa-bug"></i>&nbsp;AI假檢警與黑幫經營</router-link>
      <router-link to="/top-10-frauds"><i class="fas fa-fist-raised"></i>&nbsp;十大常見詐騙解析</router-link>
    </div>

    <!-- C. 反詐影片專區 (3欄) -->
    <div v-else-if="currentSubnav === 'videos'" class="subpages" style="grid-template-columns: repeat(3, 1fr);">
      <router-link to="/anti-deepfake-video"><i class="fas fa-project-diagram"></i>&nbsp;反深偽詐騙</router-link>
      <router-link to="/anti-phishing-video"><i class="fas fa-user-shield"></i>&nbsp;常見詐騙手法分析</router-link>
      <router-link to="/anti-investment-video"><i class="fas fa-bug"></i>&nbsp;假投資詐騙解析</router-link>
    </div>

    <!-- D. 總結與行動方案 (4欄) -->
    <div v-else-if="currentSubnav === 'summary'" class="subpages" style="grid-template-columns: repeat(4, 1fr);">
      <router-link to="/summary"><i class="fas fa-project-diagram"></i>&nbsp;詐騙趨勢總結</router-link>
      <router-link to="/victim-profile"><i class="fas fa-user-shield"></i>&nbsp;受害人特徵分析</router-link>
      <router-link to="/fraud-vulnerabilities"><i class="fas fa-bug"></i>&nbsp;防詐破口與責任</router-link>
      <router-link to="/action-plan"><i class="fas fa-fist-raised"></i>&nbsp;防制與行動方案</router-link>
    </div>

  <!-- 頁面動態切換出口 -->
  <router-view />

  <footer>
    <div class="footer-meta-row">
      <span>🔄 資料庫最後更新：<strong>{{ lastUpdatedDate }}</strong></span>
      <span>|</span>
      <span>👁️ 網站累積點閱：<strong>{{ typeof siteViews === 'number' ? siteViews.toLocaleString() : siteViews }}</strong>人次</span>
    </div>
    <div>
      © 2026 台灣反詐騙資訊與數據分析網 | 
      <a href="https://yihua0988.github.io/" target="_blank" rel="noopener noreferrer" class="footer-author-link">洪益華</a> <span>版權所有</span>
    </div>
  </footer>

  <!-- 🌟 全域懸浮按鈕 -->
  <router-link 
    :to="{ path: '/one-page-scam', query: { tab: 'detector', t: Date.now() } }" 
    class="global-floating-scam-btn" 
    title="立即進行一分鐘網址安全與十題防詐測試！"
  >
    <span class="float-text">防詐檢測</span>
  </router-link>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue' // 🔥 補上 computed
import { useRoute } from 'vue-router'
import { supabase } from './lib/supabase.js'

const route = useRoute() // 🔥 補上這行，實例化 route 讓下方可以呼叫

const lastUpdatedDate = ref('讀取中...')
const siteViews = ref('...')

async function fetchDatabaseUpdateTime() {
  try {
    const { data: newViews, error: rpcError } = await supabase
      .rpc('increment_site_views')

    if (rpcError) throw rpcError
    siteViews.value = newViews

    const { data: locData, error: locError } = await supabase
      .from('police_location')
      .select('updated_at')
      .order('updated_at', { ascending: false })
      .limit(1)

    if (!locError && locData?.[0]?.updated_at) {
      lastUpdatedDate.value = locData[0].updated_at.slice(0, 10)
    } else {
      lastUpdatedDate.value = new Date().toISOString().slice(0, 10)
    }
  } catch (e) {
    console.error('資料庫連線失敗', e)
    siteViews.value = '連線異常' 
    lastUpdatedDate.value = new Date().toISOString().slice(0, 10)
  }
}

// 依照網址自動判斷現在該顯示哪一組子導覽列
const currentSubnav = computed(() => {
  const path = route.path

  if (['/fraud-patterns', '/fraud-trends', '/fraud-interception', '/anti-fraud-results', '/one-page-scam'].includes(path)) {
    return 'dashboard'
  }
  if (['/prevention', '/fraud-growth-stats', '/ai-fraud-news', '/top-10-frauds'].includes(path)) {
    return 'cases'
  }
  if (['/anti-deepfake-video', '/anti-phishing-video', '/anti-investment-video'].includes(path)) {
    return 'videos'
  }
  if (['/summary', '/victim-profile', '/fraud-vulnerabilities', '/action-plan'].includes(path)) {
    return 'summary'
  }
  
  return null // 如果是首頁或找不到的頁面，就不顯示子導覽列
})

onMounted(() => {
  fetchDatabaseUpdateTime()
})
</script>