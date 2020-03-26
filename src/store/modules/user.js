import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getUserInfo } from '@/api/user'

const state = {
    id: '',
    token: getToken(),
    userName: '',
    seesion: false,
    point: {},
}
const mutations = {
    SET_ID: (state, id) => {
        state.id = id
    },
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_USER_NAME(state, name) {
        state.userName = name
    },
    SET_SESSION(state, seesion) {
        state.seesion = seesion
    },
    SET_POINT(state, point) {
        state.point = point
    },
    SET_ORGID: (state, orgId) => {
        state.orgId = orgId
    },
}
const actions = {
    // 登录
    Login({ commit }, userInfo) {
        const userName = userInfo.username.trim()
        return new Promise((resolve, reject) => {
            login(userName, userInfo.userPwd).then(response => {
                /* 登录信息存cookie */
                for (var key in response.data) {
                    setCookie('jiatu_' + key, response.data[key], {
                        expires: new Date().getTime() + 1e3 * 60 * 60 * 24,
                        path: '/'
                    })
                }
                commit('SET_TOKEN', response.token)
                commit('SET_ID', response.data.userId)
                commit('SET_IDS', response.data.resIds)
                commit('SET_SESSION', true)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    //用户信息
    GetUser({ commit, state }) {
        return new Promise((resolve, reject) => {
            getUserInfo(state.id).then(response => {
                const data = response.data;
                if (response.status === 200) {
                    // 把 userInfo 存进 Vuex
                    commit('SET_USER_NAME', data.groupName)
                    commit('SET_SESSION', true)
                    commit('SET_POINT', { lng: data.longitude, lat: data.latitude })
                }
            }).catch((error) => {
                reject(error)
            })
        })
    },
    //用户退出
    LogOut({ commit, state }) {
        return new Promise((resolve, reject) => {
            logout(state.id).then(() => {
                commit('SET_ID', '')
                commit('SET_IDS', [])
                commit('SET_SESSION', false)
                    // removeToken()
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 前端 登出
    FedLogOut({ commit }) {
        return new Promise(resolve => {
            commit('SET_ID', '')
            commit('SET_SESSION', false)
                // removeToken()
            resolve()
        })
    }

}
export default {
    namespaced: false,
    state,
    mutations,
    actions
}