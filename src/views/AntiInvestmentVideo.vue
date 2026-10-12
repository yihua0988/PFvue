<template>
  <main class="content">
    
    <h1 class="main-title">165 反詐騙宣導影片</h1>

    <!-- 新的子導覽列 (強制重整，釋放 RAM) -->
	<div class="subpages" style="grid-template-columns: repeat(4, 1fr);">
	  <a 
		href="/PFvue/anti-deepfake-video" 
		:class="{ 'router-link-exact-active': $route.path === '/anti-deepfake-video' }"
	  >
		<i class="fas fa-project-diagram"></i>&nbsp;反深偽詐騙
	  </a>
	  
	  <a 
		href="/PFvue/anti-phishing-video" 
		:class="{ 'router-link-exact-active': $route.path === '/anti-phishing-video' }"
	  >
		<i class="fas fa-user-shield"></i>&nbsp;常見詐騙手法分析
	  </a>
	  
	  <a 
		href="/PFvue/anti-investment-video" 
		:class="{ 'router-link-exact-active': $route.path === '/anti-investment-video' }"
	  >
		<i class="fas fa-bug"></i>&nbsp;假投資詐騙解
	  </a>
	</div>

    <!-- 影片展示與分析區開始 -->
    <div class="anti-fraud-container">
      
      <!-- 影片展示區 (寬版滿版卡片，文字在上，影片在下) -->
      <section class="video-section">
        <div v-for="(video, index) in videoList" :key="index" class="video-card">
          
          <!-- 文字區塊：使用 v-html 解析重點紅字 -->
          <div class="card-content">
            <h3>{{ video.title }}</h3>
            <p class="description" v-html="video.description"></p>
          </div>

          <!-- 影片區塊 (在中間) -->
          <div class="video-wrapper">
            <video controls :src="video.filename" class="video-player" preload="metadata">
              您的瀏覽器不支援影片播放。
            </video>
          </div>

          <!-- 影片來源連結按鈕 (置左對齊) -->
          <div class="source-link-container">
            <a :href="video.sourceUrl" target="_blank" rel="noopener noreferrer" class="source-link">
              <i class="fab fa-youtube"></i> 來源：YouTube 官方宣導影片
            </a>
          </div>
          
        </div>
      </section>

      <!-- 分析與防範區 -->
      <section class="analysis-section">
        <div class="analysis-card">
          <h2>⚠️ 詐騙手法深度解析與共通點</h2>
          <ul>
            <li v-for="(point, index) in commonalities" :key="'com-' + index" v-html="point"></li>
          </ul>
        </div>

        <div class="analysis-card prevention">
          <h2>🛡️ 關鍵安全防範守則</h2>
          <ul>
            <li v-for="(method, index) in preventionMethods" :key="'prev-' + index" v-html="method"></li>
          </ul>
        </div>
      </section>
    </div>
    <!-- 影片展示與分析區結束 -->

  </main>
</template>

<script setup>
import { ref } from 'vue';

const baseUrl = import.meta.env.BASE_URL;

// 影片資料陣列：載入兆豐證券防詐影片
const videoList = ref([
  {
    title: '兆豐證券防詐：破解投資群組與假認股陷阱',
    filename: `${baseUrl}videos/Mega-Securities.mp4`,
    sourceUrl: 'https://www.youtube.com/watch?v=tHk7OLGGATw', // 若有精確網址可替換此處
    description: '此宣導影片生動揭露了三大假投資詐騙手法。首先是標榜「<strong>帶你飛、多賺一倍</strong>」的投資 LINE 群組，常以高獲利誘騙長輩匯款。其次是偽造的「<strong>認股通知書</strong>」，詐騙集團會發送帶有不明連結或<strong>簡體字</strong>的假通知，誘使民眾點擊。最後則是推銷「<strong>保證獲利的未上市股票</strong>」，利用民眾想一夜致富的心態騙取大筆資金。遇到這類情況，請務必先至<strong>官方網站</strong>或撥打 165 專線查證。'
  }
]);

// 共通點資料：針對假投資進行深入分析
const commonalities = ref([
  '<strong>精準操弄致富心理：</strong>詐騙集團擅長利用民眾想要「快速回本」、「一夜致富」的貪婪心理，使用「<strong>保證獲利</strong>」、「<strong>穩賺不賠</strong>」、「<strong>帶你飛</strong>」等極度誘人的誇大話術，讓受害者在巨大的利益誘惑下失去防備。',
  '<strong>偽造官方文件與平台：</strong>為了增加可信度，他們會偽造幾可亂真的「<strong>認股通知書</strong>」、中籤通知，甚至製作帶有<strong>簡體字</strong>或網址拼字錯誤的假冒證券公司官方網站、APP，誘騙民眾輸入個資或匯款。',
  '<strong>推銷不透明的投資標的：</strong>詐騙集團經常以「<strong>未上市股票</strong>」、「虛擬貨幣」、「海外飆股」等資訊不透明、難以查證真偽的標的進行推銷，並營造出「名額有限、錯過不再」的急迫感，逼迫被害人倉促下決定。'
]);

