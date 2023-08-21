import request from '@/utils/request'

const head = 'http://zentao.licaiedu.com/apiweb/'

export function login(username, password, code, uuid) {
  return request({
    url: head + 'auth/login',
    method: 'post',
    data: {
      username,
      password,
      code,
      uuid
    }
  })
}

export function getInfo() {
  return request({
    url: head + 'auth/info',
    method: 'get'
  })
}

export function getCodeImg() {
  return request({
    url: head + 'auth/code',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: head + 'auth/logout',
    method: 'delete'
  })
}
