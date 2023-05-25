<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="600px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="单词ID" prop="wordId">
            <el-input v-model="form.wordId" style="width: 95%;" />
          </el-form-item>
          <el-form-item label="词素ID" prop="morphemeId">
            <el-input v-model="form.morphemeId" style="width: 95%;" />
          </el-form-item>
          <el-form-item label="词性" prop="nature">
            <el-select v-model="form.nature" filterable placeholder="请选择">
              <el-option
                v-for="item in dict.morpheme_nature"
                :key="item.id"
                :label="item.label"
                :value="item.value*1"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="中文含义（倾斜）" prop="meaningChinese">
            <el-input v-model="form.meaningChinese" style="width: 95%;" />
          </el-form-item>
          <el-form-item label="英文含义（to lean）" prop="meaningEnglish">
            <el-input v-model="form.meaningEnglish" style="width: 95%;" />
          </el-form-item>
          <el-form-item label="中文例句">
            <el-input v-model="form.exampleSentenceChinese" :rows="3" type="textarea" style="width: 95%;;" />
          </el-form-item>
          <el-form-item label="英文例句">
            <el-input v-model="form.exampleSentenceEnglish" :rows="3" type="textarea" style="width: 95%;;" />
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
        <el-table-column prop="wordId" label="单词ID" />
        <el-table-column prop="morphemeId" label="词素ID" />
        <el-table-column prop="nature" label="词性">
          <template slot-scope="scope">
            {{ dict.label.morpheme_nature[scope.row.nature] }}
          </template>
        </el-table-column>
        <el-table-column prop="meaningChinese" label="中文含义（倾斜）" />
        <el-table-column prop="meaningEnglish" label="英文含义（to lean）" />
        <el-table-column prop="exampleSentenceChinese" label="中文例句" />
        <el-table-column prop="exampleSentenceEnglish" label="英文例句" />
        <el-table-column v-if="checkPer(['admin','wordMeaning:edit','wordMeaning:del'])" label="操作" width="150px" align="center">
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
import crudWordMeaning from '@/api/wordMeaning'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

const defaultForm = { id: null, wordId: null, morphemeId: null, nature: null, meaningChinese: null, meaningEnglish: null, exampleSentenceChinese: null, exampleSentenceEnglish: null }
export default {
  name: 'WordMeaning',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  dicts: ['morpheme_nature'],
  cruds() {
    return CRUD({ title: '单词含义', url: 'api/wordMeaning', idField: 'id', sort: 'id,desc', crudMethod: { ...crudWordMeaning }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'wordMeaning:add'],
        edit: ['admin', 'wordMeaning:edit'],
        del: ['admin', 'wordMeaning:del']
      },
      rules: {
        id: [
          { required: true, message: '主键不能为空', trigger: 'blur' }
        ],
        wordId: [
          { required: true, message: '单词ID不能为空', trigger: 'blur' }
        ],
        morphemeId: [
          { required: true, message: '词素ID不能为空', trigger: 'blur' }
        ],
        nature: [
          { required: true, message: '词性不能为空', trigger: 'blur' }
        ],
        meaningChinese: [
          { required: true, message: '中文含义（倾斜）不能为空', trigger: 'blur' }
        ],
        meaningEnglish: [
          { required: true, message: '英文含义（to lean）不能为空', trigger: 'blur' }
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
