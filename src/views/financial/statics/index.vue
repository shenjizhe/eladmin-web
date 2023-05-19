<template>
  <el-container class="statics-container">
    <el-aside class="left-container">
      <el-card class="box-card">
        <!--          <div v-for="o in 4" :key="o" class="text item">-->
        <!--            {{'列表内容 ' + o }}-->
        <el-row>
          <el-col :x-s="24" :sm="12" class="infoHead">{{ statics.stock.name }}</el-col>
          <el-col :x-s="24" :sm="12" class="infoHead">{{ statics.stock.code }}</el-col>
        </el-row>
        <el-row>
          <el-col :x-s="24" :sm="12">持仓数量</el-col>
          <el-col :x-s="24" :sm="12">{{ statics.holdCount }}</el-col>
        </el-row>
        <el-row>
          <el-col :x-s="24" :sm="12">持有单价</el-col>
          <el-col :x-s="24" :sm="12">{{ statics.holdPriceAvg }}</el-col>
        </el-row>
        <el-row>
          <el-col :x-s="24" :sm="12">平均时期</el-col>
          <el-col :x-s="24" :sm="12">{{ formatDate(statics.holdDateAvg) }}</el-col>
        </el-row>
        <el-row>
          <el-col :x-s="24" :sm="12">持股总价</el-col>
          <el-col :x-s="24" :sm="12">{{ statics.holdPriceTotal }}</el-col>
        </el-row>
        <el-row>
          <el-col :x-s="24" :sm="12" class="infoHead">市场平均</el-col>
          <el-col :x-s="24" :sm="12" class="infoHead">{{ statics.analysis.priceAvg }}</el-col>
        </el-row>
        <el-row>
          <el-col :x-s="24" :sm="12">参考价格</el-col>
          <el-col :x-s="24" :sm="12">{{ statics.analysis.priceLow }} - {{ statics.analysis.priceHigh }}</el-col>
        </el-row>
        <el-row>
          <el-col :x-s="24" :sm="12">参考 90</el-col>
          <el-col :x-s="24" :sm="12">{{ statics.analysis.priceLow90 }} - {{ statics.analysis.priceHigh90 }}</el-col>
        </el-row>
        <el-row>
          <el-col :x-s="24" :sm="12">参考 70</el-col>
          <el-col :x-s="24" :sm="12">{{ statics.analysis.priceLow70 }} - {{ statics.analysis.priceHigh70 }}</el-col>
        </el-row>
      </el-card>
    </el-aside>
    <el-main class="center-container" />
    <el-aside class="right-container" />
  </el-container>
</template>
<script lang="js" src="./_index.js">
</script>

<style lang="scss">
@import "./index";
</style>

