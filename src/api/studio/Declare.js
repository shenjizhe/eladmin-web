import request from '@/utils/request'
import { Pos } from 'codemirror/src/line/pos'

export class Declare {
  current
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

  setKey(cm, key) {
    this.current = null
    const word = this.findWord(cm, key)
    this.current = this.findDeclare(word)
    return this.current != null
  }

  callback(coder) {
    console.log(1)
    const cur = coder.getCursor()
    const end = cur.ch
    const start = end
    const list = this.current.itemList.map(item => {
      return {
        text: item.expression,
        displayText: item.key
      }
    })
    console.log(list)
    // Crud.context
    return {
      list: list,
      from: Pos(cur.line, start),
      to: Pos(cur.line, end)
    }
  }
}
