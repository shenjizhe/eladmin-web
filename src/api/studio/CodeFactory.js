import request from '@/utils/request'

export class CodeFactory {
  constructor() {
    this.url = 'http://test.com:8071/'
  }

  generate(id) {
    return request({
      url: this.url + 'code-factory/generate/' + id + '?outputType=file',
      method: 'post'
    })
  }
}

