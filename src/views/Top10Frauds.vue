<template>
 <!-- 主要內容區 -->
 <main class="content dashboard-page">
    
   <div class="page-header" style="margin-bottom: 24px;">
     <h1 class="main-title">2026十大常見詐騙類型解析</h1>
     <p class="dashboard-subtitle">直擊詐騙集團的心理學陷阱，破解「養、套、殺」的萬用劇本</p>
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

   <!-- ================== 破題總結區塊 ================== -->
   <div class="panel anti-fraud-container highlight-panel" style="text-align: left; margin-top: 24px;">
     <div class="panel-header" style="border-bottom:NOne; margin-bottom: 8px;">
       <h2 style="color: #b45309;"><i class="fas fa-lightbulb"></i> 核心防護：破解詐騙劇本</h2>
       <p class="box-subtitle" style="color: #92400e !important;">手法每天換皮，但劇本從來不陌生</p>
     </div>

     <div class="fraud-item" style="border-bottom:NOne; padding-bottom: 0;">
       <p class="description">
          詐騙發生，往往不是因為受害者笨，而是詐騙集團太懂得精準按下人性的按鈕：<strong class="highlight-red">怕損失、怕錯過、怕惹事、怕親友出事，也怕失去愛</strong>。它讓你想賺、想省、想幫忙，也讓你害怕、著急、不敢查證。當一通電話或一個連結，剛好打中焦慮與期待，人就可能在短短幾分鐘內交出判斷權。<br><br>
          只要對方開始要求<strong class="highlight-red">轉帳、交出提款卡、給OTP驗證碼、加LINE私聊、點擊陌生連結</strong>，那一刻請務必先停下來。<br><br>
         <strong style="color: #dc2626; font-size: 24px;">💡「真正重要的事，不會怕你多查證一次；會怕你查證的，通常就是詐騙。」</strong>
       </p>
     </div>
   </div>

   <!-- ================== Top 1-5 詐騙重災區 ================== -->
   <div class="panel anti-fraud-container" style="text-align: left; margin-top: 32px;">
     <div class="panel-header">
       <h2><i class="fas fa-fire-alt" style="color: #ef4444;"></i> Top 1-5 詐騙重災區</h2>
       <p class="box-subtitle">根據警政署 165 打詐儀表板統計，前五名佔據了絕大多數的鉅額財損</p>
     </div>

     <div class="fraud-item">
       <h3 class="fraud-title"><i class="fas fa-chart-line"></i>NO.1高報酬假投資：致命的致富幻覺</h3>
       <p class="description">
         <span class="fraud-stats">⚠️165統計(1-4月)：受理5,500件，財損高達94億1219萬元</span><br>
         <strong>心理破口：</strong>想快速賺錢、怕錯過行情、盲目相信「理財專家」帶路。<br>
         <strong>手法拆解：</strong>詐團透過社群廣告或LINE投資群組，以「穩賺不賠」、「內線消息」等話術，先讓被害人小額試水溫獲利。當投入畢生積蓄後，便以「洗碼量不足、需繳保證金、IP 異常」等理由拒絕出金。<br>
         <strong class="highlight-red">💡破解心法：真正的投資不會承諾保證獲利，更不會要你「先繳稅金」才能拿回自己的錢。</strong>
       </p>
     </div>

     <div class="fraud-item">
       <h3 class="fraud-title"><i class="fas fa-heart-broken"></i>NO.2假交友養套殺：被利用的孤單</h3>
       <p class="description">
         <span class="fraud-stats">⚠️假交友投資財損達46.7億元；假徵婚財損6.7億元</span><br>
         <strong>心理破口：</strong>孤單缺伴、對愛情有憧憬、羞於向親友求證。<br>
         <strong>手法拆解：</strong>盜用俊男美女照片，假冒軍醫、外商高管。先每天噓寒問暖「養」熟關係，再以包裹卡海關、生病急需周轉、共創未來結婚基金為由「套」取金錢，最後全面神隱「殺」青。<br>
         <strong class="highlight-red">💡破解心法：真正的愛不會急著要你的錢；越甜的承諾，越要留一點清醒給自己。</strong>
       </p>
     </div>

     <div class="fraud-item">
       <h3 class="fraud-title"><i class="fas fa-shopping-cart"></i>NO.3網購交易陷阱：貪小便宜的代價</h3>
       <p class="description">
         <span class="fraud-stats">⚠️165統計(1-4月)：受理17,391件，財損16億4513萬元</span><br>
         <strong>心理破口：</strong>貪便宜、怕錯過限量優惠、急著成交。<br>
         <strong>手法拆解：</strong>除了一頁式廣告外，近期暴增<strong>「假買家騙真賣家」</strong>手法。假買家佯稱賣場無簽署協議不能結帳，誘導賣家加入假客服LINE並操作網銀。此外，「幽靈包裹」也利用民眾隨手付款取貨的習慣進行小額詐騙。<br>
         <strong class="highlight-red">💡破解心法：交易越催、價格越甜，越要慢一步確認，別讓「好划算」變成詐騙集團替你結的帳。</strong>
       </p>
     </div>

     <div class="fraud-item">
       <h3 class="fraud-title"><i class="fas fa-gavel"></i>NO.4假公權力恐嚇：操縱恐懼的假檢警</h3>
       <p class="description">
         <span class="fraud-stats">⚠️165統計(1-4月)：受理1,028件，財損16億2662萬元</span><br>
         <strong>心理破口：</strong>害怕司法、服從權威、怕被牽連、想趕快證明清白。<br>
         <strong>手法拆解：</strong>利用「涉嫌洗錢」、「健保卡遭盜用」等恐嚇話術，要求被害人加LINE定時回報，或將財產交給法院「監管」。詐團會用「偵查不公開」徹底切斷被害人向外求證的機會。<br>
         <strong class="highlight-red">💡破解心法：真正的清白不需要靠轉帳或面交現金來證明；恐懼越大，越要先掛斷電話。</strong>
       </p>
     </div>

     <div class="fraud-item">
       <h3 class="fraud-title"><i class="fas fa-dice"></i>NO.5博弈與虛擬遊戲：必勝程式的謊言</h3>
       <p class="description">
         <strong>心理破口：</strong>一夜致富、僥倖心理、相信系統有漏洞可鑽。<br>
         <strong>手法拆解：</strong>詐團聲稱掌握彩券內部號碼或博弈網站漏洞，透過暗樁在群組曬獲利截圖，誘騙被害人繳納入會費與高額押金，等開獎落空或贏錢無法提領時，隨即封鎖失聯。<br>
         <strong class="highlight-red">💡破解心法：真正能翻身的不是內線明牌，而是你願意在心癢那一刻停下來查證。</strong>
       </p>
     </div>
   </div>

   <!-- ================== Top 6-10 新型與變種詐騙 ================== -->
   <div class="panel anti-fraud-container" style="text-align: left; margin-top: 32px;">
     <div class="panel-header">
       <h2><i class="fas fa-exclamation-triangle" style="color: #f59e0b;"></i> Top6-10新型與變種詐騙</h2>
       <p class="box-subtitle">結合時事、最新科技與人性弱點，防不勝防的客製化地雷</p>
     </div>

     <div class="fraud-item">
       <h3 class="fraud-title"><i class="fas fa-headset"></i>NO.6假客服解除設定</h3>
       <p class="description">
          「您好，因為系統出錯，您的訂單被誤設為批發商（或分期付款）。」假冒商家或銀行來電，引導民眾操作ATM或網路銀行「解除設定」，實則把帳戶內的錢全數轉走。<br>
         <strong class="highlight-red">💡破解心法：ATM與網銀「絕對沒有」解除分期付款或退款的功能！</strong>
       </p>
     </div>

     <div class="fraud-item">
       <h3 class="fraud-title"><i class="fas fa-envelope-open-text"></i>NO.7釣魚簡訊與假機構通知</h3>
       <p class="description">
         <span class="fraud-stats">⚠️釣魚連結詐騙(2-3月)：受理1,252件，財損近8,000萬元</span><br>
          發送假冒 ETC 欠費、銀行帳戶異常、自來水催繳、或交通罰單等釣魚簡訊。利用連假或報稅季製造急迫感，騙取信用卡卡號與OTP驗證碼進行盜刷。
       </p>
     </div>

     <div class="fraud-item">
       <h3 class="fraud-title"><i class="fas fa-user-friends"></i>NO.8帳號盜用與猜猜我是誰</h3>
       <p class="description">
          盜用親友的LINE帳號，群發「急需周轉」或「幫忙收簡訊驗證碼」的訊息。駭客近期甚至利用電信業者「語音信箱預設密碼」的漏洞，強制攔截驗證碼接管帳號。<br>
         <strong class="highlight-red">💡破解心法：熟人開口借錢，先用原本的手機號碼撥打確認，真正的交情經得起查證。</strong>
       </p>
     </div>

     <div class="fraud-item">
       <h3 class="fraud-title"><i class="fas fa-hand-holding-heart"></i>NO.9假借公益與災難詐財</h3>
       <p class="description">
          緊貼社會災難（如大地震、水災）或重大悲劇事件，在社群平台發起假募款。詐騙集團利用大眾最柔軟的善意與同情心，對弱勢處境進行無情的「二度傷害」。
       </p>
     </div>

     <div class="fraud-item">
       <h3 class="fraud-title"><i class="fas fa-user-astronaut"></i>NO.10AI深偽科技 (Deepfake) 詐騙</h3>
       <p class="description">
          利用AI換臉與聲音合成技術，偽造名人投資影片、假新聞截圖，或直接假冒親友視訊借錢。近期甚至破獲詐團利用「星鏈 (Starlink)」搭配AI偽造臉部，成功突破銀行的身分驗證防線。<br>
         <strong class="highlight-red">💡破解心法：眼見不一定為憑！別讓「看起來很真」成為詐騙集團最鋒利的武器。</strong>
       </p>
     </div>
   </div>

   <!-- ================== 完整新聞報導預覽 ================== -->
   <div class="panel" style="margin-top: 32px; margin-bottom: 40px;">
     <div class="panel-header" style="text-align: left;">
       <h2><i class="fas fa-newspaper"></i> 完整新聞報導參閱</h2>
       <p class="box-subtitle">深入了解十大詐騙類型的真實報導與警政署統計</p>
     </div>
      
     <div class="iframe-container" style="border: 2px solid #e2e8f0; border-radius: 14px; overflow: hidden; background: #fff;">
       <iframe 
          :src="iframeSrc" 
          title="十大詐騙類型揭曉 本地檔案"
          sandbox="allow-same-origin allow-scripts"
          frameborder="0"
          style="width: 100%; height: 80vh; min-height: 800px; display: block;">
       </iframe>
     </div>

     <!-- 🌟 超連結改為靠左對齊 -->
     <div style="text-align: left; margin-top: 18px;">
       <a href="https://udn.com/news/story/124490/9499222" target="_blank" rel="noopenerNOreferrer" class="jump-unanswered-btn" style="text-decoration:NOne; display: inline-block; padding: 12px 24px; font-size: 17px;">
         <i class="fas fa-external-link-alt"></i>前往聯合新聞網查看原文
       </a>
     </div>
   </div>

 </main>
