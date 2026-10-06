<template>
  <!-- 主要內容區 -->
  <main class="content">
    
    <h1 class="main-title">2026 十大常見詐騙類型解析</h1>

    <!-- 子頁面選單 -->
    <div class="subpages" style="grid-template-columns: repeat(4, 1fr);">
      <router-link to="/prevention"><i class="fas fa-robot"></i>&nbsp;AI深偽亂入罷免案例</router-link>
      <router-link to="/fraud-growth-stats"><i class="fas fa-chart-bar"></i>&nbsp;AI科技與黑幫犯罪分析</router-link>
      <router-link to="/ai-fraud-news"><i class="fas fa-newspaper"></i>&nbsp;AI假檢警詐騙</router-link>
      <router-link to="/top-10-frauds"><i class="fas fa-list-ol"></i>&nbsp;十大常見詐騙解析</router-link>
      
      <!-- 預留的 4 個空位 -->
      <a href="#" class="disabled" @click.prevent><i class="fas fa-plus"></i>&nbsp;敬請期待</a>
      <a href="#" class="disabled" @click.prevent><i class="fas fa-plus"></i>&nbsp;敬請期待</a>
      <a href="#" class="disabled" @click.prevent><i class="fas fa-plus"></i>&nbsp;敬請期待</a>
      <a href="#" class="disabled" @click.prevent><i class="fas fa-plus"></i>&nbsp;敬請期待</a>
    </div>

    <!-- 總結先行卡片 (破題區塊) -->
    <div class="page-title hero-card">
      <h2 class="hero-title">
        總結：破解詐騙劇本
      </h2>
      <p class="hero-text">
        詐騙手法每天換皮，但劇本從來不陌生。<br>
        它讓你想賺、想省、想愛、想幫忙，也讓你害怕、著急、不敢查證。<br>
        只要對方開始要求 <strong class="highlight-danger">轉帳、交卡、給驗證碼、加LINE私聊、點陌生連結</strong>，那一刻就先停下來。
      </p>
      <div class="hero-quote">
        「真正重要的事，不會怕你多查證一次；會怕你查證的，通常就是詐騙。」
      </div>
    </div>

    <!-- 引言卡片 -->
    <div class="page-title" style="margin-top: 25px;">
      <h2><i class="fas fa-search-dollar"></i> 詐騙集團的「心理學」</h2>
      <p>
        詐騙發生，往往不是因為受害者笨，而是詐騙集團太懂得精準按下人性的按鈕：<strong>怕損失、怕錯過、怕惹事、怕親友出事，也怕失去愛</strong>。當一通電話、一則簡訊或一個看似官方的連結，剛好打中焦慮與期待，人就可能在短短幾分鐘內交出判斷權。
      </p>
      <p>
        根據內政部警政署「165打詐儀表板」統計，2026年1月至4月受理報案數達 50,217 件，<strong>財損金額高達 215億3378萬元</strong>。以下為網路討論度最高的十大詐騙手法與心理破口解析：
      </p>
    </div>

    <!-- 排名解析卡片：Top 1-5 -->
    <div class="page-title" style="margin-top: 25px;">
      <h2><i class="fas fa-fire-alt" style="color: #ef4444;"></i> Top 1-5 詐騙重災區</h2>
      
      <div class="fraud-item">
        <div class="fraud-title"><i class="fas fa-chart-line"></i> NO.1 高報酬幻覺型詐騙 (假投資)</div>
        <p class="fraud-stats">⚠️ 165打詐儀表板(1-4月)：受理 5,500 件，財損高達 94億1219萬元</p>
        <p><strong>心理破口：</strong>想快速賺錢、怕錯過投資行情、相信專家帶路。<br>
        <strong>常見入口：</strong>投資廣告、LINE投資群、假投資APP。<br>
        詐團常利用「穩賺不賠」、「內線消息」等話術，先讓被害人小額試水溫獲利，等投入大筆資金後，再以洗碼量不足、保證金、IP異常等理由拒絕出金。</p>
        <div class="fraud-highlight">💡 真正的投資不會承諾穩賺不賠，也不會要你先繳錢才能拿回自己的錢。</div>
      </div>

      <div class="fraud-item">
        <div class="fraud-title"><i class="fas fa-heart-broken"></i> NO.2 交友情感養套殺型詐騙</div>
        <p class="fraud-stats">⚠ 假交友投資財損達 46.7億元；假交友徵婚財損 6.7億元；色情應召財損 4.9億元</p>
        <p><strong>心理破口：</strong>孤單、被陪伴需求、愛情期待、羞於求證。<br>
        盜用俊男美女照片，假冒軍醫、外商高管。先每天噓寒問暖「養」熟關係，再以包裹卡海關、生病急需周轉、共創未來結婚基金為由「套」取金錢，最後全面神隱「殺」青。</p>
        <div class="fraud-highlight">💡 真正的愛不會急著要你的錢；越甜的承諾，越要留一點清醒給自己。</div>
      </div>

      <div class="fraud-item">
        <div class="fraud-title"><i class="fas fa-shopping-cart"></i> NO.3 網購交易陷阱型詐騙</div>
        <p class="fraud-stats">⚠️ 165打詐儀表板(1-4月)：受理 17,391 件，財損 16億4513萬元</p>
        <p><strong>心理破口：</strong>貪便宜、怕錯過優惠、急著成交。<br>
        除了一頁式廣告外，現在更流行<strong>「假買家騙真賣家」</strong>。假買家佯稱賣場有問題，誘導賣家加入假客服 LINE 並操作網銀。此外，「幽靈包裹」也是利用民眾隨手付款取貨的習慣進行詐騙。</p>
        <div class="fraud-highlight">💡 交易越催、價格越甜，越要慢一步確認，別讓「好划算」變成詐團替你結的帳。</div>
      </div>

      <div class="fraud-item">
        <div class="fraud-title"><i class="fas fa-gavel"></i> NO.4 假公權力恐嚇型詐騙 (假檢警)</div>
        <p class="fraud-stats">⚠️ 165打詐儀表板(1-4月)：受理 1,028 件，財損 16億2662萬元</p>
        <p><strong>心理破口：</strong>害怕司法、服從權威、怕被牽連、想趕快證明清白。<br>
        利用「涉嫌洗錢」、「帳戶遭盜用」等恐嚇話術，要求被害人加 LINE 定時回報，或將財產交給法院「監管」。詐團會用「偵查不公開」切斷被害人向外求證的機會。</p>
        <div class="fraud-highlight">💡 真正的清白不需要靠轉帳證明：恐懼越大，越要先掛電話。</div>
      </div>

      <div class="fraud-item">
        <div class="fraud-title"><i class="fas fa-dice"></i> NO.5 博弈彩券與虛擬遊戲型詐騙</div>
        <p><strong>心理破口：</strong>一夜致富、僥倖心理、相信系統漏洞。<br>
        詐團聲稱掌握彩券內部號碼或博弈網站漏洞，透過暗樁在群組曬獲利截圖，誘騙被害人繳納入會費與高額押金，等開獎落空後隨即失聯。</p>
        <div class="fraud-highlight">💡 真正能翻身的不是明牌，而是你願意在心癢那一刻停下來查證。</div>
      </div>
    </div>

    <!-- 排名解析卡片：Top 6-10 -->
    <div class="page-title" style="margin-top: 25px;">
      <h2><i class="fas fa-exclamation-triangle" style="color: #f59e0b;"></i> Top 6-10 新型與變種詐騙</h2>
      
      <div class="fraud-item">
        <div class="fraud-title"><i class="fas fa-headset"></i> NO.6 假客服解除詐騙</div>
        <p><strong>心理破口：</strong>怕被重複扣款、急著解除異常。<br>
        「您好，因為系統出錯，您的訂單被誤設為分期付款。」假冒商家或銀行來電，引導民眾操作 ATM 或網路銀行「解除設定」，實則把錢轉走。</p>
        <div class="fraud-highlight">💡 ATM 與網銀沒有解除分期或退款功能！</div>
      </div>

      <div class="fraud-item">
        <div class="fraud-title"><i class="fas fa-envelope-open-text"></i> NO.7 假機構服務通知型詐騙</div>
        <p class="fraud-stats">⚠️ 釣魚連結詐騙(2-3月)：受理 1,252 件，財損近 8,000 萬元</p>
        <p><strong>心理破口：</strong>信任大型機構、怕欠費受罰。<br>
        發送假冒 ETC 欠費、銀行帳戶異常、自來水催繳等釣魚簡訊。利用連假或報稅季，騙取信用卡卡號與 OTP 驗證碼進行盜刷。</p>
      </div>

      <div class="fraud-item">
        <div class="fraud-title"><i class="fas fa-user-friends"></i> NO.8 熟人冒充信任型詐騙</div>
        <p><strong>心理破口：</strong>親情、友情、不好意思拒絕熟人請求。<br>
        盜用親友的 LINE 帳號，群發「借錢周轉」或「幫忙收驗證碼」的訊息。駭客甚至利用電信業者「語音信箱預設密碼」漏洞強制接管帳號。</p>
        <div class="fraud-highlight">💡 熟人開口借錢，先用原本電話確認，真正的交情經得起查證。</div>
      </div>

      <div class="fraud-item">
        <div class="fraud-title"><i class="fas fa-hand-holding-heart"></i> NO.9 公益事件包裝型詐騙</div>
        <p><strong>心理破口：</strong>同情心、善意、對災害事件的情緒反應。<br>
        緊貼社會災難（如花蓮水災）或重大悲劇事件，在社群平台發起假募款。利用大眾最柔軟的善意，對弱勢處境進行「二度傷害」。</p>
      </div>

      <div class="fraud-item">
        <div class="fraud-title"><i class="fas fa-user-astronaut"></i> NO.10 AI 深偽科技偽裝型詐騙</div>
        <p><strong>心理破口：</strong>眼見為憑、信任名人背書。<br>
        利用 AI 換臉與聲音合成技術，偽造名人投資影片、假新聞截圖，或假冒親友視訊借錢。近期甚至破獲詐團利用「星鏈 (Starlink)」搭配 AI 偽造臉部驗證。</p>
        <div class="fraud-highlight">💡 眼見不一定為憑！別讓「看起來很真」成為詐團最鋒利的武器。</div>
      </div>
    </div>

    <!-- 嵌入完整新聞區域 -->
    <div class="iframe-section">
      <h2 style="color: #0f172a; margin-top: 40px; margin-bottom: 20px;">
        <i class="fas fa-newspaper"></i> 完整新聞報導預覽
      </h2>
      
      <div class="iframe-wrapper">
        <!-- 🌟 修正重點：使用動態計算的 iframeSrc，支援資料夾結構與 GitHub Pages 子路徑 -->
        <iframe 
          :src="iframeSrc" 
          title="十大詐騙類型揭曉 本地檔案"
          sandbox="allow-same-origin allow-scripts"
          frameborder="0">
        >
        </iframe>
      </div>

      <p class="source-link-container">
        <a href="https://udn.com/news/story/124490/9499222" target="_blank" rel="noopener noreferrer" class="source-link">
          <i class="fas fa-external-link-alt"></i> 來源：聯合新聞網 (點擊查看原文)
        </a>
      </p>
    </div>

  </main>
