<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <label class="el-form-item-label">股票ID</label>
        <el-input v-model="query.stockId" clearable placeholder="股票ID" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="600px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="股票ID" prop="stockId">
            <el-input v-model="form.stockId" style="width: 95%;" />
          </el-form-item>
          <el-form-item label="平均价格" prop="priceAvg">
            <el-input v-model="form.priceAvg" style="width: 95%;" />
          </el-form-item>
          <el-form-item label="高位价格" prop="priceHign">
            <el-input v-model="form.priceHign" style="width: 95%;" />
          </el-form-item>
          <el-form-item label="低位价格" prop="priceLow">
            <el-input v-model="form.priceLow" style="width: 95%;" />
          </el-form-item>
          <el-form-item label="高位价格90" prop="priceHign90">
            <el-input v-model="form.priceHign90" style="width: 95%;" />
          </el-form-item>
          <el-form-item label="低位价格90" prop="priceLow90">
            <el-input v-model="form.priceLow90" style="width: 95%;" />
          </el-form-item>
          <el-form-item label="高位价格70" prop="priceHign70">
            <el-input v-model="form.priceHign70" style="width: 95%;" />
          </el-form-item>
          <el-form-item label="低位价格70" prop="priceLow70">
            <el-input v-model="form.priceLow70" style="width: 95%;" />
          </el-form-item>
          <el-form-item label="集中度90" prop="concentration90">
            <el-input v-model="form.concentration90" style="width: 95%;" />
          </el-form-item>
          <el-form-item label="集中度70" prop="concentration70">
            <el-input v-model="form.concentration70" style="width: 95%;" />
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
        <el-table-column prop="stockId" label="股票ID" />
        <el-table-column prop="priceAvg" label="平均价格" />
        <el-table-column prop="priceHign" label="高位价格" />
        <el-table-column prop="priceLow" label="低位价格" />
        <el-table-column prop="priceHign90" label="高位价格90" />
        <el-table-column prop="priceLow90" label="低位价格90" />
        <el-table-column prop="priceHign70" label="高位价格70" />
        <el-table-column prop="priceLow70" label="低位价格70" />
        <el-table-column prop="concentration90" label="集中度90" />
        <el-table-column prop="concentration70" label="集中度70" />
        <el-table-column v-if="checkPer(['admin','stockAnalysis:edit','stockAnalysis:del'])" label="操作" width="150px" align="center">
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
import crudStockAnalysis from '@/api/stockAnalysis'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

const defaultForm = { id: null, stockId: null, priceAvg: null, priceHign: null, priceLow: null, priceHign90: null, priceLow90: null, priceHign70: null, priceLow70: null, concentration90: null, concentration70: null }
export default {
  name: 'StockAnalysis',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: '股票分析', url: 'api/stockAnalysis', idField: 'id', sort: 'id,desc', crudMethod: { ...crudStockAnalysis }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'stockAnalysis:add'],
        edit: ['admin', 'stockAnalysis:edit'],
        del: ['admin', 'stockAnalysis:del']
      },
      rules: {
        id: [
          { required: true, message: 'ID不能为空', trigger: 'blur' }
        ],
        stockId: [
          { required: true, message: '股票ID不能为空', trigger: 'blur' }
        ],
        priceAvg: [
          { required: true, message: '平均价格不能为空', trigger: 'blur' }
        ],
        priceHign: [
          { required: true, message: '高位价格不能为空', trigger: 'blur' }
        ],
        priceLow: [
          { required: true, message: '低位价格不能为空', trigger: 'blur' }
        ],
        priceHign90: [
          { required: true, message: '高位价格90不能为空', trigger: 'blur' }
        ],
        priceLow90: [
          { required: true, message: '低位价格90不能为空', trigger: 'blur' }
        ],
        priceHign70: [
          { required: true, message: '高位价格70不能为空', trigger: 'blur' }
        ],
        priceLow70: [
          { required: true, message: '低位价格70不能为空', trigger: 'blur' }
        ],
        concentration90: [
          { required: true, message: '集中度90不能为空', trigger: 'blur' }
        ],
        concentration70: [
          { required: true, message: '集中度70不能为空', trigger: 'blur' }
        ]
      },
      queryTypeOptions: [
        { key: 'stockId', display_name: '股票ID' }
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
