<template>
  <main class="content">
    
    <h1 class="main-title">2026近年詐騙防制資料分析</h1>
    
    <!-- 警覺詐騙區塊 -->
    <div class="alert-box">
      <h2><i class="fas fa-exclamation-triangle"></i> 警覺詐騙，守護財產與尊嚴</h2>
      <p>本網站透過數據、新聞、實例與總結，協助您深入了解詐騙趨勢，提升防詐意識。</p>
      <p>以下內容引用自政府公開資訊平台（<a href="https://data.gov.tw/" target="_blank" rel="noopener noreferrer">data.gov.tw</a>）</p>
    </div>

    <!-- 網站資訊概覽表格 -->
    <h2><i class="fas fa-info-circle"></i> 網站資訊概覽</h2>
    <table>
      <tbody>
        <tr>
          <td class="category">網站背景</td>
          <td>
            隨著網路與金融科技發展，詐騙手法日益多樣化。<br>
            受害人群涵蓋各年齡層，從電話、網購到社群媒體詐騙。<br>
            透過數據分析，可了解高發區域、典型案例與警示模式。
          </td>
        </tr>
        <tr>
          <td class="category">網站目的</td>
          <td>
            提供最新詐騙案例與數據分析，提升民眾防詐意識。<br>
            協助大家掌握詐騙趨勢，並學會基本防詐技巧。
          </td>
        </tr>
        <tr>
          <td class="category">防詐小提醒</td>
          <td>
            <ul class="recommend-list">
              <li>不隨意點擊來路不明的連結或附件。</li>
              <li>核對陌生電話或簡訊資訊的真偽。</li>
              <li>警惕「先匯款再發貨」或「高額獎金」的誘因。</li>
              <li>遇到疑似詐騙案件，立即撥打 <strong>165</strong> 報案。</li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- 165 打詐儀表板 -->
    <h2><i class="fas fa-chart-pie"></i> 165 打詐儀表板 (即時數據)</h2>
    <div class="powerbi-container">
      <iframe 
          src="https://165dashboard.tw" 
          title="165反詐騙儀表板"
          loading="lazy"
          allowfullscreen>
      </iframe>
    </div>
    <p><a href="https://165.npa.gov.tw/#/" target="_blank" rel="noopener noreferrer"><i class="fas fa-external-link-alt"></i> 資料來源: 165 反詐騙官方網站</a></p>

    <!-- App 與社群下載區 -->
    <h2><i class="fas fa-mobile-alt"></i> 下載警政服務 App ＆ 加入防詐社群</h2>
    <div class="app-container">
      <ul class="app-list">
        <li @click="openModal($event, '警政服務APP<br>iOS版<br>立即下載')">
          <img src="/code1.jpg" alt="下載警政服務App iOS版本 QR Code">
          <p>警政服務APP<br>iOS版<br>立即下載</p>
        </li>
        <li @click="openModal($event, '警政服務APP<br>Android版<br>立即下載')">
          <img src="/code2.jpg" alt="下載警政服務App Android版本 QR Code">
          <p>警政服務APP<br>Android版<br>立即下載</p>
        </li>
        <li @click="openModal($event, 'Facebook<br>官方專頁<br>加入社群')">
          <img src="/code3.jpg" alt="165反詐騙 Facebook 官方粉絲團 QR Code">
          <p>Facebook<br>官方專頁<br>加入社群</p>
        </li>
        <li @click="openModal($event, 'LINE<br>防騙宣導群組<br>加入社群')">
          <img src="/code4.jpg" alt="165防騙宣導 LINE 官方帳號 QR Code">
          <p>LINE<br>防騙宣導群組<br>加入社群</p>
        </li>
      </ul>
    </div>

    <!-- 作品索引與聯繫方式 -->
    <h2><i class="fas fa-folder-open"></i> 我的作品索引與聯繫方式</h2>
    <ul class="recommend-list no-bullets">
      <li><a href="https://github.com/yihua0988/-2025-7-29-" target="_blank" rel="noopener noreferrer"><i class="fab fa-github"></i> GitHub 專案首頁</a></li>
      <li><a href="https://github.com/yihua0988/-2025-7-29-/tree/main/ppt" target="_blank" rel="noopener noreferrer"><i class="fas fa-file-powerpoint"></i> 簡報 PPT 連結</a></li>
      <li>
        <i class="fas fa-envelope"></i> 聯繫作者：
        <span @click="copyEmail" style="cursor: pointer; color: #0284c7; border-bottom: 1px dashed #0284c7; display: inline-flex; align-items: center; gap: 5px; font-weight: bold;">
          yihua0988@gmail.com
          <span style="font-size: 12px; background: #e0f2fe; color: #0369a1; padding: 2px 6px; border-radius: 4px; border: 1px solid #bae6fd;">點擊複製</span>
        </span>
      </li>
    </ul>

    <!-- ============================================== -->
    <!-- 彈出大視窗 (Modal) -->
    <!-- ============================================== -->
    <Teleport to="body">
      <div v-if="activeModal" class="modal-backdrop" @click="closeModal">
        <div class="modal-dialog" @click.stop>
          
          <!-- SVG 向量叉叉圖示 -->
          <span class="modal-close" @click="closeModal">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </span>

          <img :src="activeModal.img" class="modal-img" alt="放大的 QRCode">
          <p class="modal-text" v-html="activeModal.text"></p>
        </div>
      </div>
    </Teleport>

  </main>
