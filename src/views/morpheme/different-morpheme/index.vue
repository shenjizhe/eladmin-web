<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="600px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="词素ID" prop="morphemeId">
            <el-input v-model="form.morphemeId" style="width: 95%;" />
          </el-form-item>
          <el-form-item label="异形词素文本(ag)" prop="text">
            <el-input v-model="form.text" style="width: 95%;" />
          </el-form-item>
          <el-form-item label="词性(v-动词)">
            <el-select v-model="form.nature" filterable placeholder="请选择">
              <el-option
                v-for="item in dict.morpheme_nature"
                :key="item.id"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="词源" prop="source">
            <el-select v-model="form.source" filterable placeholder="请选择">
              <el-option
                v-for="item in dict.morpheme_source"
                :key="item.id"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="词源单词">
            <el-input v-model="form.sourceWord" style="width: 95%;" />
          </el-form-item>
          <el-form-item label="词源说明">
            <el-input v-model="form.sourceDescription" :rows="3" type="textarea" style="width: 95%;;" />
          </el-form-item>
          <el-form-item label="中文含义" prop="meaningChinese">
            <el-input v-model="form.meaningChinese" style="width: 95%;" />
          </el-form-item>
          <el-form-item label="英文含义" prop="meaningEnglish">
            <el-input v-model="form.meaningEnglish" style="width: 95%;" />
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
        <el-table-column prop="text" label="异形词素文本(ag)" />
        <el-table-column prop="nature" label="词性(v-动词)">
          <template slot-scope="scope">
            {{ dict.label.morpheme_nature[scope.row.nature] }}
          </template>
        </el-table-column>
        <el-table-column prop="source" label="词源">
          <template slot-scope="scope">
            {{ dict.label.morpheme_source[scope.row.source] }}
          </template>
        </el-table-column>
        <el-table-column prop="sourceWord" label="词源单词" />
        <el-table-column prop="sourceDescription" label="词源说明" />
        <el-table-column prop="meaningChinese" label="中文含义" />
        <el-table-column prop="meaningEnglish" label="英文含义" />
        <el-table-column v-if="checkPer(['admin','differentMorpheme:edit','differentMorpheme:del'])" label="操作" width="150px" align="center">
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
import crudDifferentMorpheme from '@/api/differentMorpheme'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

const defaultForm = { id: null, morphemeId: null, text: null, nature: null, source: null, sourceWord: null, sourceDescription: null, meaningChinese: null, meaningEnglish: null }
export default {
  name: 'DifferentMorpheme',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  dicts: ['morpheme_nature', 'morpheme_source'],
  cruds() {
    return CRUD({ title: '词根异构体', url: 'api/differentMorpheme', idField: 'id', sort: 'id,desc', crudMethod: { ...crudDifferentMorpheme }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'differentMorpheme:add'],
        edit: ['admin', 'differentMorpheme:edit'],
        del: ['admin', 'differentMorpheme:del']
      },
      rules: {
        id: [
          { required: true, message: '主键不能为空', trigger: 'blur' }
        ],
        morphemeId: [
          { required: true, message: '词素ID不能为空', trigger: 'blur' }
        ],
        text: [
          { required: true, message: '异形词素文本(ag)不能为空', trigger: 'blur' }
        ],
        source: [
          { required: true, message: '词源不能为空', trigger: 'blur' }
        ],
        meaningChinese: [
          { required: true, message: '中文含义不能为空', trigger: 'blur' }
        ],
        meaningEnglish: [
          { required: true, message: '英文含义不能为空', trigger: 'blur' }
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
