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
          >
            <span slot-scope="{ node, data }" class="custom-tree-node">
              <span>{{ data.id }}</span>
              <span>{{ node.label }}</span>
              <svg-icon :icon-class="getBlockLevelClass(data.data.level)" />
            </span>
          </el-tree>
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
      >
        <el-tab-pane
          v-for="(item) in blockTabs"
          :key="item.name"
          :label="item.title"
          :name="item.name"
          closable
          @show.native="showCoder"
        >
          <div>
            <textarea :ref="'textarea_'+item.name" v-model="item.data.code" />
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

