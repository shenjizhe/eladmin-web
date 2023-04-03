import request from '@/utils/request'

export class CodeFactory {
  constructor() {
    this.url = 'http://localhost:8071/'
  }

  generate(id) {
    request({
      url: this.url + 'code-factory/generate/' + id,
      method: 'post'
    }).then(response => {
      if (response.errCode === 0) {
        console.log(response.msg)
      } else {
        console.error(response.msg)
      }
    }).catch(error => {
      console.error(error)
    })
  }
}

