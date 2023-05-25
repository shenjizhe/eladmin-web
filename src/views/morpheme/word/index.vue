<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <label class="el-form-item-label">主键</label>
        <el-input v-model="query.id" clearable placeholder="主键" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="600px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="单词文本" prop="text">
            <el-input v-model="form.text" style="width: 95%;" />
          </el-form-item>
          <el-form-item label="推导过程" prop="deduction">
            <el-input v-model="form.deduction" :rows="3" type="textarea" style="width: 95%;;" />
          </el-form-item>
          <el-form-item label="词性" prop="nature">
            <el-select v-model="form.nature" filterable placeholder="请选择">
              <el-option
                v-for="item in dict.morpheme_nature"
                :key="item.id"
                :label="item.label"
                :value="item.value*1"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="是否是派生词素(0-不是派生词 1-是派生词)">
            <el-switch v-model="form.isDerive" />
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
        <el-table-column prop="text" label="单词文本" />
        <el-table-column prop="deduction" label="推导过程" />
        <el-table-column prop="nature" label="词性">
          <template slot-scope="scope">
            {{ dict.label.morpheme_nature[scope.row.nature] }}
          </template>
        </el-table-column>
        <el-table-column prop="isDerive" label="是否是派生词素(0-不是派生词 1-是派生词)" />
        <el-table-column v-if="checkPer(['admin','word:edit','word:del'])" label="操作" width="150px" align="center">
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
import crudWord from '@/api/word'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

const defaultForm = { id: null, text: null, deduction: null, nature: null, isDerive: null }
export default {
  name: 'Word',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  dicts: ['morpheme_nature'],
  cruds() {
    return CRUD({ title: '单词', url: 'api/word', idField: 'id', sort: 'id,desc', crudMethod: { ...crudWord }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'word:add'],
        edit: ['admin', 'word:edit'],
        del: ['admin', 'word:del']
      },
      rules: {
        id: [
          { required: true, message: '主键不能为空', trigger: 'blur' }
        ],
        text: [
          { required: true, message: '单词文本不能为空', trigger: 'blur' }
        ],
        deduction: [
          { required: true, message: '推导过程不能为空', trigger: 'blur' }
        ],
        nature: [
          { required: true, message: '词性不能为空', trigger: 'blur' }
        ]
      },
      queryTypeOptions: [
        { key: 'id', display_name: '主键' }
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
