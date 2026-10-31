<template>
  <main class="content dashboard-page">
    
    <!-- 1. 主標題與副標題 -->
    <header class="page-header">
      <h1 class="dashboard-title">🛡️警示帳戶與打詐成效：趨勢比較與關聯分析</h1>
      <p class="dashboard-subtitle">
        整合「金管會警示帳戶季度統計」與「全國打詐查緝與查扣成效」，透過同步折線圖直觀掌握執法防堵趨勢！
      </p>
    </header>

    <!-- 2. 資料視覺化子頁面選單 (5 頁配置，強制重整) -->
	<div class="subpages" style="grid-template-columns: repeat(5, 1fr); margin: 0 auto;">
	  <a href="/PFvue/fraud-patterns" :class="{ 'router-link-exact-active': $route.path === '/fraud-patterns' }"><i class="fas fa-map-marked-alt"></i>&nbsp;我住的縣市安全嗎？</a>
	  <a href="/PFvue/fraud-trends" :class="{ 'router-link-exact-active': $route.path === '/fraud-trends' }"><i class="fas fa-users"></i>&nbsp;哪種人最容易被騙？</a>
	  <a href="/PFvue/fraud-interception" :class="{ 'router-link-exact-active': $route.path === '/fraud-interception' }"><i class="fas fa-phone-slash"></i>&nbsp;假電話與盜刷防範</a>
	  <a href="/PFvue/anti-fraud-results" :class="{ 'router-link-exact-active': $route.path === '/anti-fraud-results' }"><i class="fas fa-shield-alt"></i>&nbsp;警示戶與打詐成效</a>
	  <a href="/PFvue/one-page-scam" :class="{ 'router-link-exact-active': $route.path === '/one-page-scam' }"><i class="fas fa-shopping-cart"></i>&nbsp;假網購長怎樣？</a>
	</div>

    <!-- 讀取中狀態 -->
    <div v-if="isLoading" class="status-box">
	  <div class="spinner"></div>
      <h2>⏳正在從雲端載入統計資料...</h2>
    </div>

    <!-- 錯誤狀態 -->
    <div v-else-if="errorMsg" class="status-box">
      <h2 class="text-red">⚠️資料讀取失敗</h2>
      <p>{{ errorMsg }}</p>
    </div>

    <!-- 3. 主體視覺化內容 -->
    <template v-else>
      
      <!-- 步驟化篩選面板 -->
      <section class="filter-panel">
        
        <!-- 步驟 1：選擇 2 大資料庫 -->
        <div class="filter-row">
          <div class="filter-group">
            <span class="step-tag">步驟1</span>
            <span class="filter-title">選擇執法與金融防制主題：</span>
          </div>
          <span class="dataset-time-pill">{{ currentDatasetMeta.badge }}</span>
        </div>

        <div class="dataset-tabs-grid two-cols">
          <button 
            :class="['dataset-tab-btn', { active: activeTopic === 'warning_acc' }]" 
            @click="switchTopic('warning_acc')">
            <span class="tab-main-title">🏦金管會警示帳戶</span>
            <span class="tab-sub-meta">民國103年～至今｜按「季(Q1~Q4)」統計單折線圖</span>
          </button>

          <button 
            :class="['dataset-tab-btn', { active: activeTopic === 'performance' }]" 
            @click="switchTopic('performance')">
            <span class="tab-main-title">🛡️打詐成效統計</span>
            <span class="tab-sub-meta">民國113年11月～至今｜按「月」統計（雙圖表同步趨勢分析）</span>
          </button>
        </div>

        <div class="filter-divider"></div>

        <!-- 步驟 2：選時間區間（單行緊湊對齊，打詐成效會同時同步上下兩張雙軸折線圖！） -->
        <div class="filter-row">
          <div class="filter-group">
            <span class="step-tag">步驟2</span>
            <span class="filter-title">
              {{ isQuarterly ? '選擇查詢季度區間：' : '選擇查詢期間（同步更新雙圖表）：' }}
            </span>

            <div class="btn-group" v-if="isQuarterly">
              <button :class="['pill-btn', { active: presetPeriod === '4q' }]" @click="applyQuarterPreset(4, '4q')">近4季(1年)</button>
              <button :class="['pill-btn', { active: presetPeriod === '8q' }]" @click="applyQuarterPreset(8, '8q')">近8季(2年)</button>
              <button :class="['pill-btn', { active: presetPeriod === '12q' }]" @click="applyQuarterPreset(12, '12q')">近12季(3年)</button>
              <button :class="['pill-btn', { active: presetPeriod === '20q' }]" @click="applyQuarterPreset(20, '20q')">近20季(5年)</button>
            </div>

            <div class="btn-group" v-else>
              <button :class="['pill-btn', { active: presetPeriod === '3m' }]" @click="applyMonthPreset(3, '3m')">近3個月</button>
              <button :class="['pill-btn', { active: presetPeriod === '6m' }]" @click="applyMonthPreset(6, '6m')">近6個月</button>
              <button :class="['pill-btn', { active: presetPeriod === '1y' }]" @click="applyMonthPreset(12, '1y')">近1年</button>
              <button :class="['pill-btn', { active: presetPeriod === '3y' }]" @click="applyMonthPreset(36, '3y')">近3年</button>
            </div>
          </div>

          <div class="custom-date-box" v-if="isQuarterly">
            <span class="date-label">自訂季度：</span>
            <select v-model.number="startYear" class="clean-select" @change="onCustomQuarterChange()">
              <option v-for="y in yearOptions" :key="'sqy'+y" :value="y">民國{{ y - 1911 }}年</option>
            </select>
            <select v-model.number="startQuarter" class="clean-select" @change="onCustomQuarterChange()">
              <option v-for="q in 4" :key="'sq'+q" :value="q">第{{ q }}季(Q{{ q }})</option>
            </select>
            <span class="date-label">～</span>
            <select v-model.number="endYear" class="clean-select" @change="onCustomQuarterChange()">
              <option v-for="y in yearOptions" :key="'eqy'+y" :value="y">民國{{ y - 1911 }}年</option>
            </select>
            <select v-model.number="endQuarter" class="clean-select" @change="onCustomQuarterChange()">
              <option v-for="q in 4" :key="'eq'+q" :value="q">第{{ q }}季(Q{{ q }})</option>
            </select>
          </div>

          <div class="custom-date-box" v-else>
            <span class="date-label">自訂區間：</span>
            <select v-model.number="startYear" class="clean-select" @change="onCustomMonthChange()">
              <option v-for="y in yearOptions" :key="'sy'+y" :value="y">民國{{ y - 1911 }}年</option>
            </select>
            <select v-model.number="startMonth" class="clean-select" @change="onCustomMonthChange()">
              <option v-for="m in startMonthOptions" :key="'sm'+m" :value="m">{{ m }}月</option>
            </select>
            <span class="date-label">～</span>
            <select v-model.number="endYear" class="clean-select" @change="onCustomMonthChange()">
              <option v-for="y in yearOptions" :key="'ey'+y" :value="y">民國{{ y - 1911 }}年</option>
            </select>
            <select v-model.number="endMonth" class="clean-select" @change="onCustomMonthChange()">
              <option v-for="m in endMonthOptions" :key="'em'+m" :value="m">{{ m }}月</option>
            </select>
          </div>
        </div>
      </section>

      <!-- =====================================================================
           📈 圖表一：金管會為「單軸折線圖」；打詐成效為「查緝人數 (藍) vs. 案件數 (橘)」雙軸折線圖
           ===================================================================== -->
      <section class="dual-chart-section card-box">
        <div class="dual-chart-header">
          <div class="dual-title-row">
            <h2 v-if="isSingleLineMode">
              📈單軸折線圖：金管會警示帳戶季度趨勢分析（{{ periodLabel }}）
            </h2>
            <h2 v-else>
              📈雙軸折線圖（一）：查緝「人數」與「案件數（團數）」趨勢比較（{{ periodLabel }}）
            </h2>
            <span class="valid-filter-badge">✅已自動排除無效與0值期別</span>
          </div>
        </div>

        <div class="dual-chart-body-grid">
          
          <!-- 左側：高解析度原生 SVG 折線圖 (圖表一) -->
          <div class="svg-chart-wrapper">
            <div v-if="dualChartData.points.length === 0" class="empty-chart-msg">
              此期間內暫無足夠時間序列資料可供繪製折線圖，請調整查詢期間。
            </div>

            <svg 
              v-else
              class="dual-axis-svg" 
              :viewBox="`0 0 ${svgWidth} ${svgHeight}`"
              @mouseleave="hoverIndex = -1"
            >
              <defs>
                <linearGradient id="leftLineFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#2563eb" stop-opacity="0.24" />
                  <stop offset="100%" stop-color="#2563eb" stop-opacity="0.0" />
                </linearGradient>
              </defs>

              <g v-for="(tick, tIdx) in yAxisTicks" :key="'grid1-'+tIdx">
                <line 
                  :x1="padLeft" 
                  :y1="tick.y" 
                  :x2="svgWidth - (isSingleLineMode ? 28 : padRight)" 
                  :y2="tick.y" 
                  stroke="#e2e8f0" 
                  stroke-dasharray="4 4" 
                  stroke-width="1"
                />
                <text 
                  :x="padLeft - 10" 
                  :y="tick.y + 4" 
                  text-anchor="end" 
                  class="axis-tick-text fill-blue"
                >
                  {{ formatCompactNumber(tick.leftVal) }}
                </text>
                <text 
                  v-if="!isSingleLineMode"
                  :x="svgWidth - padRight + 10" 
                  :y="tick.y + 4" 
                  text-anchor="start" 
                  class="axis-tick-text fill-orange"
                >
                  {{ formatCompactNumber(tick.rightVal) }}
                </text>
              </g>

              <text :x="10" :y="padTop - 14" text-anchor="start" class="axis-unit-title fill-blue">
                🔵{{ isSingleLineMode ? `單位：${dualChartData.leftUnit}`:`左軸單位：${dualChartData.leftUnit}` }}
              </text>
              <text 
                v-if="!isSingleLineMode" 
                :x="svgWidth - 10" 
                :y="padTop - 14" 
                text-anchor="end" 
                class="axis-unit-title fill-orange"
              >
                🟠右軸單位：{{ dualChartData.rightUnit }}
              </text>

              <g v-for="(pt, idx) in dualChartData.points" :key="'x1-'+idx">
                <text 
                  v-if="shouldShowXLabel(idx, dualChartData.points.length)"
                  :x="pt.x" 
                  :y="svgHeight - 12" 
                  text-anchor="middle" 
                  class="x-axis-label"
                >
                  {{ pt.shortLabel }}
                </text>
              </g>

              <path v-if="dualChartData.leftAreaPath" :d="dualChartData.leftAreaPath" fill="url(#leftLineFill)" />
              <path 
                v-if="dualChartData.leftLinePath" 
                :d="dualChartData.leftLinePath" 
                fill="none" 
                stroke="#2563eb" 
                stroke-width="3.2" 
                stroke-linecap="round"
                stroke-linejoin="round"
              />

              <path 
                v-if="!isSingleLineMode && dualChartData.rightLinePath" 
                :d="dualChartData.rightLinePath" 
                fill="none" 
                stroke="#ea580c" 
                stroke-width="3" 
                stroke-dasharray="7 4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />

              <line 
                v-if="hoverIndex >= 0 && dualChartData.points[hoverIndex]"
                :x1="dualChartData.points[hoverIndex].x"
                :y1="padTop"
                :x2="dualChartData.points[hoverIndex].x"
                :y2="svgHeight - padBottom"
                stroke="#475569"
                stroke-width="1.5"
                stroke-dasharray="3 3"
              />

              <g v-for="(pt, idx) in dualChartData.points" :key="'pt1-'+idx">
                <circle 
                  :cx="pt.x" 
                  :cy="pt.leftY" 
                  :r="hoverIndex === idx ? 6.5 : 4.2" 
                  fill="#ffffff" 
                  stroke="#2563eb" 
                  stroke-width="2.8" 
                />
                <circle 
                  v-if="!isSingleLineMode"
                  :cx="pt.x" 
                  :cy="pt.rightY" 
                  :r="hoverIndex === idx ? 6.5 : 4.2" 
                  fill="#ffffff" 
                  stroke="#ea580c" 
                  stroke-width="2.8" 
                />
                <rect 
                  :x="pt.x - (effectiveChartWidth / Math.max(2, dualChartData.points.length)) / 2"
                  :y="padTop"
                  :width="effectiveChartWidth / Math.max(1, dualChartData.points.length)"
                  :height="chartInnerHeight"
                  fill="transparent"
                  style="cursor: pointer;"
                  @mouseenter="hoverIndex = idx"
                  @click="hoverIndex = idx"
                />
              </g>
            </svg>

            <div class="chart-hover-banner" v-if="activeHoverPoint">
              <div class="hover-time-left">
                <span class="hover-period-tag">📅 {{ activeHoverPoint.fullLabel }}</span>
              </div>
              <div class="hover-values-right">
                <div class="hover-metric-blue">
                  🔵{{ isSingleLineMode ? '警示帳戶數' : dualChartData.leftTitle }}：<strong>{{ formatMetricValue(activeHoverPoint.leftVal) }} {{ dualChartData.leftUnit }}</strong>
                </div>
                <div class="hover-metric-orange" v-if="!isSingleLineMode">
                  🟠{{ dualChartData.rightTitle }}：<strong>{{ formatMetricValue(activeHoverPoint.rightVal) }} {{ dualChartData.rightUnit }}</strong>
                </div>
              </div>
            </div>
          </div>

          <!-- 右側：圖表一數據自動分析報告 -->
          <div class="dual-analysis-panel">
            <div class="analysis-title-bar">
              <h3>{{ isSingleLineMode ? '🧠警示帳戶季度趨勢分析' : '🧠查緝人數與案件數連動分析' }}</h3>
              <span :class="['corr-badge', dualAnalysis.corrClass]">
                {{ isSingleLineMode ? `較前期 ${formatChange(dualAnalysis.leftChangePct)}` : dualAnalysis.corrLabel }}
              </span>
            </div>

            <div class="axis-summary-card card-left-border">
              <div class="axis-sum-top">
                <span class="axis-sum-name">
                  🔵{{ isSingleLineMode ? '金管會警示帳戶統計' : dualChartData.leftTitle }}
                </span>
                <span :class="['delta-pill', getTrendClass(dualAnalysis.leftChangePct)]">
                  較前期{{ formatChange(dualAnalysis.leftChangePct) }}
                </span>
              </div>
              <div class="axis-sum-nums">
                <div>
                  <small>{{ isSingleLineMode ? '最新一季數量' : '期間總計' }}</small>
                  <strong>
                    {{ formatCompactUnitVal(isSingleLineMode ? dualAnalysis.latestVal : dualAnalysis.leftTotal, dualChartData.leftUnit) }} {{ dualChartData.leftUnit }}
                  </strong>
                </div>
                <div>
                  <small>{{ periodUnitWord }}均水準</small>
                  <strong>{{ formatCompactUnitVal(dualAnalysis.leftAvg, dualChartData.leftUnit) }} {{ dualChartData.leftUnit }}</strong>
                </div>
                <div>
                  <small>期間最高峰</small>
                  <strong>{{ dualAnalysis.leftPeakPeriod }} ({{ formatCompactUnitVal(dualAnalysis.leftPeakVal, dualChartData.leftUnit) }})</strong>
                </div>
              </div>
            </div>

            <div class="axis-summary-card card-right-border" v-if="!isSingleLineMode">
              <div class="axis-sum-top">
                <span class="axis-sum-name">🟠{{ dualChartData.rightTitle }}</span>
                <span :class="['delta-pill', getTrendClass(dualAnalysis.rightChangePct)]">
                  較前期{{ formatChange(dualAnalysis.rightChangePct) }}
                </span>
              </div>
              <div class="axis-sum-nums">
                <div>
                  <small>期間總計</small>
                  <strong>{{ formatCompactUnitVal(dualAnalysis.rightTotal, dualChartData.rightUnit) }} {{ dualChartData.rightUnit }}</strong>
                </div>
                <div>
                  <small>{{ periodUnitWord }}均水準</small>
                  <strong>{{ formatCompactUnitVal(dualAnalysis.rightAvg, dualChartData.rightUnit) }} {{ dualChartData.rightUnit }}</strong>
                </div>
                <div>
                  <small>期間最高峰</small>
                  <strong>{{ dualAnalysis.rightPeakPeriod }} ({{ formatCompactUnitVal(dualAnalysis.rightPeakVal, dualChartData.rightUnit) }})</strong>
                </div>
              </div>
            </div>

            <div class="insight-box">
              <h4>🔍 {{ isSingleLineMode ? '季度趨勢洞察結論：' : '雙軸交叉洞察結論：' }}</h4>
              <p>{{ dualAnalysis.insightText }}</p>
            </div>
          </div>

        </div>
      </section>

      <!-- =====================================================================
           📈 圖表二（打詐成效統計專屬第二張雙軸折線圖）：
              🔵 藍色左軸 = 受害人被騙金額 (元) ｜ 🟠 橘色右軸 = 查扣不法所得 (元)
              時間與上方圖表一完全同步！
           ===================================================================== -->
      <section class="dual-chart-section card-box" v-if="activeTopic === 'performance'">
        <div class="dual-chart-header">
          <div class="dual-title-row">
            <h2>
              📈 雙軸折線圖（二）：「受害人被騙金額」與「查扣不法所得」趨勢比較（{{ periodLabel }}）
            </h2>
            <span class="valid-filter-badge">🔵藍線：受害人被騙金額｜🟠橘線：查扣不法所得</span>
          </div>
        </div>

        <div class="dual-chart-body-grid">
          
          <!-- 左側：圖表二 SVG 雙軸折線圖 -->
          <div class="svg-chart-wrapper">
            <div v-if="secondChartData.points.length === 0" class="empty-chart-msg">
              此期間內暫無足夠時間序列資料可供繪製折線圖，請調整查詢期間。
            </div>

            <svg 
              v-else
              class="dual-axis-svg" 
              :viewBox="`0 0 ${svgWidth} ${svgHeight}`"
              @mouseleave="hoverIndex2 = -1"
            >
              <defs>
                <linearGradient id="leftLineFill2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#2563eb" stop-opacity="0.24" />
                  <stop offset="100%" stop-color="#2563eb" stop-opacity="0.0" />
                </linearGradient>
              </defs>

              <g v-for="(tick, tIdx) in yAxisTicks2" :key="'grid2-'+tIdx">
                <line 
                  :x1="padLeft" 
                  :y1="tick.y" 
                  :x2="svgWidth - padRight" 
                  :y2="tick.y" 
                  stroke="#e2e8f0" 
                  stroke-dasharray="4 4" 
                  stroke-width="1"
                />
                <text 
                  :x="padLeft - 10" 
                  :y="tick.y + 4" 
                  text-anchor="end" 
                  class="axis-tick-text fill-blue"
                >
                  {{ formatCompactNumber(tick.leftVal) }}
                </text>
                <text 
                  :x="svgWidth - padRight + 10" 
                  :y="tick.y + 4" 
                  text-anchor="start" 
                  class="axis-tick-text fill-orange"
                >
                  {{ formatCompactNumber(tick.rightVal) }}
                </text>
              </g>

              <text :x="10" :y="padTop - 14" text-anchor="start" class="axis-unit-title fill-blue">
                🔵左軸：受害人被騙金額({{ secondChartData.leftUnit }})
              </text>
              <text :x="svgWidth - 10" :y="padTop - 14" text-anchor="end" class="axis-unit-title fill-orange">
                🟠右軸：查扣不法所得({{ secondChartData.rightUnit }})
              </text>

              <g v-for="(pt, idx) in secondChartData.points" :key="'x2-'+idx">
                <text 
                  v-if="shouldShowXLabel(idx, secondChartData.points.length)"
                  :x="pt.x" 
                  :y="svgHeight - 12" 
                  text-anchor="middle" 
                  class="x-axis-label"
                >
                  {{ pt.shortLabel }}
                </text>
              </g>

              <path v-if="secondChartData.leftAreaPath" :d="secondChartData.leftAreaPath" fill="url(#leftLineFill2)" />
              <path 
                v-if="secondChartData.leftLinePath" 
                :d="secondChartData.leftLinePath" 
                fill="none" 
                stroke="#2563eb" 
                stroke-width="3.2" 
                stroke-linecap="round"
                stroke-linejoin="round"
              />

              <path 
                v-if="secondChartData.rightLinePath" 
                :d="secondChartData.rightLinePath" 
                fill="none" 
                stroke="#ea580c" 
                stroke-width="3" 
                stroke-dasharray="7 4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />

              <line 
                v-if="hoverIndex2 >= 0 && secondChartData.points[hoverIndex2]"
                :x1="secondChartData.points[hoverIndex2].x"
                :y1="padTop"
                :x2="secondChartData.points[hoverIndex2].x"
                :y2="svgHeight - padBottom"
                stroke="#475569"
                stroke-width="1.5"
                stroke-dasharray="3 3"
              />

              <g v-for="(pt, idx) in secondChartData.points" :key="'pt2-'+idx">
                <circle 
                  :cx="pt.x" 
                  :cy="pt.leftY" 
                  :r="hoverIndex2 === idx ? 6.5 : 4.2" 
                  fill="#ffffff" 
                  stroke="#2563eb" 
                  stroke-width="2.8" 
                />
                <circle 
                  :cx="pt.x" 
                  :cy="pt.rightY" 
                  :r="hoverIndex2 === idx ? 6.5 : 4.2" 
                  fill="#ffffff" 
                  stroke="#ea580c" 
                  stroke-width="2.8" 
                />
                <rect 
                  :x="pt.x - (chartInnerWidth / Math.max(2, secondChartData.points.length)) / 2"
                  :y="padTop"
                  :width="chartInnerWidth / Math.max(1, secondChartData.points.length)"
                  :height="chartInnerHeight"
                  fill="transparent"
                  style="cursor: pointer;"
                  @mouseenter="hoverIndex2 = idx"
                  @click="hoverIndex2 = idx"
                />
              </g>
            </svg>

            <div class="chart-hover-banner" v-if="activeHoverPoint2">
              <div class="hover-time-left">
                <span class="hover-period-tag">📅{{ activeHoverPoint2.fullLabel }}</span>
              </div>
              <div class="hover-values-right">
                <div class="hover-metric-blue">
                  🔵受害人被騙金額：<strong>{{ formatMetricValue(activeHoverPoint2.leftVal) }} {{ secondChartData.leftUnit }}</strong>
                </div>
                <div class="hover-metric-orange">
                  🟠查扣不法所得：<strong>{{ formatMetricValue(activeHoverPoint2.rightVal) }} {{ secondChartData.rightUnit }}</strong>
                </div>
              </div>
            </div>
          </div>

          <!-- 右側：圖表二「受害人被騙金額 (藍) vs. 查扣不法所得 (橘)」自動分析報告 -->
          <div class="dual-analysis-panel">
            <div class="analysis-title-bar">
              <h3>🧠被騙金額與查扣不法所得分析</h3>
              <span :class="['corr-badge', secondChartAnalysis.corrClass]">
                {{ secondChartAnalysis.corrLabel }}
              </span>
            </div>

            <div class="axis-summary-card card-left-border">
              <div class="axis-sum-top">
                <span class="axis-sum-name">🔵受害人被騙金額</span>
                <span :class="['delta-pill', getTrendClass(secondChartAnalysis.leftChangePct)]">
                  較前期 {{ formatChange(secondChartAnalysis.leftChangePct) }}
                </span>
              </div>
              <div class="axis-sum-nums">
                <div>
                  <small>期間總計</small>
                  <strong>{{ formatCompactUnitVal(secondChartAnalysis.leftTotal, secondChartData.leftUnit) }} {{ secondChartData.leftUnit }}</strong>
                </div>
                <div>
                  <small>月均水準</small>
                  <strong>{{ formatCompactUnitVal(secondChartAnalysis.leftAvg, secondChartData.leftUnit) }} {{ secondChartData.leftUnit }}</strong>
                </div>
                <div>
                  <small>期間最高峰</small>
                  <strong>{{ secondChartAnalysis.leftPeakPeriod }} ({{ formatCompactUnitVal(secondChartAnalysis.leftPeakVal, secondChartData.leftUnit) }})</strong>
                </div>
              </div>
            </div>

            <div class="axis-summary-card card-right-border">
              <div class="axis-sum-top">
                <span class="axis-sum-name">🟠查扣不法所得</span>
                <span :class="['delta-pill', getTrendClass(secondChartAnalysis.rightChangePct)]">
                  較前期{{ formatChange(secondChartAnalysis.rightChangePct) }}
                </span>
              </div>
              <div class="axis-sum-nums">
                <div>
                  <small>期間總計</small>
                  <strong>{{ formatCompactUnitVal(secondChartAnalysis.rightTotal, secondChartData.rightUnit) }} {{ secondChartData.rightUnit }}</strong>
                </div>
                <div>
                  <small>月均水準</small>
                  <strong>{{ formatCompactUnitVal(secondChartAnalysis.rightAvg, secondChartData.rightUnit) }} {{ secondChartData.rightUnit }}</strong>
                </div>
                <div>
                  <small>期間最高峰</small>
                  <strong>{{ secondChartAnalysis.rightPeakPeriod }} ({{ formatCompactUnitVal(secondChartAnalysis.rightPeakVal, secondChartData.rightUnit) }})</strong>
                </div>
              </div>
            </div>

            <div class="insight-box">
              <h4>🔍雙軸交叉洞察結論：</h4>
              <p>{{ secondChartAnalysis.insightText }}</p>
            </div>
          </div>

        </div>
      </section>

      <!-- 🏦 金管會警示帳戶專屬：下方季度規模診斷 ＋ 保命防詐習慣 -->
      <section class="dashboard-main-grid" v-if="activeTopic === 'warning_acc'">
        <div class="card-box">
          <div class="detail-banner">
            <div>
              <span class="banner-tag">📍{{ periodLabel }}｜人頭帳戶凍結統計</span>
              <h2 style="font-size: 24px !important; margin-top: 6px !important;">
                🏦金管會警示帳戶季度規模診斷
              </h2>
            </div>
            <div class="banner-pop">
              <span>查詢季度數</span><br>
              <strong>共{{ spanCount }}季</strong>
            </div>
          </div>

          <div class="metrics-2x2">
            <div class="metric-item">
              <span class="metric-title">🚨最新一季警示帳戶數</span>
              <div class="metric-value text-red">
                {{ dualAnalysis.latestVal.toLocaleString() }} <small>{{ dualChartData.leftUnit }}</small>
              </div>
              <span class="metric-note">
                所選區間最末季之累計警示帳戶總數
              </span>
            </div>

            <div class="metric-item">
              <span class="metric-title">📈較前一期變化幅度</span>
              <div :class="['metric-value', dualAnalysis.leftChangePct > 0 ? 'text-red' : 'text-green']">
                {{ formatChange(dualAnalysis.leftChangePct) }}
              </div>
              <span class="metric-note">
                期間前半段與後半段之季均變化趨勢
              </span>
            </div>

            <div class="metric-item">
              <span class="metric-title">📊期間每季平均水準</span>
              <div class="metric-value text-orange">
                {{ dualAnalysis.leftAvg.toLocaleString() }} <small>{{ dualChartData.leftUnit }}</small>
              </div>
              <span class="metric-note">
                共{{ spanCount }}個季度之平均警示戶數
              </span>
            </div>

            <div class="metric-item">
              <span class="metric-title">⛰️期間最高峰季度</span>
              <div class="metric-value text-purple">
                {{ dualAnalysis.leftPeakPeriod }}
              </div>
              <span class="metric-note">
                最高峰達{{ dualAnalysis.leftPeakVal.toLocaleString() }} {{ dualChartData.leftUnit }}
              </span>
            </div>
          </div>

          <div class="compare-block" style="margin-bottom: 0;">
            <div class="compare-header">
              <h4>⚖️期間「首季」vs.「最新一季」警示帳戶規模對照：</h4>
            </div>
            <div class="compare-bar">
              <div 
                class="seg-victim" 
                :style="{ width: warningAccCompareRatio + '%' }"
              >
                最新季{{ dualAnalysis.latestVal.toLocaleString() }}件({{ warningAccCompareRatio }}%)
              </div>
              <div 
                class="seg-suspect" 
                :style="{ width: (100 - warningAccCompareRatio) + '%' }"
              >
                期初季{{ firstPointLeftVal.toLocaleString() }}件({{ 100 - warningAccCompareRatio }}%)
              </div>
            </div>
            <p class="compare-caption">
              💡一旦名下銀行帳戶因出借、求職寄卡或貸款美化金流而被通報為「警示帳戶」，名下所有銀行之網銀、提款與薪轉功能皆會被全面凍結！
            </p>
          </div>
        </div>

        <div class="card-box">
          <div class="habits-block" style="height: 100%; display: flex; flex-direction: column; justify-content: center;">
            <h4>🛡️保命防詐的三個習慣</h4>
            <ol class="habits-list">
              <li v-for="(tip, idx) in currentPreventionTips" :key="'warn-tip-'+idx" style="margin-bottom: 12px;">
                <strong>{{ tip.title }}：</strong>{{ tip.body }}
              </li>
            </ol>
          </div>
        </div>
      </section>

      <!-- 🛡️ 打詐成效統計專屬：底部橫向三欄防詐習慣 -->
      <section class="card-box bottom-habits-section" v-else>
        <div class="habits-block">
          <h4>🛡️保命防詐的三個習慣</h4>
          <div class="habits-horizontal-grid">
            <div 
              v-for="(tip, idx) in currentPreventionTips" 
              :key="'perf-tip-'+idx" 
              class="habit-card-item"
            >
              <div class="habit-num-title">
                <span class="habit-step-num">{{ idx + 1 }}</span>
                <strong>{{ tip.title }}</strong>
              </div>
              <p>{{ tip.body }}</p>
            </div>
          </div>
        </div>
      </section>

    </template>

  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_KEY

