<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <date-range-picker
          v-model="query.tradeTime"
          start-placeholder="tradeTimeStart"
          end-placeholder="tradeTimeStart"
          class="date-item"
        />
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
          <el-form-item label="交易类型" prop="tradeType">
            <el-select v-model="form.tradeType" filterable placeholder="请选择">
              <el-option
                v-for="item in dict.trade_type"
                :key="item.id"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="交易价格" prop="tradePrice">
            <el-input v-model="form.tradePrice" style="width: 95%;" />
          </el-form-item>
          <el-form-item label="交易股票数量" prop="tradeCount">
            <el-input v-model="form.tradeCount" style="width: 95%;" />
          </el-form-item>
          <el-form-item label="交易时间" prop="tradeTime">
            <el-date-picker v-model="form.tradeTime" type="datetime" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="用户id" prop="userId">
            <el-input v-model="form.userId" style="width: 95%;" />
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
        <el-table-column prop="id" label="订单ID" />
        <el-table-column prop="stockId" label="股票ID" />
        <el-table-column prop="tradeType" label="交易类型">
          <template slot-scope="scope">
            {{ dict.label.trade_type[scope.row.tradeType] }}
          </template>
        </el-table-column>
        <el-table-column prop="tradePrice" label="交易价格" />
        <el-table-column prop="tradeCount" label="交易股票数量" />
        <el-table-column prop="tradeTime" label="交易时间" />
        <el-table-column prop="userId" label="用户id" />
        <el-table-column v-if="checkPer(['admin','stockOrder:edit','stockOrder:del'])" label="操作" width="150px" align="center">
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
import crudStockOrder from '@/api/stockOrder'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

const defaultForm = { id: null, stockId: null, tradeType: null, tradePrice: null, tradeCount: null, tradeTime: null, userId: null }
export default {
  name: 'StockOrder',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  dicts: ['trade_type'],
  cruds() {
    return CRUD({ title: '股票交易', url: 'api/stockOrder', idField: 'id', sort: 'id,desc', crudMethod: { ...crudStockOrder }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'stockOrder:add'],
        edit: ['admin', 'stockOrder:edit'],
        del: ['admin', 'stockOrder:del']
      },
      rules: {
        id: [
          { required: true, message: '订单ID不能为空', trigger: 'blur' }
        ],
        stockId: [
          { required: true, message: '股票ID不能为空', trigger: 'blur' }
        ],
        tradeType: [
          { required: true, message: '交易类型不能为空', trigger: 'blur' }
        ],
        tradePrice: [
          { required: true, message: '交易价格不能为空', trigger: 'blur' }
        ],
        tradeCount: [
          { required: true, message: '交易股票数量不能为空', trigger: 'blur' }
        ],
        tradeTime: [
          { required: true, message: '交易时间不能为空', trigger: 'blur' }
        ],
        userId: [
          { required: true, message: '用户id不能为空', trigger: 'blur' }
        ]
      },
      queryTypeOptions: [
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
