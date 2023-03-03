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

// 实际上是 reset form 而不是 default form.因为一个界面多CRUD的情况下，这个 form是可以修改的,但框架 CRUD命名是 defaultForm，保持一致性
const defaultForm = {
  entity: { id: null, domainId: null, name: null, title: null, comment: null, show: null, groupId: null, type: null },
  field: { id: null, entityId: null, name: null, comment: null, pk: false, show: null, type: null }
}

export default {
  name: 'ErEditor',
  components: { EREntity, MyForm, draggable, pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm.entity), crud()],
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
        domain: {
          name: [
            { required: true, message: '名称不能为空', trigger: 'blur' }
          ],
          comment: [
            { required: true, message: '描述不能为空', trigger: 'blur' }
          ],
          show: [
            { required: true, message: '启用不能为空', trigger: 'blur' }
          ]
        },
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
        },
        field: {
          entityId: [
            { required: true, message: '实体ID不能为空', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '名称不能为空', trigger: 'blur' }
          ],
          comment: [
            { required: true, message: '描述不能为空', trigger: 'blur' }
          ],
          show: [
            { required: true, message: '是否显示不能为空', trigger: 'blur' }
          ],
          pk: [
            { required: true, message: '是否主键不能为空', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '数据类型不能为空', trigger: 'blur' }
          ]
        }
      },
      Crud: {
        entity: null,
        field: null
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
        domain: [
          {
            name: 'id',
            title: '域ID',
            type: 'text',
            disabled: true
          },
          {
            name: 'name',
            title: '名称',
            type: 'text',
            focused: true
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
          }
        ],
        entity: [
          {
            name: 'domainId',
            title: '领域id',
            type: 'text',
            disabled: true
          },
          {
            name: 'name',
            title: '名称',
            type: 'text',
            focused: true
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
        ],
        field: [
          {
            name: 'entityId',
            title: '实体id',
            type: 'text',
            disabled: true
          },
          {
            name: 'name',
            title: '名称',
            type: 'text',
            focused: true
          },
          {
            name: 'comment',
            title: '描述',
            type: 'textarea'
          },
          {
            name: 'pk',
            title: '主键',
            type: 'switch'
          },
          {
            name: 'show',
            title: '显示',
            type: 'switch'
          },
          {
            name: 'type',
            title: '数据类型',
            type: 'select',
            dict: 'db_types'
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
      CRUD({ tag: 'default', title: '实体', url: 'api/entityModel',
        idField: 'id', sort: 'id,asc', debug: true,
        crudMethod: { ...crudEntityModel }}),
      CRUD({ tag: 'field', title: '属性', url: 'api/entityField',
        idField: 'id', sort: 'id,asc', debug: true,
        defaultForm: defaultForm.field,
        crudMethod: { ...crudEntityField }})
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
      defaultForm.entity.domainId = this.domain.id
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
    this.Crud.entity = this.$crud['default']
    this.Crud.field = this.$crud['field']

    this.Crud.field.registerVM('form', this, 3)
  },

  mounted() {
    console.log('vue: mounted')
  },

  beforeDestroy() {
    console.log('vue: beforeDestroy')
    this.Crud.field.unregisterVM('form', this)
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
      this.Crud.field.query.entityId = e.id
      defaultForm.field.entityId = e.id
      this.Crud.field.toQuery()
    },

    // 属性
    onSelectField(e) {
      console.log('select field')
      if (e == null) {
        e = {}
      }
      this.currentField = e
      defaultForm.field.id = e.id
    },
    onFieldAdd() {
      this.Crud.field.form.entityId = this.currentEntity.id
      this.Crud.field.toAddNoReset()
    },
    onFieldDelete(e) {
      console.log(e)
      // let currentField = e
    }
  }
}