const isLoading = ref(true)
const errorMsg = ref('')

// 第 4 頁專門負責 'warning_acc' (金管會警示帳戶) 與 'performance' (打詐成效統計)
const activeTopic = ref('performance')
const leftSeriesKey = ref('')
const rightSeriesKey = ref('')
const hoverIndex = ref(-1)
const hoverIndex2 = ref(-1)

const svgWidth = 760
const svgHeight = 320
const padLeft = 72
const padRight = 72
const padTop = 38
const padBottom = 38
const chartInnerWidth = svgWidth - padLeft - padRight
const chartInnerHeight = svgHeight - padTop - padBottom

const isSingleLineMode = computed(() => activeTopic.value === 'warning_acc')
const effectiveChartWidth = computed(() => {
  return svgWidth - padLeft - (isSingleLineMode.value ? 28 : padRight)
})

const presetPeriod = ref('3m')
const startYear = ref(2026)
const startMonth = ref(6)
const endYear = ref(2026)
const endMonth = ref(8)

const startQuarter = ref(1)
const endQuarter = ref(4)

const topicDataStore = ref({
  warning_acc: [],
  performance: []
})

const DATASET_META = {
  warning_acc: {
    title: '金管會警示帳戶統計',
    badge: '📊資料範圍：民國103年至今（金管會每季公布・單軸折線圖）',
    isQuarterly: true,
    minAllowedYear: 2014
  },
  performance: {
    title: '打詐成效統計',
    badge: '⚡資料範圍：民國113年11月至今（雙圖表同步更新）',
    isQuarterly: false,
    minAllowedYear: 2024
  }
}

