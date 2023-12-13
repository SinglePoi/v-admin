<script setup lang="ts">
import { useAccount } from '@/stores'
import type { NavMenuProps } from '../types'
import IconCommunity from '@/components/icons/iconLogo.vue'
import router from '@/router'
defineOptions({
  name: 'NavMenu'
})

const props = withDefaults(defineProps<NavMenuProps>(), {
  collapse: false
})

const user = useAccount()
const userMenus = computed(() => user.getUserMenus())
const focusMenu = computed(() => user.focusMenu.toString())

const handleMenuItemClick = (item: any) => {
  user.pushMenuFocus(item.id)
  router.push({
    path: item.url ?? '/not-found'
  })
}
</script>

<template>
  <div class="nav-menu">
    <div class="logo">
      <el-icon class="img"><IconCommunity /></el-icon>
      <Transition name="title"> <span v-if="!collapse" class="title">v-admin</span></Transition>
    </div>
    <el-menu
      active-text-color="#fff "
      background-color="#282C34"
      class="el-menu-vertical-demo"
      :default-active="focusMenu"
      text-color="#fff"
      :collapse="collapse"
    >
      <template v-for="item in userMenus" :key="item.id">
        <template v-if="item.type === 1">
          <el-sub-menu :index="`${item.id}`">
            <template #title>
              <el-icon v-if="item.icon"></el-icon>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item :index="`${subitem.id}`" @click="handleMenuItemClick(subitem)">
                <el-icon v-if="item.icon"></el-icon>
                <span>{{ subitem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>

        <template v-if="item.type === 2">
          <el-menu-item :index="`${item.id}`">
            <el-icon v-if="item.icon"></el-icon>
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
.title-enter-from,
.title-leave-to {
  opacity: 0;
}

.title-leave-from,
.title-enter-to {
  opacity: 1;
}

.title-enter-active {
  transition: opacity 0.2s 0.1s linear;
}
.title-leave-active {
  transition: opacity 0.2s linear;
}
</style>
