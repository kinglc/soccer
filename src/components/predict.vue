<template>
<div id="predict">

  <navi></navi>
  <div id="content">
    <div class="half" style="float: left;"><country></country></div>
    <!--<div class="select">aaa</div>-->
    <div class="half" style="float: right;margin-right: 20px;"><country></country></div>
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
    overflow: hidden;
    position: absolute;
  }

  #content {
    /*background-color: rgba(0, 0, 0, 0.2);*/
    height: 85%;
    width: 100%;
  }

  .half{
    width:40%;
    margin: 0 auto;
    margin-top: -20px;
    height: 100%;
  }

  .select{
    height: 100%;
    position: fixed;
  }



</style>