const currentDatasetMeta = computed(() => DATASET_META[activeTopic.value] || DATASET_META.performance)
const isQuarterly = computed(() => currentDatasetMeta.value.isQuarterly)
const periodUnitWord = computed(() => (isQuarterly.value ? '季' : '月'))

function toMonthIndex(y, m) {
  return y * 12 + (m - 1)
}

function toQuarterIndex(y, q) {
  return y * 4 + (q - 1)
}

const currentTopicRecords = computed(() => {
  return topicDataStore.value[activeTopic.value] || []
})

const topicBounds = computed(() => {
  const minFloorYear = currentDatasetMeta.value.minAllowedYear
  let minMIdx = 999999
  let maxMIdx = 0
  let minQIdx = 999999
  let maxQIdx = 0

  currentTopicRecords.value.forEach(r => {
    if (r.val > 0 && r.yr >= minFloorYear) {
      const mIdx = toMonthIndex(r.yr, r.mo)
      const qIdx = toQuarterIndex(r.yr, r.qtr)
      if (mIdx < minMIdx) minMIdx = mIdx
      if (mIdx > maxMIdx) maxMIdx = mIdx
      if (qIdx < minQIdx) minQIdx = qIdx
      if (qIdx > maxQIdx) maxQIdx = qIdx
    }
  })

  if (maxMIdx === 0) {
    const defaultMinM = toMonthIndex(minFloorYear, 11)
    const defaultMaxM = toMonthIndex(2026, 8)
    return {
      minYear: minFloorYear,
      minMonth: 11,
      minMonthIdx: defaultMinM,
      maxYear: 2026,
      latestMonth: 8,
      maxMonthIdx: defaultMaxM,
      minQuarterIdx: toQuarterIndex(minFloorYear, 1),
      latestQuarter: 3,
      maxQuarterIdx: toQuarterIndex(2026, 3)
    }
  }

  return {
    minYear: Math.floor(minMIdx / 12),
    minMonth: (minMIdx % 12) + 1,
    minMonthIdx: minMIdx,
    maxYear: Math.floor(maxMIdx / 12),
    latestMonth: (maxMIdx % 12) + 1,
    maxMonthIdx: maxMIdx,
    minQuarterIdx: minQIdx,
    latestQuarter: (maxQIdx % 4) + 1,
    maxQuarterIdx: maxQIdx
  }
})

