<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="名称" prop="name">
            <el-input v-model="form.name" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="描述" prop="comment">
            <el-input v-model="form.comment" :rows="3" type="textarea" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="关系实体1" prop="entity1Id">
            <el-input v-model="form.entity1Id" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="关系实体2" prop="entity2Id">
            <el-input v-model="form.entity2Id" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="扩展" prop="extra">
            <el-input v-model="form.extra" :rows="3" type="textarea" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="关系类型" prop="type">
            <el-input-number v-model="form.type" />
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
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="comment" label="描述" />
        <el-table-column prop="entity1Id" label="关系实体1" />
        <el-table-column prop="entity2Id" label="关系实体2" />
        <el-table-column prop="extra" label="扩展" />
        <el-table-column prop="type" label="关系类型" />
        <el-table-column v-if="checkPer(['admin','marketEntityRelation:edit','marketEntityRelation:del'])" label="操作" width="150px" align="center">
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
import crudMarketEntityRelation from '@/api/marketEntityRelation'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

const defaultForm = { id: null, name: null, comment: null, entity1Id: null, entity2Id: null, extra: null, type: null }
export default {
  name: 'MarketEntityRelation',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: '市场实体关系', url: 'api/marketEntityRelation', idField: 'id', sort: 'id,desc', crudMethod: { ...crudMarketEntityRelation }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'marketEntityRelation:add'],
        edit: ['admin', 'marketEntityRelation:edit'],
        del: ['admin', 'marketEntityRelation:del']
      },
      rules: {
        name: [
          { required: true, message: '名称不能为空', trigger: 'blur' }
        ],
        comment: [
          { required: true, message: '描述不能为空', trigger: 'blur' }
        ],
        entity1Id: [
          { required: true, message: '关系实体1不能为空', trigger: 'blur' }
        ],
        entity2Id: [
          { required: true, message: '关系实体2不能为空', trigger: 'blur' }
        ],
        extra: [
          { required: true, message: '扩展不能为空', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '关系类型不能为空', trigger: 'blur' }
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
