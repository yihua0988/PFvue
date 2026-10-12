<template>
  <main class="content">
    
    <h1 class="main-title">AI詐騙一年暴增四倍多</h1>

    <!-- 新的子導覽列 (移除了 style，讓最下方的手機版 RWD 能夠正常運作) -->
    <div class="subpages">
      <a 
        href="/PFvue/prevention" 
        :class="{ 'router-link-exact-active': $route.path === '/prevention' }"
      >
        <i class="fas fa-project-diagram"></i>&nbsp;AI深偽亂入罷免案例
      </a>
      
      <a 
        href="/PFvue/fraud-growth-stats" 
        :class="{ 'router-link-exact-active': $route.path === '/fraud-growth-stats' }"
      >
        <i class="fas fa-user-shield"></i>&nbsp;AI詐騙一年暴增四倍多
      </a>
      
      <a 
        href="/PFvue/ai-fraud-news" 
        :class="{ 'router-link-exact-active': $route.path === '/ai-fraud-news' }"
      >
        <i class="fas fa-bug"></i>&nbsp;AI假檢警詐騙與黑幫經營
      </a>
      
      <a 
        href="/PFvue/top-10-frauds" 
        :class="{ 'router-link-exact-active': $route.path === '/top-10-frauds' }"
      >
        <i class="fas fa-fist-raised"></i>&nbsp;十大常見詐騙解析
      </a>
    </div>

    <!-- 內文解析卡片 -->
    <div class="page-title">
      <h2><i class="fas fa-comment-dots"></i> 案例深度解析與影響</h2>
      <p>
        近一年來，全球加密貨幣詐騙案件暴增 456%，這項驚人的數據背後，顯示出詐騙集團已進入了高度「自動化與客製化」的階段。他們大量運用 <strong>生成式 AI (Generative AI)</strong> 技術，徹底改變了以往「亂槍打鳥」的行騙模式。透過深度偽造（Deepfake）影像與語音複製（Voice Cloning）技術，詐騙手法不再侷限於生硬的文字簡訊或粗糙的釣魚網頁，而是能夠瞬間還原受害者親友的長相、口音與語氣，甚至製造出「親友身陷險境、急需資金求助」的真實情境。這種高度還原的情境，極大程度地瓦解了受害者在第一時間的戒心，導致被騙的機率直線飆升。
      </p>
      <p>
        這股 AI 詐騙浪潮的影響範圍極廣。根據 TRM Labs 的報告指出，不僅是缺乏數位科技知識的長者或散戶受害，甚至連具備高度金融素養的銀行高層、跨國企業財務主管，以及區塊鏈公司的執行長，都曾因為接獲「AI 仿造的熟人或上司」的視訊通話而受騙上當。這些針對企業高階主管的「鯨魚級詐騙（Whaling Phishing）」，往往單筆損失就高達數千萬甚至數億美元。OpenAI 執行長 Sam Altman 也多次公開警告，這些案例證明了傳統的聲紋認證、人臉辨識，甚至是二階段驗證（2FA）等機制，在強大的 AI 技術面前已逐漸失去防禦能力，AI 已經足以突破當今多數的數位資安防線。
      </p>

      <h3 style="margin-top: 25px; color: #b91c1c; font-size: 1.3rem;">
        <i class="fas fa-microchip"></i> AI 詐騙技術暴增的核心原因
      </h3>
      <p>
        這波詐騙案件之所以能在短時間內呈現指數級增長，主要歸咎於以下三個核心原因：<br>
        第一是<strong>「技術門檻大幅降低」</strong>。過去要製作一段幾可亂真的 Deepfake 影片，需要昂貴的設備與專業特效團隊；如今，只要有幾秒鐘的語音檔案或是幾張社群平台上的公開照片，任何人都能使用網路上低廉甚至免費的 AI 開源工具，在數分鐘內生成偽造的影音。<br>
        第二是<strong>「詐騙腳本自動生成」</strong>。詐騙集團利用大型語言模型（LLM），能瞬間產出針對不同國家、不同文化背景、毫無語法破綻的詐騙腳本，甚至能根據受害者的回覆進行「AI 自動應答」，實現 24 小時不間斷的大規模釣魚。<br>
        第三是<strong>「社群資料過度曝光」</strong>。現代人習慣將生活點滴、家庭成員關係與個人聲音影像上傳至社群媒體，這些公開數據成為了 AI 機器學習的完美養分，讓詐騙集團能輕易刻劃出受害者的數位輪廓，進行極度精準的「客製化詐騙」。
      </p>

      <h3 style="margin-top: 25px; color: #0284c7; font-size: 1.3rem;">
        <i class="fas fa-shield-alt"></i> 民眾與企業的防範指南
      </h3>
      <p>
        面對日益猖獗的 AI 詐騙，民眾與企業必須從根本改變對「眼見為憑」的認知，並採取更積極的防範措施：<br>
        1. <strong>建立「親友專屬安全密碼」：</strong> 與家人或密切往來的同事約定一個「通關密語」。當在視訊或電話中被要求匯款、提供個資時，務必先詢問這個只有彼此知道的密碼。<br>
        2. <strong>落實「掛斷再撥」的反查機制：</strong> 收到熟人透過通訊軟體（如 LINE、Messenger）傳來的緊急求救訊息或語音時，切勿直接回覆或點擊連結，應立刻掛斷，並透過原本儲存的「手機門號」直接撥打給對方查證。<br>
        3. <strong>金融機構應升級防禦維度：</strong> 銀行與企業應放棄單一依賴「生物特徵（如聲紋、人臉）」的驗證方式，改採「多維度行為分析」，例如判斷連線的 IP 位置、設備硬體特徵、甚至加入「動態問題驗證（詢問無法被輕易搜尋到的歷史交易細節）」。<br>
        4. <strong>善用官方求證管道：</strong> 面對任何牽涉金錢轉帳的要求，保持「零信任」的警戒態度。如遇疑似詐騙情境，請立即撥打 <strong>165 反詐騙專線</strong>尋求專業協助，切勿因為恐慌而倉促匯款。
      </p>
    </div>

    <h2 style="margin-top: 35px;"><i class="fas fa-newspaper"></i> 相關新聞報導</h2>
    
    <!-- Iframe 容器 -->
    <div class="iframe-container">
      <iframe src="ai-fraud/ai-fraud.html" title="AI詐騙相關新聞" frameborder="0"></iframe>
    </div>

    <p style="margin-top: 10px; margin-bottom: 35px;">
      <a href="https://news.pchome.com.tw/science/technice/20250729/index-75377399875811338005.html" target="_blank" rel="noopener noreferrer" class="source-link">
        <i class="fas fa-external-link-alt"></i> 來源：PChome新聞 (點擊查看原文)
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
.iframe-container {
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
  background-color: #f8fafc; 
  margin-top: 15px;
}

.iframe-container iframe {
  width: 100%;
  /* ⬇️ 將高度大幅拉長，解決容器過扁的問題 */
  height: 85vh; 
  min-height: 900px; /* 把保底高度直接拉到 900px，讓新聞內容完整展開 */
  display: block; 
  border: none;
}

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
  width: 700px;
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