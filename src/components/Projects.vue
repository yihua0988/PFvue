<template>
  <div class="projects-container">
    <h2><i class="fas fa-project-diagram"></i> 專案模組與開源資源</h2>
    <p class="projects-desc">
      本系統為 2026 年反詐騙防制與數據分析平台，結合了 165 打詐儀表板、AI深偽案例解析及十大詐騙手法統計。
    </p>

    <div class="projects-grid">
      <!-- 卡片一：GitHub 原始碼 -->
      <div class="project-card">
        <i class="fab fa-github project-icon"></i>
        <h3>GitHub 專案原始碼</h3>
        <p>完整的前端 Vue 3 架構、路由配置與靜態防詐資料庫檔案。</p>
        <a href="https://github.com/yihua0988/-2025-7-29-" target="_blank" rel="noopener noreferrer" class="project-btn">
          查看原始碼 <i class="fas fa-external-link-alt"></i>
        </a>
      </div>

      <!-- 卡片二：專案簡報 PPT -->
      <div class="project-card">
        <i class="fas fa-file-powerpoint project-icon" style="color: #ea580c;"></i>
        <h3>專案簡報與文件</h3>
        <p>包含反詐騙主題的研究背景、數據分析圖表與系統架構說明。</p>
        <a href="https://github.com/yihua0988/-2025-7-29-/tree/main/ppt" target="_blank" rel="noopener noreferrer" class="project-btn ppt-btn">
          下載簡報 <i class="fas fa-external-link-alt"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
// 這裡可以根據需求加入互動邏輯，目前作為區塊元件展示
</script>

<style scoped>
.projects-container {
  background: rgba(255, 255, 255, 0.85);
  border: 1px solid #e2e8f0;
  border-top: 5px solid #10b981; /* 綠色頂部飾條區分其他區塊 */
  padding: 35px 45px;
  margin: 30px auto;
  width: 100%;
  max-width: 900px;
  border-radius: 8px;
  box-shadow: 0 8px 30px rgba(15, 23, 42, 0.06);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  text-align: center;
}

.projects-container h2 {
  color: #0f172a;
  margin-top: 0;
  margin-bottom: 15px;
  font-size: 1.8rem;
  font-weight: 900;
}

.projects-desc {
  color: #475569;
  font-size: 1.1rem;
  margin-bottom: 30px;
  line-height: 1.6;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.project-card {
  background: #f8fafc;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  padding: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
}

.project-icon {
  font-size: 2.5rem;
  color: #0284c7;
  margin-bottom: 15px;
}

.project-card h3 {
  font-size: 1.25rem;
  color: #1e293b;
  margin-bottom: 10px;
  font-weight: bold;
}

.project-card p {
  font-size: 0.95rem;
  color: #64748b;
  margin-bottom: 20px;
  text-align: center;
  line-height: 1.5;
}

.project-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background-color: #0284c7;
  color: #fff;
  padding: 8px 16px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: bold;
  font-size: 0.95rem;
  transition: background-color 0.2s;
  margin-top: auto;
}

.project-btn:hover {
  background-color: #0369a1;
  color: #fff;
}

.ppt-btn {
  background-color: #ea580c;
}

.ppt-btn:hover {
  background-color: #c2410c;
}
</style>