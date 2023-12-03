<script setup lang="ts">
import { useAccount } from '@/stores'
import type { NavMenuProps } from '../types'
import IconCommunity from '@/components/icons/IconLogo.vue'
defineOptions({
  name: 'NavMenu'
})

const props = withDefaults(defineProps<NavMenuProps>(), {
  collapse: false
})

const user = useAccount()
const userMenus = computed(() => user.getUserMenus())

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<template>
  <div class="nav-menu">
    <div class="logo">
      <el-icon class="img"><IconCommunity /></el-icon>
      <span v-if="!collapse" class="title">v-admin</span>
    </div>
    <el-menu
      active-text-color="#fff "
      background-color="#282C34"
      class="el-menu-vertical-demo"
      default-active="2"
      text-color="#fff"
      :collapse="collapse"
      @open="handleOpen"
      @close="handleClose"
    >
      <template v-for="item in userMenus" :key="item.id">
        <templdate v-if="item.type === 1">
          <el-sub-menu :index="`${item.id}`">
            <template #title>
              <el-icon v-if="item.icon"><location /></el-icon>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item :index="`${subitem.id}`">
                <el-icon v-if="item.icon"><icon-menu /></el-icon>
                <span>{{ subitem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </templdate>

        <template v-if="item.type === 2">
          <el-menu-item :index="`${item.id}`">
            <el-icon v-if="item.icon"><icon-menu /></el-icon>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<style scoped>
.nav-menu {
  height: 100%;
  background-color: #282c34;
}
.logo {
  display: flex;
  height: 48px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}
.title {
  font-weight: 600;
  color: white;
}
.el-menu {
  border-right: none;
}

.el-su-bmenu {
  background-color: #001529 !important;
}
.el-sub-menu .el-menu-item {
  padding-left: 50px !important;
  background-color: #333435 !important;
}

/* ::v-deep .el-sub-menu__title {
  background-color: #001529 !important;
} */

.el-menu-item:hover {
  color: #fff !important;
}

.el-menu-item.is-active {
  color: #fff !important;
  background-color: #4e88f3 !important;
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
