<template>
  <!-- 主要內容區 -->
  <main class="content">
    
    <h1 class="main-title">重大詐騙新聞：AI 技術與黑幫組織</h1>

    <!-- 新的子導覽列 (強制重整，釋放 RAM) -->
	<div class="subpages" style="grid-template-columns: repeat(4, 1fr);">
	  <a 
		href="/PFvue/prevention" 
		:class="{ 'router-link-exact-active': $route.path === '/prevention' }"
	  >
		<i class="fas fa-project-diagram"></i>&nbsp;AI深偽亂入罷免案例
	  </a>
	  
	  <a 
		href="/PFvue/fraud-growth-stats" 
		:class="{ 'router-link-exact-active': $route.path === '/fraud-growth-stats' }"
	  >
		<i class="fas fa-user-shield"></i>&nbsp;AI詐騙一年暴增四倍多
	  </a>
	  
	  <a 
		href="/PFvue/ai-fraud-news" 
		:class="{ 'router-link-exact-active': $route.path === '/ai-fraud-news' }"
	  >
		<i class="fas fa-bug"></i>&nbsp;AI假檢警詐騙與黑幫經營
	  </a>
	  
	  <a 
		href="/PFvue/top-10-frauds" 
		:class="{ 'router-link-exact-active': $route.path === '/top-10-frauds' }"
	  >
		<i class="fas fa-fist-raised"></i>&nbsp;十大常見詐騙解析
	  </a>
	</div>

    <!-- ================== 案例一 ================== -->
    <div class="page-title" style="margin-top: 30px;">
      <h2><i class="fas fa-robot"></i> 案例一：AI 合成假檢警，詐走近九千萬</h2>
      <p>
        這起案例凸顯 AI 技術已被詐騙集團大量濫用，<strong>假冒檢警</strong>的聲音與影像幾可亂真，讓受害者失去判斷力。婦人短短四個月內，八個帳戶共遭詐走<strong>近九千萬元</strong>，不僅存款全失，更因帳戶被當成<strong>人頭戶</strong>而受到連帶懲處。
      </p>
      <p>
        這顯示銀行在風險控管與即時警示上仍有漏洞，也提醒民眾必須保持警覺，遇到檢警要求視訊或金流操作時，務必透過官方電話或親自確認，以防成為下一個受害者。
      </p>
    </div>

    <div class="video-wrapper">
      <!-- 修正重點 3：影片路徑改為 / 開頭，並強烈建議使用純英文檔名 -->
      <video controls preload="metadata" width="100%">
        <!-- 請將你的影片改名為 news-video-1.mp4 並放入 public 資料夾 -->
        <source src="/videos/news-video-1.mp4" type="video/mp4" />
        您的瀏覽器不支援 HTML5 影片播放。
      </video>
    </div>
    
    <p style="margin-top: 10px; margin-bottom: 30px; text-align: center;">
      <a href="https://www.youtube.com/watch?v=WeoJIU3RXU0" target="_blank" rel="noopener noreferrer" class="source-link">
        <i class="fab fa-youtube"></i> 來源：中視新聞 YouTube
      </a>
    </p>

    <!-- ================== 案例二 ================== -->
    <div class="page-title" style="margin-top: 30px;">
      <h2><i class="fas fa-gavel"></i> 案例二：竹聯幫經營跨境詐騙與洗錢</h2>
      <p>
        此案例顯示犯罪集團利用社群平台與假投資網站進行精密詐騙，短短四個月就騙走超過 <strong>1億5千萬台幣</strong>，受害者超過 220 人。
      </p>
      <p>
        竹聯幫弘仁會幹部涉入其中，凸顯<strong>跨國組織化與洗錢手法</strong>的升級。當傳統黑幫的執行力，結合了社群網路與假投資平台，詐騙的規模與速度便難以想像。提醒民眾提高網路投資警覺，慎防高報酬誘惑，務必核實官方管道，避免落入假網站與社群陷阱。
      </p>
    </div>

    <div class="video-wrapper">
      <!-- 修正重點 3：影片路徑改為 / 開頭 -->
      <video controls preload="metadata" width="100%">
        <!-- 請將你的影片改名為 news-video-2.webm 並放入 public 資料夾 -->
        <source src="/videos/news-video-2.webm" type="video/webm" />
        您的瀏覽器不支援 HTML5 影片播放。
      </video>
    </div>
    
    <p style="margin-top: 10px; margin-bottom: 30px; text-align: center;">
      <a href="https://www.youtube.com/watch?v=FxEYy7gfDAk" target="_blank" rel="noopener noreferrer" class="source-link">
        <i class="fab fa-youtube"></i> 來源：YouTube 新聞快訊
      </a>
    </p>

    <!-- ================== 深度串聯分析 ================== -->
    <div class="page-title" style="margin-top: 30px; border-top: 5px solid #eab308;">
      <h2><i class="fas fa-link"></i> 深度串聯分析：當黑幫武裝了 AI 科技</h2>
      <p>
        綜合上述兩起重大案件，我們可以觀察到當前詐騙產業最危險的趨勢：<strong>「傳統黑幫組織化」與「AI 深偽技術」的恐怖結合</strong>。
      </p>
      <p>
        過去，黑幫擁有龐大的跨國洗錢水房與人頭帳戶網絡，但前端騙人的手法依賴大量人工打電話、發簡訊，效率有限且容易被識破。如今，詐騙集團導入 <strong>AI 深偽影像與聲音複製技術</strong>，詐騙已經從「亂槍打鳥」進化為<strong>「高科技客製化的精準打擊」</strong>。
      </p>
      <p>
        科技補足了黑幫的技術缺口，而黑幫提供了 AI 詐騙所需的龐大資金與洗錢管道。當受害者面對的是「長相與聲音極度真實的假檢警」，或是「包裝精美的跨國假投資平台」時，傳統的防備心極易崩潰。面對這種新型態的雙重威脅，民眾必須建立<strong>「眼見不一定為憑」</strong>的觀念，任何涉及金流的要求，務必透過實體或官方管道進行二次查證。
      </p>
    </div>

  </main>
</template>

<script setup>
// 這頁為純靜態內容展示
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

/* 影片區塊響應式設定 */
.video-wrapper {
  margin: 30px auto 15px auto;
  max-width: 800px; /* 限制影片最大寬度，不會在大螢幕上大得嚇人 */
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
  background: #000;
}

/* 影片來源超連結美化 */
.source-link {
  color: #0284c7;
  text-decoration: none;
  font-weight: bold;
}
.source-link:hover {
  text-decoration: underline;
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