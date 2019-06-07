<template>
  <div id="index">
    <div id="title">
      <img src="../../static/countries.png" style="width: 100%;margin: 0;">
      <span style="color: #7bc76f">SOCCER</span>
      <span style="color: white">GAME&nbsp;&nbsp;&nbsp;&nbsp;</span>
    </div>
    <span class="half" style="float: left;">
        <span><el-button type="success" @click="toInfo" title>队伍信息</el-button></span>
        <span id="tags"></span>
    </span>
    <span class="half" style="float: right;" title>
        <span><el-button @click="toPre" style="color: #7bc76f">模拟比赛</el-button></span>
        <img @click="toPre" src="../../static/predict.png"/>
    </span>
  </div>
</template>

<script>
  import "../jquery/jquery-2.1.1.min";
  import "../jquery/jquery.svg3dtagcloud.min";
  import * as axios from "axios";

  export default {
    name: "index",
    mounted() {
        axios({
            method: 'post',
            url: 'http://playcall.cn:7999/event/team/list',
        }).then((res) => {
            console.log(res);
            this.GLOBAL.teams = res.data.data;
            this.GLOBAL.teams[0].teamName="Aland Islands";
            if(this.GLOBAL.letter.length===0) {
                this.GLOBAL.setLetter();
            }
            console.log(this.GLOBAL.letter);
            var entries = [];
            for (var i = 0; i < 100; i++) {
                // var colors=['#7bc76f','#7bc76f','#7bc76f','#6FA46D','#6FA46D','#496D48'];
                // var colors=['#febf18','#febf18','#2f56ae','#049359','#049359','#049359'];
                var colors = ['#dc2129', '#52b15d', '#f6a504', '#2e81bf', '#020c1f']; //Math.random()*5
                var entry = {
                    label: this.GLOBAL.teams[i].teamName,
                    url: 'pages/information.html',
                    fontColor: colors[Math.floor(Math.random() * 4)],
                };
                entries[i] = entry;
            }
            var settings = {
                entries: entries,//数据
                // radius: '90%',
                width:400,
                height:400,
                radiusMin: 75,
                bgDraw: false,//是否显示背景
                opacityOver: 1.00,
                opacityOut: 0.15,
                opacitySpeed: 6,
                fov: 1000,
                speed: 0.3,//旋转的速度
                fontSize: '15',//默认字体大小
                fontColor: '#7ebb7c',//默认字体颜色
                fontWeight: 'bold',//bold
                fontStyle: 'normal',//italic
                fontStretch: 'normal',//wider, narrower, ultra-condensed, extra-condensed, condensed, semi-condensed, semi-expanded, expanded, extra-expanded, ultra-expanded
                fontToLowerCase: true,
                tooltipFontWeight: 'normal',//bold
                tooltipFontStyle: 'normal',//italic
                tooltipFontStretch: 'normal',//wider, narrower, ultra-condensed, extra-condensed, condensed, semi-condensed, semi-expanded, expanded, extra-expanded, ultra-expanded
                tooltipFontToUpperCase: false,
                tooltipTextAnchor: 'left',
                tooltipDiffX: 0,
                tooltipDiffY: 10
            };
            var svg3DTagCloud = new SVG3DTagCloud(document.getElementById('tags'), settings );
        }).catch((err) => {
            console.log(err);
        });
          },
    methods:{
      toInfo:function () {
        this.$router.push({
          path:'/information',
        });
      },
      toPre:function () {
        this.$router.push({
          path:'/predict',
        });
      },
    }
  }
</script>

<style scoped>
  @font-face {
    font-family: 'titleFont';
    src: url('../fonts/titleFont.ttf');  /* Safari, Android, iOS */
    src: url('../fonts/titleFont.eot') format('embedded-opentype'),/* IE9 Compat Modes */
    url('../fonts/titleFont.woff') format('woff'), /* Modern Browsers */
    url('../fonts/titleFont.svg#titleFont') format('svg'); /* Legacy iOS */
    /*font-weight: bold;*/
    /*font-style: normal;*/
  }

  @font-face {
    font-family: 'btnFont';
    src: url('../fonts/btnFont.ttf');  /* Safari, Android, iOS */
    src: url('../fonts/btnFont.eot') format('embedded-opentype'),/* IE9 Compat Modes */
    url('../fonts/btnFont.woff') format('woff'), /* Modern Browsers */
    url('../fonts/btnFont.svg#btnFont') format('svg'); /* Legacy iOS */
    /*font-weight: bold;*/
    /*font-style: normal;*/
  }

  #index{
    width: 100%;
    height: 100%;
    position: absolute;
    overflow: hidden;
  }

  #title{
    font-size: 3.75rem;
    position:fixed;
    width: 100%;
    text-align: center;
    font-family: 'titleFont';
    font-weight: bold;
  }

  .half{
    width: 50%;
    height: 100%;
  }

  .half img{
    width: 60%;
    margin-left: 20%;
    margin-top: 5%;
    transition: 1s;
    -webkit-transition: 1s; /* Safari */
  }

  .el-button{
    font-size: 30px;
    width: 35%;
    display: flex;
    justify-content: center;
    margin: 0 auto;
    margin-top:35%;
    opacity: 1;
    font-family: 'btnFont';
    z-index: 10000;
    border-radius: 50px;
    box-shadow: 4px 0px 4px rgba(0, 0, 0, .22), 0 4px 4px rgba(0, 0, 0, .34)
  }

  .half img:hover{
    cursor: pointer;
    transform: scale(1.05);
    -ms-transform:scale(1.05);     /* IE 9 */
    -moz-transform:scale(1.05);     /* Firefox */
    -webkit-transform:scale(1.05); /* Safari 和 Chrome */
    -o-transform:scale(1.05);
  }

  .half>div{
    margin-top: 35%;
    /*margin-bottom: 30px;*/
  }


  #tags{
    z-index:1;
    width: 60%;
    margin:0 auto;
    display: flex;
    justify-content: center;
  }

  [title]{
    background-color: #7bc76f;
  }
</style>
