<template>
  <div class="admin">
    <el-container>
      <el-header>
        <c-header></c-header>
      </el-header>
      <el-container>
        <el-aside>
          <c-aside></c-aside>
        </el-aside>
        <el-main>
          <c-tag-list></c-tag-list>
          <router-view></router-view>
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
</style>