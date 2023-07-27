import MyForm from '@/components/MyForm'
import { Morpheme } from '@/api/morpheme/Morpheme'

export default {
  name: 'MorphemeStudyComponent',
  props: {},
  components: { MyForm },
  data() {
    return {
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
          morphemeStudy: {
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
    }
  },

  computed: {},

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
  },

  beforeDestroy() {
  },

  destroyed() {
  },
  methods: {
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
          console.log(response)
          this.pair = response
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
          console.log(response)
          this.pair = response
        }).catch(error => {
          this.$message({
            message: '取得数据失败: ' + error,
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
    }
  }
}