</template>

<script setup>
import { ref } from 'vue'

const activeModal = ref(null)

const openModal = (event, textHtml) => {
  const originalImgElement = event.currentTarget.querySelector('img')
  if (originalImgElement) {
    activeModal.value = { 
      img: originalImgElement.src,
      text: textHtml 
    }
  }
}

const closeModal = () => {
  activeModal.value = null
}

const copyEmail = () => {
  const email = 'yihua0988@gmail.com'
  navigator.clipboard.writeText(email).then(() => {
    alert('Email 已成功複製：' + email)
  }).catch(err => {
    console.error('複製失敗:', err)
  })
}
import { onMounted } from 'vue';
import { supabase } from '../lib/supabase.js'

onMounted(async () => {
  console.log('正在測試連線 Supabase...');
  
  // 試著查詢您剛剛建立的資料表（或是隨便抓一個不存在的表來測試回應）
  const { data, error } = await supabase.from('anti_fraud_performance').select('*');

  if (error) {
    console.error('❌ 連線或查詢失敗：', error.message);
  } else {
    console.log('✅ 成功從 Vue 專案連線到 Supabase！取得資料：', data);
  }
});
</script>

<style scoped>
/* 
  💡 已經幫你把 .alert-box, .powerbi-container, .app-list 等樣式
  拿掉了，因為我們剛剛已經把它們存到全域的 style.css 裡面了！
  留在這裡只會造成程式碼重複與未來的維護困難。
*/

/* ======================================= */
/* 只有「彈出大視窗 (Modal)」的樣式留在這裡 */
/* ======================================= */

:global(.modal-backdrop) {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999999;
  animation: fadeIn 0.2s ease-out;
}

:global(.modal-dialog) {
  background-color: #fff;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
  position: relative;
  text-align: center;
  animation: scaleUp 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
}

:global(.modal-img) {
  width: 360px; 
  max-width: 85vw; 
  height: auto;
  margin-bottom: 20px;
  border-radius: 8px;
}

:global(.modal-text) {
  font-size: 1.4rem;
  font-weight: 900;
  color: #1e293b;
  line-height: 1.6;
  margin: 0;
}

:global(.modal-close) {
  position: absolute;
  top: -15px;
  right: -15px;
  background-color: #ef4444;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0,0,0,0.3);
  transition: background-color 0.2s, transform 0.2s;
  z-index: 10;
}
:global(.modal-close:hover) {
  background-color: #dc2626;
  transform: scale(1.05); /* 滑鼠移過去稍微放大，質感加分 */
}

/* 小動畫 */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes scaleUp {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}

@media (max-width: 768px) {
  :global(.modal-text) {
    font-size: 1.2rem; 
  }
}
</style>