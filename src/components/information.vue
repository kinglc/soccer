<template>
    <div id="info">
        <div id="head">
            <el-row>
                <el-col :span="3"><a @click="turn('index')"><img src="../../static/soccer.png" alt="soccer" id="soccer"></a> </el-col>
                <el-col :span="6">
                    <div class="svg-wrapper" @click="turn('index')">
                        <svg height="70" width="240" xmlns="http://www.w3.org/2000/svg">
                            <rect id="index-shape" height="70" width="240" />
                            <div class="text">
                                <span class="spot"></span>
                            </div>
                        </svg>
                        <div class="text">主页</div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="svg-wrapper" @click="turn('information')">
                        <svg height="70" width="240" xmlns="http://www.w3.org/2000/svg">
                            <rect id="shape" height="70" width="240" ></rect>
                            <div class="text">
                                <span class="spot"></span>
                            </div>
                        </svg>
                        <div class="text">队伍信息</div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="svg-wrapper" @click="turn('predict')">
                        <svg height="70" width="240" xmlns="http://www.w3.org/2000/svg">
                            <rect id="shape" height="70" width="240" ></rect>
                            <div class="text">
                                <span class="spot"></span>
                            </div>
                        </svg>
                        <div class="text">模拟比赛</div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <el-main>
            <el-row>
                <el-col :span="11" id="left">
                    <div class="teamPic">
                        <div class="occupy">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-football avatar-uploader-icon"></i>
                        </div>
                    </div>
                    <div class="container">
                        <span class="demonstration">选择队伍：</span>
                        <el-select v-model="team" label-in-value="true" filterable placeholder="请选择队伍" @change="selectTeam">
                            <el-option
                                    v-for="(item,index) in options"
                                    :key="item.teamId"
                                    :label="item.teamName"
                                    :value="index">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="container">
                        <span class="demonstration">选择年份：</span>
                        <el-date-picker
                                v-model="year"
                                type="year"
                                formaat="yyyy"
                                placeholder="请在1872-2008间选择"
                                @change="selectTime">
                        </el-date-picker>
                    </div>
                </el-col>
                <el-col :span="9" id="right">
                    <!--<el-radio-group v-model="tabContent" style="margin-bottom: 30px;">-->
                    <!--<el-radio-button label="left">基础数据</el-radio-button>-->
                    <!--<el-radio-button label="right">比赛情况</el-radio-button>-->
                    <!--</el-radio-group>-->
                    <el-tabs v-model="activeName" type="card" >
                        <el-tab-pane label="基础数据" name="first">
                            <div v-if="isShow==true">
                                请选择队伍和年份
                            </div>
                            <div  class="echart"  id="chart"  ref="chart">

                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="比赛情况" name="second">
                            <div v-if="isShow">
                                请选择队伍和年份
                            </div>
                            <el-scrollbar id="detail">
                                <el-row v-for="(item,index) in detailInfo" :key="index" class="detailLine">
                                    <el-col :span="12">
                                        <el-row>
                                            <el-col :span="4">
                                                <img class="detailImg" :src="URL+'/event/img/team/'+item.awayTeamId">
                                            </el-col>
                                            <el-col :span="17">
                                                客场：{{item.awayTeamName}}
                                            </el-col>
                                            <el-col :span="3">
                                                {{item.awayScore}}
                                            </el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col :span="4">
                                                <img class="detailImg" :src="URL+'/event/img/team/'+item.homeTeamId">
                                            </el-col>
                                            <el-col :span="17">
                                                主场：{{item.homeTeamName}}
                                            </el-col>
                                            <el-col :span="3">
                                                {{item.homeScore}}
                                            </el-col>
                                        </el-row>
                                    </el-col>
                                    <el-col :span="12" class="place">
                                        {{item.countryName}}-{{item.cityName}}
                                    </el-col>
                                </el-row>
                            </el-scrollbar>
                        </el-tab-pane>
                        <el-tab-pane label="与客队对比" name="third">
                            <div v-if="teamId">
                                <el-row id="against">
                                    <el-col :span="20">
                                            <span class="demonstration">选择客场队伍：</span>
                                            <el-select v-model="away" filterable placeholder="请选择客场队伍" @change="selectAwayTeam">
                                                <el-option
                                                        v-for="(item,index) in options"
                                                        :key="index"
                                                        :label="item.teamName"
                                                        :value="index">
                                                </el-option>
                                            </el-select>
                                    </el-col>
                                    <el-col :span="4">
                                        <div class="occupy">
                                            <img v-if="awayUrl" :src="awayUrl" class="away-avatar">
                                            <i v-else class="el-icon-football away-avatar-uploader-icon"></i>
                                        </div>
                                    </el-col>
                                </el-row>
                                <el-scrollbar id="away-detail">
                                    <el-row v-for="(item,index) in againstInfo" :key="index" class="detailLine">
                                        <el-col>
                                            <el-row>
                                                <el-col :span="3">
                                                    <img class="detailImg" :src="imageUrl">
                                                </el-col>
                                                <el-col :span="12">
                                                    {{GLOBAL.teams[team].teamName}}
                                                </el-col>
                                                <el-col :span="2">
                                                    {{ item.homeScore}}
                                                </el-col>
                                            </el-row>
                                            <el-row>
                                                <el-col :span="3">
                                                    <img class="detailImg" :src="awayUrl">
                                                </el-col>
                                                <el-col :span="12">
                                                    {{awayTeamName}}
                                                </el-col>
                                                <el-col :span="2">
                                                    {{ item.awayScore}}
                                                </el-col>
                                            </el-row>
                                        </el-col>
                                    </el-row>
                                </el-scrollbar>
                         </div>
                            <div v-else>
                                请选择主场队伍
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </el-col>
            </el-row>
        </el-main>

    </div>
