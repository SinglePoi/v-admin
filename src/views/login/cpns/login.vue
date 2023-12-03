<script setup lang="ts">
import { loginRulesMap } from '../rules/login'
import type { FormInstance } from 'element-plus'
import { useAccount } from '@/stores/account'
import { useLocalCache } from '@/hooks/use-cache'
import type { LoginParams } from './types'
import type { DataType } from '@/service/request/types'
import type { LoginResponseDate } from '@/service/login/types'

defineOptions({
  name: 'login'
})

const loginRef = ref<FormInstance>()

const loginForm = reactive<LoginParams>({
  account: '',
  password: ''
})

const customer = useAccount()
const localCache = useLocalCache()

const loginAction = async (isKeepPassword: Boolean) => {
  if (!loginRef.value) return
  await loginRef.value.validate((valid, fields) => {
    if (valid) {
      if (isKeepPassword) {
        localCache.setCache('account', loginForm.account)
        localCache.setCache('password', loginForm.password)
      } else {
        localCache.deleteCache('account')
        localCache.deleteCache('password')
      }

      customer
        .login({ ...loginForm, name: 'coderwhy' })
        .then((res: DataType<LoginResponseDate>) => {
          console.log(res)
        })
    } else {
      console.log('error submit!', fields)
    }
  })
}

const setFormFields = (account: string, password: string) => {
  loginForm.account = account
  loginForm.password = password
}

defineExpose({ loginAction, setFormFields })
</script>

<template>
  <div class="login-form">
    <el-form
      :model="loginForm"
      ref="loginRef"
      label-width="3rem"
      :rules="loginRulesMap"
      :hide-required-asterisk="true"
    >
      <el-form-item label="账号" prop="account">
        <el-input v-model="loginForm.account" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginForm.password" />
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped></style>
