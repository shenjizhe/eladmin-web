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
          <el-form-item label="总市值" prop="marketValue">
            <el-input v-model="form.marketValue" style="width: 95%;" />
          </el-form-item>
          <el-form-item label="流通市值" prop="marketValueCircle">
            <el-input v-model="form.marketValueCircle" style="width: 95%;" />
          </el-form-item>
          <el-form-item label="均价" prop="averagePrice">
            <el-input v-model="form.averagePrice" style="width: 95%;" />
          </el-form-item>
          <el-form-item label="动态市盈率" prop="forwardPe">
            <el-input v-model="form.forwardPe" style="width: 95%;" />
          </el-form-item>
          <el-form-item label="静态市盈率" prop="staticPe">
            <el-input v-model="form.staticPe" style="width: 95%;" />
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
        <el-table-column prop="marketValue" label="总市值" />
        <el-table-column prop="marketValueCircle" label="流通市值" />
        <el-table-column prop="averagePrice" label="均价" />
        <el-table-column prop="forwardPe" label="动态市盈率" />
        <el-table-column prop="staticPe" label="静态市盈率" />
        <el-table-column v-if="checkPer(['admin','stockData:edit','stockData:del'])" label="操作" width="150px" align="center">
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
import crudStockData from '@/api/stockData'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

const defaultForm = { id: null, stockId: null, marketValue: null, marketValueCircle: null, averagePrice: null, forwardPe: null, staticPe: null }
export default {
  name: 'StockData',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: '股票数据', url: 'api/stockData', idField: 'id', sort: 'id,desc', crudMethod: { ...crudStockData }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'stockData:add'],
        edit: ['admin', 'stockData:edit'],
        del: ['admin', 'stockData:del']
      },
      rules: {
        id: [
          { required: true, message: 'ID不能为空', trigger: 'blur' }
        ],
        stockId: [
          { required: true, message: '股票ID不能为空', trigger: 'blur' }
        ],
        marketValue: [
          { required: true, message: '总市值不能为空', trigger: 'blur' }
        ],
        marketValueCircle: [
          { required: true, message: '流通市值不能为空', trigger: 'blur' }
        ],
        averagePrice: [
          { required: true, message: '均价不能为空', trigger: 'blur' }
        ],
        forwardPe: [
          { required: true, message: '动态市盈率不能为空', trigger: 'blur' }
        ],
        staticPe: [
          { required: true, message: '静态市盈率不能为空', trigger: 'blur' }
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
