<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="600px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="操作时间" prop="time">
            <el-input v-model="form.time" style="width: 95%;" />
          </el-form-item>
          <el-form-item label="事件" prop="event">
            <el-input v-model="form.event" style="width: 95%;" />
          </el-form-item>
          <el-form-item label="内容" prop="content">
            <el-input v-model="form.content" style="width: 95%;" />
          </el-form-item>
          <el-form-item label="单词ID" prop="wordId">
            <el-input v-model="form.wordId" style="width: 95%;" />
          </el-form-item>
          <el-form-item label="用户ID" prop="uid">
            <el-input v-model="form.uid" style="width: 95%;" />
          </el-form-item>
          <el-form-item label="词根ID">
            <el-input v-model="form.morphemeId" style="width: 95%;" />
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
        <el-table-column prop="time" label="操作时间" />
        <el-table-column prop="event" label="事件" />
        <el-table-column prop="content" label="内容" />
        <el-table-column prop="wordId" label="单词ID" />
        <el-table-column prop="uid" label="用户ID" />
        <el-table-column prop="morphemeId" label="词根ID" />
        <el-table-column v-if="checkPer(['admin','studyEvent:edit','studyEvent:del'])" label="操作" width="150px" align="center">
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
import crudStudyEvent from '@/api/studyEvent'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

const defaultForm = { id: null, time: null, event: null, content: null, wordId: null, uid: null, morphemeId: null }
export default {
  name: 'StudyEvent',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: '学习记录', url: 'api/studyEvent', idField: 'id', sort: 'id,desc', crudMethod: { ...crudStudyEvent }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'studyEvent:add'],
        edit: ['admin', 'studyEvent:edit'],
        del: ['admin', 'studyEvent:del']
      },
      rules: {
        id: [
          { required: true, message: '主键不能为空', trigger: 'blur' }
        ],
        time: [
          { required: true, message: '操作时间不能为空', trigger: 'blur' }
        ],
        event: [
          { required: true, message: '事件不能为空', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '内容不能为空', trigger: 'blur' }
        ],
        wordId: [
          { required: true, message: '单词ID不能为空', trigger: 'blur' }
        ],
        uid: [
          { required: true, message: '用户ID不能为空', trigger: 'blur' }
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
