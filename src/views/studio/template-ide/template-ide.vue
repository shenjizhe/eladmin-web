<template>
  <el-container class="blackStyle">
    <el-aside />
    <el-main>
      <el-tabs v-model="active.tabs" type="border-card">
        <el-tab-pane label="代码示例" name="first">
          <div class="template-ide">
            <textarea ref="textarea" v-model="value" />
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-main>
    <el-aside />
  </el-container>
</template>

<script lang="js" src="./_template-ide.js">
</script>

<style scoped>
@import "./_template-ide.less";
</style>

