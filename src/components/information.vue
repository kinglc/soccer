<template>
    <div id="info">
        <Navi></Navi>
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
                            <div  class="echart"  id="chart"  ref="chart">

                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="比赛情况" name="second">
                            <div v-if="isShow">
                                请选择正确的队伍和年份
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
    import Navi from "./nav";
    import * as axios from "axios"
    import qs from 'qs'
    const echarts = require('echarts');

    var myChart

    export default {
        name: "information",
        components: {Navi},
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
                    console.log(res);
                    if(res.data.data.length===0){
                        this.$message('两队暂无比赛信息');
                    }else {
                        that.againstInfo = res.data.data;
                    }
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
                    myChart.showLoading();
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
                        if(res.data.data.length===0){
                            this.$message('暂无比赛信息');
                        }else {
                            that.gameInfo=res.data.data
                            that.detailInfo=res.data.data.thisYearDetailGameInfo
                            myChart.hideLoading();
                            that.setCharts();//初始化柱状图
                            if(that.detailInfo.length!=0)
                            {
                                that.isShow=false
                            }
                        }
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
                    myChart.showLoading();
                    axios({
                        url: "http://playcall.cn:7999/event/team/historyGameData",
                        method: 'post',
                        data:qs.stringify(data),
                        headers:{'Content-Type':'application/x-www-form-urlencoded;charset=utf-8;'}
                    }).then((res)=>{
                        if(res.data.data.length===0){
                            this.$message('暂无比赛信息');
                        }else {
                            that.gameInfo=res.data.data
                            that.detailInfo=res.data.data.thisYearDetailGameInfo
                            console.log(that.detailInfo)
                            myChart.hideLoading();
                            that.setCharts();//初始化柱状图
                            if(that.detailInfo.length!=0)
                            {
                                that.isShow=false
                            }
                        }
                    }).catch((err)=>{
                        console.log(err);
                    });
                }
            },
            setCharts(){
                var that=this
                // 绘制图表
                myChart.setOption({
                    backgroundColor:'#FFFFFF',
                    tooltip: {
                        show: true,
                        trigger: 'axis',
                        axisPointer : {
                            type : 'shadow'
                        }
                    },
                    dataZoom: [
                        {
                            type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
                            start: 10,      // 左边在 10% 的位置。
                            end: 60         // 右边在 60% 的位置。
                        },
                        {
                            type: 'inside', // 这个 dataZoom 组件是 inside 型 dataZoom 组件
                            start: 10,      // 左边在 10% 的位置。
                            end: 60         // 右边在 60% 的位置。
                        }
                    ],
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
                        },
                        feature: {
                                magicType: {
                                    type: ['stack', 'tiled','line', 'bar']
                                },
                                dataView: {}
                        },
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
                    },
                    animationEasing: 'elasticOut',
                    animationDelayUpdate: function (idx) {
                        return idx * 5;
                    }
                });
            },
            initCharts () {
                var that=this
                myChart = echarts.init(document.getElementById('chart'));
                // myChart.showLoading();
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
                            "data":[]
                        },
                        {
                            "name":"全年数",
                            "type":"bar",
                            "data":[]
                        },
                        {
                            "name":"总数",
                            "type":"bar",
                            "data":[]
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
            this.options = this.GLOBAL.teams;
            var url = window.location.href;
            var s=url.split("=");
            if(s.length>1) {
                var index = parseInt(s[1]);
                this.imageUrl = this.options[index].imgUrl;
                this.teamId = this.options[index].teamId;
                this.team = this.options[index].teamName;
            }
            this.initCharts()
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
    .el-tabs >>>  .el-tabs__nav :hover{
        color: rgba(60, 226, 69, 0.61);
    }
    .el-tabs >>>  .is-active{
        color: rgba(60, 226, 69, 0.61);
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
        width: auto;
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
</style>