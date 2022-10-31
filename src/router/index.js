import { createRouter, createWebHashHistory } from 'vue-router'
import Admin from '../layout/admin.vue'
import Index from '../pages/index.vue'
import Login from '../pages/login.vue'
import NotFound from '../pages/404.vue'

const GoodsList = () => import('../pages/goods/list.vue')
const GoodsCategroy = () => import("../pages/goods/category.vue")
export const router = createRouter({
  history: createWebHashHistory(),
  // 默认路由，所有用户共享
  routes: [
    {
      name: 'admin',
      path: '/',
      component: Admin,
    }, {
      path: '/login',
      component: Login
    }, {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})

// 动态路由，用于匹配菜单动态添加路由
const asyncRoutes = [{
  name: '/goods/list',
  path: '/goods/list',
  component: GoodsList,
  meta: {
    title: "商品管理"
  }
}, {
    name:'/',
    path: '/',
    component: Index,
    meta: {
      title: "后台首页"
    }
  }, {
    name: '/category/list',
    path: '/category/list',
  component: GoodsCategroy,
    meta: {
      title: "分类管理"
    }
  }
]

// 动态添加路由方法
export function addRoutes(menus) {
  // 是否有新的路由
  let hasNewRoutes = false
  const patchRoutesByMenus = (arr) => {
    arr.forEach(e => {
      let item = asyncRoutes.find(o => o.path == e.frontpath)
      // 存在并且之前没有注册过路由
      if (item && !router.hasRoute(item.path)) {
        // 添加 嵌套路由
        router.addRoute('admin', item)
        hasNewRoutes = true
      }
      if (e.child && e.child.length > 0) {
        // 发现有嵌套组件递归调用
        patchRoutesByMenus(e.child)
      }
    });
  }
  patchRoutesByMenus(menus)
  return hasNewRoutes
}