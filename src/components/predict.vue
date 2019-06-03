<template>
<div id="predict">

  <navi></navi>
  <div class="content">
    <country></country>
  </div>
</div>
</template>

<script>
  import Navi from "./nav";
  import Country from "./country";
  export default {
    name:'predict',
    components: {Country, Navi},

    methods:{

    }
  }
</script>

<style scoped>

  #predict{
    background-image: url("../img/bg.png");
    background-size:100% 100%;
    height: 100%;
    width: 100%;
    background-repeat: no-repeat;
  }



</style>
