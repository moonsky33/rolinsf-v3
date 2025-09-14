import axios from 'axios'

import { mockData, mockResponse, mockDelay } from './mock.js';

// 模拟模式开关 - 当没有对接后台时设为true
const MOCK_MODE = true;

// 创建axios实例
const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // 从环境变量中获取API基础URL
  timeout: 10000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json'
  }
});

/**
 * Mock请求处理器
 * 根据请求URL和方法返回对应的模拟数据
 */
const mockRequestHandler = async (config) => {
  await mockDelay(); // 模拟网络延迟
  
  const url = config.url;
  const method = config.method.toLowerCase();
  // 检查 data 是否为字符串类型，如果是对象则直接使用
const data = typeof config.data === 'string' ? JSON.parse(config.data) : config.data || null;
  
  // 处理认证相关的mock请求
  if (url === '/auth/email-login' && method === 'post') {
    // 邮箱登录 - 支持admin账户和123456密码
    const { email, password } = data;
    let userInfo = null;
    let token = 'mock-jwt-token';
    
    // 检查是否是admin账户登录
    if (email === 'admin@example.com' || email === 'admin') {
      if (password === '123456') {
        // admin账户验证成功
        userInfo = {
          ...mockData.auth.users.admin,
          // 移除密码信息
          password: undefined
        };
        token = 'mock-jwt-token-admin';
      } else {
        // 密码错误
        return Promise.reject({
          response: {
            status: 401,
            data: mockResponse(null, 401, '密码错误')
          }
        });
      }
    } else if (mockData.auth.users.testuser.email === email || mockData.auth.users.testuser.username === email) {
      // 测试用户登录
      if (password === 'password123' || password === '123456') {
        userInfo = {
          ...mockData.auth.users.testuser,
          // 移除密码信息
          password: undefined
        };
      } else {
        // 密码错误
        return Promise.reject({
          response: {
            status: 401,
            data: mockResponse(null, 401, '密码错误')
          }
        });
      }
    } else {
      // 其他用户，默认使用testuser信息
      userInfo = {
        ...mockData.auth.users.testuser,
        email: email,
        // 移除密码信息
        password: undefined
      };
    }
    
    return Promise.resolve({
      data: mockResponse({
        token,
        userInfo
      })
    });
  } else if (url === '/auth/phone-login' && method === 'post') {
    // 手机号登录 - 假设任何手机号和验证码都能登录成功
    return Promise.resolve({
      data: mockResponse({
        token: 'mock-jwt-token',
        userInfo: {
          ...mockData.auth.users.testuser,
          // 移除密码信息
          password: undefined
        }
      })
    });
  } else if (url === '/auth/register' && method === 'post') {
    // 注册 - 假设注册总是成功
    return Promise.resolve({
      data: mockResponse(mockData.auth.register)
    });
  } else if (url.includes('/auth/email-code') && method === 'get') {
    // 获取邮箱验证码
    return Promise.resolve({
      data: mockResponse(mockData.auth.verifyCode)
    });
  } else if (url.includes('/auth/phone-code') && method === 'get') {
    // 获取手机验证码
    return Promise.resolve({
      data: mockResponse(mockData.auth.verifyCode)
    });
  } else if (url === '/auth/logout' && method === 'post') {
    // 退出登录
    return Promise.resolve({
      data: mockResponse({ success: true })
    });
  } else if (url === '/auth/user-info' && method === 'get') {
    // 获取用户信息 - 根据token判断用户角色
    const token = config.headers?.Authorization?.replace('Bearer ', '') || '';
    let userInfo;
    
    // 根据token判断是否为admin用户
    if (token === 'mock-jwt-token-admin') {
      userInfo = {
        ...mockData.auth.users.admin,
        // 移除密码信息
        password: undefined
      };
    } else {
      userInfo = {
        ...mockData.auth.users.testuser,
        // 移除密码信息
        password: undefined
      };
    }
    
    return Promise.resolve({
      data: mockResponse(userInfo)
    });
  }
  
  // 默认返回404
  return Promise.reject({
    response: {
      status: 404,
      data: mockResponse(null, 404, 'Mock API not found')
    }
  });
};

// 请求拦截器
request.interceptors.request.use(
  config => {
    // 非模拟模式，添加token等认证信息
    if (!MOCK_MODE) {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 在模拟模式下，使用axios的adapter来拦截所有请求
if (MOCK_MODE) {
  request.defaults.adapter = async function(config) {
    return mockRequestHandler(config);
  };
}

// 响应拦截器
request.interceptors.response.use(
  response => {
    // 统一处理响应数据
    const res = response.data;
    // 根据实际后端接口规范调整
    if (res.code !== 200) {
      // 可以在这里统一处理错误码
      console.error('API Error:', res.message);
      return Promise.reject(new Error(res.message || 'Error'));
    }
    return res.data;
  },
  error => {
    // 统一处理响应错误
    console.error('Request Error:', error);
    // 处理网络错误、超时等
    if (!error.response) {
      console.error('Network Error or Timeout');
    } else {
      // 根据HTTP状态码处理不同的错误
      switch (error.response.status) {
        case 401:
          // 未授权，可能需要跳转到登录页
          console.error('Unauthorized, please login again');
          break;
        case 403:
          console.error('Access denied');
          break;
        case 404:
          console.error('API not found');
          break;
        case 500:
          console.error('Server error');
          break;
        default:
          console.error('Unknown error');
      }
    }
    return Promise.reject(error);
  }
);

export default request;