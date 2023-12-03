<script setup lang="ts">
defineOptions({
  name: 'MainPage'
})
</script>

<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside width="200px"><NavMenu></NavMenu></el-aside>
      <el-container class="page">
        <el-header>Header</el-header>
        <el-main class="page-content">Main</el-main>
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
}

.page-content {
  height: calc(100% - 48px);
}
.el-aside {
  overflow: auto;
  background-color: #d9ecff;
  text-align: left;
  cursor: pointer;
  transition: width 0.3s linear;
}
.el-footer,
.el-header {
  display: flex;
  text-align: center;
  align-items: center;
  background-color: #c6e2ff;
}
.el-header {
  height: 48px !important;
}
.el-main {
  text-align: center;
  background-color: #ecf5ff;
}
</style>
