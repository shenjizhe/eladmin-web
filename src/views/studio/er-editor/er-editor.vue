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
        <el-collapse-item title="工具控件" name="domain-tool">
          <draggable v-model="toolEntity" class="entity-tool" chosen-class="chosen" :group="{name: 'entity-area-group', pull:'clone', put: false}" sort="false" animation="300" @start="drag=true" @end="drag=false">
            <EREntity v-for="item in toolEntity" :key="item.id" :type="item.type" :title="item.title" />
          </draggable>
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
      <draggable display="flex" class="entity-area" group="entity-area-group" chosen-class="chosen" animation="300" @add="onAdd">
        <!--        <EREntity v-for="item in areaEntity" :key="item.id" :type="item.type" :title="item.title" :comment="item.comment"></EREntity>-->
      </draggable>
      <!--      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="500px">-->
      <!--        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">-->
      <!--          <el-form-item label="领域id">-->
      <!--            <el-input v-model="form.domainId" style="width: 370px;" />-->
      <!--          </el-form-item>-->
      <!--          <el-form-item label="名称" prop="name">-->
      <!--            <el-input v-model="form.name" style="width: 370px;" />-->
      <!--          </el-form-item>-->
      <!--          <el-form-item label="标题" prop="title">-->
      <!--            <el-input v-model="form.title" style="width: 370px;" />-->
      <!--          </el-form-item>-->
      <!--          <el-form-item label="描述" prop="comment">-->
      <!--            <el-input v-model="form.comment" :rows="3" type="textarea" style="width: 370px;" />-->
      <!--          </el-form-item>-->
      <!--          <el-form-item label="是否显示" prop="show">-->
      <!--            <el-switch v-model="form.show" />-->
      <!--          </el-form-item>-->
      <!--          <el-form-item label="组id">-->
      <!--            <el-input v-model="form.groupId" style="width: 370px;" />-->
      <!--          </el-form-item>-->
      <!--        </el-form>-->
      <!--        <div slot="footer" class="dialog-footer">-->
      <!--          <el-button type="text" @click="crud.cancelCU">取消</el-button>-->
      <!--          <el-button :loading="crud.status.cu === 2" type="primary" @click="crud.submitCU">确认</el-button>-->
      <!--        </div>-->
      <!--      </el-dialog>-->
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

<script lang="js" src="./_er-editor.js">
</script>

<style scoped>
@import "./_er-editor.css";
</style>

