// Mock数据服务
// 当后端未实现时，提供模拟数据响应

/**
 * Mock数据配置
 */
const mockData = {
  // 用户协议数据
  userAgreement: {
    id: '1',
    type: 'user-agreement',
    title: '用户协议',
    version: '1.0.0',
    publishDate: '2024-06-01',
    content: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>用户协议</title>
    <style>
        body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
        h1, h2, h3 { color: #000; }
        p { margin-bottom: 15px; }
        ul, ol { margin-bottom: 15px; padding-left: 20px; }
        li { margin-bottom: 8px; }
        .section { margin-bottom: 30px; }
    </style>
</head>
<body>
    <h1>用户协议</h1>
    
    <div class="section">
        <h2>1. 服务条款</h2>
        <p>1.1 本协议是您与RolinSF轻小说网站（以下简称"本网站"）之间关于使用本网站服务所订立的协议。</p>
        <p>1.2 您在使用本网站服务前，应当认真阅读并理解本协议的全部内容。如果您不同意本协议的任何内容，您应立即停止使用本网站。</p>
        <p>1.3 本网站有权在必要时修改本协议条款，您可以在本网站上查阅最新版本的协议条款。如您继续使用本网站服务，则视为您已接受修改后的协议。</p>
    </div>
    
    <div class="section">
        <h2>2. 用户注册与账户管理</h2>
        <p>2.1 用户在注册时应提供真实、准确、完整的个人资料，并在资料变更时及时更新。</p>
        <p>2.2 用户应妥善保管自己的账户和密码，对使用其账户进行的所有操作负全部责任。</p>
        <p>2.3 如发现任何未经授权使用用户账户的情况，应立即通知本网站。</p>
    </div>
    
    <div class="section">
        <h2>3. 用户行为规范</h2>
        <p>用户在使用本网站服务时，必须遵守中华人民共和国相关法律法规的规定，不得利用本网站服务进行任何违法或不正当的活动，包括但不限于：</p>
        <ul>
            <li>发布、传播含有反动、色情、暴力、恐怖、赌博等违法内容的信息；</li>
            <li>侵犯他人知识产权、商业秘密等合法权益；</li>
            <li>干扰本网站的正常运行；</li>
            <li>其他违反法律法规、社会公德或损害他人合法权益的行为。</li>
        </ul>
    </div>
    
    <div class="section">
        <h2>4. 知识产权</h2>
        <p>4.1 本网站及其相关的所有内容，包括但不限于文字、图片、音频、视频、软件、程序、数据等，均受著作权法、商标法等相关法律法规的保护。</p>
        <p>4.2 未经本网站或相关权利人书面许可，用户不得以任何方式使用、复制、修改、传播本网站的任何内容。</p>
    </div>
    
    <div class="section">
        <h2>5. 免责声明</h2>
        <p>5.1 本网站不对用户因使用本网站服务而产生的任何直接、间接、偶然、特殊及后续的损害承担责任。</p>
        <p>5.2 本网站不保证其服务一定能满足用户的要求，也不保证其服务不会中断。</p>
    </div>
    
    <div class="section">
        <h2>6. 协议的终止</h2>
        <p>6.1 如用户违反本协议的任何规定，本网站有权随时终止向用户提供服务。</p>
        <p>6.2 用户可随时停止使用本网站服务，终止本协议。</p>
    </div>
    
    <div class="section">
        <h2>7. 法律适用与争议解决</h2>
        <p>7.1 本协议的订立、执行、解释及争议的解决均适用中华人民共和国法律。</p>
        <p>7.2 如双方在本协议履行过程中发生争议，应首先通过友好协商解决；协商不成的，任何一方均有权向有管辖权的人民法院提起诉讼。</p>
    </div>
</body>
</html>`
  },
  
  // 隐私政策数据
  privacyPolicy: {
    id: '2',
    type: 'privacy-policy',
    title: '隐私政策',
    version: '1.0.0',
    publishDate: '2024-06-01',
    content: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>隐私政策</title>
    <style>
        body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
        h1, h2, h3 { color: #000; }
        p { margin-bottom: 15px; }
        ul, ol { margin-bottom: 15px; padding-left: 20px; }
        li { margin-bottom: 8px; }
        .section { margin-bottom: 30px; }
    </style>
</head>
<body>
    <h1>隐私政策</h1>
    
    <div class="section">
        <h2>1. 信息收集</h2>
        <p>1.1 我们可能收集您在注册、使用本网站服务过程中提供的个人信息，包括但不限于您的姓名、电子邮箱、手机号码等。</p>
        <p>1.2 我们会自动收集您使用本网站服务的相关信息，如您的IP地址、浏览器类型、操作系统、访问时间等。</p>
        <p>1.3 我们不会收集与本网站服务无关的个人信息，也不会收集法律法规禁止收集的个人信息。</p>
    </div>
    
    <div class="section">
        <h2>2. 信息使用</h2>
        <p>我们收集的个人信息将用于以下目的：</p>
        <ul>
            <li>提供、维护和改进本网站服务；</li>
            <li>发送服务通知、更新和促销信息；</li>
            <li>进行用户身份验证和安全防范；</li>
            <li>分析用户行为，优化用户体验；</li>
            <li>遵守法律法规的要求。</li>
        </ul>
    </div>
    
    <div class="section">
        <h2>3. 信息保护</h2>
        <p>3.1 我们采取各种安全措施保护您的个人信息，防止信息被未经授权访问、使用或泄露。</p>
        <p>3.2 我们仅允许有必要知晓您个人信息的员工访问您的个人信息，并要求他们履行保密义务。</p>
        <p>3.3 如发生个人信息泄露等安全事件，我们将立即采取补救措施，并按照规定及时向有关部门报告。</p>
    </div>
    
    <div class="section">
        <h2>4. 信息共享</h2>
        <p>4.1 未经您的明确许可，我们不会向第三方出售、出租、交换或以其他方式转让您的个人信息。</p>
        <p>4.2 在以下情况下，我们可能会共享您的个人信息：</p>
        <ul>
            <li>获得您的明确同意；</li>
            <li>遵守法律法规的要求；</li>
            <li>保护本网站、用户或公众的权利、财产或安全；</li>
            <li>与我们的关联公司、合作伙伴共享，但这些公司或伙伴必须按照我们的要求处理信息并保持保密。</li>
        </ul>
    </div>
    
    <div class="section">
        <h2>5. Cookie的使用</h2>
        <p>5.1 我们使用Cookie来帮助我们提供更好的服务，例如记住您的登录状态、偏好设置等。</p>
        <p>5.2 您可以通过修改浏览器设置来拒绝Cookie，但这可能会影响您使用本网站服务的功能。</p>
    </div>
    
    <div class="section">
        <h2>6. 未成年人保护</h2>
        <p>6.1 我们非常重视对未成年人个人信息的保护，如您是未满18周岁的未成年人，在使用本网站服务前，应当事先取得您的父母或法定监护人的同意。</p>
        <p>6.2 对于经父母或法定监护人同意而收集的未成年人的个人信息，我们只会在法律允许、父母或监护人明确同意或者保护未成年人所必要的情况下使用或公开披露此信息。</p>
    </div>
    
    <div class="section">
        <h2>7. 隐私政策的更新</h2>
        <p>7.1 我们可能会不时更新本隐私政策，更新后的隐私政策将在本网站上公布。</p>
        <p>7.2 如您继续使用本网站服务，则视为您已接受更新后的隐私政策。</p>
    </div>
    
    <div class="section">
        <h2>8. 联系我们</h2>
        <p>如您对本隐私政策有任何疑问，请通过以下方式联系我们：</p>
        <p>邮箱：support@rolinsf.com</p>
    </div>
</body>
</html>`
  },
  
  // 认证相关mock数据
  auth: {
    login: {
      token: 'mock-jwt-token',
      userInfo: {
        id: '123',
        username: 'testuser',
        email: 'test@example.com',
        avatar: '',
        roles: ['user']
      }
    },
    register: {
      success: true,
      message: '注册成功'
    },
    verifyCode: {
      success: true,
      message: '验证码已发送'
    }
  }
};

/**
 * Mock API响应生成器
 * @param {Object} data - 响应数据
 * @param {number} code - 状态码
 * @param {string} message - 消息
 * @returns {Object} - 标准响应格式
 */
const mockResponse = (data = null, code = 200, message = 'success') => {
  return {
    code,
    message,
    data,
    timestamp: Date.now()
  };
};

/**
 * 模拟网络延迟
 * @param {number} delay - 延迟时间（毫秒）
 * @returns {Promise}
 */
const mockDelay = (delay = 300) => {
  return new Promise(resolve => setTimeout(resolve, delay));
};

export { mockData, mockResponse, mockDelay };