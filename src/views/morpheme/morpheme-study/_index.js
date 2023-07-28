import MyForm from '@/components/MyForm'
import { Morpheme } from '@/api/morpheme/Morpheme'

export default {
  name: 'MorphemeStudyComponent',
  props: {},
  components: { MyForm },
  data() {
    return {
      text: '你好，欢迎使用语音合成功能',
      voices: [],
      selectedVoice: null,
      isFirst: false,
      isLast: false,
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
        console.log(sound)
        return sound
      }
    }
  },

  watch: {},

  // vue 生命周期
  beforeCreate() {
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
    getVoices() {
      this.voices = speechSynthesis.getVoices()
    },
    speak() {
      if (!speechSynthesis.speaking) {
        const utterance = new SpeechSynthesisUtterance(this.pair.word.text)
        utterance.voice = this.selectedVoice
        speechSynthesis.speak(utterance)
      }
    },
    showCurrent(row) {
      const helper = new Morpheme()
      helper.current()
        .then(response => {
          console.log(response)
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
      }
    }
  }
}
