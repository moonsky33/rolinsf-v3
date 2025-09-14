<template>
  <div class="common-layout">
    <el-container class="main-container">
      <el-header height="60px">
        <HeaderComponent :userInfo="userInfo" @logout="handleLogout" @toggleAside="toggleAside" />
      </el-header>
      <el-container class="body-container">
        <Aside :collapsed="isAsideCollapsed" />
        <el-main class="scrollable-content">Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/store/user'
import { useRouter } from 'vue-router'
import HeaderComponent from './components/header.vue'
import Aside from './components/Aside.vue'

const userStore = useUserStore()
const router = useRouter()
const userInfo = ref(null)
const isAsideCollapsed = ref(false)

// 切换侧边栏折叠状态
const toggleAside = () => {
  console.log('Toggle aside event received, current state:', isAsideCollapsed.value)
  isAsideCollapsed.value = !isAsideCollapsed.value
  console.log('New state:', isAsideCollapsed.value)
}

// 组件挂载时获取用户信息
onMounted(() => {
  if (userStore.isLoggedIn && userStore.userInfo) {
    userInfo.value = userStore.userInfo
  }
})

// 处理退出登录事件
const handleLogout = async () => {
  try {
    await userStore.handleLogout()
    ElMessage.success('退出登录成功')
    router.push('/login')
  } catch (error) {
    ElMessage.error('退出登录失败，请重试')
    console.error('Logout error:', error)
  }
}
</script>

<style scoped>
.el-header {
  padding: 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.el-main {
  padding: 20px;
  background-color: #f5f7fa;
}

.el-aside {
  background-color: #fff;
  border-right: 1px solid #e9ecef;
  overflow-y: hidden;
}

.common-layout {
  height: 100vh;
  overflow: hidden;
}

.main-container {
  height: 100vh;
  overflow: hidden;
}

.body-container {
  height: calc(100vh - 60px);
  margin-top: 60px;
}

.scrollable-content {
  overflow-y: auto;
  height: 100%;
  /* 添加滚动条样式 */
  scrollbar-width: thin;
  scrollbar-color: #dcdfe6 #f5f7fa;
}

.scrollable-content::-webkit-scrollbar {
  width: 6px;
}

.scrollable-content::-webkit-scrollbar-track {
  background: #f5f7fa;
}

.scrollable-content::-webkit-scrollbar-thumb {
  background-color: #dcdfe6;
  border-radius: 3px;
}
</style>

