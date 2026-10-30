<template>
 <!-- 主要內容區 -->
 <main class="content dashboard-page">
    
   <div class="page-header" style="margin-bottom: 24px;">
     <h1 class="main-title">165反詐騙宣導影片</h1>
     <p class="dashboard-subtitle">兆豐證券官方防詐宣導：破解投資群組與假認股陷阱</p>
   </div>

   <div class="subpages" style="grid-template-columns: repeat(3, 1fr);">
     <router-link to="/anti-deepfake-video" :class="{ 'router-link-exact-active': $route.path === '/anti-deepfake-video' }">
       <i class="fas fa-project-diagram"></i>&nbsp;反深偽詐騙
     </router-link>
     <router-link to="/anti-phishing-video" :class="{ 'router-link-exact-active': $route.path === '/anti-phishing-video' }">
       <i class="fas fa-user-shield"></i>&nbsp;常見詐騙手法分析
     </router-link>
     <router-link to="/anti-investment-video" :class="{ 'router-link-exact-active': $route.path === '/anti-investment-video' }">
       <i class="fas fa-bug"></i>&nbsp;假投資詐騙解析
     </router-link>
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

     <div class="video-wrapper" :class="{ 'force-landscape': activeVideo === index }">
       <button v-if="activeVideo === index" class="exit-fs-btn" @click="closeFakeFullscreen(index)">
         <i class="fas fa-compress"></i>
       </button>
       <video 
         controls 
         :src="video.filename" 
         class="video-player" 
         preload="metadata"
         playsinline
         webkit-playsinline
         @play="handleVideoPlay(index, $event)"
         @ended="handleVideoEnded(index, $event)"
       >
         您的瀏覽器不支援影片播放。
       </video>
     </div>

     <div style="text-align: left; margin-top: 18px;">
       <a :href="video.sourceUrl" target="_blank" rel="noopener noreferrer" class="source-btn">
         <i class="fab fa-youtube" style="color: #ef4444;"></i>前往 YouTube 觀看宣導影片
       </a>
     </div>
   </div>

   <!-- ================== 深度解析 ================== -->
   <div class="panel anti-fraud-container highlight-panel" style="text-align: left; margin-top: 32px;">
     <div class="panel-header" style="border-bottom: none; margin-bottom: 8px;">
       <h2 style="color: #b45309;"><i class="fas fa-link"></i>詐騙手法深度解析與共通點</h2>
       <p class="box-subtitle" style="color: #92400e !important;">揭開假投資「養、套、殺」的致命套路</p>
     </div>
     <div class="fraud-item" style="border-bottom: none; padding-bottom: 0;">
       <p v-for="(point, index) in commonalities" :key="'com-' + index" class="description" style="margin-bottom: 20px;" v-html="point"></p>
     </div>
   </div>

   <!-- ================== 防範守則 ================== -->
   <div class="panel anti-fraud-container safe-panel" style="text-align: left; margin-top: 32px; margin-bottom: 40px;">
     <div class="panel-header" style="border-bottom: none; margin-bottom: 8px;">
       <h2 style="color: #065f46;"><i class="fas fa-shield-alt"></i>關鍵安全防範守則</h2>
       <p class="box-subtitle" style="color: #047857 !important;">守護財富，從建立防線做起</p>
     </div>
     <div class="fraud-item" style="border-bottom: none; padding-bottom: 0;">
       <p v-for="(method, index) in preventionMethods" :key="'prev-' + index" class="description" style="margin-bottom: 20px;" v-html="method"></p>
     </div>
   </div>

 </main>
</template>

<script setup>
import { ref } from 'vue';

const baseUrl = import.meta.env.BASE_URL;
const activeVideo = ref(null);

const videoList = ref([
  {
    title: '兆豐證券防詐：破解投資群組與假認股陷阱',
    filename: `${baseUrl}videos/Mega-Securities.mp4#t=0.001`,
    sourceUrl: 'https://www.youtube.com/watch?v=tHk7OLGGATw', 
    description: '此宣導影片生動揭露了三大假投資詐騙手法。<br><br>首先是標榜「<strong class="highlight-red">帶你飛、多賺一倍</strong>」的投資LINE群組，常以高獲利誘騙長輩匯款。其次是偽造的「<strong class="highlight-red">認股通知書</strong>」，詐騙集團會發送帶有不明連結或<strong class="highlight-red">簡體字</strong>的假通知，誘使民眾點擊。最後則是推銷「<strong class="highlight-red">保證獲利的未上市股票</strong>」，利用民眾想一夜致富的心態騙取大筆資金。'
  }
]);

const commonalities = ref([
  '<strong style="color: #b45309;">1.精準操弄致富心理：</strong>詐騙集團擅長利用民眾想要「快速回本」、「一夜致富」的貪婪心理，使用「<strong class="highlight-red">保證獲利</strong>」、「<strong class="highlight-red">穩賺不賠</strong>」、「<strong class="highlight-red">帶你飛</strong>」等極度誘人的誇大話術，讓受害者在巨大的利益誘惑下失去防備。',
  '<strong style="color: #b45309;">2.偽造官方文件與平台：</strong>為了增加可信度，他們會偽造幾可亂真的「<strong class="highlight-red">認股通知書</strong>」、中籤通知，甚至製作帶有<strong class="highlight-red">簡體字</strong>或網址拼字錯誤的假冒證券公司官方網站、APP，誘騙民眾輸入個資或匯款。',
  '<strong style="color: #b45309;">3.推銷不透明的投資標的：</strong>詐騙集團經常以「<strong class="highlight-red">未上市股票</strong>」、「虛擬貨幣」、「海外飆股」等資訊不透明、難以查證真偽的標的進行推銷，並營造出「名額有限、錯過不再」的急迫感，逼迫被害人倉促下決定。'
]);

