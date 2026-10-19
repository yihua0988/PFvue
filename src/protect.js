/* =========================================================================
 * 🛡️ 平衡級 protect.js (核心環境指紋反爬蟲 + SEO 白名單 + 禁止文字選取)
 *    - 已放寬檢測：移除背景分頁誤判與內建瀏覽器誤判
 *    - 增加本地開發白名單：localhost 不受干擾
 *    - 專注獵殺 Selenium / Puppeteer / Playwright 等自動化腳本
 * ========================================================================= */
(function() {
    'use strict';

    // ---------------------------------------------------------------------
    // 1. 動態注入 CSS：禁止全站選取文字（不擋右鍵與 F12 快捷鍵）
    // ---------------------------------------------------------------------
    const injectNoSelectCSS = () => {
        const style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = `
            body, html {
                -webkit-user-select: none !important;
                -moz-user-select: none !important;
                -ms-user-select: none !important;
                user-select: none !important;
            }
            /* 保留輸入框可正常打字與選取（避免影響您的網址檢測輸入框） */
            input, textarea {
                -webkit-user-select: text !important;
                -moz-user-select: text !important;
                -ms-user-select: text !important;
                user-select: text !important;
            }
        `;
        document.head.appendChild(style);
    };
    injectNoSelectCSS();

    // ---------------------------------------------------------------------
    // 2. 防網頁被第三方惡意 iframe 嵌入 (Clickjacking 點擊劫持防護)
    // ---------------------------------------------------------------------
    if (window.top !== window.self) {
        try {
            window.top.location = window.self.location;
        } catch (e) {
            document.documentElement.innerHTML = '';
        }
    }

    // ---------------------------------------------------------------------
    // 3. 定義「合法搜尋引擎與社群預覽」白名單 (SEO 專用通道)
    // ---------------------------------------------------------------------
    const SEO_WHITELIST_REGEX = new RegExp([
        'Googlebot', 'Google-InspectionTool', 'Storebot-Google', 'GoogleOther',
        'APIs-Google', 'Mediapartners-Google', 'AdsBot-Google',
        'bingbot', 'adidxbot', 'MicrosoftPreview',
        'Slurp',               // Yahoo
        'DuckDuckBot',         // DuckDuckGo
        'Baiduspider',         // 百度
        'YandexBot',           // Yandex
        'Sogou',               // 搜狗
        'Applebot',            // Apple Siri / Spotlight
        'facebookexternalhit', 'Facebot', // FB 連結預覽
        'Line-Poker',          // LINE 分享連結預覽
        'Twitterbot',          // X (Twitter) 連結預覽
        'LinkedInBot',
        'Discordbot',
        'TelegramBot'
    ].join('|'), 'i');

    // ---------------------------------------------------------------------
    // 4. 定義「惡意爬蟲、HTTP 請求庫、自動化工具與 AI 抓取器」黑名單
    // ---------------------------------------------------------------------
    const BAD_UA_BLACKLIST_REGEX = new RegExp([
        // 無頭瀏覽器與自動化渲染器
        'HeadlessChrome', 'Headless', 'PhantomJS', 'SlimerJS', 'Nightmare',
        'Electron', 'Cypress', 'Playwright', 'Puppeteer', 'Selenium', 'WebDriver',
        'Splash', 'HtmlUnit', 'Zombie', 'CasperJS',
        // 程式語言 HTTP 請求庫與命令列工具
        'Python', 'urllib', 'requests', 'aiohttp', 'httpx', 'pycurl', 'Scrapy',
        'Java/', 'Apache-HttpClient', 'OkHttp', 'HttpURLConnection', 'Jsoup',
        'Go-http-client', 'colly', 'fasthttp',
        'node-fetch', 'axios', 'got/', 'undici', 'superagent',
        'curl/', 'wget/', 'libwww-perl', 'Ruby', 'PHP/', ' GuzzleHttp', 'CSharp', 'RestSharp',
        'PostmanRuntime', 'Insomnia', 'Dalvik',
        // 商業爬蟲與資料收割機器人
        'AhrefsBot', 'SemrushBot', 'MJ12bot', 'DotBot', 'PetalBot', 'Bytespider',
        'BLEXBot', 'DataForSeoBot', 'MegaIndex', 'SeekportBot', 'ZoominfoBot',
        // 未經授權之資料集爬蟲
        'CCBot', 'Diffbot', 'omgili'
    ].join('|'), 'i');

    // ---------------------------------------------------------------------
    // 5. 核心反爬蟲檢測引擎 (已放寬規則，減少誤殺)
    // ---------------------------------------------------------------------
    function runDeepAntiCrawler() {
        const hostname = window.location.hostname;
        
        // 🌟 [新增] 放寬層：本地開發環境與本地檔案直接豁免，不執行任何阻斷！
        if (
            hostname === 'localhost' || 
            hostname === '127.0.0.1' || 
            hostname.includes('192.168.') || 
            hostname === ''
        ) {
            return; 
        }

        const ua = navigator.userAgent || '';
        const appVersion = navigator.appVersion || '';

        // [第 0 層] User-Agent 基本檢查與 SEO 白名單判別
        if (!ua || ua.trim().length < 15) {
            return triggerBlock('ERR_EMPTY_OR_FORGED_UA');
        }

        if (SEO_WHITELIST_REGEX.test(ua)) {
            if (hasAutomationGlobals()) {
                return triggerBlock('ERR_FAKE_SEOBOT_WITH_DRIVER');
            }
            return; // 合法搜尋引擎直接放行
        }

        // [第 1 層] User-Agent 與 UA-CH (Client Hints) 黑名單攔截
        if (BAD_UA_BLACKLIST_REGEX.test(ua) || BAD_UA_BLACKLIST_REGEX.test(appVersion)) {
            return triggerBlock('ERR_BLACKLISTED_USER_AGENT');
        }

        if (navigator.userAgentData && Array.isArray(navigator.userAgentData.brands)) {
            const brandStr = navigator.userAgentData.brands.map(b => b.brand).join(' ');
            if (/Headless|Chromium.*Automation|Playwright|Puppeteer/i.test(brandStr)) {
                return triggerBlock('ERR_UACH_HEADLESS_BRAND');
            }
        }

        // [第 2 層] WebDriver 標準屬性檢測
        if (navigator.webdriver === true) {
            return triggerBlock('ERR_NAVIGATOR_WEBDRIVER_TRUE');
        }

        try {
            if (Object.prototype.hasOwnProperty.call(navigator, 'webdriver')) {
                return triggerBlock('ERR_WEBDRIVER_PROPERTY_TAMPERED');
            }
            const desc = Object.getOwnPropertyDescriptor(Navigator.prototype, 'webdriver');
            if (desc && desc.get && !desc.get.toString().includes('[native code]')) {
                return triggerBlock('ERR_WEBDRIVER_GETTER_HOOKED');
            }
        } catch (e) {}

        // [第 3 層] 12 大自動化框架底層全域變數殘留掃描 (核心獵殺區)
        if (hasAutomationGlobals()) {
            return triggerBlock('ERR_AUTOMATION_FRAMEWORK_GLOBALS');
        }

        // [第 4 層] 瀏覽器特徵檢查 (已移除過度嚴苛的視窗 0 尺寸檢查與 chrome 物件檢查)
        if (!navigator.languages || navigator.languages.length === 0) {
            return triggerBlock('ERR_EMPTY_LANGUAGES');
        }

        // [第 5 層] WebGL 虛擬顯卡與軟體渲染器指紋檢測
        try {
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            if (gl) {
                const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
                if (debugInfo) {
                    const vendor = String(gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) || '');
                    const renderer = String(gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || '');
                    if (/SwiftShader|SubZero|Offscreen|Brian Paul/i.test(renderer) && /Google|Brian Paul/i.test(vendor)) {
                        return triggerBlock('ERR_HEADLESS_WEBGL_SWIFTSHADER');
                    }
                }
            }
        } catch (e) {}
    }

    // ---------------------------------------------------------------------
    // 輔助函式：掃描所有主流自動化框架注入在 window / document 的隱藏變數
    // ---------------------------------------------------------------------
    function hasAutomationGlobals() {
        const suspiciousWindowKeys = [
            '__playwright', '__pw_manual', '_Selenium_IDE_Recorder', '_selenium',
            'calledSelenium', '__webdriver_evaluate', '__selenium_evaluate',
            '__webdriver_script_function', '__webdriver_script_func', '__webdriver_script_fn',
            '__fxdriver_evaluate', '__driver_unwrapped', '__webdriver_unwrapped',
            '__driver_evaluate', '__selenium_unwrapped', '__fxdriver_unwrapped',
            'callPhantom', '_phantom', '__phantomas', '__nightmare',
            'Cypress', 'domAutomation', 'domAutomationController'
        ];

        for (let i = 0; i < suspiciousWindowKeys.length; i++) {
            if (suspiciousWindowKeys[i] in window) return true;
        }

        const globalPropRegex = /^(cdc_[a-zA-Z0-9]+|\$cdc_[a-zA-Z0-9]+|\$chrome_asyncScriptInfo|__\$webdriverAsyncExecutor)$/;
        try {
            const winProps = Object.getOwnPropertyNames(window);
            for (let i = 0; i < winProps.length; i++) {
                if (globalPropRegex.test(winProps[i])) return true;
            }
            const docProps = Object.getOwnPropertyNames(document);
            for (let i = 0; i < docProps.length; i++) {
                if (globalPropRegex.test(docProps[i])) return true;
            }
        } catch (e) {}

        if (document.documentElement) {
            const attrs = ['webdriver', 'selenium', 'driver'];
            for (let i = 0; i < attrs.length; i++) {
                if (document.documentElement.getAttribute(attrs[i]) !== null) return true;
            }
        }

        return false;
    }

    // ---------------------------------------------------------------------
    // 6. 觸發攔截：銷毀 DOM 並拋出異常終止後續 JS 執行
    // ---------------------------------------------------------------------
    function triggerBlock(code) {
        try {
            window.stop && window.stop();
        } catch (e) {}

        document.documentElement.innerHTML = `
            <head>
                <meta charset="UTF-8">
                <title>403 Forbidden - Security Defense Center</title>
            </head>
            <body style="background:#090d16; color:#f8fafc; font-family:system-ui,-apple-system,sans-serif; display:flex; justify-content:center; align-items:center; height:100vh; margin:0;">
                <div style="background:#1e293b; border:1px solid #ef4444; border-radius:16px; padding:40px; max-width:520px; text-align:center; box-shadow:0 20px 50px rgba(0,0,0,0.6);">
                    <div style="font-size:48px; margin-bottom:12px;">🛡️</div>
                    <h1 style="color:#f87171; font-size:26px; margin:0 0 12px 0;">403 Access Denied</h1>
                    <p style="color:#cbd5e1; font-size:16px; line-height:1.6; margin:0 0 20px 0;">
                        系統偵測到自動化爬蟲或異常的瀏覽器環境指紋，已主動阻斷連線以保護研究數據。
                    </p>
                    <div style="background:#0f172a; color:#38bdf8; font-family:monospace; font-size:13px; padding:10px; border-radius:8px; border:1px solid #334155;">
                        DEFENSE_SIGNATURE: ${code}
                    </div>
                </div>
            </body>
        `;
        throw new Error('[CyberDefense] Blocked automated client: ' + code);
    }

    // 立即執行第一波檢測，並於 DOM 載入完成後執行二次複檢
    runDeepAntiCrawler();
    document.addEventListener('DOMContentLoaded', runDeepAntiCrawler, { once: true });
})();