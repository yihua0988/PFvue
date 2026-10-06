<template>
  <main class="content">
    
    <h1 class="main-title">2026 受害人特徵與心理弱點剖析</h1>

    <!-- 
      修正重點 1：將原本的 <a> 標籤改為 Vue Router 專用的 <router-link> 
      修正重點 2：將 href="xxx.html" 替換為對應的 to="/xxx" 路徑
    -->
    <div class="subpages" style="grid-template-columns: repeat(4, 1fr);">
      <router-link to="/summary"><i class="fas fa-project-diagram"></i>&nbsp;詐騙趨勢總結</router-link>
      <router-link to="/victim-profile"><i class="fas fa-user-shield"></i>&nbsp;受害人特徵分析</router-link>
      <router-link to="/fraud-vulnerabilities"><i class="fas fa-bug"></i>&nbsp;防詐破口與責任</router-link>
      <router-link to="/action-plan"><i class="fas fa-fist-raised"></i>&nbsp;防制與行動方案</router-link>
    </div>

    <!-- 前言卡片 -->
    <div class="page-title">
      <h2><i class="fas fa-brain"></i> 詐騙不再是「好騙」，而是「心理剝削」</h2>
      <p>
        過去社會常對詐騙受害者貼上「貪心」或「愚笨」的標籤，然而從 2026 年警政署 165 打詐儀表板的高達數萬件報案數據來看，受害者早已跨越了學歷、年齡與社經地位的界線。當前的高科技詐騙集團已進化為<strong>「心理學精算師」</strong>，他們不依賴受害者的無知，而是精準利用人性的脆弱面——包含對未來的焦慮、對情感的渴望，以及對公權力的敬畏。
      </p>
      <p>
        透過大數據篩選與 AI 技術輔助，詐騙集團能為不同特徵的受害者「客製化」專屬的詐騙劇本。以下我們將受害者輪廓分為四大核心群體，深度探討他們為何在關鍵時刻失去判斷力，並淪為詐騙集團的囊中物。
      </p>
    </div>

    <!-- 特徵一：高齡與數位弱勢 -->
    <div class="page-title" style="margin-top: 30px;">
      <h2><i class="fas fa-user-clock"></i> 一、 數位落差與信任慣性：年長者與數位新手</h2>
      <p>
        高齡長者依然是實體與電信詐騙的重災區。這類族群的心理特徵在於<strong>「對傳統社會運作模式的信任慣性」</strong>以及<strong>「對新興科技的辨識力不足」</strong>。他們習慣於「眼見為憑」、「聽聲辨人」的傳統判斷基準，卻不知道這些基準在 2026 年已被 AI 深偽（Deepfake）技術徹底摧毀。
      </p>
      <p>
        <strong>受害情境：</strong>詐騙集團常透過 AI 合成受害者子女、孫輩的聲音甚至視訊影像，撥打求救電話（如發生車禍急需保證金、替人作保遭黑道追討等）。長輩基於護子心切的恐慌，往往無法冷靜查證，再加上對網路轉帳不熟悉，通常會被引導至臨櫃匯款或面交現金，導致畢生積蓄瞬間歸零。
      </p>
    </div>

    <!-- 特徵二：財富焦慮與 FOMO -->
    <div class="page-title" style="margin-top: 30px;">
      <h2><i class="fas fa-chart-pie"></i> 二、 財富焦慮與錯失恐懼 (FOMO)：青壯年白領與投資客</h2>
      <p>
        這是目前<strong>財損總額最高</strong>的受害群體，顛覆了「只有笨蛋才會被騙」的迷思。這類受害者多為 25 至 50 歲的上班族、工程師、甚至是金融從業人員，他們具備一定的知識水準，但面臨高通膨與停滯的薪資，心中充滿了<strong>「財富焦慮」</strong>與<strong>「錯失恐懼症（FOMO, Fear Of Missing Out）」</strong>。
      </p>
      <p>
        <strong>受害情境：</strong>他們容易被包裝精美的假財經老師 YouTube 廣告、加密貨幣套利程式或名人的假粉專吸引。詐騙集團會先讓他們在假投資 APP 中獲得幾次小額出金的「真實獲利體驗」，利用「確認偏誤」讓受害者深信不疑。當受害者投入鉅款、甚至抵押房產借貸後，詐團便會以「洗碼量不足」、「IP異常需繳交保證金」等名目拒絕出金，將受害者的理智與資產一併榨乾。
      </p>
    </div>

    <!-- 特徵三：情感真空與陪伴渴求 -->
    <div class="page-title" style="margin-top: 30px;">
      <h2><i class="fas fa-heart-broken"></i> 三、 情感真空與陪伴渴求：單身、離異與獨居者</h2>
      <p>
        「交友養套殺」是所有詐騙手法中最殘酷的一種，因為它同時摧毀了受害者的金錢與心靈。這類受害者通常處於人生的低潮期、缺乏現實生活的社交支持，或者對浪漫關係抱有高度期待。他們渴望被理解、被傾聽，而詐騙集團的「車手客服」正是這方面的情緒操縱大師。
      </p>
      <p>
        <strong>受害情境：</strong>騙徒盜用高顏值照片，偽裝成外商高管、戰地軍醫或成功人士，在交友軟體或社群平台上進行長達數月的「無微不至關懷」。當受害者產生了深厚的情感依賴後，騙徒便開始編織共同的未來（例如準備結婚基金、買房），並順勢引入假投資平台，或謊稱高價包裹卡在海關需要通關費。受害者往往因為「不願懷疑愛情」，而自願掏空積蓄，甚至背負高額債務。
      </p>
    </div>

    <!-- 特徵四：權威恐懼與資訊封閉 -->
    <div class="page-title" style="margin-top: 30px;">
      <h2><i class="fas fa-balance-scale"></i> 四、 權威恐懼與資訊封閉：遵紀守法的良善公民</h2>
      <p>
        這類受害者通常奉公守法，一生未曾與警察或法院打過交道，因此對「公權力」抱持著極高的敬畏與恐懼。當面臨突如其來的司法指控時，他們的心理防線極易崩潰，喪失基本邏輯判斷能力。
      </p>
      <p>
        <strong>受害情境：</strong>詐騙集團假冒健保局、電信局開場，謊稱受害者遭人冒名開戶、涉及跨國洗錢案，隨後將電話轉接給假警官與假檢察官。他們利用偽造的法院傳票（甚至透過 LINE 傳送假公文），並以「偵查不公開」為由，嚴格禁止受害者向親友或當地派出所求證。受害者在這種極度高壓、資訊被完全隔離的「密室心理狀態」下，為求自證清白，會乖乖交出網路銀行帳號密碼，或將畢生積蓄匯入所謂的「安全監管帳戶」。
      </p>
    </div>

    <!-- 總結與防護牆 -->
    <div class="page-title" style="margin-top: 30px; text-align: center; background: linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%);">
      <h3 style="color: #0284c7; margin-bottom: 15px;"><i class="fas fa-shield-alt"></i> 建立心理防火牆：打破受害循環</h3>
      <p style="font-size: 1.1rem; line-height: 1.8; margin-bottom: 0; text-align: justify; color: #1e293b;">
        綜觀上述特徵，我們可以發現詐騙的本質是利用了人類最基本的情緒：<strong>貪婪、恐懼、孤獨與信任</strong>。在 AI 與高科技的武裝下，任何人都有可能在理智斷線的瞬間成為受害者。<br><br>
        要打破這個循環，我們必須在全社會推動<strong>「零信任（Zero Trust）架構」</strong>的思維。在數位世界中，不論對方是長官、親人、執法人員還是熱戀對象，只要談話內容觸及「金錢匯款」、「提供帳戶」、「繳交保證金」或「點擊不明驗證連結」，請務必強迫自己進入<strong>三分鐘的情緒冷靜期</strong>。掛斷原本的通訊管道，主動透過實體查證或撥打 165 反詐騙專線，唯有截斷詐騙集團刻意製造的「資訊封閉與時間壓迫」，才能真正守住自己的財產與人生。
      </p>
    </div>

  </main>
</template>

<script setup>
// 這頁目前是純靜態內容展示，所以 Script 區塊留空即可
</script>

<style scoped>
/* 
  如果發現螢幕變小的時候（如手機版）子選單擠在一起，
  可以在這邊針對這頁寫簡單的 RWD 微調，例如：
*/
@media (max-width: 768px) {
  .subpages {
    grid-template-columns: 1fr 1fr !important; /* 手機版變成兩排 */
  }
}
@media (max-width: 480px) {
  .subpages {
    grid-template-columns: 1fr !important; /* 更小的螢幕變一排 */
  }
}
</style>