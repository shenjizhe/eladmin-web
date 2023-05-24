import { StockStaticHelper } from '@/api/financial/StockStaticHelper'
import { StockStatics } from '@/api/financial/StockStatics'
import * as echarts from 'echarts'

export default {
  name: 'StaticComponent',
  props: {},
  components: {},
  data() {
    return {
      stockId: -1,
      option: null,
      statics: {
        stock: {
          name: '',
          code: ''
        },
        analysis: {},
        level: {},
        priceReference: {}
      },
      orders: [],
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
    var chartDom = document.getElementById('mychart')
    var myChart = echarts.init(chartDom)
    var option
    option = {
      title: {
        text: 'Stacked Line'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Email',
          type: 'line',
          stack: 'Total',
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: 'Union Ads',
          type: 'line',
          stack: 'Total',
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: 'Video Ads',
          type: 'line',
          stack: 'Total',
          data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
          name: 'Direct',
          type: 'line',
          stack: 'Total',
          data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
          name: 'Search Engine',
          type: 'line',
          stack: 'Total',
          data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
      ]
    }
    myChart.setOption(option)
    console.log(myChart)
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
