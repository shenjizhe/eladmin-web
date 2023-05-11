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
          <el-form-item label="平均价格" prop="priceAvg">
            <el-input v-model="form.priceAvg" style="width: 95%;" />
          </el-form-item>
          <el-form-item label="高位价格" prop="priceHign">
            <el-input v-model="form.priceHign" style="width: 95%;" />
          </el-form-item>
          <el-form-item label="低位价格" prop="priceLow">
            <el-input v-model="form.priceLow" style="width: 95%;" />
          </el-form-item>
          <el-form-item label="评估类型" prop="estimateType">
            <el-select v-model="form.estimateType" filterable placeholder="请选择">
              <el-option
                v-for="item in dict.estimate_type"
                :key="item.id"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="波动周期" prop="fluctuationCycle">
            <el-input v-model="form.fluctuationCycle" style="width: 95%;" />
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
        <el-table-column prop="estimateType" label="评估类型">
          <template slot-scope="scope">
            {{ dict.label.estimate_type[scope.row.estimateType] }}
          </template>
        </el-table-column>
        <el-table-column prop="fluctuationCycle" label="波动周期" />
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

const defaultForm = { id: null, stockId: null, priceAvg: null, priceHign: null, priceLow: null, estimateType: null, fluctuationCycle: null }
export default {
  name: 'StockAnalysis',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  dicts: ['estimate_type'],
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
        estimateType: [
          { required: true, message: '评估类型不能为空', trigger: 'blur' }
        ],
        fluctuationCycle: [
          { required: true, message: '波动周期不能为空', trigger: 'blur' }
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
