<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <label class="el-form-item-label">系数腱</label>
        <el-input v-model="query.key" clearable placeholder="系数腱" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="600px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="系数腱" prop="key">
            <el-input v-model="form.key" style="width: 95%;" />
          </el-form-item>
          <el-form-item label="系数值" prop="value">
            <el-input v-model="form.value" style="width: 95%;" />
          </el-form-item>
          <el-form-item label="系数类型" prop="type">
            <el-select v-model="form.type" filterable placeholder="请选择">
              <el-option
                v-for="item in dict.data_type"
                :key="item.id"
                :label="item.label"
                :value="item.value*1"
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
        <el-table-column prop="id" label="ID" />
        <el-table-column prop="key" label="系数腱" />
        <el-table-column prop="value" label="系数值" />
        <el-table-column prop="type" label="系数类型">
          <template slot-scope="scope">
            {{ dict.label.data_type[scope.row.type] }}
          </template>
        </el-table-column>
        <el-table-column v-if="checkPer(['admin','systemFactor:edit','systemFactor:del'])" label="操作" width="150px" align="center">
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
import crudSystemFactor from '@/api/systemFactor'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

const defaultForm = { id: null, key: null, value: null, type: null }
export default {
  name: 'SystemFactor',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  dicts: ['data_type'],
  cruds() {
    return CRUD({ title: '系统系数', url: 'api/systemFactor', idField: 'id', sort: 'id,desc', crudMethod: { ...crudSystemFactor }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'systemFactor:add'],
        edit: ['admin', 'systemFactor:edit'],
        del: ['admin', 'systemFactor:del']
      },
      rules: {
        id: [
          { required: true, message: 'ID不能为空', trigger: 'blur' }
        ],
        key: [
          { required: true, message: '系数腱不能为空', trigger: 'blur' }
        ],
        value: [
          { required: true, message: '系数值不能为空', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '系数类型不能为空', trigger: 'blur' }
        ]
      },
      queryTypeOptions: [
        { key: 'key', display_name: '系数腱' }
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
