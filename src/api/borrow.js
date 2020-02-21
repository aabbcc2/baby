import request from '@/utils/request'
import qs from 'qs'

export function getAllBorrow(data) {/* 获取所欲借款项目 */
    return request({
      url: '/work/t-borrow/qurBorrowPage',
      method: 'post',
      data:qs.stringify(data)
    })
  }