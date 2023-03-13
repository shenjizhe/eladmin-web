<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <label class="el-form-item-label">主键</label>
        <el-input v-model="query.id" clearable placeholder="主键" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">名称</label>
        <el-input v-model="query.name" clearable placeholder="名称" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">描述</label>
        <el-input v-model="query.comment" clearable placeholder="描述" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">模板ID</label>
        <el-input v-model="query.templateId" clearable placeholder="模板ID" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">级别</label>
        <el-input v-model="query.level" clearable placeholder="级别" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <rrOperation :crud="crud" />
      </div>
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
          <el-form-item label="是否显示" prop="show">
            <el-switch v-model="form.show" />
          </el-form-item>
          <el-form-item label="模板ID" prop="templateId">
            <el-input v-model="form.templateId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="代码" prop="code">
            <el-input v-model="form.code" :rows="3" type="textarea" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="级别" prop="level">
            <el-select v-model="form.level" filterable placeholder="请选择">
              <el-option
                v-for="item in dict.block_level"
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
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="comment" label="描述" />
        <el-table-column prop="show" label="是否显示">
          <template slot-scope="scope">
            {{ dict.label.show_status[scope.row.show] }}
          </template>
        </el-table-column>
        <el-table-column prop="templateId" label="模板ID" />
        <el-table-column prop="level" label="级别">
          <template slot-scope="scope">
            {{ dict.label.block_level[scope.row.level] }}
          </template>
        </el-table-column>
        <el-table-column v-if="checkPer(['admin','templateBlock:edit','templateBlock:del'])" label="操作" width="150px" align="center">
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
import crudTemplateBlock from '@/api/templateBlock'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

const defaultForm = { id: null, name: null, comment: null, show: null, templateId: null, code: null, level: null }
export default {
  name: 'TemplateBlock',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  dicts: ['show_status', 'block_level'],
  cruds() {
    return CRUD({ title: '模板块', url: 'api/templateBlock', idField: 'id', sort: 'id,desc', crudMethod: { ...crudTemplateBlock }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'templateBlock:add'],
        edit: ['admin', 'templateBlock:edit'],
        del: ['admin', 'templateBlock:del']
      },
      rules: {
        id: [
          { required: true, message: '主键不能为空', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '名称不能为空', trigger: 'blur' }
        ],
        comment: [
          { required: true, message: '描述不能为空', trigger: 'blur' }
        ],
        show: [
          { required: true, message: '是否显示不能为空', trigger: 'blur' }
        ],
        templateId: [
          { required: true, message: '模板ID不能为空', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '代码不能为空', trigger: 'blur' }
        ],
        level: [
          { required: true, message: '级别不能为空', trigger: 'blur' }
        ]
      },
      queryTypeOptions: [
        { key: 'id', display_name: '主键' },
        { key: 'name', display_name: '名称' },
        { key: 'comment', display_name: '描述' },
        { key: 'templateId', display_name: '模板ID' },
        { key: 'level', display_name: '级别' }
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
