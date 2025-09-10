// src/views/Auth/utils/authRules.js
/**
 * 手机号登录表单校验规则
 * @param {Function} 无需额外依赖（基础规则）
 */
export const phoneLoginRules = {
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { min: 11, max: 11, message: '手机号长度为11位', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur' }
  ],
  code: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { min: 6, max: 6, message: '验证码长度为6位', trigger: 'blur' },
    { pattern: /^\d{6}$/, message: '验证码格式不正确', trigger: 'blur' }
  ],
  status: [
    { 
      required: true, 
      validator: (rule, value, callback) => {
        value ? callback() : callback(new Error('请阅读并同意用户协议和隐私条款'));
      }, 
      trigger: 'change' 
    }
  ]
};

/**
 * 邮箱登录表单校验规则
 */
export const emailLoginRules = {
  username: [
    { required: true, message: '请输入邮箱或用户名', trigger: 'blur' },
    { min: 3, max: 50, message: '用户名/邮箱长度在3到50个字符之间', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度在6到20个字符之间', trigger: 'blur' }
  ],
  status: phoneLoginRules.status // 复用协议勾选规则，避免重复
};

/**
 * 注册表单校验规则
 * @param {Function} checkUsernameExists - 用户名唯一性校验（来自useAuthForm）
 * @param {Function} checkEmailExists - 邮箱唯一性校验（来自useAuthForm）
 * @returns {Object} 动态生成的注册规则（依赖外部校验函数）
 */
export const getRegisterRules = (checkUsernameExists, checkEmailExists) => ({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度在3到20个字符之间', trigger: 'blur' },
    { pattern: /^[A-Za-z0-9_]+$/, message: '用户名只能包含字母、数字和下划线，不支持中文', trigger: 'blur' },
    { 
      validator: async (rule, value, callback) => {
        try {
          await checkUsernameExists(value);
          callback();
        } catch (error) {
          callback(error); // 直接传递API返回的错误信息
        }
      }, 
      trigger: 'blur' 
    }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' },
    { 
      validator: async (rule, value, callback) => {
        try {
          await checkEmailExists(value);
          callback();
        } catch (error) {
          callback(error);
        }
      }, 
      trigger: 'blur' 
    }
  ],
  code: phoneLoginRules.code, // 复用验证码规则
  password: [
    { required: true, message: '请设置密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度在6到20个字符之间', trigger: 'blur' },
    { pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/, message: '密码必须包含字母和数字', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    { 
      validator: (rule, value, callback, source) => {
        // source 是整个表单数据，通过source.password获取密码字段
        value === source.password ? callback() : callback(new Error('两次输入的密码不一致'));
      }, 
      trigger: 'blur' 
    }
  ],
  status: phoneLoginRules.status // 复用协议勾选规则
});