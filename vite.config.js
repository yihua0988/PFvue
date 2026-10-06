import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/PFvue/', // 請改成你的 GitHub Repository 名稱，如果專案是用者網頁則可省略
})