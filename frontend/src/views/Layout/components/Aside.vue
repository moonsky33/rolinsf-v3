<template>
    <el-aside :width="collapsed ? '0px' : '200px'" class="aside-container"
        :style="{ transform: collapsed ? '-translateX(100%)' : 'translateX(0)' }">
        <el-menu class="aside-menu" background-color="#fff" text-color="#333" active-text-color="#1890ff"
            default-active="1" router>
            <el-menu-item index="/admin">
                <el-icon><HomeFilled /></el-icon>
                <span>首页</span>
            </el-menu-item>

            <el-menu-item index="/admin/users">
                <el-icon><UserFilled /></el-icon>
                <span>个人中心</span>
            </el-menu-item>

            <el-sub-menu index="2">
                <template #title>
                    <el-icon>
                        <Document />
                    </el-icon>
                    <span>小说管理</span>
                </template>
                <el-menu-item index="/admin/novels">
                    <el-icon><Book /></el-icon>
                    <span>小说列表</span>
                </el-menu-item>
                <el-menu-item index="/admin/categories">
                    <el-icon><Message /></el-icon>
                    <span>评论管理</span>
                </el-menu-item>
            </el-sub-menu>


            <el-menu-item index="/admin/comments">
                <el-icon><ChatDotSquare /></el-icon>
                <span>观看记录</span>
            </el-menu-item>

            <el-menu-item index="/admin/statistics">
                <el-icon><PieChart /></el-icon>
                <span>数据统计</span>
            </el-menu-item>
        </el-menu>
    </el-aside>
</template>

<script setup>
// 接收折叠状态属性
defineProps({
  collapsed: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.aside-container {
  height: 100vh;
  background-color: #fff;
  border-right: 1px solid #e9ecef;
  box-shadow: 2px 0 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  position: relative;
  z-index: 10;
  overflow: hidden;
}

.aside-header {
  padding: 20px;
  text-align: center;
  border-bottom: 1px solid #e9ecef;
}

.aside-title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #1890ff;
}

.aside-menu {
  flex: 1;
  border-right: none;
  padding-top: 20px;
}

.el-menu-item {
  height: 50px;
  line-height: 50px;
  font-size: 14px;
}

.el-sub-menu__title {
  height: 50px;
  line-height: 50px;
  font-size: 14px;
}
</style>