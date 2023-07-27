<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <label class="el-form-item-label">用户ID</label>
        <el-input v-model="query.userId" clearable placeholder="用户ID" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="600px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="词根ID" prop="morphemeId">
            <el-input v-model="form.morphemeId" style="width: 95%;" />
          </el-form-item>
          <el-form-item label="单词ID" prop="wordId">
            <el-input v-model="form.wordId" style="width: 95%;" />
          </el-form-item>
          <el-form-item label="用户ID" prop="userId">
            <el-input v-model="form.userId" style="width: 95%;" />
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
        <el-table-column prop="id" label="用户状态ID" />
        <el-table-column prop="morphemeId" label="词根ID" />
        <el-table-column prop="wordId" label="单词ID" />
        <el-table-column prop="userId" label="用户ID" />
        <el-table-column v-if="checkPer(['admin','userStatus:edit','userStatus:del'])" label="操作" width="150px" align="center">
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
import crudUserStatus from '@/api/userStatus'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

const defaultForm = { id: null, morphemeId: null, wordId: null, userId: null }
export default {
  name: 'UserStatus',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: '用户状态', url: 'api/userStatus', idField: 'id', sort: 'id,desc', crudMethod: { ...crudUserStatus }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'userStatus:add'],
        edit: ['admin', 'userStatus:edit'],
        del: ['admin', 'userStatus:del']
      },
      rules: {
        id: [
          { required: true, message: '用户状态ID不能为空', trigger: 'blur' }
        ],
        morphemeId: [
          { required: true, message: '词根ID不能为空', trigger: 'blur' }
        ],
        wordId: [
          { required: true, message: '单词ID不能为空', trigger: 'blur' }
        ],
        userId: [
          { required: true, message: '用户ID不能为空', trigger: 'blur' }
        ]
      },
      queryTypeOptions: [
        { key: 'userId', display_name: '用户ID' }
      ]

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