</template>

<script setup>
import { computed } from 'vue'

// 🌟 自動結合 Vite 的 BASE_URL 與正確的資料夾路徑，確保本地與GitHub Pages都不會404
const iframeSrc = computed(() => {
  return `${import.meta.env.BASE_URL}udn-top10-frauds/udn-top10-frauds.html`
})
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

/* 🌟 特殊高亮分析區塊 (破題總結使用) */
.highlight-panel {
  background: #fffbeb !important; 
  border: 2px solid #fcd34d !important;
}

/* 🌟 數據標籤樣式 */
.fraud-stats {
  font-weight: 900;
  color: #b91c1c;
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  padding: 6px 12px;
  border-radius: 8px;
  display: inline-block;
  margin-bottom: 12px;
  font-size: 20px; /* 配合 1.1倍 比例微調 */
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
  margin-bottom: 28px;
  padding-bottom: 20px;
  border-bottom: 1px dashed #cbd5e1;
}

.anti-fraud-container .fraud-item:last-child {
  border-bottom:NOne;
  margin-bottom: 0;
  padding-bottom: 0;
}

.anti-fraud-container .fraud-title {
  color: #0284c7; 
  font-weight: 900; 
  font-size: 26px !important;     
  margin-bottom: 14px;
  margin-top: 0;
}

.anti-fraud-container .description {
  font-size: 22px !important; 
  line-height: 1.8 !important;
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
  .panel-header h2 { font-size: 26px !important; }
  .panel-header .box-subtitle { font-size: 18px !important; }
  .anti-fraud-container .fraud-title { font-size: 22px !important; }
  .anti-fraud-container .description { font-size: 18px !important; }
  .fraud-stats { font-size: 16px; }
}
</style>