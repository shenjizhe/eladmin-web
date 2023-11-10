<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <label class="el-form-item-label">名称</label>
        <el-input v-model="query.name" clearable placeholder="名称" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">标题</label>
        <el-input v-model="query.title" clearable placeholder="标题" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">内容</label>
        <el-input v-model="query.content" clearable placeholder="内容" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="100%" top="0px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="名称" prop="name">
            <el-input v-model="form.name" style="width: 95%;" />
          </el-form-item>
          <el-form-item label="标题" prop="title">
            <el-input v-model="form.title" style="width: 95%;" />
          </el-form-item>
          <el-form-item label="学科" prop="subject">
            <el-select v-model="form.subject" filterable placeholder="请选择">
              <el-option
                v-for="item in dict.study_subject"
                :key="item.id"
                :label="item.label"
                :value="item.value*1"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="年级" prop="grade">
            <el-select v-model="form.grade" filterable placeholder="请选择">
              <el-option
                v-for="item in dict.study_grade"
                :key="item.id"
                :label="item.label"
                :value="item.value*1"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="口诀" prop="mnemonic">
            <el-input v-model="form.mnemonic" :rows="3" type="textarea" style="width: 95%;;" />
          </el-form-item>
          <el-form-item label="条件(每行一个条件)" prop="conditions">
            <el-input v-model="form.conditions" :rows="3" type="textarea" style="width: 95%;;" />
          </el-form-item>
          <el-form-item label="步骤（每行一个步骤）" prop="steps">
            <el-input v-model="form.steps" :rows="3" type="textarea" style="width: 95%;;" />
          </el-form-item>
          <el-form-item label="内容" prop="content">
            <quill-editor ref="myQuillEditor" v-model="form.content" class="ql-editor" />
          </el-form-item>
          <el-form-item label="章节顺序" prop="chapterNum">
            <el-input-number v-model="form.chapterNum" />
          </el-form-item>
          <el-form-item label="章节名称" prop="chapterName">
            <el-input v-model="form.chapterName" style="width: 95%;" />
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
        <el-table-column prop="id" label="知识点id" />
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="title" label="标题" />
        <el-table-column prop="subject" label="学科">
          <template slot-scope="scope">
            {{ dict.label.study_subject[scope.row.subject] }}
          </template>
        </el-table-column>
        <el-table-column prop="grade" label="年级">
          <template slot-scope="scope">
            {{ dict.label.study_grade[scope.row.grade] }}
          </template>
        </el-table-column>
        <el-table-column prop="mnemonic" label="口诀" />
        <el-table-column prop="conditions" label="条件" />
        <el-table-column prop="steps" label="步骤" />
        <!--        <el-table-column prop="content" label="内容" />-->
        <el-table-column prop="chapterNum" label="章节顺序" />
        <el-table-column prop="chapterName" label="章节名称" />
        <el-table-column v-if="checkPer(['admin','knowledge:edit','knowledge:del'])" label="操作" width="150px" align="center">
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
import crudKnowledge from '@/api/knowledge'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

const defaultForm = { id: null, name: null, title: null, subject: null, grade: null, mnemonic: null, conditions: null, steps: null, content: null, chapterNum: null, chapterName: null }
export default {
  name: 'Knowledge',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  dicts: ['study_subject', 'study_grade'],
  cruds() {
    return CRUD({ title: '知识点', url: 'api/knowledge', idField: 'id', sort: 'id,desc', crudMethod: { ...crudKnowledge }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'knowledge:add'],
        edit: ['admin', 'knowledge:edit'],
        del: ['admin', 'knowledge:del']
      },
      rules: {
        id: [
          { required: true, message: '知识点id不能为空', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '名称不能为空', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '标题不能为空', trigger: 'blur' }
        ],
        subject: [
          { required: true, message: '学科不能为空', trigger: 'blur' }
        ],
        grade: [
          { required: true, message: '年级不能为空', trigger: 'blur' }
        ],
        mnemonic: [
          { required: true, message: '口诀不能为空', trigger: 'blur' }
        ],
        conditions: [
          { required: true, message: '条件(每行一个条件)不能为空', trigger: 'blur' }
        ],
        steps: [
          { required: true, message: '步骤（每行一个步骤）不能为空', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '内容不能为空', trigger: 'blur' }
        ],
        chapterNum: [
          { required: true, message: '章节顺序不能为空', trigger: 'blur' }
        ],
        chapterName: [
          { required: true, message: '章节名称不能为空', trigger: 'blur' }
        ]
      },
      queryTypeOptions: [
        { key: 'name', display_name: '名称' },
        { key: 'title', display_name: '标题' },
        { key: 'content', display_name: '内容' }
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
