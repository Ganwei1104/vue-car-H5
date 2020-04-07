import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, logout, getInfo } from '@/api/user'


const state = {
    token: getToken(),
    userName: '',
}
const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_NAME: (state, name) => {
        state.userName = name
    },
}
const actions = {
    // 登录
    Login({ commit }, userInfo) {
        return new Promise((resolve, reject) => {
            login(userInfo).then(response => {
                setToken(response.token)
                commit('SET_TOKEN', response.token)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 获取用户信息
    GetInfo({ commit }) {
        return new Promise((resolve, reject) => {
            getInfo().then(response => {
                const data = response.data
                commit('SET_NAME', data.name)
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 登出
    LogOut({ commit, state }) {
        return new Promise((resolve, reject) => {
            logout(state.token).then(() => {
                commit('SET_TOKEN', '')
                removeToken()
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 前端 登出
    FedLogOut({ commit }) {
        return new Promise(resolve => {
            commit('SET_TOKEN', '')
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