<template>
 <!-- 主要內容區 -->
 <main class="content dashboard-page">
    
   <div class="page-header" style="margin-bottom: 24px;">
     <h1 class="main-title">重大詐騙新聞：AI技術與黑幫組織</h1>
     <p class="dashboard-subtitle">假檢警技術升級與跨國洗錢水房串聯，剖析現代高科技犯罪鏈</p>
   </div>

   <!-- ================== 動態新聞影片展示區塊 ================== -->
   <div 
     v-for="(video, index) in videoList" 
     :key="index" 
     class="panel anti-fraud-container" 
     style="text-align: left; margin-top: 24px;"
   >
     <div class="panel-header" style="border-bottom: none; margin-bottom: 0;">
       <h2><i :class="video.icon"></i>{{ video.title }}</h2>
       <p class="box-subtitle">{{ video.subtitle }}</p>
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
         <i class="fab fa-youtube" style="color: #ef4444;"></i>{{ video.btnText }}
       </a>
     </div>
   </div>

   <!-- ================== 深度串聯分析 ================== -->
   <div class="panel anti-fraud-container highlight-panel" style="text-align: left; margin-top: 32px; margin-bottom: 40px;">
     <div class="panel-header" style="border-bottom: none; margin-bottom: 12px;">
       <h2 style="color: #b45309;"><i class="fas fa-link"></i>深度串聯分析：當黑幫武裝了AI科技</h2>
       <p class="box-subtitle" style="color: #92400e !important;">傳統洗錢水房結合生成式AI，形成難以防範的雙重威脅</p>
     </div>

     <div class="fraud-item" style="border-bottom: none; padding-bottom: 0;">
       <p class="description">
          綜合上述兩起重大案件，我們可以觀察到當前詐騙產業最危險的趨勢：<strong class="highlight-red">「傳統黑幫組織化」與「AI深偽技術」的恐怖結合</strong>。<br><br>
          過去，黑幫擁有龐大的跨國洗錢水房與人頭帳戶網絡，但前端騙人的手法依賴大量人工打電話、發簡訊，不僅效率有限且容易被識破。如今，詐騙集團導入AI深偽影像與聲音合成技術，讓詐騙從過去的「亂槍打鳥」徹底進化為<strong class="highlight-red">「高科技客製化的精準打擊」</strong>。<br><br>
          科技補足了黑幫的技術缺口，而黑幫提供了AI詐騙所需的龐大資金運作與洗錢管道。當受害者面對的是「長相與聲音極度真實的假檢警視訊」，或是「包裝完美的跨國假投資平台」時，傳統的防備心極易崩潰。面對這種新型態威脅，民眾必須堅守<strong class="highlight-red">「眼見不一定為憑」</strong>的底線，任何涉及金錢轉帳的突發要求，絕對要透過實體或獨立的官方管道進行二次查證。
       </p>
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
    icon: 'fas fa-robot',
    title: '案例一：AI合成假檢警，詐走近九千萬',
    subtitle: '視訊造假瓦解心理防線，單一受害者遭榨乾存款並淪為人頭戶',
    filename: `${baseUrl}videos/news-video-1.mp4#t=0.001`,
    sourceUrl: 'https://www.youtube.com/watch?v=WeoJIU3RXU0',
    btnText: '前往中視新聞YouTube觀看原片',
    description: '這起案例凸顯AI技術已被詐騙集團大量濫用，<strong class="highlight-red">假冒檢警</strong>的聲音與影像幾可亂真，讓受害者在視訊當下完全失去判斷力。婦人短短四個月內，八個帳戶共遭詐走<strong class="highlight-red">近九千萬元</strong>，不僅畢生存款全失，更因帳戶被當成<strong class="highlight-red">人頭戶</strong>而受到連帶法律懲處。<br><br>這顯示出銀行在鉅額轉帳的風險控管與即時警示上仍有檢討空間；同時也強烈提醒民眾，只要遇到「檢警要求視訊」或「監管帳戶金流操作」時，務必立刻掛斷，並撥打165或透過官方電話親自確認，切勿讓恐懼支配行動。'
  },
  {
    icon: 'fas fa-gavel',
    title: '案例二：竹聯幫經營跨境詐騙與洗錢',
    subtitle: '黑幫組織轉型，假投資平台結合跨國洗錢水房榨取上億資金',
    filename: `${baseUrl}videos/news-video-2.webm#t=0.001`,
    sourceUrl: 'https://www.youtube.com/watch?v=FxEYy7gfDAk',
    btnText: '前往YouTube新聞快訊觀看原片',
    description: '此案例顯示犯罪集團已從單純的話術詐欺，轉型為利用社群平台與「假投資網站」進行的精密詐騙，短短四個月內就騙走超過<strong class="highlight-red">1億5千萬台幣</strong>，受害者高達220人以上。<br><br>竹聯幫弘仁會幹部涉入其中，凸顯了<strong class="highlight-red">跨國組織化與洗錢手法</strong>的嚴重升級。當傳統黑道幫派的龐大執行力，結合了無遠弗屆的社群網路與包裝精美的假投資平台，其詐騙的規模與擴散速度便難以想像。提醒民眾務必提高對「網路飆股、高報酬內線」的警覺，慎防落入精心設計的假網站陷阱。'
  }
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