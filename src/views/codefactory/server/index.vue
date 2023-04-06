<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="账号" prop="account">
            <el-input v-model="form.account" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="IP地址" prop="ip">
            <el-input v-model="form.ip" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="端口" prop="port">
            <el-input-number v-model="form.port" />
          </el-form-item>
          <el-form-item label="名称" prop="name">
            <el-input v-model="form.name" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" type="password" style="width: 200px" />
            <el-button :loading="loading" type="success" style="align: right;" @click="testConnectServer">测试连接</el-button>
          </el-form-item>
          <el-form-item label="私钥">
            <el-input v-model="form.rsa" :rows="3" type="textarea" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="公钥">
            <el-input v-model="form.pub" :rows="3" type="textarea" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="系统">
            <el-select v-model="form.system" filterable placeholder="请选择">
              <el-option
                v-for="item in dict.system_type"
                :key="item.id"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="系统版本">
            <el-input v-model="form.version" style="width: 370px;" />
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
        <el-table-column prop="id" label="ID" />
        <el-table-column prop="account" label="账号" />
        <el-table-column prop="ip" label="IP地址" />
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="password" label="密码" />
        <el-table-column prop="system" label="系统">
          <template slot-scope="scope">
            {{ dict.label.system_type[scope.row.system] }}
          </template>
        </el-table-column>
        <el-table-column prop="port" label="端口" />
        <el-table-column v-if="checkPer(['admin','server:edit','server:del'])" label="操作" width="150px" align="center">
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
import crudServer from '@/api/server'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'
import { testServerConnect } from '@/api/mnt/connect'
import { execute } from '@/api/mnt/serverDeploy'

const defaultForm = { id: null, account: null, ip: null, name: null, password: null, rsa: null, pub: null, system: null, version: null, port: null }
export default {
  name: 'Server',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  dicts: ['system_type'],
  cruds() {
    return CRUD({ title: '服务器', url: 'api/server', idField: 'id', sort: 'id,desc', crudMethod: { ...crudServer }})
  },
  data() {
    return {
      loading: false,
      permission: {
        add: ['admin', 'server:add'],
        edit: ['admin', 'server:edit'],
        del: ['admin', 'server:del']
      },
      rules: {
        id: [
          { required: true, message: 'ID不能为空', trigger: 'blur' }
        ],
        account: [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ],
        ip: [
          { required: true, message: 'IP地址不能为空', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '名称不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ],
        port: [
          { required: true, message: '端口不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 钩子：在获取表格数据之前执行，false 则代表不获取数据
    [CRUD.HOOK.beforeRefresh]() {
      return true
    },
    testConnectServer() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.loading = true
          testServerConnect(this.form).then((res) => {
            this.loading = false
            this.$notify({
              title: res ? '连接成功' : '连接失败',
              type: res ? 'success' : 'error',
              duration: 2500
            })
          }).catch(() => {
            this.loading = false
          })

          execute(2, 3).then(res => {
            if (res.includes('Linux')) {
              this.form.system = 1
            }
            this.form.version = res
            console.log(res)
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
