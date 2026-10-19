// src/utils/scamSecurityScanner.js
// =========================================================================
// 🛡️ 一頁式假網購「網路安全層網站檢測引擎」與「0~100 分雙模式量化判定邏輯」
// =========================================================================

// 1. 高風險免洗頂級網域 (TLD) 黑名單
const HIGH_RISK_TLDS = [
  '.top', '.xyz', '.shop', '.vip', '.icu', '.club', '.cc', '.wang',
  '.site', '.online', '.fun', '.store', '.live', '.buzz', '.cfd', '.sbs', '.cyou', '.pw', '.click'
]

// 2. 國內外知名正規電商與大型品牌網域白名單 (支援主網域與子網域精準比對)
const TRUSTED_GLOBAL_DOMAINS = [
  // 國際主流電商與品牌官網
  'amazon.com', 'amazon.co.jp', 'amazon.co.uk', 'amazon.de',
  'ebay.com', 'rakuten.co.jp', 'rakuten.com.tw', 'mercari.com', 'jp.mercari.com',
  'apple.com', 'nike.com', 'adidas.com', 'uniqlo.com', 'gu-global.com',
  'costco.com', 'costco.com.tw', 'ikea.com', 'ikea.com.tw',
  'iherb.com', 'asos.com', 'farfetch.com', 'ssense.com', 'selfridges.com',
  'gmarket.co.kr', 'oliveyoung.co.kr', 'coupang.com', 'tw.coupang.com',
  'taobao.com', 'tmall.com', 'jd.com', 'pinkoi.com', 'zeczec.com', 'flyingv.cc',
  // 台灣主流電商平台
  'pchome.com.tw', 'momoshop.com.tw', 'shopee.tw', 'books.com.tw',
  'yahoo.com', 'yahoo.com.tw', 'eslite.com', 'etmall.com.tw',
  'friday.tw', 'myfone.com.tw', 'poyabuy.com.tw', 'pxmart.com.tw',
  'carrefour.com.tw', 'tk3c.com', 'isunfar.com.tw', 'lativ.com.tw',
  'obdesign.com.tw', 'pazazzo.com.tw', '50-shop.com', 'kkday.com', 'klook.com'
]

// 3. 嚴格實名審核之各國企業/官方二級網域後綴
const STRICT_CORP_SLDS = [
  '.com.tw', '.org.tw', '.gov.tw', '.edu.tw', '.net.tw',
  '.co.jp', '.ne.jp', '.or.jp', '.go.jp',
  '.co.uk', '.org.uk', '.gov.uk',
  '.co.kr', '.or.kr', '.go.kr',
  '.com.au', '.com.sg', '.com.hk', '.gov'
]

// 4. 免洗詐騙網域常見的誘導組合字 (僅針對非白名單之網域本體檢測)
const SPOOF_DOMAIN_KEYWORDS = [
  'tw-mall', 'twshop', 'tw-buy', 'tw-sale', 'mall88', 'shop88', 'mall99',
  'vip-shop', 'hot-sale', 'outlet-tw', 'off-sale', 'clear-sale'
]

// 5. 常見被詐騙集團放進「假子網域」偽冒的品牌字眼
const BRAND_SPOOF_TOKENS = [
  'amazon', 'pchome', 'momo', 'shopee', 'rakuten', 'costco', 'apple', 'nike', 'adidas', 'uniqlo', 'eslite', 'books'
]

