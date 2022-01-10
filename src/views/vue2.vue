<template>
  <div class="">
    <h1>Vue2 Opthion架构</h1>
    <!-- 计数器 -->
    <h2>{{ counter }}</h2>
    <button @click="increase">增加</button>
    <button @click="decrease">减少</button>
    <div ref="twiceRef">两倍的计数器{{ twiceCount }}</div>
    <!-- 学生信息 -->
    <div>{{ student.firstName + ' ' + student.lastName }}</div>
    <div @click="student.firstName = '王'">点击变老王儿子</div>
    <div>{{ '学生姓' + student.firstName }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      counter: 0,
      student: {
        firstName: '张',
        lastName: '三',
      },
    }
  },
  computed: {
    twiceCount() {
      return this.counter * 2
    },
  },
  methods: {
    increase() {
      this.counter++
    },
    decrease() {
      this.counter--
    },
  },
  watch: {
    counter() {
      console.log(`监听到count的改变${this.counter}`)
      console.log(this.$refs.twiceRef)
    },
  },
  // 第一次可以使用this
  created() {
    console.log('OptionApi计数器生成了')
  },
  // 第一次可以获得挂载后的DOM节点
  mounted() {
    console.log('OptionApi计数器挂载了')
  },
}
</script>
<style lang="less" scoped></style>
