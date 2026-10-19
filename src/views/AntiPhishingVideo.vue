<template>
 <!-- 主要內容區 -->
 <main class="content dashboard-page">
    
   <div class="page-header" style="margin-bottom: 24px;">
     <h1 class="main-title">常見詐騙手法分析影片</h1>
     <p class="dashboard-subtitle">內政部警政署官方授權宣導：破解日常釣魚陷阱與假投資連環套路</p>
   </div>

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

   <!-- ================== 動態影片展示區塊 ================== -->
   <div 
      v-for="(video, index) in videoList" 
      :key="index" 
      class="panel anti-fraud-container" 
      style="text-align: left; margin-top: 24px;"
    >
     <div class="panel-header" style="border-bottom: none; margin-bottom: 0;">
       <h2><i class="fas fa-play-circle"></i>{{ video.title }}</h2>
     </div>

     <div class="fraud-item" style="border-bottom: none; padding-bottom: 0;">
       <p class="description" v-html="video.description"></p>
     </div>

     <!-- 影片播放器容器 -->
     <div class="video-wrapper">
       <video controls :src="video.filename" class="video-player" preload="metadata">
          您的瀏覽器不支援影片播放。
       </video>
     </div>

     <!-- 🌟 超連結改為靠左對齊，並統一樣式 -->
     <div style="text-align: left; margin-top: 18px;">
       <a :href="video.sourceUrl" target="_blank" rel="noopener noreferrer" class="source-btn">
         <i class="fab fa-youtube" style="color: #ef4444;"></i>前往YouTube觀看宣導影片
       </a>
     </div>
   </div>

   <!-- ================== 深度解析 (警告黃色面板) ================== -->
   <div class="panel anti-fraud-container highlight-panel" style="text-align: left; margin-top: 32px;">
     <div class="panel-header" style="border-bottom: none; margin-bottom: 8px;">
       <h2 style="color: #b45309;"><i class="fas fa-link"></i>詐騙手法深度解析與共通點</h2>
       <p class="box-subtitle" style="color: #92400e !important;">識破詐騙集團精準操弄人性的連環套路</p>
     </div>
     <div class="fraud-item" style="border-bottom: none; padding-bottom: 0;">
       <p 
          v-for="(point, index) in commonalities" 
          :key="'com-' + index" 
          class="description" 
          style="margin-bottom: 20px;" 
          v-html="point"
        ></p>
     </div>
   </div>

   <!-- ================== 防範守則 (安全綠色面板) ================== -->
   <div class="panel anti-fraud-container safe-panel" style="text-align: left; margin-top: 32px; margin-bottom: 40px;">
     <div class="panel-header" style="border-bottom: none; margin-bottom: 8px;">
       <h2 style="color: #065f46;"><i class="fas fa-shield-alt"></i>關鍵安全防範守則</h2>
       <p class="box-subtitle" style="color: #047857 !important;">熟記四大防線，徹底隔絕詐騙危機</p>
     </div>
     <div class="fraud-item" style="border-bottom: none; padding-bottom: 0;">
       <p 
          v-for="(method, index) in preventionMethods" 
          :key="'prev-' + index" 
          class="description" 
          style="margin-bottom: 20px;" 
          v-html="method"
        ></p>
     </div>
   </div>

 </main>
</template>

<script setup>
import { ref } from 'vue';

const baseUrl = import.meta.env.BASE_URL;

// 🌟 將資料中的重點標籤升級為 `<strong class="highlight-red">` 以配合新版 CSS
const videoList = ref([
  {
    title: '一、 社群帳號盜用與親友借款釣魚',
    filename: `${baseUrl}videos/LINE.mp4`,
    sourceUrl: 'https://www.youtube.com/watch?v=xMPiuuqixDA',
    description: '詐騙集團會盜用親友的IG或FB帳號，以「<strong class="highlight-red">參加比賽需要幫忙衝票數</strong>」等藉口發送釣魚連結。<br><br>點擊後會跳出偽造的LINE登入頁面，一旦您輸入了「帳號密碼」與最重要的「<strong class="highlight-red">OTP 驗證碼</strong>」，您的LINE帳號就會立刻<strong class="highlight-red">被駭客接管</strong>。這不僅會導致您的綁定支付工具遭盜刷，詐騙集團還會假冒您的身分向親友借款，造成連鎖性的嚴重財損。'
  },
  {
    title: '二、 偽造政府機關釣魚簡訊陷阱',
    filename: `${baseUrl}videos/Phishing-SMS.mp4`,
    sourceUrl: 'https://www.youtube.com/watch?v=DDGWY3TevAg',
    description: '詐騙集團會發送假冒監理站、自來水公司等政府機關的簡訊，利用「<strong class="highlight-red">交通罰款逾期未繳</strong>」、「<strong class="highlight-red">即將產生滯納金</strong>」等恐嚇字眼製造焦慮感。<br><br>簡訊內會附上如「t.ly/」開頭的縮網址，誘騙民眾點擊進入<strong class="highlight-red">一頁式的假官方網站</strong>。若民眾一時不察，急著想繳清罰款而在該網頁輸入信用卡卡號與驗證碼，就會立刻遭到盜刷。'
  },
  {
    title: '三、 高獲利假投資群組與房產抵押',
    filename: `${baseUrl}videos/Investment-groups.mp4`,
    sourceUrl: 'https://www.youtube.com/watch?v=_utG4C7RrhY',
    description: '詐騙集團透過廣告誘騙民眾加入投資LINE群組，營造出每天都在賺錢的假象。<br><br>當被害人投入資金並想要獲利了結時，詐騙集團會以「<strong class="highlight-red">需先繳交200萬保證金才能優先撥款</strong>」等荒謬理由拒絕出金。為了榨乾最後一滴血，甚至會介紹假金主與假代書，慫恿被害人將名下<strong class="highlight-red">房產設定抵押</strong>來借款，最終導致被害人血本無歸，連房子都慘遭收走。'
  }
]);

