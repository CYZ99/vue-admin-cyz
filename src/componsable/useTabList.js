import { ref } from 'vue'
import { useCookies } from '@vueuse/integrations/useCookies'
import { useRoute, onBeforeRouteUpdate, useRouter } from 'vue-router'

export function useTabList() {
  const cookie = useCookies()
  const route = useRoute()
  const router = useRouter()
  // 绑定到当前路径

  const activeTab = ref(route.path)
  const tabList = ref([
    {
      name: '/',
      title: '后台首页',
      path: '/',
    },
  ])

  // 添加标签
  function addTab(tab) {
    let noTab = tabList.value.findIndex(t => t.path == tab.path) == -1
    if (noTab) {
      tabList.value.push(tab);
    }
    // 将tab添加到cookie
    cookie.set("tabList", tabList.value);
  }

  // 初始化标签导航,将cookie中的 token 赋值给 tabList
  function initTabList() {
    let tabs = cookie.get("tabList");
    if (tabs) {
      tabList.value = tabs;
    }
  }
  initTabList()


  // 监听路由的切换，拿到元信息添加到tab中
  onBeforeRouteUpdate((to, from) => {
    // 显示激活状态
    activeTab.value = to.path
    // 添加标签路由
    addTab({
      path: to.path,
      title: to.meta.title
    })
  })

  // 标签点击事件
  const changeTab = (t) => {
    router.push(t)
  }

  // 删除标签
  const removeTab = (tab) => {
    // 这里可以拿到绑定的 name值 也就是路径
    // 判断列表中是否上一个和下一个 tag 删除掉这个自动移到下一个，没有下一个自动移到上一个
    let tabs = tabList.value
    let a = activeTab.value
    if (a == tab) {
      tabs.forEach((tabItem, index) => {
        if (tabItem.path == tab) {
          const nextTab = tabs[index + 1] || tabs[index - 1];
          // 如果有上一个或者下一个 直接将这一个赋值给当前，值发生变化后就会自动跳转
          if (nextTab) {
            a = nextTab.path
          }
        }
      })
    }
    activeTab.value = a;
    tabList.value = tabList.value.filter(item => {
      return item.path != tab
    })

    cookie.set("tabList", tabList.value)
  }

  // 关闭其他和关闭所有
  const handleClose = (item) => {
    if (item == "clearAll") {
      activeTab.value = '/'
      tabList.value = [{
        name: '/',
        title: '后台首页',
        path: '/',
      }]
    } else if (item == "clearOther") {
      tabList.value = tabList.value.filter(item => {
        return item.path == '/' || item.path == activeTab.value
      })
      cookie.set('tabList', tabList.value)
    }
  }

  return {
    activeTab,
    tabList,
    changeTab,
    removeTab,
    handleClose
  }
}