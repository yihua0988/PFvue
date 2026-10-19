import { createRouter, createWebHashHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import ActionPlanView from '../views/ActionPlanView.vue'
import AiFraudNews from '../views/AiFraudNews.vue'
import AntiDeepfakeVideo from '../views/AntiDeepfakeVideo.vue'
import AntiPhishingVideo from '../views/AntiPhishingVideo.vue'
import AntiInvestmentVideo from '../views/AntiInvestmentVideo.vue'
import Prevention from '../views/Prevention.vue'
import SummaryView from '../views/SummaryView.vue'
import Top10Frauds from '../views/Top10Frauds.vue'
import VictimProfile from '../views/VictimProfile.vue'
import FraudPatterns from '../views/FraudPatterns.vue'
import FraudGrowthStats from '../views/FraudGrowthStats.vue'
import FraudVulnerabilities from '../views/FraudVulnerabilities.vue'
import FraudTrends from '../views/FraudTrends.vue'
import FraudInterception from '../views/FraudInterception.vue'
import AntiFraudResults from '../views/AntiFraudResults.vue'
import OnePageScam from '../views/OnePageScam.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/fraud-patterns', name: 'fraudPatterns', component: FraudPatterns },
    { path: '/prevention', name: 'prevention', component: Prevention },
    { path: '/anti-deepfake-video', name: 'video', component: AntiDeepfakeVideo },
    { path: '/anti-phishing-video', name: 'antiPhishing', component: AntiPhishingVideo },
    { path: '/summary', name: 'summary', component: SummaryView },
    { path: '/fraud-growth-stats', name: 'fraudGrowth', component: FraudGrowthStats },
    { path: '/ai-fraud-news', name: 'aiNews', component: AiFraudNews },
    { path: '/top-10-frauds', name: 'top10', component: Top10Frauds },
    { path: '/victim-profile', name: 'victim', component: VictimProfile },
    { path: '/fraud-vulnerabilities', name: 'vulnerabilities', component: FraudVulnerabilities },
    { path: '/action-plan', name: 'actionPlan', component: ActionPlanView },
	{ path: '/anti-investment-video', name: 'antiinvestmentvideo', component: AntiInvestmentVideo },
	{ path: '/fraud-interception', name: 'antiinvestment', component: FraudInterception },
	{ path: '/anti-fraud-results', name: 'Antifraud', component: AntiFraudResults },
	{ path: '/one-page-scam', name: 'Onepagescam', component: OnePageScam },
	{ path: '/fraud-trends', name: 'fraudtrends', component: FraudTrends }
  ]
})

export default router

