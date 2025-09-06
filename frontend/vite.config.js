import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: import.meta.env.MODE === 'production' 
    ? '/rolinsf-v3/'  // 生产环境：必须与 GitHub 仓库名称一致
    : '/' 
})
