<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <label class="el-form-item-label">主键</label>
        <el-input v-model="query.id" clearable placeholder="主键" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">模板主键</label>
        <el-input v-model="query.templateId" clearable placeholder="模板主键" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">上下文关键字</label>
        <el-input v-model="query.key" clearable placeholder="上下文关键字" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">数据类型</label>
        <el-input v-model="query.type" clearable placeholder="数据类型" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">数据类型</label>
        <el-input v-model="query.dataType" clearable placeholder="数据类型" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="模板主键" prop="templateId">
            <el-input v-model="form.templateId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="上下文关键字" prop="key">
            <el-input v-model="form.key" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="说明" prop="content">
            <el-input v-model="form.content" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="数据类型" prop="type">
            <el-select v-model="form.type" filterable placeholder="请选择">
              <el-option
                v-for="item in dict.content_type"
                :key="item.id"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="数据类型" prop="dataType">
            <el-select v-model="form.dataType" filterable placeholder="请选择">
              <el-option
                v-for="item in dict.db_types"
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
        <el-table-column prop="templateId" label="模板主键" />
        <el-table-column prop="key" label="上下文关键字" />
        <el-table-column prop="content" label="说明" />
        <el-table-column prop="type" label="数据类型">
          <template slot-scope="scope">
            {{ dict.label.content_type[scope.row.type] }}
          </template>
        </el-table-column>
        <el-table-column prop="dataType" label="数据类型">
          <template slot-scope="scope">
            {{ dict.label.db_types[scope.row.dataType] }}
          </template>
        </el-table-column>
        <el-table-column v-if="checkPer(['admin','templateContext:edit','templateContext:del'])" label="操作" width="150px" align="center">
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
import crudTemplateContext from '@/api/templateContext'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

const defaultForm = { id: null, templateId: null, key: null, content: null, type: null, dataType: null }
export default {
  name: 'TemplateContext',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  dicts: ['content_type', 'db_types'],
  cruds() {
    return CRUD({ title: '上下文', url: 'api/templateContext', idField: 'id', sort: 'id,desc', crudMethod: { ...crudTemplateContext }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'templateContext:add'],
        edit: ['admin', 'templateContext:edit'],
        del: ['admin', 'templateContext:del']
      },
      rules: {
        id: [
          { required: true, message: '主键不能为空', trigger: 'blur' }
        ],
        templateId: [
          { required: true, message: '模板主键不能为空', trigger: 'blur' }
        ],
        key: [
          { required: true, message: '上下文关键字不能为空', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '说明不能为空', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '数据类型不能为空', trigger: 'blur' }
        ],
        dataType: [
          { required: true, message: '数据类型不能为空', trigger: 'blur' }
        ]
      },
      queryTypeOptions: [
        { key: 'id', display_name: '主键' },
        { key: 'templateId', display_name: '模板主键' },
        { key: 'key', display_name: '上下文关键字' },
        { key: 'type', display_name: '数据类型' },
        { key: 'dataType', display_name: '数据类型' }
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
