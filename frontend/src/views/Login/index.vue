<template>
    <div class="page">
        <div class="login-box">
            <h1 class="title">若林轻小说</h1>
            
            <!-- 登录方式选项卡 -->
            <el-tabs v-model="activeTab" type="border-card" style="margin-bottom: 20px">
                <el-tab-pane label="手机号登录" name="phone">
                    <!-- 手机号登录表单 -->
                    <el-form ref="phoneFormRef" :model="phoneForm" :rules="phoneFormRules" label-width="auto">
                        <el-form-item prop="phone">
                            <el-input v-model="phoneForm.phone" placeholder="请输入手机号" :prefix-icon="Cellphone" />
                        </el-form-item>

                        <el-form-item prop="code">
                            <el-input v-model="phoneForm.code" style="width: 70%" placeholder="请输入验证码" :prefix-icon="Lock" />
                            <el-button type="primary" style="width: 30%" :disabled="countDown > 0" @click="sendCode">{{ countDown > 0 ? `${countDown}秒后重试` : '发送验证码' }}</el-button>                     
                        </el-form-item>

                        <el-form-item>
                            <!-- 许可协议的复选框 -->
                            <el-checkbox v-model="phoneForm.status">
                                我已阅读并同意
                                <el-link type="primary" @click="showUserAgreement">《用户协议》</el-link>
                                和
                                <el-link type="primary" @click="showPrivacyPolicy">《隐私条款》</el-link>
                            </el-checkbox>
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" @click="phoneLogin" style="width: 100%">登录</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                
                <el-tab-pane label="邮箱/用户名登录" name="email">
                    <!-- 邮箱/用户名登录表单 -->
                    <el-form ref="emailFormRef" :model="emailForm" :rules="emailFormRules" label-width="auto">
                        <el-form-item prop="username">
                            <el-input v-model="emailForm.username" placeholder="请输入邮箱或用户名" :prefix-icon="User" />
                        </el-form-item>

                        <el-form-item prop="password">
                            <el-input v-model="emailForm.password" type="password" placeholder="请输入密码" :prefix-icon="Lock" />
                        </el-form-item>

                        <el-form-item>
                            <!-- 许可协议的复选框 -->
                            <el-checkbox v-model="emailForm.status">
                                我已阅读并同意
                                <el-link type="primary" @click="showUserAgreement">《用户协议》</el-link>
                                和
                                <el-link type="primary" @click="showPrivacyPolicy">《隐私条款》</el-link>
                            </el-checkbox>
                        </el-form-item>

<!-- 已移除图片拼接验证 -->

                        <el-form-item>
                            <el-button type="primary" @click="emailLogin" style="width: 100%">登录</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                
                <el-tab-pane label="用户注册" name="register">
                    <!-- 用户注册表单 -->
                    <el-form ref="registerFormRef" :model="registerForm" :rules="registerFormRules" label-width="auto">
                        <el-form-item prop="username">
                            <el-input v-model="registerForm.username" placeholder="请输入用户名（不支持中文）" :prefix-icon="User" />
                        </el-form-item>

                        <el-form-item prop="email">
                            <el-input v-model="registerForm.email" placeholder="请输入邮箱" :prefix-icon="Message" />
                        </el-form-item>

                        <el-form-item prop="code">
                            <el-input v-model="registerForm.code" style="width: 70%" placeholder="请输入验证码" :prefix-icon="Lock" />
                            <el-button type="primary" style="width: 30%" :disabled="registerCountDown > 0" @click="sendRegisterCode">{{ registerCountDown > 0 ? `${registerCountDown}秒后重试` : '发送验证码' }}</el-button>                      
                        </el-form-item>

                        <el-form-item prop="password">
                            <el-input v-model="registerForm.password" type="password" placeholder="请设置密码" :prefix-icon="Lock" />
                        </el-form-item>

                        <el-form-item prop="confirmPassword">
                            <el-input v-model="registerForm.confirmPassword" type="password" placeholder="请再次输入密码" :prefix-icon="Lock" />
                        </el-form-item>

                        <el-form-item>
                            <!-- 许可协议的复选框 -->
                            <el-checkbox v-model="registerForm.status">
                                我已阅读并同意
                                <el-link type="primary" @click="showUserAgreement">《用户协议》</el-link>
                                和
                                <el-link type="primary" @click="showPrivacyPolicy">《隐私条款》</el-link>
                            </el-checkbox>
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" @click="register" style="width: 100%">注册</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref, onUnmounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
// 导入需要的icon图标
import { Cellphone, Lock, User, Message } from '@element-plus/icons-vue'

// 选项卡状态
const activeTab = ref('phone')

