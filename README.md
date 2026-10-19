#🛡️2026詐騙防制資料分析與深度研究
**Taiwan Anti-Fraud Data Analysis&Research Project**

![Vue.js](https://img.shields.io/badge/Vue.js-3.0-4FC08D?style=for-the-badge&logo=vue.js)
![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript)
![Open Data](https://img.shields.io/badge/Open_Data-Taiwan-0284c7?style=for-the-badge)
![Security](https://img.shields.io/badge/Security-Anti--Crawler-dc2626?style=for-the-badge)

本專案是一個結合政府開放資料（Open Data、AI新型態犯罪拆解與零信任（Zero Trust）防禦觀念的防詐教育專題網站。旨在透過前端工程與資料視覺化技術，將龐雜的詐騙案例與資安觀念，轉化為大眾易讀、易懂的實戰防護指南。

🔗**[點此觀看網站Live Demo](https://yihua0988.github.io/PFvue/)**
📝**[專題簡報PPT檔案連結](https://github.com/yihua0988/PFvue/tree/main/ppt)**

---

##🎯核心研究模組(Core Modules)

本專案聚焦於以下四大核心防詐研究維度：

1.📊**歷年數據分析＆一頁式網購拆解**
   - 視覺化台灣近年詐欺趨勢與攔阻成效。
   - 剖析詐騙集團如何利用社群像素追蹤（Pixel Tracking）與「幽靈包裹」製造金流斷點。
   - 內建實用的「雙模式網購風險量化引擎」（詳見下方亮點）。
2.📰**重大科技詐騙新聞案例探討**
   - 探討AI深偽語音克隆（Voice Cloning）技術的濫用。
   - 解構全球虛擬貨幣詐騙激增趨勢，以及黑幫跨國水房的洗錢模型。
3.🎬**官方防詐宣導影音整合**
   - 彙整警政署與金融機構的宣導影片，將文字轉化為具體的視聽演練。
   - 解析如「LINE投票釣魚」、「假親友視訊防偽測試」等常見套路。
4.📖**資安與犯罪心理學防制研究**
   - 從行為經濟學（如FOMO錯失恐懼）解構受害者的心理弱點。
   - 檢討現有制度的防禦破口，並提出包含導入FIDO2認證等五大防制行動方案。

---

##🚀亮點技術與獨家功能(Key Features)

###1.雙模式網購風險量化引擎(`scamSecurityScanner.js`)
打破傳統死板的警語宣導，開發結合「網址安全層檢測」與「行為特徵盤點」的自動化風險計分系統（0~100分）：
- **6層網址資安掃描**：涵蓋 HTTP 傳輸加密檢查、免洗網域後綴（TLD）黑名單比對、品牌假子網域解析、DNS狀態，以及WHOIS網域註冊年齡探測。
- **10題行為特徵量表**：透過互動問卷盤點飢餓行銷、強制貨到付款、社群假評價等高危險特徵。
- 透過邏輯運算，自動給予使用者「低度風險、中高度可疑、極高風險」的具體防護建議。

###2.即時數據整合與官方資源導引
- 透過iframe嵌入內政部警政署的**165打詐儀表板(`165dashboard.tw`)**，即時呈現每日全國詐欺報案動態。
- 內建QR Code點擊放大（Lightbox）功能，方便訪客快速掃描並連結警政服務App與165官方防詐社群。

---

##🛠️技術架構(Tech Stack)

* **前端框架**:Vue3(Composition API)
* **路由管理**:Vue Router
* **狀態與邏輯**:JavaScript
* **視覺設計**:CSS3,FontAwesome(Responsive Web Design)
* **後端/資料庫**:Supabase(PostgreSQL關聯式資料庫API串接,RPC函數實作)
* **資料來源**:政府資料開放平臺(data.gov.tw),內政部,警政署,統計處
* **部署**:GitHub Pages

---

##💻作者與聯繫方式(Author)

**洪益華(Hung Yi-Hua)**
* 📧 Email:[yihua0988@gmail.com](mailto:yihua0988@gmail.com)
* 🐙 GitHub:[@yihua0988](https://github.com/yihua0988)

_本專案為學術研究與防詐教育推廣用途，相關數據皆引用自政府公開資訊，歡迎學術交流與技術探討。_

---
---

#🛡️2026 Anti-Fraud Data Analysis&In-Depth Research
**Taiwan Anti-Fraud Data Analysis&Research Project**

![Vue.js](https://img.shields.io/badge/Vue.js-3.0-4FC08D?style=for-the-badge&logo=vue.js)
![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript)
![Open Data](https://img.shields.io/badge/Open_Data-Taiwan-0284c7?style=for-the-badge)
![Security](https://img.shields.io/badge/Security-Anti--Crawler-dc2626?style=for-the-badge)

An anti-fraud educational research project integrating Open Data visualization,the deconstruction of novelAIcrimes,and Zero Trust defense concepts.This project aims to transform complex fraud cases and cybersecurity concepts into an accessible,practical defense guide for the public through front-end engineering and data visualization technologies.

🔗**[Click here for Live Demo](https://yihua0988.github.io/PFvue/)** 
📝**[Download Project Presentation (PPT)](https://github.com/yihua0988/PFvue/tree/main/ppt)**

---

##🎯Core Modules

This project focuses on the following four core anti-fraud research dimensions:

1.📊**Historical Data Analysis & One-Page Scam Deconstruction**
   - Visualizes Taiwan's recent fraud trends and interception effectiveness.
   - Analyzes how fraud syndicates utilize social media pixel tracking and"ghost parcels"to create untraceable money flows.
   - Features a built-in"Dual-Mode On LINE Shopping Risk Quantification Engine"(see Key Features below).
2.📰**Major Tech Fraud News & Case Studies**
   - Explores the malicious abuse of AI Voice Cloning technology.
   - Deconstructs the global surge in cryptocurrency scams and the money laundering models of transnational criminal syndicates.
3.🎬**Official Anti-Fraud Video Integration**
   - Compiles educational videos from the National Police Agency and financial institutions,turning text into concrete audio-visual drills.
   - Breaks down common traps like"LINE voting phishing"and"fake relative video call anti-counterfeiting tests."
4.📖**Cybersecurity & Criminal Psychology Defense Research**
   - Deconstructs victims'psychological vulnerabilities through behavioral economics(e.g.,FOMO-Fear of Missing Out).
   - Reviews defense loopholes in current systems and proposes five major action plans, including the implementation of FIDO2 authentication.

---

##🚀Key Features & Exclusive Functions

### 1.Dual-Mode On LINE shopping Risk Quantification Engine (`scamSecurityScanner.js`)
Breaking away from rigid traditional warnings, this system combines"URL security layer detection"and"behavioral characteristic inventory"into an automated risk scoring system(0~100points):
-**6-Layer URL Security Scan**:Covers HTTP transmission encryption checks, disposable Top-Level Domain(TLD)blacklists, brand fake sub-domain parsing, DNS status, and WHOIS domain registration age probing.
-**10-Question Behavioral Trait Scale**:Uses an interactive questionnaire to identify high-risk features such as hunger marketing, forced cash-on-delivery, and fake social media reviews.
-Through logical operations,it automatically provides users with specific protective advice categorized as"Low Risk,""Moderate/High Suspicion,"or"Extremely High Risk."

### 2.Real-Time Data Integration & Official Resource Routing
-Seamlessly embeds the National Police Agency's**165 Anti-Fraud Dashboard (`165dashboard.tw`)**via iframe, presenting daily nationwide fraud report dynamics in real-time.
-Features a click-to-enlarge Lightbox function for QR codes, allowing visitors to quickly scan and access the Police Service App and official 165 social media channels.

---

##🛠️Tech Stack

* **Front-End Framework**:Vue3(Composition API)
* **Routing**:Vue Router
* **State & Logic**:JavaScript
* **Visual Design**:CSS3,FontAwesome(Responsive Web Design)
* **Backend/Database**:Supabase(PostgreSQLrelational databaseAPIintegration,RPCImplementation)
* **Data Sources**:Taiwan Government Open Data(data.gov.tw),Ministry of Interior,National Police Agency,DGBAS
* **Deployment**:GitHub Pages

---

##💻Author & Contact

**Hung Yi-Hua(洪益華)**
*📧Email:[yihua0988@gmail.com](mailto:yihua0988@gmail.com)
*🐙GitHub:[@yihua0988](https://github.com/yihua0988)

_This project is for academic research and anti-fraud educational purposes.Relevant data is cited from public government information.Academic exchanges and technical discussions are welcome._