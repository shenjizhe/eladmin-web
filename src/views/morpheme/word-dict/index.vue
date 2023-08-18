<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <label class="el-form-item-label">单词</label>
        <el-input v-model="query.text" clearable placeholder="单词" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="600px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="主键" prop="id">
            <el-input v-model="form.id" style="width: 95%;" />
          </el-form-item>
          <el-form-item label="单词" prop="text">
            <el-input v-model="form.text" style="width: 95%;" />
          </el-form-item>
          <el-form-item label="英语的解释" prop="description">
            <el-input v-model="form.description" style="width: 95%;" />
          </el-form-item>
          <el-form-item label="音标" prop="phonetic">
            <el-input v-model="form.phonetic" style="width: 95%;" />
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
        <el-table-column prop="text" label="单词" />
        <el-table-column prop="description" label="英语的解释" />
        <el-table-column prop="phonetic" label="音标" />
        <el-table-column v-if="checkPer(['admin','wordDict:edit','wordDict:del'])" label="操作" width="150px" align="center">
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
import crudWordDict from '@/api/wordDict'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

const defaultForm = { id: null, text: null, description: null, phonetic: null }
export default {
  name: 'WordDict',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: '单词含义词典', url: 'api/wordDict', idField: 'id', sort: 'id,desc', crudMethod: { ...crudWordDict }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'wordDict:add'],
        edit: ['admin', 'wordDict:edit'],
        del: ['admin', 'wordDict:del']
      },
      rules: {
        id: [
          { required: true, message: '主键不能为空', trigger: 'blur' }
        ],
        text: [
          { required: true, message: '单词不能为空', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '英语的解释不能为空', trigger: 'blur' }
        ],
        phonetic: [
          { required: true, message: '音标不能为空', trigger: 'blur' }
        ]
      },
      queryTypeOptions: [
        { key: 'text', display_name: '单词' }
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