// 表单引用
const phoneFormRef = ref(null)
const emailFormRef = ref(null)
const registerFormRef = ref(null)

// 手机号登录表单数据
const phoneForm = reactive({
    phone: '',
    code: '',
    status: false
})

// 邮箱/用户名登录表单数据
const emailForm = reactive({
    username: '',
    password: '',
    status: false
})

// 已移除图片拼接验证相关代码

// 注册表单数据
const registerForm = reactive({
    username: '',
    email: '',
    code: '',
    password: '',
    confirmPassword: '',
    status: false
})

// 倒计时状态
const countDown = ref(0)
const registerCountDown = ref(0)
let timer = null
let registerTimer = null

// 手机号登录表单校验规则
const phoneFormRules = {
    phone: [
        { required: true, message: '请输入手机号', trigger: 'blur' },
        { min: 11, max: 11, message: '手机号长度为11位', trigger: 'blur' },
        { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur' },
    ],
    code: [
        { required: true, message: '请输入验证码', trigger: 'blur' },
        { min: 6, max: 6, message: '验证码长度为6位', trigger: 'blur' },
        { pattern: /^\d{6}$/, message: '验证码格式不正确', trigger: 'blur' },
    ],
    status: [
        { required: true, validator: (rule, value, callback) => {
            if (!value) {
                callback(new Error('请阅读并同意用户协议和隐私条款'))
            } else {
                callback()
            }
        }, trigger: 'change' }
    ]
}

// 邮箱/用户名登录表单校验规则
const emailFormRules = {
    username: [
        { required: true, message: '请输入邮箱或用户名', trigger: 'blur' },
        { min: 3, max: 50, message: '用户名长度在3到50个字符之间', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 20, message: '密码长度在6到20个字符之间', trigger: 'blur' }
    ],
    status: [
        { required: true, validator: (rule, value, callback) => {
            if (!value) {
                callback(new Error('请阅读并同意用户协议和隐私条款'))
            } else {
                callback()
            }
        }, trigger: 'change' }
    ]
}

// 注册表单校验规则
const registerFormRules = {
    code: [
        { required: true, message: '请输入验证码', trigger: 'blur' },
        { min: 6, max: 6, message: '验证码长度为6位', trigger: 'blur' },
        { pattern: /^\d{6}$/, message: '验证码格式不正确', trigger: 'blur' },
    ],
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, max: 20, message: '用户名长度在3到20个字符之间', trigger: 'blur' },
        { pattern: /^[A-Za-z0-9_]+$/, message: '用户名只能包含字母、数字和下划线，不支持中文', trigger: 'blur' },
        { validator: async (rule, value, callback) => {
            try {
                // 模拟用户名唯一性校验
                // 这里应该调用实际的API检查用户名是否已存在
                await checkUsernameExists(value);
                callback();
            } catch (error) {
                callback(error);
            }
        }, trigger: 'blur' }
    ],
    email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        { type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' },
        { validator: async (rule, value, callback) => {
            try {
                // 模拟邮箱唯一性校验
                // 这里应该调用实际的API检查邮箱是否已存在
                await checkEmailExists(value);
                callback();
            } catch (error) {
                callback(error);
            }
        }, trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请设置密码', trigger: 'blur' },
        { min: 6, max: 20, message: '密码长度在6到20个字符之间', trigger: 'blur' },
        { pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/, message: '密码必须包含字母和数字', trigger: 'blur' }
    ],
    confirmPassword: [
        { required: true, message: '请再次输入密码', trigger: 'blur' },
        { validator: (rule, value, callback) => {
            if (value !== registerForm.password) {
                callback(new Error('两次输入的密码不一致'))
            } else {
                callback()
            }
        }, trigger: 'blur' }
    ],
    status: [
        { required: true, validator: (rule, value, callback) => {
            if (!value) {
                callback(new Error('请阅读并同意用户协议和隐私条款'))
            } else {
                callback()
            }
        }, trigger: 'change' }
    ]
}

// 点击按钮发送登录验证码
const sendCode = async () => {
    // 先校验手机号
    try {
        await phoneFormRef.value.validateField('phone')
        
        // 模拟发送验证码的请求
        ElMessage.success('验证码已发送，请查收')
        
        // 开始倒计时
        startCountDown()
        
        // 这里应该调用实际的发送验证码API
        console.log('向手机号', phoneForm.phone, '发送登录验证码')
    } catch (error) {
        // 手机号校验失败，不发送验证码
    }
}

// 点击按钮发送注册验证码
const sendRegisterCode = async () => {
    // 先校验邮箱
    try {
        await registerFormRef.value.validateField('email')
        
        // 模拟发送验证码的请求
        ElMessage.success('验证码已发送到您的邮箱，请查收')
        
        // 开始倒计时
        startRegisterCountDown()
        
        // 这里应该调用实际的发送验证码API
        console.log('向邮箱', registerForm.email, '发送注册验证码')
    } catch (error) {
        // 邮箱校验失败，不发送验证码
    }
}

