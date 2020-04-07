import axios from 'axios'
import store from '@/store'
import qs from 'qs' // 将参数序列化
import { getToken } from '@/utils/auth'
import { Toast } from 'vant'
// 根据环境不同引入不同api地址
import { baseApi } from '@/config'
// create an axios instance
const service = axios.create({
    baseURL: baseApi, // url = base api url + request url
    withCredentials: true, // send cookies when cross-domain requests允许携带cookies
    timeout: 5000 // request timeout
})

// request拦截器 request interceptor
service.interceptors.request.use(
        config => {
            // 不传递默认开启loading
            if (!config.hideloading) {
                // loading
                Toast.loading({
                    forbidClick: true
                })
            }
            if (config.method !== 'post') {
                config.data = qs.stringify(config.data)
            }
            // 参数格式化
            if (config.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
                const params = new URLSearchParams()
                for (var key in config.data) { // 遍历键值对
                    params.append(key, config.data[key])
                }
                config.data = params
            } else {
                config.headers['Content-Type'] === 'application/json;charset=UTF-8'
            }
            if (store.getters.token) {
                config.headers['X-Token'] = getToken() // 让每个请求携带自定义token
            }
            return config
        },
        error => {
            // do something with request error
            console.log(error) // for debug
            return Promise.reject(error)
        }
    )
    // respone拦截器
service.interceptors.response.use(
    response => {
        Toast.clear()
        const res = response.data
        if (res.status && res.status !== 200) {
            Toast.loading({
                    forbidClick: true
                })
                // 登录超时,重新登录
            if (res.status === 501) {
                store.dispatch('FedLogOut').then(() => {

                })
            }
            return Promise.reject(res || 'error')
        } else {
            return Promise.resolve(res)
        }
    },
    error => {
        Toast.clear()
        console.log('err' + error) // for debug
        return Promise.reject(error)
    }
)

export default service