// 防範方法資料：針對假投資設定的防護網
const preventionMethods = ref([
  '<strong>破解「保證獲利」的迷思：</strong>投資市場必然存在風險，<strong>絕對沒有「穩賺不賠」的投資標的</strong>。只要聽到「保證獲利」、「高報酬零風險」等關鍵字，請立刻提高警覺，這<strong>百分之百是詐騙</strong>。',
  '<strong>認明官方查證管道：</strong>收到任何投資、認股、抽籤通知，<strong>絕對不要點擊簡訊或 LINE 上的不明連結</strong>。若發現網頁有<strong>簡體字</strong>或網址異常，請立即關閉。務必自行搜尋該金融機構的「<strong>真實官方網站</strong>」或撥打官方客服電話進行求證。',
  '<strong>拒絕未經核准的投資群組：</strong>請勿輕易加入來源不明的 LINE 或 Telegram 投資群組。合法的證券商或投顧公司<strong>絕對不會透過私人社群軟體推銷未上市股票</strong>，更不會要求您匯款至「個人帳戶」或要求抵押房產。',
  '<strong>善用 165 專線，打破當局者迷：</strong>在進行任何大筆匯款或投資決策前，若心中有任何疑慮，請務必先與家人討論，並<strong>撥打「165 反詐騙諮詢專線」</strong>尋求專業協助，多一分查證，少一分損失。'
]);
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

/* 目前所在頁面的導覽列按鈕高亮樣式 */
.active-link {
  background: linear-gradient(135deg, #0ea5e9, #3b82f6) !important;
  color: #ffffff !important;
  border-color: transparent !important;
  box-shadow: 0 4px 15px rgba(14, 165, 233, 0.3) !important;
}

/* 整體容器 */
.anti-fraud-container {
  width: 100%;
  margin: 30px auto 0 auto;
}

/* 🌟 紅字重點醒目標記（穿透 v-html） */
.anti-fraud-container :deep(strong) {
  font-weight: 800;
  color: #dc2626;
  background-color: rgba(220, 38, 38, 0.08);
  padding: 2px 6px;
  border-radius: 4px;
}

/* 影片展示區容器 */
.video-section {
  display: flex;
  flex-direction: column; 
  gap: 40px;
  margin-bottom: 50px;
}

/* 單一影片卡片 */
.video-card {
  display: flex;
  flex-direction: column; 
  background-color: rgba(255, 255, 255, 0.85);
  border: 1px solid #e2e8f0;
  border-top: 5px solid #0284c7; 
  border-radius: 8px;
  padding: 35px 45px; 
  box-shadow: 0 8px 30px rgba(15, 23, 42, 0.06);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  gap: 20px; 
  transition: box-shadow 0.3s ease;
}

.video-card:hover {
  box-shadow: 0 12px 40px rgba(15, 23, 42, 0.12);
}

.card-content {
  width: 100%;
}

/* 影片區塊 */
.video-wrapper {
  width: 100%;
  max-width: 900px; 
  margin: 0 auto; 
}

.video-player {
  width: 100%;
  border-radius: 8px;
  background-color: #000;
  display: block;
  border: none;
  box-shadow: none;
}

/* 影片來源按鈕容器：限制最大寬度並置左對齊，對齊上方影片播放器左緣 */
.source-link-container {
  width: 100%;
  max-width: 900px;
  margin: 5px auto 0 auto;
  text-align: left;
}

.source-link {
  display: inline-block;
  color: #e11d48;
  text-decoration: none;
  font-weight: bold;
  font-size: clamp(14px, 1.8vw, 16px);
  padding: 8px 18px;
  border-radius: 8px;
  background-color: #fff1f2;
  border: 1px solid #ffe4e6;
  transition: all 0.3s;
}

.source-link:hover {
  background-color: #ffe4e6;
  color: #be123c;
  border-color: #fecdd3;
  box-shadow: 0 4px 10px rgba(225, 29, 72, 0.15);
  transform: translateY(-2px);
}

/* 下方分析與防範區 */
.analysis-section {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.analysis-card {
  flex: 1 1 400px;
  background-color: rgba(255, 255, 255, 0.85);
  border: 1px solid #e2e8f0;
  border-top: 5px solid #f59e0b;
  border-radius: 8px;
  padding: 35px 45px;
  box-shadow: 0 8px 30px rgba(15, 23, 42, 0.06);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.analysis-card.prevention {
  border-top-color: #10b981;
}

.analysis-card ul {
  padding-left: 25px;
  margin: 0;
}

/* RWD 微調 */
@media (max-width: 768px) {
  .subpages {
    grid-template-columns: 1fr 1fr !important;
  }
  .video-card, .analysis-card {
    padding: 25px; 
  }
}
@media (max-width: 480px) {
  .subpages {
    grid-template-columns: 1fr !important;
  }
}
</style>