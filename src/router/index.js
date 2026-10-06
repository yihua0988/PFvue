import { createRouter, createWebHistory } from 'vue-router'

// 1. 確保這裡的檔名拼法與實際檔案 100% 吻合
import HomeView from '../views/HomeView.vue'
import ActionPlanView from '../views/ActionPlanView.vue'
import AiFraudNews from '../views/AiFraudNews.vue'
import AntiDeepfakeVideo from '../views/AntiDeepfakeVideo.vue'
import Prevention from '../views/Prevention.vue'
import SummaryView from '../views/SummaryView.vue'
import Top10Frauds from '../views/Top10Frauds.vue'
import VictimProfile from '../views/VictimProfile.vue'
import FraudPatterns from '../views/FraudPatterns.vue'
import FraudGrowthStats from '../views/FraudGrowthStats.vue'
import FraudVulnerabilities from '../views/FraudVulnerabilities.vue' // 統一修正為小寫 b

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/fraud-patterns', name: 'fraudPatterns', component: FraudPatterns },
    { path: '/prevention', name: 'prevention', component: Prevention },
    { path: '/anti-deepfake-video', name: 'video', component: AntiDeepfakeVideo },
    { path: '/summary', name: 'summary', component: SummaryView },
    { path: '/fraud-growth-stats', name: 'fraudGrowth', component: FraudGrowthStats },
    { path: '/ai-fraud-news', name: 'aiNews', component: AiFraudNews },
    { path: '/top-10-frauds', name: 'top10', component: Top10Frauds },
    { path: '/victim-profile', name: 'victim', component: VictimProfile },
    { path: '/fraud-vulnerabilities', name: 'vulnerabilities', component: FraudVulnerabilities },
    { path: '/action-plan', name: 'actionPlan', component: ActionPlanView }
  ]
})

export default router