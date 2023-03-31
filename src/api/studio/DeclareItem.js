export class DeclareItem {
  constructor(item) {
    this.item = item
    this.displayText = this.getText()
    this.tip = this.getTip()
  }

  getText() {
    return '<el-input readonly style="flex: 1">' + this.item.key + '</el-input>'
  }

  getTip() {
    return '<el-input readonly style="flex: 2">' + this.item.tooltip + '</el-input>'
  }

  html() {
    const str = '<div style="width: 500px"><el-row style="display: flex;">' +
      this.displayText +
      this.tip +
      '</el-row></div>'
    return str
  }
}
