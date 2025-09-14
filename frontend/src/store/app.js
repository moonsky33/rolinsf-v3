import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  // 持久化配置
  persist: {
    key: 'app_store',
    storage: localStorage,
    paths: ['theme', 'sidebarCollapsed', 'language']
  },
  
  // 状态定义
  state: () => ({
    // 主题设置
    theme: 'light', // light, dark, system
    
    // 侧边栏状态
    sidebarCollapsed: false,
    
    // 语言设置
    language: 'zh-CN', // zh-CN, en-US
    
    // 加载状态
    loading: false,
    
    // 通知消息队列
    notifications: [],
    
    // 页面布局
    layout: 'default', // default, fullscreen, etc.
    
    // 窗口大小
    windowSize: {
      width: typeof window !== 'undefined' ? window.innerWidth : 0,
      height: typeof window !== 'undefined' ? window.innerHeight : 0
    }
  }),
  
  // 计算属性
  getters: {
    // 判断是否为移动设备
    isMobile: (state) => state.windowSize.width < 768,
    
    // 判断是否为平板设备
    isTablet: (state) => state.windowSize.width >= 768 && state.windowSize.width < 1024,
    
    // 判断是否为桌面设备
    isDesktop: (state) => state.windowSize.width >= 1024,
    
    // 获取当前主题
    currentTheme: (state) => {
      if (state.theme === 'system') {
        // 检测系统主题偏好
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        return prefersDark ? 'dark' : 'light'
      }
      return state.theme
    }
  },
  
  // 动作
  actions: {
    // 设置主题
    setTheme(theme) {
      this.theme = theme
      // 更新DOM上的主题类
      const html = document.documentElement
      if (this.currentTheme === 'dark') {
        html.classList.add('dark')
        html.classList.remove('light')
      } else {
        html.classList.add('light')
        html.classList.remove('dark')
      }
    },
    
    // 切换侧边栏
    toggleSidebar() {
      this.sidebarCollapsed = !this.sidebarCollapsed
    },
    
    // 折叠侧边栏
    collapseSidebar(collapsed) {
      this.sidebarCollapsed = collapsed
    },
    
    // 设置语言
    setLanguage(language) {
      this.language = language
      // 这里可以添加语言切换的逻辑，比如更新i18n实例
    },
    
    // 设置加载状态
    setLoading(loading) {
      this.loading = loading
    },
    
    // 添加通知
    addNotification(notification) {
      const id = Date.now() + Math.random()
      const newNotification = {
        id,
        message: '通知消息',
        type: 'info', // success, warning, error, info
        duration: 3000,
        ...notification
      }
      
      this.notifications.push(newNotification)
      
      // 自动移除通知
      setTimeout(() => {
        this.removeNotification(id)
      }, newNotification.duration)
      
      return id
    },
    
    // 移除通知
    removeNotification(id) {
      this.notifications = this.notifications.filter(n => n.id !== id)
    },
    
    // 清空所有通知
    clearNotifications() {
      this.notifications = []
    },
    
    // 设置布局
    setLayout(layout) {
      this.layout = layout
    },
    
    // 更新窗口大小
    updateWindowSize() {
      if (typeof window !== 'undefined') {
        this.windowSize = {
          width: window.innerWidth,
          height: window.innerHeight
        }
        
        // 在移动设备上，自动折叠侧边栏
        if (this.isMobile) {
          this.sidebarCollapsed = true
        }
      }
    },
    
    // 初始化应用设置
    initApp() {
      // 更新窗口大小
      this.updateWindowSize()
      
      // 应用主题
      this.setTheme(this.theme)
      
      // 添加窗口大小变化监听器
      if (typeof window !== 'undefined') {
        window.addEventListener('resize', this.updateWindowSize)
      }
    },
    
    // 清理应用资源
    cleanupApp() {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', this.updateWindowSize)
      }
    }
  }
})