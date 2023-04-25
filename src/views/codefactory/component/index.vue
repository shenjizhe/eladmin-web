<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <label class="el-form-item-label">主键</label>
        <el-input v-model="query.id" clearable placeholder="主键" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">名称</label>
        <el-input v-model="query.name" clearable placeholder="名称" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">描述</label>
        <el-input v-model="query.comment" clearable placeholder="描述" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">是否显示</label>
        <el-input v-model="query.show" clearable placeholder="是否显示" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">模型ID</label>
        <el-input v-model="query.modelId" clearable placeholder="模型ID" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">模块ID</label>
        <el-input v-model="query.templateId" clearable placeholder="模块ID" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="名称" prop="name">
            <el-input v-model="form.name" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="描述" prop="comment">
            <el-input v-model="form.comment" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="是否显示" prop="show">
            <el-switch v-model="form.show" />
          </el-form-item>
          <el-form-item label="模型ID" prop="modelId">
            <el-input v-model="form.modelId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="模块ID" prop="templateId">
            <el-input v-model="form.templateId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="文件路径">
            <el-input v-model="form.filePath" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="结果端口">
            <el-input v-model="form.port" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="结果包名">
            <el-input v-model="form.rootPackage" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="域名">
            <el-input v-model="form.deployUrl" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="输出目录">
            <el-input v-model="form.deployPath" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="git目录">
            <el-input v-model="form.gitPath" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="git命名空间">
            <el-input v-model="form.gitGroup" style="width: 370px;" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="text" @click="crud.cancelCU">取消</el-button>
          <el-button :loading="crud.status.cu === 2" type="primary" @click="crud.submitCU">确认</el-button>
        </div>
      </el-dialog>
      <!--表格渲染-->
      <el-table
        ref="table"
        v-loading="crud.loading"
        :data="crud.data"
        size="small"
        style="width: 100%;"
        @selection-change="crud.selectionChangeHandler"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="id" label="主键" />
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="comment" label="描述" />
        <el-table-column prop="port" label="结果端口" />
        <el-table-column prop="rootPackage" label="结果包名" />
        <el-table-column v-if="checkPer(['admin','component:edit','component:del'])" label="操作" width="350px" align="center">
          <template slot-scope="scope">
            <udOperation
              :data="scope.row"
              :permission="permission"
            >
              <template slot="right">
                <el-button
                  size="mini"
                  type="success"
                  icon="el-icon-share"
                  @click="generateCode(scope.row)"
                >生成</el-button>
                <el-button
                  v-loading.fullscreen.lock="loading.show"
                  :element-loading-text="loading.text"
                  :element-loading-spinner="loading.spinner"
                  :element-loading-background="loading.background"
                  size="mini"
                  type="primary"
                  icon="el-icon-upload"
                  @click="pushCode(scope.row)"
                >推送</el-button>
                <el-button
                  size="mini"
                  type="warning"
                  icon="el-icon-upload"
                  @click="testProcess(scope.row)"
                >进度</el-button>
              </template>
            </udOperation>
          </template>
        </el-table-column>
      </el-table>
      <!--分页组件-->
      <pagination />
    </div>
  </div>
</template>

<script>
import crudComponent from '@/api/component'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'
import { CodeFactory } from '@/api/studio/CodeFactory'
import { GitlabHelper } from '@/api/studio/GitlabHelper'
import { Process } from '@/api/studio/Process'

const defaultForm = { id: null, name: null, comment: null, show: null, modelId: null, templateId: null, filePath: null, port: null, rootPackage: null, deployUrl: null, deployPath: null, gitPath: null, gitGroup: null }
export default {
  name: 'Component',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  dicts: ['show_status'],
  cruds() {
    return CRUD({ title: '组件', url: 'api/component', idField: 'id', sort: 'id,desc', crudMethod: { ...crudComponent }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'component:add'],
        edit: ['admin', 'component:edit'],
        del: ['admin', 'component:del']
      },
      rules: {
        name: [
          { required: true, message: '名称不能为空', trigger: 'blur' }
        ],
        comment: [
          { required: true, message: '描述不能为空', trigger: 'blur' }
        ],
        show: [
          { required: true, message: '是否显示不能为空', trigger: 'blur' }
        ],
        modelId: [
          { required: true, message: '模型ID不能为空', trigger: 'blur' }
        ],
        templateId: [
          { required: true, message: '模块ID不能为空', trigger: 'blur' }
        ]
      },
      loading: {
        show: false,
        text: null,
        background: 'rgba(0, 0, 0, 0.2)',
        spinner: 'el-icon-loading'
      },
      queryTypeOptions: [
        { key: 'id', display_name: '主键' },
        { key: 'name', display_name: '名称' },
        { key: 'comment', display_name: '描述' },
        { key: 'show', display_name: '是否显示' },
        { key: 'modelId', display_name: '模型ID' },
        { key: 'templateId', display_name: '模块ID' }
      ]

    }
  },
  methods: {
    // 钩子：在获取表格数据之前执行，false 则代表不获取数据
    [CRUD.HOOK.beforeRefresh]() {
      return true
    },

    generateCode(row) {
      const factory = new CodeFactory()
      factory.generate(row.id)
        .then(response => {
          if (response.errCode === 0) {
            this.$message({
              message: '生成代码成功',
              type: 'success'
            })
          } else {
            this.$message({
              message: '生成代码失败',
              type: 'fail'
            })
          }
        }).catch(error => {
          this.$message({
            message: '生成代码失败:' + error,
            type: 'fail'
          })
        })
    },

    testProcess(row) {
      var process = new Process()
      process.process()
    },

    pushCode(row) {
      const helper = new GitlabHelper()
      this.loading.show = true
      this.loading.text = '代码生成中'
      helper.pushProject(row.id)
        .then(response => {
          if (response.errCode === 0) {
            this.loading.show = false
            this.$message({
              message: '推送代码成功',
              type: 'success'
            })
          } else {
            this.loading.show = false
            this.$message({
              message: '推送代码失败: ' + response.message,
              type: 'fail'
            })
          }
        }).catch(error => {
          this.loading.show = false
          this.$message({
            message: '推送代码失败: ' + error,
            type: 'fail'
          })
        })
    }
  }
}
</script>

<style scoped>

</style>
