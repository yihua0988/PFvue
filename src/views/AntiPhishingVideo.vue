<template>
 <main class="content dashboard-page">
    
   <div class="page-header" style="margin-bottom: 24px;">
     <h1 class="main-title">常見詐騙手法分析影片</h1>
     <p class="dashboard-subtitle">內政部警政署官方授權宣導：破解日常釣魚陷阱與假投資連環套路</p>
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

     <div class="video-wrapper">
		  <video 
			controls 
			preload="metadata"
			:src="video.filename" 
			class="video-player" 
			@play="handleVideoPlay"
			@ended="handleVideoEnded"
			@dblclick="handleDoubleClick"
		  >
			您的瀏覽器不支援影片播放。
		  </video>
		</div>

     <div style="text-align: left; margin-top: 18px;">
       <a :href="video.sourceUrl" target="_blank" rel="noopener noreferrer" class="source-btn">
         <i class="fab fa-youtube" style="color: #ef4444;"></i>前往YouTube觀看宣導影片
       </a>
     </div>
   </div>

   <!-- ================== 深度解析 ================== -->
   <div class="panel anti-fraud-container highlight-panel" style="text-align: left; margin-top: 32px;">
     <div class="panel-header" style="border-bottom: none; margin-bottom: 8px;">
       <h2 style="color: #b45309;"><i class="fas fa-link"></i>詐騙手法深度解析與共通點</h2>
       <p class="box-subtitle" style="color: #92400e !important;">識破詐騙集團精準操弄人性的連環套路</p>
     </div>
     <div class="fraud-item" style="border-bottom: none; padding-bottom: 0;">
       <p v-for="(point, index) in commonalities" :key="'com-' + index" class="description" style="margin-bottom: 20px;" v-html="point"></p>
     </div>
   </div>

   <!-- ================== 防範守則 ================== -->
   <div class="panel anti-fraud-container safe-panel" style="text-align: left; margin-top: 32px; margin-bottom: 40px;">
     <div class="panel-header" style="border-bottom: none; margin-bottom: 8px;">
       <h2 style="color: #065f46;"><i class="fas fa-shield-alt"></i>關鍵安全防範守則</h2>
       <p class="box-subtitle" style="color: #047857 !important;">熟記四大防線，徹底隔絕詐騙危機</p>
     </div>
     <div class="fraud-item" style="border-bottom: none; padding-bottom: 0;">
       <p v-for="(method, index) in preventionMethods" :key="'prev-' + index" class="description" style="margin-bottom: 20px;" v-html="method"></p>
     </div>
   </div>
 </main>
</template>

<script setup>
import { ref } from 'vue';
import { onBeforeUnmount } from 'vue';

const baseUrl = import.meta.env.BASE_URL;
const activeVideo = ref(null);

const videoList = ref([
  {
    title: '一、 社群帳號盜用與親友借款釣魚',
    filename: `${baseUrl}videos/LINE.mp4#t=0.001`,
    sourceUrl: 'https://www.youtube.com/watch?v=xMPiuuqixDA',
    description: '詐騙集團會盜用親友的IG或FB帳號，以「<strong class="highlight-red">參加比賽需要幫忙衝票數</strong>」等藉口發送釣魚連結。<br><br>點擊後會跳出偽造的LINE登入頁面，一旦您輸入了「帳號密碼」與最重要的「<strong class="highlight-red">OTP 驗證碼</strong>」，您的LINE帳號就會立刻<strong class="highlight-red">被駭客接管</strong>。這不僅會導致您的綁定支付工具遭盜刷，詐騙集團還會假冒您的身分向親友借款，造成連鎖性的嚴重財損。'
  },
  {
    title: '二、 偽造政府機關釣魚簡訊陷阱',
    filename: `${baseUrl}videos/Phishing-SMS.mp4#t=0.001`,
    sourceUrl: 'https://www.youtube.com/watch?v=DDGWY3TevAg',
    description: '詐騙集團會發送假冒監理站、自來水公司等政府機關的簡訊，利用「<strong class="highlight-red">交通罰款逾期未繳</strong>」、「<strong class="highlight-red">即將產生滯納金</strong>」等恐嚇字眼製造焦慮感。<br><br>簡訊內會附上如「t.ly/」開頭的縮網址，誘騙民眾點擊進入<strong class="highlight-red">一頁式的假官方網站</strong>。若民眾一時不察，急著想繳清罰款而在該網頁輸入信用卡卡號與驗證碼，就會立刻遭到盜刷。'
  },
  {
    title: '三、 高獲利假投資群組與房產抵押',
    filename: `${baseUrl}videos/Investment-groups.mp4#t=0.001`,
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


// 📱 1. 點擊播放時：自動暫停其他影片，並【釋放其他影片的音訊】
async function handleVideoPlay(event) {
  const currentVideo = event.target;
  currentVideo.muted = false; // 確保有聲音

  // 🔥 互斥與音訊釋放：找出畫面上其他的影片，強制暫停並釋放音訊
  const allVideos = document.querySelectorAll('video');
  allVideos.forEach(v => {
    if (v !== currentVideo && !v.paused) {
      v.pause();
      v.muted = true; // 靜音以釋放音訊通道
      setTimeout(() => {
        if (v.readyState > 0) v.currentTime = 0.001;
      }, 300);
    }
  });

  try {
    if (currentVideo.webkitEnterFullscreen) {
      currentVideo.webkitEnterFullscreen();
    } else if (currentVideo.requestFullscreen) {
      await currentVideo.requestFullscreen();
    }
    if (screen.orientation && screen.orientation.lock) {
      await screen.orientation.lock('landscape').catch(() => {});
    }
  } catch (err) {
    console.warn('全螢幕切換略過:', err);
  }
}

// 📱 2. 新增：雙點擊影片時觸發（播放並釋放其他影片音訊）
function handleDoubleClick(event) {
  const currentVideo = event.target;
  
  if (currentVideo.paused) {
    currentVideo.play();
  }

  // 🔥 雙擊時同樣確保其他影片被暫停並釋放音訊
  const allVideos = document.querySelectorAll('video');
  allVideos.forEach(v => {
    if (v !== currentVideo && !v.paused) {
      v.pause();
      v.muted = true;
      setTimeout(() => {
        if (v.readyState > 0) v.currentTime = 0.001;
      }, 300);
    }
  });
}

// 📱 3. 影片播完時：退出全螢幕並釋放背景音訊焦點（保護 Spotify）
function handleVideoEnded(event) {
  const video = event.target;
  
  try {
    if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen();
    } else if (video.webkitExitFullscreen) {
      video.webkitExitFullscreen();
    }
    if (screen.orientation && screen.orientation.unlock) {
      screen.orientation.unlock();
    }
  } catch (e) {}

  video.pause();
  video.muted = true;
  setTimeout(() => { 
    if (video.readyState > 0) video.currentTime = 0.001; 
  }, 300);
}

// 📱 4. 切換分頁保護：離開這個網頁時，徹底中斷所有影片串流與釋放音訊
onBeforeUnmount(() => {
  const allVideos = document.querySelectorAll('video');
  allVideos.forEach(video => {
    video.pause();
    video.muted = true;           
    video.removeAttribute('src'); 
    video.load();                 
  });
})
</script>