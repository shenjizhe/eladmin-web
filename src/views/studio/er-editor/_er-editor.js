import draggable from 'vuedraggable'
import EREntity from '@/components/EREntity'
// import crudEntity from '@/api/entity'
// import crudDomain from '@/api/domain'
// import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

// const defaultForm = { id: null, domainId: null, name: null, title: null, comment: null, show: null, groupId: null }
export default {
  name: 'ErEditor',
  components: { EREntity, draggable, pagination, crudOperation, rrOperation, udOperation },
  // mixins: [presenter(), header(), form(defaultForm), crud()],
  dicts: ['entity_types', 'db_types'],
  props: {},

  // cruds() {
  //   return CRUD({ tag: 'entity', title: '实体', url: 'api/entity', idField: 'id', sort: 'id,desc', crudMethod: { ...crudEntity }})
  // },
  //
  // crudsDomain() {
  //   return CRUD({ title: '领域建模', url: 'api/domain', idField: 'id', sort: 'id,desc', crudMethod: { ...crudDomain }})
  // },

  data() {
    return {
      domain: {
        id: 0,
        name: '',
        comment: ''
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
    // if (this.$route != null) {
    //   this.domain = this.$route.query.domain
    // }
    // this.domain.id = this.$route.query.domain.id
    // this.domain.name = this.$route.query.domain.name
    // this.domain.comment = this.$route.query.domain.comment
    // this.domain.show = this.$route.query.domain.show
  },

  methods: {
    // [CRUD.HOOK.beforeRefresh]() {
    //   return true
    // },
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
