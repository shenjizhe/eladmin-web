import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/serverDeploy',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'api/serverDeploy',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'api/serverDeploy',
    method: 'put',
    data
  })
}

export function execute(serverId, key) {
  console.log(serverId, key)
  const data = {
    serverId: serverId,
    key: key
  }
  return request({
    url: 'api/serverDeploy/execute',
    method: 'post',
    data
  })
}

export default { add, edit, del, execute }
