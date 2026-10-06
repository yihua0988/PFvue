<template>
  <!-- 主導覽列 (對應你原本的 5 個大分類) -->
  <nav>
    <router-link to="/"><i class="fas fa-home"></i>&nbsp;首頁</router-link>
    <router-link to="/fraud-patterns"><i class="fas fa-network-wired"></i>&nbsp;資料視覺化</router-link>
    <router-link to="/prevention"><i class="fas fa-chart-line"></i>&nbsp;案例分析</router-link>
    <router-link to="/anti-deepfake-video"><i class="fas fa-shield-alt"></i>&nbsp;165反詐影片</router-link>
    <router-link to="/summary"><i class="fas fa-file-alt"></i>&nbsp;總結</router-link>
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
</style>