<template>
  <h1>setup语法糖</h1>
  <h2>{{ counter }}</h2>
  <button @click="increase" class="addbtn">增加</button>
  <button @click="decrease">减少</button>
  <div ref="twiceRef">两倍的计数器{{ twiceCount }}</div>
</template>

<script setup>
// 以下的全部都可以抽成hooks
import { ref, watch, onMounted, computed, watchEffect } from 'vue'
// 模板引用
const twiceRef = ref(5)
// data 选项
const counter = ref(0)
// computed选项
const twiceCount = computed(() => counter.value * 2)
const increase = () => counter.value++
const decrease = () => counter.value--
// watch 选项
watch(counter, () => console.log(`watch监听到count的改变${counter.value}`))
watchEffect(() => console.log('watchEffect监听到count的改变', twiceRef.value))
// 生命周期
onMounted(() => {
  console.log('挂载了')
})
</script>
<style>
.addbtn {
  color: v-bind('btnColor');
}
</style>
