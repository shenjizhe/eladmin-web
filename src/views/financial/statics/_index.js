
import { StockStaticHelper } from '@/api/financial/StockStaticHelper'
import { StockStatics } from '@/api/financial/StockStatics'
export default {
  name: 'StaticComponent',
  props: {},

  data() {
    return {
      statics: {}
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
    }
  }
}
