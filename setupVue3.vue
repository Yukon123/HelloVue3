<template>
  <div>{{ counter }}</div>
  <button @click="increase">增加</button>
  <button @click="decrease">减少</button>
  <div ref="twiceRef">两倍的计数器{{ twiceCount }}</div>
</template>

<script setup>
import { ref, watch, onMounted, computed } from 'vue'
// data 选项
const counter = ref(0)
// computed选项
const twiceCount = computed(() => counter.value * 2)
const increase = () => counter.value++
const decrease = () => counter.value--
// watch 选项
watch(counter, () => console.log(`监听到count的改变${counter.value}`))
// 生命周期
onMounted(() => {
  console.log('挂载了')
})
// 模板引用
const twiceRef = ref(null)
</script>
