<template>
<div id="predict">

  <navi></navi>
  <div class="content">
    <div class="countries">

    </div>
  </div>
</div>
</template>

<script>
  import Navi from "./nav";
  export default {
    name:'predict',
      components: {Navi},
      methods:{ turn:function (param) {
      this.$router.push({path:'/'+param});
    }
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

  /*a>img:hover, #index-shape:hover, #shape:hover{*/
    /*cursor: pointer;*/
  /*}*/




</style>
