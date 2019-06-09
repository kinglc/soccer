<template>
<div id="predict">
  <navi></navi>
  <el-dialog
          title="预测结果"
          :visible.sync="show"
          width="30%"
          @opened="openResult"
          @close="closeResult"
          center>
    <div class="result">
      <!--<div class="item">-->
        <!--<img :src='teams[0].imgUrl' />-->
        <!--<div class="name">{{teams[0].teamName}} </div>-->
        <!--<div class="score">{{scores[0]}}</div>-->
      <!--</div>-->
      <!--<div id="vs">-->
        <!--<img src="../../static/vs.png" />-->
      <!--</div>-->
      <!--<div class="item">-->
        <!--<img :src='teams[1].imgUrl' />-->
        <!--<div class="name">{{teams[1].teamName}} </div>-->
        <!--<div class="score">{{scores[1]}}</div>-->
      <!--</div>-->
      <el-row>
        <el-col :span="10">
          <div class="item">
            <img class="timg" :src='teams[0].imgUrl' />
            <div class="name">{{teams[0].teamName}} </div>
            <div class="score">{{scores[0]}}</div>
          </div>
        </el-col>
        <el-col :span="4">
          <img src="../../static/vs.png" />
        </el-col>
        <el-col :span="10">
          <div class="item">
            <img class="timg" :src='teams[1].imgUrl' />
            <div class="name">{{teams[1].teamName}} </div>
            <div class="score">{{scores[1]}}</div>
          </div>
        </el-col>
      </el-row>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="show = false">确定</el-button>
    </span>
  </el-dialog>
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
        <el-radio-group v-model="type" fill="#303030">
          <el-radio-button label="0" border>主客场</el-radio-button>
          <el-radio-button label="1" border>友谊赛</el-radio-button>
        </el-radio-group>
      </div>
      <div class="selectitem">
        <button @click="submit">开始预测</button>
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
  import qs from 'qs';

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
          types:["友","谊"],
          type:-1,
          countries:[],
          countryId:'',
          cities:[],
          cityId:'',
          tournaments:[],
          tournamentId:'',
          show:false,
          scores:[],
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
            this.teams[0].teamId=data.teamId;
            this.teams[0].teamName=data.teamName;
            this.teams[0].imgUrl=data.imgUrl;
        },

        setRight:function (data) {
            console.log(data);
            this.teams[1].teamId=data.teamId;
            this.teams[1].teamName=data.teamName;
            this.teams[1].imgUrl=data.imgUrl;
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
            var types = document.getElementsByClassName('type');
            if(this.type==="1"){
                this.types=["友","谊"];
                types[0].style.color="#f0e352";
                types[1].style.color="#f0e352";

            }
            else if(this.type==="0"){
                this.types=["主","客"];
                types[0].style.color="#ea351b"; /*#ea351b*/
                types[1].style.color="#1a3c7d"; /*#1a3c7d*/
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
                let data={
                    parse: '{"tournament":' + this.tournamentId +
                    ',"homeTeam":' + this.teams[0].teamId +
                    ',"awayTeam":' +this.teams[1].teamId +
                    ',"country":' +this.countryId +
                    ',"city":' +this.cityId +
                    ',"neutral":' +this.type +
                    '}',
                };
                console.log(data);
                axios({
                    url: 'http://playcall.cn:7999/event/predict',
                    method: 'post',
                    data:qs.stringify(data),
                    headers:{
                        'Content-Type':'application/x-www-form-urlencoded'
                    },
                }).then((res) => {
                    console.log(res);
                    if(res.data.code===200) {
                        this.scores[0]=res.data.data.score.homeScore;
                        this.scores[1]=res.data.data.score.awayScore;
                        this.show=true;
                    }else{
                        this.$message({
                            showClose: true,
                            message: res.data.msg,
                            type: 'warning'
                        })
                    }
                }).catch((err)=>{
                    console.log(err);
                });
            }
        },

        openResult:function () {
            console.log('a');
            var imgs = document.getElementsByClassName('timg');
            var scores = document.getElementsByClassName('score');
            console.log(imgs);
            console.log(scores);
            if(this.scores[0]>this.scores[1]){
                console.log('000');
                imgs[0].style.boxShadow = "2px 5px 5px #FFE04B";
                imgs[0].style.transform="scale(1.2)";
                scores[0].style.color = "red";
            }else if(this.scores[1]>this.scores[0]) {
                console.log('111');
                imgs[1].style.transform="scale(1.2)";
                imgs[1].style.boxShadow = "2px 5px 5px #FFE04B";
                scores[1].style.color = "red"
            }
        },

        closeResult:function () {
            console.log('---');
            var imgs = document.getElementsByClassName('timg');
            var scores = document.getElementsByClassName('score');
            imgs[0].style.boxShadow = "2px 2px 2px #717171";
            imgs[1].style.boxShadow = "2px 2px 2px #717171";
            imgs[0].style.transform = "scale(1)";
            imgs[1].style.transform = "scale(1)";
            scores[0].style.color="#a6a6a6";
            scores[1].style.color="#a6a6a6";
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

  .selectitem{
    color: white;
    font-weight: bold;
    font-size: 1rem;
    margin-bottom: 20px;
  }

  .selectitem .team{
    width: 50%;
    float: left;
    margin-bottom: 30px;
    height: 12rem;
  }

  .selectitem .type{
    text-align: center;
    color: #f0e352;
    font-size: 3rem;
    padding-top: 20px;
    clear: both;
  }

  .selectitem img{
    width: 7.5rem;
    margin-top: 10px;
    border-radius: 5px;
    box-shadow: 2px 2px 5px #303030;
  }

  button{
    background-color: #f0e352; /*f0e352*/
    width: 12rem;
    height: 3.3rem;
    border-radius: 4rem;
    /*border: none;*/
    font-size: 1.4rem;
    color: #303030;
    font-weight: bold;
    font-family: btnFont;
    cursor: pointer;
    border: 2px solid #fff;
    outline: none;
  }

  button:hover{
    background-color: #f0f070;
  }

  el-dialog{
    background-color: red;
  }

  .result{
    text-align: center;
    margin-bottom: -10px;
  }
  
  .result .item img{
    width: 80%;
    display: flex;
    margin: 0 auto;
    border-radius: 5px;
    margin-bottom: 10px;
    box-shadow: 2px 2px 2px #717171;
  }

  .result .item .name{
    margin-top: 30px;
    font-weight: bold;
  }

  .result .item .score{
    font-size: 3rem;
    color: #a6a6a6;
  }
  
  .result img{
    width: 100%;
    display: flex;
    align-content: center;
    margin-top: 20px;
  }


</style>
