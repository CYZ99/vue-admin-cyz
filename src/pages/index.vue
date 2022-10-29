<template>
  <div class="home">
    <h2>{{$store.state.user.username}}</h2>
    <el-button @click="handleLogout">退出登录</el-button>
  </div>
</template>

<script setup>
import { showModel, toast } from '../componsable/utils'
import { logout } from '../api/manager'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const router = useRouter()
const store = useStore()

function handleLogout() {
  showModel("是否要退出登录").then(res => {
    logout().finally(() => {
      // 清除token 和用户内容 
      store.dispatch("logout")
      // 跳转回到登录页
      router.push("/login")
      // 提示退出登录成功
      toast("退出登录成功", "success")
    })
  })
}
</script>

<style scoped>
</style>