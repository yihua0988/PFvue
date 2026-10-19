<template>
 <!-- 主要內容區 -->
 <main class="content dashboard-page">
    
   <div class="page-header" style="margin-bottom: 24px;">
     <h1 class="main-title">重大詐騙新聞：AI技術與黑幫組織</h1>
     <p class="dashboard-subtitle">假檢警技術升級與跨國洗錢水房串聯，剖析現代高科技犯罪鏈</p>
   </div>

   <!-- 3. 案例分析子導覽列 -->
	<div class="subpages" style="grid-template-columns: repeat(4, 1fr);">
	  <router-link to="/prevention" :class="{ 'router-link-exact-active': $route.path === '/prevention' }">
		<i class="fas fa-project-diagram"></i>&nbsp;AI深偽亂入罷免案例
	  </router-link>
	  <router-link to="/fraud-growth-stats" :class="{ 'router-link-exact-active': $route.path === '/fraud-growth-stats' }">
		<i class="fas fa-user-shield"></i>&nbsp;AI詐騙一年暴增四倍
	  </router-link>
	  <router-link to="/ai-fraud-news" :class="{ 'router-link-exact-active': $route.path === '/ai-fraud-news' }">
		<i class="fas fa-bug"></i>&nbsp;AI假檢警與黑幫經營
	  </router-link>
	  <router-link to="/top-10-frauds" :class="{ 'router-link-exact-active': $route.path === '/top-10-frauds' }">
		<i class="fas fa-fist-raised"></i>&nbsp;十大常見詐騙解析
	  </router-link>
	</div>

   <!-- ================== 案例一：AI合成假檢警 ================== -->
   <div class="panel anti-fraud-container" style="text-align: left; margin-top: 24px;">
     <div class="panel-header">
       <h2><i class="fas fa-robot"></i>案例一：AI合成假檢警，詐走近九千萬</h2>
       <p class="box-subtitle">視訊造假瓦解心理防線，單一受害者遭榨乾存款並淪為人頭戶</p>
     </div>

     <div class="fraud-item" style="border-bottom: none;">
       <p class="description">
          這起案例凸顯AI技術已被詐騙集團大量濫用，<strong class="highlight-red">假冒檢警</strong>的聲音與影像幾可亂真，讓受害者在視訊當下完全失去判斷力。婦人短短四個月內，八個帳戶共遭詐走<strong class="highlight-red">近九千萬元</strong>，不僅畢生存款全失，更因帳戶被當成<strong class="highlight-red">人頭戶</strong>而受到連帶法律懲處。<br><br>
          這顯示出銀行在鉅額轉帳的風險控管與即時警示上仍有檢討空間；同時也強烈提醒民眾，只要遇到「檢警要求視訊」或「監管帳戶金流操作」時，務必立刻掛斷，並撥打165或透過官方電話親自確認，切勿讓恐懼支配行動。
       </p>
     </div>

     <!-- 影片區塊與新聞來源 -->
     <div class="video-wrapper">
       <video controls preload="metadata" width="100%">
         <source src="/videos/news-video-1.mp4" type="video/mp4" />
          您的瀏覽器不支援 HTML5 影片播放。
       </video>
     </div>
     <div style="text-align: left; margin-top: 18px;">
       <a href="https://www.youtube.com/watch?v=WeoJIU3RXU0" target="_blank" rel="noopener noreferrer" class="jump-unanswered-btn" style="text-decoration: none; display: inline-block; padding: 10px 20px; font-size: 16px;">
         <i class="fab fa-youtube" style="color: #ef4444;"></i>前往中視新聞YouTube觀看原片
       </a>
     </div>
   </div>

   <!-- ================== 案例二：竹聯幫跨國洗錢 ================== -->
   <div class="panel anti-fraud-container" style="text-align: left; margin-top: 32px;">
     <div class="panel-header">
       <h2><i class="fas fa-gavel"></i>案例二：竹聯幫經營跨境詐騙與洗錢</h2>
       <p class="box-subtitle">黑幫組織轉型，假投資平台結合跨國洗錢水房榨取上億資金</p>
     </div>

     <div class="fraud-item" style="border-bottom: none;">
       <p class="description">
          此案例顯示犯罪集團已從單純的話術詐欺，轉型為利用社群平台與「假投資網站」進行的精密詐騙，短短四個月內就騙走超過<strong class="highlight-red">1億5千萬台幣</strong>，受害者高達220人以上。<br><br>
          竹聯幫弘仁會幹部涉入其中，凸顯了<strong class="highlight-red">跨國組織化與洗錢手法</strong>的嚴重升級。當傳統黑道幫派的龐大執行力，結合了無遠弗屆的社群網路與包裝精美的假投資平台，其詐騙的規模與擴散速度便難以想像。提醒民眾務必提高對「網路飆股、高報酬內線」的警覺，慎防落入精心設計的假網站陷阱。
       </p>
     </div>

     <!-- 影片區塊與新聞來源 -->
     <div class="video-wrapper">
       <video controls preload="metadata" width="100%">
         <source src="/videos/news-video-2.webm" type="video/webm" />
          您的瀏覽器不支援HTML5影片播放。
       </video>
     </div>
     <div style="text-align: left; margin-top: 18px;">
       <a href="https://www.youtube.com/watch?v=FxEYy7gfDAk" target="_blank" rel="noopener noreferrer" class="jump-unanswered-btn" style="text-decoration: none; display: inline-block; padding: 10px 20px; font-size: 16px;">
         <i class="fab fa-youtube" style="color: #ef4444;"></i>前往YouTube新聞快訊觀看原片
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
// 這頁為純靜態內容展示
</script>

<style scoped>
/* =========================================================================
   本頁面專屬微調 (繼承全站 .panel, .fraud-item 樣式，字體統一放大 1.1 倍)
   ========================================================================= */

/* 🌟 紅色粗體重點專屬樣式 */
.highlight-red {
  color: #dc2626;      
  font-weight: 900;    
  background: #fee2e2; 
  padding: 0 4px;
  border-radius: 4px;
}

/* 🌟 特殊高亮分析區塊 (給最後的總結使用) */
.highlight-panel {
  background: #fffbeb !important; /* 淡淡的警告黃底色 */
  border: 2px solid #fcd34d !important;
}

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
  margin-bottom: 24px;
  padding-bottom: 18px;
  border-bottom: 1px dashed #cbd5e1;
}

.anti-fraud-container .fraud-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.anti-fraud-container .fraud-title {
  color: #0284c7; 
  font-weight: 900; 
  font-size: 26px !important;     
  margin-bottom: 12px;
  margin-top: 0;
}

.anti-fraud-container .description {
  font-size: 22px !important; 
 LINE-height: 1.75 !important;
  color: #334155 !important;
  text-align: justify;
  margin: 0;
}

/* 影片區塊與圓角陰影設計 */
.video-wrapper {
  margin: 20px auto 0 auto;
  max-width: 850px; 
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(0,0,0,0.25); /* 增加高級立體陰影 */
  background: #000;
  border: 1px solid #cbd5e1;
}

/* 確保子導覽列在 RWD 能完美折行 */
@media (max-width: 1000px) {
  .subpages {
    grid-template-columns: repeat(2, 1fr) !important;
  }
}

@media (max-width: 600px) {
  .subpages {
    display: flex !important;
    flex-direction: column !important;
  }
  .panel-header h2 { font-size: 26px !important; }
  .panel-header .box-subtitle { font-size: 18px !important; }
  .anti-fraud-container .fraud-title { font-size: 22px !important; }
  .anti-fraud-container .description { font-size: 18px !important; }
}
</style>