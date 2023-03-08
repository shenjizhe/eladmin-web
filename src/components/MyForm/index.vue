<template>
  <el-form ref="form" :model="datas" size="small" label-width="80px" :rules="rule" :disabled="disabled">
    <el-form-item
      v-for="col in columns"
      :key="col.name"
      :prop="col.name"
      :label="col.title"
      @keypress.enter.native.stop="onKeyPress($event, col.name, datas[col.name])"
    >
      <el-switch v-if="col.type==='switch'" :ref="col.focused" v-model="datas[col.name]" :disabled="col.disabled" />
      <el-input v-if="col.type==='text'" :ref="col.focused?'mark':''" v-model="datas[col.name]" :disabled="col.disabled" />
      <el-input v-if="col.type==='textarea'" :ref="col.focused" v-model="datas[col.name]" type="textarea" :disabled="col.disabled" />
      <el-select v-if="col.type==='select'" :ref="col.focused" v-model="datas[col.name]" filterable placeholder="请选择" :disabled="col.disabled">
        <el-option
          v-for="item in dicts[col.dict]"
          :key="item.id"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script lang="js" src="./_index.js">
</script>
<style lang="scss" scoped>
@import "./_index.scss";
</style>
