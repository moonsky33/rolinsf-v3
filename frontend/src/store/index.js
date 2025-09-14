import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// 创建Pinia实例
const pinia = createPinia()

// 使用持久化插件，使状态能够在页面刷新后保持
pinia.use(piniaPluginPersistedstate)

// 导出Pinia实例
export default pinia

// 导出各个store
export * from './user'
export * from './app'