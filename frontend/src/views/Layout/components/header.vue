<template>
  <el-container>
    <el-header height="60px" class="header-el">
      <!-- 左侧Logo和标题 -->
      <div class="header-left">
        <h1 class="system-title" @click="handleTitleClick">
            <el-icon ><Menu /></el-icon>
            若林轻小说后台管理系统
        </h1>
      </div>
      
      <!-- 右侧面包屑和用户信息 -->
      <div class="header-right">
        <!-- 面包屑导航 -->
        <!-- <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
          <el-breadcrumb-item>首页</el-breadcrumb-item>
          <el-breadcrumb-item>后台管理</el-breadcrumb-item>
        </el-breadcrumb> -->
        
        <!-- 用户信息下拉菜单 -->
        <el-dropdown v-if="userInfo" class="user-dropdown">
          <div class="user-info" @click.stop>
            <el-avatar :size="32" class="user-avatar">
              {{ (userInfo.username || userInfo.email || '用户').charAt(0).toUpperCase() }}
            </el-avatar>
            <span class="user-name">
              {{ userInfo.username || userInfo.email || '用户' }}
            </span>
            <el-icon class="el-icon--right"><ArrowDown /></el-icon>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                <el-icon><User /></el-icon>
                <span>个人中心</span>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-icon><Setting /></el-icon>
                <span>设置</span>
              </el-dropdown-item>
              <el-dropdown-item divided @click="$emit('logout')">
                <span>退出登录</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-header>
  </el-container>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import {
  Menu,
  ArrowDown,
  User,
  Setting
} from '@element-plus/icons-vue'

// 定义组件接收的props
defineProps({
  userInfo: {
    type: Object,
    default: null
  }
})

// 定义组件发出的事件
const emit = defineEmits(['logout', 'toggleAside'])

// 点击标题触发侧边栏折叠/展开
const handleTitleClick = () => {
  console.log('Title clicked, emitting toggleAside event')
  emit('toggleAside')
}
</script>

<style scoped>
.header-el {
  padding: 0 20px;
  background-color: #fff;
  border-bottom: 1px solid #e9ecef;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 15px;
}

.logo {
  cursor: pointer;
  color: #1890ff;
}

.system-title {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #1890ff;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  z-index: 100;
  padding: 5px 10px;
  border-radius: 4px;
}

.system-title:hover {
  color: #40a9ff;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.breadcrumb {
  font-size: 14px;
}

.user-dropdown {
  cursor: pointer;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px 10px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.user-info:hover {
  background-color: #f5f7fa;
}

.user-avatar {
  background-color: #1890ff;
}

.user-name {
  font-size: 14px;
  color: #333;
}

.el-dropdown-menu {
  min-width: 160px;
}

.el-dropdown-item {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>