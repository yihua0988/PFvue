<template>
 <main class="content dashboard-page">
    
   <div class="page-header" style="margin-bottom: 24px;">
     <h1 class="main-title">AI詐騙一年暴增四倍多</h1>
     <p class="dashboard-subtitle">深偽與語音複製技術崛起，客製化釣魚瓦解傳統資安防線</p>
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

   <!-- 📖 深度案例探討區塊 -->
   <div class="panel anti-fraud-container" style="text-align: left; margin-top: 24px;">
     <div class="panel-header">
       <h2><i class="fas fa-search-plus"></i>案例探討：AI技術成為詐騙倍增器</h2>
       <p class="box-subtitle">剖析生成式 AI如何瓦解「眼見為憑」的認知與傳統驗證機制</p>
     </div>

     <div class="fraud-item">
       <h3 class="fraud-title">一、事件背景：告別亂槍打鳥的客製化陷阱</h3>
       <p class="description">
          近一年來，全球加密貨幣詐騙案件暴增 456%，這項驚人的數據背後，顯示出詐騙集團已進入了高度「自動化與客製化」的階段。他們大量運用<strong class="highlight-red">生成式 AI(Generative AI)</strong>技術，透過深度偽造（Deepfake）影像與語音複製（Voice Cloning），瞬間還原受害者親友的長相、口音與語氣。<br><br>
          這種製造出「親友身陷險境、急需資金求助」的高度真實情境，極大程度地瓦解了受害者第一時間的戒心，導致<strong class="highlight-red">受騙機率直線飆升</strong>。
       </p>
     </div>

     <div class="fraud-item">
       <h3 class="fraud-title">二、擴散手法與鯨魚級詐騙</h3>
       <p class="description">
          這股 AI詐騙浪潮的影響範圍極廣。不僅一般民眾受害，甚至連具備高度金融素養的銀行高層、跨國企業財務主管，都曾因為接獲「AI仿造的熟人或上司」的視訊通話而受騙上當。這些針對企業高階主管的<strong class="highlight-red">「鯨魚級詐騙（Whaling Phishing）」</strong>，單筆損失往往高達數千萬美元。<br><br>
          OpenAI執行長 Sam Altman 多次警告，這證明了傳統的<strong class="highlight-red">聲紋認證、人臉辨識與二階段驗證（2FA）</strong>，在強大的 AI技術面前已逐漸失去防禦能力。
       </p>
     </div>

     <div class="fraud-item">
       <h3 class="fraud-title">三、防制呼籲與核心應對策略</h3>
       <p class="description">
          詐騙之所以能在短時間內指數級增長，歸咎於「技術門檻大幅降低」、「詐騙腳本自動生成」與「社群資料過度曝光」。面對日益猖獗的威脅，民眾與企業必須採取積極防範：<br><br>
          建立<strong class="highlight-red">「親友專屬安全密碼」</strong>，在視訊中被要求匯款時優先核對；落實<strong class="highlight-red">「掛斷再撥」</strong>的反查機制，切勿點擊陌生訊息連結。企業更應放棄單一生物特徵驗證，改採判斷 IP、設備特徵的「多維度行為分析」，保持「零信任」的警戒態度。
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
          src="ai-fraud/ai-fraud.html" 
          title="AI詐騙相關新聞 本地檔案"
          sandbox="allow-same-origin allow-scripts"
          frameborder="0"
          style="width: 100%; height: 85vh; min-height: 900px; display: block;">
       </iframe>
     </div>

     <!-- 🌟 超連結改為靠左對齊 -->
     <div style="text-align: left; margin-top: 18px;">
       <a href="https://news.pchome.com.tw/science/technice/20250729/index-75377399875811338005.html" target="_blank" rel="noopener noreferrer" class="jump-unanswered-btn" style="text-decoration: none; display: inline-block; padding: 12px 24px; font-size: 17px;">
         <i class="fas fa-external-link-alt"></i>前往 PChome 新聞查看原文
       </a>
     </div>
   </div>

   <!-- 圖片放大彈出視窗 (Modal) 若無用到可保留結構防錯 -->
   <Teleport to="body">
     <div v-if="activeModal" class="img-lightbox-backdrop" @click="closeModal">
       <div class="img-lightbox-Modal" @click.stop>
         <div class="lightbox-header">
           <h3>原圖檢視</h3>
           <button class="lightbox-close-btn" @click="closeModal">✕ 關閉</button>
         </div>
         <img :src="activeModal.img" class="lightbox-full-img" alt="放大的新聞截圖">
         <p class="lightbox-caption" v-html="activeModal.text"></p>
       </div>
     </div>
   </Teleport>

 </main>
</template>

<script setup>
import { ref } from 'vue'

const activeModal = ref(null)

const openModal = (imgSrc, textHtml) =>{
  activeModal.value = { 
    img: imgSrc,
    text: textHtml 
  }
}

const closeModal = () =>{
  activeModal.value = null
}
</script>