import { createRouter, createWebHashHistory } from 'vue-router'
import Index from '../pages/index.vue'
import About from '../pages/about.vue'
import NotFound from '../pages/404.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: Index
    },{
      path: '/about',
      component: About
    },{
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})

export default router