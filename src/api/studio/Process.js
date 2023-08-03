import { getToken } from '@/utils/auth'

export class Process {
  constructor() {
    this.url = 'http://test.com:8000/'
  }

  process() {
    console.log('process starting...')
    const _url = this.url + 'api/cicd/progress'

    const xhr = new XMLHttpRequest()
    xhr.open('GET', _url)
    xhr.setRequestHeader('Authorization', 'Bearer ' + getToken())

    xhr.onload = () => {
      const eventSource = new EventSource(_url, {
        withCredentials: true,
        headers: {
          Authorization: 'Bearer ' + getToken()
        }
      })

      eventSource.onmessage = function(event) {
        console.log(event.data)
      }
      eventSource.onerror = function(error) {
        console.log(error)
      }
    }
    xhr.onprogress = function(event) {
      console.log(event)
    }

    xhr.send()
  }
}
