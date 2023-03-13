// import 'codemirror/theme/ambiance.css'
// import 'codemirror/lib/codemirror.css'
// import 'codemirror/addon/hint/show-hint.css'
//
// const CodeMirror = require('codemirror')
// require('codemirror/addon/edit/matchbrackets')
// require('codemirror/addon/selection/active-line')
// require('codemirror/mode/javascript/javascript')
// require('codemirror/addon/hint/show-hint')
// require('codemirror/keymap/sublime.js')
// require('codemirror/addon/selection/active-line.js')
// require('codemirror/addon/edit/matchbrackets.js')
// require('codemirror/addon/display/autorefresh.js')
//
// // @vue/component
// export default {
//   name: 'TemplateIde',
//
//   components: {},
//
//   mixins: [],
//
//   props: {},
//
//   data() {
//     return {}
//   },
//
//   computed: {},
//
//   watch: {},
//
//   created() {},
//
//   mounted() {
//     this.editorText = CodeMirror.fromTextArea(this.$refs.mycode, {
//       mode: { name: 'javascript', globalVars: true },
//       indentWithTabs: true,
//       smartIndent: true,
//       lineNumbers: true,
//       matchBrackets: true,
//       autoRefresh: true,
//       extraKeys: { Ctrl: 'autocomplete' }, // 自定义快捷键
//       hintOptions: {
//         // 自定义提示选项
//         tables: {
//           users: ['name', 'score', 'birthDate'],
//           countries: ['name', 'population', 'size']
//         }
//       }
//     })
//     // 可选,挂载一下监听事项
//     this.editorText.on('change', (cm: any) => {
//       this.code = cm.getValue() // 这里要用多一个载体去获取值,不然会重复赋值卡顿
//     })
//   },
//
//   methods: {
//     refresh() {
//       this.$nextTick(() => {
//         this.editorText.refresh()
//       })
//     },
//     setValue(value:string) {
//       this.cminstance.setValue(this.textarea)
//       this.refresh()
//     }
//   }
// }
