import qs from 'qs'
import request from '@/utils/request'
// api

// 登录
export function login(params) {
    console.log('===========', params);
    return request({
        url: '/login',
        method: 'post',
        data: qs.stringify(params)
    })
}
/**
 * 获取用户信息方法
 * @param id 入参 用户id
 */
export function getInfo(id) {
    return request({
        url: '/org/group/get',
        method: 'post',
        params: { id: id }
    })
}
// 用户信息
export function getUserInfo(params) {
    return request({
        url: '/user/userinfo',
        method: 'get',
        data: qs.stringify(params)
    })
}