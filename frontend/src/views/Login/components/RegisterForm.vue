<!-- src/views/Auth/components/RegisterForm.vue -->
<template>
  <el-form ref="formRef" :model="formData" :rules="rules" label-width="auto" @validate-error="onValidateError">
    <el-form-item prop="username">
      <el-input v-model="formData.username" placeholder="请输入用户名（不支持中文）" :prefix-icon="User" />
    </el-form-item>

    <el-form-item prop="email">
      <el-input v-model="formData.email" placeholder="请输入邮箱" :prefix-icon="Message" />
    </el-form-item>

    <el-form-item prop="code">
      <el-input v-model="formData.code" style="width: 70%" placeholder="请输入验证码" :prefix-icon="Lock" />
      <el-button type="primary" style="width: 30%" :disabled="countDown > 0" @click="sendCode">{{ countDown > 0 ? `${countDown}秒后重试` : '发送验证码' }}</el-button>
    </el-form-item>

    <el-form-item prop="password">
      <el-input v-model="formData.password" type="password" show-password placeholder="请设置密码" :prefix-icon="Lock" />
    </el-form-item>

    <el-form-item prop="confirmPassword">
      <el-input v-model="formData.confirmPassword" type="password" show-password placeholder="请再次输入密码" :prefix-icon="Lock" />
    </el-form-item>

    <el-form-item>
      <!-- 许可协议的复选框 -->
      <el-checkbox v-model="formData.status">
        我已阅读并同意
        <el-link type="primary" @click="showAgreement('agreement')">《用户协议》</el-link>
        和
        <el-link type="primary" @click="showAgreement('policy')">《隐私条款》</el-link>
      </el-checkbox>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="handleRegister" :loading="registerLoading" style="width: 100%">注册</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { User, Message, Lock } from '@element-plus/icons-vue'

// 接收父组件传递的props
const props = defineProps({
  // 表单验证规则
  rules: {
    type: Object,
    required: true
  },
  // 倒计时状态
  countDown: {
    type: Number,
    default: 0
  },
  // 注册按钮加载状态
  registerLoading: {
    type: Boolean,
    default: false
  }
})

// 定义向父组件传递的事件
const emit = defineEmits([
  // 发送验证码事件
  'send-code',
  // 提交注册事件
  'submit',
  // 显示协议事件
  'show-agreement',
  // 验证错误事件
  'validate-error'
])

// 表单引用
const formRef = ref(null)

// 表单数据
const formData = reactive({
  username: '',
  email: '',
  code: '',
  password: '',
  confirmPassword: '',
  status: false
})

// 发送验证码
const sendCode = async () => {
  try {
    // 先校验邮箱
    await formRef.value.validateField('email')
    
    // 触发发送验证码事件，由父组件处理倒计时逻辑
    emit('send-code', formData.email)
  } catch (error) {
    // 邮箱校验失败
    emit('validate-error')
  }
}

// 处理注册
const handleRegister = async () => {
  try {
    // 触发表单校验
    await formRef.value.validate()
    
    // 触发提交事件，由父组件处理注册逻辑
    emit('submit', formData)
  } catch (error) {
    // 表单校验失败
    emit('validate-error')
  }
}

// 显示协议
const showAgreement = (type) => {
  emit('show-agreement', type)
}

// 验证错误处理
const onValidateError = () => {
  emit('validate-error')
}

// 暴露重置表单方法给父组件调用
const resetForm = () => {
  formRef.value?.resetFields()
}

defineExpose({
  resetForm
})
</script>