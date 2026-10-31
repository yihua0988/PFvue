<template>
  <!-- 主要內容區 -->
  <main class="content dashboard-page">
    
    <div class="page-header" style="margin-bottom: 24px;">
      <h1 class="main-title">防制與行動方案：我們該怎麼做？</h1>
      <p class="dashboard-subtitle">公民資安實戰與系統防禦研究：從「被動識詐」走向「主動阻斷」的五大核心行動</p>
    </div>

    <!-- 4.總結子導覽列 -->
    <div class="subpages" style="grid-template-columns: repeat(4, 1fr);">
      <router-link to="/summary" :class="{ 'router-link-exact-active': $route.path === '/summary' }">
        <i class="fas fa-project-diagram"></i>&nbsp;詐騙趨勢總結
      </router-link>
      <router-link to="/victim-profile" :class="{ 'router-link-exact-active': $route.path === '/victim-profile' }">
        <i class="fas fa-user-shield"></i>&nbsp;受害人特徵分析
      </router-link>
      <router-link to="/fraud-vulnerabilities" :class="{ 'router-link-exact-active': $route.path === '/fraud-vulnerabilities' }">
        <i class="fas fa-bug"></i>&nbsp;防詐破口與責任
      </router-link>
      <router-link to="/action-plan" :class="{ 'router-link-exact-active': $route.path === '/action-plan' }">
        <i class="fas fa-fist-raised"></i>&nbsp;防制與行動方案
      </router-link>
    </div>

    <!-- ================== 導論：從省思到行動的防護網 ================== -->
    <div class="panel anti-fraud-container" style="text-align: left; margin-top: 24px;">
      <div class="panel-header">
        <h2><i class="fas fa-compass"></i>導論：從「認知覺醒」到「條件反射」的縱深防禦網</h2>
        <p class="box-subtitle" style="color: #dc2626 !important;">面對自動化與AI武器化的犯罪產業，唯有將防詐SOP轉化為肌肉記憶才能全身而退</p>
      </div>

      <div class="fraud-item">
        <h3 class="fraud-title">1.建立個人與家庭的「標準作業程序（Incident Response SOP）」</h3>
        <p class="description">
          面對2026年高度組織化、深偽（Deepfake）武器化的跨國詐騙集團，我們不能僅停留在「知道有詐騙」的被動認知，更必須落實到「遇到時該如何機械式反應」的主動防禦。當人類處於恐懼或貪婪的高壓情境下，大腦的理性分析能力會瞬間降載，此時唯有依靠事先建立的<strong class="highlight-red">「防詐標準作業程序（SOP）」</strong>，才能強行切斷騙徒的心理操縱。
        </p>
      </div>

      <div class="fraud-item" style="border-bottom: none; padding-bottom: 0;">
        <h3 class="fraud-title">2.五大核心實戰防線：感官、金流、家庭、社群與制度</h3>
        <p class="description">
          防範詐騙絕非單一警政單位的責任，而是每一位數位公民必須具備的現代生存技能。以下我們將防禦體系拆解為五大具體行動方案，協助您在面對突如其來的社交工程威脅時，能夠冷靜啟動防禦機制，徹底守護自身與家人的財產安全。
        </p>
      </div>
    </div>

    <!-- ================== 行動一：落實零信任 (警告黃) ================== -->
    <div class="panel anti-fraud-container highlight-panel" style="text-align: left; margin-top: 32px;">
      <div class="panel-header" style="border-bottom: none; margin-bottom: 8px;">
        <h2 style="color: #b45309;"><i class="fas fa-phone-slash"></i>行動一：落實「零信任通訊」，應對不明來電與深偽視訊</h2>
        <p class="box-subtitle" style="color: #92400e !important;">當聲紋與臉孔皆可於3秒內被AI完美克隆，感官直覺已不再是安全的驗證憑證</p>
      </div>
      
      <div class="fraud-item">
        <h3 class="fraud-title" style="color: #b45309;">1.破除「眼見為憑」：防範來電顯示竄改（Spoofing）與即時變臉</h3>
        <p class="description">
          過去我們常說「耳聽為憑，眼見為實」，但在AI零樣本語音克隆（Zero-shot Voice Cloning）與神經渲染變臉技術氾濫的今日，傳統感官已徹底失效。詐騙集團不僅能透過境外VoIP網路電話輕易竄改來電顯示（偽裝成公務機關或銀行客服號碼），更能盜用親友社群帳號發起深偽視訊，利用「車禍急需和解金、遭綁架拘禁、臨時周轉」等極端緊急事件製造高壓恐慌。
        </p>
      </div>

      <div class="fraud-item" style="border-bottom: none; padding-bottom: 0;">
        <h3 class="fraud-title" style="color: #b45309;">2.實戰行動準則：雙通道獨立驗證（Out-of-Band Verification）與家庭通關密語</h3>
        <p class="description">
          面對任何索要金錢、探詢個人資料或要求交付驗證碼的通訊，請務必堅守<strong class="highlight-red">「零信任原則（Zero Trust）」</strong>。切勿在當下的通話或視訊中做出任何決定：<br>
          <strong class="highlight-red">💡第一步（物理斷聯）：</strong>不論對方語氣多麼焦急或權威，立即掛斷電話或關閉視訊。<br>
          <strong class="highlight-red">💡第二步（暗號測試）：</strong>事先與家人約定一個「絕對不會出現在社群媒體上的實體通關密語」（例如：家裡第一隻寵物的綽號、特定的荒謬問題），無法回答者一律視為AI詐騙。<br>
          <strong class="highlight-red">💡第三步（反向回撥）：</strong>主動使用自己手機通訊錄中原先儲存的傳統門號「反向回撥」給親友，或自行上網查詢官方代表號進行二次獨立查證。
        </p>

        <!-- 圖片展示區 1 -->
        <div class="action-image-container">
          <img :src="`${BASE_URL}images/4-4-1.jpg`" alt="接到不明電話" />
        </div>
      </div>
    </div>

    <!-- ================== 行動二：阻斷洗錢金流 ================== -->
    <div class="panel anti-fraud-container" style="text-align: left; margin-top: 32px;">
      <div class="panel-header">
        <h2 style="color: #4f46e5;"><i class="fas fa-search-dollar"></i>行動二：建立「金流熔斷機制」，資金轉移前強制冷靜與查證</h2>
        <p class="box-subtitle" style="color: #4338ca !important;">對抗自動化水房與虛擬貨幣跨鏈洗錢，守住按下「確認轉帳」前的最後一哩路</p>
      </div>

      <div class="fraud-item">
        <h3 class="fraud-title" style="color: #4f46e5;">1.識破「不可逆金流」陷阱：一次性虛擬帳戶與 USDT 場外交易</h3>
        <p class="description">
          所有千變萬化的詐騙劇本，最終的收網動作必然是「資金移轉」。現代詐騙水房高度依賴第三方支付生成的「一次性虛擬收款代碼」、無實質交易背景的個人人頭帳戶，或是要求受害者購買加密貨幣（USDT）打入指定錢包。由於區塊鏈轉帳與跨行快付具備<strong class="highlight-red">「高度隱匿性與不可逆性」</strong>，一旦資金匯出，自動化腳本會在數十秒內完成分流洗白，事後報警追回的機率微乎其微。
        </p>
      </div>

      <div class="fraud-item" style="border-bottom: none; padding-bottom: 0;">
        <h3 class="fraud-title" style="color: #4f46e5;">2.實戰行動準則：黃金三分鐘冷靜期與「165打詐儀表板」黑名單比對</h3>
        <p class="description">
          不論是網購匯款、繳交投資獲利保證金、或是替網路交友對象代墊海關費用，在開啟網銀按下「確認轉帳」前，請強制執行<strong class="highlight-red">「個人金流熔斷機制」</strong>：<br>
          <strong class="highlight-red">💡強制延遲決策：</strong>只要金額超過日常消費水準，強迫自己放下手機離開現場15分鐘，讓大腦前額葉恢復邏輯運作。<br>
          <strong class="highlight-red">💡官方資料庫比對：</strong>立即前往內政部警政署「165全民防騙網」或加入「165防騙宣導LINE官方帳號」，將對方提供的<strong class="highlight-red">匯款帳號、投資網站網址、應用程式名稱或LINE ID</strong>輸入系統進行黑名單比對，切斷洗錢集團的最後一哩路。
        </p>

        <!-- 圖片展示區 2 -->
        <div class="action-image-container">
          <img :src="`${BASE_URL}images/4-4-2.webp`" alt="查證帳戶" />
        </div>

        <div style="text-align: left; margin-top: 18px;">
          <a href="https://www.newloan.com.tw/wp-content/uploads/2024/01/MiConv.com__01_%E8%AD%A6%E7%A4%BA%E5%B8%B3%E5%B8%B6-800x800.webp" target="_blank" rel="noopener noreferrer" class="source-btn">
            <i class="fas fa-external-link-alt"></i>圖片來源：新貸網NewLoan(點擊查看原圖)
          </a>
        </div>
      </div>
    </div>

    <!-- ================== 行動三：建立家庭防火牆 ================== -->
    <div class="panel anti-fraud-container" style="text-align: left; margin-top: 32px;">
      <div class="panel-header">
        <h2 style="color: #e11d48;"><i class="fas fa-hands-helping"></i>行動三：構築「家庭防禦矩陣」，主動保護高齡與數位弱勢長輩</h2>
        <p class="box-subtitle" style="color: #be123c !important;">以科技工具加上無條件的情感支持，打破詐騙集團對長輩的「密室資訊隔離」</p>
      </div>

      <div class="fraud-item">
        <h3 class="fraud-title" style="color: #e11d48;">1.彌補生理與數位落差：為何長輩最容易陷入「孤軍奮戰」？</h3>
        <p class="description">
          高齡長者擁有畢生積蓄與不動產，卻因大腦前額葉懷疑機制自然退化以及對新興科技的不熟悉，成為「假檢警恐嚇」、「假投資群組」與「假親友深偽求救」的頭號獵物。由於長輩白天常獨自在家，詐騙集團會利用高強度密集通話進行<strong class="highlight-red">「資訊隔離（Information Isolation）」</strong>，甚至教導長輩如何編造理由（如：買古董、房屋修繕）來欺騙銀行行員與警察的關懷提問。
        </p>
      </div>

      <div class="fraud-item" style="border-bottom: none; padding-bottom: 0;">
        <h3 class="fraud-title" style="color: #e11d48;">2.實戰行動準則：端點防護軟體部署與「去責化」的家庭溝通</h3>
        <p class="description">
          防詐絕非長輩個人的事，年輕一輩必須主動為父母建立硬體與心理的雙重防火牆：<br>
          <strong class="highlight-red">💡硬體端點防護：</strong>主動幫長輩的智慧型手機安裝具備AI資料庫的來電辨識與防毒軟體（如Whoscall、趨勢科技防詐達人），並於LINE設定中<strong class="highlight-red">關閉「允許自其他裝置登入」與「自動加入好友」</strong>功能，阻斷陌生投資群組的拉攏。<br>
          <strong class="highlight-red">💡財務預警機制：</strong>與長輩溝通，將其大額定存或房產設定「地籍異動即時通」（防止地面師盜賣抵押），並調降網銀單日非約定轉帳額度。<br>
          <strong class="highlight-red">💡建立不指責的溝通環境：</strong>許多長輩受騙後不敢告訴子女，是害怕遭到責罵。請定期在家庭聚餐時分享最新案例（如假冒戶政事務所、健保卡盜用），並溫柔叮囑長輩：「遇到任何事情都有我們一起扛，匯款前先問我們，絕對不會怪你。」
        </p>

        <!-- 圖片展示區 3 -->
        <div class="action-image-container">
          <img :src="`${BASE_URL}images/4-4-3.jpg`" alt="關心長輩" />
        </div>

        <div style="text-align: left; margin-top: 18px;">
          <a href="https://www.luzhu-hro.tycg.gov.tw/News_Content.aspx?n=13120&s=1334338" target="_blank" rel="noopener noreferrer" class="source-btn">
            <i class="fas fa-external-link-alt"></i>圖片來源：桃園市蘆竹區戶政事務所 (點擊查看原文)
          </a>
        </div>
      </div>
    </div>

    <!-- ================== 行動四：鞏固全民防線 ================== -->
    <div class="panel anti-fraud-container" style="text-align: left; margin-top: 32px;">
      <div class="panel-header">
        <h2 style="color: #c2410c;"><i class="fas fa-bullhorn"></i>行動四：打破「資訊不對稱」，去污名化並建構社會「群體免疫」</h2>
        <p class="box-subtitle" style="color: #9a3412 !important;">將個人的防詐識讀轉化為公開情報，讓詐騙集團的新劇本在曝光瞬間失效</p>
      </div>

      <div class="fraud-item">
        <h3 class="fraud-title" style="color: #c2410c;">1.沉默螺旋與二次傷害：為何「羞於啟齒」是詐騙集團最大的保護傘？</h3>
        <p class="description">
          詐騙集團最仰賴的戰略優勢就是<strong class="highlight-red">「資訊不對稱（Information Asymmetry）」</strong>。當一套全新的AI釣魚劇本被開發出來時，其初期的欺騙成功率極高。然而，許多受害者在發覺受騙後，往往因為社會上錯誤的「受害者有罪論（嘲笑受害者貪心或愚蠢）」，陷入強烈的羞恥感與自我懷疑，進而選擇隱忍不報。這種「沉默螺旋」正好成為犯罪集團最完美的保護傘，讓同一套劇本得以在暗處繼續收割數千個家庭。
        </p>
      </div>

      <div class="fraud-item" style="border-bottom: none; padding-bottom: 0;">
        <h3 class="fraud-title" style="color: #c2410c;">2.實戰行動準則：開源情報共享（Crowdsourced Intelligence）與數位疫苗傳播</h3>
        <p class="description">
          要徹底瓦解詐欺產業的獲利模型，我們必須在全社會建立如同流行病學般的<strong class="highlight-red">「認知群體免疫（Cognitive Herd Immunity）」</strong>：<br>
          <strong class="highlight-red">💡停止檢討受害者：</strong>面對身邊受騙的親友，給予同理心與法律協助，而非冷嘲熱諷。唯有消除社會污名，才能讓犯罪黑數浮出水面。<br>
          <strong class="highlight-red">💡隨手檢舉與曝光：</strong>當您在 Facebook、Instagram、Threads 或YouTube滑到疑似深偽名人的假投資廣告、或是收到釣魚簡訊時，不要只是滑過！請花5秒鐘按下「檢舉廣告」，並將截圖與破綻解析分享至家庭群組與社群平台。您的一次轉傳，就是為身邊的人接種一劑最有效的「防詐數位疫苗」。
        </p>

        <!-- 圖片展示區 4 -->
        <div class="action-image-container">
          <img :src="`${BASE_URL}images/4-4-4.png`" alt="分享案例" />
        </div>

        <div style="text-align: left; margin-top: 18px;">
          <a href="https://www.instagram.com/p/DHkiqpOu-KW/?img_index=8" target="_blank" rel="noopener noreferrer" class="source-btn">
            <i class="fab fa-instagram" style="color: #e11d48;"></i>圖片來源：Instagram防詐宣導專頁(點擊查看原貼文)
          </a>
        </div>
      </div>
    </div>

    <!-- ================== 行動五：破解公權力迷思 ================== -->
    <div class="panel anti-fraud-container" style="text-align: left; margin-top: 32px;">
      <div class="panel-header">
        <h2 style="color: #0284c7;"><i class="fas fa-university"></i>行動五：恪守「制度與機器鐵律」，公權力與客服絕不要求操作ATM</h2>
        <p class="box-subtitle" style="color: #0369a1 !important;">看穿假客服與假檢警的終極收網話術：ATM與網銀只有「把錢匯出」的功能</p>
      </div>

      <div class="fraud-item">
        <h3 class="fraud-title" style="color: #0284c7;">1.拆解話術迷霧：「輸入代碼解除分期」與「安全帳戶監管」的荒謬性</h3>
        <p class="description">
          無論前端劇本是「網購系統遭駭誤設為批發商／連續扣款12期」、「賣家未簽署金流託管協議導致買家資金凍結」，還是「假檢察官聲稱您涉及洗錢案，必須將資金轉入法院安全監管帳戶以證清白」，這些騙局在最後一刻，都會引導受害者走向實體ATM提款機，或開啟手機網路銀行轉帳介面。<br><br>
          騙徒會利用受害者對金融底層系統的不了解，謊稱：<strong class="highlight-red">「在轉帳帳號欄輸入012345是連結金管會解除協定，在金額欄輸入29988是驗證碼，不會真的扣款！」</strong>一旦按下確認，您的辛苦錢就會直接匯入車手的人頭帳戶。
        </p>
      </div>

      <div class="fraud-item" style="border-bottom: none; padding-bottom: 0;">
        <h3 class="fraud-title" style="color: #0284c7;">2.實戰行動準則：牢記國家司法程序與銀行系統的「三個絕對不會」</h3>
        <p class="description">
          請在腦中刻下不可動搖的制度鐵律，只要違反以下任何一條，100%為詐騙集團：<br>
          <strong class="highlight-red">🚫鐵律一（ATM無解除功能）：</strong>自動櫃員機（ATM）與網路銀行的轉帳頁面，在程式設計上「只有把錢匯給別人」與「查詢餘額」的功能，<strong class="highlight-red">絕對沒有任何「解除分期付款、取消扣款、身分認證或簽署金流協議」的機制！</strong><br>
          <strong class="highlight-red">🚫鐵律二（公文不會用LINE傳）：</strong>警察、檢察官、法官與國稅局辦案，皆有嚴格的刑事訴訟法書面送達程序，<strong class="highlight-red">絕對不會透過LINE傳送傳票或拘票，更不會要求視訊做筆錄！</strong><br>
          <strong class="highlight-red">🚫鐵律三（國家不會監管現金）：</strong>司法機關扣押不法所得會直接透過公文行文銀行進行帳戶凍結，<strong class="highlight-red">絕對不會要求民眾自己去領出現金交給專員（車手），或要求將錢匯入任何「安全監管帳戶」！</strong>
        </p>

        <!-- 圖片展示區 5 -->
        <div class="action-image-container">
          <img :src="`${BASE_URL}images/4-4-5.jpg`" alt="公家機關不會要求操作ATM" />
        </div>
      </div>
    </div>

    <!-- ================== 結語：全站總結 (安全綠) ================== -->
    <div class="panel anti-fraud-container safe-panel" style="text-align: left; margin-top: 32px; margin-bottom: 40px;">
      <div class="panel-header" style="border-bottom: none; margin-bottom: 8px;">
        <h2 style="color: #065f46;"><i class="fas fa-shield-alt"></i>結語：建立大腦的抗詐防火牆，邁向「零容忍、零信任」的堅實社會</h2>
        <p class="box-subtitle" style="color: #047857 !important;">科技與詐騙的演化永無止境，但理性的查證永遠是最強大的盾牌</p>
      </div>

      <div class="fraud-item" style="border-bottom: none; padding-bottom: 0;">
        <p class="description">
          綜觀本網站從「一頁式假網購拆解」、「165即時數據儀表板」、「AI深偽與黑幫跨國案例」到「心理學與制度破口研究」的完整剖析，我們可以清楚看見：2026年的詐欺犯罪已是一場結合尖端科技與人性剝削的超限戰。<br><br>
          然而，不論AI偽造的影音多麼逼真、投資群組的劇本多麼誘人、假檢警的話術多麼令人恐懼，詐騙集團永遠無法繞過最後一道關卡——那就是<strong class="highlight-red">「取得您的授權，讓您親手將錢匯出」</strong>。<br><br>
          請永遠記住防詐三步驟：<strong class="highlight-red">「一聽（聽清楚對方是否提及金錢、驗證碼與ATM）、二掛（立刻掛斷電話切斷情緒操縱）、三查證（撥打165反詐騙專線或向家人獨立求證）」</strong>。詐騙集團不會停止進化，我們的防備也不能停止更新。讓我們將這份防詐意識傳遞給身邊的每一個人，共同攜手打造一個讓詐騙無所遁形的堅實社會！
        </p>
      </div>
    </div>

  </main>
</template>

<script setup>
// 自動取得 Vite base 路徑 (在 GitHub Pages 會是 '/PFvue/'，本地是 '/')
const BASE_URL = import.meta.env.BASE_URL || '/'
</script>