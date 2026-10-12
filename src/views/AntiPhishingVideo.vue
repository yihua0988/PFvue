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

          <!-- 🌟 影片來源連結按鈕 (已設定為置左對齊) -->
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

const videoList = ref([
  {
    title: '社群帳號盜用與親友借款釣魚',
    filename: `${baseUrl}videos/LINE.mp4`,
    sourceUrl: 'https://www.youtube.com/watch?v=xMPiuuqixDA',
    description: '詐騙集團會盜用親友的 IG 或 FB 帳號，以「<strong>參加比賽需要幫忙衝票數</strong>」等藉口發送釣魚連結。點擊後會跳出偽造的 LINE 登入頁面，一旦您輸入了「帳號密碼」與最重要的「<strong>驗證碼</strong>」，您的 LINE 帳號就會立刻<strong>被駭客接管</strong>。這不僅會導致您的 LINE Pay 等綁定支付工具遭盜刷，詐騙集團還會假冒您的身分，向通訊錄裡的親朋好友以「急需資金」為由<strong>每人借款數千元</strong>，造成連鎖性的嚴重財損。'
  },
  {
    title: '偽造政府機關釣魚簡訊陷阱',
    filename: `${baseUrl}videos/Phishing-SMS.mp4`,
    sourceUrl: 'https://www.youtube.com/watch?v=DDGWY3TevAg',
    description: '詐騙集團會發送假冒監理站、自來水公司等政府機關的簡訊，利用「<strong>交通罰款逾期未繳</strong>」、「<strong>即將產生滯納金</strong>」等恐嚇字眼製造焦慮感。簡訊內會附上如「<strong>t.ly/</strong>」開頭的縮網址，誘騙民眾點擊進入<strong>一頁式的假官方網站</strong>。若民眾一時不察，急著想繳清罰款而在該網頁輸入<strong>信用卡卡號與驗證碼</strong>，就會立刻遭到<strong>盜刷</strong>。'
  },
  {
    title: '高獲利假投資群組與房產抵押',
    filename: `${baseUrl}videos/Investment-groups.mp4`,
    sourceUrl: 'https://www.youtube.com/watch?v=_utG4C7RrhY',
    description: '詐騙集團透過廣告誘騙民眾加入投資 LINE 群組，營造出每天都在賺錢的假象。當被害人投入資金並想要獲利了結時，詐騙集團會以「<strong>需先繳交200萬保證金才能優先撥款</strong>」等荒謬理由拒絕出金。為了榨乾被害人最後一滴血，甚至會「一條龍」介紹<strong>假金主與假代書</strong>，慫恿被害人將名下<strong>房產設定抵押</strong>來借取保證金，最終導致被害人<strong>投資血本無歸，連房子都慘遭金主收走</strong>。'
  }
]);

const commonalities = ref([
  '<strong>精準操弄情緒盲點：</strong>無論是利用「交通罰款逾期」引發的恐懼與急躁，還是利用「假投資群組」激發的貪婪與僥倖，亦或是利用「親友求助衝票數」的情感勒索，詐騙集團永遠在尋找<strong>人性的弱點</strong>，讓您在情緒波動的當下<strong>失去理性判斷能力</strong>。',
  '<strong>誘導交出核心權限：</strong>所有的詐騙劇本，最終目的都是要您執行高風險動作。例如：在釣魚網頁上交出絕對不能給別人的「<strong>OTP 驗證碼</strong>」、輸入<strong>信用卡詳細資訊</strong>，或是簽下極度不合理的<strong>房產抵押借貸合約</strong>。',
  '<strong>製造資訊落差與孤立：</strong>詐騙集團常利用受害者不熟悉查證管道的弱點，用假網頁、假客服、甚至假代書來包圍受害者。影片中的案例往往是因為有理性的第三方（如冷靜的丈夫、警覺的同事）點出盲點（如「車主其實是我」、「怎麼會要驗證碼」），才得以<strong>中斷詐騙</strong>。'
]);

const preventionMethods = ref([
  '<strong>堅守「親自通話確認」的鐵則：</strong>只要收到任何親友透過文字訊息要求「匯款借錢」、「代墊款項」，或是要求您點擊連結、提供「LINE 登入驗證碼」，請一律先踩煞車！務必直接「<strong>撥打傳統語音電話</strong>」向本人確認，真正的朋友絕對經得起您的查證。',
  '<strong>破解釣魚簡訊的「零信任」心法：</strong>收到帶有不明連結的催繳簡訊，請先冷靜回想自身狀況（例如：我這陣子有開車嗎？車主是我嗎？）。<strong>絕對不要點擊簡訊內的短網址</strong>，應自行開啟瀏覽器搜尋該政府機關的「<strong>真實官方網站（.gov.tw）</strong>」進行查詢，或直接撥打官方客服專線核實。',
  '<strong>識破投資與借貸的致命陷阱：</strong>請牢記，合法的投資平台<strong>絕對不會要求您「先匯一筆鉅額保證金」</strong>才能拿回自己的獲利；若遇到慫恿您找來路不明的「金主」抵押房產借貸，<strong>百分之百是詐騙</strong>。有任何資金借貸需求，請務必尋求合法的實體金融機構，以免賠了老本又背負龐大債務。',
  '<strong>善用 165 專線，打破當局者迷：</strong>遇到任何疑似詐騙的狀況，不要獨自焦慮或急著操作。請立刻放下手機，<strong>撥打「165 反詐騙諮詢專線」</strong>，讓受過專業訓練的人員協助您釐清狀況，這是保護財產安全最聰明且最有效的第一道防線。'
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

/* 整體容器 */
.anti-fraud-container {
  width: 100%;
  margin: 30px auto 0 auto;
}

/* 紅字重點醒目標記 */
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

/* 🌟 影片來源按鈕容器：限制最大寬度並置左對齊，對齊上方影片播放器左緣 */
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