<template>
  <div :class="['EREntity', type]" :style="{width:width?width:'100px',height:height?height:'100px'}">
    <div>{{ title }}</div>
    <el-divider />
    <div>{{ comment }}</div>
  </div>
</template>

<script lang="js" src="./_index.js">
</script>
<style scoped lang="scss">
@import './_index.scss';
</style>
