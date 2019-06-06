<template>
<div id="predict">

  <navi></navi>
  <div id="content">
    <div class="half" style="float: left;"><team v-on:getTeam="setLeft"></team></div>
    <div class="select">
      <div class="selectitem">
        <div class="team">
          <div class="type">{{types[0]}}</div>
          <img :src='teams[0].imgUrl' />
          <div class="name">{{teams[0].teamName}} </div>
        </div>
        <div class="team">
          <div class="type">{{types[1]}}</div>
          <img :src='teams[1].imgUrl' />
          <div class="name">{{teams[1].teamName}} </div>
        </div>
      </div>
      <div class="selectitem">
          <span>比赛国家：</span>
          <el-select v-model="countryId" placeholder="请选择国家" @change="setCountry">
            <el-option
                 v-for="item in countries"
                 :key="item.countryId"
                 :label="item.countryName"
                 :value="item.countryId">
            </el-option>
          </el-select>
      </div>
      <div class="selectitem">
          <span>比赛城市：</span>
          <el-select v-model="cityId" placeholder="请选择城市">
            <el-option
                 v-for="item in cities"
                 :key="item.cityId"
                 :label="item.cityName"
                 :value="item.cityId">
            </el-option>
          </el-select>
      </div>
      <div class="selectitem">
        <span>比赛类型：</span>
        <el-select v-model="tournamentId" placeholder="请选择比赛类型">
          <el-option
                  v-for="item in tournaments"
                  :key="item.tournamentId"
                  :label="item.tournamentName"
                  :value="item.tournamentId">
          </el-option>
        </el-select>
      </div>
      <div class="selectitem" @change="setType">
        <el-radio v-model="type" label="1" border selected>主客场</el-radio>
        <el-radio v-model="type" label="0" border>友谊赛</el-radio>
      </div>
      <div class="selectitem">
        <el-button @click="submit">开始预测</el-button>
      </div>
    </div>
    <div class="half" style="float: right;margin-right: 20px;"><team v-on:getTeam="setRight"></team></div>
  </div>
</div>
</template>

<script>
  import Navi from "./nav";
  import Team from "./team";
  import * as axios from "axios";
  // import "http://unpkg.com/element-ui@1.3.5/lib/theme-default/index.css";

  export default {
    name:'predict',
    components: {Team, Navi},
    data(){
        return{
          teams:[{
              teamId:'',
              teamName:'请选择队伍',
              imgUrl:'../../static/flag.png'
          },{
              teamId:'',
              teamName:'请选择队伍',
              imgUrl:'../../static/flag.png'
          }],
          types:["主","客"],
          type:-1,
          countries:[],
          countryId:'',
          cities:[],
          cityId:'',
          tournaments:[],
          tournamentId:'',
      }
    },
    mounted(){
        //获取国家城市
      axios({
          method: 'post',
          url: 'http://playcall.cn:7999/event/country/list',
      }).then((res) => {
          console.log(res);
          this.countries=res.data.data;
      }).catch((err)=>{
          console.log(err);
      });
        //获取比赛类型
      axios({
          method: 'post',
          url: 'http://playcall.cn:7999/event/tournament/list',
      }).then((res) => {
          console.log(res);
          this.tournaments=res.data.data;
      }).catch((err)=>{
          console.log(err);
      });
    },
    methods:{
        setLeft:function (data) {
            console.log(data);
            this.teams[0]=data;
        },

        setRight:function (data) {
            console.log(data);
            this.teams[1]=data;
        },

        setCountry:function () {
            console.log(this.countryId);
            let obj = {};
            obj = this.countries.find((item)=>{//这里的selectList就是上面遍历的数据源
                return item.countryId === this.countryId;//筛选出匹配数据
            });
            this.cities=obj.city;
            this.cityId=''
        },

        setType:function () {
            console.log(this.type);
            if(this.type==="0"){
                this.types=["友","谊"];
            }
            else if(this.type==="1"){
                this.types=["主","客"];
            }
        },

        submit:function () {
            if(this.teams[0].teamId===""||this.teams[1].teamId===""){
                this.$message({
                    showClose: true,
                    message: '请选择比赛队伍',
                    type: 'warning'
                });
            }else if(this.countryId==="") {
                this.$message({
                    showClose: true,
                    message: '请选择比赛国家',
                    type: 'warning'
                });
            }else if(this.cityId===""){
                this.$message({
                    showClose: true,
                    message: '请选择比赛城市',
                    type: 'warning'
                });
            }else if(this.tournamentId==="") {
                this.$message({
                    showClose: true,
                    message: '请选择赛事类型',
                    type: 'warning'
                });
            }else if(this.type===-1){
                this.$message({
                    showClose: true,
                    message: '请选择比赛形式',
                    type: 'warning'
                });
            }else{
                let data = {
                    parse: {
                        "tournament": this.tournamentId,
                        "homeTeam": this.teams[0].teamId,
                        "awayTeam": this.teams[1].teamId,
                        "country": this.countryId,
                        "city": this.cityId,
                        "neutral": this.type,
                    }
                };
                console.log(data);
                axios({
                    method: 'post',
                    data:data,
                    url: 'http://playcall.cn:7999/event/predict',
                }).then((res) => {
                    console.log(res);
                    // this.countries=res.data.data;
                }).catch((err)=>{
                    console.log(err);
                });
            }
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

  .selectitem .team{
    width: 50%;
    float: left;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .selectitem .type{
    text-align: center;
    color: #acf0ae;
    font-size: 3rem;
    font-family: btnFont;
    margin-top: 10px;
  }

  .selectitem img{
    width: 6rem;
    margin-top: 10px;
  }

  .selectitem{
    margin-bottom:20px;
  }



</style>
