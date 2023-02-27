<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="领域id">
            <el-input v-model="form.domainId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="名称" prop="name">
            <el-input v-model="form.name" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="标题" prop="title">
            <el-input v-model="form.title" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="描述" prop="comment">
            <el-input v-model="form.comment" :rows="3" type="textarea" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="是否显示" prop="show">
            <el-switch v-model="form.show" />
          </el-form-item>
          <el-form-item label="组id">
            <el-input v-model="form.groupId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="实体类型" prop="type">
            <el-select v-model="form.type" filterable placeholder="请选择">
              <el-option
                v-for="item in dict.entity_types"
                :key="item.id"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
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
        <el-table-column prop="domainId" label="领域id" />
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="title" label="标题" />
        <el-table-column prop="comment" label="描述" />
        <el-table-column prop="show" label="是否显示" />
        <el-table-column prop="groupId" label="组id" />
        <el-table-column prop="type" label="实体类型">
          <template slot-scope="scope">
            {{ dict.label.entity_types[scope.row.type] }}
          </template>
        </el-table-column>
        <el-table-column v-if="checkPer(['admin','entityModel:edit','entityModel:del'])" label="操作" width="150px" align="center">
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
import crudEntityModel from '@/api/entityModel'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

const defaultForm = { id: null, domainId: null, name: null, title: null, comment: null, show: null, groupId: null, type: null }
export default {
  name: 'EntityModel',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  dicts: ['entity_types'],
  cruds() {
    return CRUD({ title: '实体', url: 'api/entityModel', idField: 'id', sort: 'id,desc', crudMethod: { ...crudEntityModel }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'entityModel:add'],
        edit: ['admin', 'entityModel:edit'],
        del: ['admin', 'entityModel:del']
      },
      rules: {
        name: [
          { required: true, message: '名称不能为空', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '标题不能为空', trigger: 'blur' }
        ],
        comment: [
          { required: true, message: '描述不能为空', trigger: 'blur' }
        ],
        show: [
          { required: true, message: '是否显示不能为空', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '实体类型不能为空', trigger: 'blur' }
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
