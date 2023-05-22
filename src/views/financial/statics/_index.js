import { StockStaticHelper } from '@/api/financial/StockStaticHelper'
import { StockStatics } from '@/api/financial/StockStatics'

export default {
  name: 'StaticComponent',
  props: {},

  data() {
    return {
      stockId: -1,
      statics: {
        stock: {
          name: '',
          code: ''
        },
        analysis: {},
        level: {},
        priceReference: {}
      },
      formattedDate: ''
    }
  },

  computed: {},

  watch: {},

  // vue 生命周期
  beforeCreate() {
  },

  created() {
    this.stockId = this.$route.query.stockId
  },

  beforeMount() {
    this.getInfos(this.stockId)
  },

  mounted() {
  },

  beforeDestroy() {
  },

  destroyed() {
  },
  methods: {
    getInfos(id) {
      const helper = new StockStaticHelper()
      helper.getInfos(id)
        .then(response => {
          this.statics = new StockStatics(response)
          this.formatDate(this.statics.holdDateAvg)
        }).catch(error => {
          this.$message({
            message: '取得信息失败:' + error,
            type: 'fail'
          })
        })
    },

    formatDate(date) {
      if (date) {
        const _date = new Date(date)
        const year = _date.getFullYear() // 获取当前年份
        const month = String(_date.getMonth() + 1).padStart(2, '0') // 获取当前月份，并将其前导零，使其成为两位数字
        const day = String(_date.getDate()).padStart(2, '0') // 获取当前天数，并将其前导零，使其成为两位数字
        this.formattedDate = `${year}-${month}-${day}` // 将年、月、日组合成格式化后的日期字符串
      } else {
        this.formattedDate = ''
      }
    }
  }
}
