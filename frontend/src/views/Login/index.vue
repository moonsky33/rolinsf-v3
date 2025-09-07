<template>
    <div class="page">
        <div class="login-box">
            <h1 class="title">若林轻小说</h1>
            <!-- 表单的容器 -->
            <el-form ref="formRef" :model="form" :rules="formRules" label-width="auto" style="max-width: 600px">
                <el-form-item prop="phone">
                    <!-- 表单元素 -->
                    <el-input v-model="form.phone" placeholder="请输入手机号" :prefix-icon="Cellphone" />
                </el-form-item>

                <el-form-item prop="code">
                    <el-input v-model="form.code" style="width: 70%" placeholder="请输入验证码" :prefix-icon="Lock" />
                    <el-button type="primary" style="width: 30%" :disabled="countDown > 0" @click="sendCode">{{ countDown > 0 ? `${countDown}秒后重试` : '发送验证码' }}</el-button>                    
                </el-form-item>

                <el-form-item>
                    <!-- 许可协议的复选框 -->
                    <el-checkbox v-model="form.status">
                        我已阅读并同意
                        <el-link type="primary" @click="showUserAgreement">《用户协议》</el-link>
                        和
                        <el-link type="primary" @click="showPrivacyPolicy">《隐私条款》</el-link>
                    </el-checkbox>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="onSubmit" style="width: 100%">登录</el-button>
                </el-form-item>

            </el-form>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
// 导入需要的icon图标
import { Cellphone, Lock } from '@element-plus/icons-vue'

// 表单引用
const formRef = ref(null)

// 表单数据
const form = reactive({
    phone: '',
    code: '',
    status: false
})

// 倒计时状态
const countDown = ref(0)
let timer = null

// 1、创建校验对象
const formRules = {
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

// 点击按钮发送验证码
const sendCode = async () => {
    // 先校验手机号
    try {
        await formRef.value.validateField('phone')
        
        // 模拟发送验证码的请求
        ElMessage.success('验证码已发送，请查收')
        
        // 开始倒计时
        startCountDown()
        
        // 这里应该调用实际的发送验证码API
        console.log('向手机号', form.phone, '发送验证码')
    } catch (error) {
        // 手机号校验失败，不发送验证码
    }
}

// 开始倒计时
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

// 表单提交
const onSubmit = async () => {
    try {
        // 触发表单校验
        await formRef.value.validate()
        
        // 校验通过，执行登录逻辑
        ElMessage.success('登录成功')
        
        // 这里应该调用实际的登录API
        console.log('登录请求数据:', form)
        
        // 模拟登录成功后跳转
        setTimeout(() => {
            window.location.href = '/'
        }, 1000)
    } catch (error) {
        // 表单校验失败
        ElMessage.error('请检查表单数据')
    }
}

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

// 组件卸载时清除定时器
import { onUnmounted } from 'vue'
onUnmounted(() => {
    if (timer) {
        clearInterval(timer)
    }
})

</script>

<style scoped>
.page{
    background: url('../../assets/img/bg.jpg') no-repeat center / cover;
    /* vh是浏览器视图的高度*/
    height: 100vh;
}

.login-box{ 
    width: 400px;
    height: 300px;
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