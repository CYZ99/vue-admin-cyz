import router from './router/index'
import { getToken } from './componsable/auth'
import { toast, showFullLoding, hideFullLoding } from './componsable/utils'
import store from './store'

// 全局前置守卫
router.beforeEach(async (to, from, next) => {
  // loading
  showFullLoding()

  const token = getToken()
  // 没有登录， 强制跳转回登录首页
  if (!token && to.path != '/login') {
    toast('请先登录', "error")
    return next({path: "/login"})
  }
  // 防止重复登录
  if (token && to.path == "/login") {
    toast("请勿重新登录", "error")
    return next({ path: from.path ? from.path : '/' })
  }

  // 如果用户登录了， 自动获取用户信息， 并存放在vuex 中
  if (token) {
    await store.dispatch("getinfo")
  }

  next()
})

// 全局后置守卫
router.afterEach((to, from) => {
  hideFullLoding()
})

