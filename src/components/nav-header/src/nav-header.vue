<script setup lang="ts">
import userInfo from './user-info.vue'
import epExpand from '@/components/icons/ep-expand.vue'
import epFold from '@/components/icons/ep-fold.vue'
import { useAccount } from '@/stores'
import { pathMapBreadcrumbs } from '@/utils/map-menus'
import { useRoute } from 'vue-router'
defineOptions({
  name: 'NavHeader'
})

const isFold = ref(false)
const emit = defineEmits(['foldChange'])
const handleFoldClick = () => {
  isFold.value = !isFold.value
  emit('foldChange', isFold.value)
}
const route = useRoute()
const breadcrumbs = computed(() => {
  const userMenus = useAccount().getUserMenus()
  const currentPath = route.path
  return pathMapBreadcrumbs(userMenus, currentPath)
})
defineExpose({ isFold, handleFoldClick })
</script>

<template>
  <div class="nav-header">
    <el-icon class="fold-menu" @click="handleFoldClick">
      <component :is="isFold ? epExpand : epFold"></component>
    </el-icon>
    <div class="content">
      <Breadcrumb :breadcrumbs="breadcrumbs" class="breadcrumb" />
      <userInfo />
    </div>
  </div>
</template>

<style scoped>
.nav-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  flex: 1;
  gap: 10px;
}
.content {
  display: flex;
  justify-content: space-between;
  align-self: center;
  flex: 1;
}
.breadcrumb {
  display: flex;
  align-self: center;
}
</style>
