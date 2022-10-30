import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { showModel, toast } from './utils'
import { logout, updatePassword } from '../api/manager'

// 修改密码
export function useRePassword() {
  const router = useRouter()
  const store = useStore()
  const fromDrawerRef = ref(null)
  const form = reactive({
    oldpassword: '',
    password: '',
    repassword: ''
  })
  // 拿到form表单的节点
  const formRef = ref(null)

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
      // 按钮的加载效果,获取子组件的方法
      fromDrawerRef.value.showLoading()
      updatePassword(form).then(res => {
        // 清除token 和用户内容
        store.dispatch("logout")
        toast("修改密码成功, 请重新登录", "success")
        router.push("/login")
      }).finally(() => {
        fromDrawerRef.value.hideLoading()
      })

    })
  }
  return {
    form,
    formRef,
    rules,
    onSubmit,
    fromDrawerRef
  }
}

// 退出登录
export function useLogout() {
  const router = useRouter()
  const store = useStore()
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
  return {
    handleLogout
  }
}