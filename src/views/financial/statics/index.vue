<template>
  <el-container class="statics-container">
    <el-aside class="left-container">
      <el-card class="box-card">
        <div slot="header">
          <span>卡片名称</span>
          <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
        </div>
        <!--          <div v-for="o in 4" :key="o" class="text item">-->
        <!--            {{'列表内容 ' + o }}-->

      </el-card>
    </el-aside>
    <el-main class="center-container" />
    <el-aside class="right-container" />
  </el-container>
</template>

<script lang="js" src="./_index.js">
</script>

<style lang="scss">
@import "./index";
</style>

