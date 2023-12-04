import type { breadcrumbKey } from 'element-plus';
<script setup lang="ts">
import type { BreadcrumbProps } from '../types'
defineOptions({
  name: 'NavBreadcrumb'
})

const props = withDefaults(defineProps<BreadcrumbProps>(), {
  breadcrumbs: () => []
})
</script>

<template>
  <div class="nav-breadcrumb">
    <el-breadcrumb separator="/">
      <template v-for="item in breadcrumbs" :key="item.id">
        <el-breadcrumb-item :to="{ path: item.path }">{{ item.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<style scoped></style>
