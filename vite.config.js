import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'

import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      // 设置 src 的别名
      "~":path.resolve(__dirname, 'src')
    },
  },
  plugins: [
    vue(),
    WindiCSS(),
  ]
})
