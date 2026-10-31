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
import { ref, onMounted } from 'vue'
import { supabase } from './lib/supabase.js'

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

onMounted(() => {
  fetchDatabaseUpdateTime()
})
</script>