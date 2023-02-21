<template>
  <el-container class="blackStyle">
    <el-aside>
      <el-collapse accordion @change="handleChange">
        <el-collapse-item title="领域信息" name="domain-info">
          <template slot="title">
            <i class="header-icon el-icon-info">领域信息</i>
          </template>
          <el-form label-width="50px" size="small">
            <el-form-item label="名称">
              <el-input />
            </el-form-item>
            <el-form-item label="描述">
              <el-input />
            </el-form-item>
            <el-form-item label="用途">
              <el-input type="textarea" />
            </el-form-item>
            <el-form-item label="">
              <el-button type="primary" @click="onSubmit">保存</el-button>
              <el-button>还原</el-button>
            </el-form-item>
          </el-form>
        </el-collapse-item>
        <el-collapse-item id="entity-tools" title="工具控件" name="domain-tool">
          <el-row>
            <el-col :span="12">
              <el-button type="primary" @mousedown.native="mousedown">
                <svg-icon icon-class="business" />
                业务
              </el-button>
            </el-col>
            <el-col :span="12">
              <el-button type="success">
                <svg-icon icon-class="er" />
                关系
              </el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-button type="info">
                <svg-icon icon-class="log" />
                日志
              </el-button>
            </el-col>
            <el-col :span="12">
              <el-button type="warning">
                <svg-icon icon-class="dict" />
                字典
              </el-button>
            </el-col>
          </el-row>
        </el-collapse-item>
        <el-collapse-item title="市场领域" name="domain-market">
          <el-input placeholder="请输入关键字">
            <el-button slot="append" icon="el-icon-search" />
          </el-input>
          <el-table
            :data="tableData"
            style="width: 100%"
            stripe
          >
            <el-table-column
              label="名称"
              width="80px"
            />
            <el-table-column
              prop="name"
              label="描述"
            />
          </el-table>
          <el-form label-width="50px" size="small">
            <el-form-item label="名称">
              <el-input />
            </el-form-item>
            <el-form-item label="描述">
              <el-input />
            </el-form-item>
            <el-form-item label="用途">
              <el-input type="textarea" />
            </el-form-item>
          </el-form>
        </el-collapse-item>
      </el-collapse>
    </el-aside>
    <el-main>
      <!--      <el-tabs type="border-card">-->
      <!--        <el-tab-pane label="模型"/>-->
      <!--      </el-tabs>-->
    </el-main>
    <el-aside>
      <el-collapse v-model="activeNames" accordion @change="handleChange">
        <el-collapse-item title="实体信息" name="1">
          <el-form label-width="50px" size="small">
            <el-form-item label="名称">
              <el-input />
            </el-form-item>
            <el-form-item label="类型">
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in entityTypes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="标题">
              <el-input />
            </el-form-item>
            <el-form-item label="描述">
              <el-input type="textarea" />
            </el-form-item>
          </el-form>
        </el-collapse-item>
        <el-collapse-item title="属性列表" name="2">
          <el-table
            :data="fieldColumns"
            style="width: 100%"
            stripe
          >
            <el-table-column
              label="名称"
              width="80px"
            />
            <el-table-column
              prop="name"
              label="描述"
            />
          </el-table>
          <el-form label-width="50px" size="small">
            <el-form-item label="名称">
              <el-input />
            </el-form-item>
            <el-form-item label="类型">
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in fieldTypes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="主键">
              <el-switch />
            </el-form-item>
            <el-form-item label="描述">
              <el-input type="textarea" />
            </el-form-item>
          </el-form>
        </el-collapse-item>
      </el-collapse>
    </el-aside>
  </el-container>
</template>

<script>
// @vue/component
// import "../../../theme/index.css"
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

export default {
  name: 'ErEditor',

  components: { pagination, crudOperation, rrOperation, udOperation },

  mixins: [],

  props: {},

  data() {
    return {
      entityTypes: [{
        value: 'bus',
        label: '业务'
      }, {
        value: 'dic',
        label: '字典'
      }, {
        value: 'log',
        label: '日志'
      }, {
        value: 'rel',
        label: '关系'
      }],
      fieldTypes: [{
        value: 'bit',
        label: '布尔'
      }, {
        value: 'string',
        label: '文本'
      }, {
        value: 'int',
        label: '整数'
      }, {
        value: 'float',
        label: '单精度小数'
      }],
      value: ''
    }
  },

  computed: {},

  watch: {},

  created() {
  },

  methods: {
    mousedown(e) {
      console.log(e)
      // alert(JSON.stringify(e))
    }
  }
}
</script>

<style scoped>
@import "./_er-editor.css";
</style>

