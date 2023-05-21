<template>
  <div class="demo-login">
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" class="demo-ruleForm">
      <el-form-item prop="username">
        <el-input v-model="ruleForm.username" autocomplete="off" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button  class="btn" type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref, toRefs } from "vue"
import { adminLogin } from '../../request/api'
import { useRouter } from "vue-router"
import { loginData } from '../../type/type'
import type { FormInstance } from 'element-plus'
import { getTime } from './timie'
import { ElNotification } from 'element-plus'
const validatePass = (rule: unknown, value: string | undefined, cb: (value?: string) => void) => {
  if (!value) {
    cb("请输入密码")
  } else {
    cb()
  }
}
const data = reactive(new loginData())
const { ruleForm } = toRefs(data)
let ruleFormRef = ref()
const router = useRouter()
let msg = getTime()
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((value: any) => {
    if (value) {
      adminLogin(data.ruleForm).then((res) => {
        localStorage.setItem('token', res.data.token)
        router.push('/')
        ElNotification({
          title: '登录成功',
          message: `${msg}`,
          type: 'success',
        })
      }).catch(
        (err) => {
          return err
        })
    } else {

      return false
    }
  })
}
const rules = {
  username: ([
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 5, message: '用户名3到5位数', trigger: 'blur' },
  ]),
  password: ([
    { validator: validatePass, trigger: 'blur', required: true },
  ])
}
</script>
<style lang="less" scoped>
.demo-login {
  position:absolute;
  width: 100%;
  height: 100%;
  background: url(/login_bg.jpg);
  background-size: cover;
  background-repeat: no-repeat;
}
.demo-ruleForm {
    position: relative;
    float: right;
    margin-right: 59px;
    margin-top: 200px;
    width: 300px;
    .btn{
      width: 300px;
    }
  }
</style>
