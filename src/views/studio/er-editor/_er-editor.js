import crudDomain from '@/api/domain'
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
  domain: {
    id: null,
    name: null,
    comment: null,
    show: null
  },
  entity: {
    id: null,
    domainId: null,
    name: null,
    title: null,
    comment: null,
    show: null,
    groupId: null,
    type: null
  },
  field: {
    id: null,
    entityId: null,
    name: null,
    comment: null,
    pk: false,
    show: null,
    type: null
  }
}
const defaultValue = {
  domain: {},
  entity: {},
  entityId: 0,
  field: {}
}
const debugMode = {
  crudDomain: true,
  crudEntity: false,
  crudField: true,
  vue: true,
  action: false
}

function printVueLog(msg) {
  if (debugMode.vue) {
    console.log(msg)
  }
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
      disabled: {
        entity: true,
        field: true
      },
      msg: {
        delEntity: '确认删除这个实体吗？'
      },
      pop: {
        delEntity: false
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
        domain: {},
        entity: {},
        field: {}
      },
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
      shortcuts: {
        field: {
          name: 'name',
          keys: [
            {
              key: 'id',
              regex: /id$/,
              data: {
                comment: '主键',
                show: true,
                pk: true,
                type: 'bigint'
              }
            },
            {
              key: 'name',
              regex: /name$/,
              data: {
                comment: '名称',
                show: true,
                pk: false,
                type: 'varchar'
              }
            },
            {
              key: 'password',
              data: {
                comment: '密码',
                show: true,
                pk: false,
                type: 'varchar'
              }
            },
            {
              key: 'comment',
              regex: /comment$|info$|description$/,
              data: {
                comment: '描述',
                show: true,
                pk: false,
                type: 'varchar'
              }
            },
            {
              key: 'title',
              data: {
                comment: '标题',
                show: true,
                pk: false,
                type: 'varchar'
              }
            },
            {
              key: 'enabled',
              data: {
                comment: '启用',
                show: true,
                pk: false,
                type: 'bit'
              }
            },
            {
              key: 'show',
              data: {
                comment: '显示',
                show: true,
                pk: false,
                type: 'bit'
              }
            },
            {
              key: 'deleted',
              data: {
                comment: '删除标记',
                show: true,
                pk: false,
                type: 'bit'
              }
            },
            {
              key: 'time',
              regex: /time$/,
              data: {
                comment: '时间',
                show: true,
                pk: false,
                type: 'datetime'
              }
            },
            {
              key: 'type',
              data: {
                comment: '类型',
                show: true,
                pk: false,
                type: 'int'
              }
            },
            {
              key: 'path',
              regex: /path$/,
              data: {
                comment: '路径',
                show: true,
                pk: false,
                type: 'varchar'
              }
            },
            {
              key: 'url',
              regex: /url$/,
              data: {
                comment: '地址',
                show: true,
                pk: false,
                type: 'varchar'
              }
            },
            {
              key: 'port',
              regex: /port$/,
              data: {
                comment: '端口',
                show: true,
                pk: false,
                type: 'int'
              }
            },
            {
              key: 'sort',
              regex: /sort$/,
              data: {
                comment: '排序',
                show: true,
                pk: false,
                type: 'int'
              }
            },
            {
              key: 'count',
              regex: /count$/,
              data: {
                comment: '数量',
                show: true,
                pk: false,
                type: 'int'
              }
            }]
        }
      },
      dialogVisible: false,
      current: {
        domain: defaultValue.domain,
        entity: defaultValue.entity,
        entityId: defaultValue.entityId,
        field: defaultValue.field
      },
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
      CRUD({ tag: 'domain', title: '域', url: 'api/domain',
        idField: 'id', sort: 'id,asc', debug: debugMode.crudDomain,
        defaultForm: defaultForm.domain,
        crudMethod: { ...crudDomain }}),
      CRUD({ tag: 'default', title: '实体', url: 'api/entityModel',
        idField: 'id', sort: 'id,asc', debug: debugMode.crudEntity,
        crudMethod: { ...crudEntityModel }}),
      CRUD({ tag: 'field', title: '属性', url: 'api/entityField',
        idField: 'id', sort: 'id,asc', debug: debugMode.crudField,
        defaultForm: defaultForm.field,
        crudMethod: { ...crudEntityField }})
    ]
  },

  computed: {},

  watch: {},

  // vue 生命周期
  beforeCreate() {
    printVueLog('vue: beforeCreate')
    const domainId = this.$route.query.domainId
    if (domainId != null && domainId !== '') {
      this.crud.query.domainId = domainId
      defaultForm.entity.domainId = domainId
      defaultForm.domain.id = domainId
    }
    this.crud.page.page = 1
    this.crud.page.size = 40
  },

  created() {
    printVueLog('vue: created')
    this.Crud.domain = this.$crud['domain']
    this.Crud.entity = this.$crud['default']
    this.Crud.field = this.$crud['field']
    this.Crud.field.registerVM('form', this, 3)
    this.Crud.domain.registerVM('form', this, 3)
  },

  beforeMount() {
    printVueLog('vue: beforeMount')
  },

  mounted() {
    printVueLog('vue: mounted')
    const domainId = this.$route.query.domainId
    if (domainId != null && domainId !== '') {
      this.Crud.domain.query = {
        id: domainId,
        sort: 'id,asc'
      }
      console.log('start')
      this.Crud.domain.toQuery()
      this.current.domain = this.Crud.domain.data[0]
      console.log('finished')
    }
  },

  beforeDestroy() {
    printVueLog('vue: beforeDestroy')
    this.Crud.field.unregisterVM('form', this)
    this.Crud.domain.unregisterVM('form', this)
  },

  destroyed() {
    printVueLog('vue: destroyed')
    this.current.domain = {}
  },
  methods: {
    // 钩子：在获取表格数据之前执行，false 则代表不获取数据
    [CRUD.HOOK.beforeRefresh]() {
      return true
    },
    [CRUD.HOOK.afterRefresh]() {
      return true
    },
    onAdd(e) {
      // 暂时用 clone.id 代表 type.value ,因为定义的顺序一致，而且没有别的办法可以传递
      this.crud.form.domainId = this.current.domain.id
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
      this.disabled.entity = false
      this.current.entity = e
      this.current.entityId = e.id
      this.Crud.field.query.entityId = e.id
      defaultForm.field.entityId = e.id
      this.Crud.field.toQuery()
    },

    onAreaClick() {
      this.disabled.entity = true
      this.current.entity = defaultValue.entity
      this.current.entityId = defaultValue.entityId
      this.Crud.field.query = {}
      this.Crud.field.data = []
      defaultForm.field.entityId = ''
    },

    onKeyUp(event) {
      if (event.key === 'Delete') {
        this.pop.delEntity = true
      }
    },

    // 保存域信息和所有的修改
    onSaveAll() {
      console.log(this.current.domain)
      this.Crud.domain.editAll([this.current.domain])
      this.Crud.entity.editAll(this.Crud.entity.data)
    },

    // 属性
    onSelectField(e) {
      if (e == null) {
        e = {}
        this.disabled.field = true
      }
      this.disabled.field = false
      this.current.field = e
      defaultForm.field.id = e.id
    },
    onFieldAdd() {
      this.Crud.field.form.entityId = this.current.entityId
      this.Crud.field.toAddNoReset()
    },
    doCancel() {
      if (this.current.entity) {
        this.Crud.entity.cancelDelete(this.current.entity)
      }
      this.pop.delEntity = false
    },
    toDelete() {
      if (this.current.entity) {
        this.Crud.entity.doDelete(this.current.entity)
      }
      this.pop.delEntity = false
      this.currentEntity = defaultValue.entity
    }
  }
}
