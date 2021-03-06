import router from './router'
import store from './store'
import { getToken } from '@/utils/auth' // getToken from cookie

// 权限拦截-beforeEach路由钩子函数
router.beforeEach((to, from, next) => {
    //to 目的路由对象 from 来源路由对象
    if (to.meta.requireAuth) {
        let token = getToken();
        if (token) {
            //拉去用户信息
            store.dispatch('GetInfo').then(() => {
                next()
            }).catch(() => {
                store.dispatch('FedLogOut')
            })
        } else {
            store.dispatch('FedLogOut')
            next({
                path: '/login',
                query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    } else {
        //不执行拦截，直接进入该路由
        next()
    }

})