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
                        <span class="demonstration">选择队伍：</span>
                        <el-select v-model="country" label-in-value="true" filterable placeholder="请选择" @change="selectTeam">
                            <el-option
                                    v-for="item in options"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="container">
                        <span class="demonstration">选择年份：</span>
                        <el-date-picker
                                v-model="year"
                                type="year"
                                placeholder="1972-2008"
                                @change="selectTime">
                        </el-date-picker>
                    </div>
                </el-col>
                <el-col :span="11" id="right">
                    <div class="echart"  id="chart"  ref="chart">

                    </div>
                </el-col>
            </el-row>
        </el-main>

    </div>
</template>



<script>
    const echarts = require('echarts');
    var URL = 'http://playcall.cn:7999/event';
    export default {
        name: "information",
        data(){
            return{
                year: '2008',
                msg: true,
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
                console.log(item);
                vue.imageUrl =vue.options[item-1].url;
                vue.countryId = vue.options[item-1].id;
                if(vue.year) {
                    $.ajax({
                        url: URL + "/team/historyGameData",
                        type: 'POST',
                        contentType: 'application/json',
                        contry: vue.countryId,
                        time: vue.year,
                        success(res) {

                        },
                        error(res) {
                            console.log(res);
                            vue.$message.error('数据获取失败，请检查网络信息');
                        }
                    })
                }
            },
            selectTime () {
                var time = vue.year.getTime()/1000;
                console.log(time);
                if(vue.countryId) {
                    $.ajax({
                        url: URL + "/team/historyGameData",
                        type: 'POST',
                        contentType: 'application/json',
                        contry: vue.countryId,
                        time: vue.year,
                        success(res) {

                        },
                        error(res) {
                            console.log(res);
                            vue.$message.error('数据获取失败，请检查网络信息');
                        }
                    })
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
            this.initCharts();//初始化柱状图

            $.ajax({
                url: URL+'/country/list',
                type: 'POST',
                contentType:'application/json',
                success(res){
                    console.log(res);
                    var entries = [];
                    for(var i = 0;i<100; i++) {
                        var entry = {
                            name: res.data[i].countryName,
                            url:res.data[i].imgUrl,
                            id:res.data[i].countryId
                        };
                        entries[i]=entry;
                        vue.options.push(entries[i]);
                    };
                },
                error(res){
                    console.log(res);
                    vue.$message.error('数据初始化失败，请检查网络信息');
                }
            })
        }
    }
</script>

<style scoped>
    #info{
        background-image: url("../../static/bg.png");
        background-repeat: no-repeat;
        background-size: cover;
        width: 100%;
        height:100%;
        background-attachment: fixed;
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
    #app{
        width: 100%;
        height: 100%;
    }
    /*首部*/
    #soccer{
        height: 100px;
        margin-top: -15px;
    }
    #flag{
        width:100%;
    }
    #page{
        border-bottom: 5px solid;
        border-color: #FFFFFF;
        padding-bottom:8px;
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
    .el-col{
        padding: 20px 0 0 0;
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
        border: 1px dashed #d9d9d9;
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
