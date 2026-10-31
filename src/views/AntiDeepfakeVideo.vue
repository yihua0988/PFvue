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

      <div class="video-wrapper">
        <video 
          controls 
          preload="metadata"
          :src="video.filename" 
          class="video-player"
          playsinline
          webkit-playsinline
          @play="handleVideoPlay"
          @ended="handleVideoEnded"
		  @dblclick="handleDoubleClick"
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
import { onBeforeUnmount } from 'vue';

const baseUrl = import.meta.env.BASE_URL;

const videoList = ref([
  {
    title: '防詐重點宣導：AI深偽來電解析',
    subtitle: '當親友的長相與聲音都能被複製，我們該如何守護財產？',
    filename: `${baseUrl}videos/anti-fraud-ep9.webm#t=0.001`,
    sourceUrl: 'https://www.youtube.com/watch?v=bLsaATEFIB0',
    btnText: '前往YouTube觀看原片',
    description: `
    <div class="fraud-item">
      <h3 class="fraud-title">一、科技賦能的犯罪升級</h3>
      <p class="description">
         這支由內政部警政署刑事警察局推出的宣導影片，生動地揭露了近年來最令人防不勝防的新型態犯罪——<strong class="highlight-red">「AI深偽（Deepfake）來電詐騙」</strong>。<br><br>
         在過去，我們或許能從口音、語氣來辨識詐騙電話；但在AI科技的加持下，詐騙集團已經能輕易地擷取網路上公開的影像與語音資料，合成出與您親友幾乎一模一樣的聲音與長相，並透過視訊通話進行高度逼真的客製化詐騙。
      </p>
    </div>
    <div class="fraud-item" style="border-bottom: none; padding-bottom: 0;">
      <h3 class="fraud-title">二、詐騙情境模擬：最熟悉的陌生來電</h3>
      <p class="description">
         影片中模擬了最常見的情境：詐騙集團偽裝成受害者的家屬（如兒子），假藉發生車禍、急需現金和解等緊急狀況，利用家屬焦急、慌亂的心理，誘導其立刻匯款。<br><br>
         這種手法大幅增加了詐騙的「可信度」，更因為<strong class="highlight-red">「眼見為憑」</strong>的錯覺，讓受害者在第一時間失去防備心，甚至來不及多做查證就將畢生積蓄匯出。
      </p>
    </div>
    `
  }
]);

const commonalities = ref([
  `
  <div class="panel-header" style="border-bottom: none; margin-bottom: 8px;">
    <h2 style="color: #b45309;"><i class="fas fa-search"></i>如何破解AI深偽視訊？</h2>
    <p class="box-subtitle" style="color: #92400e !important;">目前的技術並非完美無缺，只要冷靜觀察，仍能找出致命破綻！</p>
  </div>
  <div class="fraud-item" style="border-bottom: none; padding-bottom: 0;">
    <p class="description" style="margin-bottom: 20px;">
      <strong style="color: #b45309;">防線一：觀察影像邊緣與不自然處</strong><br>
       當接獲視訊電話時，AI演算法在處理不規則動態時極易出現運算延遲或畫面扭曲。<br>
      <strong class="highlight-red">💡破解心法：要求對方「左右轉頭」、「臉部遮擋」或「快速擺動手部」，觀察臉部邊緣是否模糊、下巴線條消失或出現破圖。</strong>
    </p>
    <p class="description" style="margin-bottom: 20px;">
      <strong style="color: #b45309;">防線二：約定專屬「通關密語」</strong><br>
       詐騙集團即使能模仿外表，也無法輕易回答出私密的家庭記憶。<br>
      <strong class="highlight-red">💡破解心法：與家人事先約定好暗號，或詢問只有家人知道的生活瑣事（例如：家裡寵物最喜歡的玩具是什麼？）。</strong>
    </p>
    <p class="description">
      <strong style="color: #b45309;">防線三：切斷通訊，反向查證</strong><br>
       這是最重要的一道防線！科技再怎麼進步，只要不匯款就不會受害。<br>
      <strong class="highlight-red">💡破解心法：一旦對方提到「匯款」、「轉帳」，請立刻掛斷！並撥打親友原本的號碼查證，或直撥165專線求助。</strong>
    </p>
  </div>
  `
]);

const preventionMethods = ref([
  '<strong style="color: #065f46;">防線一｜破解「保證獲利」的迷思：</strong>投資市場必然存在風險，<strong class="highlight-red">絕對沒有「穩賺不賠」的投資標的</strong>。只要聽到「保證獲利」、「高報酬零風險」等關鍵字，請立刻提高警覺，這<strong class="highlight-red">百分之百是詐騙</strong>。',
  '<strong style="color: #065f46;">防線二｜認明官方查證管道：</strong>收到任何投資、認股、抽籤通知，<strong class="highlight-red">絕對不要點擊簡訊或LINE上的不明連結</strong>。若發現網頁有<strong class="highlight-red">簡體字</strong>或網址異常，請立即關閉。務必自行搜尋該金融機構的「<strong class="highlight-red">真實官方網站</strong>」或撥打官方客服電話進行求證。',
  '<strong style="color: #065f46;">防線三｜拒絕未經核准的投資群組：</strong>請勿輕易加入來源不明的LINE或 Telegram 投資群組。合法的證券商或投顧公司<strong class="highlight-red">絕對不會透過私人社群軟體推銷未上市股票</strong>，更不會要求您匯款至「個人帳戶」或要求抵押房產。',
  '<strong style="color: #065f46;">防線四｜善用165專線，打破當局者迷：</strong>在進行任何大筆匯款或投資決策前，若心中有任何疑慮，請務必先與家人討論，並<strong class="highlight-red">撥打「165反詐騙諮詢專線」</strong>尋求專業協助，多一分查證，少一分損失。'
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