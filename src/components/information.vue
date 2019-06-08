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
                <el-col :span="12" id="left">
                    <div class="teamPic">
                        <div class="occupy">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-football avatar-uploader-icon"></i>
                        </div>
                    </div>
                    <div class="container">
                        <span class="demonstration">选择国家：</span>
                        <el-select v-model="country" label-in-value="true" filterable placeholder="请选择" @change="selectTeam">
                            <el-option
                                    v-for="(item,index) in options"
                                    :key="item.id"
                                    :label="item.name"
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
                                placeholder="请选择1972-2008"
                                @change="selectTime">
                        </el-date-picker>
                    </div>
                </el-col>
                <el-col :span="11" id="right">
                    <div  class="echart"  id="chart"  ref="chart">

                    </div>
                </el-col>
            </el-row>
        </el-main>

    </div>
</template>



<script>
    import * as axios from "axios";

    const echarts = require('echarts');
    export default {
        name: "information",
        data(){
            return{
                year: '',
                isShow: false,
                options: [],
                country: '',
                countryId: '',
                imageUrl: ''
            }
        },
        methods:{

            turn:function (param) {
                this.$router.push({path:'/'+param});
            },

            selectTeam (item) {
                var that=this
                that.imageUrl =that.options[item].url;
                that.countryId = that.options[item].id;
                if(that.year) {
                    var year=that.year.getFullYear()
                    let data={
                        country: that.countryId,
                        time: year
                    }
                    axios({
                        url: "http://playcall.cn:7999/event/team/historyGameData",
                        data:data,
                        method: 'post',
                        headers:{'Content-Type':'application/x-www-form-urlencoded'}
                    }).then((res)=>{
                        console.log("Succees")
                        console.log(res)
                        that.isShow=true
                        that.initCharts();//初始化柱状图
                    }).catch((err)=>{
                        console.log("Fail")
                        console.log(res);
                    })
                }
            },
            selectTime () {
                var that=this
                var year=that.year.getFullYear()
                let data={
                    country: that.countryId,
                    time: year
                }
                if(that.countryId) {
                    axios({
                        url: "http://playcall.cn:7999/event/team/historyGameData",
                        method: 'post',
                        data:data,
                        headers:{'Content-Type':'application/x-www-form-urlencoded'}
                    }).then((res)=>{
                        console.log("Succees")
                        console.log(res)
                        that.isShow=true
                        that.initCharts();//初始化柱状图
                    }).catch((err)=>{
                        console.log("Fail")
                        console.log(res);
                    });
                }
            },
            initCharts () {
                let myChart = echarts.init(this.$refs.chart);
                // 绘制图表
                myChart.setOption({
                    tooltip: {
                        show: true
                    },
                    legend: {
                        data:[
                            '本队','ECharts1 - 2w数据','ECharts1 - 20w数据'
                        ]
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
                            "name":"平均值",
                            "type":"bar",
                            "data":[5, 20, 40, 10, 10, 20]
                        },
                        {
                            "name":"本年",
                            "type":"bar",
                            "data":[5, 20, 40, 10, 10, 20]
                        },
                        {
                            "name":"总数",
                            "type":"bar",
                            "data":[5, 20, 40, 10, 10, 20]
                        }
                    ]
                });
            }
        },
        mounted () {
            var that=this
            axios({
                method: 'post',
                url: 'http://playcall.cn:7999/event/country/list',
            }).then((res) => {
                console.log(res.data);
                var entries = [];
                for(var i = 0;i<100; i++) {
                    var entry = {
                        name: res.data.data[i].countryName,
                        url: res.data.data[i].imgUrl,
                        id: res.data.data[i].countryId
                    };
                    entries[i] = entry;

                    that.options.push(entries[i]);
                }
            }).catch((err) => {
                console.log(err);
            });
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
        font-size: 3rem;
        line-height: 1.5;
    }
    /*下半部*/
    .el-main{
        padding: 0 0 5% 5%;
        font-size: 1.5rem;
        overflow: visible;
    }
    .container{
        text-align: center;
        margin: 20px;
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

    .echart{
        height: 400px;
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
