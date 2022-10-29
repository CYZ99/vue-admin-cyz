import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(ElementPlus)

// 引入 windicss
import 'virtual:windi.css'
import './permission'
import "nprogress/nprogress.css"
app.use(store)
app.use(router)
app.mount('#app')