const yearOptions = computed(() => {
  const { minYear, maxYear } = topicBounds.value
  const len = Math.max(1, maxYear - minYear + 1)
  return Array.from({ length: len }, (_, i) => minYear + i)
})

const startMonthOptions = computed(() => {
  const { minYear, minMonth, maxYear, latestMonth } = topicBounds.value
  const minM = startYear.value === minYear ? minMonth : 1
  const maxM = startYear.value === maxYear ? latestMonth : 12
  const list = []
  for (let m = minM; m <= maxM; m++) list.push(m)
  return list.length ? list : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
})

const endMonthOptions = computed(() => {
  const { minYear, minMonth, maxYear, latestMonth } = topicBounds.value
  const minM = endYear.value === minYear ? minMonth : 1
  const maxM = endYear.value === maxYear ? latestMonth : 12
  const list = []
  for (let m = minM; m <= maxM; m++) list.push(m)
  return list.length ? list : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
})

const periodLabel = computed(() => {
  if (isQuarterly.value) {
    return `${startYear.value - 1911}年第${startQuarter.value}季 ~ ${endYear.value - 1911}年第${endQuarter.value}季`
  }
  return `${startYear.value - 1911}年${startMonth.value}月 ~ ${endYear.value - 1911}年${endMonth.value}月`
})

