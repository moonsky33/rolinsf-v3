// 前端路由模块

// 1.导入需要的路由成员
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import { useUserStore } from '@/store/user'

// 导入需要通过路由切换的组件
import Login from '../views/Login/index.vue'
import Layout from '../views/Layout/index.vue'
import home from '../views/home/index.vue'

// 2.创建路由对象
const router = createRouter({
    // 使用浏览器的history API 进行路由切换
    history: createWebHistory(),
    // 路由规则
    routes: [
        // 登陆的路由规则
      { path: '/login', component: Login },
      
      //官网主页
      {path: '/', component: home},

        // 后台主页的路由规则
        {path: '/admin', component: Layout}
    ]
})

// 添加路由导航守卫
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  
  // 不需要登录的页面白名单
  const whiteList = ['/login']
  
  // 检查用户是否已登录
  const isLoggedIn = userStore.checkLoginStatus()
  
  // 如果用户未登录且访问的页面不在白名单中，则重定向到登录页
  if (!isLoggedIn && !whiteList.includes(to.path)) {
    next('/login')
  } else {
    next()
  }
})

// 3. 默认导出
export default router