<template>
  <el-row class="min-h-screen bg-indigo-500">
    <el-col :lg="16" :md="12" class="left">
      <div>
        <div class="title">欢迎光临</div>
        <div class="subtitle">此站点是用于学习 vue3 + vite</div>
      </div>
    </el-col>
    <el-col :lg="8" :md="12" class="right">
      <h2 class="title">欢迎回来</h2>
      <div class="subtitle">
        <span class="h-[1px] w-16 bg-gray-200"></span>
        <span>账号密码登录</span>
        <span class="h-[1px] w-16 bg-gray-200" ></span>
      </div>
        <el-form ref="formRef" :model="form" :rules="rules" class="w-[250px]">
          <el-form-item prop="username">
            <el-input v-model="form.username" placeholder="请输入用户名">
              <template #prefix>
              <el-icon>
                <User />
              </el-icon>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              v-model="form.password"
              placeholder="请输入密码"
              type="password" show-password
              @keyup.enter="onSubmit"
            >
            <!-- 插槽插入图标 -->
              <template #prefix>
                <el-icon>
                  <Lock />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="w-[250px]" round :loading="loading" @click="onSubmit">登 录</el-button>
          </el-form-item>
        </el-form>
    </el-col>
  </el-row>
</template>

<script setup>

import { reactive, ref } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import { getinfo, login, } from '../api/manager'
import { useRouter } from 'vue-router'
import { setToken } from '../componsable/auth'
import { toast } from '../componsable/utils'
import { useStore } from 'vuex'

const store = useStore()
const router = useRouter()

// do not use same name with ref
const form = reactive({
  username: '',
  password:'',
})
// 拿到form表单的节点
const formRef = ref(null)
const loading = ref(null)
const rules = {
  // 表单验证规则
  username: [
    {
      required: true,
      message: '用户名不为空',
      // 失去焦点触发
      trigger: 'blur'
    },
    {
      min: 3,
      max: 5,
      message: '用户名长度为3-5个字符',
      trigger: 'blur'
    },
  ],
  password: [
    {
      required: true,
      message: '密码不为空',
      // 失去焦点触发
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
    // 登录
    login(form.username, form.password).then(res => {
      // console.log(res);
      // 1.提示用户登录成功
      toast('登录成功', 'success')
      // 2.获取用户相关信息 存储token
      setToken(res.token)
      // 获取用户相关信息 直接使用mutation，并获取数据存在store中
      getinfo().then(res2 => {
        store.commit("SET_USERINFO", res2)
        console.log(res2);
      })
      // 3. 跳转到首页
      router.push('/')
    }).finally(() => {
      loading.value = false
    })
  })
}

//

</script>

<style scoped>
.left{
  @apply  flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-500/200
}

.left .title{
  @apply  text-light-50 font-bold text-5xl mb-4
}

.left .subtitle{
  @apply text-gray-200 text-2xl text-shadow-md
}

.right{
  @apply bg-light-50 flex items-center justify-center flex-col
}

.right .title{
  @apply text-3xl font-bold
}

.right .subtitle{
  @apply flex items-center justify-center my-5 text-gray-300 space-x-2
}
</style>