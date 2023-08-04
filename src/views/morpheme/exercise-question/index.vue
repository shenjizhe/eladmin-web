<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <label class="el-form-item-label">题干</label>
        <el-input v-model="query.questionStem" clearable placeholder="题干" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">题目内容</label>
        <el-input v-model="query.content" clearable placeholder="题目内容" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">选项</label>
        <el-input v-model="query.options" clearable placeholder="选项" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">答案</label>
        <el-input v-model="query.answer" clearable placeholder="答案" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="600px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="词素ID" prop="morphemeId">
            <el-input v-model="form.morphemeId" style="width: 95%;" />
          </el-form-item>
          <el-form-item label="编号" prop="number">
            <el-input-number v-model="form.number" />
          </el-form-item>
          <el-form-item label="题目类型" prop="type">
            <el-select v-model="form.type" filterable placeholder="请选择">
              <el-option
                v-for="item in dict.morpheme_question_type"
                :key="item.id"
                :label="item.label"
                :value="item.value*1"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="题干" prop="questionStem">
            <el-input v-model="form.questionStem" :rows="3" type="textarea" style="width: 95%;;" />
          </el-form-item>
          <el-form-item label="题目内容" prop="content">
            <el-input v-model="form.content" :rows="3" type="textarea" style="width: 95%;;" />
          </el-form-item>
          <el-form-item label="选项" prop="options">
            <el-input v-model="form.options" :rows="3" type="textarea" style="width: 95%;;" />
          </el-form-item>
          <el-form-item label="答案">
            <el-input v-model="form.answer" :rows="3" type="textarea" style="width: 95%;;" />
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
        <el-table-column prop="morphemeId" label="词素ID" />
        <el-table-column prop="number" label="编号" />
        <el-table-column prop="type" label="题目类型">
          <template slot-scope="scope">
            {{ dict.label.morpheme_question_type[scope.row.type] }}
          </template>
        </el-table-column>
        <el-table-column prop="questionStem" label="题干" />
        <el-table-column prop="content" label="题目内容" />
        <el-table-column prop="options" label="选项" />
        <el-table-column prop="answer" label="答案" />
        <el-table-column v-if="checkPer(['admin','exerciseQuestion:edit','exerciseQuestion:del'])" label="操作" width="150px" align="center">
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
import crudExerciseQuestion from '@/api/exerciseQuestion'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

const defaultForm = { id: null, morphemeId: null, number: null, type: null, questionStem: null, content: null, options: null, answer: null }
export default {
  name: 'ExerciseQuestion',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  dicts: ['morpheme_question_type'],
  cruds() {
    return CRUD({ title: '练习题', url: 'api/exerciseQuestion', idField: 'id', sort: 'id,desc', crudMethod: { ...crudExerciseQuestion }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'exerciseQuestion:add'],
        edit: ['admin', 'exerciseQuestion:edit'],
        del: ['admin', 'exerciseQuestion:del']
      },
      rules: {
        id: [
          { required: true, message: '主键不能为空', trigger: 'blur' }
        ],
        morphemeId: [
          { required: true, message: '词素ID不能为空', trigger: 'blur' }
        ],
        number: [
          { required: true, message: '编号不能为空', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '题目类型不能为空', trigger: 'blur' }
        ],
        questionStem: [
          { required: true, message: '题干不能为空', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '题目内容不能为空', trigger: 'blur' }
        ],
        options: [
          { required: true, message: '选项不能为空', trigger: 'blur' }
        ]
      },
      queryTypeOptions: [
        { key: 'questionStem', display_name: '题干' },
        { key: 'content', display_name: '题目内容' },
        { key: 'options', display_name: '选项' },
        { key: 'answer', display_name: '答案' }
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
