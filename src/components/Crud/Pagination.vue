<!--分页-->
<template>
  <div class="crud-opts-left">
    <el-col :span="8">
      <slot name="left" />
    </el-col>
    <el-col :span="8">
      <el-pagination
        :page-size.sync="page.size"
        :total="page.total"
        :current-page.sync="page.page"
        style="margin-top: 8px;"
        layout="total, prev, pager, next, sizes"
        @size-change="crud.sizeChangeHandler($event)"
        @current-change="crud.pageChangeHandler"
      />
    </el-col>
    <el-col :span="8">
      <slot name="right" />
    </el-col>
  </div>
</template>
<script>
import { pagination } from '@crud/crud'
export default {
  mixins: [pagination()]
}
</script>
