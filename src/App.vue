<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Index from "./components/index";
export default {
  name: 'App',
  components: {Index},
  mounted(){
    this.$router.push('/index');
  }
}
</script>

<style>
#app {
  width: 100%;
  height: 100%;
  margin-top: -8px;
  margin-left: -8px;
  padding: 0;
  overflow: hidden;
}
</style>
