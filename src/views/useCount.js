import { ref, watch, onMounted, computed, watchEffect } from 'vue'
export function useCount() {
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
  return {
    counter,
    increase,
    decrease,
    twiceCount,
    twiceRef,
  }
}
