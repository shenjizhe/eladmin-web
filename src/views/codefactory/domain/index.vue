<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <!--表格渲染-->
        <label class="el-form-item-label">名称</label>
        <el-input
          v-model="query.name"
          clearable
          placeholder="名称"
          style="width: 185px;"
          class="filter-item"
          @keyup.enter.native="crud.toQuery"
        />

        <!--表格渲染-->
        <label class="el-form-item-label">描述</label>
        <el-input
          v-model="query.comment"
          clearable
          placeholder="描述"
          style="width: 185px;"
          class="filter-item"
          @keyup.enter.native="crud.toQuery"
        />

        <!--表格渲染-->
        <label class="el-form-item-label">启用</label>
        <el-select
          v-model="query.show"
          clearable
          placeholder="请选择"
          style="width: 185px;"
          class="filter-item"
          @keyup.enter.native="crud.toQuery"
        >
          <el-option
            v-for="item in dict.show_status"
            :key="item.id"
            :label="item.label"
            :value="item.value"
          />
        </el-select>

        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog
        :close-on-click-modal="false"
        :before-close="crud.cancelCU"
        :visible.sync="crud.status.cu > 0"
        :title="crud.status.title"
        width="500px"
      >
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="名称" prop="name">
            <el-input v-model="form.name" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="描述" prop="comment">
            <el-input v-model="form.comment" :rows="3" type="textarea" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="启用" prop="show">
            <el-switch v-model="form.show" />
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
        <el-table-column prop="show" label="启用">
          <template slot-scope="scope">
            {{ dict.label.show_status[scope.row.show] }}
          </template>
        </el-table-column>
        <el-table-column v-if="checkPer(['admin','domain:edit','domain:del'])" label="操作" width="180px" align="center">
          <template slot-scope="scope">
            <udOperation
              :data="scope.row"
              :permission="permission"
            >
              <template slot="right">
                <el-button size="mini" type="success" icon="el-icon-setting" @click="editDomain(scope.row)" />
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
import crudDomain from '@/api/domain'
import CRUD, { crud, form, header, presenter } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

const defaultForm = { id: null, name: null, comment: null, show: null }
export default {
  name: 'Domain',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  dicts: ['show_status'],
  cruds() {
    return CRUD({ title: '领域建模', url: 'api/domain', idField: 'id', sort: 'id,desc', crudMethod: { ...crudDomain }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'domain:add'],
        edit: ['admin', 'domain:edit'],
        del: ['admin', 'domain:del']
      },
      rules: {
        name: [
          { required: true, message: '名称不能为空', trigger: 'blur' }
        ],
        comment: [
          { required: true, message: '描述不能为空', trigger: 'blur' }
        ],
        show: [
          { required: true, message: '启用不能为空', trigger: 'blur' }
        ]
      },
      queryTypeOptions: [
        { key: 'name', display_name: '名称' },
        { key: 'comment', display_name: '描述' },
        { key: 'show', display_name: '启用' }
      ]
    }
  },
  methods: {
    // 钩子：在获取表格数据之前执行，false 则代表不获取数据
    [CRUD.HOOK.beforeRefresh]() {
      return true
    },

    editDomain(e) {
      this.$router.push({
        path: '/studio/er-editor',
        query: {
          domainId: e.id
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
