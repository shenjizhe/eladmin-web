import draggable from 'vuedraggable'
import EREntity from '@/components/EREntity'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

export default {
  name: 'ErEditor',
  components: { EREntity, draggable, pagination, crudOperation, rrOperation, udOperation },
  dicts: ['entity_types', 'db_types'],
  props: {},

  data() {
    return {
      domain: {
        id: 0,
        name: '',
        comment: '',
        show: false
      },
      toolEntity: [
        {
          type: 'primary',
          title: '业务'
        },
        {
          type: 'success',
          title: '关系'
        },
        {
          type: 'warning',
          title: '字典'
        },
        {
          type: 'info',
          title: '记录'
        }
      ],
      areaEntity: [],
      value: ''
    }
  },

  computed: {},

  watch: {},

  created() {
  },

  mounted() {
    this.domain = this.$route.query.domain
  },

  methods: {
    onStart(e) {
      console.log(e)
    },
    onEnd(e) {
      console.log(e)
    },
    onAdd(e) {
      console.log(e)
    },
    onClone(e) {
      console.log(e)
    },
    onChange(e) {
      console.log(e)
    }
  }
}
