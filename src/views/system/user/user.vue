<script setup lang="ts">
defineOptions({
  name: 'SysUser'
})
import { searchFormConfig } from './search.config'
</script>

<template>
  <div class="user">
    <SearchForm :searchFormConfig="searchFormConfig"></SearchForm>
  </div>
</template>

<style scoped></style>
