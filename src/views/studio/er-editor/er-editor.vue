<template>
  <el-container class="blackStyle">
    <el-aside>
      <el-tabs v-model="active.tabs" type="card">
        <el-tab-pane label="领域管理" name="first">
          <el-collapse v-model="active.domain">
            <el-collapse-item title="领域信息" name="1">
              <template slot="title">
                <i class="header-icon el-icon-info">领域信息</i>
              </template>
              <MyForm
                label-width="50px"
                size="small"
                :datas="current.domain"
                :rule="rules.domain"
                :columns="columns.domain"
                :dicts="dict"
                :disabled="disabled.domain"
              />
            </el-collapse-item>
            <el-collapse-item title="工具控件" name="2">
              <draggable v-model="toolEntity" class="entity-tool" chosen-class="chosen" :group="{name: 'entity-area-group', pull: 'clone', put: false}" sort="false" animation="300">
                <EREntity v-for="item in toolEntity" :id="item.id" :key="item.id" :model="item" :type="item.type" :title="item.title" />
              </draggable>
            </el-collapse-item>
          </el-collapse>
        </el-tab-pane>
        <el-tab-pane label="实体市场" name="second">
          <el-collapse v-model="active.market">
            <el-collapse-item title="市场领域" name="1">
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
      <el-dialog
        :close-on-click-modal="false"
        :before-close="Crud.entity.cancelCU"
        :visible.sync="Crud.entity.status.cu > 0"
        :title="Crud.entity.status.title"
        width="500px"
      >
        <MyForm
          ref="form"
          :datas="Crud.entity.form"
          :rule="rules.entity"
          :columns="columns.entity"
          :dicts="dict"
        />
        <div slot="footer" class="dialog-footer">
          <el-button type="text" @click="crud.cancelCU">取消</el-button>
          <el-button :loading="crud.status.cu === 2" type="primary" @click="crud.submitCU">确认</el-button>
        </div>
      </el-dialog>
      <el-dialog
        :close-on-click-modal="false"
        :before-close="Crud.field.cancelCU"
        :visible.sync="Crud.field.status.cu > 0"
        :title="Crud.field.status.title"
        width="500px"
      >
        <MyForm
          ref="form"
          :datas="Crud.field.form"
          :rule="rules.field"
          :columns="columns.field"
          :dicts="dict"
          :shortcuts="shortcuts.field"
        />
        <div slot="footer" class="dialog-footer">
          <el-button type="text" @click="Crud.field.cancelCU">取消</el-button>
          <el-button :loading="Crud.field.status.cu === 2" type="primary" @click="Crud.field.submitCU">确认</el-button>
        </div>
      </el-dialog>
      <el-dialog :close-on-click-modal="false" :visible.sync="pop.delEntity" :title="msg.delEntity" width="300px">
        <div slot="footer" class="dialog-footer">
          <el-button type="text" @click="doCancel">取消</el-button>
          <el-button type="primary" @click="toDelete">确认</el-button>
        </div>
      </el-dialog>
      <pagination>
        <div slot="left">
          <el-button
            v-permission="permission.entity.edit"
            icon="el-icon-check"
            type="primary"
            size="mini"
            style="margin-left: 20px"
            @click.native.stop="onSaveAll"
          >保存</el-button>
          <el-button
            v-permission="permission.entity.del"
            :disabled="disabled.entity"
            icon="el-icon-delete"
            type="danger"
            size="mini"
            style="margin-left: 20px"
            @click.native.stop="pop.delEntity = true"
          >删除</el-button>
        </div>
      </pagination>
      <draggable
        :model="crud.data"
        display="flex"
        class="entity-area"
        :group="{name: 'entity-area-group', pull: false, put: true}"
        chosen-class="chosen"
        animation="300"
        @add="onAdd"
        @click.native="onAreaClick"
      >
        <EREntity
          v-for="item in crud.data"
          :key="item.id"
          :selected="item.id === current.entityId"
          :data="item"
          :type="toolEntity[item.type-1].type"
          :title="item.name"
          :comment="item.title"
          :width="120"
          :height="120"
          @selected="onSelected"
          @keyup="onKeyUp"
        />
      </draggable>
    </el-main>
    <el-aside>
      <el-collapse v-model="active.entity">
        <el-collapse-item title="实体信息" name="1">
          <div slot="title">
            实体信息
          </div>
          <MyForm
            label-width="50px"
            size="small"
            :datas="current.entity"
            :disabled="disabled.entity"
            :rule="rules.entity"
            :columns="columns.entity.slice(0, 4)"
            :dicts="dict"
          />
        </el-collapse-item>
        <el-collapse-item title="属性列表" name="2">
          <div slot="title">
            属性列表
            <el-button
              v-permission="permission.field.add"
              :disabled="disabled.entity"
              icon="el-icon-plus"
              type="success"
              circle
              size="mini"
              style="margin-left: 20px"
              @click.native.stop="onFieldAdd"
            />
            <el-button
              v-permission="permission.field.edit"
              :disabled="disabled.entity"
              icon="el-icon-check"
              type="primary"
              circle
              size="mini"
              style="margin-left: 20px"
              @click.native.stop="Crud.field.editAll(Crud.field.data)"
            />
          </div>
          <el-table
            v-loading="crud.loading"
            :data="disabled.entity?[]:Crud.field.data"
            size="small"
            style="width: 100%"
            stripe
            border
            highlight-current-row
            max-height="250px"
            crud-tag="field"
            :header-cell-style="{background:'#409eff',color:'#fff'}"
            @current-change="onSelectField"
          >
            <el-table-column
              prop="name"
              label="名称"
              width="100px"
            />
            <el-table-column
              prop="comment"
              label="描述"
            />
            <el-table-column
              fixed="right"
              label="操作"
              width="50px"
            >
              <template slot-scope="scope">
                <el-button
                  v-if="crud.optShow.del"
                  slot="reference"
                  v-permission="permission.field.del"
                  icon="el-icon-delete"
                  type="danger"
                  size="mini"
                  circle
                  crud-tag="field"
                  :disabled="scope.row === null"
                  @click.native="Crud.field.doDelete(scope.row)"
                />
              </template>
            </el-table-column>
          </el-table>
          <MyForm
            ref="form"
            label-width="50px"
            size="small"
            :datas="current.field"
            :disabled="disabled.field"
            :rule="rules.field"
            :columns="columns.field"
            :dicts="dict"
            :shortcuts="shortcuts.field"
          />
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

