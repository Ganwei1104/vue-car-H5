import { getToken, setToken, removeToken } from '@/utils/auth'
import { getUserInfo } from '@/api/user'
const state = {
    token: getToken(),
    userName: ''
}
const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_USER_NAME(state, name) {
        state.userName = name
    }
}
const actions = {
    Login({ commit }) {

    },
    GetUser({ commit }) {
        return new Promise((resolve, reject) => {
            getUserInfo().then(res => {
                if (res.status === 200) {
                    commit(types.USERINFO, res.data) // 把 userInfo 存进 Vuex
                }
            }).catch((error) => {
                reject(error)
            })
        })
    }

}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}