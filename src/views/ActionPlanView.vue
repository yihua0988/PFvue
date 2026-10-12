<template>
  <!-- 主要內容區 -->
  <main class="content">
    
    <h1 class="main-title">防制與行動方案：我們該怎麼做？</h1>

    <div class="subpages">
	  <a 
		href="/PFvue/summary" 
		:class="{ 'router-link-exact-active': $route.path === '/summary' }"
	  >
		<i class="fas fa-project-diagram"></i>&nbsp;詐騙趨勢總結
	  </a>
	  
	  <a 
		href="/PFvue/victim-profile" 
		:class="{ 'router-link-exact-active': $route.path === '/victim-profile' }"
	  >
		<i class="fas fa-user-shield"></i>&nbsp;受害人特徵分析
	  </a>
	  
	  <a 
		href="/PFvue/fraud-vulnerabilities" 
		:class="{ 'router-link-exact-active': $route.path === '/fraud-vulnerabilities' }"
	  >
		<i class="fas fa-bug"></i>&nbsp;防詐破口與責任
	  </a>
	  
	  <a 
		href="/PFvue/action-plan" 
		:class="{ 'router-link-exact-active': $route.path === '/action-plan' }"
	  >
		<i class="fas fa-fist-raised"></i>&nbsp;防制與行動方案
	  </a>
	</div>

    <!-- 前言卡片 -->
    <div class="page-title">
      <h2><i class="fas fa-compass"></i> 從省思到行動的防護網</h2>
      <p>
        面對 2026 年高度組織化、AI 武器化的詐騙產業，我們不能只停留在「知道」，更必須落實到「做到」。防範詐騙不只是警政單位的責任，更是每一位公民必須具備的現代生存技能。以下整理出五大核心防詐行動指南，幫助您在面對突如其來的威脅時，能夠冷靜應對，守護自身與家人的財產安全。
      </p>
    </div>

    <!-- 行動一 -->
    <div class="page-title" style="margin-top: 30px; border-top: 5px solid #10b981;">
      <h2><i class="fas fa-phone-slash"></i> 行動一：落實零信任，應對不明來電與視訊</h2>
      <p>
        過去我們常說「耳聽為憑，眼見為實」，但在 AI 語音複製與 Deepfake 變臉技術氾濫的今日，這些傳統感官已不再可靠。詐騙集團能輕易攔截來電顯示，偽裝成您的親友、主管或公務機關，利用緊急事件（如車禍、欠款、涉案）製造心理壓迫。
      </p>
      <div class="highlight-text">
        面對任何索要金錢、個人資料的來電，請務必堅守「零信任原則」。切勿在通話當下做出決定，立刻掛斷電話，並透過事先約定的防偽暗號，或親自撥打對方原本的號碼進行「二次獨立查證」。
      </div>
      <div class="action-image-container">
        <img src="/4-4-1.jpg" alt="接到不明電話" />
      </div>
    </div>

    <!-- 行動二 -->
    <div class="page-title" style="margin-top: 30px; border-top: 5px solid #10b981;">
      <h2><i class="fas fa-search-dollar"></i> 行動二：阻斷洗錢金流，金錢操作前務必查證</h2>
      <p>
        所有詐騙的最終目的都是金錢移轉。現代詐騙常利用虛擬帳戶、加密貨幣平台或第三方支付進行秒速洗錢，一旦資金匯出，追回的機率微乎其微。不論是網購匯款、繳交投資保證金，或是替網路交友對象代墊款項，在按下「確認轉帳」前，請給自己三分鐘的黃金冷靜期。
      </p>
      <div class="highlight-text">
        養成匯款前的查證習慣。遇到任何金錢交易要求，請先善用警政署「165 全民防騙網」或撥打 165 反詐騙專線，查詢該帳戶、網址或 LINE ID 是否已被通報為警示帳戶，切斷詐騙的最後一哩路。
      </div>
      <div class="action-image-container">
        <img src="/4-4-2.webp" alt="查證帳戶" />
        <p class="image-source">
          <a href="https://www.newloan.com.tw/wp-content/uploads/2024/01/MiConv.com__01_%E8%AD%A6%E7%A4%BA%E5%B8%B3%E6%88%B6-800x800.webp" target="_blank">來源：https://www.newloan.com.tw/</a>
        </p>
      </div>
    </div>

    <!-- 行動三 -->
    <div class="page-title" style="margin-top: 30px; border-top: 5px solid #10b981;">
      <h2><i class="fas fa-hands-helping"></i> 行動三：建立家庭防火牆，關心家中長輩</h2>
      <p>
        高齡長者往往是傳統電信詐騙與「假檢警恐嚇」的最脆弱防線。長輩們因不熟悉數位科技，且白天常獨自在家，極易陷入詐騙集團精心佈置的資訊封閉陷阱中。防詐不應只是個人的事，而是整個家庭共同的防護網。
      </p>
      <div class="highlight-text">
        請主動與家中長輩分享最新的詐騙案例（如假冒戶政事務所、健保局），並協助他們在手機與家用電話安裝防詐過濾軟體。叮囑長輩：遇到任何威脅或金錢要求，第一時間先找家人討論，絕對不要聽從歹徒指示孤軍奮戰。
      </div>
      <div class="action-image-container">
        <img src="/4-4-3.jpg" alt="關心長輩" />
        <p class="image-source">
          <a href="https://www.luzhu-hro.tycg.gov.tw/News_Content.aspx?n=13120&s=1334338" target="_blank">來源：https://www.luzhu-hro.tycg.gov.tw/</a>
        </p>
      </div>
    </div>

    <!-- 行動四 -->
    <div class="page-title" style="margin-top: 30px; border-top: 5px solid #10b981;">
      <h2><i class="fas fa-bullhorn"></i> 行動四：鞏固全民防線，勇敢分享防詐案例</h2>
      <p>
        詐騙集團最大的武器就是「資訊不對稱」。許多被害人在受騙後，常因感到羞恥或自責而選擇隱忍，這反而讓詐騙集團得以繼續使用同一套劇本禍害下一個人。打破這個優勢的最好方法，就是建立全民識詐的社會氛圍。
      </p>
      <div class="highlight-text">
        勇敢將真實遭遇或看到的詐騙案例，分享到社群平台（Facebook、Instagram、Threads）或家庭 LINE 群組。您的一次轉傳與提醒，可能就能拯救無數個家庭免於破產與心碎的悲劇。
      </div>
      <div class="action-image-container">
        <img src="/4-4-4.png" alt="分享案例" />
        <p class="image-source">
          <a href="https://www.instagram.com/p/DHkiqpOu-KW/?img_index=8" target="_blank">來源：https://www.instagram.com/</a>
        </p>
      </div>
    </div>

    <!-- 行動五 -->
    <div class="page-title" style="margin-top: 30px; border-top: 5px solid #10b981;">
      <h2><i class="fas fa-university"></i> 行動五：破解公權力迷思，官方絕不要求操作 ATM</h2>
      <p>
        無論是「假網購客服」謊稱訂單誤設為分期付款，還是「假檢警」聲稱需要監管您的資金，他們最終都會引導您走向 ATM 或開啟手機網路銀行。請記住一個鐵律：公務機關的罰款、稅金，或是銀行的退款機制，都有嚴格的書面與實體流程。
      </p>
      <div class="highlight-text">
        警察、檢察官、法官、國稅局，甚至是銀行客服與電商平台，<strong>「絕對不會」</strong>透過電話指示您前往 ATM 操作，也<strong>「絕對不會」</strong>要求您開啟網銀進行「解除分期」或「實名認證」。ATM 只有把錢轉出去的功能，沒有任何解除設定的機制！
      </div>
      <div class="action-image-container">
        <img src="/4-4-5.jpg" alt="公家機關不會要求操作ATM" />
      </div>
    </div>

    <!-- 結語 -->
    <div class="page-title" style="margin-top: 40px; text-align: center; background: linear-gradient(135deg, #dcfce7 0%, #f0fdf4 100%); border-top: 5px solid #059669;">
      <h2 style="color: #059669; font-weight: 900; font-size: 2.2rem; margin-bottom: 20px;">
        <i class="fas fa-shield-alt"></i> 結語：建立大腦的抗詐防火牆
      </h2>
      <p style="font-size: 1.25rem; line-height: 1.8; color: #166534; font-weight: bold; margin-bottom: 0;">
        詐騙集團不會停止進化，我們的防備也不能停止更新。<br>
        提高警覺、查證為先、冷靜面對，是守住財產與尊嚴的第一步。<br>
        讓我們共同攜手，打造一個對詐騙「零容忍、零信任」的堅實社會！
      </p>
    </div>

  </main>
</template>

<script setup>
// 這頁是純靜態內容展示，Script 區塊留空即可
</script>

<style scoped>
/* 針對這頁專屬的特別樣式：強調文字與圖片容器 */
.highlight-text {
  background-color: #f8fafc;
  border-left: 4px solid #10b981;
  padding: 15px 20px;
  margin: 20px 0;
  font-weight: bold;
  color: #0f172a;
  border-radius: 0 8px 8px 0;
  text-align: justify;
}

.action-image-container {
  text-align: center;
  margin-top: 25px;
}

.action-image-container img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
}

.image-source {
  font-size: 0.85rem;
  color: #64748b;
  margin-top: 10px;
}

.image-source a {
  color: #0ea5e9;
  text-decoration: none;
}

.image-source a:hover {
  text-decoration: underline;
}


</style>