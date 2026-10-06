<template>
  <main class="content">
    
    <h1 class="main-title">AI 詐騙一年暴增四倍多</h1>

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
        近一年來，全球加密貨幣詐騙案件暴增 456%，顯示詐騙集團已大量運用 <strong>AI 技術</strong>。透過<strong>深偽影像與聲音複製</strong>，詐騙手法不再侷限於簡訊與釣魚網頁，而是能製造出「親友求助」般的真實情境，讓受害者更難分辨。OpenAI 執行長 Sam Altman 也多次警告，傳統的聲紋認證、二階段驗證等機制已無法有效防禦，AI 足以突破既有資安防線。  
      </p>
      <p>
        報告指出，不僅散戶，連金融業高層與區塊鏈公司老闆都曾遭假冒熟人詐騙，造成數十億美元損失，實際金額可能更高。此案例凸顯 AI 技術帶來的雙面刃效應：一方面推動創新，另一方面卻<strong>加速資安風險</strong>。民眾與金融機構必須提升驗證機制，並保持警覺，才能降低 AI 詐騙的衝擊。  
      </p>
    </div>

    <!-- 相關圖片區塊 (加上點擊放大互動效果) -->
    <h2 style="margin-top: 35px;"><i class="fas fa-images"></i> 相關新聞截圖</h2>
    <div class="image-container">
      <!-- 
        💡 修正重點：圖片路徑改為 / 開頭（請確認 ai-fraud-1.png 等檔案已放入 public 資料夾），
        並加上 @click 觸發點擊放大功能
      -->
      <img src="/ai-fraud-1.png" alt="AI詐騙新聞截圖1" class="zoomable-img" @click="openModal('/ai-fraud-1.png', 'AI詐騙新聞截圖 1')">
      <img src="/ai-fraud-2.png" alt="AI詐騙新聞截圖2" class="zoomable-img" @click="openModal('/ai-fraud-2.png', 'AI詐騙新聞截圖 2')">
      <img src="/ai-fraud-3.png" alt="AI詐騙新聞截圖3" class="zoomable-img" @click="openModal('/ai-fraud-3.png', 'AI詐騙新聞截圖 3')">
    </div>

    <p style="margin-top: 10px; margin-bottom: 35px;">
      <a href="https://news.pchome.com.tw/science/technice/20250729/index-75377399875811338005.html" target="_blank" rel="noopener noreferrer" class="source-link">
        <i class="fas fa-external-link-alt"></i> 來源：科技新報 (點擊查看原文)
      </a>
    </p>

    <!-- ============================================== -->
    <!-- 圖片放大彈出視窗 (Modal) -->
    <!-- ============================================== -->
    <Teleport to="body">
      <div v-if="activeModal" class="modal-backdrop" @click="closeModal">
        <div class="modal-dialog" @click.stop>
          <span class="modal-close" @click="closeModal">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </span>
          <img :src="activeModal.img" class="modal-img" alt="放大的新聞截圖">
          <p class="modal-text" v-html="activeModal.text"></p>
        </div>
      </div>
    </Teleport>

  </main>
</template>

<script setup>
import { ref } from 'vue'

const activeModal = ref(null)

const openModal = (imgSrc, textHtml) => {
  activeModal.value = { 
    img: imgSrc,
    text: textHtml 
  }
}

const closeModal = () => {
  activeModal.value = null
}
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

/* 讓圖片具有點擊手勢與精緻的 Hover 效果 */
.zoomable-img {
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.zoomable-img:hover {
  transform: translateY(-4px) scale(1.01);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

/* 來源連結按鈕美化 */
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

/* ======================================= */
/* 彈出大視窗 (Modal) 的全域樣式            */
/* ======================================= */
:global(.modal-backdrop) {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999999;
  animation: fadeIn 0.2s ease-out;
}

:global(.modal-dialog) {
  background-color: #fff;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
  position: relative;
  text-align: center;
  animation: scaleUp 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
}

:global(.modal-img) {
  width: 700px; /* 新聞截圖比較寬，設定適當的放大尺寸 */
  max-width: 85vw; 
  height: auto;
  margin-bottom: 20px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

:global(.modal-text) {
  font-size: 1.3rem;
  font-weight: 900;
  color: #1e293b;
  margin: 0;
}

:global(.modal-close) {
  position: absolute;
  top: -15px;
  right: -15px;
  background-color: #ef4444;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0,0,0,0.3);
  transition: background-color 0.2s, transform 0.2s;
  z-index: 10;
}
:global(.modal-close:hover) {
  background-color: #dc2626;
  transform: scale(1.05);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes scaleUp {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}

/* RWD 微調 */
@media (max-width: 768px) {
  .subpages {
    grid-template-columns: 1fr 1fr !important;
  }
}
@media (max-width: 480px) {
  .subpages {
    grid-template-columns: 1fr !important;
  }
}
</style>