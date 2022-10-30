<template>
  <div class="c-header">
    <div class="left">
      <span class="logo">
        <el-icon class="mr-1">
          <Platform />
        </el-icon>
        后台系统
      </span>
      <el-icon class="icon-btn" @click="$store.commit('handleAsideWidth')">
        <Fold v-if="$store.state.asideWidth == '250px'"/>
        <Expand v-else/>
      </el-icon>
      <el-tooltip effect="dark" content="刷新" placement="bottom">
        <el-icon class="icon-btn" @click="handleRefresh">
          <Refresh />
        </el-icon>
      </el-tooltip>
    </div>

    <div class="ml-auto flex justify-center items-center">
      <el-tooltip effect="dark" content="全屏"  placement="bottom">
        <el-icon class="icon-btn" @click="toggle">
          <FullScreen v-if="!isFullscreen"/>
          <Aim v-else/>
        </el-icon>
      </el-tooltip>
      <!-- 下拉菜单 -->
      <el-dropdown class="dropdown" @command="handleCommand">
        <span class="flex justify-center items-center text-light-50">
          <el-avatar shape="circle" :size="25" :src="$store.state.user.avatar" class="mr-2" />
          {{ $store.state.user.username }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="rePassword">修改密码</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <!-- 修改密码 -->
      <!-- 使用封装的抽屉组件 -->
      <from-drawer ref="fromDrawerRef" title="修改密码" @submit="onSubmit">
        <el-form ref="formRef" :model="form" :rules="rules">
          <el-form-item prop="oldPassword" label="旧密码" label-width="80px">
            <el-input v-model="form.oldpassword" placeholder="请输入旧密码"></el-input>
          </el-form-item>
          <el-form-item prop="password" label="新密码" label-width="80px">
            <el-input v-model="form.password" placeholder="请输入新密码" type="password" show-password></el-input>
          </el-form-item>
          <el-form-item prop="rePassword" label="确认密码" label-width="80px">
            <el-input v-model="form.repassword" placeholder="请输入确认密码" type="password" show-password @keyup.enter="onSubmit">
            </el-input>
          </el-form-item>
        </el-form>
      </from-drawer>
    </div>

  </div>
</template>

<script setup>
import { useFullscreen } from '@vueuse/core'
import FromDrawer from '../../components/FromDrawer.vue'
import { useRePassword, useLogout } from '../../componsable/useRePassword'
const { isFullscreen, toggle } = useFullscreen()

// 处理刷新
const handleRefresh = () => location.reload()

const {
  form,
  formRef,
  rules,
  onSubmit,
  fromDrawerRef
} = useRePassword()

const { handleLogout } = useLogout()

// 判断是退出登录还是修改密码
function handleCommand(c) {
  switch (c) {
    case "logout":
      handleLogout()
      break;

    case "rePassword":
      fromDrawerRef.value.open()
      break;
  }
}

</script>

<style scoped>
.c-header {
  @apply flex items-center bg-blue-500 text-light-50 fixed top-0 left-0 right-0;
  height: 64px;
}

.left {
  @apply flex items-center justify-center
}

.icon-btn {
  height: 64px;
  width: 42px;
  font-size: large;
  text-align: center;
  cursor: pointer;
}

.icon-btn:hover {
  @apply bg-blue-400;
}

.left .logo {
  @apply flex items-center justify-center text-xl font-thin;
  width: 250px;
}

.dropdown {
  @apply flex justify-center items-center mx-5;
  text-align: center;
}
</style>