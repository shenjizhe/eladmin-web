<template>
  <el-container class="study-container">
    <el-dialog :title="studyTitle" :visible.sync="show.review" class="dialog-class">
      <div v-if="study.isMorpheme">
        <el-col :span="10">
          <el-input v-model="study.morpheme.text" :span="12" />
        </el-col>
        <el-col :span="4">
          <el-button type="success" :span="12" @click="show.morphemeAnswer = !show.morphemeAnswer">显示</el-button>
        </el-col>
        <el-col :span="10">
          <el-input v-if="show.morphemeAnswer" v-model="study.morpheme.meaningChinese" :span="12" />
        </el-col>
      </div>
      <div v-if="!study.isMorpheme">
        <el-row>
          <el-col :span="15">
            <el-input v-model="study.word.text" :span="12" />
          </el-col>
          <el-col :span="3">
            <el-button type="success" :span="12" @click="show.wordAnswer = !show.wordAnswer">&lt;显示</el-button>
          </el-col>
          <el-col :span="3">
            <el-button type="info" @click="speakText(study.word.text)">读音</el-button>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" @click="show.deductAnswer = !show.deductAnswer">推导&gt;</el-button>
          </el-col>
        </el-row>
        <div v-if="show.wordAnswer">
          <el-row v-for="meaning in study.word.meanings" :key="meaning.id">
            <el-row>
              <el-input v-model="meaning.meaningEnglish" class="class-tool" />
            </el-row>
            <el-row>
              <el-input v-model="meaning.meaningChinese" :span="12" />
            </el-row>
          </el-row>
        </div>
        <div v-if="show.deductAnswer">
          <el-input v-model="study.word.deduction" type="textarea" :span="12" class="class-info" />
          <el-row v-for="(deduct) in study.word.deductions" :key="deduct.id">
            <el-col :span="12">
              <el-input v-model="deduct.fullText" :span="12" class="class-source" />
            </el-col>
            <el-col :span="12">
              <el-input v-model="deduct.meaningChinese" :span="12" />
            </el-col>
          </el-row>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveReview(1)">简单(1)</el-button>
        <el-button type="warning" @click="saveReview(2)">模糊(2)</el-button>
        <el-button type="danger" @click="saveReview(3)">不记得(3)</el-button>
      </div>
    </el-dialog>
    <el-main class="center-container">
      <div v-show="show.morpheme" class="morpheme-panel">
        <el-form ref="form" :model="pair.morphemeStudy" label-width="80px">
          <el-form-item label="词根">
            <el-input v-model="pair.morphemeStudy.text" readonly class="class-title" @dblclick.native="onDbClick" />
          </el-form-item>
          <el-form-item v-show="show.morphemeMeaning" label="含义" label-class="white-label">
            <el-col :span="12">
              <el-input v-model="pair.morphemeStudy.meaningEnglish" readonly class="class-main" @dblclick.native="onDbClick" />
            </el-col>
            <el-col :span="12">
              <el-input v-model="pair.morphemeStudy.meaningChinese" readonly class="class-info" />
            </el-col>
          </el-form-item>
          <el-form-item v-for="item in pair.morphemeStudy.items" v-show="show.morphemeInfo" :key="item.id">
            <span slot="label">
              <span style="color: rgb(241,96,238)">{{ item.text }}</span>
            </span>
            <el-input v-model="item.source" readonly class="class-info" />
          </el-form-item>
          <el-form-item v-show="show.morphemeInfo" label="词源" label-class="white-label">
            <el-input v-model="pair.morphemeStudy.description" type="textarea" readonly rows="7" class="class-meaning" @dblclick.native="onDbClick" />
          </el-form-item>
        </el-form>
        <el-checkbox v-model="show.morpheme">词根</el-checkbox>
        <el-checkbox v-model="show.morphemeMeaning">词根含义</el-checkbox>
        <el-checkbox v-model="show.morphemeInfo">词根信息</el-checkbox>
      </div>
      <v-touch
        tag="div"
        class="word-panel"
        @swipeleft="showNext"
        @swiperight="showPrevious"
        @swipeup="mode += 1"
        @swipedown="mode -= 1"
      >
        <el-form ref="form" :model="pair.word" label-width="60px">
          <el-form-item label="单词">
            <el-col :span="8">
              <el-input v-show="show.word" v-model="pair.word.text" readonly class="class-title" @dblclick.native="onDbClick" />
            </el-col>
            <el-col :span="6">
              <el-input v-show="show.sound" v-model="pair.word.phonetic" readonly class="class-tool" />
            </el-col>
            <el-col :span="4">
              <el-input v-show="show.sound" v-model="pair.word.nature" readonly class="class-info" />
            </el-col>
            <el-col :span="6">
              <el-button type="success" icon="el-icon-video-play" @click="speakText(pair.word.text)">开始朗读(Enter)</el-button>
            </el-col>
          </el-form-item>
          <el-form-item v-for="(item,index) in pair.word.deductions" v-show="show.deduct" :key="item.id">
            <span slot="label">
              <span>
                <el-tag :type="getDetectionType(index)">{{ index }}</el-tag>
              </span>
            </span>
            <el-col :span="8">
              <el-input v-model="item.fullText" readonly class="class-source" @dblclick.native="onDbClick" />
            </el-col>
            <el-col :span="6">
              <el-input v-show="show.deductInfo" v-model="item.meaningChinese" readonly class="class-info" />
            </el-col>
            <el-col :span="6">
              <el-input v-show="show.deductInfo" v-model="item.sourceText" readonly class="class-tip" @dblclick.native="onDbClick" />
            </el-col>
            <el-col :span="4">
              <el-button type="info" icon="el-icon-video-play" @click="speakText(item.sourceText)">读音</el-button>
            </el-col>
          </el-form-item>
          <el-form-item v-show="show.deductInfo" label="推导">
            <el-col :span="24">
              <el-input v-model="pair.word.deduction" type="textarea" readonly class="class-example" @dblclick.native="onDbClick" />
            </el-col>
          </el-form-item>
          <el-form-item v-for="(item,index) in pair.word.meanings" v-show="show.meaning" :key="item.id">
            <span slot="label">
              <span>
                <el-tag :type="getDetectionType(index)">{{ item.nature }}</el-tag>
              </span>
            </span>
            <el-col :span="16">
              <el-input v-model="item.meaningChinese" readonly class="class-info" />
            </el-col>
            <el-col :span="4">
              <el-button type="info" icon="el-icon-video-play" @click="speakText(item.meaningEnglish)">读含义</el-button>
            </el-col>
            <el-col :span="4">
              <el-button type="info" icon="el-icon-video-play" @click="speakText(item.exampleSentenceEnglish)">读例子</el-button>
            </el-col>
            <el-col :span="24">
              <el-input v-model="item.meaningEnglish" readonly class="class-tip" @dblclick.native="onDbClick" />
            </el-col>
            <el-col :span="24">
              <el-input v-model="item.exampleSentenceChinese" readonly type="textarea" :autosize="{ minRows: 1, maxRows: 4}" class="class-info" />
            </el-col>
            <el-col :span="24">
              <el-input v-model="item.exampleSentenceEnglish" readonly type="textarea" :autosize="{ minRows: 1, maxRows: 4}" class="class-example" @dblclick.native="onDbClick" />
            </el-col>
          </el-form-item>
          <el-form-item v-show="show.explain" label="翻译">
            <quill-editor v-model="explain" :options="editorOption" class="explainEditor" />
          </el-form-item>
        </el-form>
        <el-checkbox v-model="show.word">单词</el-checkbox>
        <el-checkbox v-model="show.sound">声音</el-checkbox>
        <el-checkbox v-model="show.deduct">推导</el-checkbox>
        <el-checkbox v-model="show.deductInfo">推导信息</el-checkbox>
        <el-checkbox v-model="show.meaning">单词含义</el-checkbox>
        <el-checkbox v-model="show.explain">翻译开关</el-checkbox>
      </v-touch>
    </el-main>
    <el-footer class="foot-container">
      <div class="log-panel">
        <el-select v-model="mode" placeholder="模式">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="button-panel">
        <el-button type="primary" :disabled="isLast" @click="showNext">》</el-button>
        <el-button type="primary" :disabled="isFirst" @click="showPrevious">《</el-button>
        <el-button type="primary" @click="review">新</el-button>
        <el-button type="warning" @click="reviewWord">词</el-button>
        <el-button type="warning" @click="reviewMorpheme">根</el-button>
      </div>
    </el-footer>
  </el-container>
</template>

<script lang="js" src="./_index.js">
</script>

<style lang="scss">
@import "./_index.scss";
</style>
