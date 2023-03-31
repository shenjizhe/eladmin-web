import request from '@/utils/request'
import { Pos } from 'codemirror/src/line/pos'
import { DeclareItem } from '@/api/studio/DeclareItem'

export class Declare {
  declares
  _url = 'http://localhost:8071/'

  constructor() {
    this.init()
  }

  init() {
    request({
      url: this._url + 'declare/',
      method: 'get'
    }).then(response => {
      if (response.errCode === 0) {
        this.declares = response.data
      } else {
        console.error(response.msg)
      }
    }).catch(error => {
      console.error(error)
    })
  }

  findWord(cm, key) {
    const end = key.from
    const start = { line: end.line, ch: 0 }
    let line = cm.doc.getRange(start, end)
    const lastIndexOf = line.lastIndexOf('$')
    line = line.substr(lastIndexOf + 1)
    return line
  }

  findDeclare(key) {
    for (const index in this.declares) {
      const declare = this.declares[index]
      if (declare.name === key) {
        return declare
      }
    }
  }

  getDeclare(cm, key) {
    const word = this.findWord(cm, key)
    return this.findDeclare(word)
  }

  callback(coder) {
    const cur = coder.getCursor()
    const end = cur.ch
    const start = end
    const list = coder.declare.itemList.map(i => {
      const item = new DeclareItem(i)
      return {
        text: i.expression,
        displayText: item.di,
        render: (element, self, data) => {
          element.innerHTML = item.html()
        }
      }
    })
    // Crud.context
    return {
      list: list,
      from: Pos(cur.line, start),
      to: Pos(cur.line, end)
    }
  }
}
