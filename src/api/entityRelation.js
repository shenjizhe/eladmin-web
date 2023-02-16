import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/entityRelation',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'api/entityRelation/',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'api/entityRelation',
    method: 'put',
    data
  })
}

export default { add, edit, del }
