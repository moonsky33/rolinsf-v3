// src/views/Auth/hooks/useAuthForm.js
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router' // 后续实际项目可替换为路由跳转

/**
 * 登录/注册表单逻辑钩子
 * 处理表单提交、API调用、结果反馈
 */
export const useAuthForm = () => {
  const router = useRouter()
  // 加载状态（登录/注册按钮禁用）
  const loginLoading = ref(false)
  const registerLoading = ref(false)

  // ------------------------------ 模拟API函数（后续替换为真实接口）------------------------------
  // 模拟用户名唯一性校验
  const checkUsernameExists = async (username) => {
    await new Promise(resolve => setTimeout(resolve, 500))
    const existingUsernames = ['admin', 'test', 'user123']
    if (existingUsernames.includes(username.toLowerCase())) {
      throw new Error('用户名已存在，请选择其他用户名')
    }
    return true
  }

  // 模拟邮箱唯一性校验
  const checkEmailExists = async (email) => {
    await new Promise(resolve => setTimeout(resolve, 500))
    const existingEmails = ['admin@example.com', 'test@example.com']
    if (existingEmails.includes(email.toLowerCase())) {
      throw new Error('邮箱已被注册，请使用其他邮箱')
    }
    return true
  }

  // 模拟发送验证码（登录/注册通用）
  // type: 'login'（手机号登录）或 'register'（邮箱注册）
  const sendCodeAPI = async (target, type) => {
    // 模拟API请求延迟
    await new Promise(resolve => setTimeout(resolve, 500))
    // 实际项目中替换为真实接口调用（如 axios.post('/api/send-code', { target, type })）
    console.log(`向${type === 'login' ? '手机号' : '邮箱'} ${target} 发送验证码`);
    return true; // 模拟请求成功
  }

  // 模拟手机号登录API
  const phoneLoginAPI = async (formData) => {
    await new Promise(resolve => setTimeout(resolve, 800))
    // 实际项目中替换为真实登录接口（如返回token、用户信息）
    console.log('手机号登录请求数据:', formData);
    return { success: true, token: 'mock-phone-token', user: { id: 1, phone: formData.phone } };
  }

  // 模拟邮箱登录API
  const emailLoginAPI = async (formData) => {
    await new Promise(resolve => setTimeout(resolve, 800))
    console.log('邮箱登录请求数据:', formData);
    return { success: true, token: 'mock-email-token', user: { id: 2, username: formData.username } };
  }

  // 模拟注册API
  const registerAPI = async (formData) => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    // 实际项目中过滤重复字段（如confirmPassword无需传给后端）
    const { confirmPassword, status, ...submitData } = formData;
    console.log('注册请求数据:', submitData);
    return { success: true, message: '注册成功' };
  }

  // ------------------------------ 业务逻辑函数 ------------------------------
  /**
   * 发送验证码（区分登录/注册场景）
   * @param {string} target - 手机号（登录）或邮箱（注册）
   * @param {string} type - 'login' 或 'register'
   * @returns {Promise<boolean>} - 是否发送成功
   */
  const handleSendCode = async (target, type) => {
    if (!target) {
      ElMessage.warning(`请先输入${type === 'login' ? '手机号' : '邮箱'}`);
      return false;
    }
    try {
      await sendCodeAPI(target, type);
      ElMessage.success(`验证码已发送至${type === 'login' ? '手机号' : '邮箱'}，请查收`);
      return true;
    } catch (error) {
      ElMessage.error('验证码发送失败，请重试');
      console.error('发送验证码错误:', error);
      return false;
    }
  }

  /**
   * 手机号登录逻辑
   * @param {Object} formData - 手机号登录表单数据
   * @returns {Promise<boolean>} - 是否登录成功
   */
  const handlePhoneLogin = async (formData) => {
    loginLoading.value = true;
    try {
      const res = await phoneLoginAPI(formData);
      if (res.success) {
        ElMessage.success('登录成功');
        // 实际项目中：1. 存储token（如localStorage） 2. 更新全局状态（如Pinia/Vuex） 3. 跳转首页
        setTimeout(() => {
          router.push('/') || (window.location.href = '/');
        }, 1000);
        return true;
      }
    } catch (error) {
      ElMessage.error('登录失败，请检查账号或网络');
      console.error('手机号登录错误:', error);
    } finally {
      loginLoading.value = false;
    }
    return false;
  }

  /**
   * 邮箱登录逻辑
   * @param {Object} formData - 邮箱登录表单数据
   * @returns {Promise<boolean>} - 是否登录成功
   */
  const handleEmailLogin = async (formData) => {
    loginLoading.value = true;
    try {
      const res = await emailLoginAPI(formData);
      if (res.success) {
        ElMessage.success('登录成功');
        setTimeout(() => {
          router.push('/') || (window.location.href = '/');
        }, 1000);
        return true;
      }
    } catch (error) {
      ElMessage.error('登录失败，请检查账号密码或网络');
      console.error('邮箱登录错误:', error);
    } finally {
      loginLoading.value = false;
    }
    return false;
  }

  /**
   * 注册逻辑
   * @param {Object} formData - 注册表单数据
   * @param {Function} resetForm - 重置注册表单的回调
   * @param {Function} switchToLogin - 切换到登录选项卡的回调
   * @returns {Promise<boolean>} - 是否注册成功
   */
  const handleRegister = async (formData, resetForm, switchToLogin) => {
    registerLoading.value = true;
    try {
      const res = await registerAPI(formData);
      if (res.success) {
        ElMessage.success(res.message || '注册成功');
        // 注册成功后：重置表单 + 切换到登录选项卡
        if (typeof resetForm === 'function') {
          resetForm();
        }
        setTimeout(() => {
          if (typeof switchToLogin === 'function') {
            switchToLogin();
          }
          ElMessage.success('请使用新账号登录');
        }, 1000);
        return true;
      }
    } catch (error) {
      ElMessage.error('注册失败，请检查信息或网络');
      console.error('注册错误:', error);
    } finally {
      registerLoading.value = false;
    }
    return false;
  }

  // 暴露方法和状态给外部使用
  return {
    // 状态
    loginLoading,
    registerLoading,
    // API校验函数（供表单规则使用）
    checkUsernameExists,
    checkEmailExists,
    // 业务逻辑方法
    handleSendCode,
    handlePhoneLogin,
    handleEmailLogin,
    handleRegister
  };
};