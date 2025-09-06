import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// 导入路由
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
    
// 在这个位置挂载插件

app.use(router)
app.use(ElementPlus)
app.mount('#app')
