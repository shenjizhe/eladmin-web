<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <label class="el-form-item-label">股票代码</label>
        <el-input v-model="query.code" clearable placeholder="股票代码" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">股票名称</label>
        <el-input v-model="query.name" clearable placeholder="股票名称" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="600px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="股票代码" prop="code">
            <el-input v-model="form.code" style="width: 95%;" />
          </el-form-item>
          <el-form-item label="股票阶段" prop="stage">
            <el-select v-model="form.stage" filterable placeholder="请选择">
              <el-option
                v-for="item in dict.stock_stage"
                :key="item.id"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="股票角色" prop="role">
            <el-select v-model="form.role" filterable placeholder="请选择">
              <el-option
                v-for="item in dict.stock_role"
                :key="item.id"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="大周期" prop="cycleBig">
            <el-input-number v-model="form.cycleBig" />
          </el-form-item>
          <el-form-item label="小周期" prop="cycleSmall">
            <el-input-number v-model="form.cycleSmall" />
          </el-form-item>
          <el-form-item label="股票行业" prop="industry">
            <el-select v-model="form.industry" filterable placeholder="请选择">
              <el-option
                v-for="item in dict.stock_industry"
                :key="item.id"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="上市日期" prop="listDate">
            <el-date-picker v-model="form.listDate" type="datetime" style="width: 370px;" />
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
        <el-table-column prop="id" label="股票ID" />
        <el-table-column prop="code" label="股票代码" />
        <el-table-column prop="name" label="股票名称" />
        <el-table-column prop="stage" label="股票阶段">
          <template slot-scope="scope">
            {{ dict.label.stock_stage[scope.row.stage] }}
          </template>
        </el-table-column>
        <el-table-column prop="role" label="股票角色">
          <template slot-scope="scope">
            {{ dict.label.stock_role[scope.row.role] }}
          </template>
        </el-table-column>
        <el-table-column prop="cycleBig" label="大周期" />
        <el-table-column prop="cycleSmall" label="小周期" />
        <el-table-column prop="industry" label="股票行业">
          <template slot-scope="scope">
            {{ dict.label.stock_industry[scope.row.industry] }}
          </template>
        </el-table-column>
        <el-table-column prop="listDate" label="上市日期" />
        <el-table-column v-if="checkPer(['admin','stock:edit','stock:del'])" label="操作" width="150px" align="center">
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
import crudStock from '@/api/stock'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

const defaultForm = { id: null, code: null, name: null, stage: null, role: null, cycleBig: null, cycleSmall: null, industry: null, listDate: null }
export default {
  name: 'Stock',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  dicts: ['stock_stage', 'stock_role', 'stock_industry'],
  cruds() {
    return CRUD({ title: '股票信息', url: 'api/stock', idField: 'id', sort: 'id,desc', crudMethod: { ...crudStock }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'stock:add'],
        edit: ['admin', 'stock:edit'],
        del: ['admin', 'stock:del']
      },
      rules: {
        id: [
          { required: true, message: '股票ID不能为空', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '股票代码不能为空', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '股票名称不能为空', trigger: 'blur' }
        ],
        stage: [
          { required: true, message: '股票阶段不能为空', trigger: 'blur' }
        ],
        role: [
          { required: true, message: '股票角色不能为空', trigger: 'blur' }
        ],
        cycleBig: [
          { required: true, message: '大周期不能为空', trigger: 'blur' }
        ],
        cycleSmall: [
          { required: true, message: '小周期不能为空', trigger: 'blur' }
        ],
        industry: [
          { required: true, message: '股票行业不能为空', trigger: 'blur' }
        ],
        listDate: [
          { required: true, message: '上市日期不能为空', trigger: 'blur' }
        ]
      },
      queryTypeOptions: [
        { key: 'code', display_name: '股票代码' },
        { key: 'name', display_name: '股票名称' }
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
