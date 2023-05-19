import request from '@/utils/request'

export class StockStaticHelper {
  getInfos(id) {
    return request({
      url: 'api/stock-statics/' + id + '/infos',
      method: 'get'
    })
  }
}

