<template>
  <h1>setup语法糖</h1>
  <h2>{{ counter }}</h2>
  <button @click="increase">增加</button>
  <button @click="decrease">减少</button>
  <div ref="twiceRef">两倍的计数器{{ twiceCount }}</div>
</template>

<script setup>
import { useCount } from './useCount'
const { counter, increase, decrease, twiceCount, twiceRef } = useCount()
</script>
