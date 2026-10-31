<template>
  <main class="content dashboard-page">
    
    <!-- 1. 主標題與副標題 -->
    <header class="page-header">
      <h1 class="dashboard-title">📞假電話與盜刷防範：趨勢比較與關聯分析</h1>
      <p class="dashboard-subtitle">
        聚焦「信用卡盜刷統計」與「國際假電話攔阻」，透過雙軸折線圖直觀掌握財損金額、盜刷筆數與電信攔截趨勢！
      </p>
    </header>

    <div class="subpages" style="grid-template-columns: repeat(5, 1fr); margin: 0 auto;">
	  <router-link to="/fraud-patterns" :class="{ 'router-link-exact-active': $route.path === '/fraud-patterns' }"><i class="fas fa-map-marked-alt"></i>&nbsp;我住的縣市安全嗎？</router-link>
	  <router-link to="/fraud-trends" :class="{ 'router-link-exact-active': $route.path === '/fraud-trends' }"><i class="fas fa-users"></i>&nbsp;哪種人最容易被騙？</router-link>
	  <router-link to="/fraud-interception" :class="{ 'router-link-exact-active': $route.path === '/fraud-interception' }"><i class="fas fa-phone-slash"></i>&nbsp;假電話與盜刷防範</router-link>
	  <router-link to="/anti-fraud-results" :class="{ 'router-link-exact-active': $route.path === '/anti-fraud-results' }"><i class="fas fa-shield-alt"></i>&nbsp;警示戶與打詐成效</router-link>
	  <router-link to="/one-page-scam" :class="{ 'router-link-exact-active': $route.path === '/one-page-scam' }"><i class="fas fa-shopping-cart"></i>&nbsp;假網購長怎樣？</router-link>
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
        
        <!-- 步驟 1：選擇 2 大主題資料庫 -->
        <div class="filter-row">
          <div class="filter-group">
            <span class="step-tag">步驟1</span>
            <span class="filter-title">選擇防範分析主題：</span>
          </div>
          <span class="dataset-time-pill">{{ currentDatasetMeta.badge }}</span>
        </div>

        <div class="dataset-tabs-grid two-cols">
          <button 
            :class="['dataset-tab-btn', { active: activeTopic === 'card' }]" 
            @click="switchTopic('card')">
            <span class="tab-main-title">💳信用卡盜刷統計</span>
            <span class="tab-sub-meta">民國103年～至今｜按「月」統計（財損金額vs.發生筆數）</span>
          </button>

          <button 
            :class="['dataset-tab-btn', { active: activeTopic === 'calls' }]" 
            @click="switchTopic('calls')">
            <span class="tab-main-title">📞國際假電話攔阻</span>
            <span class="tab-sub-meta">民國113年～至今｜按「月」統計（國際來話總通數vs.阻絕通數）</span>
          </button>
        </div>

        <!-- 信用卡專屬：紫羅蘭色子分類切換區+各類期間總計 -->
        <div class="subcat-distinct-panel" v-if="activeTopic === 'card' && categorySummaries.length > 1">
          <div class="subcat-header-row">
            <span class="subcat-title">
              <i class="fas fa-layer-group"></i>選擇信用卡盜刷統計子分類（點選切換分類，按鈕直接顯示該類於{{ periodLabel }}之總計）：
            </span>

            <div class="unit-switch-group" v-if="availableUnits.length > 1">
              <span class="unit-label">📏下方排行榜檢視單位：</span>
              <button 
                v-for="u in availableUnits" 
                :key="u"
                :class="['unit-chip-btn', { active: activeUnit === u }]" 
                @click="selectedUnit = u; selectedItemName = ''">
                {{ u }}
              </button>
            </div>
          </div>

          <div class="subcat-buttons-grid">
            <button 
              v-for="catObj in categorySummaries" 
              :key="catObj.category"
              :class="['subcat-purple-btn', { active: activeCategory === catObj.category, 'is-all-sum': catObj.isAll }]" 
              @click="selectCategory(catObj.category)"
            >
              <span class="subcat-btn-name">
                {{ catObj.isAll ? `🏆${catObj.category}` : `📂${catObj.category}` }}
              </span>
              <span class="subcat-btn-total">
                <template v-for="(uObj, uIdx) in catObj.unitTotals" :key="uObj.unit">
                  <span v-if="uIdx > 0">｜</span>
                  <strong>{{ formatCompactUnitVal(uObj.total, uObj.unit) }}</strong> {{ uObj.unit }}
                </template>
              </span>
            </button>
          </div>
        </div>

        <div class="filter-divider"></div>

        <!-- 步驟 2：選時間區間（單行緊湊不換行） -->
        <div class="filter-row">
          <div class="filter-group">
            <span class="step-tag">步驟2</span>
            <span class="filter-title">選擇查詢期間：</span>

            <div class="btn-group">
              <button :class="['pill-btn', { active: presetPeriod === '3m' }]" @click="applyMonthPreset(3, '3m')">近 3 個月</button>
              <button :class="['pill-btn', { active: presetPeriod === '6m' }]" @click="applyMonthPreset(6, '6m')">近 6 個月</button>
              <button :class="['pill-btn', { active: presetPeriod === '1y' }]" @click="applyMonthPreset(12, '1y')">近 1 年</button>
              <button :class="['pill-btn', { active: presetPeriod === '3y' }]" @click="applyMonthPreset(36, '3y')">近 3 年</button>
            </div>
          </div>

          <div class="custom-date-box">
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

      <!-- 📈 核心互動區：雙軸折線趨勢圖 -->
      <section class="dual-chart-section card-box">
        <div class="dual-chart-header">
          <div class="dual-title-row">
            <h2>📈雙軸折線圖：雙指標時間趨勢與連動比較（{{ periodLabel }}）</h2>
            <div class="dual-header-badges">
              <button 
                v-if="activeTopic === 'card' && !isShowingDefaultOverall" 
                class="restore-overall-btn" 
                @click="restoreToOverallData()"
              >
                🔄還原至【{{ activeCategoryLabel }}】整體數據
              </button>
              <span class="valid-filter-badge">✅已自動排除無效與0值期別</span>
            </div>
          </div>
        </div>

        <div class="dual-chart-body-grid">
          
          <!-- 左側：高解析度原生 SVG 雙軸折線圖 -->
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
                🔵左軸單位：{{ dualChartData.leftUnit }}
              </text>
              <text :x="svgWidth - 10" :y="padTop - 14" text-anchor="end" class="axis-unit-title fill-orange">
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
                v-if="dualChartData.rightLinePath" 
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
                  :cx="pt.x" 
                  :cy="pt.rightY" 
                  :r="hoverIndex === idx ? 6.5 : 4.2" 
                  fill="#ffffff" 
                  stroke="#ea580c" 
                  stroke-width="2.8" 
                />
                <rect 
                  :x="pt.x - (chartInnerWidth / Math.max(2, dualChartData.points.length)) / 2"
                  :y="padTop"
                  :width="chartInnerWidth / Math.max(1, dualChartData.points.length)"
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
                <span class="hover-period-tag">📅{{ activeHoverPoint.fullLabel }}</span>
              </div>
              <div class="hover-values-right">
                <div class="hover-metric-blue">
                  🔵{{ dualChartData.leftTitle }}：<strong>{{ formatMetricValue(activeHoverPoint.leftVal) }} {{ dualChartData.leftUnit }}</strong>
                </div>
                <div class="hover-metric-orange">
                  🟠{{ dualChartData.rightTitle }}：<strong>{{ formatMetricValue(activeHoverPoint.rightVal) }} {{ dualChartData.rightUnit }}</strong>
                </div>
              </div>
            </div>
          </div>

          <!-- 右側：數據自動分析報告 -->
          <div class="dual-analysis-panel">
            <div class="analysis-title-bar">
              <h3>🧠雙指標趨勢與連動分析</h3>
              <span :class="['corr-badge', dualAnalysis.corrClass]">
                {{ dualAnalysis.corrLabel }}
              </span>
            </div>

            <div class="axis-summary-card card-left-border">
              <div class="axis-sum-top">
                <span class="axis-sum-name">🔵{{ dualChartData.leftTitle }}</span>
                <span :class="['delta-pill', getTrendClass(dualAnalysis.leftChangePct)]">
                  較前期 {{ formatChange(dualAnalysis.leftChangePct) }}
                </span>
              </div>
              <div class="axis-sum-nums">
                <div>
                  <small>期間總計</small>
                  <strong>{{ formatCompactUnitVal(dualAnalysis.leftTotal, dualChartData.leftUnit) }} {{ dualChartData.leftUnit }}</strong>
                </div>
                <div>
                  <small>月均水準</small>
                  <strong>{{ formatCompactUnitVal(dualAnalysis.leftAvg, dualChartData.leftUnit) }} {{ dualChartData.leftUnit }}</strong>
                </div>
                <div>
                  <small>期間最高峰</small>
                  <strong>{{ dualAnalysis.leftPeakPeriod }} ({{ formatCompactUnitVal(dualAnalysis.leftPeakVal, dualChartData.leftUnit) }})</strong>
                </div>
              </div>
            </div>

            <div class="axis-summary-card card-right-border">
              <div class="axis-sum-top">
                <span class="axis-sum-name">🟠{{ dualChartData.rightTitle }}</span>
                <span :class="['delta-pill', getTrendClass(dualAnalysis.rightChangePct)]">
                  較前期 {{ formatChange(dualAnalysis.rightChangePct) }}
                </span>
              </div>
              <div class="axis-sum-nums">
                <div>
                  <small>期間總計</small>
                  <strong>{{ formatCompactUnitVal(dualAnalysis.rightTotal, dualChartData.rightUnit) }} {{ dualChartData.rightUnit }}</strong>
                </div>
                <div>
                  <small>月均水準</small>
                  <strong>{{ formatCompactUnitVal(dualAnalysis.rightAvg, dualChartData.rightUnit) }} {{ dualChartData.rightUnit }}</strong>
                </div>
                <div>
                  <small>期間最高峰</small>
                  <strong>{{ dualAnalysis.rightPeakPeriod }} ({{ formatCompactUnitVal(dualAnalysis.rightPeakVal, dualChartData.rightUnit) }})</strong>
                </div>
              </div>
            </div>

            <div class="insight-box">
              <h4>🔍雙軸交叉洞察結論：</h4>
              <p>{{ dualAnalysis.insightText }}</p>
            </div>
          </div>

        </div>
      </section>

      <!-- 📞 國際假電話攔阻專屬：下方攔截比例診斷 ＋ 保命防詐習慣 -->
      <section class="dashboard-main-grid" v-if="activeTopic === 'calls'">
        <div class="card-box">
          <div class="detail-banner">
            <div>
              <span class="banner-tag">📍{{ periodLabel }}｜境外竄改來話防堵成效</span>
              <h2 style="font-size: 24px !important; margin-top: 6px !important;">
                📞國際假電話攔截比例分析
              </h2>
            </div>
            <div class="banner-pop">
              <span>統計有效月數</span><br>
              <strong>共{{ spanCount }}個月</strong>
            </div>
          </div>

          <div class="metrics-2x2">
            <div class="metric-item">
              <span class="metric-title">🛡️期間成功阻絕總通數</span>
              <div class="metric-value text-blue">
                {{ formatCompactUnitVal(callsSummary.blockedCalls, '通') }} <small>通</small>
              </div>
              <span class="metric-note">
                每月平均成功攔阻：{{ formatCompactUnitVal(callsSummary.monthlyBlocked, '通') }}通
              </span>
            </div>

            <div class="metric-item">
              <span class="metric-title">🌐期間國際來話總通數</span>
              <div class="metric-value text-red">
                {{ formatCompactUnitVal(callsSummary.totalCalls, '通') }} <small>通</small>
              </div>
              <span class="metric-note">
                每月平均國際來話：{{ formatCompactUnitVal(callsSummary.monthlyCalls, '通') }}通
              </span>
            </div>

            <div class="metric-item">
              <span class="metric-title">🎯期間平均攔截率</span>
              <div class="metric-value text-green">
                {{ callsSummary.interceptionRate }}<small>%</small>
              </div>
              <span class="metric-note">
                於電信源頭直接阻斷境外+886偽冒來電
              </span>
            </div>

            <div class="metric-item">
              <span class="metric-title">📈阻絕通數較前一期增減</span>
              <div :class="['metric-value', callsSummary.changePct > 0 ? 'text-red' : 'text-green']">
                {{ formatChange(callsSummary.changePct) }}
              </div>
              <span class="metric-note">
                前一期累計阻絕：{{ formatCompactUnitVal(callsSummary.prevBlockedCalls, '通') }}通
              </span>
            </div>
          </div>

          <div class="compare-block" style="margin-bottom: 0;">
            <div class="compare-header">
              <h4>⚖️【成功攔阻通數/國際來話總通數】比例視覺化對比：</h4>
            </div>
            <div class="compare-bar">
              <div 
                class="seg-victim" 
                style="background: #ea580c;"
                :style="{ width: Math.max(14, Math.round(callsSummary.interceptionRate)) + '%' }"
              >
                已攔截{{ callsSummary.interceptionRate }}%
              </div>
              <div 
                class="seg-suspect" 
                style="background: #3b82f6;"
                :style="{ width: (100 - Math.max(14, Math.round(callsSummary.interceptionRate))) + '%' }"
              >
                一般國際來話{{ (100 - callsSummary.interceptionRate).toFixed(1) }}%
              </div>
            </div>
            <p class="compare-caption">
              💡電信商已在源頭攔截大量偽冒「+886」之國際竄改來話；民眾若接到帶「+」號卻自稱國內銀行、電商或檢警之電話，請直接掛斷！
            </p>
          </div>
        </div>

        <div class="card-box">
          <div class="habits-block" style="height: 100%; display: flex; flex-direction: column; justify-content: center;">
            <h4>🛡️保命防詐的三個習慣</h4>
            <ol class="habits-list">
              <li v-for="(tip, idx) in currentPreventionTips" :key="'call-tip-'+idx" style="margin-bottom: 12px;">
                <strong>{{ tip.title }}：</strong>{{ tip.body }}
              </li>
            </ol>
          </div>
        </div>
      </section>

      <!-- 💳 信用卡盜刷統計專屬：下方細項排行榜與右側詳情 -->
      <section class="dashboard-main-grid" v-else>
        
        <div class="card-box">
          <div class="box-header">
            <div>
              <h2>📊{{ periodLabel }} 【{{ activeCategoryLabel }}】有效項目總計排行（單位：{{ activeUnit }}）</h2>
              <p class="box-subtitle">
                👆點擊任一項目或「左軸/右軸」可帶入圖表比較；<strong>對已選中的項目或按鈕「再點一下」即可還原至整體數據！</strong>
              </p>
            </div>

            <div class="search-input-wrap" v-if="periodAnalysisList.length > 5">
              <input 
                type="text" 
                v-model.trim="searchKeyword" 
                placeholder="🔍輸入名稱快速篩選..." 
                class="clean-search-input"
              />
            </div>
          </div>

          <div class="list-sort-bar">
            <span class="date-label">列表排序：</span>
            <button :class="['pill-btn', { active: sortBy === 'raw' }]" @click="sortBy = 'raw'">📊按期間總計高低</button>
            <button :class="['pill-btn', { active: sortBy === 'change' }]" @click="sortBy = 'change'">📈按較前期增減幅度(%)</button>
          </div>

          <div class="spacious-ranking-list">
            <div 
              v-for="(item, index) in sortedItems" 
              :key="item.name"
              :class="['spacious-rank-row', { active: selectedItemName === item.name }]"
              @click="onToggleRankItem(item)"
            >
              <div class="spacious-row-top">
                <div class="spacious-title-group">
                  <span :class="['fixed-rank-badge', getRankBadgeClass(index)]">{{ index + 1 }}</span>
                  <span class="spacious-item-name">{{ item.name }}</span>
                </div>

                <div class="spacious-metrics-group">
                  <button 
                    class="Quick-axis-btn btn-to-left" 
                    :class="{ active: leftSeriesKey === item.seriesKey }"
                    title="點擊設為左軸(藍線)；再點一下還原至整體數據"
                    @click.stop="toggleLeftAxis(item)"
                  >
                    🔵左軸
                  </button>
                  <button 
                    class="Quick-axis-btn btn-to-right" 
                    :class="{ active: rightSeriesKey === item.seriesKey }"
                    title="點擊設為右軸(橘線)；再點一下還原至整體數據"
                    @click.stop="toggleRightAxis(item)"
                  >
                    🟠右軸
                  </button>

                  <span class="spacious-primary-val">
                    總計<strong>{{ formatCompactUnitVal(item.totalCount, activeUnit) }}</strong>{{ activeUnit }}
                    <small class="sub-count-hint">({{ item.sharePct }}%)</small>
                  </span>
                  <span :class="['delta-pill', getTrendClass(item.changePct)]">
                    {{ formatChange(item.changePct) }}
                  </span>
                </div>
              </div>

              <div class="spacious-bar-track">
                <div 
                  class="spacious-bar-fill" 
                  :style="{ 
                    width: getBarWidth(item)+'%',
                    background: getBarColor(index, item)
                  }"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div class="card-box detail-card" v-if="currentDetailData">
          
          <div class="detail-banner">
            <div style="padding-right: 12px;">
              <span class="banner-tag">
                📍{{ periodLabel }}｜{{ currentDetailData.isOverall ? '整體數據總覽' : activeCategoryLabel }}
              </span>
              <h2 style="font-size: 24px !important; line-height: 1.35; margin-top: 6px !important;">
                {{ currentDetailData.name }}
              </h2>
            </div>
            <div class="banner-pop" style="flex-shrink: 0;">
              <template v-if="currentDetailData.isOverall">
                <span>目前檢視模式</span><br>
                <strong>🏆整體數據(共{{ sortedItems.length }}項)</strong>
              </template>
              <template v-else>
                <span>有效項目排行</span><br>
                <strong>第{{ currentItemRank }}名/共{{ sortedItems.length }}項</strong>
              </template>
            </div>
          </div>

          <div class="metrics-2x2">
            <div class="metric-item">
              <span class="metric-title">🚨本期累計總計({{ spanCount }}個月)</span>
              <div class="metric-value text-red">
                {{ formatCompactUnitVal(currentDetailData.totalCount, activeUnit) }} <small>{{ activeUnit }}</small>
              </div>
              <span class="metric-note">
                每月平均{{ formatCompactUnitVal(currentDetailData.periodAvg, activeUnit) }} {{ activeUnit }}
              </span>
            </div>

            <div class="metric-item">
              <span class="metric-title">📈較前一期({{ spanCount }}個月)增減</span>
              <div :class="['metric-value', currentDetailData.changePct > 0 ? 'text-red' : 'text-green']">
                {{ formatChange(currentDetailData.changePct) }}
              </div>
              <span class="metric-note">
                前期總計為 {{ formatCompactUnitVal(currentDetailData.prevTotalCount, activeUnit) }} {{ activeUnit }}
              </span>
            </div>

            <div class="metric-item">
              <span class="metric-title">🎯佔【{{ activeCategoryLabel }}】總計比例</span>
              <div class="metric-value text-orange">
                {{ currentDetailData.sharePct }}<small>%</small>
              </div>
              <span class="metric-note">
                本類全體總計：{{ formatCompactUnitVal(totalPeriodCount, activeUnit) }} {{ activeUnit }}
              </span>
            </div>

            <div class="metric-item">
              <span class="metric-title">📊前後期增減差額</span>
              <div :class="['metric-value', (currentDetailData.totalCount - currentDetailData.prevTotalCount) > 0 ? 'text-purple' : 'text-green']">
                {{ (currentDetailData.totalCount - currentDetailData.prevTotalCount) > 0 ? '+' : '' }}{{ formatCompactUnitVal(currentDetailData.totalCount - currentDetailData.prevTotalCount, activeUnit) }} <small>{{ activeUnit }}</small>
              </div>
              <span class="metric-note">
                本期減去前一期之實際數量變化
              </span>
            </div>
          </div>

          <div class="compare-block">
            <div class="compare-header">
              <h4>⚖️【{{ currentDetailData.name }}】本期vs.前一期總計規模對比：</h4>
            </div>
            <div class="compare-bar">
              <div 
                class="seg-victim" 
                :style="{ width: getPeriodCompareRatio(currentDetailData)+'%' }"
              >
                本期{{ formatCompactUnitVal(currentDetailData.totalCount, activeUnit) }} {{ activeUnit }} ({{ getPeriodCompareRatio(currentDetailData) }}%)
              </div>
              <div 
                class="seg-suspect" 
                :style="{ width: (100 - getPeriodCompareRatio(currentDetailData))+'%' }"
              >
                前一期{{ formatCompactUnitVal(currentDetailData.prevTotalCount, activeUnit) }} {{ activeUnit }} ({{ 100 - getPeriodCompareRatio(currentDetailData) }}%)
              </div>
            </div>
            <p class="compare-caption">
              💡點選下方排行榜任一列可檢視單項趨勢，對著同一列或「左軸/右軸」按鈕再點一下，即可隨時還原至【整體數據】！
            </p>
          </div>

          <div class="habits-block">
            <h4>🛡️保命防詐的三個習慣</h4>
            <ol class="habits-list">
              <li v-for="(tip, idx) in currentPreventionTips" :key="idx">
                <strong>{{ tip.title }}：</strong>{{ tip.body }}
              </li>
            </ol>
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

