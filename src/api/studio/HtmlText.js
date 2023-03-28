// id:
// templateId
// key:
// content
// type
// dataType
export class HtmlText {
  setIcon(type) {
    const arr = [
      'el-icon-s-cooperation',
      'el-icon-menu',
      'el-icon-share',
      'el-icon-s-data'
    ]
    return '<el-col style="flex: 1"><i class="' + arr[type] + '"></i></el-col>'
  }

  setContent(text) {
    return '<el-input readonly style="flex: 2">' + text + '</el-input>'
  }

  setDataType(type) {
    return '<el-input readonly style="flex: 1">' + type + '</el-input>'
  }

  constructor(cm) {
    this._icon = this.setIcon(cm.type)
    this._content = this.setContent(cm.content)
    this._type = this.setDataType(cm.dataType)
  }

  html() {
    const str = '<div style="width: 200px"><el-row style="display: flex;">' +
      this._icon +
      this._content +
      this._type +
      '</el-row></div>'
    console.log(str)
    return str
  }
}
