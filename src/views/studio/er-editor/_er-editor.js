import crudEntityModel from '@/api/entityModel'
import crudEntityField from '@/api/entityField'

import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

import draggable from 'vuedraggable'

import EREntity from '@/components/EREntity'
import MyForm from '@/components/MyForm'

const defaultForm = { id: null, domainId: null, name: null, title: null, comment: null, show: null, groupId: null, type: null }

export default {
  name: 'ErEditor',
  components: { EREntity, MyForm, draggable, pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  dicts: ['entity_types', 'db_types'],
  props: {},

  data() {
    return {
      permission: {
        entity: {
          add: ['admin', 'entityModel:add'],
          edit: ['admin', 'entityModel:edit'],
          del: ['admin', 'entityModel:del']
        },
        field: {
          add: ['admin', 'entityField:add'],
          edit: ['admin', 'entityField:edit'],
          del: ['admin', 'entityField:del']
        }
      },
      rules: {
        entity: {
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
        }
      },
      Crud: {
        entityCrud: null,
        fieldCrud: null
      },
      domain: {
        id: 0,
        name: '',
        comment: '',
        show: false
      },
      fields: [],
      toolEntity: [
        {
          id: '1',
          type: 'bus',
          title: '业务'
        },
        {
          id: '2',
          type: 'rel',
          title: '关系'
        },
        {
          id: '3',
          type: 'dic',
          title: '字典'
        },
        {
          id: '4',
          type: 'log',
          title: '记录'
        }
      ],
      columns: {
        entity: [
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
            name: 'comment',
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
          },
          {
            name: 'type',
            title: '实体类型',
            type: 'select',
            dict: 'entity_types'
          }
        ]
      },
      dialogVisible: false,
      currentEntity: {},
      currentField: {},
      // 激活用配置
      active: {
        domain: ['1', '2'],
        market: ['1'],
        entity: ['1', '2'],
        tabs: 'first'
      },

      value: ''
    }
  },

  cruds() {
    return [
      CRUD({ title: '实体', url: 'api/entityModel', idField: 'id', sort: 'id,asc', debug: true, crudMethod: { ...crudEntityModel }}),
      CRUD({ tag: 'field', title: '属性', url: 'api/entityField', idField: 'id', sort: 'id,asc', debug: true, crudMethod: { ...crudEntityField }})
    ]
  },

  computed: {},

  watch: {},

  // vue 声明周期
  beforeCreate() {
    console.log('vue: beforeCreate')
    const param = this.$route.query.domain
    if (param != null && param !== '') {
      this.domain = JSON.parse(param)
      this.crud.query.domainId = this.domain.id
    }
    this.crud.page.size = 40
    this.crud.page.page = 0
  },

  beforeMount() {
    console.log('vue: beforeMount')
  },

  created() {
    console.log('vue: created')
    const param = this.$route.query.domain
    if (param != null && param !== '') {
      this.domain = JSON.parse(param)
    }
    this.Crud.entityCrud = this.$crud['default']
    this.Crud.fieldCrud = this.$crud['field']
  },

  mounted() {
    console.log('vue: mounted')
  },

  beforeDestroy() {
    console.log('vue: beforeDestroy')
  },

  destroyed() {
    console.log('vue: destroyed')
    this.domain = {}
  },
  methods: {
    // 钩子：在获取表格数据之前执行，false 则代表不获取数据
    [CRUD.HOOK.beforeRefresh]() {
      return true
    },
    [CRUD.HOOK.afterRefresh]() {
      return true
    },
    // 实体工具栏
    // onStart(e) {
    //   console.log(e)
    // },
    // onEnd(e) {
    //   console.log(e)
    // },
    // onClone(e) {
    //   console.log(e)
    // },
    // onChange(e) {
    //   console.log(e)
    // },
    onAdd(e) {
      // 暂时用 clone.id 代表 type.value ,因为定义的顺序一致，而且没有别的办法可以传递
      this.crud.form.domainId = this.domain.id
      this.crud.form.type = e.clone.id
      this.crud.toAddNoReset()
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },

    // 实体面板
    onSelected(e) {
      this.currentEntity = e
      this.Crud.fieldCrud.query.entityId = e.id
      this.Crud.fieldCrud.toQuery()
    },

    // 属性
    onSelectField(e) {
      if (e == null) {
        e = {}
      }
      this.currentField = e
    },
    onFieldDelete(e) {
      console.log(e)
      // let currentField = e
    }
  }
}