const ALL_CAT_KEY = '全類別總計'

// 第 3 頁僅負責 'card' (信用卡盜刷) 與 'calls' (國際假電話攔阻)
const activeTopic = ref('card')
const selectedCategory = ref(ALL_CAT_KEY)
const selectedUnit = ref('')
const selectedItemName = ref('')
const searchKeyword = ref('')

const leftSeriesKey = ref('')
const rightSeriesKey = ref('')
const defaultLeftKey = ref('')
const defaultRightKey = ref('')
const hoverIndex = ref(-1)

const svgWidth = 760
const svgHeight = 320
const padLeft = 72
const padRight = 72
const padTop = 38
const padBottom = 38
const chartInnerWidth = svgWidth - padLeft - padRight
const chartInnerHeight = svgHeight - padTop - padBottom

const presetPeriod = ref('3m')
const startYear = ref(2026)
const startMonth = ref(5)
const endYear = ref(2026)
const endMonth = ref(7)
const sortBy = ref('raw')

const topicDataStore = ref({
  card: [],
  calls: []
})

const DATASET_META = {
  card: {
    title: '信用卡盜刷統計',
    badge: '📅資料範圍：民國103年至今（月度資料）',
    minAllowedYear: 2014
  },
  calls: {
    title: '國際假電話攔阻統計',
    badge: '⚡資料範圍：民國113年至今（月度攔阻資料）',
    minAllowedYear: 2024
  }
}

