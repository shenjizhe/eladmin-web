<template>
  <el-container class="template-ide">
    <el-aside>
      <el-tabs
        v-model="active.tabs"
        type="border-card"
      >
        <el-tab-pane label="模板" name="template">
          <el-collapse v-model="active.template" style="height: 100%">
            <el-collapse-item title="模板信息" name="1">
              <MyForm
                label-width="50px"
                size="small"
                :datas="current.template"
                :rule="rules.template"
                :columns="columns.template"
                :dicts="dict"
                :disabled="disabled.template"
              />
            </el-collapse-item>
          </el-collapse>
        </el-tab-pane>
        <el-tab-pane label="模板块" name="template-block">
          <el-dialog
            :close-on-click-modal="false"
            :before-close="Crud.block.cancelCU"
            :visible.sync="Crud.block.status.cu > 0"
            :title="Crud.block.status.title"
            width="500px"
          >
            <MyForm
              ref="form"
              :datas="Crud.block.form"
              :rule="rules.block"
              :columns="columns.block_new"
              :dicts="dict"
            />
            <div slot="footer" class="dialog-footer">
              <el-button type="text" @click="Crud.block.cancelCU">取消</el-button>
              <el-button :loading="Crud.block.status.cu === 2" type="primary" @click="Crud.block.submitCU">确认</el-button>
            </div>
          </el-dialog>
          <div>
            <el-button
              v-permission="permission.block.add"
              :disabled="disabled.template"
              icon="el-icon-plus"
              type="success"
              size="mini"
              circle
              @click.native.stop="Crud.block.toEdit()"
            />
            <el-button
              v-permission="permission.block.edit"
              :disabled="disabled.block"
              icon="el-icon-check"
              type="primary"
              size="mini"
              circle
              @click.native.stop="onSaveBlock"
            />
          </div>
          <el-tree
            ref="tree"
            :data="blocks"
            :props="treeProps.block"
            node-key="id"
            default-expand-all
            draggable
            highlight-current
            @node-click="handleNodeClick"
          >
            <span slot-scope="{ node, data }" class="custom-tree-node">
              <span>{{ node.label }}</span>
              <svg-icon :icon-class="getBlockLevelClass(data.data.level)" />
            </span>
          </el-tree>
        </el-tab-pane>
        <el-tab-pane name="theme-pane">
          <div slot="label">
            <el-select
              v-model="_theme"
              placeholder="请选择主题"
            >
              <el-option
                v-for="item in dict.code_theme"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-aside>
    <el-main class="code">
      <div
        v-if="blockTabs.length === 0"
        class="empty-div"
      />
      <el-tabs
        v-if="blockTabs.length > 0"
        v-model="active.block"
        type="border-card"
        @tab-click="clickTab"
        @tab-remove="removeTab"
      >
        <el-tab-pane
          v-for="(item) in blockTabs"
          :key="item.name"
          :label="item.title"
          :name="item.name"
          closable
        >
          <div>
            <textarea
              :ref="'textarea_'+item.name"
              v-model="item.data.code"
            />
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-main>
    <el-aside>
      <el-tabs
        v-model="active.property"
        type="border-card"
      >
        <el-tab-pane label="块信息" name="block-info">
          <el-collapse v-model="active.infos" style="height: 100%">
            <el-collapse-item title="模板信息" name="1">
              <MyForm
                label-width="50px"
                size="small"
                :datas="current.block"
                :rule="rules.block"
                :columns="columns.block"
                :dicts="dict"
                :disabled="disabled.block"
              />
            </el-collapse-item>
          </el-collapse>
        </el-tab-pane>
        <el-tab-pane label="上下文" name="context">
          <el-dialog
            :close-on-click-modal="false"
            :before-close="Crud.context.cancelCU"
            :visible.sync="Crud.context.status.cu > 0"
            :title="Crud.context.status.title"
            width="500px"
          >
            <MyForm
              ref="form"
              :datas="Crud.context.form"
              :rule="rules.context"
              :columns="columns.context"
              :dicts="dict"
            />
            <div slot="footer" class="dialog-footer">
              <el-button type="text" @click="Crud.context.cancelCU">取消</el-button>
              <el-button :loading="Crud.context.status.cu === 2" type="primary" @click="Crud.context.submitCU">确认</el-button>
            </div>
          </el-dialog>
          <el-collapse v-model="active.context" style="height: 100%">
            <el-collapse-item title="上下文" name="1">
              <div slot="title">
                上下文
                <el-button
                  v-permission="permission.context.add"
                  :disabled="disabled.template"
                  icon="el-icon-plus"
                  type="success"
                  circle
                  size="mini"
                  style="margin-left: 20px"
                  @click.native.stop="onContextAdd"
                />
              </div>
              <el-input
                v-model="keyword"
                placeholder="请输入关键字"
                prefix-icon="el-icon-search"
              />
              <el-table
                ref="table"
                v-loading="Crud.context.loading"
                :data="context"
                size="small"
                style="width: 100%"
                stripe
                border
                highlight-current-row
                crud-tag="context"
                :header-cell-style="{background:'#409eff',color:'#fff'}"
                @current-change="onSelectContext"
              >
                <el-table-column prop="key" label="关键字" />
                <el-table-column
                  v-if="checkPer(['admin','templateContext:edit','templateContext:del'])"
                  label="操作"
                  width="150px"
                  align="center"
                >
                  <template slot-scope="scope">
                    <div v-if="!showOperatorButton(scope.row)">
                      全局上下文
                    </div>
                    <el-button
                      v-if="showOperatorButton(scope.row)"
                      v-permission="permission.context.edit"
                      crud-tag="context"
                      :loading="Crud.context.status.cu === 2"
                      :disabled="scope.row === null"
                      size="mini"
                      type="primary"
                      icon="el-icon-edit"
                      circle
                      @click="Crud.context.toEdit(scope.row)"
                    />
                    <el-button
                      v-if="showOperatorButton(scope.row)"
                      v-permission="permission.context.del"
                      crud-tag="context"
                      icon="el-icon-delete"
                      type="danger"
                      size="mini"
                      circle
                      :disabled="scope.row === null"
                      @click.native="Crud.context.doDelete(scope.row)"
                    />
                  </template>
                </el-table-column>
              </el-table>
            </el-collapse-item>
          </el-collapse>
        </el-tab-pane>
      </el-tabs>
    </el-aside>
  </el-container>
</template>

<script lang="js" src="./_template-ide.js">
</script>

<style lang="scss">
@import "./_template-ide.scss";
</style>