</template>

<script setup>
import { computed } from 'vue'

// 🌟 自動結合 Vite 的 BASE_URL 與正確的資料夾路徑，確保本地與 GitHub Pages 都不會 404
const iframeSrc = computed(() => {
  return `${import.meta.env.BASE_URL}udn-top10-frauds/udn-top10-frauds.html`
})
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

/* 總結破題卡片專屬設計 */
.hero-card {
  text-align: center;
  border-top: 5px solid #e11d48;
  background: linear-gradient(180deg, #ffffff 0%, #fff1f2 100%);
  padding-top: 40px;
  padding-bottom: 40px;
  margin-top: 20px;
}
.hero-title {
  color: #be123c;
  font-weight: 900;
  font-size: 2.2rem;
  margin-bottom: 25px;
}
.hero-text {
  font-size: 1.15rem;
  line-height: 2;
  color: #334155;
  margin-bottom: 25px;
}
.highlight-danger {
  color: #e11d48;
  background-color: #ffe4e6;
  padding: 4px 10px;
  border-radius: 6px;
  font-weight: 900;
  box-shadow: inset 0 -2px 0 rgba(225, 29, 72, 0.2);
}
.hero-quote {
  background-color: #e11d48;
  color: #ffffff;
  padding: 18px 30px;
  border-radius: 8px;
  font-weight: 900;
  font-size: 1.3rem;
  display: inline-block;
  box-shadow: 0 6px 20px rgba(225, 29, 72, 0.3);
  letter-spacing: 1px;
}

/* 十大詐騙項目排版 */
.fraud-item {
  background-color: #f8fafc;
  border-left: 4px solid #3b82f6;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 0 8px 8px 0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.fraud-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
.fraud-title {
  font-size: 1.25rem;
  font-weight: 900;
  color: #1e293b;
  margin-bottom: 10px;
}
.fraud-stats {
  font-weight: bold;
  color: #b91c1c;
  background-color: #fef2f2;
  padding: 8px 12px;
  border-radius: 6px;
  display: inline-block;
  margin-bottom: 10px;
  font-size: 0.95rem;
}
.fraud-highlight {
  background-color: #ecfdf5;
  color: #065f46;
  padding: 10px 15px;
  margin-top: 15px;
  border-radius: 6px;
  font-weight: bold;
  border: 1px solid #a7f3d0;
}

/* iframe 區塊排版 (同新聞頁) */
.iframe-section {
  text-align: center;
}
.iframe-wrapper {
  margin: 0 auto;
  max-width: 900px;
  height: 600px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  border: 1px solid #cbd5e1;
  background: #fff;
}
.iframe-wrapper iframe {
  width: 100%;
  height: 100%;
}

/* 來源連結按鈕美化 */
.source-link-container {
  margin-top: 20px;
  margin-bottom: 40px;
}
.source-link {
  display: inline-block;
  color: #0284c7;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.1rem;
  padding: 10px 20px;
  border-radius: 8px;
  background-color: #f0f9ff;
  border: 1px solid #bae6fd;
  transition: all 0.3s ease;
}
.source-link:hover {
  background-color: #e0f2fe;
  color: #0369a1;
  border-color: #7dd3fc;
  box-shadow: 0 4px 10px rgba(2, 132, 199, 0.1);
}

/* RWD 微調 */
@media (max-width: 768px) {
  .subpages {
    grid-template-columns: 1fr 1fr !important;
  }
  .iframe-wrapper {
    height: 400px;
  }
}
@media (max-width: 480px) {
  .subpages {
    grid-template-columns: 1fr !important;
  }
}
</style>