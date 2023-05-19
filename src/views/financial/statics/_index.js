import { StockStaticHelper } from '@/api/financial/StockStaticHelper'
import { StockStatics } from '@/api/financial/StockStatics'

export default {
  name: 'StaticComponent',
  props: {},

  data() {
    return {
      statics: {
        stock: {
          name: '',
          code: ''
        },
        analysis: {},
        level: {}
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
    this.getInfos(1)
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
          console.log(this.statics)
        }).catch(error => {
          this.$message({
            message: '取得信息失败:' + error,
            type: 'fail'
          })
        })
    },

    formatDate(date) {
      // if (date != null) {
      //   const year = date.getFullYear() // 获取当前年份
      //   const month = String(date.getMonth() + 1).padStart(2, '0') // 获取当前月份，并将其前导零，使其成为两位数字
      //   const day = String(date.getDate()).padStart(2, '0') // 获取当前天数，并将其前导零，使其成为两位数字
      //
      //   const formattedDate = `${year}-${month}-${day}` // 将年、月、日组合成格式化后的日期字符串
      //   return formattedDate
      // } else {
      //   return ''
      // }
      if (date) {
        return date
      } else {
        return ''
      }
    }
  }
}
