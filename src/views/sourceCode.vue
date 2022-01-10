<template>
  <div>{{ foo }}</div>
  <div>{{ bar.value }}</div>
</template>

<script setup>
import { ref, reactive } from 'vue'
const foo = ref('张')
const bar = reactive({ value: '张' })
console.log({ foo })
console.log(bar)
</script>

<style lang="less" scoped></style>
