<template>
  <el-container class="study-container">
    <el-main class="center-container">
      <div class="morpheme-panel">
        <el-form ref="form" :model="pair.morphemeStudy" label-width="80px">
          <el-form-item label="词根">
            <el-input v-model="pair.morphemeStudy.text" readonly />
          </el-form-item>
          <el-form-item label="英文" label-class="white-label">
            <el-input v-model="pair.morphemeStudy.meaningEnglish" readonly />
          </el-form-item>
          <el-form-item label="中文" label-class="white-label">
            <el-input v-model="pair.morphemeStudy.meaningChinese" readonly />
          </el-form-item>
          <el-form-item v-for="item in pair.morphemeStudy.items" :key="item.id">
            <span slot="label">
              <span style="color: rgb(43,120,227)">{{ item.text }}</span>
            </span>
            <el-input v-model="item.source" readonly />
          </el-form-item>
          <el-form-item label="词源" label-class="white-label">
            <el-input v-model="pair.morphemeStudy.description" type="textarea" readonly rows="5" />
          </el-form-item>
        </el-form>
      </div>
      <div class="word-panel">
        <el-form ref="form" :model="pair.word" label-width="60px">
          <el-form-item label="单词">
            <el-col :span="12">
              <el-input v-model="pair.word.text" readonly />
            </el-col>
            <el-col :span="6">
              <el-input v-model="pair.word.nature" readonly />
            </el-col>
            <el-col :span="6">
              <el-button type="success" icon="el-icon-video-play" @click="speak">开始朗读</el-button>
            </el-col>
          </el-form-item>
          <el-form-item v-for="(item,index) in pair.word.deductions" :key="index">
            <span slot="label">
              <span>
                <el-tag :type="getDetectionType(index)">{{ index }}</el-tag>
              </span>
            </span>
            <el-col :span="12">
              <el-input v-model="item.fullText" readonly />
            </el-col>
            <el-col :span="6">
              <el-input v-model="item.meaningChinese" readonly />
            </el-col>
            <el-col :span="6">
              <el-input v-model="item.sourceText" readonly />
            </el-col>
          </el-form-item>
          <el-form-item label="推导">
            <el-col :span="24">
              <el-input v-model="pair.word.deduction" readonly />
            </el-col>
          </el-form-item>
          <el-form-item v-for="(item,index) in pair.word.meanings" :key="index">
            <span slot="label">
              <span>
                <el-tag :type="getDetectionType(index)">{{ item.nature }}</el-tag>
              </span>
            </span>
            <el-col :span="8">
              <el-input v-model="item.meaningChinese" readonly />
            </el-col>
            <el-col :span="24">
              <el-input v-model="item.meaningEnglish" readonly />
            </el-col>
            <el-col :span="24">
              <el-input v-model="item.exampleSentenceEnglish" readonly />
            </el-col>
            <el-col :span="24">
              <el-input v-model="item.exampleSentenceChinese" readonly />
            </el-col>
          </el-form-item>
        </el-form>
      </div>
    </el-main>
    <el-footer class="foot-container">
      <div class="log-panel" />
      <div class="button-panel">
        <el-button type="primary" :disabled="isFirst" @click="showPrevious">上一词</el-button>
        <el-button type="primary" :disabled="isLast" @click="showNext">下一词</el-button>
      </div>
    </el-footer>
  </el-container>
</template>

<script lang="js" src="./_index.js">
</script>

<style lang="scss">
@import "./_index.scss";
</style>
