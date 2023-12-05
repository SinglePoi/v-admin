<script setup lang="ts">
import type { SearchFormProps } from './types'
defineOptions({
  name: 'SearchForm'
})
const emit = defineEmits<{
  (e: 'resetBtnClick'): void
  (e: 'queryBtnClick', newFormData: any): void
}>()

const props = withDefaults(defineProps<SearchFormProps>(), {
  searchFormConfig: () => ({})
})

const size = computed(() => props.searchFormConfig.size)

const formItems = props.searchFormConfig?.formItems ?? []
const formOriginData: any = {}
for (const item of formItems) {
  formOriginData[item.field] = ''
}

let formData = reactive(formOriginData)

const handleResetClick = () => {
  formData = formOriginData
  emit('resetBtnClick')
}
const handleQueryClick = () => {
  emit('queryBtnClick', formData)
}
</script>

<template>
  <div class="search-form">
    <CustomSearch v-model="formData" v-bind="searchFormConfig">
      <template #footer>
        <el-button @click="handleResetClick" :size="size?.footer">重置</el-button>
        <el-button type="primary" @click="handleQueryClick" :size="size?.footer">查询</el-button>
      </template>
    </CustomSearch>
  </div>
</template>

<style scoped></style>
