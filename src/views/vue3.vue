<template>
  <h1>Vue3 Composition架构</h1>
  <!-- 计数器 -->
  <h2>{{ counter }}</h2>
  <button @click="increase" class="addbtn">增加</button>
  <button @click="decrease">减少</button>
  <div ref="twiceRef">两倍的计数器{{ twiceCount }}</div>
  <!-- 学生信息 -->
  <div>{{ student.firstName + ' ' + student.lastName }}</div>
  <div @click="student.firstName = '王'">点击变老王儿子</div>
  <div>{{ '学生姓' + student.firstName }}</div>
</template>

<script>
import { ref, watch, onMounted, computed, watchEffect, reactive, toRefs } from 'vue'
import { useCount } from './useCount'
export default {
  setup(props) {
    // 计数器
    const counter = ref(0) //  => { value : 0 }
    const twiceCount = computed(() => counter.value * 2)
    const increase = () => counter.value++
    const decrease = () => counter.value--
    const twiceRef = ref(null)
    watch(counter, () => console.log(`watch监听到count的改变${counter.value}`, counter))
    watchEffect(() => console.log('watchEffect监听到count的改变', twiceRef.value))

    const btnColor = ref('red')
    const student = reactive({ firstName: '张', lastName: '三' })

    // 生命周期
    onMounted(() => console.log('挂载了'))
    // const { counter, increase, decrease, twiceCount, twiceRef } = useCount()
    return {
      counter,
      student,
      increase,
      decrease,
      twiceCount,
      twiceRef,
      btnColor,
      // ...toRefs(student),
    }
  },
}
</script>
<style>
.addbtn {
  color: v-bind(btnColor);
}
</style>
