import MyForm from '@/components/MyForm'
import { Morpheme } from '@/api/morpheme/Morpheme'
import { add as eventAdd } from '@/api/studyEvent'
import screenfull from 'screenfull'

export default {
  name: 'MorphemeStudyComponent',
  props: {},
  components: { MyForm },
  data() {
    return {
      uuid: 0,
      mode: 7,
      helper: null,
      study: {
        index: 0,
        morphemeIndex: 0,
        wordIndex: 0,
        isMorpheme: true,
        word: {},
        morpheme: {}
      },
      todayData: {
        date: '',
        morphemes: [],
        words: []
      },
      todayWords: [],
      todayMorpheme: [],
      meaningIndex: 0,
      exampleIndex: 0,
      permission: {
        add: ['admin', 'morpheme:add'],
        edit: ['admin', 'morpheme:edit'],
        del: ['admin', 'morpheme:del']
      },
      text: '你好，欢迎使用语音合成功能',
      voices: [],
      selectedVoice: null,
      isFirst: false,
      isLast: false,
      options: [{
        value: 7,
        label: '学习模式'
      }, {
        value: 6,
        label: '翻译模式'
      }, {
        value: 5,
        label: '含义模式'
      }, {
        value: 4,
        label: '推导模式'
      }, {
        value: 3,
        label: '词根模式'
      }, {
        value: 2,
        label: '读音模式'
      }, {
        value: 1,
        label: '单词模式'
      }, {
        value: 0,
        label: '最简模式'
      }],
      show: {
        review: false,
        morphemeAnswer: false,
        wordAnswer: false,
        deductAnswer: false,
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
          description: '',
          source: '',
          text: '',
          meaningEnglish: '',
          meaningChinese: '',
          items: [
            {
              id: 0,
              description: '',
              source: '',
              text: '',
              meaningEnglish: '',
              meaningChinese: ''
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
          deductions: [],
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
    },
    studyTitle: {
      get() {
        const title = this.todayData.date + '  词根：(' + (this.study.morphemeIndex + 1) + ' / ' + this.todayData.morphemes.length + ')  单词：(' + (this.study.wordIndex + 1) + ' / ' + this.todayData.words.length + ')'
        return title
      }
    }
  },

  watch: {
    mode: {
      handler(newVal, oldVal) {
        if (newVal > 7) {
          this.mode = 7
        } else if (newVal < 0) {
          this.mode = 0
        } else {
          this.mode = newVal
        }
        switch (this.mode) {
          case 7: // 学习模式
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
          case 6: // 翻译模式
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
          case 5: // 含义模式
            this.show.morpheme = false
            this.show.morphemeMeaning = false
            this.show.morphemeInfo = false
            this.show.word = true
            this.show.deduct = true
            this.show.sound = true
            this.show.deductInfo = true
            this.show.meaning = true
            this.show.explain = false
            break
          case 4: // 推导模式
            this.show.morpheme = false
            this.show.morphemeMeaning = false
            this.show.morphemeInfo = false
            this.show.word = true
            this.show.deduct = true
            this.show.sound = true
            this.show.deductInfo = true
            this.show.meaning = false
            this.show.explain = false
            break
          case 3: // 词根模式
            this.show.morpheme = false
            this.show.morphemeMeaning = false
            this.show.morphemeInfo = false
            this.show.word = true
            this.show.deduct = true
            this.show.sound = true
            this.show.deductInfo = false
            this.show.meaning = false
            this.show.explain = false
            break
          case 2: // 读音模式
            this.show.morpheme = false
            this.show.morphemeMeaning = false
            this.show.morphemeInfo = false
            this.show.word = true
            this.show.deduct = false
            this.show.sound = true
            this.show.deductInfo = false
            this.show.meaning = false
            this.show.explain = false
            break
          case 1: // 单词模式
            this.show.morpheme = false
            this.show.morphemeMeaning = false
            this.show.morphemeInfo = false
            this.show.word = true
            this.show.deduct = false
            this.show.sound = false
            this.show.deductInfo = false
            this.show.meaning = false
            this.show.explain = false
            break
          case 0: // 最简模式
            this.show.morpheme = false
            this.show.morphemeMeaning = false
            this.show.morphemeInfo = false
            this.show.word = false
            this.show.deduct = false
            this.show.sound = false
            this.show.deductInfo = false
            this.show.meaning = false
            this.show.explain = false
            break
          default:
            console.log('default')
        }
      }
    }
  },

  // vue 生命周期
  beforeCreate() {
  },

  created() {
  },

  beforeMount() {
    this.helper = new Morpheme()
    this.helper.uuid()
      .then(response => {
        this.uuid = response
      }).catch(error => {
        this.$message({
          message: '取得用户ID失败: ' + error,
          type: 'fail'
        })
      })
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
    onDbClick(event) {
      const start = event.target.selectionStart
      const end = event.target.selectionEnd
      let text = event.target.value
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
      this.helper.next()
        .then(response => {
          this.explain = ''
          this.pair = response
          this.checkLast()
          this.isFirst = false
          this.meaningIndex = 0
          this.exampleIndex = 0
        }).catch(error => {
          this.$message({
            message: '取得数据失败: ' + error,
            type: 'fail'
          })
        })
    },
    showPrevious(row) {
      this.helper.previous()
        .then(response => {
          this.explain = ''
          this.pair = response
          this.checkFirst()
          this.isLast = false
          this.meaningIndex = 0
          this.exampleIndex = 0
        }).catch(error => {
          this.$message({
            message: '取得数据失败: ' + error,
            type: 'fail'
          })
        })
    },
    reset() {
      this.study.index = 0
      this.study.morphemeIndex = 0
      this.study.wordIndex = 0
    },
    review() {
      this.helper.getNewDatas()
        .then(response => {
          this.todayData = response
          if (!this.checkEmpty()) {
            this.reset()
            this.showView()
            this.show.review = true
          } else {
            this.$message({
              message: '不需要复习',
              type: 'warning'
            })
          }
        }).catch(error => {
          this.$message({
            message: '取得当天数据失败: ' + error,
            type: 'fail'
          })
        })
    },
    checkEmpty() {
      return this.todayData.words.length === 0 && this.todayData.morphemes.length === 0
    },
    reviewMorpheme() {
      this.helper.needReviewMorphemes()
        .then(response => {
          this.todayData.morphemes = response
          this.todayData.words = []
          if (!this.checkEmpty()) {
            this.reset()
            this.showView()
            this.show.review = true
          } else {
            this.$message({
              message: '不需要复习',
              type: 'warning'
            })
          }
        }).catch(error => {
          this.$message({
            message: '取得当天数据失败: ' + error,
            type: 'fail'
          })
        })
    },

    reviewWord() {
      this.helper.needReviewWords()
        .then(response => {
          this.todayData.words = response
          this.todayData.morphemes = []
          if (!this.checkEmpty()) {
            this.reset()
            this.showView()
            this.show.review = true
          } else {
            this.$message({
              message: '不需要复习',
              type: 'warning'
            })
          }
        }).catch(error => {
          this.$message({
            message: '取得当天数据失败: ' + error,
            type: 'fail'
          })
        })
    },

    saveReview(type) {
      let event = {}
      if (this.study.isMorpheme) {
        event = {
          uid: this.uuid,
          time: new Date(),
          event: 'review',
          content: type,
          morphemeId: this.study.morpheme.id
        }
        this.helper.reviewMorpheme(event.morphemeId, type)
          .then(response => {
            this.$message({
              message: type === 1 ? '简单' : type === 2 ? '模糊' : '不记得',
              type: type === 1 ? 'success' : type === 2 ? 'warning' : 'error'
            })
          })
      } else {
        event = {
          uid: this.uuid,
          time: new Date(),
          event: 'review',
          content: type,
          wordId: this.study.word.id
        }
        this.helper.reviewWord(event.wordId, type)
          .then(response => {
            this.$message({
              message: type === 1 ? '简单' : type === 2 ? '模糊' : '不记得',
              type: type === 1 ? 'success' : type === 2 ? 'warning' : 'error'
            })
          })
      }

      eventAdd(event)

      this.study.index += 1
      this.showView()
    },

    showView() {
      this.show.morphemeAnswer = false
      this.show.wordAnswer = false
      this.show.deductAnswer = false
      const ml = this.todayData.morphemes.length
      const wl = this.todayData.words.length
      const total = ml + wl
      console.log(ml, wl, total, this.study.index)

      if (this.study.index < ml) {
        this.study.isMorpheme = true
        this.study.morphemeIndex = this.study.index
        this.study.morpheme = this.todayData.morphemes[this.study.morphemeIndex]
        console.log('morpheme:', this.study.morpheme)
      } else if (this.study.index < total) {
        this.study.isMorpheme = false
        this.study.wordIndex = this.study.index - ml
        this.study.word = this.todayData.words[this.study.wordIndex]
        console.log('word:', this.study.word)
      } else {
        console.log('out...')
        this.show.review = false
        this.study.isMorpheme = true
        this.study.index = 0
        this.study.wordIndex = 0
        this.study.morphemeIndex = 0
      }
    },

    checkFirst(row) {
      this.helper.isFirst()
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
      console.log(event)
      const meanings = this.pair.word.meanings
      if (this.show.review) {
        if (!this.study.isMorpheme) {
          if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            this.speakText(this.study.word.text)
          } else if (event.key === 'ArrowRight') {
            this.show.deductAnswer = !this.show.deductAnswer
          } else if (event.key === 'ArrowLeft') {
            this.show.wordAnswer = !this.show.wordAnswer
          }
        } else {
          if (event.key === 'ArrowLeft') {
            this.show.morphemeAnswer = !this.show.morphemeAnswer
          }
        }
        if (event.key === '1') {
          this.saveReview(1)
        } else if (event.key === '2') {
          this.saveReview(2)
        } else if (event.key === '3') {
          this.saveReview(3)
        }
      } else {
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
        } else if (event.key === 'ArrowUp') {
          this.mode = this.mode + 1
        } else if (event.key === 'ArrowDown') {
          this.mode = this.mode - 1
        } else if (event.key === '-') {
          if (meanings.length > 0) {
            this.speakText(meanings[this.meaningIndex].meaningEnglish)
            if (this.meaningIndex < meanings.length - 1) {
              this.meaningIndex += 1
            } else {
              this.meaningIndex = 0
            }
          }
        } else if (event.key === '+') {
          if (meanings.length > 0) {
            this.speakText(meanings[this.exampleIndex].exampleSentenceEnglish)
            if (this.exampleIndex < meanings.length - 1) {
              this.exampleIndex += 1
            } else {
              this.exampleIndex = 0
            }
          }
        } else if (event.altKey && event.key === 'n') {
          this.review()
        } else if (event.altKey && event.key === 'w') {
          this.reviewWord()
        } else if (event.altKey && event.key === 'm') {
          this.reviewMorpheme()
        } else if (event.key === 'F8') {
          screenfull.toggle()
        } else {
          if (parseInt(event.key) !== 'NaN') {
            const number = parseInt(event.key)
            this.mode = number
          }
        }
      }
    }
  }
}
