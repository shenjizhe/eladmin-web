<template>
  <el-container class="blackStyle">
    <el-aside>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="领域管理" name="first">
          <el-collapse>
            <el-collapse-item title="领域信息" name="domain-info">
              <template slot="title">
                <i class="header-icon el-icon-info">领域信息</i>
              </template>
              <el-form v-model="domain" label-width="50px" size="small">
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
            <el-collapse-item title="工具控件" name="domain-tool">
              <draggable v-model="toolEntity" class="entity-tool" chosen-class="chosen" :group="{name: 'entity-area-group', pull: 'clone', put: false}" sort="false" animation="300">
                <EREntity v-for="item in toolEntity" :id="item.id" :key="item.id" :model="item" :type="item.type" :title="item.title" />
              </draggable>
            </el-collapse-item>
          </el-collapse>
        </el-tab-pane>
        <el-tab-pane label="实体市场" name="second">
          <el-collapse>
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
        </el-tab-pane>
      </el-tabs>
    </el-aside>
    <el-main>
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="500px">
        <MyForm ref="form" :data="form" :rule="rulesEntity" :columns="formColumns" :dicts="dict" />
        <div slot="footer" class="dialog-footer">
          <el-button type="text" @click="crud.cancelCU">取消</el-button>
          <el-button :loading="crud.status.cu === 2" type="primary" @click="crud.submitCU">确认</el-button>
        </div>
      </el-dialog>
      <draggable :model="crud.data" display="flex" class="entity-area" :group="{name: 'entity-area-group', pull: false, put: true}" chosen-class="chosen" animation="300" @add="onAdd">
        <EREntity v-for="item in crud.data" :key="item.id" :data="item" :type="toolEntity[item.type-1].type" :title="item.name" :comment="item.title" :width="120" :height="120" @selected="onSelected" />
      </draggable>
      <pagination />
    </el-main>
    <el-aside>
      <el-collapse>
        <el-collapse-item title="实体信息" name="1">
          <el-form label-width="50px" size="small">
            <el-form-item label="名称">
              <el-input v-model="currentEntity.name" />
            </el-form-item>
            <el-form-item label="类型">
              <el-select v-model="currentEntity.type" placeholder="请选择">
                <el-option
                  v-for="item in dict.entity_types"
                  :key="item.value"
                  :label="item.label"
                  :value="parseInt(item.value)"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="标题">
              <el-input v-model="currentEntity.title" />
            </el-form-item>
            <el-form-item label="描述">
              <el-input v-model="currentEntity.comment" type="textarea" />
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

<script lang="js" src="./_er-editor.js">
</script>

<style scoped>
@import "./_er-editor.css";
</style>

