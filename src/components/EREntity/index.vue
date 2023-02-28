<template>
  <div :class="['EREntity', type]" :style="{width:width?width+'px':'100px',height:height?height+'px':'100px'}">
    <div class="text">{{ title }}</div>
    <el-divider />
    <div class="text-area">{{ comment }}</div>
  </div>
</template>

<script lang="js" src="./_index.js">
</script>
<style scoped lang="scss">
@import './_index.scss';
</style>
