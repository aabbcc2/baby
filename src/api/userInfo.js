import request from '@/utils/request'
import qs from 'qs'

export function getUserInfo(data) {/* 根据id查询借款人信息 */
    return request({
      url: '/work/t-user-info/findUserInfo',
      method: 'post',
      data:qs.stringify(data)
    })
  }