const currentDatasetMeta = computed(() => DATASET_META[activeTopic.value] || DATASET_META.card)

function toMonthIndex(y, m) {
  return y * 12 + (m - 1)
}

const currentTopicRecords = computed(() => {
  return topicDataStore.value[activeTopic.value] || []
})

const topicBounds = computed(() => {
  const minFloorYear = currentDatasetMeta.value.minAllowedYear
  let minMIdx = 999999
  let maxMIdx = 0

  currentTopicRecords.value.forEach(r => {
    if (r.val > 0 && r.yr >= minFloorYear) {
      const mIdx = toMonthIndex(r.yr, r.mo)
      if (mIdx < minMIdx) minMIdx = mIdx
      if (mIdx > maxMIdx) maxMIdx = mIdx
    }
  })

  if (maxMIdx === 0) {
    return {
      minYear: minFloorYear,
      minMonth: 1,
      minMonthIdx: toMonthIndex(minFloorYear, 1),
      maxYear: 2026,
      latestMonth: 7,
      maxMonthIdx: toMonthIndex(2026, 7)
    }
  }

  return {
    minYear: Math.floor(minMIdx / 12),
    minMonth: (minMIdx % 12) + 1,
    minMonthIdx: minMIdx,
    maxYear: Math.floor(maxMIdx / 12),
    latestMonth: (maxMIdx % 12) + 1,
    maxMonthIdx: maxMIdx
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
  return `${startYear.value - 1911}年${startMonth.value}月 ~ ${endYear.value - 1911}年${endMonth.value}月`
})

const spanCount = computed(() => {
  const diff = toMonthIndex(endYear.value, endMonth.value) - toMonthIndex(startYear.value, startMonth.value) + 1
  return Math.max(1, diff)
})

const categorySummaries = computed(() => {
  const curStart = toMonthIndex(startYear.value, startMonth.value)
  const curEnd = toMonthIndex(endYear.value, endMonth.value)

  const catUnitMap = {}
  const allUnitMap = {}

  currentTopicRecords.value.forEach(r => {
    if (!r.category || !r.unit) return
    const idx = toMonthIndex(r.yr, r.mo)
    if (idx < curStart || idx > curEnd) return

    if (!catUnitMap[r.category]) catUnitMap[r.category] = {}
    catUnitMap[r.category][r.unit] = (catUnitMap[r.category][r.unit] || 0) + r.val
    allUnitMap[r.unit] = (allUnitMap[r.unit] || 0) + r.val
  })

  const distinctCats = Object.keys(catUnitMap)
  const result = []

  if (distinctCats.length > 1) {
    const allUnitsArr = Object.entries(allUnitMap)
      .filter(([, total]) => total > 0)
      .map(([unit, total]) => ({ unit, total: Math.round(total * 10) / 10 }))
    if (allUnitsArr.length > 0) {
      result.push({
        category: ALL_CAT_KEY,
        isAll: true,
        unitTotals: allUnitsArr,
        sortWeight: Number.MAX_SAFE_INTEGER
      })
    }
  }

  distinctCats.forEach(cat => {
    const unitTotals = Object.entries(catUnitMap[cat])
      .filter(([, total]) => total > 0)
      .map(([unit, total]) => ({ unit, total: Math.round(total * 10) / 10 }))
    if (unitTotals.length > 0) {
      result.push({
        category: cat,
        isAll: false,
        unitTotals,
        sortWeight: unitTotals[0].total
      })
    }
  })

  return result.sort((a, b) => b.sortWeight - a.sortWeight)
})

const activeCategory = computed(() => {
  const cats = categorySummaries.value.map(c => c.category)
  if (selectedCategory.value && cats.includes(selectedCategory.value)) {
    return selectedCategory.value
  }
  return cats[0] || ''
})

const activeCategoryLabel = computed(() => {
  return activeCategory.value || currentDatasetMeta.value.title
})

const availableUnits = computed(() => {
  const units = new Set()
  const cat = activeCategory.value
  currentTopicRecords.value.forEach(r => {
    const matchCat = (cat === ALL_CAT_KEY || !cat || r.category === cat)
    if (matchCat && r.unit && r.unit.toUpperCase() !== 'GB') {
      units.add(r.unit)
    }
  })
  return Array.from(units)
})

const activeUnit = computed(() => {
  if (selectedUnit.value && availableUnits.value.includes(selectedUnit.value)) {
    return selectedUnit.value
  }
  return availableUnits.value[0] || '件'
})

const validSeriesOptions = computed(() => {
  const curStart = toMonthIndex(startYear.value, startMonth.value)
  const curEnd = toMonthIndex(endYear.value, endMonth.value)

  const seriesStats = {}
  const multiCat = categorySummaries.value.length > 1

  currentTopicRecords.value.forEach(r => {
    const idx = toMonthIndex(r.yr, r.mo)
    const inPeriod = idx >= curStart && idx <= curEnd

    if (multiCat) {
      const allKey = `__ALL__||${ALL_CAT_KEY}||${r.unit}`
      if (!seriesStats[allKey]) {
        seriesStats[allKey] = {
          key: allKey,
          category: ALL_CAT_KEY,
          name: `全類別總計 (${r.unit})`,
          baseName: ALL_CAT_KEY,
          unit: r.unit,
          label: `🏆【全類別總計】(${r.unit})`,
          isAllSum: true,
          isCategorySum: false,
          periodTotal: 0,
          activeMonths: new Set(),
          priorityTier: 3
        }
      }
      if (inPeriod && r.val > 0) {
        seriesStats[allKey].periodTotal += r.val
        seriesStats[allKey].activeMonths.add(idx)
      }

      const catKey = `__CAT__||${r.category}||${r.unit}`
      if (!seriesStats[catKey]) {
        seriesStats[catKey] = {
          key: catKey,
          category: r.category,
          name: `${r.category}總計 (${r.unit})`,
          baseName: r.category,
          unit: r.unit,
          label: `📂【${r.category}】整體總計(${r.unit})`,
          isAllSum: false,
          isCategorySum: true,
          periodTotal: 0,
          activeMonths: new Set(),
          priorityTier: 2
        }
      }
      if (inPeriod && r.val > 0) {
        seriesStats[catKey].periodTotal += r.val
        seriesStats[catKey].activeMonths.add(idx)
      }
    }

    const itemKey = `${r.category}||${r.name}||${r.unit}`
    if (!seriesStats[itemKey]) {
      const label = (multiCat && r.category !== r.name) ? `${r.category} - ${r.name}` : r.name
      seriesStats[itemKey] = {
        key: itemKey,
        category: r.category,
        name: r.name,
        baseName: r.baseName || r.name,
        unit: r.unit,
        label,
        isAllSum: false,
        isCategorySum: false,
        periodTotal: 0,
        activeMonths: new Set(),
        priorityTier: 1
      }
    }
    if (inPeriod && r.val > 0) {
      seriesStats[itemKey].periodTotal += r.val
      seriesStats[itemKey].activeMonths.add(idx)
    }
  })

  const allArr = Object.values(seriesStats)
  const minActivePeriods = spanCount.value >= 6 ? 2 : 1
  const filtered = allArr.filter(s => {
    if (s.periodTotal <= 0) return false
    if (!s.isAllSum && !s.isCategorySum && s.activeMonths.size < minActivePeriods) return false
    return true
  })

  const finalList = filtered.length > 0 ? filtered : allArr.filter(s => s.periodTotal > 0)
  const unitOrder = (u) => (u === '元' ? 1 : 2)

  return finalList.sort((a, b) => {
    if (b.priorityTier !== a.priorityTier) return b.priorityTier - a.priorityTier
    if (a.isAllSum || a.isCategorySum) {
      if (a.category === b.category && a.unit !== b.unit) {
        return unitOrder(a.unit) - unitOrder(b.unit)
      }
    }
    return b.periodTotal - a.periodTotal
  })
})

function autoSelectBestDualSeries(targetCategory = activeCategory.value) {
  const opts = validSeriesOptions.value
  if (!opts.length) {
    leftSeriesKey.value = ''
    rightSeriesKey.value = ''
    defaultLeftKey.value = ''
    defaultRightKey.value = ''
    return
  }

  let chosenL = opts[0].key
  let chosenR = opts.length > 1 ? opts[1].key : opts[0].key

  const assignBlueYuanOrangeCount = (pairArr) => {
    const yuanOpt = pairArr.find(o => o.unit === '元')
    const countOpt = pairArr.find(o => o.unit !== '元')
    if (yuanOpt && countOpt) {
      return [yuanOpt.key, countOpt.key]
    }
    return [pairArr[0].key, pairArr[1].key]
  }

  if (targetCategory === ALL_CAT_KEY) {
    const allSums = opts.filter(o => o.isAllSum)
    if (allSums.length >= 2) {
      ;[chosenL, chosenR] = assignBlueYuanOrangeCount(allSums)
    }
  } else {
    const catSums = opts.filter(o => o.isCategorySum && o.category === targetCategory)
    if (catSums.length >= 2) {
      ;[chosenL, chosenR] = assignBlueYuanOrangeCount(catSums)
    } else {
      const catItems = opts.filter(o => !o.isAllSum && !o.isCategorySum && o.category === targetCategory)
      if (catItems.length >= 2) {
        const topFirst = catItems[0]
        const pairedDiffUnit = catItems.find(o => o.baseName === topFirst.baseName && o.unit !== topFirst.unit) ||
                               catItems.find(o => o.unit !== topFirst.unit) ||
                               catItems[1]
        ;[chosenL, chosenR] = assignBlueYuanOrangeCount([topFirst, pairedDiffUnit])
      }
    }
  }

  defaultLeftKey.value = chosenL
  defaultRightKey.value = chosenR
  leftSeriesKey.value = chosenL
  rightSeriesKey.value = chosenR
}

const isShowingDefaultOverall = computed(() => {
  return !selectedItemName.value &&
         leftSeriesKey.value === defaultLeftKey.value &&
         rightSeriesKey.value === defaultRightKey.value
})

function restoreToOverallData() {
  selectedItemName.value = ''
  autoSelectBestDualSeries(activeCategory.value)
}

function onToggleRankItem(item) {
  if (selectedItemName.value === item.name) {
    restoreToOverallData()
    return
  }

  selectedItemName.value = item.name
  const opts = validSeriesOptions.value
  const currentOpt = opts.find(o => o.key === item.seriesKey)
  if (!currentOpt) return

  const twinOpt = opts.find(o =>
    !o.isAllSum &&
    !o.isCategorySum &&
    o.category === currentOpt.category &&
    o.baseName === currentOpt.baseName &&
    o.unit !== currentOpt.unit
  )

  if (twinOpt) {
    if (currentOpt.unit === '元') {
      leftSeriesKey.value = currentOpt.key
      rightSeriesKey.value = twinOpt.key
    } else if (twinOpt.unit === '元') {
      leftSeriesKey.value = twinOpt.key
      rightSeriesKey.value = currentOpt.key
    } else {
      leftSeriesKey.value = currentOpt.key
      rightSeriesKey.value = twinOpt.key
    }
  } else {
    leftSeriesKey.value = currentOpt.key
  }
}

function toggleLeftAxis(item) {
  if (leftSeriesKey.value === item.seriesKey) {
    leftSeriesKey.value = defaultLeftKey.value
    if (rightSeriesKey.value === defaultRightKey.value) {
      selectedItemName.value = ''
    }
  } else {
    leftSeriesKey.value = item.seriesKey
    selectedItemName.value = item.name
  }
}

function toggleRightAxis(item) {
  if (rightSeriesKey.value === item.seriesKey) {
    rightSeriesKey.value = defaultRightKey.value
    if (leftSeriesKey.value === defaultLeftKey.value) {
      selectedItemName.value = ''
    }
  } else {
    rightSeriesKey.value = item.seriesKey
    selectedItemName.value = item.name
  }
}

const dualChartData = computed(() => {
  const opts = validSeriesOptions.value
  const leftOpt = opts.find(o => o.key === leftSeriesKey.value) || opts[0]
  const rightOpt = opts.find(o => o.key === rightSeriesKey.value) || opts[1] || opts[0]

  if (!leftOpt || !rightOpt) {
    return { points: [], leftLinePath: '', leftAreaPath: '', rightLinePath: '', leftTitle: '', rightTitle: '', leftUnit: '', rightUnit: '', leftBounds: [0, 10], rightBounds: [0, 10] }
  }

  const curStart = toMonthIndex(startYear.value, startMonth.value)
  const curEnd = toMonthIndex(endYear.value, endMonth.value)

  const timeBuckets = []
  for (let idx = curStart; idx <= curEnd; idx++) {
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

  const bucketMap = {}
  timeBuckets.forEach(b => { bucketMap[b.idx] = b })

  const matchRecordToOption = (r, opt) => {
    if (opt.isAllSum) return r.unit === opt.unit
    if (opt.isCategorySum) return r.category === opt.category && r.unit === opt.unit
    return r.category === opt.category && r.name === opt.name && r.unit === opt.unit
  }

  currentTopicRecords.value.forEach(r => {
    const idx = toMonthIndex(r.yr, r.mo)
    const b = bucketMap[idx]
    if (!b) return
    if (matchRecordToOption(r, leftOpt)) b.leftVal += r.val
    if (matchRecordToOption(r, rightOpt)) b.rightVal += r.val
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

  const leftBounds = calcBounds(leftVals)
  const rightBounds = calcBounds(rightVals)

  const points = timeBuckets.map((b, i) => {
    const x = n === 1 ? padLeft + chartInnerWidth / 2 : padLeft + (i / (n - 1)) * chartInnerWidth
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
})

const dualAnalysis = computed(() => {
  const pts = dualChartData.value.points
  if (!pts.length) {
    return {
      leftTotal: 0, leftAvg: 0, leftPeakVal: 0, leftPeakPeriod: '-', leftChangePct: 0,
      rightTotal: 0, rightAvg: 0, rightPeakVal: 0, rightPeakPeriod: '-', rightChangePct: 0,
      corrLabel: '無資料', corrClass: 'pill-neutral', insightText: '請選擇包含有效數據之時間區間。'
    }
  }

  let leftTotal = 0, rightTotal = 0
  let leftPeakVal = -1, leftPeakPeriod = '-'
  let rightPeakVal = -1, rightPeakPeriod = '-'
  let nonZeroBothCount = 0

  pts.forEach(p => {
    leftTotal += p.leftVal
    rightTotal += p.rightVal
    if (p.leftVal > 0 && p.rightVal > 0) nonZeroBothCount++
    if (p.leftVal > leftPeakVal) { leftPeakVal = p.leftVal; leftPeakPeriod = p.shortLabel }
    if (p.rightVal > rightPeakVal) { rightPeakVal = p.rightVal; rightPeakPeriod = p.shortLabel }
  })

  const n = pts.length
  const leftAvg = leftTotal / n
  const rightAvg = rightTotal / n

  const half = Math.max(1, Math.floor(n / 2))
  const leftFirstHalf = pts.slice(0, half).reduce((s, p) => s + p.leftVal, 0)
  const leftSecondHalf = pts.slice(-half).reduce((s, p) => s + p.leftVal, 0)
  const rightFirstHalf = pts.slice(0, half).reduce((s, p) => s + p.rightVal, 0)
  const rightSecondHalf = pts.slice(-half).reduce((s, p) => s + p.rightVal, 0)

  const leftChangePct = leftFirstHalf > 0 ? Number((((leftSecondHalf - leftFirstHalf) / leftFirstHalf) * 100).toFixed(1)) : 0
  const rightChangePct = rightFirstHalf > 0 ? Number((((rightSecondHalf - rightFirstHalf) / rightFirstHalf) * 100).toFixed(1)) : 0

  let extraRatioText = ''
  if (dualChartData.value.leftUnit === '元' && (dualChartData.value.rightUnit === '筆' || dualChartData.value.rightUnit === '件') && rightTotal > 0) {
    const avgMoneyPerUnit = Math.round(leftTotal / rightTotal)
    extraRatioText = ` 平均每1${dualChartData.value.rightUnit}案件金額達${avgMoneyPerUnit.toLocaleString()}元！`
  }

  if (nonZeroBothCount < 3) {
    return {
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
      corrLabel: `有效期間共${nonZeroBothCount}月`,
      corrClass: 'pill-neutral',
      insightText: `在所選期間內，左軸於${leftPeakPeriod}達最高點（${formatMetricValue(leftPeakVal)}${dualChartData.value.leftUnit}），右軸於${rightPeakPeriod}達最高點。${extraRatioText}`
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
    insightText = `在所選期間內，「${dualChartData.value.leftTitle}」與「${dualChartData.value.rightTitle}」呈現高度同步消長（r=+${rRound}）。左軸高峰位於${leftPeakPeriod}，右軸高峰位於${rightPeakPeriod}。${extraRatioText}`
  } else if (rRound <= -0.45) {
    corrLabel = `反向消長趨勢(r=${rRound})`
    corrClass = 'pill-down'
    insightText = `「${dualChartData.value.leftTitle}」與「${dualChartData.value.rightTitle}」呈現反向變動（r=${rRound}）。${extraRatioText}`
  } else {
    corrLabel = `各自獨立波動(r=${rRound})`
    corrClass = 'pill-neutral'
    insightText = `兩項指標波動幅度存在差異（r=${rRound}）。左軸於${leftPeakPeriod}達最高峰，右軸則於${rightPeakPeriod}達到峰值。${extraRatioText}`
  }

  return {
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

const callsSummary = computed(() => {
  const curStart = toMonthIndex(startYear.value, startMonth.value)
  const curEnd = toMonthIndex(endYear.value, endMonth.value)
  const span = Math.max(1, curEnd - curStart + 1)
  const prevStart = curStart - span
  const prevEnd = curStart - 1

  let totalCalls = 0
  let blockedCalls = 0
  let prevBlockedCalls = 0

  const callRecords = topicDataStore.value.calls || []
  callRecords.forEach(r => {
    const idx = toMonthIndex(r.yr, r.mo)
    if (idx >= curStart && idx <= curEnd) {
      if (r.name.includes('總通數')) totalCalls += r.val
      else if (r.name.includes('阻絕') || r.name.includes('攔阻')) blockedCalls += r.val
    } else if (idx >= prevStart && idx <= prevEnd) {
      if (r.name.includes('阻絕') || r.name.includes('攔阻')) prevBlockedCalls += r.val
    }
  })

  const interceptionRate = totalCalls > 0
    ? Number(((blockedCalls / totalCalls) * 100).toFixed(2))
    : 0

  const changePct = prevBlockedCalls > 0
    ? Number((((blockedCalls - prevBlockedCalls) / prevBlockedCalls) * 100).toFixed(1))
    : 0

  return {
    totalCalls: Math.round(totalCalls),
    blockedCalls: Math.round(blockedCalls),
    prevBlockedCalls: Math.round(prevBlockedCalls),
    monthlyCalls: Math.round(totalCalls / span),
    monthlyBlocked: Math.round(blockedCalls / span),
    interceptionRate,
    changePct
  }
})

function switchTopic(topic) {
  activeTopic.value = topic
  selectedItemName.value = ''
  searchKeyword.value = ''
  hoverIndex.value = -1

  applyMonthPreset(3, '3m')
  selectedCategory.value = categorySummaries.value[0]?.category || ''
  selectedUnit.value = availableUnits.value[0] || ''
  autoSelectBestDualSeries(selectedCategory.value)
}

function selectCategory(cat) {
  selectedCategory.value = cat
  selectedItemName.value = ''
  selectedUnit.value = availableUnits.value[0] || ''
  autoSelectBestDualSeries(cat)
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

const periodAnalysisList = computed(() => {
  const cat = activeCategory.value
  const unit = activeUnit.value
  const filtered = currentTopicRecords.value.filter(r =>
    (cat === ALL_CAT_KEY || !cat || r.category === cat) && r.unit === unit
  )

  const curStart = toMonthIndex(startYear.value, startMonth.value)
  const curEnd = toMonthIndex(endYear.value, endMonth.value)

  const span = Math.max(1, curEnd - curStart + 1)
  const prevStart = curStart - span
  const prevEnd = curStart - 1

  const groupMap = {}

  for (const r of filtered) {
    const idx = toMonthIndex(r.yr, r.mo)
    const displayName = (cat === ALL_CAT_KEY && r.category !== r.name) ? `${r.category} - ${r.name}` : r.name
    if (!groupMap[displayName]) {
      groupMap[displayName] = {
        name: displayName,
        seriesKey: `${r.category}||${r.name}||${r.unit}`,
        curTotal: 0,
        prevTotal: 0
      }
    }
    const obj = groupMap[displayName]
    if (idx >= curStart && idx <= curEnd) {
      obj.curTotal += r.val
    } else if (idx >= prevStart && idx <= prevEnd) {
      obj.prevTotal += r.val
    }
  }

  const rawList = Object.values(groupMap).filter(g => g.curTotal > 0)
  const grandTotalCur = rawList.reduce((s, g) => s + g.curTotal, 0)

  return rawList.map(g => {
    const periodAvg = g.curTotal / span
    const prevPeriodAvg = g.prevTotal / span
    const sharePct = grandTotalCur > 0 ? Number(((g.curTotal / grandTotalCur) * 100).toFixed(1)) : 0

    let changePct = 0
    if (g.prevTotal > 0) {
      changePct = ((g.curTotal - g.prevTotal) / g.prevTotal) * 100
    }

    return {
      name: g.name,
      seriesKey: g.seriesKey,
      totalCount: Math.round(g.curTotal * 100) / 100,
      prevTotalCount: Math.round(g.prevTotal * 100) / 100,
      periodAvg: Math.round(periodAvg * 10) / 10,
      prevPeriodAvg: Math.round(prevPeriodAvg * 10) / 10,
      sharePct,
      changePct: Number(changePct.toFixed(1))
    }
  })
})

const sortedItems = computed(() => {
  let list = [...periodAnalysisList.value]
  if (searchKeyword.value) {
    const kw = searchKeyword.value.toLowerCase()
    list = list.filter(i => i.name.toLowerCase().includes(kw))
  }
  if (sortBy.value === 'change') {
    return list.sort((a, b) => b.changePct - a.changePct)
  }
  return list.sort((a, b) => b.totalCount - a.totalCount)
})

const totalPeriodCount = computed(() => {
  return Math.round(periodAnalysisList.value.reduce((s, i) => s + i.totalCount, 0) * 100) / 100
})

const totalPrevPeriodCount = computed(() => {
  return Math.round(periodAnalysisList.value.reduce((s, i) => s + i.prevTotalCount, 0) * 100) / 100
})

const currentDetailData = computed(() => {
  if (selectedItemName.value) {
    const found = sortedItems.value.find(i => i.name === selectedItemName.value)
    if (found) return { ...found, isOverall: false }
  }
  if (!sortedItems.value.length) return null

  const curSum = totalPeriodCount.value
  const prevSum = totalPrevPeriodCount.value
  const span = Math.max(1, spanCount.value)
  let changePct = 0
  if (prevSum > 0) {
    changePct = Number((((curSum - prevSum) / prevSum) * 100).toFixed(1))
  }

  return {
    name: `【${activeCategoryLabel.value}】整體數據總計`,
    totalCount: curSum,
    prevTotalCount: prevSum,
    periodAvg: Math.round((curSum / span) * 10) / 10,
    prevPeriodAvg: Math.round((prevSum / span) * 10) / 10,
    sharePct: 100,
    changePct,
    isOverall: true
  }
})

const currentItemRank = computed(() => {
  const idx = sortedItems.value.findIndex(i => i.name === selectedItemName.value)
  return idx >= 0 ? idx + 1 : 1
})

const currentPreventionTips = computed(() => {
  if (activeTopic.value === 'card') {
    return [
      { title: '收到「水電費、ETC、包裹補稅、積分到期」簡訊別點連結', body: '釣魚網站會誘導輸入卡號與OTP一次性驗證碼，實則是將你的信用卡綁定到歹徒的Apple Pay/Google Pay。' },
      { title: '輸入OTP驗證碼前，務必看清楚「刷卡金額與幣別」', body: '若簡訊寫著刷卡金額為外幣、或高達數萬元（非宣稱的幾十元費用），請立刻關閉網頁切勿輸入！' },
      { title: '開啟銀行App刷卡即時推播，關閉不常用之海外無卡交易', body: '透過銀行App設定單筆刷卡上限與即時通知，一旦發現不明消費立即於App內一鍵鎖卡並聯繫客服處理。' }
    ]
  }
  return [
    { title: '電話開頭有「+」號（如+886、+886-2）自稱國內機構必為詐騙', body: '國內銀行、電商客服或檢警機關從台灣撥打電話，來電顯示絕對不會出現「+」號。' },
    { title: '關閉手機中不常使用的「FaceTime陌生來電」與「iMessage垃圾訊息」', body: '由於傳統國際假電話被大量攔截，詐騙集團常改用網路語音通話，請勿接聽陌生帳號來電。' },
    { title: '聽到「解除分期付款、升等高級會員、帳戶涉案」三秒掛斷', body: '先掛斷電話，自己上網查官方客服電話回撥，或直接撥打165反詐騙專線查證。' }
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

function getBarWidth(item) {
  const list = sortedItems.value
  if (!list.length) return 0
  if (sortBy.value === 'change') {
    const max = Math.max(...list.map(i => Math.abs(i.changePct)), 1)
    return Math.min(100, Math.max(6, Math.round((Math.abs(item.changePct) / max) * 100)))
  }
  const max = Math.max(...list.map(i => i.totalCount), 1)
  return Math.min(100, Math.max(6, Math.round((item.totalCount / max) * 100)))
}

function getBarColor(index, item) {
  if (sortBy.value === 'change') {
    return item.changePct > 0
      ? 'linear-gradient(90deg, #f97316, #ef4444)'
      : 'linear-gradient(90deg, #10b981, #059669)'
  }
  if (index < 3) return 'linear-gradient(90deg, #ef4444, #dc2626)'
  if (index < 8) return 'linear-gradient(90deg, #f59e0b, #ea580c)'
  return 'linear-gradient(90deg, #38bdf8, #2563eb)'
}

function getRankBadgeClass(index) {
  if (index < 3) return 'rank-top3'
  if (index < 8) return 'rank-mid'
  return 'rank-normal'
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

function getPeriodCompareRatio(item) {
  const total = item.totalCount + item.prevTotalCount
  if (!total) return 50
  return Math.round((item.totalCount / total) * 100)
}

function parseDateAndQuarter(row) {
  let yr = Number(row.年度 || row.年份 || row.年 || 0)
  let rawMo = Number(row.月份 || row.月 || 0)
  const dateStr = String(row.統計期 || row.年月 || row.期間 || row.日期 || '')
  const mMatch = dateStr.match(/(\d{2,4})\s*[年/\-.]\s*(\d{1,2})/)
  if (mMatch) {
    if (!yr) yr = parseInt(mMatch[1], 10)
    rawMo = parseInt(mMatch[2], 10)
  }
  if (yr > 0 && yr < 1911) yr += 1911
  const mo = rawMo >= 1 && rawMo <= 12 ? rawMo : 1
  return { yr, mo }
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

function normalizeTableRows(rows, fallbackTopicName) {
  const records = []
  const metaKeys = new Set([
    'id', '年度', '年份', '年', '月份', '月', '季', '季度', '季別',
    '統計期', '年月', '期間', '日期', '單位', '數值', 'created_at', 'updated_at'
  ])

  rows.forEach(row => {
    const { yr, mo } = parseDateAndQuarter(row)
    if (!yr) return

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

      const { category, name, baseName } = splitCategoryAndName(labelParts, fallbackTopicName)
      if (name === '總計' || name === '合計') return
      records.push({ yr, mo, category, name, baseName, unit, val })
    } else {
      Object.entries(row).forEach(([k, v]) => {
        if (metaKeys.has(k) || v === null || v === undefined) return
        const num = Number(String(v).replace(/,/g, '').replace(/%/g, ''))
        if (!isNaN(num)) {
          let unit = '件'
          if (k.includes('率') || k.includes('比') || String(v).includes('%')) unit = '%'
          else if (k.includes('額') || k.includes('元')) unit = '元'
          else if (k.includes('話') || k.includes('通')) unit = '通'
          const { category, name, baseName } = splitCategoryAndName([k.trim()], fallbackTopicName)
          records.push({ yr, mo, category, name, baseName, unit, val: num })
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
      throw new Error(`讀取資料表 ${tableName}失敗(HTTP ${res.status})`)
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

    const [cardRaw, callsRaw] = await Promise.all([
      fetchAllRows('credit_card_fraud', headers),
      fetchAllRows('international_calls_block', headers)
    ])

    topicDataStore.value = {
      card: normalizeTableRows(cardRaw, '信用卡盜刷統計'),
      calls: normalizeTableRows(callsRaw, '國際來話攔阻')
    }

    applyMonthPreset(3, '3m')
    selectedCategory.value = categorySummaries.value[0]?.category || ''
    selectedUnit.value = availableUnits.value[0] || ''
    autoSelectBestDualSeries(selectedCategory.value)
  } catch (err) {
    console.error('載入資料失敗:', err)
    errorMsg.value = err.message || '連線至Supabase失敗，請確認網路與RLS權限設定。'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchFromSupabase()
})
</script>