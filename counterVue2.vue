<template>
  <div class="">
    <h1>{{ counter }}</h1>
    <button @click="increase">增加</button>
    <button @click="decrease">减少</button>
    <div ref="twiceRef">两倍的计数器{{ twiceCount }}</div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      counter: 0,
    }
  },
  watch: {
    counter() {
      console.log(`监听到count的改变${this.counter}`)
      console.log(this.$refs.twiceRef)
    },
  },
  computed: {
    twiceCount(){
      return this.counter*2
    }
  },
  methods: {
    increase(){
      this.counter++
    }
    decrease(){
      this.counter--
    }
  },
  created() {},
  mounted() {
    console.log('OptionApi计数器挂载了')
  },
}
</script>
<style lang="less" scoped></style>
