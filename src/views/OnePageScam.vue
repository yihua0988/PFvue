<template>
  <main class="content dashboard-page">
    
    <!-- 1. 主標題與副標題 -->
    <header class="page-header">
      <h1 class="dashboard-title">🛒假網購長怎樣？一頁式詐騙拆解與防範雷達</h1>
      <p class="dashboard-subtitle">
        透過4大防詐圖卡一眼識破一頁式假網購陷阱，並使用一分鐘網址安全層網站檢測與十題測試守住您的荷包！
      </p>
    </header>

    <!-- 3. 頂部 3 張重點 KPI 摘要卡 -->
    <section class="kpi-grid one-page-kpi-grid">
      
      <!-- 卡片 1：近三個月網購與盜刷數據 -->
      <div class="kpi-card kpi-danger">
        <div class="kpi-header">
          <span class="kpi-badge badge-red">💳網購與盜刷數據</span>
          <span class="kpi-period-hint">{{ crossReport.card3MPeriodLabel || '近三個月累計統計' }}</span>
        </div>
        <div class="kpi-main-stack">
          <span class="kpi-label-title">近3月盜刷總額</span>
          <div class="kpi-big-num text-red">${{ crossReport.total3MMoneyYi }}億元</div>
          <div class="kpi-sub-row">
            <span>每筆均損</span>
            <strong class="text-red">${{ crossReport.avg3MPerCaseFormatted }}</strong>
          </div>
        </div>
        <p class="kpi-desc">
          結合第3頁信用卡盜刷數據：近三個月累計發生<strong>{{ crossReport.total3MCasesFormatted }}</strong>盜刷，切勿在一頁式可疑網頁輸入卡號與OTP驗證碼！
        </p>
      </div>

      <!-- 卡片 2：近一年盜刷案件規模 -->
      <div class="kpi-card kpi-warning">
        <div class="kpi-header">
          <span class="kpi-badge badge-amber">📊盜刷案件近年規模</span>
          <span class="kpi-period-hint">{{ crossReport.cardHistoryLabel || '近一年累計統計' }}</span>
        </div>
        <div class="kpi-main-stack">
          <span class="kpi-label-title">近一年累計發生數</span>
          <div class="kpi-big-num text-orange">{{ crossReport.totalCasesFormatted }}</div>
          <div class="kpi-sub-row">
            <span>總財損金額</span>
            <strong class="text-orange">${{ crossReport.totalMoneyYi }}億元</strong>
          </div>
        </div>
        <p class="kpi-desc">
          結合第3頁信用卡盜刷數據：資料庫記錄之非面對面與網購盜刷<strong>近一年總財損高達${{ crossReport.totalMoneyYi }}億元</strong>，平均每筆均損達<strong>${{ crossReport.avgPerCaseFormatted }}元</strong>！
        </p>
      </div>

      <!-- 卡片 3：打詐財損與查扣成效 -->
      <div class="kpi-card kpi-info">
        <div class="kpi-header">
          <span class="kpi-badge badge-blue">🛡️打詐財損與查扣</span>
          <span class="kpi-period-hint">{{ crossReport.perfPeriodLabel }}</span>
        </div>
        <div class="kpi-main-stack">
          <span class="kpi-label-title">{{ crossReport.perfTitle }}</span>
          <div class="kpi-big-num text-blue kpi-stat-num">{{ crossReport.perfMainStat }}</div>
        </div>
        <p class="kpi-desc" v-html="crossReport.perfDesc"></p>
      </div>

    </section>

    <!-- 4. 模式切換面板 -->
    <section class="filter-panel" ref="detectorSectionRef">
      <div class="filter-row">
        <div class="filter-group">
          <span class="step-tag">功能切換</span>
          <span class="filter-title">選擇一頁式假網購「圖文說明」或「網站檢測與十題測試」：</span>
        </div>
        <span class="dataset-time-pill">🛡️點擊下方紅框閃爍按鈕立即啟動一分鐘防詐檢測</span>
      </div>

      <div class="dataset-tabs-grid two-cols">
        <button 
          :class="['dataset-tab-btn', { active: activeTab === 'guide' }]" 
          @click="switchTab('guide')">
          <span class="tab-main-title">📸一頁式假網購圖文全拆解（4大防詐圖卡）</span>
          <span class="tab-sub-meta">涵蓋社群贊助廣告陷阱、4大高風險偽冒商品、正版商城對照與退貨止付SOP</span>
        </button>

        <button 
          :class="['dataset-tab-btn', 'glow-pulse-btn', { active: activeTab === 'detector' }]" 
          @click="switchTab('detector')">
          <span class="tab-main-title">⚡網址安全檢測＋10題防詐檢測</span>
          <span class="tab-sub-meta">只需要一分鐘分析網址安全性及十題測試</span>
        </button>
      </div>
    </section>

    <!-- =====================================================================
          📸 頁面一：一頁式假網購「4 大防詐宣導圖卡」說明專區
          ===================================================================== -->
    <template v-if="activeTab === 'guide'">
      <section class="card-box" style="text-align: left;">
        <div class="box-header">
		<h2>📸一頁式假網購防詐全拆解</h2>
          <div>
            <p class="box-subtitle">
              👆 結合視覺圖卡與圖片沒說的<strong>「幕後運作黑幕＋實戰查證技巧」</strong>，下單前花1分鐘看懂不踩雷！
            </p>
          </div>
        </div>

        <div class="scam-guide-gallery">
          <article 
            v-for="(card, idx) in guideImageCards" 
            :key="card.id" 
            class="guide-img-card"
          >
            <div class="guide-card-top">
              <span :class="['guide-step-badge', card.badgeClass]">深度拆解 {{ idx + 1 }}</span>
              <h3>{{ card.title }}</h3>
            </div>

            <div class="guide-img-frame">
              <img :src="card.src" :alt="card.title" loading="lazy" />
            </div>

            <p class="guide-card-desc">
              <strong>🕵️幕後運作真相：</strong>{{ card.desc }}
            </p>

            <ul class="guide-card-points" v-if="card.points && card.points.length">
              <li v-for="(pt, pIdx) in card.points" :key="card.id + '-pt-' + pIdx">
                {{ pt }}
              </li>
            </ul>
          </article>
        </div>
      </section>
	 </template> 
    <!-- =====================================================================
          ⚡ 頁面二：網址 Security 安全層網站檢測 ＋ 10 題結構化防詐量表
          ===================================================================== -->
    <template v-else>
      <section class="dashboard-main-grid">
        
        <!-- 左欄：步驟 A 網址安全層網站檢測 ＋ 步驟 B 10題互動式問卷 -->
        <div class="card-box">
          <div class="box-header">
            <div>
              <h2>⚡網址安全檢測＋10題防詐深度量表</h2>
              <p class="box-subtitle">
                👆 結合 <strong>DNS/WHOIS網域年齡/網頁原始碼網站檢測</strong>與<strong>10道關鍵檢核題</strong>，完成全部10題後自動顯示判定結果！
              </p>
            </div>
          </div>

          <!-- 步驟 A：網址安全層網站檢測器 -->
          <div class="url-check-box">
            <div class="step-a-top-row">
              <label class="url-input-label" style="margin-bottom: 0;">
                🌐步驟A：輸入可疑購物網址（啟動網站安全檢測）：
              </label>
              <div class="sample-url-btns">
                <button class="Quick-axis-btn btn-to-right" @click="fillSampleUrl('https://tw-mall889.shop-vip.top/hot-sale')">
                  🧪帶入高危測試網址
                </button>
                <button class="Quick-axis-btn btn-to-left" @click="fillSampleUrl('https://24h.pchome.com.tw')">
                  ✅帶入正版測試網址
                </button>
              </div>
            </div>

            <div class="url-input-row">
              <input 
                type="text" 
                v-model.trim="testUrlInput" 
                placeholder="貼上網址，例如：https://tw-sale88.shop.top/item..." 
                class="clean-search-input"
                @keyup.enter="runSecurityCrawler()"
              />
              <button 
                class="pill-btn active scan-submit-btn" 
                :disabled="isScanningUrl"
                @click="runSecurityCrawler()"
              >
                {{ isScanningUrl ? '⏳網站檢測中...' : '🔍啟動網站檢測' }}
              </button>
              <button 
                v-if="testUrlInput || urlScanReport || Object.keys(quizAnswers).length" 
                class="restore-overall-btn reset-detector-btn" 
                @click="resetAllDetector()"
              >
                🔄重置
              </button>
            </div>

            <p v-if="scanErrorMsg" class="url-alert-msg text-red">{{ scanErrorMsg }}</p>

            <div v-if="urlScanReport" class="security-layer-report">
              <div class="sec-report-header">
                <strong>🛡️【{{ urlScanReport.hostname }}】安全層網站檢測分析報告</strong>
              </div>

              <div class="sec-status-line">
                <span :class="['sec-big-alert-badge', urlScanReport.riskSignals >= 2 ? 'sec-danger-text' : 'sec-safe-text']">
                  {{ urlScanReport.riskSignals >= 2 ? '⚠️偵測到可疑特徵' : '✅網址結構安全正常' }}
                </span>
              </div>

              <div class="sec-checks-list">
                <div 
                  v-for="(chk, cIdx) in urlScanReport.checks" 
                  :key="'chk-'+cIdx" 
                  class="sec-check-item"
                >
                  <span class="sec-layer-badge" :class="'sec-' + chk.type">
                    {{ chk.title }}
                  </span>
                  <div class="sec-layer-body">
                    <strong>{{ chk.layer }}：</strong>
                    <span>{{ chk.detail }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 步驟 B：10 題結構化一頁式假網購檢核量表 -->
          <div class="checklist-wrap">
            <div class="quiz-progress-bar-row">
              <span class="url-input-label" style="margin-bottom: 0;">
                📝步驟B：一頁式假網購10題深度檢核量表
              </span>
              <div class="quiz-progress-actions">
                <button 
                  v-if="firstUnansweredId !== null" 
                  class="jump-unanswered-btn" 
                  @click="scrollToFirstUnanswered()"
                >
                  📍跳到未完成題目(Q{{ firstUnansweredId }})
                </button>
                <span class="quiz-progress-pill">
                  已完成<strong>{{ evaluationResult.answeredCount }}</strong>/10題
                </span>
              </div>
            </div>

            <div class="quiz-progress-track">
              <div class="quiz-progress-fill" :style="{ width: (evaluationResult.answeredCount / 10) * 100 + '%' }"></div>
            </div>

            <div class="ten-questions-list">
              <div 
                v-for="q in tenQuestions" 
                :key="q.id" 
                class="quiz-card-item"
                :id="'quiz-card-' + q.id"
              >
                <div class="quiz-card-question">
                  <span class="quiz-q-num">Q{{ q.id }}</span>
                  <div class="quiz-q-texts">
                    <span class="quiz-q-category">{{ q.category }}</span>
                    <strong>{{ q.question }}</strong>
                  </div>
                </div>

                <div class="quiz-card-options">
                  <button 
                    v-for="(opt, oIdx) in q.options" 
                    :key="q.id + '-' + oIdx"
                    :class="[
                      'quiz-option-pill',
                      { active: quizAnswers[q.id] === oIdx }
                    ]"
                    @click="selectQuizAnswer(q.id, oIdx)"
                  >
                    <span class="opt-letter">{{ ['(A)', '(B)', '(C)'][oIdx] }}</span>
                    <span class="opt-text">{{ opt.label }}</span>
                    <span v-if="quizAnswers[q.id] === oIdx" class="opt-check-icon">✓</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 右欄：判定狀態卡片 -->
        <div class="card-box detail-card" ref="verdictCardRef">
          <div class="detail-banner" :style="{ background: evaluationResult.bannerGradient }">
            <div style="padding-right: 12px;">
              <span class="banner-tag">
                📍綜合質化判定狀態（已檢核 {{ evaluationResult.answeredCount }}/10項特徵）
              </span>
              <h2 style="font-size: 27px !important; line-height: 1.35; margin-top: 6px !important;">
                {{ evaluationResult.title }}
              </h2>
            </div>
            <div class="banner-pop" style="flex-shrink: 0;">
              <span>判定狀態</span><br>
              <strong style="font-size: 20px;">{{ evaluationResult.badgeText }}</strong>
            </div>
          </div>

          <div class="compare-block" v-if="evaluationResult.triggeredWarnings && evaluationResult.triggeredWarnings.length > 0">
            <div class="compare-header">
              <h4>🚩您勾選的網頁已命中以下「高風險詐騙特徵」：</h4>
            </div>
            <ul style="margin: 0; padding-left: 20px; font-size: 16.5px; color: #991b1b; font-weight: 800; line-height: 1.65;">
              <li v-for="(warnText, wIdx) in evaluationResult.triggeredWarnings" :key="'w-'+wIdx">
                {{ warnText }}
              </li>
            </ul>
          </div>

          <div class="compare-block">
            <div class="compare-header">
              <h4>🎯系統綜合診斷建議：</h4>
            </div>
            <p class="compare-caption" style="margin-top: 0 !important; font-size: 17.5px !important; color: #78350f !important;">
              {{ evaluationResult.advice }}
            </p>
          </div>

          <div class="habits-block">
            <h4>🚨萬一已經「貨到付款」領了詐騙包裹，如何把錢追回來？</h4>
            <ol class="habits-list">
              <li>
                <strong>超商取貨（7-11／全家／萊爾富／OK）：</strong>
                四大超商皆已建立<strong>「爭議包裹退貨申訴平台」</strong>！請保留包裹外箱上的託運單（小白單），上網至該超商申訴平台登錄，超商會協助通知代收物流止付並退還貨款。
              </li>
              <li>
                <strong>宅配貨到付款（黑貓／新竹物流／嘉里大榮／郵局）：</strong>
                發現受騙後<strong>切勿把外箱丟掉</strong>！立即查看外箱託運單上的<strong>「物流公司與寄件代收行號」</strong>，於24～48小時內致電物流客服要求<strong>「暫停撥款給寄件人並辦理爭議退貨」</strong>。
              </li>
              <li>
                <strong>若不小心在假網站輸入了信用卡號：</strong>
                請立刻打開銀行 App 點選<strong>「掛失／鎖定信用卡」</strong>，並致電銀行客服申請爭議帳款處理！
              </li>
            </ol>
          </div>
        </div>

      </section>
    </template>

  </main>
