import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // 配置目录别名, 同时确保在tsconfig.js中配置路径别名
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
})
