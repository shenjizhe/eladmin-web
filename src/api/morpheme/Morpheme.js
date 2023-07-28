import request from '@/utils/request'

export class Morpheme {
  constructor() {
    this.url = ''
  }

  current() {
    console.log('current morpheme')
    return request({
      url: this.url + '/api/morpheme-study/morpheme-current',
      method: 'get'
    })
  }

  next() {
    console.log('next morpheme')
    return request({
      url: this.url + '/api/morpheme-study/morpheme-next',
      method: 'get'
    })
  }

  previous() {
    console.log('previous morpheme')
    return request({
      url: this.url + '/api/morpheme-study/morpheme-previous',
      method: 'get'
    })
  }

  isFirst() {
    console.log('check is first')
    return request({
      url: this.url + '/api/morpheme-study/is-first',
      method: 'get'
    })
  }

  isLast() {
    console.log('check is last')
    return request({
      url: this.url + '/api/morpheme-study/is-last',
      method: 'get'
    })
  }
}