</template>



<script>
    import * as axios from "axios"
    import qs from 'qs'

    const echarts = require('echarts');
    export default {
        name: "information",
        data(){
            return{
                year: '',
                isShow: true,
                options: [],
                team: '',
                teamId: '',
                imageUrl: '',
                gameInfo:{},
                tabContent:"left",
                activeName: 'first',
                detailInfo:[],
                URL:"http://playcall.cn:7999",
                away:'',
                awayTeamId:'',
                awayUrl:'',
                awayTeamName:'',
                againstInfo:[],
            }
        },
        methods:{

            turn:function (param) {
                this.$router.push({path:'/'+param});
            },

            // 选择客队
            selectAwayTeam (item){
                var that=this
                console.log(that.options[item].teamName)
                that.awayUrl =that.options[item].imgUrl;
                that.awayTeamId = that.options[item].teamId;
                that.awayTeamName = that.options[item].teamName;
                let data={
                    homeTeam: that.teamId,
                    awayTeam: that.awayTeamId,
                }
                axios({
                    url: "http://playcall.cn:7999/event/team/against",
                    data:qs.stringify(data),
                    method: 'post',
                    headers:{'Content-Type':'application/x-www-form-urlencoded;charset=utf-8;'}
                }).then((res)=>{
                    that.againstInfo=res.data.data
                    console.log(that.againstInfo)
                }).catch((err)=>{
                    console.log(err);
                })
            },
            // 选择主队
            selectTeam (item) {
                var that=this
                that.imageUrl =that.options[item].imgUrl;
                that.teamId = that.options[item].teamId;
                if(that.year) {
                    var year=that.year.getFullYear()
                    let data={
                        team: that.teamId,
                        time: year
                    }
                    axios({
                        url: "http://playcall.cn:7999/event/team/historyGameData",
                        data:qs.stringify(data),
                        method: 'post',
                        headers:{'Content-Type':'application/x-www-form-urlencoded;charset=utf-8;'}
                    }).then((res)=>{
                        that.gameInfo=res.data.data
                        that.detailInfo=res.data.data.thisYearDetailGameInfo
                        console.log(that.detailInfo)
                        that.initCharts();//初始化柱状图
                        that.isShow=false
                    }).catch((err)=>{
                        console.log(err);
                    })
                }
            },
            selectTime () {
                var that=this
                var year=that.year.getFullYear()
                let data={
                    team: that.teamId,
                    time: year
                }
                if(year<1872||year>2008){
                    alert("请在1872年至2008年间选择！")
                }
                else if(that.teamId) {
                    axios({
                        url: "http://playcall.cn:7999/event/team/historyGameData",
                        method: 'post',
                        data:qs.stringify(data),
                        headers:{'Content-Type':'application/x-www-form-urlencoded;charset=utf-8;'}
                    }).then((res)=>{
                        that.gameInfo=res.data.data
                        that.detailInfo=res.data.data.thisYearDetailGameInfo
                        console.log(that.detailInfo)
                        that.initCharts();//初始化柱状图
                        that.isShow=false;
                    }).catch((err)=>{
                        console.log(err);
                    });
                }
            },
            initCharts () {
                var that=this
                let myChart = echarts.init(this.$refs.chart);
                // 绘制图表
                myChart.setOption({
                    backgroundColor:'#FFFFFF',
                    tooltip: {
                        show: true
                    },
                    legend: {
                        x:'left',
                        data:['平均数','全年数','总数']
                    },
                    toolbox: {
                        feature : {
                            mark : {show: true},
                            dataView : {show: true, readOnly: false},
                            magicType : {show: true, type: ['line', 'bar']},
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    xAxis : [
                        {
                            type : 'category',
                            data : ["进球数","主场胜利数","客场胜利数","中立场胜利数","净进球数"]
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series : [
                        {
                            "name":"平均数",
                            "type":"bar",
                            "data":[that.gameInfo.averageScore, that.gameInfo.averageHomeWins, that.gameInfo.averageAwayWins,
                                that.gameInfo.averageNeutrals, that.gameInfo.averageMarginScore]
                        },
                        {
                            "name":"全年数",
                            "type":"bar",
                            "data":[that.gameInfo.thisYearScore, that.gameInfo.thisYearHomeWins, that.gameInfo.thisYearAwayWins,
                                that.gameInfo.thisYearNeutrals, that.gameInfo.thisYearMarginScore]
                        },
                        {
                            "name":"总数",
                            "type":"bar",
                            "data":[that.gameInfo.totalScore, that.gameInfo.totalHomeWins, that.gameInfo.totalAwayWins,
                                that.gameInfo.totalNeutrals, that.gameInfo.totalMarginScore]
                        }
                    ],
                    grid:{
                        x:40,
                        x2:10,
                    }
                });
            }
        },
        mounted () {
            var that=this
            that.options=that.GLOBAL.teams
        }
    }
</script>

<style scoped>
    #info{
        background-image: url("../../static/bg.png");
        /*background-size: cover;*/
        /*background-attachment: fixed;*/
        background-size:100% 100%;
        height: 100%;
        width: 100%;
        background-repeat: no-repeat;
        overflow: hidden;
        position: absolute;
        color: #FFFFFF;
    }
    body{
        width: 100%;
        margin: 0;
        border: 0;
        padding: 0;
        height: 100%;
        color: #FFFFFF;
    }
    @font-face {
        font-family: 'manu';
        src: url('../fonts/btnFont.ttf');  /* Safari, Android, iOS */
        src: url('../fonts/btnFont.eot') format('embedded-opentype'),/* IE9 Compat Modes */
        url('../fonts/btnFont.woff') format('woff'), /* Modern Browsers */
        url('../fonts/btnFont.svg#btnFont') format('svg'); /* Legacy iOS */
    }
    a{
        text-decoration: none;
        color: #FFFFFF;
    }
    /*首部*/
    #soccer{
        height: 100px;
        margin-top: -15px;
    }
    #head{
        width: 100%;
        padding: 0 0;
        text-align: center;
        vertical-align: middle;
        font-family: "manu";
        font-size: 2.5rem;
        line-height: 1.8;
    }
    #head .el-col{
        padding: 20px 0 0 0;
    }
    /*下半部*/
    .el-main{
        padding: 0 0 5% 5%;
        font-size: 1.5rem;
        overflow: visible;
        height: 100%;
    }
    #left{
        padding-top: 3%;
        padding-left: 7.5%;
        height: 100%;
        margin: 0 auto;
    }
    .container{
        text-align: center;
        margin: 40px;
    }
    /*国旗图片*/
    .teamPic{
        margin: 10px;
    }
    .occupy {
        border: 1px dashed rgba(255,255,255,0);
        border-radius: 100px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        width: max-content;
        background-color: rgba(255,255,255,0.5);
        margin: 0 auto;
    }
    .avatar-uploader-icon {
        width: 120px;
        height: 120px;
        line-height: 120px;
        text-align: center;
    }
    .avatar {
        width: 122px;
        height: 122px;
        display: block;
    }
    .away-avatar-uploader-icon {
        width: 50px;
        height: 50px;
        line-height: 50px;
        text-align: center;
    }
    .away-avatar{
        width: 50px;
        height: 50px;
        display: block;
    }

    #right{
        height: 100%;
        /*background-color: rgba(255,255,255);*/
        margin-top: 2%;
    }
    el-tabs{
        height: 100%;
    }
    .el-tabs >>> .el-tabs__nav{
        background-color: #ffffff;
        /*padding: 0 50px;*/
    }
    .el-tabs >>> .el-tabs__header{
        margin: 0 auto;
    }
    .el-tabs >>> .el-tabs__content{
        height: 400px;
        background-color: rgba(255,255,255,0.8);
        padding: 10px;
        font-size: 0.9em;
        color: #154f18;
    }
    .echart{
        height: 400px;
    }
    #detail{
        height: 400px;
        font-size: 0.8em;
    }
    #detail >>> .el-scrollbar__wrap {
        overflow-x: hidden;
    }
    #away-detail{
        height: 350px;
        font-size: 0.9em;
    }
    #away-detail >>> .el-scrollbar__wrap {
        overflow-x: hidden;
    }
    .detailLine{
        margin-bottom: 0.8em;
    }
    .place{
        line-height: 2.5em;
    }
    .detailImg{
        height: 30px;
        width: 30px;
        border-radius: 30px;
    }

    .svg-wrapper {
        margin-top: 0;
        position: relative;
        width: 240px;
        height: 70px;
        display: inline-block;
        border-radius: 3px;
        margin-left: 5px;
        margin-right: 5px
    }

    #shape {
        stroke-width: 6px;
        fill: transparent;
        stroke: #ffffff;/* 放上去之前的颜色 */
        stroke-dasharray: 240 400;
        stroke-dashoffset: -310;
        transition: 1s all ease;
    }

    #index-shape {
        stroke-width: 6px;
        fill: transparent;
        stroke: white;/* 主页放上去之前的颜色 */
        stroke-dasharray: 140 400;
        stroke-dashoffset: -360;
        transition: 1s all ease;
    }


    .text {
        margin-top: -90px;
        text-align: center;
        z-index: 1000;
        color: white;
    }

    .svg-wrapper:hover #shape {
        stroke-dasharray: 30 0;
        stroke-width: 5px;/* 放上去之后边框的宽度 */
        stroke-dashoffset: 0;
        stroke: #f0e352;/* 放上去之后边框的颜色 */
    }

    .svg-wrapper:hover {
        background-color: rgba(0,0,0,0.5);/* 放上去之后填充色 */
        cursor:pointer;
    }

    .svg-wrapper:hover #index-shape {
        stroke-dasharray: 30 0;
        stroke-width: 5px;/* 主页放上去之后边框的宽度 */
        stroke-dashoffset: 0;
        stroke: #f0e352;/* 主页放上去之后边框的颜色 */
    }

</style>
