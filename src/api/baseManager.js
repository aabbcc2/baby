import request from '@/utils/request'
import qs from 'qs'

/**
 * 通用查询方法
 * @param {*} params
 * @param {*} reqUrl
 */
export function query (params, reqUrl) {
  return request({
    url: reqUrl, // 'pc/base/course/qryCourseInfoPage'
    method: 'post',
    data: qs.stringify(params)
  })
}

/**
 * 通用保存方法
 * @param {*} params
 * @param {*} reqUrl
 */
export function save (params, reqUrl) {
  return request({
    url: reqUrl, // 'pc/base/course/qryCourseInfoPage'
    method: 'post',
    data: qs.stringify(params)
  })
}
