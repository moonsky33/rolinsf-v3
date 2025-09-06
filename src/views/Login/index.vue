<template>
    <div class="page">
        <div class="login-box">
            <h1 class="title">若林轻小说</h1>
            <!-- 表单的容器 -->
            <el-form :model="form" label-width="auto" style="max-width: 600px">
                <el-form-item>
                    <!-- 表单元素 -->
                    <el-input v-model="form.phone" placeholder="请输入手机号" :prefix-icon="Cellphone" />
                </el-form-item>

                <el-form-item>
                    <el-input v-model="form.code" style="width: 70%" placeholder="请输入验证码" :prefix-icon="Lock" show-password />
                    <el-button type="primary" style="width: 30%" >发送验证码</el-button>
                </el-form-item>

                <el-form-item>
                    <!-- 许可协议的复选框 -->
                    <el-checkbox label="我已阅读并同意《用户协议》和《隐私条款》" v-model="form.status"></el-checkbox>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="onSubmit" style="width: 100%">登录</el-button>
                </el-form-item>

            </el-form>
        </div>
    </div>
</template>

<script setup>
import { reactive } from 'vue'
// 导入需要的icon图标
import { Cellphone,  Lock, } from '@element-plus/icons-vue'

// do not use same name with ref
const form = reactive({
    phone: '',
    code: '',
    status: false
})

const onSubmit = () => {
    console.log('submit!')
}

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