// 开始注册验证码倒计时
const startRegisterCountDown = () => {
    registerCountDown.value = 60
    
    if (registerTimer) {
        clearInterval(registerTimer)
    }
    
    registerTimer = setInterval(() => {
        registerCountDown.value--
        if (registerCountDown.value <= 0) {
            clearInterval(registerTimer)
        }
    }, 1000)
}

// 开始登录验证码倒计时



// 开始登录验证码倒计时
const startCountDown = () => {
    countDown.value = 60
    
    if (timer) {
        clearInterval(timer)
    }
    
    timer = setInterval(() => {
        countDown.value--
        if (countDown.value <= 0) {
            clearInterval(timer)
        }
    }, 1000)
}

// 模拟用户名唯一性校验函数
const checkUsernameExists = async (username) => {
    // 这里应该是实际的API调用，现在只是模拟
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // 模拟一些已存在的用户名
    const existingUsernames = ['admin', 'test', 'user123'];
    
    if (existingUsernames.includes(username.toLowerCase())) {
        throw new Error('用户名已存在，请选择其他用户名');
    }
    
    return true;
}

// 模拟邮箱唯一性校验函数
const checkEmailExists = async (email) => {
    // 这里应该是实际的API调用，现在只是模拟
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // 模拟一些已存在的邮箱
    const existingEmails = ['admin@example.com', 'test@example.com'];
    
    if (existingEmails.includes(email.toLowerCase())) {
        throw new Error('邮箱已被注册，请使用其他邮箱');
    }
    
    return true;
}

// 手机号登录
const phoneLogin = async () => {
    try {
        // 触发表单校验
        await phoneFormRef.value.validate()
        
        // 校验通过，执行登录逻辑
        ElMessage.success('登录成功')
        
        // 这里应该调用实际的登录API
        console.log('手机号登录请求数据:', phoneForm)
        
        // 模拟登录成功后跳转
        setTimeout(() => {
            window.location.href = '/'
        }, 1000)
    } catch (error) {
        // 表单校验失败
        ElMessage.error('请检查表单数据')
    }
}

// 邮箱/用户名登录
const emailLogin = async () => {
    try {
        // 触发表单校验
        await emailFormRef.value.validate()
        
        // 校验通过，执行登录逻辑
        ElMessage.success('登录成功')
        
        // 这里应该调用实际的登录API
        console.log('邮箱/用户名登录请求数据:', emailForm)
        
        // 模拟登录成功后跳转
        setTimeout(() => {
            window.location.href = '/' 
        }, 1000)
    } catch (error) {
        // 表单校验失败
        ElMessage.error('请检查表单数据')
    }
}

// 用户注册
const register = async () => {
    try {
        // 触发表单校验
        await registerFormRef.value.validate()
        
        // 校验通过，执行注册逻辑
        
        // 这里应该调用实际的注册API
        console.log('注册请求数据:', {
            username: registerForm.username,
            email: registerForm.email,
            code: registerForm.code,
            password: registerForm.password
        })
        
        // 模拟注册成功
        ElMessage.success('注册成功')
        
        // 模拟注册成功后切换到登录选项卡
        setTimeout(() => {
            activeTab.value = 'phone'
            ElMessage.success('请使用新账号登录')
            // 重置注册表单
            registerFormRef.value.resetFields()
        }, 1000)
    } catch (error) {
        // 表单校验失败
        ElMessage.error('请检查表单数据')
    }
}

// 组件卸载时清除定时器
onUnmounted(() => {
    if (timer) {
        clearInterval(timer)
    }
    if (registerTimer) {
        clearInterval(registerTimer)
    }
})

// 显示用户协议
const showUserAgreement = () => {
    ElMessageBox.alert('这里是用户协议内容', '用户协议', {
        confirmButtonText: '我知道了',
    })
}

// 显示隐私条款
const showPrivacyPolicy = () => {
    ElMessageBox.alert('这里是隐私条款内容', '隐私条款', {
        confirmButtonText: '我知道了',
    })
}



</script>

<style scoped>
.page{
    background: url('../../assets/img/bg.jpg') no-repeat center / cover;
    /* vh是浏览器视图的高度*/
    height: 100vh;
}

.login-box{
    width: 450px;
    background-color: white;
    padding: 15px;
    box-sizing: border-box;
    border-radius: 5px;
    /*盒子放到页面正中间*/
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
}

.title{
    text-align: center;
    color: #4ac0ff;
}


</style>