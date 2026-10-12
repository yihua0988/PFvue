<template>
  <!-- 主導覽列 -->
  <nav>
    <!-- 1. 首頁 (加上 /PFvue) -->
    <a 
      href="/PFvue/" 
      :class="{ 'router-link-active': ['/'].includes($route.path) }"
    >
      <i class="fas fa-home"></i>首頁
    </a>

    <!-- 2. 資料視覺化 (加上 /PFvue) -->
    <a 
      href="/PFvue/fraud-patterns" 
      :class="{ 'router-link-active': ['/fraud-patterns'].includes($route.path) }"
    >
      <i class="fas fa-chart-bar"></i>資料視覺化
    </a>

    <!-- 3. 案例分析 (加上 /PFvue) -->
    <a 
      href="/PFvue/prevention"
      :class="{ 'router-link-active': ['/prevention', '/fraud-growth-stats', '/ai-fraud-news', '/top-10-frauds'].includes($route.path) }"
    >
      <i class="fas fa-chart-line"></i>案例分析
    </a>

    <!-- 4. 165反詐影片 (加上 /PFvue) -->
    <a 
      href="/PFvue/anti-deepfake-video" 
      :class="{ 'router-link-active': ['/anti-deepfake-video', '/anti-phishing-video', '/anti-investment-video'].includes($route.path) }"
    >
      <i class="fas fa-shield-alt"></i>165反詐影片
    </a>

    <!-- 5. 總結 (加上 /PFvue) -->
    <a 
      href="/PFvue/summary" 
      :class="{ 'router-link-active': ['/summary', '/victim-profile', '/fraud-vulnerabilities', '/action-plan'].includes($route.path) }"
    >
      <i class="fas fa-file-alt"></i>總結
    </a>
  </nav>

  <!-- 頁面動態切換出口 -->
  <router-view />

  <footer>
    <p>© 2026 台灣反詐騙資訊與數據分析網 | 守護您的資安與財產</p>
  </footer>
</template>

<script setup>
</script>

<style>
/* 您的 CSS 樣式保留在這裡即可 */
</style>