// 6. 一頁式詐騙網頁原始碼 (DOM/Script) 常見特徵碼
const SCAM_HTML_SIGNATURES = [
  { regex: /貨到付款|僅限貨到|超商取貨付款/i, label: '強制貨到付款表單特徵' },
  { regex: /setInterval\s*\(|countdown|timer|倒數|剩餘時間/i, label: '動態假倒數計時器腳本' },
  { regex: /marquee|剛剛.*購買|已搶購|最新訂單/i, label: '偽造即時購買跑馬燈腳本' },
  { regex: /包郵|質量|親|支持7天無理由|在線客服/i, label: '跨境簡體轉繁體電商模板用語' }
]

/**
 * 輔助函式：從完整 hostname 提取真實註冊根網域 (Root Domain) 與主標籤
 */
function parseDomainParts(hostname) {
  const cleanHost = hostname.replace(/^www\./i, '')
  const parts = cleanHost.split('.')
  if (parts.length <= 2) {
    return {
      cleanHost,
      rootDomain: cleanHost,
      mainLabel: parts[0] || '',
      subPart: ''
    }
  }

  // 檢查是否為 .com.tw / .co.jp 等雙層地區後綴
  const lastTwo = '.' + parts.slice(-2).join('.')
  const isTwoLevelTld = STRICT_CORP_SLDS.includes(lastTwo) || ['.com.cn', '.com.my'].includes(lastTwo)

  if (isTwoLevelTld && parts.length >= 3) {
    return {
      cleanHost,
      rootDomain: parts.slice(-3).join('.'),
      mainLabel: parts[parts.length - 3],
      subPart: parts.slice(0, -3).join('.')
    }
  }

  return {
    cleanHost,
    rootDomain: parts.slice(-2).join('.'),
    mainLabel: parts[parts.length - 2],
    subPart: parts.slice(0, -2).join('.')
  }
}

/**
 * 輔助函式：檢查是否屬於白名單知名網域
 */
function isTrustedDomain(hostname) {
  return TRUSTED_GLOBAL_DOMAINS.some(
    domain => hostname === domain || hostname.endsWith('.' + domain)
  )
}

/**
 * 1. 核心網址安全層網站檢測與 0~100 分量化評估函式
 */
export async function scanUrlSecurityLayer(rawUrl) {
  let cleanInput = String(rawUrl || '').trim()
  if (!cleanInput) {
    throw new Error('請輸入欲檢測的購物網址！')
  }

  const hasProtocol = /^https?:\/\//i.test(cleanInput)
  const isHttpInsecure = /^http:\/\//i.test(cleanInput)
  if (!hasProtocol) {
    cleanInput = 'https://' + cleanInput
  }

  let parsedUrl
  try {
    parsedUrl = new URL(cleanInput)
  } catch {
    throw new Error('網址格式不正確，請輸入完整網址（例如：https://www.amazon.com）')
  }

  const hostname = parsedUrl.hostname.toLowerCase()
  const pathname = parsedUrl.pathname.toLowerCase()
  const { cleanHost, rootDomain, mainLabel, subPart } = parseDomainParts(hostname)

  const checks = []
  let riskSignals = 0
  let rawUrlRiskScore = 0 // 網址風險累計分數 (0 ~ 100)

  const isKnownTrusted = isTrustedDomain(hostname)
  const matchedStrictSld = STRICT_CORP_SLDS.find(sld => hostname.endsWith(sld))
  const matchedRiskTld = HIGH_RISK_TLDS.find(tld => hostname.endsWith(tld))

  // -----------------------------------------------------------------------
  // [檢測層 1] 傳輸加密層 (SSL/TLS)
  // -----------------------------------------------------------------------
  if (isHttpInsecure) {
    riskSignals += 2
    rawUrlRiskScore += 25
    checks.push({
      layer: '傳輸加密層 (SSL/TLS)',
      type: 'danger',
      title: '危險',
      detail: '使用不安全的 HTTP 明文傳輸，未具備 SSL 憑證加密保護，輸入資料極易遭竊聽'
    })
  } else if (isKnownTrusted || matchedStrictSld) {
    checks.push({
      layer: '傳輸加密層 (SSL/TLS)',
      type: 'safe',
      title: '正常',
      detail: '具備標準 HTTPS 加密傳輸，且網域屬於受信任之企業或官方商務網站'
    })
  } else {
    rawUrlRiskScore += 5
    checks.push({
      layer: '傳輸加密層 (SSL/TLS)',
      type: 'warn',
      title: '警示',
      detail: '具備基礎 HTTPS 加密（注意：詐騙網站亦常申請免費 DV 憑證，有鎖頭圖示不代表是正牌廠商）'
    })
  }

  // -----------------------------------------------------------------------
  // [檢測層 2] 頂級網域信譽與國際電商白名單驗證 (TLD & Whitelist)
  // -----------------------------------------------------------------------
  if (isKnownTrusted) {
    checks.push({
      layer: '網域信譽與白名單驗證',
      type: 'safe',
      title: '正常',
      detail: `已確認為國內外知名正規電商／官方網域（${rootDomain}）`
    })
  } else if (matchedRiskTld) {
    riskSignals += 2
    rawUrlRiskScore += 30
    checks.push({
      layer: '頂級網域信譽層 (TLD)',
      type: 'danger',
      title: '危險',
      detail: `命中高風險免洗網域後綴「${matchedRiskTld}」，此類網域免企業實名且常被用於一頁式詐騙`
    })
  } else if (matchedStrictSld) {
    checks.push({
      layer: '頂級網域信譽層 (TLD)',
      type: 'safe',
      title: '正常',
      detail: `屬於嚴格審核之國家級企業／機構網域（${matchedStrictSld}），需具備當地統編或法人資格始可申請`
    })
  } else {
    rawUrlRiskScore += 10
    checks.push({
      layer: '頂級網域信譽層 (TLD)',
      type: 'warn',
      title: '警示',
      detail: `使用一般國際通用商業網域（${rootDomain}），個人即可註冊，請搭配下方網域年齡與問卷綜合查驗`
    })
  }

  // -----------------------------------------------------------------------
  // [檢測層 3] 子網域偽冒 (Subdomain Spoofing) 與亂碼命名分析
  // -----------------------------------------------------------------------
  if (!isKnownTrusted) {
    const spoofedBrand = BRAND_SPOOF_TOKENS.find(brand => cleanHost.includes(brand))
    const hasRandomAlphaNum =
      /[a-z]+[0-9]{2,}|[0-9]{2,}[a-z]+/i.test(mainLabel) ||
      /[a-z]+[0-9]{2,}|[0-9]{2,}[a-z]+/i.test(subPart) ||
      cleanHost.split('-').length >= 3
    const hasSpoofKeyword = SPOOF_DOMAIN_KEYWORDS.some(kw => cleanHost.includes(kw) || pathname.includes(kw))

    if (spoofedBrand) {
      riskSignals += 3
      rawUrlRiskScore += 40
      checks.push({
        layer: '品牌偽冒與釣魚結構分析',
        type: 'danger',
        title: '危險',
        detail: `高度疑似偽冒釣魚！網址夾帶知名品牌「${spoofedBrand}」，但真實主網域卻是「${rootDomain}」而非官方網站`
      })
    } else if (hasRandomAlphaNum || hasSpoofKeyword) {
      riskSignals += 1
      rawUrlRiskScore += 20
      checks.push({
        layer: '網址命名語意與亂碼分析',
        type: 'danger',
        title: '危險',
        detail: `網域含隨機英數編號或促銷誘導字眼 (${cleanHost})，符合詐騙集團批量生成之免洗跳板特徵`
      })
    } else {
      checks.push({
        layer: '網址命名語意與亂碼分析',
        type: 'safe',
        title: '正常',
        detail: `網域命名結構簡潔 (${rootDomain})，未發現明顯亂碼編號或假冒子網域特徵`
      })
    }
  } else {
    checks.push({
      layer: '網址命名語意與亂碼分析',
      type: 'safe',
      title: '正常',
      detail: `官方標準網域結構 (${hostname})，無子網域偽冒風險`
    })
  }

  // -----------------------------------------------------------------------
  // [檢測層 4] DNS 解析層網站檢測 (Google DoH)
  // -----------------------------------------------------------------------
  try {
    const dnsRes = await fetch(`https://dns.google/resolve?name=${encodeURIComponent(hostname)}&type=A`)
    if (dnsRes.ok) {
      const dnsData = await dnsRes.json()
      if (dnsData.Status === 0 && Array.isArray(dnsData.Answer) && dnsData.Answer.length > 0) {
        if (isKnownTrusted || matchedStrictSld) {
          checks.push({
            layer: 'DNS 解析與伺服器狀態',
            type: 'safe',
            title: '正常',
            detail: '網域具備合法且穩定之正式商業 DNS 解析紀錄'
          })
        } else {
          rawUrlRiskScore += 5
          checks.push({
            layer: 'DNS 解析與代理跳板層',
            type: 'warn',
            title: '警示',
            detail: '網域處於活躍解析狀態（提醒：跨境一頁式廣告常透過 Cloudflare 等免費 CDN 隱藏真實境外主機 IP）'
          })
        }
      } else {
        riskSignals += 2
        rawUrlRiskScore += 25
        checks.push({
          layer: 'DNS 解析與代理跳板層',
          type: 'danger',
          title: '危險',
          detail: '查無正常 A 紀錄 (NXDOMAIN)，該網址可能為虛構網址或已遭通報封鎖下架'
        })
      }
    }
  } catch {
    rawUrlRiskScore += 10
    checks.push({
      layer: 'DNS 解析與代理跳板層',
      type: 'warn',
      title: '警示',
      detail: '目標 DNS 回應逾時或阻擋外部查詢'
    })
  }

  // -----------------------------------------------------------------------
  // [檢測層 5] WHOIS / RDAP 網域註冊存活年齡 (必須查詢 rootDomain 才不會 404)
  // -----------------------------------------------------------------------
  try {
    const rdapRes = await fetch(`https://rdap.org/domain/${encodeURIComponent(rootDomain)}`, {
      headers: { Accept: 'application/rdap+json' }
    })
    if (rdapRes.ok) {
      const rdapData = await rdapRes.json()
      const regEvent = (rdapData.events || []).find(e => e.eventAction === 'registration')
      if (regEvent && regEvent.eventDate) {
        const regDate = new Date(regEvent.eventDate)
        const ageDays = Math.floor((Date.now() - regDate.getTime()) / (1000 * 60 * 60 * 24))
        const regDateStr = regDate.toISOString().slice(0, 10)

        if (ageDays <= 180) {
          riskSignals += 2
          rawUrlRiskScore += 30
          checks.push({
            layer: 'WHOIS / RDAP 網域存活年齡',
            type: 'danger',
            title: '危險',
            detail: `極高危警報！主網域 (${rootDomain}) 僅註冊成立 ${ageDays} 天（註冊日：${regDateStr}），屬於典型免洗詐騙網域`
          })
        } else if (ageDays <= 365) {
          riskSignals += 1
          rawUrlRiskScore += 15
          checks.push({
            layer: 'WHOIS / RDAP 網域存活年齡',
            type: 'warn',
            title: '警示',
            detail: `主網域 (${rootDomain}) 註冊未滿一年（約 ${ageDays} 天，註冊日：${regDateStr}），建議提高警覺`
          })
        } else {
          const years = (ageDays / 365).toFixed(1)
          checks.push({
            layer: 'WHOIS / RDAP 網域存活年齡',
            type: 'safe',
            title: '正常',
            detail: `主網域 (${rootDomain}) 已註冊成立約 ${years} 年（註冊日：${regDateStr}），非近期臨時註冊之免洗網域`
          })
        }
      }
    }
  } catch {
    // 部分國家級 ccTLD 未開放公開 RDAP 查詢，自動略過
  }

  // -----------------------------------------------------------------------
  // [檢測層 6] 網頁原始碼特徵網站檢測 (僅針對非白名單網域進行掃描)
  // -----------------------------------------------------------------------
  if (!isKnownTrusted) {
    try {
      const controller = new AbortController()
      const timer = setTimeout(() => controller.abort(), 3500)
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(cleanInput)}`
      const htmlRes = await fetch(proxyUrl, { signal: controller.signal })
      clearTimeout(timer)

      if (htmlRes.ok) {
        const htmlJson = await htmlRes.json()
        const htmlContent = String(htmlJson.contents || '')
        if (htmlContent.length > 100) {
          const hitSigs = []
          SCAM_HTML_SIGNATURES.forEach(sig => {
            if (sig.regex.test(htmlContent)) {
              hitSigs.push(sig.label)
            }
          })
          if (hitSigs.length > 0) {
            riskSignals += 2
            rawUrlRiskScore += 25
            checks.push({
              layer: '網頁原始碼 (DOM) 網站檢測',
              type: 'danger',
              title: '危險',
              detail: `於網頁原始碼中偵測到一頁式詐騙特徵：【${hitSigs.join('、')}】`
            })
          }
        }
      }
    } catch {
      // 目標網站阻擋時靜默略過，不影響使用者體驗
    }
  }

  // 若為知名白名單且使用安全 HTTPS，網址風險分數歸零；否則限制在 0 ~ 100 分之間
  const urlScore = (isKnownTrusted && !isHttpInsecure)
    ? 0
    : Math.min(100, Math.max(0, rawUrlRiskScore))

  return {
    hostname,
    rootDomain,
    normalizedUrl: cleanInput,
    isKnownTrusted,
    riskSignals,
    urlScore, // 🌟 網址檢測風險分數 (0 ~ 100 分)
    checks
  }
}

export const TEN_SCAM_QUESTIONS = [
  {
    id: 1,
    category: '來源管道',
    question: '1.您是從哪裡點進這個購物網頁的？',
    options: [
      { label: '從FB/IG/LINE/抖音的「贊助廣告」或限時動態點入', isSuspicious: true },
      { label: '自己從Google搜尋品牌官方網站或開啟官方 App', isSuspicious: false },
      { label: '從親友傳來的轉發連結或陌生簡訊點入', isSuspicious: true }
    ]
  },
  {
    id: 2,
    category: '網站結構',
    question: '2.點擊網頁頂部的「品牌 Logo」或「商品分類選單」時，能否正常切換到其他頁面？',
    options: [
      { label: '具備完整首頁、商品分類、搜尋欄、會員登入與購物車系統', isSuspicious: false },
      { label: '有幾個按鈕，但點進去全部都是同一個商品或空白頁', isSuspicious: true },
      { label: '完全沒有選單，或點了沒反應，整站只有「一頁滑到底」直接填表單', isSuspicious: true }
    ]
  },
  {
    id: 3,
    category: '價格折扣',
    question: '3.該商品的售價與促銷方式為何？',
    options: [
      { label: '原價數千上萬元，現在「下殺1～2折（約$990~$1,580）」還買一送一', isSuspicious: true },
      { label: '標榜「百貨撤櫃清倉、老闆跑路、海關扣押品出清」低於市價5折以下', isSuspicious: true },
      { label: '價格與一般市價或專櫃定價相當（正常85折～95折促銷）', isSuspicious: false }
    ]
  },
  {
    id: 4,
    category: '付款方式',
    question: '4.結帳時網頁提供哪些付款方式？',
    options: [
      { label: '支援信用卡、Apple Pay、LINE Pay及第三方履約保障支付', isSuspicious: false },
      { label: '只要求私訊加 LINE客服匯款，或跳轉到畫面簡陋的可疑刷卡頁', isSuspicious: true },
      { label: '「只能選貨到付款」（超商取貨付款或宅配代收），完全沒有其他選項', isSuspicious: true }
    ]
  },
  {
    id: 5,
    category: '飢餓行銷',
    question: '5.網頁上是否有「倒數計時器（如剩14分鐘）」或「僅剩最後3組」？試著按重新整理看看！',
    options: [
      { label: '有倒數計時器，而且「重新整理網頁後，倒數時間又從頭開始跳」！', isSuspicious: true },
      { label: '顯示「今日已售出98%/僅剩最後幾組」，催促立即搶購', isSuspicious: true },
      { label: '沒有誇張的假倒數計時器', isSuspicious: false }
    ]
  },
  {
    id: 6,
    category: '社交工程',
    question: '6.畫面角落是否不斷跳出「剛剛 臺中陳先生已搶購2組」跑馬燈與滿滿五星好評？',
    options: [
      { label: '每隔幾秒就跳出某先生/小姐剛下單的跑馬燈，底部全是罐頭好評且無法留言', isSuspicious: true },
      { label: '真實買家評價（有好有壞）或正常商品介紹', isSuspicious: false },
      { label: '評論區照片看起來像淘寶買家秀，或帶有中國用語（如：發貨快、質量好）', isSuspicious: true }
    ]
  },
  {
    id: 7,
    category: '企業揭露',
    question: '7.滑到網頁最底部（Footer），是否有清楚列出「公司名稱、統一編號/商業登記、實體地址與客服電話」？',
    options: [
      { label: '底部一片空白，或只有一個「LINE客服按鈕/電子信箱」，完全沒統編與市話', isSuspicious: true },
      { label: '有寫地址或統編，但去Google地圖一查發現是民宅、空地或盜用別家公司統編', isSuspicious: true },
      { label: '清楚標示合法企業全銜、統一編號（或跨國企業認證資訊）、實體地址與客服專線', isSuspicious: false }
    ]
  },
  {
    id: 8,
    category: '名人盜圖',
    question: '8.網頁內容是否大量使用「電視新聞採訪畫面、知名藝人/名醫照片」或募資平台影片？',
    options: [
      { label: '品牌原創商品圖文，無盜用新聞台與名人肖像', isSuspicious: false },
      { label: '圖片畫質模糊、繁簡字體混雜（出現：包郵、親、支持7天無理由退換）', isSuspicious: true },
      { label: '拼貼新聞台主播畫面、名醫/藝人合照，宣稱「感謝各大媒體爭相報導」', isSuspicious: true }
    ]
  },
  {
    id: 9,
    category: '粉專查核',
    question: '9.若是從FB粉專看到的，點開該粉專的「關於➔粉絲專頁資訊透明度」查看結果為何？',
    options: [
      { label: '粉專名稱跟大品牌很像（如：XX台灣特賣店），但沒有藍勾勾且貼文只有寥寥幾篇', isSuspicious: true },
      { label: '粉專是「最近幾個月內剛成立」、按讚數極少，或管理員包含境外地區（香港/越南/中國等）', isSuspicious: true },
      { label: '成立多年的官方認證粉專，貼文互動正常且具官方客服聯絡方式', isSuspicious: false }
    ]
  },
  {
    id: 10,
    category: '交叉比價',
    question: '10.將該「商品名稱」複製到Google搜尋後，結果如何？',
    options: [
      { label: '找不到任何台灣正式代理商資訊，只有好幾個長得一模一樣的一頁式網站', isSuspicious: true },
      { label: '搜尋到正牌廠商發出的「防詐騙聲明」，或發現正版官網售價貴上好幾倍！', isSuspicious: true },
      { label: '與官方網站、Amazon、Momo、PChome等大型電商平台的活動價格一致', isSuspicious: false }
    ]
  }
]

/**
 * 2. 十題全部做完才進行 0~100 分計算與診斷
 *    - 狀況 1 (有輸入網址搜尋)：綜合分數 = 網址檢測分數 (50%) + 問卷分數 (50%)
 *    - 狀況 2 (沒輸入網址搜尋)：綜合分數 = 問卷分數 (100%，每題 10 分)
 */
export function evaluateComprehensiveRisk(answersMap, urlScanResult) {
  const answeredCount = Object.keys(answersMap).length
  const totalQuestions = TEN_SCAM_QUESTIONS.length
  const isComplete = answeredCount >= totalQuestions
  const hasUrlScan = Boolean(urlScanResult && typeof urlScanResult.urlScore === 'number')

  if (!isComplete) {
    return {
      isComplete: false,
      hasUrlScan,
      answeredCount,
      totalQuestions,
      totalScore: 0,
      quizScore: 0,
      urlScore: hasUrlScan ? urlScanResult.urlScore : null,
      badgeText: '作答中...',
      title: `⏳ 請完成全部 10 道檢核題目（目前已答 ${answeredCount}/10 題）`,
      bannerGradient: 'linear-gradient(135deg, #1e3a8a, #2563eb)',
      advice: '請將上方 10 道防詐檢核題目全部點選完畢，系統將自動以 0～100 分為您計算綜合詐騙風險指數！',
      triggeredWarnings: []
    }
  }

  // 計算問卷分數 (10 題，每命中 1 題危險特徵 +10 分，範圍 0 ~ 100 分)
  let suspiciousQuizCount = 0
  const triggeredWarnings = []

  TEN_SCAM_QUESTIONS.forEach(q => {
    const selectedIdx = answersMap[q.id]
    if (selectedIdx !== undefined && q.options[selectedIdx]) {
      const opt = q.options[selectedIdx]
      if (opt.isSuspicious) {
        suspiciousQuizCount++
        triggeredWarnings.push(`【${q.category}】${opt.label.replace(/^[🚨⚠️]\s*/, '')}`)
      }
    }
  })

  const quizScore = Math.min(100, suspiciousQuizCount * 10)
  const urlScore = hasUrlScan ? urlScanResult.urlScore : null

  // 🌟 根據「有無輸入網址」決定 0 ~ 100 總分計算方式
  let totalScore = 0
  let scoreBreakdownText = ''

  if (hasUrlScan) {
    // 狀況 1：有輸入網址搜尋 ➔ 網址分數 (50%) + 問卷分數 (50%)
    totalScore = Math.round(urlScore * 0.5 + quizScore * 0.5)
    scoreBreakdownText = `【雙重檢測模式】綜合風險指數：${totalScore} / 100 分（網址檢測 ${urlScore} 分 × 50% ＋ 問卷檢測 ${quizScore} 分 × 50%）`
  } else {
    // 狀況 2：沒輸入網址搜尋 ➔ 只算問卷分數 (100%)
    totalScore = quizScore
    scoreBreakdownText = `【純問卷檢測模式】綜合風險指數：${totalScore} / 100 分（未輸入網址，100% 依 10 題問卷結果計算）`
  }

  // 依據 0 ~ 100 分判定風險區間 (>= 50 極高風險、>= 30 中高度可疑、< 30 低度風險)
  let badgeText = `低度風險 (${totalScore} 分)`
  let title = `✅ 詐騙風險指數：${totalScore} / 100 分（目前風險較低）`
  let bannerGradient = 'linear-gradient(135deg, #065f46, #059669)'
  let advice = `${scoreBreakdownText}。在您檢測的項目中，尚未發現明顯的一頁式假網購高風險特徵。若該網站為 Amazon、eBay、樂天或 PChome 等大型平台，請留意「平台內第三方個人賣家」之評價與出貨紀錄，並堅持於平台系統內完成付款，切勿私下加 LINE 交易！`

  if (totalScore >= 50) {
    badgeText = `極高風險 (${totalScore} 分)`
    title = `🚨 詐騙風險指數：${totalScore} / 100 分（極高風險！典型一頁式假網購）`
    bannerGradient = 'linear-gradient(135deg, #991b1b, #dc2626)'
    advice = `${scoreBreakdownText}。系統判定此購物網頁極可能為詐騙集團架設之「一頁式假網購」！請立刻關閉網頁，切勿填寫姓名、電話與地址。若已下單但尚未到貨，請直接「拒收／不領取包裹」；若已取貨付款，請立即依下方 SOP 申請退貨止付！`
  } else if (totalScore >= 30) {
    badgeText = `中高度可疑 (${totalScore} 分)`
    title = `⚠️ 詐騙風險指數：${totalScore} / 100 分（高度可疑！建議先至官網查證）`
    bannerGradient = 'linear-gradient(135deg, #b45309, #ea580c)'
    advice = `${scoreBreakwoodText || scoreBreakdownText}。該購物網頁已符合多項一頁式詐騙常見的紅旗指標！強烈建議先不要在此頁面填單，請直接打開 Google 搜尋該品牌的官方網站或至大型知名電商平台比價查證。`
  }

  return {
    isComplete: true,
    hasUrlScan,
    answeredCount,
    totalQuestions,
    totalScore,         // 🌟 最終 0~100 總分
    quizScore,          // 🌟 問卷 0~100 分數
    urlScore,           // 🌟 網址 0~100 分數 (若未測網址則為 null)
    scoreBreakdownText, // 🌟 計分公式說明文字
    badgeText,
    title,
    bannerGradient,
    advice,
    triggeredWarnings
  }
}