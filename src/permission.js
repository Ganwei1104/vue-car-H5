import router from './router'
import store from './store'
import { getToken } from '@/utils/auth' // getToken from cookie

// 权限拦截-beforeEach路由钩子函数
router.beforeEach((to, from, next) => {
    //to 目的路由对象 from 来源路由对象
    if (to.meta.requireAuth) {
        // let token = window.localStorage.getItem('token')
        let token = getToken()
            //判断是否存在token
        if (token) {
            //拉去用户信息
            store.dispatch('GetUser')
            next()
        } else {
            store.dispatch('logOut')
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            })
        }
    } else {
        //不执行拦截，直接进入该路由
        next()
    }

})