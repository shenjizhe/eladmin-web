<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="600px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="股票ID" prop="stockId">
            <el-input v-model="form.stockId" style="width: 95%;" />
          </el-form-item>
          <el-form-item label="日期" prop="date">
            <el-date-picker v-model="form.date" type="datetime" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="开盘股价" prop="eventPriceOpen">
            <el-input v-model="form.eventPriceOpen" style="width: 95%;" />
          </el-form-item>
          <el-form-item label="收盘股价" prop="eventPriceClose">
            <el-input v-model="form.eventPriceClose" style="width: 95%;" />
          </el-form-item>
          <el-form-item label="最高股价" prop="eventPriceHigh">
            <el-input v-model="form.eventPriceHigh" style="width: 95%;" />
          </el-form-item>
          <el-form-item label="最低股价" prop="eventPriceLow">
            <el-input v-model="form.eventPriceLow" style="width: 95%;" />
          </el-form-item>
          <el-form-item label="交易量" prop="tradeStockCount">
            Number类型对应的数据库类型只能是整数类型 ,不能是 BigDecimal
          </el-form-item>
          <el-form-item label="交易额" prop="tradeStockVolume">
            <el-input v-model="form.tradeStockVolume" style="width: 95%;" />
          </el-form-item>
          <el-form-item label="换手率" prop="turnoverRate">
            <el-input v-model="form.turnoverRate" style="width: 95%;" />
          </el-form-item>
          <el-form-item label="涨跌率" prop="changeRate">
            <el-input v-model="form.changeRate" style="width: 95%;" />
          </el-form-item>
          <el-form-item label="涨跌值" prop="changeValue">
            <el-input v-model="form.changeValue" style="width: 95%;" />
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
        <el-table-column prop="date" label="日期" />
        <el-table-column prop="eventPriceOpen" label="开盘股价" />
        <el-table-column prop="eventPriceClose" label="收盘股价" />
        <el-table-column prop="eventPriceHigh" label="最高股价" />
        <el-table-column prop="eventPriceLow" label="最低股价" />
        <el-table-column prop="tradeStockCount" label="交易量" />
        <el-table-column prop="tradeStockVolume" label="交易额" />
        <el-table-column prop="turnoverRate" label="换手率" />
        <el-table-column prop="changeRate" label="涨跌率" />
        <el-table-column prop="changeValue" label="涨跌值" />
        <el-table-column v-if="checkPer(['admin','stockDataDay:edit','stockDataDay:del'])" label="操作" width="150px" align="center">
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
import crudStockDataDay from '@/api/stockDataDay'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

const defaultForm = { id: null, stockId: null, date: null, eventPriceOpen: null, eventPriceClose: null, eventPriceHigh: null, eventPriceLow: null, tradeStockCount: null, tradeStockVolume: null, turnoverRate: null, changeRate: null, changeValue: null }
export default {
  name: 'StockDataDay',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: '股票日数据', url: 'api/stockDataDay', idField: 'id', sort: 'id,desc', crudMethod: { ...crudStockDataDay }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'stockDataDay:add'],
        edit: ['admin', 'stockDataDay:edit'],
        del: ['admin', 'stockDataDay:del']
      },
      rules: {
        id: [
          { required: true, message: 'ID不能为空', trigger: 'blur' }
        ],
        stockId: [
          { required: true, message: '股票ID不能为空', trigger: 'blur' }
        ],
        date: [
          { required: true, message: '日期不能为空', trigger: 'blur' }
        ],
        eventPriceOpen: [
          { required: true, message: '开盘股价不能为空', trigger: 'blur' }
        ],
        eventPriceClose: [
          { required: true, message: '收盘股价不能为空', trigger: 'blur' }
        ],
        eventPriceHigh: [
          { required: true, message: '最高股价不能为空', trigger: 'blur' }
        ],
        eventPriceLow: [
          { required: true, message: '最低股价不能为空', trigger: 'blur' }
        ],
        tradeStockCount: [
          { required: true, message: '交易量不能为空', trigger: 'blur' }
        ],
        tradeStockVolume: [
          { required: true, message: '交易额不能为空', trigger: 'blur' }
        ],
        turnoverRate: [
          { required: true, message: '换手率不能为空', trigger: 'blur' }
        ],
        changeRate: [
          { required: true, message: '涨跌率不能为空', trigger: 'blur' }
        ],
        changeValue: [
          { required: true, message: '涨跌值不能为空', trigger: 'blur' }
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