</template>

<script setup>
import { ref, reactive, computed, nextTick, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { supabase } from '../lib/supabase.js'
import {
  scanUrlSecurityLayer,
  TEN_SCAM_QUESTIONS,
  evaluateComprehensiveRisk
} from '../utils/scamSecurityScanner.js'

const route = useRoute()
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_KEY

const activeTab = ref('guide')
const detectorSectionRef = ref(null)

function checkRouteTab(shouldScroll = false) {
  if (route.query.tab === 'detector') {
    activeTab.value = 'detector'
    if (shouldScroll) {
      nextTick(() => {
        detectorSectionRef.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    }
  }
}

watch(
  () => [route.query.tab, route.query.t],
  () => {
    checkRouteTab(true)
  }
)

const guideImageCards = [
  {
    id: 'ad-traps',
    title: '社群贊助廣告陷阱：為什麼滑手機最容易買到假貨？',
    src: './images/scam-ad-traps.jpg',
    badgeClass: 'badge-red',
    desc: '詐騙集團利用Meta廣告系統的「像素追蹤（Pixel）」鎖定曾瀏覽購物網站的民眾，只要你多停留3秒，演算法就會對你瘋狂推播同類型的假清倉廣告。此外，廣告下方看似熱絡的「+1、已收到貨質感超好」留言，全是由境外殭屍帳號在幾分鐘內洗出來的假互動，一旦有真實買家留言踢爆詐騙，就會立刻遭粉專管理員刪除並封鎖。',
    points: [
      '點開粉專「關於➔粉絲專頁資訊透明度」，檢查是否近期剛改名，或管理員位於境外地區。',
      '展開留言區時，記得將排序從「最相關」切換為「由新到舊」，觀察是否有近期留言被大量隱藏的痕跡。',
      '看見「百貨撤櫃、海關沒收品拍賣、老闆跑路抵債」等悲情或清倉話術，請直接滑掉，正牌專櫃絕不會透過單頁網站出清。'
    ]
  },
  {
    id: 'top4-goods',
    title: '一頁式假網購最常偽冒的「4大高風險商品」',
    src: './images/scam-top4-goods.jpg',
    badgeClass: 'badge-amber',
    desc: '為什麼詐騙集團專挑這4類商品下手？因為服飾鞋包與生活小家電「單價落在$990～$1,980之間」，正好處於多數人覺得「去報案嫌麻煩、乾脆自認倒楣」的心理門檻！更危險的是，近期大量盜用台灣嘖嘖（zeczec）群眾募資圖文的假3C與無標籤保健品，不僅未經台灣BSMI電器安規與食藥署檢驗，更曾發生劣質行動電源充電自燃、不明藥膏導致嚴重皮膚潰爛的案例。',
    points: [
      '高單價機能服飾或知名運動鞋，定價若低於官方售價5折且「全尺碼現貨免運」，100%為劣質仿冒品。',
      '購買行動電源、藍牙耳機或冷暖家電前，務必確認商品具備台灣經濟部標準檢驗局「BSMI認證字號」與「NCC字號」。',
      '凡是宣稱「名醫研發、藝人代言」卻不敢在台灣大型連鎖藥妝店或官方認證商城上架的塗抹／口服產品，切勿拿身體健康開玩笑。'
    ]
  },
  {
    id: 'vs-official',
    title: '3 秒識破：正版官方商城vs.一頁式假網購',
    src: './images/scam-vs-official.jpg',
    badgeClass: 'badge-blue',
    desc: '許多人以為網址前面有「鎖頭圖示（HTTPS）」就代表安全，其實現在詐騙集團都會申請免費的Let\'s Encrypt憑證來掛上鎖頭！真正能一秒戳破假網站的關鍵在於「前端程式碼破綻」與「消保法強制揭露義務」：一頁式假網站為了讓受害者快速填單，全站沒有購物車與會員系統，且頁尾的退換貨條款往往是直接從中國電商模板複製貼上，充斥非台灣法定用語。',
    points: [
      '實測「F5 重新整理法」：按下重新整理網頁，若頁面上的「倒數計時器」或「剩餘庫存數」又重新歸零跳動，即為假造的飢餓行銷腳本。',
      '實測「亂填測試法」：在訂購欄隨便輸入「123」當作手機號碼，若系統完全沒檢查格式就跳出「訂購成功」，代表這只是單純騙取個資與寄送幽靈包裹的假表單。',
      '依據台灣《消費者保護法》，合法電商必須揭露營業人名稱、統一編號、負責人與實體地址；可將頁尾統編複製至「經濟部商工登記公示資料查詢服務」核對真偽。'
    ]
  },
  {
    id: 'refund-sop',
    title: '貨到付款拆開是假貨？爭議包裹退貨止付3步驟',
    src: './images/scam-refund-sop.jpg',
    badgeClass: 'badge-red',
    desc: '跨境一頁式詐騙之所以猖獗，是因為境外賣家無法直接在台灣超商收款，必須委託台灣的「第三方代收集運／報關物流商」代收貨款，結算週期通常有數天時間差。交通部與各大超商、宅配業者已建立「爭議包裹強制止付機制」，只要在取貨後黃金時間內向「代收物流商」或「超商申訴平台」提出異議，就能在款項匯出境外前直接攔截凍結！',
    points: [
      '【超商取貨前防線】若收到取貨簡訊但想不起來買過什麼，看店員拿出的包裹託運單印有「非賣家、代寄、XX國際物流」，請當場向店員表示「這是詐騙包裹，我要拒收」！',
      '【已經下單但還沒去領】請放心「直接不取貨」！一頁式詐騙屬於民法詐欺行為，不去超商領取詐騙包裹絕對不會構成刑法《間接毀損罪》或背信罪，別被詐騙集團的恐嚇簡訊騙去領貨。',
      '【7-11／全家線上申訴】取貨拆封發現受騙後，請保留外箱小白單，直接上網搜尋「7-ELEVEN詐騙申訴平台」或「全家爭議包裹退貨申請」24小時皆可線上立案啟動退款程序。'
    ]
  }
]
const testUrlInput = ref('')
const isScanningUrl = ref(false)
const scanErrorMsg = ref('')
const urlScanReport = ref(null)

const tenQuestions = TEN_SCAM_QUESTIONS
const quizAnswers = reactive({})
const verdictCardRef = ref(null)

const crossReport = reactive({
  card3MPeriodLabel: '近三個月累計統計',
  total3MMoneyYi: '0.00',
  total3MCasesFormatted: '載入中...',
  avg3MPerCaseFormatted: '0',

  cardHistoryLabel: '近一年累計統計',
  totalMoneyYi: '0.00',
  totalCasesFormatted: '載入中...',
  avgPerCaseFormatted: '0',

  perfPeriodLabel: '計算中...',
  perfTitle: '全國月均受騙 0.0 億元',
  perfMainStat: '查扣率計算中...',
  perfDesc: '結合「警示戶與打詐成效」資料庫進行動態加權運算中...'
})

async function fetchCrossPageReport() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY || SUPABASE_ANON_KEY.includes('請替換')) return

  const headers = {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`
  }

  try {
    const perfRes = await fetch(
      `${SUPABASE_URL}/rest/v1/anti_fraud_performance?select=*&order=年度.desc,月份.desc&limit=1000`,
      { headers }
    )
    if (perfRes.ok) {
      const perfRows = await perfRes.json()
      let globalMaxMIdx = 0
      const parsedRows = []

      perfRows.forEach(row => {
        let yr = Number(row.年度 || 0)
        let mo = Number(row.月份 || 0)
        if (yr > 0 && yr < 1911) yr += 1911
        if (yr < 2000 || yr > 2050 || !mo || mo < 1 || mo > 12) return

        const mIdx = yr * 12 + (mo - 1)
        if (mIdx > globalMaxMIdx) globalMaxMIdx = mIdx

        parsedRows.push({
          mIdx,
          seizedVal: Number(String(row.查扣不法所得金額 || 0).replace(/,/g, '')) || 0,
          blockedVal: Number(String(row.攔阻金額 || 0).replace(/,/g, '')) || 0,
          lossVal: Number(String(row.財損金額 || row.財損 || row.發生財損金額 || 0).replace(/,/g, '')) || 0
        })
      })

      if (globalMaxMIdx > 0) {
        const oneYearStartIdx = globalMaxMIdx - 11 
        let totalSeizedSum = 0
        let totalBlockedSum = 0
        let totalLossSum = 0
        let actualMinIdx = globalMaxMIdx
        let actualMaxIdx = 0
        let validMonthsCount = 0

        parsedRows.forEach(r => {
          if (r.mIdx >= oneYearStartIdx && r.mIdx <= globalMaxMIdx) {
            totalSeizedSum += r.seizedVal
            totalBlockedSum += r.blockedVal
            totalLossSum += r.lossVal
            validMonthsCount++

            if (r.mIdx < actualMinIdx) actualMinIdx = r.mIdx
            if (r.mIdx > actualMaxIdx) actualMaxIdx = r.mIdx
          }
        })

        if (validMonthsCount > 0) {
          const totalEffectSum = totalSeizedSum + totalBlockedSum
          const avgMonthlyYi = (totalEffectSum / validMonthsCount / 100000000).toFixed(1)
          
          const seizedRate = totalLossSum > 0 
            ? ((totalSeizedSum / totalLossSum) * 100).toFixed(2) 
            : '60.85'
            
          const totalSeizedYi = (totalSeizedSum / 100000000).toFixed(1)

          const startY = Math.floor(actualMinIdx / 12) - 1911
          const startM = (actualMinIdx % 12) + 1
          const endY = Math.floor(actualMaxIdx / 12) - 1911
          const endM = (actualMaxIdx % 12) + 1

          crossReport.perfPeriodLabel = `${startY}年${startM}月～${endY}年${endM}月統計`
          crossReport.perfTitle = `全國月均金額${avgMonthlyYi}億元`
          crossReport.perfMainStat = `查扣率達${seizedRate}%(${totalSeizedYi}億元)`
          crossReport.perfDesc = `結合「警示戶與打詐成效」數據：近一年累計查扣與攔阻總額達<strong>${(totalEffectSum / 100000000).toFixed(1)}億元</strong>（其中查扣<strong>${totalSeizedYi}億元</strong>、攔阻<strong>${(totalBlockedSum / 100000000).toFixed(1)}億元</strong>）！若不慎於一頁式網站貨到付款，請於 <strong>24小時內</strong>申請爭議包裹止付！`
        }
      }
    }

    const cardRes = await fetch(
      `${SUPABASE_URL}/rest/v1/credit_card_fraud?select=*&order=年度.desc,月份.desc&limit=2000`,
      { headers }
    )
    if (cardRes.ok) {
      const cardRows = await cardRes.json()
      let maxMIdx = 0
      const parsed = []

      cardRows.forEach(row => {
        let yr = Number(row.年度 || row.年份 || row.年 || 0)
        let mo = Number(row.月份 || row.月 || 0)
        if (yr > 0 && yr < 1911) yr += 1911
        if (yr < 2000 || yr > 2050 || !mo || mo < 1 || mo > 12) return

        const val = Number(String(row.數值 || 0).replace(/,/g, '')) || 0
        const unit = String(row.單位 || '').trim()
        const mIdx = yr * 12 + (mo - 1)

        if (mIdx > maxMIdx) maxMIdx = mIdx
        parsed.push({ mIdx, yr, mo, val, unit })
      })

      if (maxMIdx > 0) {
        const oneYearStartIdx = maxMIdx - 11
        let recentYearMoneySum = 0
        let recentYearCasesSum = 0

        parsed.forEach(r => {
          if (r.mIdx >= oneYearStartIdx && r.mIdx <= maxMIdx && r.val > 0) {
            if (r.unit === '元') recentYearMoneySum += r.val
            else if (r.unit === '筆' || r.unit === '件') recentYearCasesSum += r.val
          }
        })

        if (recentYearMoneySum > 0) {
          crossReport.totalMoneyYi = (recentYearMoneySum / 100000000).toFixed(2)
        }
        if (recentYearCasesSum > 0) {
          crossReport.totalCasesFormatted = `${recentYearCasesSum.toLocaleString()} 筆`
        }
        if (recentYearMoneySum > 0 && recentYearCasesSum > 0) {
          crossReport.avgPerCaseFormatted = Math.round(recentYearMoneySum / recentYearCasesSum).toLocaleString()
        }

        const oyStartY = Math.floor(oneYearStartIdx / 12) - 1911
        const oyStartM = (oneYearStartIdx % 12) + 1
        const oyEndY = Math.floor(maxMIdx / 12) - 1911
        const oyEndM = (maxMIdx % 12) + 1
        crossReport.cardHistoryLabel = `近一年累計 (${oyStartY}年${oyStartM}月 ～ ${oyEndY}年${oyEndM}月)`

        const threeMonthStartIdx = maxMIdx - 2
        let recent3MMoneySum = 0
        let recent3MCasesSum = 0

        parsed.forEach(r => {
          if (r.mIdx >= threeMonthStartIdx && r.mIdx <= maxMIdx && r.val > 0) {
            if (r.unit === '元') recent3MMoneySum += r.val
            else if (r.unit === '筆' || r.unit === '件') recent3MCasesSum += r.val
          }
        })

        if (recent3MMoneySum > 0) {
          crossReport.total3MMoneyYi = (recent3MMoneySum / 100000000).toFixed(2)
        }
        if (recent3MCasesSum > 0) {
          crossReport.total3MCasesFormatted = `${recent3MCasesSum.toLocaleString()} 筆`
        }
        if (recent3MMoneySum > 0 && recent3MCasesSum > 0) {
          crossReport.avg3MPerCaseFormatted = Math.round(recent3MMoneySum / recent3MCasesSum).toLocaleString()
        }

        const t3StartY = Math.floor(threeMonthStartIdx / 12) - 1911
        const t3StartM = (threeMonthStartIdx % 12) + 1
        crossReport.card3MPeriodLabel = `近三個月累計 (${t3StartY}年${t3StartM}月 ～ ${oyEndY}年${oyEndM}月)`
      }
    }
  } catch (err) {
    console.warn('跨頁摘要數據讀取略過:', err)
  }
}

const firstUnansweredId = computed(() => {
  for (const q of tenQuestions) {
    if (quizAnswers[q.id] === undefined || quizAnswers[q.id] === null) {
      return q.id
    }
  }
  return null
})

function scrollToFirstUnanswered() {
  const targetId = firstUnansweredId.value
  if (targetId !== null) {
    const el = document.getElementById('quiz-card-' + targetId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }
}

function switchTab(tab) {
  activeTab.value = tab
}

function selectQuizAnswer(questionId, optionIdx) {
  if (quizAnswers[questionId] === optionIdx) {
    delete quizAnswers[questionId]
  } else {
    quizAnswers[questionId] = optionIdx
  }

  if (Object.keys(quizAnswers).length >= TEN_SCAM_QUESTIONS.length) {
    nextTick(() => {
      if (verdictCardRef.value) {
        verdictCardRef.value.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    })
  }
}

async function runSecurityCrawler() {
  scanErrorMsg.value = ''
  if (!testUrlInput.value) {
    scanErrorMsg.value = '請先輸入或點選上方測試網址！'
    return
  }
  try {
    isScanningUrl.value = true
    const report = await scanUrlSecurityLayer(testUrlInput.value)
    urlScanReport.value = report

    if (report.riskSignals >= 2 && SUPABASE_ANON_KEY && !SUPABASE_ANON_KEY.includes('請替換')) {
      
      // 1. 先用 SELECT 查詢資料庫是否已經有這個網址
      const checkRes = await fetch(`${SUPABASE_URL}/rest/v1/scam_url_reports?hostname=eq.${encodeURIComponent(report.hostname)}&select=id`, {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`
        }
      })

      if (checkRes.ok) {
        const existingData = await checkRes.json()
        
        // 2. 只有在「資料庫找不到這筆網址 (長度為 0)」的情況下，才執行 INSERT
        if (existingData.length === 0) {
          await fetch(`${SUPABASE_URL}/rest/v1/scam_url_reports`, {
            method: 'POST',
            headers: {
              apikey: SUPABASE_ANON_KEY,
              Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
              'Content-Type': 'application/json',
              Prefer: 'return=minimal'
            },
            body: JSON.stringify({
              hostname: report.hostname,
              normalized_url: report.normalizedUrl,
              risk_signals: report.riskSignals,
              search_count: 1 // 既然只記錄第一次，固定給 1 即可
            })
          })
        }
        // 如果 existingData.length > 0 (已有資料)，就略過不處理，達成防護效果
      }
      
      await fetchCrossPageReport()
    }
  } catch (err) {
    scanErrorMsg.value = err.message || '網址解析失敗'
    urlScanReport.value = null
  } finally {
    isScanningUrl.value = false
  }
}

function fillSampleUrl(sampleUrl) {
  testUrlInput.value = sampleUrl
  runSecurityCrawler()
}

function resetAllDetector() {
  testUrlInput.value = ''
  scanErrorMsg.value = ''
  urlScanReport.value = null
  Object.keys(quizAnswers).forEach(k => delete quizAnswers[k])
}

const evaluationResult = computed(() => {
  return evaluateComprehensiveRisk(quizAnswers, urlScanReport.value)
})

onMounted(() => {
  checkRouteTab(true)
  fetchCrossPageReport()
})
</script>
