import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/server',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'api/server/',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'api/server',
    method: 'put',
    data
  })
}

export function execute(serverId, key) {
  const data = {
    serverId: serverId,
    key: key
  }
  return request({
    url: 'api/server/execute',
    method: 'post',
    data
  })
}

export function copy(serverId, filePath, key) {
  const data = {
    serverId: serverId,
    filePath: filePath,
    key: key
  }
  return request({
    url: 'api/server/copy',
    method: 'post',
    data
  })
}

export default { add, edit, del, execute, copy }
