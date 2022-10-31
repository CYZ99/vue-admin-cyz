<template>
  <div class="admin">
    <el-container>
      <el-header>
        <c-header></c-header>
      </el-header>
      <el-container>
        <el-aside :width="$store.state.asideWidth">
          <c-aside ></c-aside>
        </el-aside>
        <el-main>
          <c-tag-list></c-tag-list>
          <!-- 子路由的内容渲染到这里 -->
          <router-view v-slot="{ Component }">
            <transition name="fade" >
              <keep-alive :max="10">
                <component :is="Component"></component>
              </keep-alive>
            </transition>
          </router-view>
        </el-main>
      </el-container>

    </el-container>
  </div>
</template>

<script setup>
import CHeader from './components/CHeader.vue'
import CAside from './components/CAside.vue'
import CTagList from './components/CTagList.vue'
</script>

<style  scoped>
.el-aside{
  transition: all 0.5s;
}
.fade-enter-from{
  opacity: 0;
  transform: translate3d(0, -100%, 0);
}

.fade-enter-to {
  opacity: 1;
}

.fade-leave-from{
  opacity: 1;
}

.fade-leave-to{
  opacity: 0;
  transform: translate3d(0, 100%, 0);
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}
.fade-enter-active{
  transition-delay: 0.5s;
}
</style>