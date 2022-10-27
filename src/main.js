import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
const app = createApp(App)

app.use(ElementPlus)

// 引入 windicss
import 'virtual:windi.css'

app.use(router)
app.mount('#app')
