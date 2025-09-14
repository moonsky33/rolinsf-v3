# API 统一管理文档

本文档介绍了项目中API的统一管理结构和使用方式。

## 目录结构

```
src/api/
├── request.js        # axios实例配置（请求拦截、响应拦截等）
├── index.js          # API统一入口
├── auth.js           # 认证相关API
├── agreement.js      # 协议相关API
├── mock.js           # Mock数据服务（后端未实现时使用）
├── utils.js          # API工具函数
└── README.md         # API使用说明文档
```

## 环境配置

API基础URL等配置在根目录的 `.env` 文件中设置：

```
# API配置
VITE_API_BASE_URL=http://localhost:3000/api
```

## API使用方式

### 1. 导入API模块

可以通过以下方式导入API：

```javascript
// 导入单个API模块
import { authApi, agreementApi } from '@/api';

// 或者整体导入
import api from '@/api';
const { authApi, agreementApi } = api;
```

### 2. 调用API方法

```javascript
// 示例：用户登录
import { authApi } from '@/api';

try {
  const result = await authApi.emailLogin({
    email: 'test@example.com',
    password: 'password123'
  });
  console.log('登录成功:', result);
} catch (error) {
  console.error('登录失败:', error);
}

// 示例：获取用户协议
import { agreementApi } from '@/api';

try {
  const result = await agreementApi.getUserAgreement();
  console.log('用户协议:', result);
} catch (error) {
  console.error('获取协议失败:', error);
}
```

## API工具函数

项目提供了一些实用的API工具函数，位于 `utils.js` 中：

### 1. 错误处理

```javascript
import { handleApiError } from '@/api/utils';

try {
  // API调用
} catch (error) {
  const errorMsg = handleApiError(error, customHandler);
  // 显示错误信息
}
```

### 2. 缓存管理

```javascript
import { apiCache } from '@/api/utils';

// 设置缓存
apiCache.set('cache-key', data, 5 * 60 * 1000); // 缓存5分钟

// 获取缓存
const data = apiCache.get('cache-key');

// 清除缓存
apiCache.delete('cache-key');
apiCache.clear(); // 清除所有缓存
```

## Mock数据服务

由于后端尚未实现，项目提供了Mock数据服务，位于 `mock.js` 中：

### 使用Mock数据

当前在 `AgreementModal.vue` 组件中，我们使用Mock数据来模拟API响应：

```javascript
// 在实际项目中，这里会调用真实的API
await mockDelay(); // 模拟网络延迟
const agreementData = type === 'user' ? mockData.userAgreement : mockData.privacyPolicy;
```

### 切换到真实API

当后端实现完成后，可以将 `AgreementModal.vue` 中的Mock数据调用替换为真实的API调用：

```javascript
// 替换之前的Mock调用
const agreementData = await agreementApi.getUserAgreement(); // 或 getPrivacyPolicy()
```

## API模块说明

### auth.js - 认证相关API

- `emailLogin(data)` - 邮箱登录
- `phoneLogin(data)` - 手机号登录
- `register(data)` - 注册账号
- `getEmailVerifyCode(email)` - 获取邮箱验证码
- `getPhoneVerifyCode(phone)` - 获取手机验证码
- `logout()` - 退出登录
- `getUserInfo()` - 获取用户信息

### agreement.js - 协议相关API

- `getUserAgreement(params)` - 获取用户协议
- `getPrivacyPolicy(params)` - 获取隐私政策
- `getAgreementVersions(type)` - 获取协议版本列表
- `agreeAgreement(data)` - 用户同意协议

## 最佳实践

1. **统一错误处理**：使用 `handleApiError` 函数统一处理API错误
2. **合理使用缓存**：对于不经常变化的数据（如协议内容），使用 `apiCache` 进行缓存
3. **避免重复请求**：对于相同的请求，考虑使用防抖或节流
4. **请求重试机制**：对于重要的请求，可以使用 `retryRequest` 函数实现重试机制
5. **API文档维护**：随着项目发展，及时更新API文档

## 注意事项

1. 确保 `.env` 文件中的API基础URL正确设置
2. 在生产环境中，记得移除或禁用Mock数据服务
3. 对于需要认证的API，确保在请求头中正确设置token
4. 遵循RESTful API设计规范，保持API的一致性