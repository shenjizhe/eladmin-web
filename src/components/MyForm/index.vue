<template>
  <el-form v-model="value" size="small" label-width="80px">
    <el-form-item v-for="col in columns" :key="col.name" :label="col.title">
      <el-switch v-if="col.type=='switch'" />
      <el-input v-if="col.type=='text'" />
      <el-input v-if="col.type=='textarea'" type="textarea" />
    </el-form-item>
  </el-form>
</template>

<script lang="js" src="./_index.js">
</script>
<style lang="scss" scoped>
@import "./_index.scss";
</style>
