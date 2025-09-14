<template>
    <div class="layout-container">
        <header class="header">
            <h1>后台主页</h1>
            <div class="user-info">
                <span v-if="userInfo" class="welcome-text">欢迎，{{ userInfo.username || userInfo.email || '用户' }}</span>
                <el-button type="primary" @click="handleLogout">退出登录</el-button>
            </div>
        </header>
        <main class="content">
            <!-- 主内容区域 -->
        </main>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/store/user'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()
const userInfo = ref(null)

// 组件挂载时获取用户信息
onMounted(() => {
  if (userStore.isLoggedIn && userStore.userInfo) {
    userInfo.value = userStore.userInfo
  }
})

// 处理登出
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
.layout-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 20px;
}

.welcome-text {
  font-size: 14px;
  color: #666;
}

.content {
  flex: 1;
  padding: 20px;
}
</style>