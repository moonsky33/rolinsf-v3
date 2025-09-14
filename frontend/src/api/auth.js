import request from './request';

/**
 * 认证相关API
 */
const authApi = {
  /**
   * 邮箱登录
   * @param {Object} data - 登录参数
   * @param {string} data.email - 邮箱
   * @param {string} data.password - 密码
   * @returns {Promise}
   */
  emailLogin: (data) => {
    return request.post('/auth/email-login', data);
  },

  /**
   * 手机号登录
   * @param {Object} data - 登录参数
   * @param {string} data.phone - 手机号
   * @param {string} data.verifyCode - 验证码
   * @returns {Promise}
   */
  phoneLogin: (data) => {
    return request.post('/auth/phone-login', data);
  },

  /**
   * 注册账号
   * @param {Object} data - 注册参数
   * @param {string} data.username - 用户名
   * @param {string} data.email - 邮箱
   * @param {string} data.password - 密码
   * @param {string} data.verifyCode - 验证码
   * @returns {Promise}
   */
  register: (data) => {
    return request.post('/auth/register', data);
  },

  /**
   * 获取邮箱验证码
   * @param {string} email - 邮箱地址
   * @returns {Promise}
   */
  getEmailVerifyCode: (email) => {
    return request.get('/auth/email-code', { params: { email } });
  },

  /**
   * 获取手机验证码
   * @param {string} phone - 手机号码
   * @returns {Promise}
   */
  getPhoneVerifyCode: (phone) => {
    return request.get('/auth/phone-code', { params: { phone } });
  },

  /**
   * 退出登录
   * @returns {Promise}
   */
  logout: () => {
    return request.post('/auth/logout');
  },

  /**
   * 获取用户信息
   * @returns {Promise}
   */
  getUserInfo: () => {
    return request.get('/auth/user-info');
  }
};

export default authApi;