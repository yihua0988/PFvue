import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// 🌟 只需要留你自己的 CSS，其他框架跟本機字型通通不要了！
import './assets/style.css'


const app = createApp(App)

app.use(router)

app.mount('#app')