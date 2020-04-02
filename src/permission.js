import router from './router'
import store from './store'
import { getCookie } from '@/utils/auth1' // getToken from cookie

// 权限拦截-beforeEach路由钩子函数
router.beforeEach((to, from, next) => {
    //to 目的路由对象 from 来源路由对象
    store.commit('SET_ID', getCookie('jiatu_userId'))
    if (to.meta.requireAuth) {

        store.dispatch('GetUser').then(() => {
            if (store.getters.session) {
                //拉去用户信息
                // store.dispatch('GetUser')
                next()
            } else {
                store.dispatch('FedLogOut')
                next({
                    path: '/login',
                    query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
                })
            }
        }).catch(() => {
            store.dispatch('FedLogOut')
            next({
                path: '/login',
                query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        })
    } else {
        //不执行拦截，直接进入该路由
        next()
    }

})