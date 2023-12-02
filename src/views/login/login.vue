<script setup lang="ts">
import LoginPanel from './cpns/login-panel.vue'
defineOptions({
  name: 'user-login'
})
</script>

<template>
  <div class="login">
    <LoginPanel />
  </div>
</template>

<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
