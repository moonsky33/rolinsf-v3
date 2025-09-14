import axios from 'axios'

// 创建axios实例
const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // 从环境变量中获取API基础URL
  timeout: 10000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json'
  }
});

// 请求拦截器
request.interceptors.request.use(
  config => {
    // 在这里可以添加token等认证信息
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

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