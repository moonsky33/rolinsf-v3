// 前端路由模块

// 1.导入需要的路由成员
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

// 导入需要通过路由切换的组件
import Login from '../views/Login/index.vue'
import Layout from '../views/Layout/index.vue'

// 2.创建路由对象
const router = createRouter({
    // 使用浏览器的history API 进行路由切换
    history: createWebHistory(),
    // 路由规则
    routes: [
        // 登陆的路由规则
        {path: '/login', component: Login},

        // 后台主页的路由规则
        {path: '/', component: Layout}
    ]
})

// 3. 默认导出
export default router