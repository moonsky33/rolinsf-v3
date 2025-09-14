<template>
  <!-- 协议弹窗组件 -->
  <div class="agreement-modal-container" style="display: none;">
    <!-- 组件容器，实际弹窗通过Element Plus的ElMessageBox实现 -->
  </div>
</template>

<script setup>
import { ElMessageBox, ElMessage } from 'element-plus';
import { agreementApi } from '@/api';
import { handleApiError, apiCache } from '@/api/utils';
import { mockData, mockResponse, mockDelay } from '@/api/mock';

// 缓存键
const CACHE_KEYS = {
  USER_AGREEMENT: 'user_agreement',
  PRIVACY_POLICY: 'privacy_policy'
};

/**
 * 获取协议内容（带缓存）
 * @param {string} type - 协议类型 ('user' 或 'privacy')
 * @returns {Promise<Object>}
 */
const getAgreementContent = async (type) => {
  const cacheKey = type === 'user' ? CACHE_KEYS.USER_AGREEMENT : CACHE_KEYS.PRIVACY_POLICY;
  
  // 检查缓存
  const cachedContent = apiCache.get(cacheKey);
  if (cachedContent) {
    console.log(`使用缓存的${type === 'user' ? '用户协议' : '隐私政策'}`);
    return cachedContent;
  }

  try {
    // 由于后端未实现，使用mock数据
    // 在实际项目中，这里会调用真实的API
    await mockDelay(); // 模拟网络延迟
    
    // 根据类型获取对应的mock数据
    const agreementData = type === 'user' ? mockData.userAgreement : mockData.privacyPolicy;
    
    // 存入缓存（5分钟）
    apiCache.set(cacheKey, agreementData);
    
    return agreementData;
  } catch (error) {
    // 处理API错误
    const errorMsg = handleApiError(error);
    ElMessage.error(errorMsg);
    throw error;
  }
};

/**
 * 显示协议弹窗
 * @param {string} type - 协议类型 ('user' 或 'privacy')
 */
const showAgreement = async (type) => {
  try {
    // 获取协议内容
    const agreementData = await getAgreementContent(type);
    
    // 显示协议弹窗
    ElMessageBox.alert(agreementData.content, agreementData.title, {
      confirmButtonText: '我已阅读并同意',
      showClose: true,
      dangerouslyUseHTMLString: true,
      customClass: 'custom-agreement-modal',
      beforeClose: (action, instance, done) => {
        // 记录用户同意协议的行为
        if (action === 'confirm') {
          // 这里可以添加同意协议的逻辑，如向后端发送同意记录
          console.log(`${agreementData.title}已同意`);
        }
        done();
      }
    });
  } catch (error) {
    console.error('显示协议失败:', error);
  }
};

// 导出给外部使用
defineExpose({
  showAgreement
});

// 注册全局静态方法
window.AgreementModal = {
  showAgreement
};
</script>

<style scoped>
/* 主容器样式 */
.agreement-modal-container {
  display: none;
}

/* 自定义协议弹窗样式 */
.custom-agreement-modal {
  width: 600px;
  max-width: 90vw;
  font-size: 14px;
}

/* 协议内容样式 */
.agreement-content {
  max-height: 400px;
  overflow-y: auto;
  padding: 15px;
  line-height: 1.8;
}

/* 优化滚动条样式 */
.agreement-content::-webkit-scrollbar {
  width: 6px;
}

.agreement-content::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.agreement-content::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 3px;
}

.agreement-content::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* 响应式设计 */
@media screen and (max-width: 768px) {
  .custom-agreement-modal {
    width: 95vw;
    margin: 0 5px;
  }
  
  .agreement-content {
    max-height: 300px;
  }
}
</style>