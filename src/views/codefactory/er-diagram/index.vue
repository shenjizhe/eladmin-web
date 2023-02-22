<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="领域ID" prop="domainId">
            <el-input v-model="form.domainId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="实体主键" prop="entityId">
            <el-input v-model="form.entityId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="索引" prop="index">
            <el-input-number v-model="form.index" />
          </el-form-item>
          <el-form-item label="位置X" prop="x">
            <el-input-number v-model="form.x" />
          </el-form-item>
          <el-form-item label="位置Y" prop="y">
            <el-input-number v-model="form.y" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="text" @click="crud.cancelCU">取消</el-button>
          <el-button :loading="crud.status.cu === 2" type="primary" @click="crud.submitCU">确认</el-button>
        </div>
      </el-dialog>
      <!--表格渲染-->
      <el-table ref="table" v-loading="crud.loading" :data="crud.data" size="small" style="width: 100%;" @selection-change="crud.selectionChangeHandler">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="id" label="主键" />
        <el-table-column prop="domainId" label="领域ID" />
        <el-table-column prop="entityId" label="实体主键" />
        <el-table-column prop="index" label="索引" />
        <el-table-column prop="x" label="位置X" />
        <el-table-column prop="y" label="位置Y" />
        <el-table-column v-if="checkPer(['admin','erDiagram:edit','erDiagram:del'])" label="操作" width="150px" align="center">
          <template slot-scope="scope">
            <udOperation
              :data="scope.row"
              :permission="permission"
            />
          </template>
        </el-table-column>
      </el-table>
      <!--分页组件-->
      <pagination />
    </div>
  </div>
</template>

<script>
import crudErDiagram from '@/api/erDiagram'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

const defaultForm = { id: null, domainId: null, entityId: null, index: null, x: null, y: null }
export default {
  name: 'ErDiagram',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: 'ER图', url: 'api/erDiagram', idField: 'id', sort: 'id,desc', crudMethod: { ...crudErDiagram }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'erDiagram:add'],
        edit: ['admin', 'erDiagram:edit'],
        del: ['admin', 'erDiagram:del']
      },
      rules: {
        domainId: [
          { required: true, message: '领域ID不能为空', trigger: 'blur' }
        ],
        entityId: [
          { required: true, message: '实体主键不能为空', trigger: 'blur' }
        ],
        index: [
          { required: true, message: '索引不能为空', trigger: 'blur' }
        ],
        x: [
          { required: true, message: '位置X不能为空', trigger: 'blur' }
        ],
        y: [
          { required: true, message: '位置Y不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 钩子：在获取表格数据之前执行，false 则代表不获取数据
    [CRUD.HOOK.beforeRefresh]() {
      return true
    }
  }
}
</script>

<style scoped>

</style>
