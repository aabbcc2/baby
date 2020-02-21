import request from '@/utils/request'
import qs from 'qs'

export function findTBidByborrowId(data) {/* 根据借款id查询投标记录集合 */
    return request({
      url: '/work/t-bid/findTBidByborrowId',
      method: 'post',
      data:qs.stringify(data)
    })
  }