const spanCount = computed(() => {
  if (isQuarterly.value) {
    const diff = toQuarterIndex(endYear.value, endQuarter.value) - toQuarterIndex(startYear.value, startQuarter.value) + 1
    return Math.max(1, diff)
  }
  const diff = toMonthIndex(endYear.value, endMonth.value) - toMonthIndex(startYear.value, startMonth.value) + 1
  return Math.max(1, diff)
})

const validSeriesOptions = computed(() => {
  const seriesStats = {}
  currentTopicRecords.value.forEach(r => {
    const itemKey = `${r.category}||${r.name}||${r.unit}`
    if (!seriesStats[itemKey]) {
      seriesStats[itemKey] = {
        key: itemKey,
        category: r.category,
        name: r.name,
        unit: r.unit,
        label: r.name
      }
    }
  })
  return Object.values(seriesStats)
})

const perfPersonOption = computed(() => {
  return validSeriesOptions.value.find(o => o.unit === '人' || o.name.includes('人數')) || null
})
const perfCaseOption = computed(() => {
  return validSeriesOptions.value.find(o => o.unit === '件' || o.name.includes('團數') || o.name.includes('件數')) || null
})
const perfVictimMoneyOption = computed(() => {
  const moneyOpts = validSeriesOptions.value.filter(o => o.unit === '元')
  return moneyOpts.find(o => !o.name.includes('查扣') && !o.name.includes('不法所得')) || moneyOpts[0] || null
})
const perfSeizedMoneyOption = computed(() => {
  const moneyOpts = validSeriesOptions.value.filter(o => o.unit === '元')
  return moneyOpts.find(o => o.name.includes('查扣') || o.name.includes('不法所得')) || moneyOpts[1] || moneyOpts[0] || null
})

function autoSelectBestDualSeries() {
  const opts = validSeriesOptions.value
  if (!opts.length) return

  if (activeTopic.value === 'performance' && perfPersonOption.value && perfCaseOption.value) {
    leftSeriesKey.value = perfPersonOption.value.key
    rightSeriesKey.value = perfCaseOption.value.key
  } else {
    leftSeriesKey.value = opts[0].key
    rightSeriesKey.value = opts.length > 1 ? opts[1].key : opts[0].key
  }
}

function buildDualChartGeometry(leftOpt, rightOpt, innerW, unifySameUnitScale = false) {
  if (!leftOpt || !rightOpt) {
    return { points: [], leftLinePath: '', leftAreaPath: '', rightLinePath: '', leftTitle: '', rightTitle: '', leftUnit: '', rightUnit: '', leftBounds: [0, 10], rightBounds: [0, 10] }
  }

  const curStart = isQuarterly.value
    ? toQuarterIndex(startYear.value, startQuarter.value)
    : toMonthIndex(startYear.value, startMonth.value)
  const curEnd = isQuarterly.value
    ? toQuarterIndex(endYear.value, endQuarter.value)
    : toMonthIndex(endYear.value, endMonth.value)

  const timeBuckets = []
  for (let idx = curStart; idx <= curEnd; idx++) {
    if (isQuarterly.value) {
      const y = Math.floor(idx / 4)
      const q = (idx % 4) + 1
      timeBuckets.push({
        idx,
        shortLabel: `${y - 1911}Q${q}`,
        fullLabel: `民國${y - 1911}年第${q}季`,
        leftVal: 0,
        rightVal: 0
      })
    } else {
      const y = Math.floor(idx / 12)
      const m = (idx % 12) + 1
      timeBuckets.push({
        idx,
        shortLabel: `${y - 1911}/${String(m).padStart(2, '0')}`,
        fullLabel: `民國${y - 1911}年${m}月`,
        leftVal: 0,
        rightVal: 0
      })
    }
  }

  const bucketMap = {}
  timeBuckets.forEach(b => { bucketMap[b.idx] = b })

  const matchRecordToOption = (r, opt) => {
    return r.category === opt.category && r.name === opt.name && r.unit === opt.unit
  }

  currentTopicRecords.value.forEach(r => {
    const idx = isQuarterly.value ? toQuarterIndex(r.yr, r.qtr) : toMonthIndex(r.yr, r.mo)
    const b = bucketMap[idx]
    if (!b) return
    if (matchRecordToOption(r, leftOpt)) b.leftVal += r.val
    if (!isSingleLineMode.value && matchRecordToOption(r, rightOpt)) b.rightVal += r.val
  })

  const n = timeBuckets.length
  if (n === 0) {
    return { points: [], leftLinePath: '', leftAreaPath: '', rightLinePath: '', leftTitle: leftOpt.label, rightTitle: rightOpt.label, leftUnit: leftOpt.unit, rightUnit: rightOpt.unit, leftBounds: [0, 10], rightBounds: [0, 10] }
  }

  const leftVals = timeBuckets.map(b => b.leftVal)
  const rightVals = timeBuckets.map(b => b.rightVal)

  const calcBounds = (arr) => {
    const maxV = Math.max(...arr, 1)
    return [0, Math.ceil(maxV * 1.12)]
  }

  let leftBounds = calcBounds(leftVals)
  let rightBounds = calcBounds(rightVals)

  if (unifySameUnitScale && leftOpt.unit === rightOpt.unit) {
    const sharedMax = Math.max(leftBounds[1], rightBounds[1])
    leftBounds = [0, sharedMax]
    rightBounds = [0, sharedMax]
  }

  const points = timeBuckets.map((b, i) => {
    const x = n === 1 ? padLeft + innerW / 2 : padLeft + (i / (n - 1)) * innerW
    const leftRatio = (b.leftVal - leftBounds[0]) / Math.max(0.0001, leftBounds[1] - leftBounds[0])
    const rightRatio = (b.rightVal - rightBounds[0]) / Math.max(0.0001, rightBounds[1] - rightBounds[0])

    const leftY = padTop + chartInnerHeight - leftRatio * chartInnerHeight
    const rightY = padTop + chartInnerHeight - rightRatio * chartInnerHeight

    return {
      ...b,
      leftVal: Number(b.leftVal.toFixed(2)),
      rightVal: Number(b.rightVal.toFixed(2)),
      x: Number(x.toFixed(1)),
      leftY: Number(leftY.toFixed(1)),
      rightY: Number(rightY.toFixed(1))
    }
  })

  const leftLinePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.leftY}`).join(' ')
  const rightLinePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.rightY}`).join(' ')
  const baselineY = padTop + chartInnerHeight
  const leftAreaPath = points.length > 1
    ? `${leftLinePath} L ${points[points.length - 1].x} ${baselineY} L ${points[0].x} ${baselineY} Z`
    : ''

  return {
    points,
    leftLinePath,
    leftAreaPath,
    rightLinePath,
    leftTitle: leftOpt.label,
    rightTitle: rightOpt.label,
    leftUnit: leftOpt.unit,
    rightUnit: rightOpt.unit,
    leftBounds,
    rightBounds
  }
}

