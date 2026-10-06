<template>
  <main class="content">
    
    <h1 class="main-title">107年10月 ~ 114年3月電信詐欺分佈圖</h1>

    <!-- 資料視覺化專屬的子頁面選單 -->
    <div class="subpages" style="grid-template-columns: repeat(5, 1fr);">
      <router-link to="/fraud-patterns"><i class="fas fa-map-marked-alt"></i>&nbsp;台灣地區分佈圖</router-link>
      <router-link to="/fraud-trends"><i class="fas fa-chart-line"></i>&nbsp;年份月份比較</router-link>
      <router-link to="/fraud-interception"><i class="fas fa-phone-slash"></i>&nbsp;詐騙電話攔截率</router-link>
      <router-link to="/one-page-scam"><i class="fas fa-file-invoice"></i>&nbsp;一頁式詐騙樣式</router-link>
      <router-link to="/fake-websites"><i class="fas fa-globe"></i>&nbsp;被冒名網站名稱</router-link>
    </div>

    <!-- 內文說明卡片 -->
    <div class="page-title">
      <h2><i class="fas fa-chart-pie"></i> 電信詐欺地理與熱區分析</h2>
      <p>
        本頁展示了從 107 年 10 月到 114 年 3 月期間，台灣各地區電信詐欺案件的地理分佈情況。<span style="color: #ef4444; font-weight: bold; text-decoration: underline;">請注意地圖載入可能需要一些時間，透過地圖放大縮小更能看清楚熱區。</span>
      </p>
      <p>
        使用者可以直觀地比較各縣市詐騙案件集中程度，並透過熱力圖觀察各年各月的案件分布變化，進一步分析詐騙熱點與趨勢。此可視化報表有助於警政單位與民眾掌握詐騙集中區域，了解不同時期詐騙案件的分佈情況，提升防詐意識並做出精準預防。
      </p>
      <p>
        透過地圖放大或縮小，您可以更清楚觀察各地區的熱區分布，方便分析詐騙案件集中情況，並協助研判警示策略與防範措施，提供實務參考與資料洞察。
      </p>
    </div>

    <!-- Power BI iframe 互動地圖容器 -->
    <div class="powerbi-container" style="height: 750px; margin-top: 20px;">
      <iframe 
        src="https://app.powerbi.com/view?r=eyJrIjoiMjk4YmQ2N2EtYTI4NS00ZDE2LWEzNTItMThjNDMwZWQ2MThiIiwidCI6ImJjODlhMzJmLWQ4N2YtNGNjZS1hMjM1LWIzNDQxYmM2OWU5MCJ9&pageName=d4a023300f6751f3d421" 
        title="107年10月至114年3月電信詐欺分佈圖"
        frameborder="0" 
        allowfullscreen>
      </iframe>
    </div>

  </main>
</template>

<script setup>
// 本頁面主要為互動式報表展示與文字說明
</script>

<style scoped>
/* 針對 5 個並排按鈕的 RWD 微調 */
@media (max-width: 1024px) {
  .subpages {
    grid-template-columns: repeat(3, 1fr) !important;
  }
}
@media (max-width: 768px) {
  .subpages {
    grid-template-columns: 1fr 1fr !important;
  }
  .powerbi-container {
    height: 500px !important;
  }
}
@media (max-width: 480px) {
  .subpages {
    grid-template-columns: 1fr !important;
  }
}
</style>