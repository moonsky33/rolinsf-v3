// API统一入口
import authApi from './auth';
import agreementApi from './agreement';

// 导出所有API模块
export {
  authApi,
  agreementApi
};

// 也可以作为默认导出，方便整体导入
export default {
  authApi,
  agreementApi
};