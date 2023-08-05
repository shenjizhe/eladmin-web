import MyForm from '@/components/MyForm'
import { Morpheme } from '@/api/morpheme/Morpheme'

export default {
  name: 'MorphemeStudyComponent',
  props: {},
  components: { MyForm },
  helper: {},
  data() {
    return {
      text: '你好，欢迎使用语音合成功能',
      voices: [],
      selectedVoice: null,
      isFirst: false,
      isLast: false,
      options: [{
        value: 1,
        label: '学习模式'
      }, {
        value: 2,
        label: '复习模式'
      }, {
        value: 3,
        label: '极简模式'
      }, {
        value: 4,
        label: '单词模式'
      }, {
        value: 5,
        label: '读音模式'
      }],
      show: {
        morpheme: true,
        morphemeMeaning: true,
        morphemeInfo: true,
        word: true,
        deduct: true,
        sound: true,
        deductInfo: true,
        meaning: true,
        explain: true
      },
      explain: '',
      editorOption: {
        modules: {
          toolbar: []
        }
      },
      pair: {
        morphemeStudy: {
          id: 0,
          number: 0,
          index: 0,
          type: 0,
          description: '测试描述',
          source: '词源的描述',
          text: 'test text',
          meaningEnglish: 'test',
          meaningChinese: '测试',
          items: [
            {
              id: 0,
              description: '测试描述1',
              source: 'L',
              text: 'test1',
              meaningEnglish: 'test1',
              meaningChinese: '测试1'
            },
            {
              id: 1,
              description: '测试描述2',
              source: 'L',
              text: 'test2',
              meaningEnglish: 'test2',
              meaningChinese: '测试2'
            }
          ]
        },
        word: {
          id: 0,
          index: 0,
          nature: '',
          deduction: '',
          isDerive: '',
          text: '',
          description: '',
          phonetic: '',
          deductions: [
            {
              id: 0,
              affix: 0,
              fullText: '',
              isDerive: true,
              meaningChinese: '',
              meaningEnglish: '',
              morphemeText: '',
              nature: '',
              shape: 0,
              sourceText: ''
            }
          ],
          meanings: [
            {
              id: 0,
              meaningChinese: '',
              meaningEnglish: '',
              nature: ''
            }
          ]
        }
      }
    }
  },

  computed: {
    wordSound: {
      get() {
        const sound = './sounds/' + this.pair.word.text + '.mpga'
        return sound
      }
    }
  },

  watch: {},

  // vue 生命周期
  beforeCreate() {
    this.helper = new Morpheme()
  },

  created() {
  },

  beforeMount() {
    this.showCurrent()
  },

  mounted() {
    this.getVoices()
    this.checkFirst()
    this.checkLast()
    document.addEventListener('keydown', this.handleArrowKey)
  },

  beforeDestroy() {
  },

  destroyed() {
  },
  methods: {
    onChanged(value) {
      console.log(value)
      switch (value) {
        case 1:
          this.show.morpheme = true
          this.show.morphemeMeaning = true
          this.show.morphemeInfo = true
          this.show.word = true
          this.show.deduct = true
          this.show.sound = true
          this.show.deductInfo = true
          this.show.meaning = true
          this.show.explain = true
          break
        case 2:
          this.show.morpheme = true
          this.show.morphemeMeaning = true
          this.show.morphemeInfo = true
          this.show.word = true
          this.show.deduct = true
          this.show.sound = true
          this.show.deductInfo = false
          this.show.meaning = false
          this.show.explain = false
          break
        case 3:
          this.show.morpheme = true
          this.show.morphemeMeaning = true
          this.show.morphemeInfo = true
          this.show.word = true
          this.show.deduct = false
          this.show.sound = true
          this.show.deductInfo = false
          this.show.meaning = false
          this.show.explain = false
          break
        case 4:
          this.show.morpheme = false
          this.show.morphemeMeaning = false
          this.show.morphemeInfo = false
          this.show.word = true
          this.show.deduct = true
          this.show.sound = true
          this.show.deductInfo = true
          this.show.meaning = true
          this.show.explain = true
          break
        case 5:
          this.show.morpheme = false
          this.show.morphemeMeaning = false
          this.show.morphemeInfo = false
          this.show.word = false
          this.show.deduct = false
          this.show.sound = true
          this.show.deductInfo = false
          this.show.meaning = false
          this.show.explain = false
          break
        default:
          console.log('default')
      }
    },
    onDbClick(event) {
      const start = event.target.selectionStart
      const end = event.target.selectionEnd
      var text = event.target.value
      text = text.substring(start, end)
      this.speakText(text)
      this.helper.transferWord(text)
        .then(response => {
          this.explain = response
        }).catch(error => {
          console.error(error)
        })
    },
    getVoices() {
      this.voices = speechSynthesis.getVoices()
    },
    speakText(text) {
      console.log('读音：' + text)
      if (!speechSynthesis.speaking) {
        const utterance = new SpeechSynthesisUtterance(text)
        utterance.voice = this.selectedVoice
        speechSynthesis.speak(utterance)
      }
    },
    showCurrent(row) {
      this.helper.current()
        .then(response => {
          this.pair = response
        }).catch(error => {
          this.$message({
            message: '取得数据失败: ' + error,
            type: 'fail'
          })
        })
    },
    showNext(row) {
      const helper = new Morpheme()
      helper.next()
        .then(response => {
          this.explain = ''
          this.pair = response
          this.checkLast()
          this.isFirst = false
        }).catch(error => {
          this.$message({
            message: '取得数据失败: ' + error,
            type: 'fail'
          })
        })
    },
    showPrevious(row) {
      const helper = new Morpheme()
      helper.previous()
        .then(response => {
          this.explain = ''
          this.pair = response
          this.checkFirst()
          this.isLast = false
        }).catch(error => {
          this.$message({
            message: '取得数据失败: ' + error,
            type: 'fail'
          })
        })
    },

    checkFirst(row) {
      const helper = new Morpheme()
      helper.isFirst()
        .then(response => {
          this.isFirst = response
        }).catch(error => {
          this.$message({
            message: '判断第一条失败: ' + error,
            type: 'fail'
          })
        })
    },

    checkLast(row) {
      const helper = new Morpheme()
      helper.isLast()
        .then(response => {
          this.isLast = response
        }).catch(error => {
          this.$message({
            message: '判断最后一条失败: ' + error,
            type: 'fail'
          })
        })
    },

    getDetectionType(index) {
      switch (index) {
        case 0: return ''
        case 1: return 'success'
        case 2: return 'danger'
        case 3: return 'info'
        default: return 'warning'
      }
    },
    handleArrowKey(event) {
      if (event.key === 'ArrowLeft') {
        if (!this.isFirst) {
          this.showPrevious()
        }
      } else if (event.key === 'ArrowRight') {
        if (!this.isLast) {
          this.showNext()
        }
      } else if (event.key === 'Enter') {
        this.speakText(this.pair.word.text)
      }
    }
  }
}
