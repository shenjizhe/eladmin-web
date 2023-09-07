<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="600px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="词缀文本" prop="text">
            <el-input v-model="form.text" style="width: 95%;" />
          </el-form-item>
          <el-form-item label="类型(1前缀,2后缀)" prop="affix">
            <el-input v-model="form.affix" style="width: 95%;" />
          </el-form-item>
          <el-form-item label="变形类型（0-原型，1-异形,2-省略）" prop="shape">
            <el-input v-model="form.shape" style="width: 95%;" />
          </el-form-item>
          <el-form-item label="词性" prop="nature">
            <el-input v-model="form.nature" style="width: 95%;" />
          </el-form-item>
          <el-form-item label="是否是派生词素(0-不是派生词 1-是派生词)">
            <el-input v-model="form.isDerive" style="width: 95%;" />
          </el-form-item>
          <el-form-item label="中文含义" prop="meaningChinese">
            <el-input v-model="form.meaningChinese" style="width: 95%;" />
          </el-form-item>
          <el-form-item label="英文含义（to lean）" prop="meaningEnglish">
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
        <el-table-column prop="text" label="词缀文本" />
        <el-table-column prop="affix" label="类型(1前缀,2后缀)" />
        <el-table-column prop="shape" label="变形类型（0-原型，1-异形,2-省略）" />
        <el-table-column prop="nature" label="词性" />
        <el-table-column prop="isDerive" label="是否是派生词素(0-不是派生词 1-是派生词)" />
        <el-table-column prop="meaningChinese" label="中文含义" />
        <el-table-column prop="meaningEnglish" label="英文含义（to lean）" />
        <el-table-column v-if="checkPer(['admin','wordAffix:edit','wordAffix:del'])" label="操作" width="150px" align="center">
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
import crudWordAffix from '@/api/wordAffix'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

const defaultForm = { id: null, text: null, affix: null, shape: null, nature: null, isDerive: null, meaningChinese: null, meaningEnglish: null }
export default {
  name: 'WordAffix',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: '词缀', url: 'api/wordAffix', idField: 'id', sort: 'id,desc', crudMethod: { ...crudWordAffix }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'wordAffix:add'],
        edit: ['admin', 'wordAffix:edit'],
        del: ['admin', 'wordAffix:del']
      },
      rules: {
        id: [
          { required: true, message: '主键不能为空', trigger: 'blur' }
        ],
        text: [
          { required: true, message: '词缀文本不能为空', trigger: 'blur' }
        ],
        affix: [
          { required: true, message: '类型(1前缀,2后缀)不能为空', trigger: 'blur' }
        ],
        shape: [
          { required: true, message: '变形类型（0-原型，1-异形,2-省略）不能为空', trigger: 'blur' }
        ],
        nature: [
          { required: true, message: '词性不能为空', trigger: 'blur' }
        ],
        meaningChinese: [
          { required: true, message: '中文含义不能为空', trigger: 'blur' }
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
