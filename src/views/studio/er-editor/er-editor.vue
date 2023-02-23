<template>
  <el-container class="blackStyle">
    <el-aside>
      <el-collapse accordion>
        <el-collapse-item title="领域信息" name="domain-info">
          <template slot="title">
            <i class="header-icon el-icon-info">领域信息</i>
          </template>
          <el-form label-width="50px" size="small">
            <el-form-item label="名称">
              <el-input v-model="domain.name" />
            </el-form-item>
            <el-form-item label="描述">
              <el-input v-model="domain.comment" type="textarea" />
            </el-form-item>
            <el-form-item label="启用">
              <el-switch v-model="domain.show" />
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
      <el-collapse accordion>
        <el-collapse-item title="实体信息" name="1">
          <el-form label-width="50px" size="small">
            <el-form-item label="名称">
              <el-input />
            </el-form-item>
            <el-form-item label="类型">
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in dict.entity_types"
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
              <el-select v-model="value" filterable placeholder="请选择">
                <el-option
                  v-for="item in dict.db_types"
                  :key="item.id"
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

  dicts: ['entity_types', 'db_types'],

  mixins: [],

  props: {},

  data() {
    return {
      domain: {
        id: 0,
        name: '',
        comment: ''
      },
      value: ''
    }
  },

  computed: {},

  watch: {},

  created() {
  },

  mounted() {
    this.domain.id = this.$route.query.domain.id
    this.domain.name = this.$route.query.domain.name
    this.domain.comment = this.$route.query.domain.comment
    this.domain.show = this.$route.query.domain.show
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