function computeDualStats(chartDataObj, isSingleLine = false, isVictimVsSeizedMoney = false) {
  const pts = chartDataObj.points
  if (!pts.length) {
    return {
      latestVal: 0, leftTotal: 0, leftAvg: 0, leftPeakVal: 0, leftPeakPeriod: '-', leftChangePct: 0,
      rightTotal: 0, rightAvg: 0, rightPeakVal: 0, rightPeakPeriod: '-', rightChangePct: 0,
      corrLabel: '無資料', corrClass: 'pill-neutral', insightText: '請選擇包含有效數據之時間區間。'
    }
  }

  let leftTotal = 0, rightTotal = 0
  let leftPeakVal = -1, leftPeakPeriod = '-'
  let rightPeakVal = -1, rightPeakPeriod = '-'
  let nonZeroBothCount = 0
  const exceedMonths = []

  pts.forEach(p => {
    leftTotal += p.leftVal
    rightTotal += p.rightVal
    if (p.leftVal > 0 && p.rightVal > 0) nonZeroBothCount++
    if (p.leftVal > leftPeakVal) { leftPeakVal = p.leftVal; leftPeakPeriod = p.shortLabel }
    if (p.rightVal > rightPeakVal) { rightPeakVal = p.rightVal; rightPeakPeriod = p.shortLabel }
    if (isVictimVsSeizedMoney && p.rightVal > p.leftVal && p.leftVal > 0) {
      exceedMonths.push(p.shortLabel)
    }
  })

  const n = pts.length
  const latestVal = pts[n - 1].leftVal
  const firstVal = pts[0].leftVal
  const leftAvg = leftTotal / n
  const rightAvg = rightTotal / n

  const half = Math.max(1, Math.floor(n / 2))
  const leftFirstHalf = pts.slice(0, half).reduce((s, p) => s + p.leftVal, 0)
  const leftSecondHalf = pts.slice(-half).reduce((s, p) => s + p.leftVal, 0)
  const rightFirstHalf = pts.slice(0, half).reduce((s, p) => s + p.rightVal, 0)
  const rightSecondHalf = pts.slice(-half).reduce((s, p) => s + p.rightVal, 0)

  const leftChangePct = leftFirstHalf > 0 ? Number((((leftSecondHalf - leftFirstHalf) / leftFirstHalf) * 100).toFixed(1)) : 0
  const rightChangePct = rightFirstHalf > 0 ? Number((((rightSecondHalf - rightFirstHalf) / rightFirstHalf) * 100).toFixed(1)) : 0

  if (isSingleLine) {
    const netDiff = latestVal - firstVal
    const diffText = netDiff >= 0 ? `增加${netDiff.toLocaleString()}件` : `減少${Math.abs(netDiff).toLocaleString()}件`
    return {
      latestVal,
      leftTotal: Number(leftTotal.toFixed(1)),
      leftAvg: Number(leftAvg.toFixed(1)),
      leftPeakVal: Number(leftPeakVal.toFixed(1)),
      leftPeakPeriod,
      leftChangePct,
      rightTotal: 0, rightAvg: 0, rightPeakVal: 0, rightPeakPeriod: '-', rightChangePct: 0,
      corrLabel: '',
      corrClass: leftChangePct > 0 ? 'pill-up' : 'pill-down',
      insightText: `在所選的${n}個季度內，全國警示帳戶最高峰出現在${leftPeakPeriod}達${leftPeakVal.toLocaleString()}件），最新一季${pts[n - 1].shortLabel}則為${latestVal.toLocaleString()}件，期間首尾相較${diffText}。`
    }
  }

  let extraRatioText = ''
  if (isVictimVsSeizedMoney && leftTotal > 0) {
    const seizedRatio = ((rightTotal / leftTotal) * 100).toFixed(2)
    extraRatioText = ` 期間查扣不法所得佔受害人被騙金額比例為 ${seizedRatio}%（相當於每100元中查扣${seizedRatio}元）。`
    if (exceedMonths.length > 0) {
      extraRatioText += ` 📌註：${exceedMonths.join('、')}查扣金額高於當月受害人被騙金額，係因重大案件偵結時將前幾個月累積之犯罪所得於當月一併結算入帳所致。`
    }
  } else if (chartDataObj.leftUnit === '人' && chartDataObj.rightUnit === '件' && rightTotal > 0) {
    const avgPersons = (leftTotal / rightTotal).toFixed(1)
    extraRatioText = ` 平均每破獲1件（團）詐欺集團案件，查緝嫌犯達${avgPersons}人！`
  }

  if (nonZeroBothCount < 3) {
    return {
      latestVal,
      leftTotal: Number(leftTotal.toFixed(1)),
      leftAvg: Number(leftAvg.toFixed(1)),
      leftPeakVal: Number(leftPeakVal.toFixed(1)),
      leftPeakPeriod,
      leftChangePct,
      rightTotal: Number(rightTotal.toFixed(1)),
      rightAvg: Number(rightAvg.toFixed(1)),
      rightPeakVal: Number(rightPeakVal.toFixed(1)),
      rightPeakPeriod,
      rightChangePct,
      corrLabel: `有效期間共${nonZeroBothCount} ${periodUnitWord.value}`,
      corrClass: 'pill-neutral',
      insightText: `在所選期間內，左軸於${leftPeakPeriod}達最高點${formatMetricValue(leftPeakVal)}${chartDataObj.leftUnit}），右軸於${rightPeakPeriod}達最高點。${extraRatioText}`
    }
  }

  let num = 0, denL = 0, denR = 0
  pts.forEach(p => {
    const dl = p.leftVal - leftAvg
    const dr = p.rightVal - rightAvg
    num += dl * dr
    denL += dl * dl
    denR += dr * dr
  })
  const r = (denL > 0 && denR > 0) ? num / Math.sqrt(denL * denR) : 0
  const rRound = Number(r.toFixed(2))

  let corrLabel = `相關係數r=${rRound}`
  let corrClass = 'pill-neutral'
  let insightText = ''

  if (rRound >= 0.6) {
    corrLabel = `高度正向連動(r=+${rRound})`
    corrClass = 'pill-up'
    insightText = `在所選期間內，「${chartDataObj.leftTitle}」與「${chartDataObj.rightTitle}」呈現高度同步消長（r=+${rRound}）。左軸高峰位於 ${leftPeakPeriod}，右軸高峰位於${rightPeakPeriod}。${extraRatioText}`
  } else if (rRound <= -0.45) {
    corrLabel = `反向消長趨勢(r=${rRound})`
    corrClass = 'pill-down'
    insightText = `「${chartDataObj.leftTitle}」與「${chartDataObj.rightTitle}」呈現反向變動（r=${rRound}）。${extraRatioText}`
  } else {
    corrLabel = `各自獨立波動(r=${rRound})`
    corrClass = 'pill-neutral'
    insightText = `兩項指標波動幅度存在差異（r = ${rRound}）。左軸於${leftPeakPeriod}達最高峰，右軸則於${rightPeakPeriod}達到峰值。${extraRatioText}`
  }

  return {
    latestVal,
    leftTotal: Number(leftTotal.toFixed(1)),
    leftAvg: Number(leftAvg.toFixed(1)),
    leftPeakVal: Number(leftPeakVal.toFixed(1)),
    leftPeakPeriod,
    leftChangePct,
    rightTotal: Number(rightTotal.toFixed(1)),
    rightAvg: Number(rightAvg.toFixed(1)),
    rightPeakVal: Number(rightPeakVal.toFixed(1)),
    rightPeakPeriod,
    rightChangePct,
    corrLabel,
    corrClass,
    insightText
  }
}

