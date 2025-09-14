import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// 导入路由
import router from './router'

// 导入Pinia
import pinia from './store'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 导入Element Plus图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
    
// 在这个位置挂载插件

// 全局注册Element Plus图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(pinia)
app.use(router)
app.use(ElementPlus)

// 初始化应用store
import { useAppStore } from './store'
app.config.globalProperties.$appStore = useAppStore()

// 挂载应用
app.mount('#app')

// 初始化应用设置
const appStore = useAppStore()
appStore.initApp()
