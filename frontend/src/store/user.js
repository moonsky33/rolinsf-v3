import { defineStore } from 'pinia'
import { authApi } from '@/api'

export const useUserStore = defineStore('user', {
  // 持久化配置
  persist: {
    key: 'user_store',
    storage: localStorage,
    paths: ['token', 'userInfo']
  },
  
  // 状态定义
  state: () => ({
    token: '', // 用户登录凭证
    userInfo: null, // 用户信息
    isLoggedIn: false, // 是否已登录
    loading: false, // 加载状态
    error: null // 错误信息
  }),
  
  // 计算属性
  getters: {
    // 获取用户ID
    userId: (state) => state.userInfo?.id,
    
    // 获取用户角色
    userRole: (state) => state.userInfo?.role,
    
    // 判断是否有权限
    hasPermission: (state) => (permission) => {
      // 这里可以根据实际需求实现权限判断逻辑
      return true
    }
  },
  
  // 动作
  actions: {
    // 设置token
    setToken(token) {
      this.token = token
      this.isLoggedIn = !!token
    },
    
    // 设置用户信息
    setUserInfo(userInfo) {
      this.userInfo = userInfo
    },
    
    // 清除用户信息
    clearUserInfo() {
      this.token = ''
      this.userInfo = null
      this.isLoggedIn = false
      this.error = null
    },
    
    // 处理登录
    async handleLogin(loginType, credentials) {
      this.loading = true
      this.error = null
      
      try {
        let result
        
        // 根据登录类型调用不同的API
        if (loginType === 'email') {
          result = await authApi.emailLogin(credentials)
        } else if (loginType === 'phone') {
          result = await authApi.phoneLogin(credentials)
        }
        
        // 保存token和用户信息
        if (result?.token) {
          this.setToken(result.token)
          
          // 获取用户信息
          const userInfo = await authApi.getUserInfo()
          this.setUserInfo(userInfo)
        }
        
        return { success: true }
      } catch (err) {
        this.error = err.message || '登录失败'
        console.error('Login error:', err)
        return { success: false, error: this.error }
      } finally {
        this.loading = false
      }
    },
    
    // 处理注册
    async handleRegister(registerInfo) {
      this.loading = true
      this.error = null
      
      try {
        const result = await authApi.register(registerInfo)
        
        // 注册成功后，可选择自动登录或跳转到登录页面
        if (result?.success) {
          return { success: true }
        }
        
        return { success: false, error: '注册失败' }
      } catch (err) {
        this.error = err.message || '注册失败'
        console.error('Register error:', err)
        return { success: false, error: this.error }
      } finally {
        this.loading = false
      }
    },
    
    // 处理退出登录
    async handleLogout() {
      try {
        await authApi.logout()
      } catch (err) {
        console.error('Logout error:', err)
      } finally {
        this.clearUserInfo()
      }
    },
    
    // 刷新用户信息
    async refreshUserInfo() {
      try {
        const userInfo = await authApi.getUserInfo()
        this.setUserInfo(userInfo)
        return { success: true, userInfo }
      } catch (err) {
        console.error('Refresh user info error:', err)
        // 如果刷新用户信息失败，可能是token过期，需要重新登录
        if (err.response?.status === 401) {
          this.clearUserInfo()
        }
        return { success: false, error: err.message }
      }
    },
    
    // 检查登录状态
    checkLoginStatus() {
      // 如果有token但用户信息为null，尝试刷新用户信息
      if (this.token && !this.userInfo) {
        this.refreshUserInfo()
      }
      
      return this.isLoggedIn
    }
  }
})