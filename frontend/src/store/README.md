# 状态管理 (Store)

本项目使用 [Pinia](https://pinia.vuejs.org/) 作为状态管理工具，它是 Vue.js 官方推荐的状态管理方案，API 简洁，支持 TypeScript，易于集成和使用。

## 目录结构

```
src/store/
├── index.js        # Pinia 主配置文件
├── user.js         # 用户相关状态管理
├── app.js          # 应用级状态管理
└── README.md       # 状态管理说明文档
```

## 功能说明

### 1. Pinia 主配置 (index.js)

- 创建 Pinia 实例
- 集成持久化插件 (pinia-plugin-persistedstate)
- 导出 Pinia 实例和所有 store

### 2. 用户状态管理 (user.js)

管理用户的登录状态、个人信息、权限等。主要功能包括：

- 登录/注册/退出登录
- 获取/刷新用户信息
- 检查登录状态
- 权限管理
- 状态持久化存储

### 3. 应用状态管理 (app.js)

管理应用级别的全局状态。主要功能包括：

- 主题切换 (light/dark/system)
- 侧边栏状态管理
- 语言设置
- 全局加载状态
- 通知消息管理
- 布局设置
- 窗口大小响应

## 使用方法

### 在组件中使用 store

```javascript
// 导入所需的 store
import { useUserStore, useAppStore } from '@/store'

// 在组件的 setup 函数中使用
const userStore = useUserStore()
const appStore = useAppStore()

// 访问状态
console.log(userStore.isLoggedIn)
console.log(appStore.currentTheme)

// 调用动作
await userStore.handleLogin('email', { email: 'user@example.com', password: 'password' })
appStore.setTheme('dark')
```

### 在组合式函数中使用 store

```javascript
// 导入所需的 store
import { useUserStore } from '@/store'

// 在组合式函数中使用
const useCustomHook = () => {
  const userStore = useUserStore()
  
  // 使用 store 状态和动作
  const isAuthenticated = computed(() => userStore.isLoggedIn)
  
  const logout = async () => {
    await userStore.handleLogout()
  }
  
  return {
    isAuthenticated,
    logout
  }
}
```

### 在 Vue 2 风格组件中使用

```javascript
// 组件选项
export default {
  computed: {
    // 通过 this.$store 访问
    isLoggedIn() {
      return this.$appStore.isLoggedIn
    }
  },
  methods: {
    async login() {
      const result = await this.$userStore.handleLogin('email', { email: 'user@example.com', password: 'password' })
      if (result.success) {
        // 登录成功处理
      }
    }
  }
}
```

## 持久化存储

本项目使用 `pinia-plugin-persistedstate` 插件实现状态的持久化存储。默认情况下，以下状态会被持久化到 localStorage：

- 用户相关：token, userInfo
- 应用相关：theme, sidebarCollapsed, language

## 最佳实践

1. **状态划分**：将相关的状态和逻辑组织在同一个 store 中，避免一个 store 过于庞大

2. **状态不可变性**：在修改状态时，遵循 Vue 的响应式原则，避免直接修改复杂数据结构

3. **异步操作**：将异步操作（如 API 请求）封装在 store 的 actions 中，便于复用和测试

4. **持久化配置**：仅将必要的状态进行持久化存储，避免存储敏感信息或过大的数据

5. **组件解耦**：通过 store 进行组件间的通信，减少组件间的直接依赖

## 注意事项

1. 请确保在应用挂载后再访问 store 中的状态

2. 在处理用户敏感信息时，请注意数据安全

3. 对于不需要持久化的状态，请避免在 persist.paths 中配置

4. 在页面卸载时，请注意清理定时器和事件监听器