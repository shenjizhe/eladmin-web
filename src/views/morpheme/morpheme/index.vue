<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <label class="el-form-item-label">主键</label>
        <el-input v-model="query.id" clearable placeholder="主键" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">字典ID</label>
        <el-input v-model="query.dictionaryId" clearable placeholder="字典ID" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">词素类型（1-词根、2-词缀,3-连接词）</label>
        <el-input v-model="query.type" clearable placeholder="词素类型（1-词根、2-词缀,3-连接词）" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">词源(L,GK)</label>
        <el-input v-model="query.source" clearable placeholder="词源(L,GK)" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="600px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="字典ID" prop="dictionaryId">
            <el-input v-model="form.dictionaryId" style="width: 95%;" />
          </el-form-item>
          <el-form-item label="编号(1)" prop="number">
            <el-input-number v-model="form.number" />
          </el-form-item>
          <el-form-item label="词素文本（ag,act）" prop="text">
            <el-input v-model="form.text" style="width: 95%;" />
          </el-form-item>
          <el-form-item label="词素类型（1-词根、2-词缀,3-连接词）" prop="type">
            <el-select v-model="form.type" filterable placeholder="请选择">
              <el-option
                v-for="item in dict.morpheme_type"
                :key="item.id"
                :label="item.label"
                :value="item.value*1"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="词源(L,GK)" prop="source">
            <el-select v-model="form.source" filterable placeholder="请选择">
              <el-option
                v-for="item in dict.morpheme_source"
                :key="item.id"
                :label="item.label"
                :value="item.value*1"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="中文含义" prop="meaningChinese">
            <el-input v-model="form.meaningChinese" style="width: 95%;" />
          </el-form-item>
          <el-form-item label="英文含义" prop="meaningEnglish">
            <el-input v-model="form.meaningEnglish" style="width: 95%;" />
          </el-form-item>
          <el-form-item label="说明">
            <el-input v-model="form.description" :rows="3" type="textarea" style="width: 95%;;" />
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
        <el-table-column prop="dictionaryId" label="字典ID" />
        <el-table-column prop="number" label="编号(1)" />
        <el-table-column prop="text" label="词素文本（ag,act）" />
        <el-table-column prop="type" label="词素类型（1-词根、2-词缀,3-连接词）">
          <template slot-scope="scope">
            {{ dict.label.morpheme_type[scope.row.type] }}
          </template>
        </el-table-column>
        <el-table-column prop="source" label="词源(L,GK)">
          <template slot-scope="scope">
            {{ dict.label.morpheme_source[scope.row.source] }}
          </template>
        </el-table-column>
        <el-table-column prop="meaningChinese" label="中文含义" />
        <el-table-column prop="meaningEnglish" label="英文含义" />
        <el-table-column prop="description" label="说明" />
        <el-table-column v-if="checkPer(['admin','morpheme:edit','morpheme:del'])" label="操作" width="150px" align="center">
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
import crudMorpheme from '@/api/morpheme'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

const defaultForm = { id: null, dictionaryId: null, number: null, text: null, type: null, source: null, meaningChinese: null, meaningEnglish: null, description: null }
export default {
  name: 'Morpheme',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  dicts: ['morpheme_type', 'morpheme_source'],
  cruds() {
    return CRUD({ title: '词根', url: 'api/morpheme', idField: 'id', sort: 'id,desc', crudMethod: { ...crudMorpheme }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'morpheme:add'],
        edit: ['admin', 'morpheme:edit'],
        del: ['admin', 'morpheme:del']
      },
      rules: {
        id: [
          { required: true, message: '主键不能为空', trigger: 'blur' }
        ],
        dictionaryId: [
          { required: true, message: '字典ID不能为空', trigger: 'blur' }
        ],
        number: [
          { required: true, message: '编号(1)不能为空', trigger: 'blur' }
        ],
        text: [
          { required: true, message: '词素文本（ag,act）不能为空', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '词素类型（1-词根、2-词缀,3-连接词）不能为空', trigger: 'blur' }
        ],
        source: [
          { required: true, message: '词源(L,GK)不能为空', trigger: 'blur' }
        ],
        meaningChinese: [
          { required: true, message: '中文含义不能为空', trigger: 'blur' }
        ],
        meaningEnglish: [
          { required: true, message: '英文含义不能为空', trigger: 'blur' }
        ]
      },
      queryTypeOptions: [
        { key: 'id', display_name: '主键' },
        { key: 'dictionaryId', display_name: '字典ID' },
        { key: 'type', display_name: '词素类型（1-词根、2-词缀,3-连接词）' },
        { key: 'source', display_name: '词源(L,GK)' }
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
