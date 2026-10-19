<template>
  <!-- 主導覽列 (強制重整，釋放 RAM 與阻擋擴充功能干擾) -->
<nav>
  <!-- 1. 首頁 -->
  <a href="/PFvue/" :class="{ 'router-link-active': ['/'].includes($route.path) }">
    <i class="fas fa-home"></i>首頁
  </a>

  <!-- 2. 資料視覺化 -->
  <a href="/PFvue/fraud-patterns" :class="{ 'router-link-active': ['/fraud-patterns', '/fraud-trends', '/fraud-interception', '/anti-fraud-results', '/one-page-scam'].includes($route.path) }">
    <i class="fas fa-chart-bar"></i>資料視覺化
  </a>

  <!-- 3. 案例分析 -->
  <a href="/PFvue/prevention" :class="{ 'router-link-active': ['/prevention', '/fraud-growth-stats', '/ai-fraud-news', '/top-10-frauds'].includes($route.path) }">
    <i class="fas fa-chart-line"></i>案例分析
  </a>

  <!-- 4. 165反詐影片 -->
  <a href="/PFvue/anti-deepfake-video" :class="{ 'router-link-active': ['/anti-deepfake-video', '/anti-phishing-video', '/anti-investment-video'].includes($route.path) }">
    <i class="fas fa-shield-alt"></i>165反詐影片
  </a>

  <!-- 5. 總結 -->
  <a href="/PFvue/summary" :class="{ 'router-link-active': ['/summary', '/victim-profile', '/fraud-vulnerabilities', '/action-plan'].includes($route.path) }">
    <i class="fas fa-file-alt"></i>總結
  </a>
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

  <!-- 🌟 全域懸浮按鈕 (常駐右下角，點擊直接啟動 /one-page-scam 的防詐檢測分頁) -->
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
import { supabase } from './lib/supabase.js' // 🌟 修正相對路徑，讓 Vite 可以正確找到檔案

const lastUpdatedDate = ref('讀取中...')
const siteViews = ref('...') // 初始保留 '...' 避免載入瞬間閃爍 0

async function fetchDatabaseUpdateTime() {
  try {
    // -------------------------------------------------------------
    // 🌟 1. 安全計數邏輯：呼叫資料庫內部的 RPC 函數自動 +1
    // -------------------------------------------------------------
    const { data: newViews, error: rpcError } = await supabase
      .rpc('increment_site_views') // 呼叫剛剛在 Supabase 建立的函數

    if (rpcError) throw rpcError

    // 更新前端畫面顯示
    siteViews.value = newViews

    // -------------------------------------------------------------
    // 🌟 2. 從 Supabase 抓取最新一筆資料的 updated_at 時間
    // -------------------------------------------------------------
    const { data: locData, error: locError } = await supabase
      .from('police_location')
      .select('updated_at')
      .order('updated_at', { ascending: false })
      .limit(1)

    if (!locError && locData?.[0]?.updated_at) {
      lastUpdatedDate.value = locData[0].updated_at.slice(0, 10)
    } else {
      // 找不到時間的退守值
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

<style>
/* 🌟 保護頁尾不被浮動按鈕擋住 */
footer {
  position: relative;
  padding-bottom: 80px !important; /* 確保滑到最底時，下方留有空間給按鈕 */
}

/* 🌟 全域懸浮按鈕大紅光呼吸燈閃爍動畫 (Red Glow Pulse Animation) */
@keyframes globalRedPulse {
  0% {
    box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.85);
    border-color: #f87171;
    transform: scale(1);
  }
  50% {
    box-shadow: 0 0 0 16px rgba(239, 68, 68, 0);
    border-color: #fee2e2;
    transform: scale(1.05);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);
    border-color: #f87171;
    transform: scale(1);
  }
}

.global-floating-scam-btn {
  position: fixed;
  right: 28px;
  bottom: 32px;
  z-index: 9999;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 22px;
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: #ffffff !important;
  border-radius: 50px;
  border: 3px solid #f87171;
  font-size: 17.5px;
  font-weight: 900;
  text-decoration: none;
  box-shadow: 0 6px 20px rgba(220, 38, 38, 0.4);
  animation: globalRedPulse 1.8s infinite cubic-bezier(0.4, 0, 0.6, 1);
  transition: all 0.2s ease;
  backdrop-filter: blur(8px);
}

.global-floating-scam-btn:hover {
  background: linear-gradient(135deg, #dc2626, #b91c1c);
  transform: translateY(-3px) scale(1.06);
  box-shadow: 0 10px 25px rgba(220, 38, 38, 0.6);
  border-color: #ffffff;
}

.float-icon {
  font-size: 20px;
}

.float-text {
  letter-spacing: 0.5px;
}

@media (max-width: 600px) {
  .global-floating-scam-btn {
    right: 18px;
    bottom: 20px;
    padding: 12px 16px;
    font-size: 15px;
  }
}

.footer-author-link {
  color: #0284c7 !important;
  font-weight: 800 !important;
  text-decoration: none !important;
  border-bottom: 1.5px solid rgba(2, 132, 199, 0.3) !important;
  transition: all 0.2s ease !important;
}

.footer-author-link:hover {
  color: #0369a1 !important;
  border-bottom-color: #0369a1 !important;
  background-color: transparent !important;
}	
</style>