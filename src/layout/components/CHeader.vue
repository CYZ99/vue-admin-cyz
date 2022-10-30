<template>
  <div class="c-header">
    <div class="left">
      <span class="logo">
        <el-icon class="mr-1">
          <Platform />
        </el-icon>
        后台系统
      </span>
      <el-icon class="icon-btn">
        <Fold />
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
      <el-drawer v-model="showDrawer" title="修改密码">
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
          <el-form-item>
            <el-button type="primary" :loading="loading" @click="onSubmit">提交</el-button>
          </el-form-item>
        </el-form>
      </el-drawer>
    </div>

  </div>
</template>

<script setup>
import { showModel, toast } from '../../componsable/utils'
import { logout, updatePassword } from '../../api/manager'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { useFullscreen } from '@vueuse/core'
import { ref,reactive } from 'vue'
const { isFullscreen, toggle } = useFullscreen()

const router = useRouter()
const store = useStore()

// 处理刷新
const handleRefresh = () => location.reload()

// 修改密码
const showDrawer = ref(false)
const form = reactive({
  oldpassword: '',
  password: '',
  repassword: ''
})
// 拿到form表单的节点
const formRef = ref(null)
const loading = ref(null)
const rules = {
  // 表单验证规则
  oldpassword: [
    {
      required: true,
      message: '密码不能为空',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '新密码不能为空',
      trigger: 'blur'
    },
  ],
  repassword: [
    {
      required: true,
      message: '确认密码不能为空',
      trigger: 'blur'
    },
  ]
}

const onSubmit = () => {
  formRef.value.validate((valid) => {
    if (!valid) {
      return false
    }
    loading.value = true;
    updatePassword(form).then(res => {
      // 清除token 和用户内容
      store.dispatch("logout")
      toast("修改密码成功, 请重新登录", "success")
      router.push("/login")
    }).finally(() => {
      loading.value = false;
    })

  })
}



function handleCommand(c) {
  switch (c) {
    case "logout":
      handleLogout()
      break;

    case "rePassword":
      showDrawer.value = true
      break;
  }
}
// 处理下拉菜单的退出登录
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