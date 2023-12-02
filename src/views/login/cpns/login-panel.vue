<script setup lang="ts">
import type { ElCheckbox } from 'element-plus'
import Login from './login.vue'
import { localCache } from '@/hooks/use-cache'

defineOptions({
  name: 'login-panel'
})

let isKeepPassword = ref(true)
const loginRef = ref<InstanceType<typeof Login>>()
let currentTab = ref('login')

const handleLoginClick = () => {
  if (currentTab.value === 'login') {
    loginRef.value?.loginAction(isKeepPassword.value)
  }
}

onMounted(() => {
  const account = localCache.getCache('account')
  const password = localCache.getCache('password')
  loginRef.value?.setFormFields(account, password)
})
</script>

<template>
  <div class="login-panel">
    <h1 class="title">vite shop</h1>
    <el-tabs type="border-card" stretch v-model="currentTab">
      <el-tab-pane name="login">
        <template #label>
          <span class="custom-tabs-label">
            <icon-ep-user-filled />
            <span>Route</span>
          </span>
        </template>
        <Login ref="loginRef" />
      </el-tab-pane>
      <el-tab-pane name="signin">
        <template #label>
          <span class="custom-tabs-label">
            <icon-ep-iphone />
            <span>注册</span>
          </span>
        </template>
        sign in
      </el-tab-pane>
    </el-tabs>

    <div class="account-control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link :underline="false">忘记密码</el-link>
    </div>

    <el-button class="login_btn" @click="handleLoginClick">登录</el-button>
  </div>
</template>

<style scoped>
.login-panel {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 1rem;
}
.title {
  text-align: center;
}
.account-control {
  display: flex;
  justify-content: space-between;
}
.custom-tabs-label {
  display: inline-flex;
  align-items: center;
  gap: calc(1rem / 10 + 5px);
}
.login_btn {
  width: 100%;
}
</style>
