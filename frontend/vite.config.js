import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [vue()],
    base: mode === 'production' 
      ? '/rolinsf-v3/'
      : '/',
    resolve: {
      alias: {
        // 设置路径别名
        '@': resolve(__dirname, 'src')
      }
    }
  }
})
