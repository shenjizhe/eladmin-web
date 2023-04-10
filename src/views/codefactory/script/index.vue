<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <label class="el-form-item-label">查找键</label>
        <el-input v-model="query.key" clearable placeholder="查找键" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="800px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="脚本" prop="script">
            <el-input v-model="form.script" :rows="10" type="textarea" style="width: 95%;" />
          </el-form-item>
          <el-form-item label="使用系统" prop="system">
            <el-select v-model="form.system" filterable placeholder="请选择">
              <el-option
                v-for="item in dict.system_type"
                :key="item.id"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="语言" prop="language">
            <el-select v-model="form.language" filterable placeholder="请选择">
              <el-option
                v-for="item in dict.language_type"
                :key="item.id"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="脚本类型">
            <el-input v-model="form.type" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="参数列表">
            <el-input v-model="form.params" :rows="3" type="textarea" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="脚本名称">
            <el-input v-model="form.name" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="脚本描述">
            <el-input v-model="form.comment" :rows="3" type="textarea" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="查找键" prop="key">
            <el-input v-model="form.key" style="width: 370px;" />
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
        <el-table-column prop="system" label="使用系统">
          <template slot-scope="scope">
            {{ dict.label.system_type[scope.row.system] }}
          </template>
        </el-table-column>
        <el-table-column prop="language" label="语言">
          <template slot-scope="scope">
            {{ dict.label.language_type[scope.row.language] }}
          </template>
        </el-table-column>
        <el-table-column prop="type" label="脚本类型" />
        <el-table-column prop="params" label="参数列表" />
        <el-table-column prop="name" label="脚本名称" />
        <el-table-column prop="comment" label="脚本描述" />
        <el-table-column prop="key" label="查找键" />
        <el-table-column v-if="checkPer(['admin','script:edit','script:del'])" label="操作" width="150px" align="center">
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
import crudScript from '@/api/script'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

const defaultForm = { id: null, script: null, system: null, language: null, type: null, params: null, name: null, comment: null, key: null }
export default {
  name: 'Script',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  dicts: ['system_type', 'language_type'],
  cruds() {
    return CRUD({ title: '脚本', url: 'api/script', idField: 'id', sort: 'id,desc', crudMethod: { ...crudScript }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'script:add'],
        edit: ['admin', 'script:edit'],
        del: ['admin', 'script:del']
      },
      rules: {
        id: [
          { required: true, message: 'ID不能为空', trigger: 'blur' }
        ],
        script: [
          { required: true, message: '脚本不能为空', trigger: 'blur' }
        ],
        system: [
          { required: true, message: '使用系统不能为空', trigger: 'blur' }
        ],
        language: [
          { required: true, message: '语言不能为空', trigger: 'blur' }
        ],
        key: [
          { required: true, message: '查找键不能为空', trigger: 'blur' }
        ]
      },
      queryTypeOptions: [
        { key: 'key', display_name: '查找键' }
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
