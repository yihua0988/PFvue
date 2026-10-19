<template>
<main class="content dashboard-page">
    
  <div class="page-header" style="margin-bottom: 24px;">
    <h1 class="main-title">AI亂入罷免：深偽詐騙新聞</h1>
    <p class="dashboard-subtitle">從經濟詐欺蔓延至政治操縱，深偽語音如何挑戰社會信任底線</p>
  </div>

  <!-- 3. 案例分析子導覽列 (強制重整) -->
	<div class="subpages" style="grid-template-columns: repeat(4, 1fr);">
	<a href="/PFvue/prevention" :class="{ 'router-link-exact-active': $route.path === '/prevention' }">
		<i class="fas fa-project-diagram"></i>&nbsp;AI深偽亂入罷免案例
	</a>
	<a href="/PFvue/fraud-growth-stats" :class="{ 'router-link-exact-active': $route.path === '/fraud-growth-stats' }">
		<i class="fas fa-user-shield"></i>&nbsp;AI詐騙一年暴增四倍
	 </a>
	 <a href="/PFvue/ai-fraud-news" :class="{ 'router-link-exact-active': $route.path === '/ai-fraud-news' }">
		<i class="fas fa-bug"></i>&nbsp;AI假檢警與黑幫經營
	 </a>
	 <a href="/PFvue/top-10-frauds" :class="{ 'router-link-exact-active': $route.path === '/top-10-frauds' }">
		<i class="fas fa-fist-raised"></i>&nbsp;十大常見詐騙解析
	 </a>
	</div>

   <!-- 📖 深度案例探討區塊 -->
   <div class="panel anti-fraud-container" style="text-align: left; margin-top: 24px;">
     <div class="panel-header">
       <h2><i class="fas fa-search-plus"></i>案例探討：深偽技術的跨界威脅</h2>
       <p class="box-subtitle">剖析AI技術如何被不當挪用，並對民主程序造成實質傷害</p>
     </div>

     <div class="fraud-item">
       <h3 class="fraud-title">一、事件背景：科技與選舉的危險交鋒</h3>
       <p class="description">
          本新聞案例凸顯了AI技術已被運用於政治領域的資訊操縱。在敏感的罷免議題中，出現了立委聲音遭未經授權變造、照片被盜用等嚴重情況。這不僅是單純的個人名譽侵害事件，更顯示出深偽（Deepfake）技術的應用場景，已經從過去常見的「假投資」、「假親友借款」等經濟型詐騙，正式跨界成為影響<strong class="highlight-red">民主程序公平性</strong>的武器。
       </p>
     </div>

     <div class="fraud-item">
       <h3 class="fraud-title">二、擴散手法與社會影響</h3>
       <p class="description">
          從報導中可見，這類造假的語音與影片，往往被有心人士刻意剪輯後，大量投放於LINE等封閉型通訊軟體與社群網路中。由於<strong class="highlight-red">AI語音合成技術（Voice Cloning）</strong>日益成熟，一般民眾在缺乏專業辨識工具的情況下，極難在短時間內分辨<strong class="highlight-red">音檔真偽</strong>。<br><br>
          這種<strong class="highlight-red">「深偽詐騙」</strong>行為帶有高度的政治操作風險，利用受眾的情緒進行病毒式傳播，其最終目的在於<strong class="highlight-red">誤導選民、激化社會對立</strong>，進而從根本上破壞社會人際間的信任基礎。
       </p>
     </div>

     <div class="fraud-item">
       <h3 class="fraud-title">三、防制呼籲與反思</h3>
       <p class="description">
          針對此惡劣行徑，王育敏委員不僅強烈呼籲有心人士「適可而止」，也表明將透過嚴正的法律途徑制止違法操作。此案例為全體國民敲響了警鐘：AI雖然能大幅提升生活便利性，但當其被<strong class="highlight-red">濫用於製造虛假訊息</strong>時，殺傷力亦不容小覷。<br><br>
          在面對日益複雜的資訊環境時，民眾在接收任何聳動的影音資訊時，必須培養<strong class="highlight-red">「先懷疑，後查證」</strong>的媒體識讀能力，切勿因一時的情緒波動而隨意轉發，以免無意間成為資訊詐騙與假訊息擴散的幫凶。
      </p>
    </div>
  </div>

  <!-- 📰 新聞原件嵌入 -->
  <div class="panel" style="margin-top: 24px; margin-bottom: 40px;">
    <div class="panel-header" style="text-align: left;">
      <h2><i class="fas fa-newspaper"></i>相關新聞原件參閱</h2>
      <p class="box-subtitle">原始新聞報導與事件紀錄，點擊下方按鈕可前往原站閱讀</p>
    </div>
      
    <div class="iframe-container" style="border: 2px solid #e2e8f0; border-radius: 14px; overflow: hidden; background: #fff;">
      <iframe 
          :src="iframeSrc" 
          title="AI亂入罷免戰藍委聲音遭變造 本地檔案"
          sandbox="allow-same-origin allow-scripts"
          frameborder="0"
          style="width: 100%; height: 70vh; min-height: 600px; display: block;">
      </iframe>
    </div>

    <!-- 🌟 超連結改為靠左對齊 -->
    <div style="text-align: left; margin-top: 18px;">
      <a href="https://udn.com/news/story/124323/8847566" target="_blank" rel="noopener noreferrer" class="jump-unanswered-btn" style="text-decoration: none; display: inline-block; padding: 12px 24px; font-size: 17px;">
        <i class="fas fa-external-link-alt"></i>前往聯合新聞網查看原文
      </a>
    </div>
  </div>

</main>
</template>

<script setup>
import { computed } from 'vue'

// 🌟 動態計算 iframe 來源，支援 GitHub Pages 子路徑
const iframeSrc = computed(() =>{
  return `${import.meta.env.BASE_URL}udn-news-ai/udn-news-ai.html`
})
</script>

<style scoped>
/* =========================================================================
   本頁面專屬微調 (繼承全站 .panel, .fraud-item 樣式)
   ========================================================================= */

/* 🌟 紅色粗體重點專屬樣式 */
.highlight-red {
  color: #dc2626;      /* 醒目的危險紅 */
  font-weight: 900;    
  background: #fee2e2; 
  padding: 0 4px;
  border-radius: 4px;
}

/* 🌟 新增：連同上方的「案例探討主標題」與「副標題」一起放大 1.1 倍 */
.panel-header h2 {
  font-size: 32px !important;  /* 標題放大 */
  font-weight: 900 !important;
}

.panel-header .box-subtitle {
  font-size: 20px !important;  /* 副標題放大 1.1 倍 */
  color: #dc2626 !important;   /* 配合您截圖中的紅色視覺 */
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

/* 🌟 內文段落標題放大 1.1 倍 (約 26px) */
.anti-fraud-container .fraud-title {
  color: #0284c7; 
  font-weight: 900; 
  font-size: 26px !important;     
  margin-bottom: 12px;
  margin-top: 0;
}

/* 🌟 內文段落放大 1.1 倍 (約 22px) */
.anti-fraud-container .description {
  font-size: 22px !important; 
  LINE-height: 1.75 !important;
  color: #334155 !important;
  text-align: justify;
  margin: 0;
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
  /* 手機版字體微調 */
  .panel-header h2 { font-size: 26px !important; }
  .panel-header .box-subtitle { font-size: 18px !important; }
  .anti-fraud-container .fraud-title { font-size: 22px !important; }
  .anti-fraud-container .description { font-size: 18px !important; }
}
</style>