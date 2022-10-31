import { createStore } from 'vuex'
import { getinfo } from '../api/manager'
import { removeToken } from '../componsable/auth'
const store = createStore({
  state() {
    return {
      // 用户信息
      user: {},
      // 侧边栏的宽度
      asideWidth: "250px",
      // 侧边栏的数据
      menus: [],
      ruleNames:[]
    }
  },
  mutations: {
    // 记录用户信息
    SET_USERINFO(state, user) {
      state.user = user
    },
    // 展开和收缩侧边栏
    handleAsideWidth(state) {
      state.asideWidth = state.asideWidth == "250px" ? "64px" : "250px"
    },
    // 修改菜单
    SET_MENUS(state, menus) {
      state.menus = menus
    },
    SET_RULENAMES(state, ruleNames) {
      state.ruleNames = ruleNames
    }
  },
  actions: {
    // actions
    getinfo(context) {
      return new Promise((resolve, reject) => {
        getinfo().then(res => {
          context.commit("SET_USERINFO", res)
          context.commit("SET_MENUS", res.menus)
          context.commit("SET_RULENAMES", res.ruleNames)
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