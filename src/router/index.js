import { createRouter, createWebHashHistory } from 'vue-router'
import Admin from '../layout/admin.vue'
import Index from '../pages/index.vue'
import Login from '../pages/login.vue'
import NotFound from '../pages/404.vue'

const GoodsList = () => import('../pages/goods/list.vue')
const GoodsCategroy = () => import("../pages/goods/category.vue")
const User = () => import("../pages/user/list.vue")
const Order = () => import("../pages/order/list.vue")
const Comment = () => import("../pages/comment/list.vue")
const Image = () => import("../pages/image/list.vue")
const Notice = () => import("../pages/notice/list.vue")
const SettingBase = () => import('../pages/setting/list.vue')
const Coupon = () => import('../pages/coupon/list.vue')

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
  },
  {
    name: '/user/list',
    path: '/user/list',
    component: User,
    meta: {
      title: "用户管理"
    }
  },
  {
    name: '/order/list',
    path: '/order/list',
    component: Order,
    meta: {
      title: "订单管理"
    }
  },
  {
    name: '/comment/list',
    path: '/comment/list',
    component: Comment,
    meta: {
      title: "评价管理"
    }
  },
  {
    name: '/image/list',
    path: '/image/list',
    component: Image,
    meta: {
      title: "图库管理"
    }
  },
  {
    name: '/notice/list',
    path: '/notice/list',
    component: Notice,
    meta: {
      title: "公告管理"
    }
  },
  {
    name: '/setting/base',
    path: '/setting/base',
    component: SettingBase,
    meta: {
      title: "配置管理"
    }
  },
  {
    name: '/coupon/list',
    path: '/coupon/list',
    component: Coupon,
    meta: {
      title: "优惠券管理"
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