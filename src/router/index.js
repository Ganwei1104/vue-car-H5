import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import { getToken } from '@/utils/auth' // getToken from cookie

Vue.use(Router)

export const router = [{
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
    {
        path: '/info',
        name: 'Info',
        component: () =>
            import ('@/views/info/index'),
        meta: {
            keepAlive: false,
            requireAuth: true
        }
    },
]

const createRouter = () =>
    new Router({
        // mode: 'history', // 如果你是 history模式 需要配置vue.config.js publicPath
        // base: '/app/',
        scrollBehavior: () => ({ y: 0 }),
        routes: router
    })

export default createRouter()