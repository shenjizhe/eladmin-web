import request from '@/utils/request'

export class GitlabHelper {
  constructor() {
    this.url = 'http://test.com:8000/'
  }

  pushProject(componentId) {
    console.log('push code' + componentId)
    return request({
      url: this.url + 'api/gitlab/push-project/' + componentId,
      method: 'post'
    })
  }
}

