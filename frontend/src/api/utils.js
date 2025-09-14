// API工具函数

/**
 * API错误处理
 * @param {Error} error - 错误对象
 * @param {Function} customHandler - 自定义错误处理函数
 */
export const handleApiError = (error, customHandler = null) => {
  // 如果有自定义错误处理函数，则调用它
  if (typeof customHandler === 'function') {
    return customHandler(error);
  }

  // 默认错误处理
  let errorMessage = '网络错误，请稍后重试';
  
  if (error.response) {
    // 服务器返回了错误状态码
    const { status, data } = error.response;
    
    switch (status) {
      case 400:
        errorMessage = data?.message || '请求参数错误';
        break;
      case 401:
        errorMessage = '登录已过期，请重新登录';
        // 可以在这里处理未授权的情况，如跳转到登录页
        break;
      case 403:
        errorMessage = '没有权限执行此操作';
        break;
      case 404:
        errorMessage = '请求的资源不存在';
        break;
      case 500:
        errorMessage = '服务器内部错误';
        break;
      default:
        errorMessage = data?.message || `请求失败 (${status})`;
    }
  } else if (error.request) {
    // 请求已发送但未收到响应
    errorMessage = '服务器无响应，请检查网络连接';
  } else {
    // 请求配置出错
    errorMessage = error.message || '请求错误';
  }

  console.error('API Error:', errorMessage);
  return errorMessage;
};

/**
 * API请求缓存管理
 */
export class ApiCache {
  constructor() {
    this.cache = new Map();
    this.defaultTtl = 5 * 60 * 1000; // 默认缓存5分钟
  }

  /**
   * 设置缓存
   * @param {string} key - 缓存键
   * @param {*} data - 缓存数据
   * @param {number} ttl - 缓存有效期（毫秒）
   */
  set(key, data, ttl = this.defaultTtl) {
    const expiry = Date.now() + ttl;
    this.cache.set(key, { data, expiry });
  }

  /**
   * 获取缓存
   * @param {string} key - 缓存键
   * @returns {*} - 缓存数据或null
   */
  get(key) {
    if (!this.cache.has(key)) {
      return null;
    }

    const { data, expiry } = this.cache.get(key);
    // 检查缓存是否过期
    if (Date.now() > expiry) {
      this.delete(key);
      return null;
    }

    return data;
  }

  /**
   * 删除缓存
   * @param {string} key - 缓存键
   */
  delete(key) {
    this.cache.delete(key);
  }

  /**
   * 清除所有缓存
   */
  clear() {
    this.cache.clear();
  }

  /**
   * 检查缓存是否存在且未过期
   * @param {string} key - 缓存键
   * @returns {boolean}
   */
  has(key) {
    return this.get(key) !== null;
  }
}

// 创建全局缓存实例
export const apiCache = new ApiCache();

/**
 * 构建请求URL
 * @param {string} baseUrl - 基础URL
 * @param {string} path - 路径
 * @param {Object} params - 查询参数
 * @returns {string} - 完整的URL
 */
export const buildUrl = (baseUrl, path, params = {}) => {
  let url = `${baseUrl}/${path.replace(/^\//, '')}`;
  
  // 添加查询参数
  const queryParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      queryParams.append(key, value);
    }
  });
  
  const queryString = queryParams.toString();
  if (queryString) {
    url = `${url}?${queryString}`;
  }
  
  return url;
};

/**
 * 重试请求函数
 * @param {Function} requestFn - 请求函数
 * @param {Object} options - 重试选项
 * @param {number} options.maxRetries - 最大重试次数
 * @param {number} options.retryDelay - 重试延迟（毫秒）
 * @returns {Promise}
 */
export const retryRequest = async (requestFn, options = {}) => {
  const { maxRetries = 3, retryDelay = 1000 } = options;
  let lastError;
  
  for (let i = 0; i <= maxRetries; i++) {
    try {
      if (i > 0) {
        // 非首次请求，添加延迟
        await new Promise(resolve => setTimeout(resolve, retryDelay * Math.pow(2, i - 1)));
      }
      return await requestFn();
    } catch (error) {
      // 只在最后一次重试失败时抛出错误
      if (i === maxRetries) {
        throw error;
      }
      lastError = error;
      console.warn(`Request failed, retrying (${i + 1}/${maxRetries})...`, error);
    }
  }
  
  throw lastError;
};