const commonalities = ref([
  '<strong style="color: #b45309;">1.精準操弄情緒盲點：</strong>無論是利用「交通罰款逾期」引發的恐懼與急躁，還是利用「假投資群組」激發的貪婪與僥倖，詐騙集團永遠在尋找人性的弱點，讓您在情緒波動的當下<strong class="highlight-red">失去理性判斷能力</strong>。',
  '<strong style="color: #b45309;">2.誘導交出核心權限：</strong>所有的詐騙劇本，最終目的都是要您執行高風險動作。例如：在釣魚網頁上交出絕對不能給別人的「<strong class="highlight-red">OTP 驗證碼</strong>」、輸入信用卡詳細資訊，或是簽下極度不合理的房產抵押借貸合約。',
  '<strong style="color: #b45309;">3.製造資訊落差與孤立：</strong>詐騙集團常利用受害者不熟悉查證管道的弱點，用假網頁、假客服來包圍受害者。影片中的案例往往是因為有理性的第三方（如冷靜的配偶、警覺的同事）點出盲點，才得以<strong class="highlight-red">中斷詐騙</strong>。'
]);

const preventionMethods = ref([
  '<strong style="color: #065f46;">防線一｜堅守「親自通話確認」的鐵則：</strong>只要收到任何親友透過訊息要求「匯款借錢」或是提供「LINE登入驗證碼」，請一律先踩煞車！務必直接<strong class="highlight-red">撥打傳統語音電話</strong>向本人確認。',
  '<strong style="color: #065f46;">防線二｜破解釣魚簡訊的「零信任」心法：</strong>收到帶有不明連結的催繳簡訊，<strong class="highlight-red">絕對不要點擊簡訊內的短網址</strong>。應自行開啟瀏覽器搜尋該機關的「真實官方網站（.gov.tw）」進行查詢。',
  '<strong style="color: #065f46;">防線三｜識破投資與借貸的致命陷阱：</strong>合法的投資平台<strong class="highlight-red">絕對不會要求您「先匯鉅額保證金」</strong>才能拿回獲利；若遇到慫恿您找來路不明的金主抵押房產借貸，百分之百是詐騙。',
  '<strong style="color: #065f46;">防線四｜善用165專線，打破當局者迷：</strong>遇到疑似詐騙狀況，請立刻放下手機，<strong class="highlight-red">撥打「165反詐騙諮詢專線」</strong>，讓受過專業訓練的人員協助您釐清狀況。'
]);
</script>

<style scoped>
/* =========================================================================
   本頁面專屬微調 (繼承全站 .panel, .fraud-item 樣式，字體統一放大 1.1 倍)
   ========================================================================= */

/* 🌟 紅色粗體重點專屬樣式 (加上 :deep 才能穿透 v-html 成功渲染！) */
:deep(.highlight-red) {
  color: #dc2626;      
  font-weight: 900;    
  background: #fee2e2; 
  padding: 0 4px;
  border-radius: 4px;
}

/* 🌟 特殊高亮分析區塊 (深度解析：警告黃) */
.highlight-panel {
  background: #fffbeb !important; 
  border: 2px solid #fcd34d !important;
}

/* 🌟 特殊安全防護區塊 (防範守則：安全綠) */
.safe-panel {
  background: #ecfdf5 !important; 
  border: 2px solid #34d399 !important;
}

/* 以下維持不變...*/
.panel-header h2 {
  font-size: 32px !important;  
  font-weight: 900 !important;
}

.panel-header .box-subtitle {
  font-size: 20px !important;  
  color: #dc2626 !important;   
  font-weight: bold !important;
  margin-top: 8px !important;
}

.anti-fraud-container .fraud-item {
  margin-bottom: 28px;
  padding-bottom: 20px;
  border-bottom: 1px dashed #cbd5e1;
}

.anti-fraud-container .fraud-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.anti-fraud-container .description {
  font-size: 22px !important; 
 LINE-height: 1.8 !important;
  color: #334155 !important;
  text-align: justify;
  margin: 0;
}

/* 影片區塊與圓角陰影設計 */
.video-wrapper {
  margin: 20px auto 0 auto;
  max-width: 900px; 
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(0,0,0,0.25);
  background: #000;
  border: 1px solid #cbd5e1;
}

.video-player {
  width: 100%;
  display: block;
  border: none;
}

/* 專屬按鈕樣式 */
.source-btn {
  text-decoration: none;
  display: inline-block;
  padding: 12px 24px;
  font-size: 17px;
  font-weight: bold;
  color: #0284c7;
  background-color: #f0f9ff;
  border: 1px solid #bae6fd;
  border-radius: 8px;
  transition: all 0.3s;
}

.source-btn:hover {
  background-color: #e0f2fe;
  color: #0369a1;
  border-color: #7dd3fc;
  box-shadow: 0 4px 10px rgba(2, 132, 199, 0.1);
  transform: translateY(-2px);
}

/* 確保子導覽列在 RWD 能完美折行 */
@media (max-width: 1000px) {
  .subpages {
    grid-template-columns: repeat(3, 1fr) !important;
  }
}

@media (max-width: 600px) {
  .subpages {
    display: flex !important;
    flex-direction: column !important;
  }
  .panel-header h2 { font-size: 26px !important; }
  .panel-header .box-subtitle { font-size: 18px !important; }
  .anti-fraud-container .description { font-size: 18px !important; }
}
</style>