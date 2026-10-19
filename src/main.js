import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// 🚨 請確保你的 style.css 確實放在 src/assets/ 資料夾內！
// 如果你是直接放在 src/ 目錄下，請將這行改為 import './style.css'
import './assets/style.css'

const app = createApp(App)

// 🛡️ 捕捉全域錯誤，避免白畫面卻找不到原因
app.config.errorHandler = (err) => {
  console.error('🚨 Vue 執行錯誤:', err)
}

app.use(router)
app.mount('#app')