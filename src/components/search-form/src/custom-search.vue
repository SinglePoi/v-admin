<script setup lang="ts">
import type { CustomSearchProps } from '../types'

defineOptions({
  name: 'CustomSearch'
})
const props = withDefaults(defineProps<CustomSearchProps>(), {
  modelValue: () => ({}),
  label: () => ({
    width: '60px',
    position: 'left'
  }),
  colLayout: () => ({ xl: 6, lg: 8, md: 12, sm: 24, xs: 24 }),
  itemStyle: () => ({}),
  formItems: () => [],
  size: () => ({ header: 'default', content: 'default', footer: 'default' })
})

const emit = defineEmits<{ (e: 'update:modelValue', newFormData: any): void }>()

const handleValueChange = (value: any, field: string) => {
  emit('update:modelValue', { ...(props.modelValue as Record<any, any>), [field]: value })
}
</script>

<template>
  <div class="custom-search">
    <div class="header"><slot name="header"></slot></div>
    <el-form :label-width="label.width" :size="size.content">
      <el-row :gutter="8">
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item
              v-if="!item.isHidden"
              :label="item.label"
              :rules="item.rules"
              :style="itemStyle"
            >
              <template v-if="item.type === 'input' || item.type === 'password'">
                <el-input
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  :show-password="item.type === 'password'"
                  :model-value="modelValue[`${item.field}`]"
                  @update:model-value="handleValueChange($event, item.field)"
                />
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  style="width: 100%"
                  :model-value="modelValue[`${item.field}`]"
                  @update:model-value="handleValueChange($event, item.field)"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.value"
                  >
                    {{ option.title }}
                  </el-option>
                </el-select>
              </template>
              <template v-if="item.type === 'datepicker'">
                <el-date-picker
                  v-bind="item.otherOptions"
                  :model-value="modelValue[`${item.field}`]"
                  @update:model-value="handleValueChange($event, item.field)"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer"><slot name="footer"></slot></div>
  </div>
</template>

<style scoped>
.footer {
  display: flex;
  justify-content: end;
}
</style>