const preventionMethods = ref([
  '<strong style="color: #065f46;">防線一｜破解「保證獲利」的迷思：</strong>投資市場必然存在風險，<strong class="highlight-red">絕對沒有「穩賺不賠」的投資標的</strong>。只要聽到「保證獲利」、「高報酬零風險」等關鍵字，請立刻提高警覺，這<strong class="highlight-red">百分之百是詐騙</strong>。',
  '<strong style="color: #065f46;">防線二｜認明官方查證管道：</strong>收到任何投資、認股、抽籤通知，<strong class="highlight-red">絕對不要點擊簡訊或LINE上的不明連結</strong>。若發現網頁有<strong class="highlight-red">簡體字</strong>或網址異常，請立即關閉。務必自行搜尋該金融機構的「<strong class="highlight-red">真實官方網站</strong>」或撥打官方客服電話進行求證。',
  '<strong style="color: #065f46;">防線三｜拒絕未經核准的投資群組：</strong>請勿輕易加入來源不明的LINE或 Telegram 投資群組。合法的證券商或投顧公司<strong class="highlight-red">絕對不會透過私人社群軟體推銷未上市股票</strong>，更不會要求您匯款至「個人帳戶」或要求抵押房產。',
  '<strong style="color: #065f46;">防線四｜善用165專線，打破當局者迷：</strong>在進行任何大筆匯款或投資決策前，若心中有任何疑慮，請務必先與家人討論，並<strong class="highlight-red">撥打「165反詐騙諮詢專線」</strong>尋求專業協助，多一分查證，少一分損失。'
]);

function handleVideoPlay(index, event) {
  const isMobile = window.innerWidth <= 768;
  const video = event.target;
  video.muted = false;
  if (isMobile) {
    activeVideo.value = index;
  } else {
    if (video.requestFullscreen) video.requestFullscreen();
  }
}

function closeFakeFullscreen(index) {
  activeVideo.value = null;
  const videos = document.querySelectorAll('.video-player');
  if(videos[index]) {
    const video = videos[index];
    video.pause();
    releaseIOSAudio(video);
  }
}

function handleVideoEnded(index, event) {
  activeVideo.value = null;
  const video = event.target;
  try {
    if (document.fullscreenElement) document.exitFullscreen();
  } catch (e) {}
  video.pause();
  releaseIOSAudio(video);
}

function releaseIOSAudio(video) {
  video.muted = true;
  video.currentTime = 0.001;
}
</script>

<style scoped>
:deep(.highlight-red) { color: #dc2626; font-weight: 900; background: #fee2e2; padding: 0 4px; border-radius: 4px; }
.highlight-panel { background: #fffbeb !important; border: 2px solid #fcd34d !important; }
.safe-panel { background: #ecfdf5 !important; border: 2px solid #34d399 !important; }
.panel-header h2 { font-size: 32px !important; font-weight: 900 !important; }
.panel-header .box-subtitle { font-size: 20px !important; color: #dc2626 !important; font-weight: bold !important; margin-top: 8px !important; }
.anti-fraud-container .fraud-item { margin-bottom: 28px; padding-bottom: 20px; border-bottom: 1px dashed #cbd5e1; }
.anti-fraud-container .fraud-item:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
.anti-fraud-container .description { font-size: 22px !important; line-height: 1.8 !important; color: #334155 !important; text-align: justify; margin: 0; }
.video-wrapper { margin: 20px auto 0 auto; max-width: 900px; border-radius: 12px; overflow: hidden; box-shadow: 0 15px 35px rgba(0,0,0,0.25); background: #000; border: 1px solid #cbd5e1; position: relative; }
.video-player { width: 100%; display: block; border: none; }
.source-btn { text-decoration: none; display: inline-block; padding: 12px 24px; font-size: 17px; font-weight: bold; color: #0284c7; background-color: #f0f9ff; border: 1px solid #bae6fd; border-radius: 8px; transition: all 0.3s; }
.source-btn:hover { background-color: #e0f2fe; color: #0369a1; border-color: #7dd3fc; box-shadow: 0 4px 10px rgba(2, 132, 199, 0.1); transform: translateY(-2px); }

/* --- CSS 偽全螢幕與按鈕修復區 --- */
.force-landscape { position: fixed !important; top: 50% !important; left: 50% !important; width: 100dvh !important; height: 100dvw !important; transform: translate(-50%, -50%) rotate(90deg) !important; transform-origin: center center !important; z-index: 99999 !important; background: #000 !important; border-radius: 0 !important; max-width: none !important; margin: 0 !important; border: none !important; }
@supports not (height: 100dvh) { .force-landscape { width: 100vh !important; height: 100vw !important; } }
.force-landscape .video-player { width: 100% !important; height: 100% !important; object-fit: contain !important; }
.force-landscape video::-webkit-media-controls-fullscreen-button { display: none !important; }
.exit-fs-btn { position: absolute; bottom: 12px; right: 12px; z-index: 100000; background: rgba(28, 28, 30, 0.7); color: white; border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 8px; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-size: 18px; cursor: pointer; backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); transition: all 0.2s; }
.exit-fs-btn:active { transform: scale(0.92); background: rgba(28, 28, 30, 0.95); }

@media (max-width: 1000px) { 
  .subpages { 
    display: flex !important; 
    flex-direction: column !important; 
    gap: 10px !important;
  } 
  .panel-header h2 { font-size: 26px !important; } 
  .panel-header .box-subtitle { font-size: 18px !important; } 
  .anti-fraud-container .fraud-title { font-size: 22px !important; } 
  .anti-fraud-container .description { font-size: 18px !important; } 
}
</style>