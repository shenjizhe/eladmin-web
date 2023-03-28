export class HtmlText {
  get iconText() {
    return this._icon
  }

  setIcon(type) {
    const arr = [
      '<i class="el-icon-s-cooperation"></i>',
      '<i class="el-icon-menu"></i>',
      '<i class="el-icon-share"></i>',
      '<i class="el-icon-s-data"></i>'
    ]

    return arr[type]
  }

  constructor(cm) {
    this._icon = this.setIcon(cm.type)
  }
}
