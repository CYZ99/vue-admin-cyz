import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

app.use(ElementPlus)

// 引入 windicss
import 'virtual:windi.css'
import './permission'
import "nprogress/nprogress.css"
// 全局使用图标库
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(store)
app.use(router)
app.mount('#app')
