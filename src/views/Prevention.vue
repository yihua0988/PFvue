<template>
  <main class="content">
    
    <h1 class="main-title">AI 亂入罷免：深偽詐騙新聞</h1>

    <!-- 子頁面選單 (4x2 網格) -->
    <div class="subpages" style="grid-template-columns: repeat(4, 1fr);">
      <router-link to="/prevention"><i class="fas fa-robot"></i>&nbsp;AI深偽亂入罷免案例</router-link>
      <router-link to="/fraud-growth-stats"><i class="fas fa-chart-bar"></i>&nbsp;AI科技與黑幫犯罪分析</router-link>
      <router-link to="/ai-fraud-news"><i class="fas fa-newspaper"></i>&nbsp;AI假檢警詐騙九千萬</router-link>
      <router-link to="/top-10-frauds"><i class="fas fa-list-ol"></i>&nbsp;十大常見詐騙解析</router-link>
      
      <!-- 預留的 4 個空位 -->
      <a href="#" class="disabled" @click.prevent><i class="fas fa-plus"></i>&nbsp;敬請期待</a>
      <a href="#" class="disabled" @click.prevent><i class="fas fa-plus"></i>&nbsp;敬請期待</a>
      <a href="#" class="disabled" @click.prevent><i class="fas fa-plus"></i>&nbsp;敬請期待</a>
      <a href="#" class="disabled" @click.prevent><i class="fas fa-plus"></i>&nbsp;敬請期待</a>
    </div>

    <!-- 內文解析卡片 -->
    <div class="page-title">
      <h2><i class="fas fa-comment-dots"></i> 案例解析與影響</h2>
      <p>
        本新聞案例凸顯 AI 技術已被運用於政治領域的資訊操縱，尤其是在敏感的罷免議題中，出現了立委聲音遭變造、照片被盜用的情況。這不僅涉及個人名譽受損，更可能誤導選民，影響民主程序的公平性。
      </p>
      <p>
        從報導可見，罷免相關影片與語音被剪輯或偽造後，在網路與通訊軟體中快速傳播，使一般民眾難以分辨真偽。這種<strong>「深偽詐騙」</strong>行為已超越傳統經濟型詐騙，帶有政治操作風險，破壞社會信任。
      </p>
      <p>
        王育敏委員強調「適可而止」，也呼籲透過法律途徑制止違法操作。此案例提醒我們，AI 雖能提升便利，但也被濫用於虛假訊息，民眾在接收資訊時更需保持懷疑與查證，以免誤信假訊息，成為資訊詐騙的受害者。
      </p>
    </div>

    <!-- 嵌入新聞區域 -->
    <div class="iframe-section">
      <h2 style="color: #0f172a; margin-top: 40px; margin-bottom: 20px;">
        <i class="fas fa-tv"></i> 新聞內容預覽
      </h2>
      
      <div class="iframe-wrapper">
        <!-- 🌟 修正重點：使用動態計算的 iframeSrc，支援 GitHub Pages 子路徑 -->
        <iframe 
          :src="iframeSrc" 
          title="AI亂入罷免戰藍委聲音遭變造 本地檔案"
          sandbox="allow-same-origin allow-scripts"
          frameborder="0">
        </iframe>
      </div>

      <p class="source-link-container">
        <a href="https://udn.com/news/story/124323/8847566" target="_blank" rel="noopener noreferrer" class="source-link">
          <i class="fas fa-external-link-alt"></i> 來源：聯合新聞網 (點擊查看原文)
        </a>
      </p>
    </div>

  </main>
</template>

<script setup>
import { computed } from 'vue'

// 🌟 必須加上資料夾名稱 udn-news-ai/
const iframeSrc = computed(() => {
  return `${import.meta.env.BASE_URL}udn-news-ai/udn-news-ai.html`
})
</script>

<style scoped>
/* 針對沒有開放的按鈕樣式 */
.disabled {
  background-color: #e2e8f0 !important;
  color: #94a3b8 !important;
  cursor: not-allowed;
  border-color: #cbd5e1 !important;
  box-shadow: none !important;
}
.disabled:hover {
  transform: none !important;
}

/* iframe 區塊排版 */
.iframe-section {
  text-align: center;
}
.iframe-wrapper {
  margin: 0 auto;
  max-width: 900px;
  height: 600px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  border: 1px solid #cbd5e1;
  background: #fff;
}
.iframe-wrapper iframe {
  width: 100%;
  height: 100%;
}

/* 來源連結按鈕美化 */
.source-link-container {
  margin-top: 20px;
  margin-bottom: 40px;
}
.source-link {
  display: inline-block;
  color: #0284c7;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.1rem;
  padding: 10px 20px;
  border-radius: 8px;
  background-color: #f0f9ff;
  border: 1px solid #bae6fd;
  transition: all 0.3s ease;
}
.source-link:hover {
  background-color: #e0f2fe;
  color: #0369a1;
  border-color: #7dd3fc;
  box-shadow: 0 4px 10px rgba(2, 132, 199, 0.1);
}

/* RWD 微調 */
@media (max-width: 768px) {
  .subpages {
    grid-template-columns: 1fr 1fr !important;
  }
  .iframe-wrapper {
    height: 400px;
  }
}
@media (max-width: 480px) {
  .subpages {
    grid-template-columns: 1fr !important;
  }
}
</style>