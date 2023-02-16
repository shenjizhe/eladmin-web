<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="实体ID" prop="entityId">
            <el-input v-model="form.entityId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="约束名称" prop="name">
            <el-input v-model="form.name" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="描述" prop="comment">
            <el-input v-model="form.comment" :rows="3" type="textarea" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="是否显示" prop="show">
            <el-switch v-model="form.show" />
          </el-form-item>
          <el-form-item label="约束类型" prop="type">
            <el-select v-model="form.type" filterable placeholder="请选择">
              <el-option
                v-for="item in dict.entity_restriction_types"
                :key="item.id"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="约束表达式" prop="expression">
            <el-input v-model="form.expression" :rows="3" type="textarea" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="其他实体ID(如外键)">
            <el-input v-model="form.entityOtherId" style="width: 370px;" />
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
        <el-table-column prop="entityId" label="实体ID" />
        <el-table-column prop="name" label="约束名称" />
        <el-table-column prop="comment" label="描述" />
        <el-table-column prop="show" label="是否显示" />
        <el-table-column prop="type" label="约束类型">
          <template slot-scope="scope">
            {{ dict.label.entity_restriction_types[scope.row.type] }}
          </template>
        </el-table-column>
        <el-table-column prop="expression" label="约束表达式" />
        <el-table-column prop="entityOtherId" label="其他实体ID(如外键)" />
        <el-table-column v-if="checkPer(['admin','entityRestriction:edit','entityRestriction:del'])" label="操作" width="150px" align="center">
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
import crudEntityRestriction from '@/api/entityRestriction'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

const defaultForm = { id: null, entityId: null, name: null, comment: null, show: null, type: null, expression: null, entityOtherId: null }
export default {
  name: 'EntityRestriction',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  dicts: ['entity_restriction_types'],
  cruds() {
    return CRUD({ title: '实体约束', url: 'api/entityRestriction', idField: 'id', sort: 'id,desc', crudMethod: { ...crudEntityRestriction }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'entityRestriction:add'],
        edit: ['admin', 'entityRestriction:edit'],
        del: ['admin', 'entityRestriction:del']
      },
      rules: {
        entityId: [
          { required: true, message: '实体ID不能为空', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '约束名称不能为空', trigger: 'blur' }
        ],
        comment: [
          { required: true, message: '描述不能为空', trigger: 'blur' }
        ],
        show: [
          { required: true, message: '是否显示不能为空', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '约束类型不能为空', trigger: 'blur' }
        ],
        expression: [
          { required: true, message: '约束表达式不能为空', trigger: 'blur' }
        ]
      }}
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
