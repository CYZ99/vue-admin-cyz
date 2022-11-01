<template>
  {{d.num.toFixed(0)}}
</template>

<script setup>
import { reactive,watch } from 'vue'
import gsap from 'gsap'

const d = reactive({
  num:0
})

const props = defineProps({
  value: {
    type: Number,
    default:0
  }
})

function AnimateToValue() {
  gsap.to(d, {
    duration: 0.5,
    num: props.value
  })
}

AnimateToValue()
// 数据发生变化滚动动画在执行一次
watch(() => props.value, () => AnimateToValue())

</script>

<style scoped>
</style>