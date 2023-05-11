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
          <el-form-item label="事件类型" prop="eventType">
            <el-select v-model="form.eventType" filterable placeholder="请选择">
              <el-option
                v-for="item in dict.stock_event_type"
                :key="item.id"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="事件性质" prop="eventNature">
            <el-select v-model="form.eventNature" filterable placeholder="请选择">
              <el-option
                v-for="item in dict.stock_event_nature"
                :key="item.id"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="重要程度" prop="eventLevel">
            <el-select v-model="form.eventLevel" filterable placeholder="请选择">
              <el-option
                v-for="item in dict.stock_event_level"
                :key="item.id"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="相关网址">
            <el-input v-model="form.eventUrl" style="width: 95%;" />
          </el-form-item>
          <el-form-item label="事件消息" prop="eventMessage">
            <el-input v-model="form.eventMessage" :rows="3" type="textarea" style="width: 95%;;" />
          </el-form-item>
          <el-form-item label="开始日期" prop="eventStartDate">
            <el-date-picker v-model="form.eventStartDate" type="datetime" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="结束日期" prop="eventEndDate">
            <el-date-picker v-model="form.eventEndDate" type="datetime" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="事件大类" prop="eventClass">
            <el-select v-model="form.eventClass" filterable placeholder="请选择">
              <el-option
                v-for="item in dict.stock_event_class"
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
        <el-table-column prop="id" label="ID" />
        <el-table-column prop="stockId" label="股票ID" />
        <el-table-column prop="eventType" label="事件类型">
          <template slot-scope="scope">
            {{ dict.label.stock_event_type[scope.row.eventType] }}
          </template>
        </el-table-column>
        <el-table-column prop="eventNature" label="事件性质">
          <template slot-scope="scope">
            {{ dict.label.stock_event_nature[scope.row.eventNature] }}
          </template>
        </el-table-column>
        <el-table-column prop="eventLevel" label="重要程度">
          <template slot-scope="scope">
            {{ dict.label.stock_event_level[scope.row.eventLevel] }}
          </template>
        </el-table-column>
        <el-table-column prop="eventUrl" label="相关网址" />
        <el-table-column prop="eventMessage" label="事件消息" />
        <el-table-column prop="eventStartDate" label="开始日期" />
        <el-table-column prop="eventEndDate" label="结束日期" />
        <el-table-column prop="eventClass" label="事件大类">
          <template slot-scope="scope">
            {{ dict.label.stock_event_class[scope.row.eventClass] }}
          </template>
        </el-table-column>
        <el-table-column v-if="checkPer(['admin','stockEvent:edit','stockEvent:del'])" label="操作" width="150px" align="center">
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
import crudStockEvent from '@/api/stockEvent'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

const defaultForm = { id: null, stockId: null, eventType: null, eventNature: null, eventLevel: null, eventUrl: null, eventMessage: null, eventStartDate: null, eventEndDate: null, eventClass: null }
export default {
  name: 'StockEvent',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  dicts: ['stock_event_type', 'stock_event_nature', 'stock_event_level', 'stock_event_class'],
  cruds() {
    return CRUD({ title: '股票事件', url: 'api/stockEvent', idField: 'id', sort: 'id,desc', crudMethod: { ...crudStockEvent }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'stockEvent:add'],
        edit: ['admin', 'stockEvent:edit'],
        del: ['admin', 'stockEvent:del']
      },
      rules: {
        id: [
          { required: true, message: 'ID不能为空', trigger: 'blur' }
        ],
        stockId: [
          { required: true, message: '股票ID不能为空', trigger: 'blur' }
        ],
        eventType: [
          { required: true, message: '事件类型不能为空', trigger: 'blur' }
        ],
        eventNature: [
          { required: true, message: '事件性质不能为空', trigger: 'blur' }
        ],
        eventLevel: [
          { required: true, message: '重要程度不能为空', trigger: 'blur' }
        ],
        eventMessage: [
          { required: true, message: '事件消息不能为空', trigger: 'blur' }
        ],
        eventStartDate: [
          { required: true, message: '开始日期不能为空', trigger: 'blur' }
        ],
        eventEndDate: [
          { required: true, message: '结束日期不能为空', trigger: 'blur' }
        ],
        eventClass: [
          { required: true, message: '事件大类不能为空', trigger: 'blur' }
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
