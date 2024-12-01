<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="600px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="主键">
            <el-input v-model="form.id" style="width: 95%;" />
          </el-form-item>
          <el-form-item label="用户ID" prop="uid">
            <el-input v-model="form.uid" style="width: 95%;" />
          </el-form-item>
          <el-form-item label="学习知识ID" prop="objectId">
            <el-input v-model="form.objectId" style="width: 95%;" />
          </el-form-item>
          <el-form-item label="忘记次数" prop="forgetTimes">
            <el-input v-model="form.forgetTimes" style="width: 95%;" />
          </el-form-item>
          <el-form-item label="记忆等级" prop="memeryLevel">
            <el-input v-model="form.memeryLevel" style="width: 95%;" />
          </el-form-item>
          <el-form-item label="学习次数" prop="studyTimes">
            <el-input v-model="form.studyTimes" style="width: 95%;" />
          </el-form-item>
          <el-form-item label="记得次数" prop="simpleTimes">
            <el-input v-model="form.simpleTimes" style="width: 95%;" />
          </el-form-item>
          <el-form-item label="模糊次数" prop="confuseTimes">
            <el-input v-model="form.confuseTimes" style="width: 95%;" />
          </el-form-item>
          <el-form-item label="最后学习日期" prop="lastReviewTime">
            <el-input v-model="form.lastReviewTime" style="width: 95%;" />
          </el-form-item>
          <el-form-item label="最后一次复习结果" prop="lastReviewResult">
            <el-input v-model="form.lastReviewResult" style="width: 95%;" />
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
        <el-table-column prop="uid" label="用户ID" />
        <el-table-column prop="objectId" label="学习知识ID" />
        <el-table-column prop="forgetTimes" label="忘记次数" />
        <el-table-column prop="memeryLevel" label="记忆等级" />
        <el-table-column prop="studyTimes" label="学习次数" />
        <el-table-column prop="simpleTimes" label="记得次数" />
        <el-table-column prop="confuseTimes" label="模糊次数" />
        <el-table-column prop="lastReviewTime" label="最后学习日期" />
        <el-table-column prop="lastReviewResult" label="最后一次复习结果" />
        <el-table-column v-if="checkPer(['admin','studyMorphemeStatics:edit','studyMorphemeStatics:del'])" label="操作" width="150px" align="center">
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
import crudStudyMorphemeStatics from '@/api/studyMorphemeStatics'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

const defaultForm = { id: null, uid: null, objectId: null, forgetTimes: null, memeryLevel: null, studyTimes: null, simpleTimes: null, confuseTimes: null, lastReviewTime: null, lastReviewResult: null }
export default {
  name: 'StudyMorphemeStatics',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: '学习词根统计', url: 'api/studyMorphemeStatics', idField: 'id', sort: 'id,desc', crudMethod: { ...crudStudyMorphemeStatics }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'studyMorphemeStatics:add'],
        edit: ['admin', 'studyMorphemeStatics:edit'],
        del: ['admin', 'studyMorphemeStatics:del']
      },
      rules: {
        uid: [
          { required: true, message: '用户ID不能为空', trigger: 'blur' }
        ],
        objectId: [
          { required: true, message: '学习知识ID不能为空', trigger: 'blur' }
        ],
        forgetTimes: [
          { required: true, message: '忘记次数不能为空', trigger: 'blur' }
        ],
        memeryLevel: [
          { required: true, message: '记忆等级不能为空', trigger: 'blur' }
        ],
        studyTimes: [
          { required: true, message: '学习次数不能为空', trigger: 'blur' }
        ],
        simpleTimes: [
          { required: true, message: '记得次数不能为空', trigger: 'blur' }
        ],
        confuseTimes: [
          { required: true, message: '模糊次数不能为空', trigger: 'blur' }
        ],
        lastReviewTime: [
          { required: true, message: '最后学习日期不能为空', trigger: 'blur' }
        ],
        lastReviewResult: [
          { required: true, message: '最后一次复习结果不能为空', trigger: 'blur' }
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
