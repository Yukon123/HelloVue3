import { ref, watch, onMounted, computed } from 'vue'
export function userCount(params) {
  // data 选项
  const counter = ref(params)
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
  return {
    counter,
    increase,
    decrease,
    twiceCount,
  }
}
