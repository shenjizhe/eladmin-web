import { Morpheme } from '@/api/morpheme/Morpheme'
import { add as eventAdd } from '@/api/studyEvent'

export default {
  name: 'MorphemeStudyComponent',
  props: {},
  components: {},
  data() {
    return {
      url: 'https://www.quword.com/root/',
      statics: {
        morphemeNew: 0,
        morphemeOld: 0,
        morphemeSimple: 0,
        morphemeConfuse: 0,
        morphemeForget: 0,
        wordNew: 0,
        wordOld: 0,
        wordSimple: 0,
        wordConfuse: 0,
        wordForget: 0,
        affixNew: 0,
        affixOld: 0,
        affixSimple: 0,
        affixConfuse: 0,
        affixForget: 0
      },
      search: {
        mode: false,
        word: {
          items: [],
          text: '',
          current: {}
        },
        morpheme: {
          items: [],
          text: '',
          current: {}
        },
        affix: {
          items: [],
          text: '',
          current: {}
        }
      },
      uuid: 0,
      mode: 7,
      helper: null,
      study: {
        index: 0,
        morphemeIndex: 0,
        affixIndex: 0,
        wordIndex: 0,
        type: 0, // 0-unknown ,1-morpheme 2-affix 3-word
        word: {},
        affix: {},
        morpheme: {}
      },
      todayData: {
        date: '',
        morphemes: [],
        affixes: [],
        words: []
      },
      todayWords: [],
      todayMorpheme: [],
      todayAffix: [],
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
        affixAnswer: false,
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
    modeMorpheme: {
      get() {
        if (this.search.mode) {
          return this.search.morpheme.current
        } else {
          return this.pair.morphemeStudy
        }
      }
    },
    modeWord: {
      get() {
        if (this.search.mode) {
          return this.search.word.current
        } else {
          return this.pair.word
        }
      }
    },
    wordSound: {
      get() {
        const sound = './sounds/' + this.pair.word.text + '.mpga'
        return sound
      }
    },
    studyTitle: {
      get() {
        const title = this.todayData.date +
          '  词根：(' + (this.study.morphemeIndex + 1) + ' / ' + this.todayData.morphemes.length +
          ')  词缀：(' + (this.study.affixIndex + 1) + ' / ' + (this.todayData.affixes != null ? this.todayData.affixes.length : 0) +
          ')  单词：(' + (this.study.wordIndex + 1) + ' / ' + this.todayData.words.length + ')'
        return title
      }
    },
    morphemeStatics: {
      get() {
        const text = '新学(' + this.statics.morphemeNew +
          ') 复习(' + this.statics.morphemeOld + ')' +
          ') - 简单(' + this.statics.morphemeSimple + ')' +
          ') 混淆(' + this.statics.morphemeConfuse + ')' +
          ') 忘记(' + this.statics.morphemeForget + ')'
        return text
      }
    },
    wordStatics: {
      get() {
        const text = '新学(' + this.statics.wordNew +
          ') 复习(' + this.statics.wordOld + ')' +
          ') - 简单(' + this.statics.wordSimple + ')' +
          ') 混淆(' + this.statics.wordConfuse + ')' +
          ') 忘记(' + this.statics.wordForget + ')'
        return text
      }
    },
    affixStatics: {
      get() {
        const text = '新学(' + this.statics.affixNew +
          ') 复习(' + this.statics.affixOld + ')' +
          ') - 简单(' + this.statics.affixSimple + ')' +
          ') 混淆(' + this.statics.affixConfuse + ')' +
          ') 忘记(' + this.statics.affixForget + ')'
        return text
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
        this.statics = response
      }).catch(error => {
        this.$message({
          message: '取得用户统计: ' + error,
          type: 'fail'
        })
      })
    this.getTodayStatics()
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
    getTodayStatics() {
      this.helper.getTodayStatics()
        .then(response => {
          this.statics = response
          console.log(this.statics)
        }).catch(error => {
          this.$message({
            message: '取得用户日统计失败: ' + error,
            type: 'fail'
          })
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
          this.getTodayStatics()
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
          this.getTodayStatics()
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
          this.getTodayStatics()
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
      this.study.affixIndex = 0
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
      let affixLength = 0
      if (this.todayData.affixes != null) {
        affixLength = this.todayData.affixes.length
      }
      return this.todayData.words.length === 0 && this.todayData.morphemes.length === 0 && affixLength === 0
    },
    reviewMorpheme() {
      this.helper.needReviewMorphemes()
        .then(response => {
          this.todayData.morphemes = response
          console.log(response)
          this.todayData.affixes = []
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

    reviewAffix() {
      this.helper.needReviewAffixes()
        .then(response => {
          this.todayData.affixes = response
          console.log(response)
          this.todayData.morphemes = []
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
            message: '取得当天词缀失败: ' + error,
            type: 'fail'
          })
        })
    },

    reviewWord() {
      this.helper.needReviewWords()
        .then(response => {
          this.todayData.words = response
          console.log(response)
          this.todayData.affixes = []
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
      if (this.study.type === 1) {
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
            this.getTodayStatics()
          })
      } else if (this.study.type === 2) {
        event = {
          uid: this.uuid,
          time: new Date(),
          event: 'review',
          content: type,
          affixId: this.study.affix.id
        }
        this.helper.reviewAffix(event.affixId, type)
          .then(response => {
            this.$message({
              message: type === 1 ? '简单' : type === 2 ? '模糊' : '不记得',
              type: type === 1 ? 'success' : type === 2 ? 'warning' : 'error'
            })
            this.getTodayStatics()
          })
      } else if (this.study.type === 3) {
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
            this.getTodayStatics()
          })
      }

      eventAdd(event)
      this.study.index += 1
      this.showView()
    },

    showView() {
      this.show.morphemeAnswer = false
      this.show.wordAnswer = false
      this.show.affixAnswer = false
      this.show.deductAnswer = false
      const ml = this.todayData.morphemes.length
      const wl = this.todayData.words.length
      const al = this.todayData.affixes.length
      const total = ml + wl

      console.log(al, ml, wl)

      if (al > 0) {
        this.study.type = 2
        this.study.affixIndex = this.study.index
        this.study.affix = this.todayData.affixes[this.study.affixIndex]
        console.log('affix:', this.study.affix)
      } else {
        if (this.study.index < ml) {
          this.study.type = 1
          this.study.morphemeIndex = this.study.index
          this.study.morpheme = this.todayData.morphemes[this.study.morphemeIndex]
          console.log('morpheme:', this.study.morpheme)
        } else if (this.study.index < total) {
          this.study.type = 3
          this.study.wordIndex = this.study.index - ml
          this.study.word = this.todayData.words[this.study.wordIndex]
          console.log('word:', this.study.word)
        } else {
          console.log('out...')
          this.show.review = false
          this.study.index = 0
          this.study.wordIndex = 0
          this.study.morphemeIndex = 0
          this.study.affixIndex = 0
        }
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

    handleSelect(item) {
      console.log(item)
    },

    searchMorpheme(morpheme) {
      console.log('search:', morpheme)
      this.helper.searchMorphemes(morpheme)
        .then(response => {
          console.log(response)
          this.search.morpheme.items = response
        }).catch(error => {
          this.$message({
            message: '查询词根失败: ' + error,
            type: 'fail'
          })
        })
    },

    searchWord(word) {
      this.helper.searchWords(word)
        .then(response => {
          this.search.word.items = response
        }).catch(error => {
          this.$message({
            message: '查询单词失败: ' + error,
            type: 'fail'
          })
        })
    },

    searchWordByMorphemeId(morphemeId) {
      this.helper.searchWordByMorphemeId(morphemeId)
        .then(response => {
          this.search.word.items = response
        }).catch(error => {
          this.$message({
            message: '查询单词失败: ' + error,
            type: 'fail'
          })
        })
    },

    getDetectionType(index) {
      switch (index) {
        case 0:
          return ''
        case 1:
          return 'success'
        case 2:
          return 'danger'
        case 3:
          return 'info'
        default:
          return 'warning'
      }
    },

    handleArrowKey(event) {
      console.log(event)
      const meanings = this.pair.word.meanings
      if (this.show.review) {
        if (!this.study.type === 1) {
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
        } else if (event.altKey && event.key === 's') {
          this.search.mode = !this.search.mode
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
