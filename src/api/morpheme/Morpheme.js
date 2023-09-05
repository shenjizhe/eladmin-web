import request from '@/utils/request'

export class Morpheme {
  constructor() {
    this.url = ''
  }

  version() {
    console.log('current version')
    return request({
      url: this.url + '/api/system/version',
      method: 'get'
    })
  }

  uuid() {
    console.log('current uuid')
    return request({
      url: this.url + '/api/system/uuid',
      method: 'get'
    })
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

  transferWord(word) {
    return request({
      url: this.url + '/api/word/transfer-words/' + word,
      method: 'get'
    })
  }

  getNewMorphemes() {
    return request({
      url: this.url + '/api/morpheme-study/morpheme-today/',
      method: 'get'
    })
  }

  getNewWords() {
    return request({
      url: this.url + '/api/morpheme-study/word-today/',
      method: 'get'
    })
  }

  getNewDatas() {
    return request({
      url: this.url + '/api/morpheme-study/study-today/',
      method: 'get'
    })
  }

  needReviewMorphemes() {
    return request({
      url: this.url + '/api/morpheme-study/review-morphemes/',
      method: 'get'
    })
  }

  needReviewWords() {
    return request({
      url: this.url + '/api/morpheme-study/review-words/',
      method: 'get'
    })
  }

  reviewMorpheme(morphemeId, eventType) {
    return request({
      url: this.url + '/api/morpheme-study/review-morphemes/' + morphemeId + '/' + eventType,
      method: 'post'
    })
  }

  reviewWord(wordId, eventType) {
    return request({
      url: this.url + '/api/morpheme-study/review-words/' + wordId + '/' + eventType,
      method: 'post'
    })
  }

  searchWors(text) {
    return request({
      url: this.url + '/api/morpheme-study/search-words?text=' + text,
      method: 'get'
    })
  }

  searchMorphemes(text) {
    return request({
      url: this.url + '/api/morpheme-study/search-morphemes?text=' + text,
      method: 'get'
    })
  }

  getTodayStatics() {
    return request({
      url: this.url + '/api/morpheme-study/user-statics-today/',
      method: 'get'
    })
  }
}

