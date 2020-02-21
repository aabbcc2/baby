import request from '@/utils/request'
import qs from 'qs'

export function findDetailByBorrowId(data) {/* 根据借款id查询还款记录 */
    return request({
      url: '/work/t-repayment-detail/findDetailByBorrowId',
      method: 'post',
      data:qs.stringify(data)
    })
  }