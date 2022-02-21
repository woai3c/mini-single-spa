<template>
  <div class="home">
    <img alt="Vue logo" :src="img" />
    <button @click="sayHi">hello</button>
    <button @click="emit">发送一个全局事件</button>
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  data() {
    return {
      img: require('../assets/logo.png')
    }
  },
  methods: {
    sayHi() {
      alert('hello')
    },

    emit() {
      window.spaGlobalState.emit('vue')
    }
  }
}
</script>

<style>
#app {
  color: lightgreen;
}
</style>