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
          <el-col :x-s="24" :sm="12">{{ formattedDate }}</el-col>
        </el-row>
        <el-row>
          <el-col :x-s="24" :sm="12">平均天数</el-col>
          <el-col :x-s="24" :sm="12">{{ statics.priceReference.holdDays }}</el-col>
        </el-row>
        <el-row>
          <el-col :x-s="24" :sm="12">持股总价</el-col>
          <el-col :x-s="24" :sm="12">{{ statics.holdPriceTotal }}</el-col>
        </el-row>
        <el-row class="infoHead">
          <el-col :x-s="24" :sm="12">价值参考</el-col>
          <el-col :x-s="24" :sm="12">{{ statics.priceReference.priceWorth }}</el-col>
        </el-row>
        <el-row>
          <el-col :x-s="24" :sm="12">平均参考</el-col>
          <el-col :x-s="24" :sm="12">{{ statics.priceReference.priceRefer }}</el-col>
        </el-row>
        <el-row>
          <el-col :x-s="24" :sm="12">短期参考</el-col>
          <el-col :x-s="24" :sm="12">{{ statics.priceReference.priceGoal }}</el-col>
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
        <el-row style="background-color: #f56c6c">
          <el-col :x-s="24" :sm="12">卖3</el-col>
          <el-col :x-s="24" :sm="12">{{ statics.level.levelSell3 }}</el-col>
        </el-row>
        <el-row style="background-color: #fbe1e1">
          <el-col :x-s="24" :sm="12">卖2</el-col>
          <el-col :x-s="24" :sm="12">{{ statics.level.levelSell2 }}</el-col>
        </el-row>
        <el-row style="background-color: #fcefef">
          <el-col :x-s="24" :sm="12">卖1</el-col>
          <el-col :x-s="24" :sm="12">{{ statics.level.levelSell1 }}</el-col>
        </el-row>
        <el-row>
          <el-col :x-s="24" :sm="12">卖</el-col>
          <el-col :x-s="24" :sm="12">{{ statics.level.levelSell }}</el-col>
        </el-row>
        <el-row>
          <el-col :x-s="24" :sm="12">买</el-col>
          <el-col :x-s="24" :sm="12">{{ statics.level.levelBuy }}</el-col>
        </el-row>
        <el-row style="background-color: #eff8ea">
          <el-col :x-s="24" :sm="12">补1</el-col>
          <el-col :x-s="24" :sm="12">{{ statics.level.levelBuy1 }}</el-col>
        </el-row>
        <el-row style="background-color: #e0f2d7">
          <el-col :x-s="24" :sm="12">补2</el-col>
          <el-col :x-s="24" :sm="12">{{ statics.level.levelBuy2 }}</el-col>
        </el-row>
        <el-row style="background-color: #67c23a">
          <el-col :x-s="24" :sm="12">补3</el-col>
          <el-col :x-s="24" :sm="12">{{ statics.level.levelBuy3 }}</el-col>
        </el-row>
      </el-card>
    </el-aside>
    <el-main class="center-container">
      <div id="mychart" style="width: 100%;height: 50%" />
    </el-main>
    <el-aside class="right-container" />
  </el-container>
</template>
<script lang="js" src="./_index.js">
</script>

<style lang="scss">
@import "./index";
</style>
