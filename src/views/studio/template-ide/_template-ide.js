import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/base16-dark.css'
import 'codemirror/theme/blackboard.css'
import 'codemirror/theme/darcula.css'
import 'codemirror/theme/dracula.css'
import 'codemirror/theme/idea.css'
import 'codemirror/theme/eclipse.css'
import 'codemirror/theme/icecoder.css'
import 'codemirror/theme/liquibyte.css'
import 'codemirror/theme/neo.css'
import 'codemirror/theme/shadowfox.css'
import 'codemirror/theme/colorforth.css'
import 'codemirror/addon/hint/show-hint.css'
import 'codemirror/addon/hint/show-hint.js'
import 'codemirror/addon/hint/show-hint'
import 'codemirror/addon/hint/javascript-hint'
import 'codemirror/addon/hint/sql-hint'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/velocity/velocity'
import 'codemirror/mode/markdown/markdown'
import 'codemirror/mode/sql/sql'
import 'codemirror/mode/php/php'
import 'codemirror/mode/python/python'
import 'codemirror/mode/shell/shell'
import 'codemirror/mode/powershell/powershell'

const CodeMirror = require('codemirror/lib/codemirror')

const defaultValue = {
  template: {},
  context: {},
  block: {},
  templateNodes: [],
  blockTabs: [],
  declare: {}
}

import crudTemplate from '@/api/template'
import crudTemplateBlock from '@/api/templateBlock'
import crudTemplateContext from '@/api/templateContext'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

import MyForm from '@/components/MyForm'
import { Pos } from 'codemirror/src/line/pos'
import { HtmlText } from '@/api/studio/HtmlText'
import { LogicText } from '@/api/studio/LogicText'
import { Declare } from '@/api/studio/Declare'

const debugMode = {
  vue: false
}