const dualChartData = computed(() => {
  const opts = validSeriesOptions.value
  const leftOpt = opts.find(o => o.key === leftSeriesKey.value) || opts[0]
  const rightOpt = opts.find(o => o.key === rightSeriesKey.value) || opts[1] || opts[0]
  return buildDualChartGeometry(leftOpt, rightOpt, effectiveChartWidth.value, false)
})

const dualAnalysis = computed(() => {
  return computeDualStats(dualChartData.value, isSingleLineMode.value, false)
})

const yAxisTicks = computed(() => {
  const { leftBounds, rightBounds } = dualChartData.value
  const steps = 4
  const ticks = []
  for (let i = 0; i <= steps; i++) {
    const ratio = i / steps
    const y = padTop + ratio * chartInnerHeight
    const leftVal = leftBounds[1] - ratio * (leftBounds[1] - leftBounds[0])
    const rightVal = rightBounds[1] - ratio * (rightBounds[1] - rightBounds[0])
    ticks.push({ y, leftVal, rightVal })
  }
  return ticks
})

const activeHoverPoint = computed(() => {
  const pts = dualChartData.value.points
  if (!pts.length) return null
  if (hoverIndex.value >= 0 && hoverIndex.value < pts.length) {
    return pts[hoverIndex.value]
  }
  return pts[pts.length - 1]
})

const secondChartData = computed(() => {
  const opts = validSeriesOptions.value
  const leftOpt = perfVictimMoneyOption.value || opts[0]
  const rightOpt = perfSeizedMoneyOption.value || opts[1] || opts[0]
  return buildDualChartGeometry(leftOpt, rightOpt, chartInnerWidth, true)
})

const secondChartAnalysis = computed(() => {
  return computeDualStats(secondChartData.value, false, true)
})

const yAxisTicks2 = computed(() => {
  const { leftBounds, rightBounds } = secondChartData.value
  const steps = 4
  const ticks = []
  for (let i = 0; i <= steps; i++) {
    const ratio = i / steps
    const y = padTop + ratio * chartInnerHeight
    const leftVal = leftBounds[1] - ratio * (leftBounds[1] - leftBounds[0])
    const rightVal = rightBounds[1] - ratio * (rightBounds[1] - rightBounds[0])
    ticks.push({ y, leftVal, rightVal })
  }
  return ticks
})

const activeHoverPoint2 = computed(() => {
  const pts = secondChartData.value.points
  if (!pts.length) return null
  if (hoverIndex2.value >= 0 && hoverIndex2.value < pts.length) {
    return pts[hoverIndex2.value]
  }
  return pts[pts.length - 1]
})

const firstPointLeftVal = computed(() => {
  const pts = dualChartData.value.points
  return pts.length ? pts[0].leftVal : 0
})

const warningAccCompareRatio = computed(() => {
  const latest = dualAnalysis.value.latestVal
  const first = firstPointLeftVal.value
  if (latest + first <= 0) return 50
  return Math.round((latest / (latest + first)) * 100)
})

function switchTopic(topic) {
  activeTopic.value = topic
  hoverIndex.value = -1
  hoverIndex2.value = -1

  if (DATASET_META[topic].isQuarterly) {
    applyQuarterPreset(8, '8q')
  } else {
    applyMonthPreset(3, '3m')
  }

  autoSelectBestDualSeries()
}

function applyMonthPreset(spanMonths, code) {
  presetPeriod.value = code
  const { minMonthIdx, maxMonthIdx, maxYear, latestMonth } = topicBounds.value
  const startIdx = Math.max(minMonthIdx, maxMonthIdx - spanMonths + 1)

  startYear.value = Math.floor(startIdx / 12)
  startMonth.value = (startIdx % 12) + 1
  endYear.value = maxYear
  endMonth.value = latestMonth
}

function applyQuarterPreset(spanQuarters, code) {
  presetPeriod.value = code
  const { minQuarterIdx, maxQuarterIdx, maxYear, latestQuarter } = topicBounds.value
  const startQIdx = Math.max(minQuarterIdx, maxQuarterIdx - spanQuarters + 1)

  startYear.value = Math.floor(startQIdx / 4)
  startQuarter.value = (startQIdx % 4) + 1
  endYear.value = maxYear
  endQuarter.value = latestQuarter
}

function onCustomMonthChange() {
  presetPeriod.value = 'custom'
  const { minMonthIdx, maxMonthIdx } = topicBounds.value

  let sIdx = Math.max(minMonthIdx, toMonthIndex(startYear.value, startMonth.value))
  let eIdx = Math.min(maxMonthIdx, toMonthIndex(endYear.value, endMonth.value))
  if (sIdx > eIdx) {
    ;[sIdx, eIdx] = [eIdx, sIdx]
  }
  startYear.value = Math.floor(sIdx / 12)
  startMonth.value = (sIdx % 12) + 1
  endYear.value = Math.floor(eIdx / 12)
  endMonth.value = (eIdx % 12) + 1
}

function onCustomQuarterChange() {
  presetPeriod.value = 'custom'
  if (toQuarterIndex(startYear.value, startQuarter.value) > toQuarterIndex(endYear.value, endQuarter.value)) {
    const [ty, tq] = [startYear.value, startQuarter.value]
    startYear.value = endYear.value
    startQuarter.value = endQuarter.value
    endYear.value = ty
    endQuarter.value = tq
  }
}

const currentPreventionTips = computed(() => {
  return [
    { title: '看到「穩賺不賠、老師帶牌」先關掉', body: 'LINE投資群組裡那些每天貼獲利對帳單的「同學」，全都是詐騙集團自己人演的樁腳。' },
    { title: '找工作、辦貸款「不寄卡、不給密碼」', body: '只要對方說「需要寄提款卡核對金流、美化帳戶才能貸款或領薪水」，100%是要拿你的帳戶去洗錢！' },
    { title: '接到「+886開頭」或「客服說誤設分期」先掛斷', body: 'ATM只有「把錢轉出去」跟「領錢」的功能，絕對沒有「解除分期付款」或「身分驗證」的功能！' }
  ]
})

function shouldShowXLabel(idx, total) {
  if (total <= 12) return true
  const step = Math.ceil(total / 10)
  return idx % step === 0 || idx === total - 1
}

function formatCompactNumber(val) {
  const n = Number(val) || 0
  if (Math.abs(n) >= 100000000) return (n / 100000000).toFixed(1) + '億'
  if (Math.abs(n) >= 10000) return (n / 10000).toFixed(1) + '萬'
  if (Number.isInteger(n)) return n.toLocaleString()
  return n.toFixed(1)
}

