import { createStore } from 'vuex'
import { getinfo } from '../api/manager'
import { removeToken } from '../componsable/auth'
const store = createStore({
  state() {
    return {
      // 用户信息
      user: {}
    }
  },
  mutations: {
    // 记录用户信息
    SET_USERINFO(state, user) {
      state.user = user
    }
  },
  actions: {
    // actions
    getinfo(context) {
      return new Promise((resolve, reject) => {
        getinfo().then(res => {
          context.commit("SET_USERINFO", res)
          resolve(res)
        }).catch(err => reject(err))
      })
    },
    logout(context) {
      // 移除cookie的token
      removeToken("admin-token");
      // 清除用户状态
      context.commit("SET_USERINFO", {})
    }
  }
})

export default store