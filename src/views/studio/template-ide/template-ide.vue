<template>
  <el-container class="template-ide">
    <el-aside>
      <el-tabs v-model="active.tabs" type="card">
        <el-tab-pane label="模板" name="template">
          <el-collapse v-model="active.template">
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
          <el-tree
            ref="tree"
            :data="blocks"
            :props="treeProps.block"
            node-key="id"
            default-expand-all
            draggable
            highlight-current
            @node-click="handleNodeClick"
          />
        </el-tab-pane>
      </el-tabs>
    </el-aside>
    <el-main>
      <el-tabs v-model="active.blocks" type="border-card">
        <el-tab-pane label="代码示例" name="first">
          <div class="code">
            <textarea ref="textarea" v-model="code" />
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-main>
    <el-aside />
  </el-container>
</template>

<script lang="js" src="./_template-ide.js">
</script>

<style lang="scss">
@import "./_template-ide.scss";
</style>

