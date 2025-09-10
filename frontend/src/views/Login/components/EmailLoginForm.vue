<!-- src/views/Auth/components/EmailLoginForm.vue -->
<template>
  <el-form ref="formRef" :model="formData" :rules="rules" label-width="auto" @validate-error="onValidateError">
    <el-form-item prop="username">
      <el-input v-model="formData.username" placeholder="请输入邮箱或用户名" :prefix-icon="User" />
    </el-form-item>

    <el-form-item prop="password">
      <el-input v-model="formData.password" type="password" placeholder="请输入密码" :prefix-icon="Lock" />
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
import { reactive, ref, defineExpose } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'

// 接收父组件传递的props
const props = defineProps({
  // 表单验证规则
  rules: {
    type: Object,
    required: true
  },
  // 登录按钮加载状态
  loginLoading: {
    type: Boolean,
    default: false
  }
})

// 定义向父组件传递的事件
const emit = defineEmits([
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
  username: '',
  password: '',
  status: false
})

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