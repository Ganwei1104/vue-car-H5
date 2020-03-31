import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import { getToken } from '@/utils/auth' // getToken from cookie

Vue.use(Router)

// export const router = [{
//         path: '/login',
//         name: 'Login',
//         component: () =>
//             import ('@/views/login/index'),
//         meta: {
//             keepAlive: false,
//             requireAuth: false
//         }
//     },
//     {
//         path: '/',
//         name: 'index',
//         component: () =>
//             import ('@/views/home/index'),
//         meta: {
//             keepAlive: false,
//             requireAuth: false
//         }
//     },
//     {
//         path: '/menu',
//         name: 'Menu',
//         component: () =>
//             import ('@/views/menu/index'),
//         meta: {
//             keepAlive: false,
//             requireAuth: true
//         }
//     },
// ]
const router = new Router({
        routes: [{
                path: '/login',
                name: 'Login',
                component: () =>
                    import ('@/views/login/index'),
                meta: {
                    keepAlive: false,
                    requireAuth: false
                }
            },
            {
                path: '/',
                name: 'index',
                component: () =>
                    import ('@/views/home/index'),
                meta: {
                    keepAlive: false,
                    requireAuth: false
                }
            },
            {
                path: '/menu',
                name: 'Menu',
                component: () =>
                    import ('@/views/menu/index'),
                meta: {
                    keepAlive: false,
                    requireAuth: true
                }
            },
        ],
        scrollBehavior: () => ({ y: 0 }),
    })
    // 权限拦截-beforeEach路由钩子函数
router.beforeEach((to, from, next) => {
        //to 目的路由对象 from 来源路由对象
        if (to.meta.requireAuth) {
            // let token = window.localStorage.getItem('token')
            let token = getToken();
            console.log('----------', token);
            //判断是否存在token
            if (token) {
                //拉去用户信息
                store.dispatch('GetUser')
                next()
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
    // const createRouter = () =>
    //     new Router({
    //         // mode: 'history', // 如果你是 history模式 需要配置vue.config.js publicPath
    //         // base: '/app/',
    //         scrollBehavior: () => ({ y: 0 }),
    //         routes: router
    //     })

export default router