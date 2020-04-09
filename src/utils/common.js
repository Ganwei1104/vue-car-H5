import request from '@/utils/request'
import { tipFuc } from '@/utils/tips'

/**
 * post Json
 * @param path
 * @param params
 */
export function postJson(path, params, tips) {
    const result = request({
        url: path,
        method: 'post',
        data: params
    })
    if (tips) {
        result.then(res => {
            // 成功
            tipFuc(res)
        })
    }
    return result
}


export function getJson(path, params, tips) {
    const result = request({
        url: path,
        method: 'get',
        params
    })
    if (tips) {
        result.then(res => {
            // 成功
            tipFuc(res)
        })
    }
    return result
}

export function postForm(path, params, tips) {
    const result = request({
        url: path,
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: params
    })
    if (tips) {
        result.then(res => {
            // 成功
            tipFuc(res)
        })
    }
    return result
}

export function getForm(path, params, tips) {
    const result = request({
        url: path,
        method: 'get',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: params
    })
    if (tips) {
        result.then(res => {
            // 成功
            tipFuc(res)
        })
    }
    return result
}