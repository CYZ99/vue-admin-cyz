<template>
  <div class="aside" :style="{width: $store.state.asideWidth}">
    <el-menu

      :default-active="defaultActive"
      class="border-0"
      @select="handleSelect"
      :collapse="isCollapse"
      :collapse-transition="false"
      :unique-opened="true"
    >
      <template v-for="(item, index) in asideMenu" :key="index">
        <!-- 二级菜单 -->
        <el-sub-menu  v-if="item.child && item.child.length > 0 " :index="item.name">
          <template #title>
            <el-icon>
              <!-- 动态图标 -->
              <component :is="item.icon"></component>
            </el-icon>
            <span>{{ item.name }}</span>
          </template>
          <el-menu-item v-for="(item2, index2) in item.child " :key="index2"  :index="item2.frontpath">
            <el-icon>
              <component :is="item2.icon"></component>
            </el-icon>
            <span>{{item2.name}}</span>
          </el-menu-item>
        </el-sub-menu>

        <!-- 一级菜单 -->
        <el-menu-item v-else :index="item.frontpath">
          <el-icon>
            <component :is="item.icon"></component>
          </el-icon>
          <span>{{ item.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script setup>
import { useRouter, useRoute} from 'vue-router';
import { computed,ref } from 'vue';
import { useStore } from 'vuex'
const store = useStore()
const router = useRouter()
const route = useRoute()
// 拿到当前页面的路径
const defaultActive = ref(route.path)

const isCollapse = computed(() => {
  return store.state.asideWidth == "64px"
})


// 模拟菜单列表的数据
const asideMenu = [{
  "name": '后台面板',
  "icon": 'help',
  "child": [{
    "name": "主控台",
    "icon": "home-filled",
    "frontpath":"/"
  }],
}, {
    "name": '商城管理',
    "icon": 'shopping-bag',
    "child": [{
      "name": "商品管理",
      "icon": "shopping-cart-full",
      "frontpath": "/goods/list",
    }],
  },{
    "name": '列表管理',
    "icon": 'shopping-bag',
  }]

// 选中跳转到对应的路由
const handleSelect = (e) => {
  router.push(e)
}


</script>

<style  scoped>
.aside {
  transition: all 0.5s;
  position: fixed;
  top: 64px;
  left: 0;
  bottom:0;
  overflow-y: auto;
  overflow-x: hidden;
  @apply shadow-md bg-light-50;
}
</style>