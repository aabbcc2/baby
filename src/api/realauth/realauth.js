import request from '@/utils/request'
import qs from 'qs'

export function getUserRealauth(data) {/* 获取所欲借款项目 */
  return request({
    url: 'http://localhost:21001/work/user/realauth/'+data,
    method: 'get',
  })
}
