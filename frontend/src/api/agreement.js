import request from './request';

/**
 * 协议相关API
 */
const agreementApi = {
  /**
   * 获取用户协议内容
   * @param {Object} params - 查询参数
   * @param {string} params.language - 语言 (可选)
   * @param {string} params.version - 版本号 (可选，不指定则获取最新版本)
   * @returns {Promise}
   */
  getUserAgreement: (params = {}) => {
    return request.get('/agreement/user-agreement', { params });
  },

  /**
   * 获取隐私政策内容
   * @param {Object} params - 查询参数
   * @param {string} params.language - 语言 (可选)
   * @param {string} params.version - 版本号 (可选，不指定则获取最新版本)
   * @returns {Promise}
   */
  getPrivacyPolicy: (params = {}) => {
    return request.get('/agreement/privacy-policy', { params });
  },

  /**
   * 获取协议版本列表
   * @param {string} type - 协议类型 (user-agreement 或 privacy-policy)
   * @returns {Promise}
   */
  getAgreementVersions: (type) => {
    return request.get('/agreement/versions', { params: { type } });
  },

  /**
   * 用户同意协议
   * @param {Object} data - 提交数据
   * @param {string} data.userId - 用户ID
   * @param {string} data.agreementType - 协议类型
   * @param {string} data.agreementVersion - 协议版本
   * @param {string} data.ip - IP地址 (可选)
   * @returns {Promise}
   */
  agreeAgreement: (data) => {
    return request.post('/agreement/agree', data);
  }
};

export default agreementApi;