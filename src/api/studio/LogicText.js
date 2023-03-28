export class LogicText {
  constructor() {
    this._arr = [
      { text: 'if()', display: '#if', html: '<el-input>#if</el-input>' },
      { text: 'foreach( in )', display: '#foreach', html: '<el-input>#foreach</el-input>' },
      { text: 'end\n', display: '#end', html: '<el-input>#end</el-input>' },
      { text: 'set()', display: '设置', html: '<el-input>设置</el-input>' },
      { text: '# ', display: '注释', html: '<el-input>注释</el-input>' }
    ]
  }
  get getList() {
    return this._arr
  }
}
