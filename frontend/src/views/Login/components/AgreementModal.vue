<template>
  <!-- 协议弹窗组件 -->
  <div class="agreement-modal-container" style="display: none;">
    <!-- 组件容器，实际弹窗通过Element Plus的ElMessageBox实现 -->
  </div>
</template>

<script setup>
import { ElMessageBox } from 'element-plus'

/**
 * 显示协议弹窗
 * @param {string} type - 协议类型，'agreement'为用户协议，'policy'为隐私条款
 */
const showAgreement = (type) => {
  // 根据类型显示不同的协议内容
  const isAgreement = type === 'agreement'
  
  ElMessageBox.alert(
    isAgreement ? '不准发违纪违法' : '这里是隐私条款内容',
    isAgreement ? '用户协议' : '隐私条款',
    {
      confirmButtonText: '我知道了',
      type: 'info'
    }
  )
}

// 导出方法供外部使用
defineExpose({
  showAgreement
})

// 全局注册静态方法，使其可以通过组件名直接调用
window.AgreementModal = {
  showAgreement: showAgreement
}
</script>