function formatCompactUnitVal(val, unit) {
  const n = Number(val) || 0
  if (unit === '元' && Math.abs(n) >= 100000000) {
    return (n / 100000000).toFixed(2) + ' 億'
  }
  if (unit === '元' && Math.abs(n) >= 100000) {
    return (n / 10000).toFixed(1) + ' 萬'
  }
  return n.toLocaleString()
}

function formatMetricValue(val) {
  if (val === undefined || val === null) return '0'
  return Number(val).toLocaleString()
}

function formatChange(val) {
  if (val > 0) return `▲ +${val}%`
  if (val < 0) return `▼ ${val}%`
  return '持平 0%'
}

function getTrendClass(val) {
  if (val > 0) return 'pill-up'
  if (val < 0) return 'pill-down'
  return 'pill-neutral'
}

function parseDateAndQuarter(row, forceQuarterly = false) {
  let yr = Number(row.年度 || row.年份 || row.年 || 0)
  let rawMoOrQ = Number(row.月份 || row.月 || row.季 || row.季度 || row.季別 || 0)
  let qtr = 1
  let mo = 1

  const dateStr = String(row.統計期 || row.年月 || row.期間 || row.日期 || row.季別 || row.季度 || '')
  const qMatch = dateStr.match(/(\d{2,4})?\s*[年]?\s*[第Qq]\s*([1-4])\s*季?/)
  const mMatch = dateStr.match(/(\d{2,4})\s*[年/\-.]\s*(\d{1,2})/)

  if (qMatch) {
    if (!yr && qMatch[1]) yr = parseInt(qMatch[1], 10)
    qtr = parseInt(qMatch[2], 10)
    mo = qtr * 3
  } else if (mMatch) {
    if (!yr) yr = parseInt(mMatch[1], 10)
    rawMoOrQ = parseInt(mMatch[2], 10)
  }

  if (yr > 0 && yr < 1911) yr += 1911

  if (forceQuarterly) {
    if (rawMoOrQ >= 1 && rawMoOrQ <= 4) {
      qtr = rawMoOrQ
    } else if (rawMoOrQ > 4 && rawMoOrQ <= 12) {
      qtr = Math.ceil(rawMoOrQ / 3)
    }
    mo = qtr * 3
  } else {
    mo = rawMoOrQ >= 1 && rawMoOrQ <= 12 ? rawMoOrQ : 1
    qtr = Math.ceil(mo / 3)
  }

  return { yr, mo, qtr }
}

function splitCategoryAndName(labelParts, fallbackTopicName) {
  let category = fallbackTopicName
  let name = fallbackTopicName

  if (labelParts.length >= 2) {
    category = labelParts[0].trim()
    name = labelParts.slice(1).join(' - ').trim()
  } else if (labelParts.length === 1) {
    const single = labelParts[0].trim()
    const splitMatch = single.split(/\s*[-_：:]\s*/)
    if (splitMatch.length >= 2) {
      category = splitMatch[0].trim()
      name = splitMatch.slice(1).join(' - ').trim()
    } else {
      name = single
    }
  }

  const baseName = name.replace(/\s*[-_]\s*(發生數|財損金額|金額|件數|筆數)$/, '').trim()
  return { category, name, baseName }
}

function normalizeTableRows(rows, fallbackTopicName, forceQuarterly = false, isPerformanceTable = false) {
  const records = []
  const metaKeys = new Set([
    'id', '年度', '年份', '年', '月份', '月', '季', '季度', '季別',
    '統計期', '年月', '期間', '日期', '單位', '數值', 'created_at', 'updated_at'
  ])

  let maxMonthColVal = 0
  if (forceQuarterly) {
    rows.forEach(r => {
      const m = Number(r.月份 || r.月 || 0)
      if (m > maxMonthColVal) maxMonthColVal = m
    })
  }

  rows.forEach(row => {
    const { yr, mo, qtr: rawQtr } = parseDateAndQuarter(row, forceQuarterly)
    if (!yr) return

    // 打詐成效統計直接從「民國 113 年(2024年) 11 月」開始分析
    if (isPerformanceTable && (yr < 2024 || (yr === 2024 && mo <= 10))) {
      return
    }

    let finalQtr = rawQtr
    if (forceQuarterly) {
      const mVal = Number(row.月份 || row.月 || row.季 || row.季別 || 0)
      if (maxMonthColVal > 4 && mVal >= 1 && mVal <= 12) {
        finalQtr = Math.ceil(mVal / 3)
      } else if (mVal >= 1 && mVal <= 4) {
        finalQtr = mVal
      }
    }

    if (row.數值 !== undefined && row.數值 !== null) {
      const val = Number(String(row.數值).replace(/,/g, '')) || 0
      const unit = String(row.單位 || '件').trim()
      if (unit.toUpperCase() === 'GB') return

      const labelParts = []
      Object.entries(row).forEach(([k, v]) => {
        if (!metaKeys.has(k) && v !== null && v !== undefined) {
          const s = String(v).trim()
          if (s && s !== '總計' && s !== '合計') labelParts.push(s)
        }
      })

      let { category, name, baseName } = splitCategoryAndName(labelParts, fallbackTopicName)
      if (name === '總計' || name === '合計') return

      if (isPerformanceTable && unit === '元') {
        if (name.includes('查扣') || name.includes('不法所得')) {
          name = '查扣不法所得'
          baseName = '查扣不法所得'
        } else {
          name = '受害人被騙金額'
          baseName = '受害人被騙金額'
        }
      }

      records.push({ yr, mo, qtr: finalQtr, category, name, baseName, unit, val })
    } else {
      Object.entries(row).forEach(([k, v]) => {
        if (metaKeys.has(k) || v === null || v === undefined) return
        const num = Number(String(v).replace(/,/g, '').replace(/%/g, ''))
        if (!isNaN(num)) {
          let unit = '件'
          if (k.includes('率') || k.includes('比') || String(v).includes('%')) unit = '%'
          else if (k.includes('額') || k.includes('元')) unit = '元'
          else if (k.includes('話') || k.includes('通')) unit = '通'
          else if (k.includes('戶')) unit = '戶'
          else if (k.includes('人')) unit = '人'

          let { category, name, baseName } = splitCategoryAndName([k.trim()], fallbackTopicName)
          if (isPerformanceTable && unit === '元') {
            if (name.includes('查扣') || name.includes('不法所得')) {
              name = '查扣不法所得'
              baseName = '查扣不法所得'
            } else {
              name = '受害人被騙金額'
              baseName = '受害人被騙金額'
            }
          }

          records.push({ yr, mo, qtr: finalQtr, category, name, baseName, unit, val: num })
        }
      })
    }
  })

  return records
}

async function fetchAllRows(tableName, headers) {
  const pageSize = 1000
  let offset = 0
  let allData = []

  while (true) {
    const url = `${SUPABASE_URL}/rest/v1/${tableName}?select=*&limit=${pageSize}&offset=${offset}`
    const res = await fetch(url, { headers })
    if (!res.ok) {
      throw new Error(`讀取資料表 ${tableName} 失敗 (HTTP ${res.status})`)
    }
    const chunk = await res.json()
    allData = allData.concat(chunk)
    if (chunk.length < pageSize) break
    offset += pageSize
  }
  return allData
}

async function fetchFromSupabase() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    errorMsg.value = '尚未設定 .env 中的 VITE_SUPABASE_URL 或 VITE_SUPABASE_ANON_KEY！'
    isLoading.value = false
    return
  }

  try {
    isLoading.value = true
    const headers = {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`
    }

    const [warnAccRaw, perfRaw] = await Promise.all([
      fetchAllRows('fsc_warning_accounts', headers),
      fetchAllRows('anti_fraud_performance', headers)
    ])

    topicDataStore.value = {
      warning_acc: normalizeTableRows(warnAccRaw, '金管會警示帳戶', true, false),
      performance: normalizeTableRows(perfRaw, '打詐成效統計', false, true)
    }

    applyMonthPreset(3, '3m')
    autoSelectBestDualSeries()
  } catch (err) {
    console.error('載入資料失敗:', err)
    errorMsg.value = err.message || '連線至 Supabase 失敗，請確認網路與 RLS 權限設定。'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchFromSupabase()
})
</script>