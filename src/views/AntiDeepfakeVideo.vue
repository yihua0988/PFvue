<template>
  <!-- 主要內容區 -->
  <main class="content dashboard-page">
     
    <div class="page-header" style="margin-bottom: 24px;">
      <h1 class="main-title">165反詐騙宣導影片</h1>
      <p class="dashboard-subtitle">內政部警政署官方授權宣導：冷靜想想反詐系列，破解高科技犯罪</p>
    </div>
 
    <!-- 新的子導覽列 (165反詐影片) -->
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
 
    <!-- ================== 宣導重點解析區塊 ================== -->
    <div class="panel anti-fraud-container" style="text-align: left; margin-top: 24px;">
      <div class="panel-header">
        <h2><i class="fas fa-bullhorn"></i>防詐重點宣導：AI深偽來電解析</h2>
        <p class="box-subtitle">當親友的長相與聲音都能被複製，我們該如何守護財產？</p>
      </div>
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
    </div>
 
    <!-- ================== 核心破解心法 (高亮警告區塊) ================== -->
    <div class="panel anti-fraud-container highlight-panel" style="text-align: left; margin-top: 32px;">
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
    </div>
 
    <!-- ================== 完整宣導影片嵌入 ================== -->
    <div class="panel anti-fraud-container" style="text-align: left; margin-top: 32px; margin-bottom: 40px;">
      <div class="panel-header" style="border-bottom: none; margin-bottom: 0;">
        <h2><i class="fas fa-play-circle"></i>冷靜想想反詐系列EP9</h2>
        <p class="box-subtitle">【AI深偽來電細分辨 講到匯款查證先】</p>
      </div>
       
     <div class="video-wrapper">
		  <video 
			controls 
			preload="metadata"
			:src="video.filename" 
			class="video-player" 
			@play="handleVideoPlay"
			@ended="handleVideoEnded"
		  >
			您的瀏覽器不支援影片播放。
		  </video>
		</div>

      <div style="text-align: left; margin-top: 18px;">
        <a href="https://www.youtube.com/watch?v=bLsaATEFIB0" target="_blank" rel="noopener noreferrer" class="source-btn">
          <i class="fab fa-youtube" style="color: #ef4444;"></i>前往YouTube觀看原片
        </a>
      </div>
    </div>
 
  </main>
</template>
 
<script setup>
import { ref } from 'vue';

const baseUrl = import.meta.env.BASE_URL;
const activeVideo = ref(null);

// 📱 1. 點擊播放時：呼叫系統原生全螢幕與橫向鎖定
async function handleVideoPlay(event) {
  const video = event.target;
  video.muted = false; // 確保有聲音

  try {
    // 針對 iOS Safari 呼叫原生全螢幕播放器
    if (video.webkitEnterFullscreen) {
      video.webkitEnterFullscreen();
    } 
    // 針對 Android Chrome 等標準瀏覽器請求全螢幕
    else if (video.requestFullscreen) {
      await video.requestFullscreen();
    }

    // 嘗試自動轉為橫向
    if (screen.orientation && screen.orientation.lock) {
      await screen.orientation.lock('landscape').catch(() => {});
    }
  } catch (err) {
    console.warn('全螢幕切換略過:', err);
  }
}

// 📱 2. 影片播完或關閉時：退出全螢幕並釋放背景音訊焦點（保護 Spotify）
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

  // 靜音並退回第 0.001 秒，完美釋放音訊通道給 Spotify
  video.pause();
  video.muted = true;
  setTimeout(() => {
    video.currentTime = 0.001;
  }, 300);
}
</script>
 
<style scoped>
:deep(.highlight-red) { color: #dc2626; font-weight: 900; background: #fee2e2; padding: 0 4px; border-radius: 4px; }
.highlight-panel { background: #fffbeb !important; border: 2px solid #fcd34d !important; }
.panel-header h2 { font-size: 32px !important; font-weight: 900 !important; }
.panel-header .box-subtitle { font-size: 20px !important; color: #dc2626 !important; font-weight: bold !important; margin-top: 8px !important; }
.anti-fraud-container .fraud-item { margin-bottom: 28px; padding-bottom: 20px; border-bottom: 1px dashed #cbd5e1; }
.anti-fraud-container .fraud-item:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
.anti-fraud-container .fraud-title { color: #0284c7; font-weight: 900; font-size: 26px !important; margin-bottom: 14px; margin-top: 0; }
.anti-fraud-container .description { font-size: 22px !important; line-height: 1.8 !important; color: #334155 !important; text-align: justify; margin: 0; }
.video-wrapper { margin: 20px auto 0 auto; max-width: 900px; border-radius: 12px; overflow: hidden; box-shadow: 0 15px 35px rgba(0,0,0,0.25); background: #000; border: 1px solid #cbd5e1; position: relative; }
.video-player { width: 100%; display: block; border: none; }
.source-btn { text-decoration: none; display: inline-block; padding: 12px 24px; font-size: 17px; font-weight: bold; color: #0284c7; background-color: #f0f9ff; border: 1px solid #bae6fd; border-radius: 8px; transition: all 0.3s; }
.source-btn:hover { background-color: #e0f2fe; color: #0369a1; border-color: #7dd3fc; box-shadow: 0 4px 10px rgba(2, 132, 199, 0.1); transform: translateY(-2px); }



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