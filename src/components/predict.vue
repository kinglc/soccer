<template>
<div id="predict">

  <navi></navi>
  <div id="content">
    <div class="half" style="float: left;"><team v-on:getTeam="setLeft"></team></div>
    <div class="select">
      <div class="team">
        <div class="type">{{typel}}</div>
        <img :src='leftTeam.imgUrl' />
        <div class="name">{{leftTeam.teamName}} </div>
      </div>
      <div class="team">
        <div class="type">{{typer}}</div>
        <img :src='rightTeam.imgUrl' />
        <div class="name">{{rightTeam.teamName}} </div>
      </div>
      <div class="select">

      </div>
    </div>
    <div class="half" style="float: right;margin-right: 20px;"><team v-on:getTeam="setRight"></team></div>
  </div>
</div>
</template>

<script>
  import Navi from "./nav";
  import Team from "./team";
  export default {
    name:'predict',
    components: {Team, Navi},
    data(){
        return{
          leftTeam:{
              teamName:'请选择国家',
              imgUrl:'../../static/flag.png'
          },
          rightTeam:{
              teamName:'请选择国家',
              imgUrl:'../../static/flag.png'
          },
          typel:'主',
          typer:'客',
      }
    },
    methods:{
        setLeft:function (data) {
            console.log(data);
            this.leftTeam=data;
        },

        setRight:function (data) {
            console.log(data);
            this.rightTeam=data;
        },

    }
  }
</script>

<style scoped>
  @font-face {
    font-family: 'btnFont';
    src: url('../fonts/btnFont.ttf');  /* Safari, Android, iOS */
    src: url('../fonts/btnFont.eot') format('embedded-opentype'),/* IE9 Compat Modes */
    url('../fonts/btnFont.woff') format('woff'), /* Modern Browsers */
    url('../fonts/btnFont.svg#btnFont') format('svg'); /* Legacy iOS */
    /*font-weight: bold;*/
    /*font-style: normal;*/
  }

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
    text-align: center;
  }

  .select .team{
    width: 50%;
    float: left;
  }

  .select .type{
    text-align: center;
    color: #acf0ae;
    font-size: 3rem;
    font-family: btnFont;
  }

  .select img{
    width: 6rem;
  }



</style>
