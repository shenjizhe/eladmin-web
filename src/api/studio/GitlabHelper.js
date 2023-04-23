import request from '@/utils/request'

export class GitlabHelper {
  constructor() {
    this.url = 'http://localhost:8000/'
  }

  pushProject(id) {
    console.log('push code')
    return request({
      url: this.url + '/api/gitlab/push-project/',
      method: 'post',
      data: id
    })
  }
}

