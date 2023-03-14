import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/base16-dark.css'
import 'codemirror/theme/blackboard.css'
import 'codemirror/addon/hint/show-hint.css'
import 'codemirror/addon/hint/show-hint.js'
import 'codemirror/addon/hint/show-hint'
import 'codemirror/addon/hint/javascript-hint'
import 'codemirror/addon/hint/sql-hint'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/markdown/markdown'
import 'codemirror/mode/sql/sql'
import 'codemirror/mode/php/php'
import 'codemirror/mode/python/python'
import 'codemirror/mode/shell/shell'
import 'codemirror/mode/powershell/powershell'

const CodeMirror = require('codemirror/lib/codemirror')

const defaultValue = {
  template: {},
  templateNodes: []
}

import crudTemplate from '@/api/template'
import crudTemplateBlock from '@/api/templateBlock'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

import MyForm from '@/components/MyForm'

const debugMode = {
  vue: false
}

const defaultForm = {
  template: { id: null, name: null, comment: null, show: null },
  templateBlock: { id: null, name: null, comment: null, show: null, templateId: null, code: null, level: null }
}

function printVueLog(msg) {
  if (debugMode.vue) {
    console.log(msg)
  }
}

export default {
  name: 'TemplateIde',
  components: { MyForm, pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  dicts: ['show_status'],

  props: {
    value: {
      type: String,
      default: ''
    },
    language: {
      type: String,
      default: null
    }
  },

  data() {
    return {
      code: '',
      coder: null,
      mode: 'javascript',
      theme: 'default',
      modes: [
        { value: 'javascript', label: 'Javascript' },
        { value: 'x-java', label: 'Java' },
        { value: 'x-python', label: 'Python' },
        { value: 'x-sql', label: 'SQL' },
        { value: 'x-shell', label: 'Shell' },
        { value: 'x-powershell', label: 'PowerShell' },
        { value: 'x-php', label: 'PHP' }
      ],
      current: {
        template: defaultValue.template
      },
      active: {
        template: ['1'],
        tabs: 'template',
        blocks: 'first'
      },
      permission: {
        template: {
          add: ['admin', 'template:add'],
          edit: ['admin', 'template:edit'],
          del: ['admin', 'template:del']
        },
        templateBlock: {
          add: ['admin', 'templateBlock:add'],
          edit: ['admin', 'templateBlock:edit'],
          del: ['admin', 'templateBlock:del']
        }
      },
      rules: {
        template: {
          id: [
            { required: true, message: '主键不能为空', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '名称不能为空', trigger: 'blur' }
          ],
          comment: [
            { required: true, message: '描述不能为空', trigger: 'blur' }
          ],
          show: [
            { required: true, message: '是否显示不能为空', trigger: 'blur' }
          ]
        },
        openBlocks: [],
        templateBlock: {
          id: [
            { required: true, message: '主键不能为空', trigger: 'blur' }
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
          templateId: [
            { required: true, message: '模板ID不能为空', trigger: 'blur' }
          ],
          code: [
            { required: true, message: '代码不能为空', trigger: 'blur' }
          ],
          level: [
            { required: true, message: '级别不能为空', trigger: 'blur' }
          ]
        }
      },
      Crud: {
        template: {}
      },
      columns: {
        template: [
          {
            name: 'id',
            title: '模板ID',
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
        ]
      },
      disabled: {
        template: true
      },
      treeProps: {
        block: { children: 'children', label: 'label' }
      }
    }
  },

  cruds() {
    return [
      CRUD({ tag: 'template', title: '模板', url: 'api/template', idField: 'id', sort: 'id,asc', crudMethod: { ...crudTemplate }}),
      CRUD({ title: '模板块', url: 'api/templateBlock', idField: 'id', sort: 'id,asc', crudMethod: { ...crudTemplateBlock }})
    ]
  },

  computed: {
    _value: {
      get: function() {
        return this.value
      },
      set: function(val) {
        this.value = val
      }
    },
    blocks: {
      get: function() {
        return this.crud.data
          .map((item, index, self) => {
            return {
              id: item.id,
              label: item.name,
              data: item }
          })
      }
    },
    coderOptions() {
      return {
        line: true,
        mode: 'application/json', // json数据高亮
        // 设置主题 记得引入对应主题才有显示   import 'codemirror/theme/blackboard.css'
        theme: 'blackboard',
        tabSize: 2,
        // 显示行号
        lineNumbers: true,
        // 光标高度，默认是1
        cursorHeight: 0.8,
        autoCloseBrackets: true,
        matchBrackets: true, // 括号匹配
        lineWrapping: 'wrap', // 文字过长时，是换行(wrap)还是滚动(scroll),默认是滚动
        showCursorWhenSelecting: true, // 文本选中时显示光标
        smartIndent: true, // 智能缩进
        completeSingle: false // 当匹配只有一项的时候是否自动补全
      }
    }
  },

  watch: {
    language: {
      handler(language) {
        this.getCoder().then(() => {
          // 尝试从父容器获取语法类型
          if (language) {
            // 获取具体的语法类型对象
            const modeObj = this.getLanguage(language)
            // 判断父容器传入的语法是否被支持
            if (modeObj) {
              this.mode = modeObj.label
              this.coder.setOption('mode', `text/${modeObj.value}`)
            }
          }
        })
      },
      immediate: true
    }
  },

  beforeCreate() {
    printVueLog('vue: beforeCreate')
    const templateId = this.$route.query.templateId
    if (templateId != null && templateId !== '') {
      defaultForm.template.id = templateId
      defaultForm.templateBlock.templateId = templateId
    } else {
      defaultForm.template.id = null
      defaultForm.templateBlock.templateId = null
    }
    this.crud.page.page = 1
    this.crud.page.size = 1000
  },

  created() {
    this.Crud.template = this.$crud['template']
    this.Crud.template.registerVM('form', this, 3)
  },

  mounted() {
    // 初始化
    this.initialize()
  },

  beforeDestroy() {
    this.Crud.template.unregisterVM('form', this)
  },

  destroyed() {
    printVueLog('vue: destroyed')
    this.current.template = defaultValue.template
  },

  methods: {
    // 钩子：在获取表格数据之前执行，false 则代表不获取数据
    [CRUD.HOOK.beforeRefresh](crud) {
      if (crud.tag === 'template') {
        crud.query = {
          id: defaultForm.template.id
        }
      }
      return true
    },
    [CRUD.HOOK.afterRefresh](crud) {
      if (crud.tag === 'template') {
        if (defaultForm.template.id) {
          const data = this.Crud.template.data
          if (data && data.length > 0) {
            this.current.template = data[0]
            this.disabled.template = false
          } else {
            this.disabled.template = false
            this.current.template = defaultValue.template
          }
        } else {
          this.disabled.template = true
          this.current.template = defaultValue.template
        }
      }

      return true
    },
    // 初始化
    initialize() {
      // 初始化编辑器实例，传入需要被实例化的文本域对象和默认配置
      this.coder = CodeMirror.fromTextArea(
        this.$refs.textarea,
        this.coderOptions
      )
      this.coder.on('inputRead', () => {
        this.coder.showHint()
      })
      // 编辑器赋值
      if (this.value || this.code) {
        this.setCodeContent(this.value || this.code)
      } else {
        this.coder.setValue('')
      }
      // 支持双向绑定
      this.coder.on('change', (coder) => {
        this.code = coder.getValue()
        if (this.$emit) {
          this.$emit('input', this.code)
        }
      })
    },
    setCodeContent(val) {
      setTimeout(() => {
        if (!val) {
          this.coder.setValue('')
        } else {
          this.coder.setValue(val)
        }
      }, 300)
    },
    getCoder() {
      const that = this
      return new Promise((resolve) => {
        (function get() {
          if (that.coder) {
            resolve(that.coder)
          } else {
            setTimeout(get, 10)
          }
        })()
      })
    },
    getLanguage(language) {
      // 在支持的语法类型列表中寻找传入的语法类型
      return this.modes.find((mode) => {
        // 所有的值都忽略大小写，方便比较
        const currentLanguage = language.toLowerCase()
        const currentLabel = mode.label.toLowerCase()
        const currentValue = mode.value.toLowerCase()

        // 由于真实值可能不规范，例如 java 的真实值是 x-java ，所以讲 value 和 label 同时和传入语法进行比较
        return (
          currentLabel === currentLanguage || currentValue === currentLanguage
        )
      })
    },
    changeMode(val) {
      // 修改编辑器的语法配置
      this.coder.setOption('mode', `text/${val}`)
      // 获取修改后的语法
      const label = this.getLanguage(val).label.toLowerCase()
      // 允许父容器通过以下函数监听当前的语法值
      this.$emit('language-change', label)
    },
    handleNodeClick(data) {
      this.setCodeContent(data.data.code)
    }
  }
}