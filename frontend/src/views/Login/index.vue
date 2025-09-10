<template>
    <div class="page">
        <div class="login-box">
    <!-- 协议弹窗组件 -->
    <AgreementModal ref="agreementModalRef" />
            <h1 class="title">若林轻小说</h1>
            
            <!-- 登录方式选项卡 -->
            <el-tabs v-model="activeTab" type="border-card" style="margin-bottom: 20px">
                <!-- 手机号登录表单组件 -->
                <!-- <el-tab-pane label="手机号登录" name="phone">
                    <PhoneLoginForm
                        :rules="phoneLoginRules"
                        :count-down="phoneCountDown"
                        :login-loading="loginLoading"
                        @send-code="handlePhoneSendCode"
                        @submit="handlePhoneLogin"
                        @show-agreement="showAgreement"
                        @validate-error="handleValidateError"
                        ref="phoneFormRef"
                    />
                </el-tab-pane> -->
                
                <el-tab-pane label="邮箱/用户名登录" name="email">
                    <!-- 邮箱/用户名登录表单组件 -->
                    <EmailLoginForm
                        :rules="emailLoginRules"
                        :login-loading="loginLoading"
                        @submit="handleEmailLogin"
                        @show-agreement="showAgreement"
                        @validate-error="handleValidateError"
                        ref="emailFormRef"
                    />
                </el-tab-pane>
                
                <el-tab-pane label="用户注册" name="register">
                    <!-- 用户注册表单组件 -->
                    <RegisterForm
                        :rules="registerRules"
                        :count-down="registerCountDown"
                        :register-loading="registerLoading"
                        @send-code="handleRegisterSendCode"
                        @submit="handleRegister"
                        @show-agreement="showAgreement"
                        @validate-error="handleValidateError"
                        ref="registerFormRef"
                    />
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script setup>
// 导入Vue相关依赖
import { ref, computed, onUnmounted } from 'vue'
import { ElMessage } from 'element-plus'

// 导入子组件
import PhoneLoginForm from './components/PhoneLoginForm.vue'
import EmailLoginForm from './components/EmailLoginForm.vue'
import RegisterForm from './components/RegisterForm.vue'
import AgreementModal from './components/AgreementModal.vue'

// 导入业务逻辑钩子
import { useAuthForm } from './hooks/useAuthForm.js'
import { useCountDown } from './hooks/useCountDown.js'

// 导入表单验证规则
import { phoneLoginRules, emailLoginRules, getRegisterRules } from './utils/authRules.js'

// 选项卡状态
const activeTab = ref('email')

// 表单组件引用
const phoneFormRef = ref(null)
const emailFormRef = ref(null)
const registerFormRef = ref(null)
const agreementModalRef = ref(null)

// 使用认证表单钩子，获取API调用和业务逻辑方法
const {
    loginLoading,
    registerLoading,
    checkUsernameExists,
    checkEmailExists,
    handleSendCode,
    handlePhoneLogin,
    handleEmailLogin,
    handleRegister
} = useAuthForm()

// 使用倒计时钩子（手机号登录验证码）
const {
    countDown: phoneCountDown,
    startCountDown: startPhoneCountDown,
    stopCountDown: stopPhoneCountDown
} = useCountDown()

// 使用倒计时钩子（注册验证码）
const {
    countDown: registerCountDown,
    startCountDown: startRegisterCountDown,
    stopCountDown: stopRegisterCountDown
} = useCountDown()

// 动态计算注册表单规则（注入校验函数）
const registerRules = computed(() => 
    getRegisterRules(checkUsernameExists, checkEmailExists)
)

// 处理手机号验证码发送
const handlePhoneSendCode = async (phone) => {
    const success = await handleSendCode(phone, 'login')
    if (success) {
        startPhoneCountDown()
    }
}

// 处理注册验证码发送
const handleRegisterSendCode = async (email) => {
    const success = await handleSendCode(email, 'register')
    if (success) {
        startRegisterCountDown()
    }
}

// 处理表单验证错误
const handleValidateError = () => {
    ElMessage.error('请检查表单数据')
}

// 处理注册成功后的回调
const onRegisterSuccess = () => {
    // 重置注册表单
    registerFormRef.value?.resetForm()
    // 切换到手机号登录选项卡
    activeTab.value = 'phone'
}



// 组件卸载时清除定时器
onUnmounted(() => {
    stopPhoneCountDown()
    stopRegisterCountDown()
})



// 修复显示协议方法
const showAgreement = (type) => {
  // 直接调用全局注册的方法
  if (window.AgreementModal && window.AgreementModal.showAgreement) {
    window.AgreementModal.showAgreement(type)
  } else {
    ElMessage.error('无法打开协议窗口，请刷新页面重试')
  }
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