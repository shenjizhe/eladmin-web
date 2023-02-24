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
      permission: {
        add: ['admin', 'entity:add'],
        edit: ['admin', 'entity:edit'],
        del: ['admin', 'entity:del']
      },
      rules: {
        name: [
          { required: true, message: '名称不能为空', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '标题不能为空', trigger: 'blur' }
        ],
        comment: [
          { required: true, message: '描述不能为空', trigger: 'blur' }
        ],
        show: [
          { required: true, message: '是否显示不能为空', trigger: 'blur' }
        ]
      },
      domain: {
        id: 0,
        name: '',
        comment: '',
        show: false
      },
      toolEntity: [
        {
          id: 'bus',
          type: 'bus',
          title: '业务'
        },
        {
          id: 'rel',
          type: 'rel',
          title: '关系'
        },
        {
          id: 'dic',
          type: 'dic',
          title: '字典'
        },
        {
          id: 'log',
          type: 'log',
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
    this.domain = JSON.parse(this.$route.query.domain)
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
      console.log(e.clone.id)
      this.dialogVisible = true
    },
    onClone(e) {
      console.log(e)
    },
    onChange(e) {
      console.log(e)
    },
    allowDrop(ev) {
      console.log(ev)
    },

    drop(ev, item) {
      console.log(item)
      console.log(ev)
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  }
}
