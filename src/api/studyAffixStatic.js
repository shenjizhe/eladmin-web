import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/studyAffixStatic',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'api/studyAffixStatic/',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'api/studyAffixStatic',
    method: 'put',
    data
  })
}

export default { add, edit, del }
