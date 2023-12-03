<script setup lang="ts">
import userInfo from './user-info.vue'
import epExpand from '@/components/icons/ep-expand.vue'
import epFold from '@/components/icons/ep-fold.vue'
defineOptions({
  name: 'NavHeader'
})

const isFold = ref(false)
const emit = defineEmits(['foldChange'])
const handleFoldClick = () => {
  isFold.value = !isFold.value
  emit('foldChange', isFold.value)
}
defineExpose({ isFold, handleFoldClick })
</script>

<template>
  <div class="nav-header">
    <el-icon class="fold-menu" @click="handleFoldClick">
      <component :is="epFold"></component>
    </el-icon>
    <div class="content">
      <div>面包屑</div>
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
</style>
