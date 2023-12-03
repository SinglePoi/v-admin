<script setup lang="ts">
defineOptions({
  name: 'MainPage'
})

const isCollapse = ref(false)
const handleFolgChange = (isFold: boolean) => {
  isCollapse.value = isFold
}
</script>

<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isCollapse ? '60px' : '210px'"><NavMenu :collapse="isCollapse" /></el-aside>
      <el-container class="page">
        <el-header><NavHeader @fold-change="handleFolgChange" /></el-header>
        <el-main class="page-content">
          <div class="page-info">
            <RouterView />
          </div>
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #557;
}
.main-content,
.page {
  height: 100%;
  background-color: #fff;
}

.page-content {
  height: calc(100% - 48px);
}
.el-aside {
  overflow: hidden;
  text-align: left;
  cursor: pointer;
  transition: width 0.3s linear;
}
.el-footer,
.el-header {
  display: flex;
  text-align: center;
}
.el-header {
  border-bottom: 0.05rem #dcdfe6 solid;
}
.el-header {
  height: 48px !important;
}
.el-main {
  text-align: center;
}
</style>
