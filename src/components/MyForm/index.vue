<template>
  <el-form :model="value" size="small" label-width="80px" :rules="rules">
    <el-form-item v-for="col in columns" :key="col.name" :label="col.title">
      <el-switch v-if="col.type=='switch'" v-model="value[col.name]" />
      <el-input v-if="col.type=='text'" v-model="value[col.name]" />
      <el-input v-if="col.type=='textarea'" v-model="value[col.name]" type="textarea" />
    </el-form-item>
  </el-form>
</template>

<script lang="js" src="./_index.js">
</script>
<style lang="scss" scoped>
@import "./_index.scss";
</style>