const defaultForm = {
  template: { id: null, name: null, comment: null, show: null },
  templateBlock: { id: null, name: null, comment: null, show: null, templateId: null, code: null, level: null },
  context: { id: null, templateId: null, key: null, content: null, type: null, dataType: null }
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
  dicts: ['show_status', 'block_level', 'context_type', 'db_types', 'code_theme'],

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
      // code: '',
      // coder: null,
      mode: 'velocity',
      theme: 'blackboard',
      keyword: '',
      coderMap: {},
      modes: [
        { value: 'javascript', label: 'Javascript' },
        { value: 'velocity', label: 'velocity' },
        { value: 'x-java', label: 'Java' },
        { value: 'x-python', label: 'Python' },
        { value: 'x-sql', label: 'SQL' },
        { value: 'x-shell', label: 'Shell' },
        { value: 'x-powershell', label: 'PowerShell' },
        { value: 'x-php', label: 'PHP' }
      ],
      current: {
        template: defaultValue.template,
        context: defaultValue.context,
        block: defaultValue.block,
        declare: defaultValue.declare
      },
      active: {
        template: ['1'],
        infos: ['1'],
        context: ['1'],
        tabs: 'template',
        block: 'first',
        property: 'block-info'
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
        },
        context: {
          add: ['admin', 'templateContext:add'],
          edit: ['admin', 'templateContext:edit'],
          del: ['admin', 'templateContext:del']
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
        },
        context: {
          id: [
            { required: true, message: '主键不能为空', trigger: 'blur' }
          ],
          templateId: [
            { required: true, message: '模板主键不能为空', trigger: 'blur' }
          ],
          key: [
            { required: true, message: '上下文关键字不能为空', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '说明不能为空', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '数据类型不能为空', trigger: 'blur' }
          ],
          dataType: [
            { required: true, message: '数据类型不能为空', trigger: 'blur' }
          ]
        }
      },
      Crud: {
        template: {},
        context: {}
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
        ],
        block: [
          {
            name: 'id',
            title: '块ID',
            type: 'text',
            disabled: true
          },
          {
            name: 'name',
            title: '名称',
            type: 'text',
            disabled: true
          },
          {
            name: 'comment',
            title: '描述',
            type: 'textarea',
            focused: true
          },
          {
            name: 'show',
            title: '启用',
            type: 'switch'
          },
          {
            name: 'level',
            title: '块级别',
            type: 'select',
            dict: 'block_level'
          }
        ],
        context: [
          {
            name: 'key',
            title: '关键字',
            type: 'text'
          },
          {
            name: 'content',
            title: '描述',
            type: 'textarea'
          },
          {
            name: 'dataType',
            title: '数据类型',
            type: 'select',
            dict: 'db_types'
          },
          {
            name: 'type',
            title: '类型',
            type: 'select',
            dict: 'context_type'
          },
          {
            name: 'value',
            title: '值',
            type: 'text'
          }
        ]
      },
      disabled: {
        template: true,
        block: true,
        context: true
      },
      treeProps: {
        block: { children: 'children', label: 'label' }
      },
      blockTabs: defaultValue.blockTabs
    }
  },

  cruds() {
    return [
      CRUD({ tag: 'template', title: '模板', url: 'api/template', idField: 'id', sort: 'id,asc', crudMethod: { ...crudTemplate }}),
      CRUD({ tag: 'default', title: '模板块', url: 'api/templateBlock', idField: 'id', sort: 'id,asc', crudMethod: { ...crudTemplateBlock }}),
      CRUD({ tag: 'context', title: '上下文', url: 'api/templateContext', idField: 'id', sort: ['type,asc', 'id,asc'], crudMethod: { ...crudTemplateContext }})
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
    _theme: {
      get: function() {
        return this.theme
      },
      set: function(val) {
        this.theme = val
        this.setTheme(val)
      }
    },
    activeBlock: {
      get: function() {
        return this.active.block
      }
    },
    blocks: {
      get: function() {
        return this.crud.data
          .map((item) => {
            return {
              id: item.id,
              label: item.name,
              data: item }
          })
      }
    },
    context: {
      get: function() {
        return this.Crud.context.data
          .filter((item) => {
            if (this.keyword === '') {
              return true
            } else {
              return item.key.indexOf(this.keyword) > -1
            }
          })
      }
    },
    coderOptions() {
      return {
        line: true,
        mode: 'velocity', // json数据高亮
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
        // hintOptions: {
        //   tables: {
        //     app: ['name()', 'score()', 'birthday'],
        //     app1: ['name()', 'score()', 'birthday']
        //   }
        // }
      }
    }
  },

  watch: {},

  beforeCreate() {
    printVueLog('vue: beforeCreate')

    const templateId = this.$route.query.templateId
    if (templateId && templateId !== '') {
      defaultForm.template.id = templateId
      defaultForm.templateBlock.templateId = templateId
      defaultForm.context.templateId = templateId
    } else {
      defaultForm.template.id = null
      defaultForm.templateBlock.templateId = null
      defaultForm.context.templateId = null
    }
    this.crud.page.page = 1
    this.crud.page.size = 1000
  },

  created() {
    printVueLog('vue: created')
    this.current.declare = new Declare()

    this.Crud.template = this.$crud['template']
    this.Crud.context = this.$crud['context']
    this.Crud.template.registerVM('form', this, 3)
    this.Crud.context.registerVM('form', this, 3)
  },

  mounted() {
    // 初始化
    printVueLog('vue: mounted')
  },

  beforeDestroy() {
    printVueLog('vue: beforeDestroy')
    this.Crud.template.unregisterVM('form', this)
    this.Crud.context.unregisterVM('form', this)
  },

  destroyed() {
    printVueLog('vue: destroyed')
    this.current.template = defaultValue.template
    this.current.context = defaultValue.context
  },

  methods: {
    // 钩子：在获取表格数据之前执行，false 则代表不获取数据
    [CRUD.HOOK.beforeRefresh](crud) {
      if (crud.tag === 'template') {
        crud.query = {
          id: defaultForm.template.id
        }
      }
      if (crud.tag === 'context') {
        crud.page.size = -1
        crud.query = {
          templateId: defaultForm.template.id ? '0,' + defaultForm.template.id : '0'
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
    clickTab(tab) {
      const blockId = tab._props.name
      this.$refs.tree.setCurrentKey(blockId)
      this.changeBlock(blockId)
    },
    // about code mirror
    showBlock: function(block) {
      const area = Reflect.get(this.$refs, 'textarea_' + block.id)[0]
      // 初始化编辑器实例，传入需要被实例化的文本域对象和默认配置
      block.coder = CodeMirror.fromTextArea(
        area,
        this.coderOptions
      )
      this.coderMap[block.id] = block.coder
      this.setEvent(block)
    },
    setEvent: function(block) {
      // 代码补全
      block.coder.on('inputRead', (cm, key) => {
        if (key.text[0] === '$') {
          block.coder.showHint(
            {
              text: '上下文',
              completeSingle: false,
              hint: this.hintContextCallback
            })
        } else if (key.text[0] === '#') {
          block.coder.showHint(
            {
              text: '逻辑控制',
              completeSingle: false,
              hint: this.hintLogicCallback
            })
        } else if (key.text[0] === '.') {
          const declare = this.current.declare.getDeclare(cm, key)
          block.coder.declare = declare
          if (declare) {
            block.coder.showHint(
              {
                text: '智能感知',
                completeSingle: false,
                hint: this.current.declare.callback
              })
          }
        }
      })
      // 编辑器赋值
      if (block.code) {
        this.setCodeContent(block, block.code)
      } else {
        block.coder.setValue('')
      }
      // 支持双向绑定
      block.coder.on('change', (coder) => {
        block.code = coder.getValue()
        if (this.$emit) {
          this.$emit('input', this.code)
        }
      })
    },

    hintLogicCallback(coder) {
      const cur = coder.getCursor()
      const end = cur.ch
      const start = end
      const list = this.getLogicList()
      // Crud.context
      return {
        list: list,
        from: Pos(cur.line, start),
        to: Pos(cur.line, end)
      }
    },

    getLogicList() {
      const logicText = new LogicText()
      return logicText.getList.map(logic => {
        return {
          text: logic.text,
          displayText: logic.display,
          render: (element, self, data) => {
            element.innerHTML = logic.html
          }
        }
      })
    },

    hintContextCallback(coder) {
      const cur = coder.getCursor()
      const end = cur.ch
      const start = end
      const list = this.getContextList()
      // Crud.context
      return {
        list: list,
        from: Pos(cur.line, start),
        to: Pos(cur.line, end)
      }
    },

    getContextList() {
      return this.Crud.context.data.map(cm => {
        return {
          text: cm.key,
          displayText: cm.content,
          render: (element, self, data) => {
            const htmlText = new HtmlText(cm)
            element.innerHTML = htmlText.html()
          }
        }
      })
    },

    setCodeContent(block, val) {
      setTimeout(() => {
        if (!val) {
          block.coder.setValue('')
        } else {
          block.coder.setValue(val)
        }
      }, 300)
    },
    getCoder(block) {
      if (block) {
        return new Promise((resolve) => {
          (function get() {
            if (block.coder) {
              resolve(block.coder)
            } else {
              setTimeout(get, 10)
            }
          })()
        })
      }
    },
    changeLanguage(coder, language) {
      const modeObj = this.getLanguage(language)
      // 判断父容器传入的语法是否被支持
      if (modeObj) {
        this.mode = modeObj.label
        coder.setOption('mode', `text/${modeObj.value}`)
      }
    },
    getLanguage(block, language) {
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
    changeMode(block, val) {
      // 修改编辑器的语法配置
      block.coder.setOption('mode', `text/${val}`)
      // 获取修改后的语法
      const label = this.getLanguage(block, val).label.toLowerCase()
      // 允许父容器通过以下函数监听当前的语法值
      this.$emit('language-change', label)
    },

    setTheme(val) {
      for (const id in this.coderMap) {
        const coder = this.coderMap[id]
        coder.setOption('theme', val)
      }
      this.coderOptions.theme = val
    },

    // others
    handleNodeClick(node) {
      this.addTab(node.data)
      // this.setCodeContent(node.data.code)
    },
    getBlockLevelClass(level) {
      switch (level) {
        case 1:
          return 'project'
        case 2:
          return 'component'
        case 3:
          return 'database'
        case 4:
          return 'TypeofEntity'
        default:
          return ''
      }
    },
    addTab: function(block) {
      if (block) {
        const b = this.blockTabs.find(tab => {
          return tab.name === block.id
        })
        if (b == null) {
          this.blockTabs.push({
            title: block.name,
            name: block.id,
            data: block
          })
        }
        this.changeBlock(block.id)
        if (b == null) {
          setTimeout(() => {
            this.showBlock(block)
          }, 10)
        }
      }
    },
    removeTab(targetName) {
      const tabs = this.blockTabs
      let activeName = this.active.block
      if (activeName === targetName) {
        activeName = undefined
        for (let index = 0; index < tabs.length; index++) {
          if (tabs[index].name === targetName) {
            const nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.name
            }
          }
        }
      }
      this.blockTabs = tabs.filter(tab => tab.name !== targetName)
      this.$refs.tree.setCurrentKey(activeName)
      this.changeBlock(activeName)
    },
    changeBlock(blockID) {
      this.active.block = blockID
      const find = this.blocks.find(block => {
        if (block.data.id === blockID) {
          return block
        }
      })
      this.disabled.block = (find === undefined)
      this.current.block = find.data
    },
    onSelectContext(e) {
      if (e == null) {
        e = {}
        this.disabled.context = true
      }
      this.disabled.context = false
      this.current.context = e
      defaultForm.context.id = e.id
    },
    onContextAdd() {
      this.Crud.context.form.templateId = this.current.template.id
      this.Crud.context.toAddNoReset()
    },
    showOperatorButton(row) {
      // eslint-disable-next-line eqeqeq
      const del = this.Crud.context.optShow.del
      const global = row.type < 2
      return del && !global
    }
  }
}
