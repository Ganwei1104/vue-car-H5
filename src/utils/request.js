import axios from 'axios'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { Toast } from 'vant'
// 根据环境不同引入不同api地址
import { baseApi } from '@/config'
// create an axios instance
const service = axios.create({
    baseURL: baseApi, // url = base api url + request url
    withCredentials: true, // send cookies when cross-domain requests
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
            // 设置请求头，避免跨域问题
            if (config.ContentType === undefined) {
                config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
            } else {
                config.headers['Content-Type'] = config.ContentType;
            }
            // if (store.getters.token) {
            //     config.headers['X-Token'] = getToken() // 让每个请求携带自定义token
            // }
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
            // 登录超时,重新登录
            if (res.status === 401) {
                store.dispatch('FedLogOut').then(() => {
                    location.reload()
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