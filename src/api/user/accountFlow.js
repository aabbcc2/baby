import request from '@/utils/request'
import qs from 'qs'

export function getAccountFlow(data) {/* 获取所欲借款项目 */
  return request({
    url: 'http://localhost:21001/user/accountFlow/query',
    method: 'post',
    data:qs.stringify(data)
  })
}
