import { setCookie } from '@/utils/auth1'
import { login, logout, getInfo } from '@/api/user'


const state = {
    id: '',
    ids: [],
    userName: '',
    avatar: '',
    seesion: false,
    point: {},
}
const mutations = {
    SET_ID: (state, id) => {
        state.id = id
    },
    SET_IDS: (state, ids) => {
        state.ids = ids
    },
    SET_USER_NAME(state, name) {
        state.userName = name
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
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
        return new Promise((resolve, reject) => {
            login(userInfo).then(response => {
                /* 登录信息存cookie */
                for (var key in response.data) {
                    setCookie('jiatu_' + key, response.data[key], {
                        expires: new Date().getTime() + 1e3 * 60 * 60 * 24,
                    })
                }
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
            getInfo(state.id).then(response => {
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