import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'
import draggable from 'vuedraggable'
import EREntity from '@/components/EREntity'

export default {
  name: 'ErEditor',

  components: { EREntity, draggable, pagination, crudOperation, rrOperation, udOperation },

  dicts: ['entity_types', 'db_types'],

  mixins: [],

  props: {},

  data() {
    return {
      domain: {
        id: 0,
        name: '',
        comment: ''
      },
      entitylist: [],
      value: ''
    }
  },

  computed: {},

  watch: {},

  created() {
  },

  mounted() {
    this.domain = this.$route.query.domain
    // this.domain.id = this.$route.query.domain.id
    // this.domain.name = this.$route.query.domain.name
    // this.domain.comment = this.$route.query.domain.comment
    // this.domain.show = this.$route.query.domain.show
  },

  methods: {
    onEnd(e) {
      console.log(e)
    }
  }
}
