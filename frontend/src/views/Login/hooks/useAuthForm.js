// src/views/Auth/hooks/useAuthForm.js
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { authApi } from '@/api'
import { useUserStore } from '@/store/user'

/**
 * 登录/注册表单逻辑钩子
 * 处理表单提交、API调用、结果反馈
 */
export const useAuthForm = () => {
  const router = useRouter()
  const userStore = useUserStore()
  
  // 加载状态（登录/注册按钮禁用）
  const loginLoading = ref(false)
  const registerLoading = ref(false)

  // ------------------------------ 业务逻辑函数 ------------------------------
  // 用户名唯一性校验
  const checkUsernameExists = async (username) => {
    // 实际项目中可能需要调用单独的接口来校验用户名
    // 这里我们使用模拟逻辑
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
    // 这里我们使用模拟逻辑
    await new Promise(resolve => setTimeout(resolve, 500))
    const existingEmails = ['admin@example.com', 'test@example.com']
    if (existingEmails.includes(email.toLowerCase())) {
      throw new Error('邮箱已被注册，请使用其他邮箱')
    }
    return true
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
      if (type === 'login') {
        // 手机号登录验证码
        await authApi.getPhoneVerifyCode(target);
      } else {
        // 邮箱注册验证码
        await authApi.getEmailVerifyCode(target);
      }
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
      // 使用store处理登录
      const result = await userStore.handleLogin('phone', {
        phone: formData.phone,
        verifyCode: formData.code
      });
      
      if (result.success) {
        ElMessage.success('登录成功');
        
        // 跳转到后台管理系统
        setTimeout(() => {
          router.push('/admin') || (window.location.href = '/admin');
        }, 1000);
        return true;
      } else {
        ElMessage.error(result.error || '登录失败，请检查账号或验证码');
      }
    } catch (error) {
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
      // 使用store处理登录
      const result = await userStore.handleLogin('email', {
        email: formData.username,
        password: formData.password
      });
      
      if (result.success) {
        ElMessage.success('登录成功');
        
        // 跳转到后台管理系统
        setTimeout(() => {
          router.push('/admin') || (window.location.href = '/admin');
        }, 1000);
        return true;
      } else {
        ElMessage.error(result.error || '登录失败，请检查账号密码');
      }
    } catch (error) {
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
      // 过滤重复字段，并将code重命名为verifyCode以匹配API定义
      const { confirmPassword, status, code, ...submitData } = formData;
      // 创建符合API要求的数据结构
      const registerInfo = {
        ...submitData,
        verifyCode: code // 重命名字段以匹配API定义
      };
      
      // 使用store处理注册
      const result = await userStore.handleRegister(registerInfo);
      
      if (result.success) {
        ElMessage.success('注册成功');
        
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
      } else {
        ElMessage.error(result.error || '注册失败，请检查信息是否正确');
      }
    } catch (error) {
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