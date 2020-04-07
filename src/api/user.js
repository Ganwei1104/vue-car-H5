import qs from 'qs'
import request from '@/utils/request'
// api

// 登录
export function login(params) {
    return request({
        url: 'system/login',
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: params
    })
}
//用户信息
export function getInfo() {
    return request({
        url: 'system/api/v1/sysuser/info',
        method: 'get'
    })
}
//登出
export function logout() {
    return request({
        url: 'system/logout',
        method: 'post'
    })
}