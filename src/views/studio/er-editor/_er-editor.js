import draggable from 'vuedraggable'
import crudEntity from '@/api/entity'
import EREntity from '@/components/EREntity'
import MyForm from '@/components/MyForm'

import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

const defaultForm = { id: null, domainId: null, name: null, title: null, comment: null, show: null, groupId: null }

export default {
  name: 'ErEditor',
  components: { EREntity, MyForm, draggable, pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
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
          id: 'bus',
          type: 'primary',
          title: '业务'
        },
        {
          id: 'rel',
          type: 'success',
          title: '关系'
        },
        {
          id: 'dic',
          type: 'warning',
          title: '字典'
        },
        {
          id: 'log',
          type: 'info',
          title: '记录'
        }
      ],
      areaEntity: [],
      formColumns: [
        {
          name: 'domainId',
          title: '领域id',
          type: 'text'
        },
        {
          name: 'name',
          title: '名称',
          type: 'text'
        },
        {
          name: 'title',
          title: '标题',
          type: 'text'
        },
        {
          name: 'description',
          title: '描述',
          type: 'textarea'
        },
        {
          name: 'show',
          title: '启用',
          type: 'switch'
        },
        {
          name: 'groupId',
          title: '组id',
          type: 'text'
        }
      ],
      dialogVisible: false,
      currentEntity: {},
      value: ''
    }
  },

  cruds() {
    return CRUD({ title: '实体', url: 'api/entity', idField: 'id', sort: 'id,desc', crudMethod: { ...crudEntity }})
  },

  computed: {},

  watch: {},

  // created() {
  // },

  mounted() {
    this.domain = this.$route.query.domain
  },

  methods: {
    // 钩子：在获取表格数据之前执行，false 则代表不获取数据
    [CRUD.HOOK.beforeRefresh]() {
      return true
    },
    onStart(e) {
      console.log(e)
    },
    onEnd(e) {
      console.log(e)
    },
    onAdd(e) {
      console.log(e)
      this.dialogVisible = true
    },
    onClone(e) {
      console.log(e)
    },
    onChange(e) {
      console.log(e)
    }
  }
}
