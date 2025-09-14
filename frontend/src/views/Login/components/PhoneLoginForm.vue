<!-- src/views/Auth/components/PhoneLoginForm.vue -->
<template>
  <el-form ref="formRef" :model="formData" :rules="rules" label-width="auto" @validate-error="onValidateError">
    <el-form-item prop="phone">
      <el-input v-model="formData.phone" placeholder="请输入手机号" :prefix-icon="Cellphone" />
    </el-form-item>

    <el-form-item prop="code">
      <el-input v-model="formData.code" style="width: 70%" placeholder="请输入验证码" :prefix-icon="Lock" />
      <el-button type="primary" style="width: 30%" :disabled="countDown > 0" @click="sendCode">{{ countDown > 0 ? `${countDown}秒后重试` : '发送验证码' }}</el-button>
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
      <el-button type="primary" @click="handleLogin" :loading="loginLoading" style="width: 100%">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive, ref} from 'vue'
import { Cellphone, Lock } from '@element-plus/icons-vue'

// 接收父组件传递的props
const props = defineProps({
  // 表单验证规则
  rules: {
    type: Object,
    required: true
  },
  // 倒计时状态（从父组件传入）
  countDown: {
    type: Number,
    default: 0
  },
  // 登录按钮加载状态
  loginLoading: {
    type: Boolean,
    default: false
  }
})

// 定义向父组件传递的事件
const emit = defineEmits([
  // 发送验证码事件
  'send-code',
  // 提交登录事件
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
  phone: '',
  code: '',
  status: false
})

// 发送验证码
const sendCode = async () => {
  try {
    // 先校验手机号
    await formRef.value.validateField('phone')
    
    // 触发发送验证码事件，由父组件处理倒计时逻辑
    emit('send-code', formData.phone)
  } catch (error) {
    // 手机号校验失败
    emit('validate-error')
  }
}

// 处理登录
const handleLogin = async () => {
  try {
    // 触发表单校验
    await formRef.value.validate()
    
    // 触发提交事件，由父组件处理登录逻辑
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