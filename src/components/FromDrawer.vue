<template>
  <div class="from-drawer">
    <el-drawer
      v-model="showDrawer"
      :close-on-click-modal="false"
      :title="title"
      :size="size"
      :destroy-on-close="destroyOnClose"
    >
      <div class="form">
        <div class="body">

          <slot></slot>
        </div>
        <div class="actions">
          <el-button type="primary" @click="submit" :loading="loading" >{{ confrimText }}</el-button>
          <el-button type="default" @click="close">取消</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const showDrawer = ref(false);



// 定义 props 动态绑定组件的属性
const props = defineProps({
  title: {
    type: String,
    default: '标题'
  },
  size: {
    type: String,
    default: "45%"
  },
  destroyOnClose: {
    type: Boolean,
    default: false
  },
  confrimText: {
    type: String,
    default: "提交"
  }
})



// 定义组件传出去的事件
const emit = defineEmits(['submit'])

// 定义组件内部的方法
// 按钮加载
const loading = ref(null);
const showLoading = () => loading.value = true
const hideLoading = () => loading.value = false

// 打开抽屉
const open = () => showDrawer.value = true

// 关闭
const close = () => showDrawer.value = false

// 提交,点击子组件的确认按钮，父组件监听到 submit 事件，执行对应的提交事件即可
const submit = () => emit("submit")


// 将组件方法导出,暴露给父组件
defineExpose({
  open,
  close,
  showLoading,
  hideLoading
})


</script>

<style scoped>
.form{
  width: 100%;
  height: 100%;
  @apply flex flex-col text-black;
}

.form .body{
  flex: 1;
  overflow-y: auto;
}
</style>