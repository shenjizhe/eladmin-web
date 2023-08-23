<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <date-range-picker
          v-model="query.date"
          start-placeholder="dateStart"
          end-placeholder="dateStart"
          class="date-item"
        />
        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="600px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="主键">
            <el-input v-model="form.id" style="width: 95%;" />
          </el-form-item>
          <el-form-item label="用户id" prop="uid">
            <el-input v-model="form.uid" style="width: 95%;" />
          </el-form-item>
          <el-form-item label="日期" prop="date">
            <el-date-picker v-model="form.date" type="datetime" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="学习内容类型（0 - 词根 1- 单词）" prop="objectType">
            <el-input v-model="form.objectType" style="width: 95%;" />
          </el-form-item>
          <el-form-item label="学习内容id" prop="objectId">
            <el-input v-model="form.objectId" style="width: 95%;" />
          </el-form-item>
          <el-form-item label="类型（0-初次看，1-再次看）" prop="type">
            <el-input v-model="form.type" style="width: 95%;" />
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
        <el-table-column prop="uid" label="用户id" />
        <el-table-column prop="date" label="日期" />
        <el-table-column prop="objectType" label="学习内容类型（0 - 词根 1- 单词）" />
        <el-table-column prop="objectId" label="学习内容id" />
        <el-table-column prop="type" label="类型（0-初次看，1-再次看）" />
        <el-table-column v-if="checkPer(['admin','studyRecordDay:edit','studyRecordDay:del'])" label="操作" width="150px" align="center">
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
import crudStudyRecordDay from '@/api/studyRecordDay'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

const defaultForm = { id: null, uid: null, date: null, objectType: null, objectId: null, type: null }
export default {
  name: 'StudyRecordDay',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: '学习日记录', url: 'api/studyRecordDay', idField: 'id', sort: 'id,desc', crudMethod: { ...crudStudyRecordDay }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'studyRecordDay:add'],
        edit: ['admin', 'studyRecordDay:edit'],
        del: ['admin', 'studyRecordDay:del']
      },
      rules: {
        uid: [
          { required: true, message: '用户id不能为空', trigger: 'blur' }
        ],
        date: [
          { required: true, message: '日期不能为空', trigger: 'blur' }
        ],
        objectType: [
          { required: true, message: '学习内容类型（0 - 词根 1- 单词）不能为空', trigger: 'blur' }
        ],
        objectId: [
          { required: true, message: '学习内容id不能为空', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '类型（0-初次看，1-再次看）不能为空', trigger: 'blur' }
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
