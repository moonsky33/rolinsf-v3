// src/views/Auth/hooks/useAuthForm.js
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { authApi } from '@/api'

/**
 * 登录/注册表单逻辑钩子
 * 处理表单提交、API调用、结果反馈
 */
export const useAuthForm = () => {
  const router = useRouter()
  // 加载状态（登录/注册按钮禁用）
  const loginLoading = ref(false)
  const registerLoading = ref(false)

  // ------------------------------ 真实API调用 ------------------------------
  // 用户名唯一性校验
  const checkUsernameExists = async (username) => {
    // 实际项目中可能需要调用单独的接口来校验用户名
    // 这里我们使用模拟逻辑，因为authApi中没有提供专门的校验接口
    await new Promise(resolve => setTimeout(resolve, 500))
    const existingUsernames = ['admin', 'test', 'user123']
    if (existingUsernames.includes(username.toLowerCase())) {
      throw new Error('用户名已存在，请选择其他用户名')
    }
    return true
  }

  // 邮箱唯一性校验
  const checkEmailExists = async (email) => {
    // 实际项目中可能需要调用单独的接口来校验邮箱
    // 这里我们使用模拟逻辑，因为authApi中没有提供专门的校验接口
    await new Promise(resolve => setTimeout(resolve, 500))
    const existingEmails = ['admin@example.com', 'test@example.com']
    if (existingEmails.includes(email.toLowerCase())) {
      throw new Error('邮箱已被注册，请使用其他邮箱')
    }
    return true
  }

  // 发送验证码（登录/注册通用）
  // type: 'login'（手机号登录）或 'register'（邮箱注册）
  const sendCodeAPI = async (target, type) => {
    if (type === 'login') {
      // 手机号登录验证码
      return await authApi.getPhoneVerifyCode(target)
    } else {
      // 邮箱注册验证码
      return await authApi.getEmailVerifyCode(target)
    }
  }

  // 手机号登录API
  const phoneLoginAPI = async (formData) => {
    return await authApi.phoneLogin({
      phone: formData.phone,
      verifyCode: formData.code  // 注意：表单中字段名为code
    })
  }

  // 邮箱登录API
  const emailLoginAPI = async (formData) => {
    // 根据用户输入的是邮箱还是用户名，调用不同的接口
    // 这里简化处理，统一调用emailLogin接口
    return await authApi.emailLogin({
      email: formData.username, // 假设username可能是邮箱
      password: formData.password
    })
  }

  // 注册API
  const registerAPI = async (formData) => {
    // 过滤重复字段，并将code重命名为verifyCode以匹配API定义
    const { confirmPassword, status, code, ...submitData } = formData
    // 创建符合API要求的数据结构
    const apiData = {
      ...submitData,
      verifyCode: code // 重命名字段以匹配API定义
    }
    return await authApi.register(apiData)
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
      const data = await phoneLoginAPI(formData);
      
      // request.js的响应拦截器已经处理了错误情况，这里直接处理成功情况
      ElMessage.success('登录成功');
      
      // 存储token到本地存储
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      
      // 存储用户信息
      if (data.user) {
        localStorage.setItem('userInfo', JSON.stringify(data.user));
      }
      
      // 跳转到首页
      setTimeout(() => {
        router.push('/') || (window.location.href = '/');
      }, 1000);
      return true;
    } catch (error) {
      // 错误信息已在request.js的拦截器中处理
      // 这里可以添加特定的错误处理逻辑
      ElMessage.error('登录失败，请检查账号或验证码');
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
      const data = await emailLoginAPI(formData);
      
      // request.js的响应拦截器已经处理了错误情况，这里直接处理成功情况
      ElMessage.success('登录成功');
      
      // 存储token到本地存储
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      
      // 存储用户信息
      if (data.user) {
        localStorage.setItem('userInfo', JSON.stringify(data.user));
      }
      
      // 跳转到首页
      setTimeout(() => {
        router.push('/') || (window.location.href = '/');
      }, 1000);
      return true;
    } catch (error) {
      // 错误信息已在request.js的拦截器中处理
      ElMessage.error('登录失败，请检查账号密码');
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
      const data = await registerAPI(formData);
      
      // request.js的响应拦截器已经处理了错误情况，这里直接处理成功情况
      ElMessage.success(data.message || '注册成功');
      
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
    } catch (error) {
      // 错误信息已在request.js的拦截器中处理
      ElMessage.error('注册失败，请检查信息是否正确');
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