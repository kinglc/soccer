<template>
<div id="predict">

  <navi></navi>
  <div id="content">
    <div class="half" style="float: left;"><country v-on:getCountry="setLeft"></country></div>
    <div class="select">
      <div class="country">
        <img :src='leftCountry.imgUrl' />
        <div class="name">{{leftCountry.countryName}} </div>
      </div>
      <div class="country">
        <img :src='rightCountry.imgUrl' />
        <div class="name">{{rightCountry.countryName}} </div>
      </div>
    </div>
    <div class="half" style="float: right;margin-right: 20px;"><country v-on:getCountry="setRight"></country></div>
  </div>
</div>
</template>

<script>
  import Navi from "./nav";
  import Country from "./country";
  export default {
    name:'predict',
    components: {Country, Navi},
    data(){
        return{
          leftCountry:{
              countryName:'请选择国家',
              imgUrl:'../../static/bg.png'
          },
          rightCountry:{
              countryName:'请选择国家',
              imgUrl:'../../static/flag.png'
          },
      }
    },
    methods:{
        setLeft:function (data) {
            console.log(data);
            this.leftCountry=data;
        },

        setRight:function (data) {
            console.log(data);
            this.rightCountry=data;
        },

    }
  }
</script>

<style scoped>

  #predict{
    background-image: url("../../static/bg.png");
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
    width: 20%;
    left: 40%;
    position: fixed;
  }

  .select img{
    width: 6rem;
  }



</style>
