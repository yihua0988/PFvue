<template>
  <!-- 主要內容區 -->
  <main class="content">
    
    <h1 class="main-title">165 反詐騙宣導影片</h1>

    <!-- 
      子頁面選單 (4x2 網格)
      修正 1：將 href 改為 router-link
      修正 2：未開放的空位加上 @click.prevent 防止畫面跳轉
    -->
    <div class="subpages" style="grid-template-columns: repeat(4, 1fr);">
      <router-link to="/anti-deepfake-video"><i class="fas fa-video"></i>&nbsp;反深偽宣導影片</router-link>
      
      <!-- 預留的 7 個空位，維持 4x2 滿版排列，供未來擴充其他 165 影片 -->
      <a href="#" class="disabled" @click.prevent><i class="fas fa-plus"></i>&nbsp;敬請期待</a>
      <a href="#" class="disabled" @click.prevent><i class="fas fa-plus"></i>&nbsp;敬請期待</a>
      <a href="#" class="disabled" @click.prevent><i class="fas fa-plus"></i>&nbsp;敬請期待</a>
      <a href="#" class="disabled" @click.prevent><i class="fas fa-plus"></i>&nbsp;敬請期待</a>
      <a href="#" class="disabled" @click.prevent><i class="fas fa-plus"></i>&nbsp;敬請期待</a>
      <a href="#" class="disabled" @click.prevent><i class="fas fa-plus"></i>&nbsp;敬請期待</a>
      <a href="#" class="disabled" @click.prevent><i class="fas fa-plus"></i>&nbsp;敬請期待</a>
    </div>
	
    <!-- 內文解析卡片 -->
	<div class="page-title" style="margin-top: 30px;">
	  <h2><i class="fas fa-bullhorn"></i> 防詐重點宣導：AI 深偽來電詐騙解析</h2>
	  
	  <p>
		這支由內政部警政署刑事警察局推出的「冷靜想想反詐系列 EP9」宣導影片，生動地揭露了近年來最令人防不勝防的新型態犯罪——<strong>「AI 深偽（Deepfake）來電詐騙」</strong>。在過去，我們或許能從口音、語氣來辨識詐騙電話，但在 AI 科技的加持下，詐騙集團已經能輕易地擷取網路上公開的影像與語音資料，合成出與您親友幾乎一模一樣的聲音與長相，並透過視訊通話的方式，進行高度逼真的詐騙。
	  </p>
	  
	  <p>
		影片中模擬了最常見的情境：詐騙集團利用 AI 技術偽裝成受害者的兒子，假藉發生車禍、急需現金和解等緊急狀況，利用家屬焦急、慌亂的心理，誘導其立刻匯款。這種手法不僅增加了詐騙的「可信度」，更因為「眼見為憑」的錯覺，讓受害者在第一時間失去防備心，甚至來不及多做查證就將錢財匯出。
	  </p>

	  <h3 style="color: #0284c7; margin-top: 20px; font-weight: bold;"><i class="fas fa-search"></i> 如何破解 AI 深偽視訊？三大防線不可不知</h3>
	  <p>
		然而，目前的 AI 深偽技術並非完美無缺，只要冷靜觀察，仍能找出破綻。影片中特別教導了民眾三大防詐秘訣：
	  </p>
	  
	  <ul class="recommend-list">
		<li><strong>觀察影像邊緣與不自然處：</strong> 當接獲視訊電話時，可要求對方<strong>「左右轉頭」、「臉部遮擋」或「快速擺動手部」</strong>。由於 AI 演算法在即時處理這些不規則動態時，容易出現運算延遲或畫面扭曲，您可能會觀察到對方的臉部邊緣模糊、下巴線條消失、或是出現不自然的畫面破圖。</li>
		<li><strong>約定專屬「通關密語」：</strong> 與家人事先約定好一個只有彼此知道的通關密語、特定暗號，或詢問只有家人知道的生活瑣事（例如：上次一起吃飯的餐廳叫什麼名字？家裡寵物最喜歡的玩具是什麼？）。詐騙集團即使能模仿外表，也無法輕易回答出這些私密問題。</li>
		<li><strong>切斷通訊，反向查證：</strong> 這是最重要的一道防線！一旦對方在視訊或電話中提到「匯款」、「轉帳」、「借錢」等敏感字眼，請務必<strong>先掛斷電話</strong>。接著，撥打親友「原本的電話號碼」進行查證，或是直接撥打 <strong>165 反詐騙專線</strong>尋求協助。</li>
	  </ul>

	  <p>
		這支宣導影片強烈提醒我們：在 AI 時代，「眼見不一定為憑」。科技詐騙的手法日益精密，我們必須時刻保持警覺。遇到任何突發狀況，請謹記「冷靜想想、多方查證」的原則，並將這些防詐知識分享給家人與朋友，共同建立堅固的防詐意識網，避免成為下一個受害者。
	  </p>
	</div>

    <!-- 嵌入影片區域 -->
    <div class="video-section">
      <h2 style="color: #0f172a; margin-top: 40px;"><i class="fas fa-play-circle"></i> 冷靜想想反詐系列 EP9</h2>
      <p style="color: #ef4444; font-weight: bold; font-size: 1.2rem; margin-bottom: 20px;">
        【AI深偽來電細分辨 講到匯款查證先】
      </p>
      
      <div class="video-wrapper">
        <!-- 
          修正 3：路徑改為 / 開頭。
          ⚠️️ 請務必去 public/ 資料夾把這支影片改名為 anti-fraud-ep9.webm 
        -->
        <video id="fraudVideo" controls preload="metadata" width="100%">
		  <!-- 這裡已經幫你補上最前面的 / 了 -->
		  <source src="/videos/anti-fraud-ep9.webm" type="video/webm" />
		  您的瀏覽器不支援 HTML5 影片播放。
		</video>
      </div>

      <p class="source-link-container">
        <a href="https://www.youtube.com/watch?v=bLsaATEFIB0" target="_blank" rel="noopener noreferrer" class="source-link">
          <i class="fab fa-youtube"></i> 來源：YouTube 反詐宣導影片
        </a>
      </p>
    </div>

  </main>
</template>

<script setup>
// 這頁是純靜態內容展示，所以 Script 區塊留空即可
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

/* 影片區塊外層排版 */
.video-section {
  text-align: center;
}

/* 影片容器響應式設定與陰影美化 */
.video-wrapper {
  margin: 0 auto 20px auto;
  max-width: 800px; /* 避免影片在大螢幕上大得嚇人 */
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  background: #000;
  border: 2px solid #cbd5e1;
}

/* 影片來源超連結美化 */
.source-link-container {
  margin-top: 15px;
  margin-bottom: 40px;
}
.source-link {
  display: inline-block;
  color: #e11d48;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.1rem;
  padding: 10px 20px;
  border-radius: 8px;
  background-color: #fff1f2;
  border: 1px solid #ffe4e6;
  transition: all 0.3s;
}
.source-link:hover {
  background-color: #ffe4e6;
  color: #be123c;
  border-color: #fecdd3;
  box-shadow: 0 4px 10px rgba(225, 29, 72, 0.1);
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