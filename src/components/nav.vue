<template>
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
</template>

<script>
    export default {
        name: "navi",
        methods: {
            turn: function (param) {
                this.$router.push({path: '/' + param});
            }
        },
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

/*导航栏*/
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
    /*text-shadow: 2px 2px 1px #303030;*/
}
.el-col{
    padding: 20px 0 0 0;
}

.spot {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
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
    stroke-width: 8px;
    fill: transparent;
    stroke: #ffffff;/* 放上去之前的颜色 */
    stroke-dasharray: 220 400;
    stroke-dashoffset: -320;
    transition: 1s all ease;
}

#index-shape {
    stroke-width: 8px;
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
    font-family: btnFont;
}

.svg-wrapper:hover #shape {
    stroke-dasharray: 30 0;
    stroke-width: 6px;/* 放上去之后边框的宽度 */
    stroke-dashoffset: 0;
    stroke: #f0e352;/* 放上去之后边框的颜色 */
}

.svg-wrapper:hover {
    background-color: rgba(0,0,0,0.5);/* 放上去之后填充色 */
    cursor:pointer;
}

.svg-wrapper:hover #index-shape {
    stroke-dasharray: 30 0;
    stroke-width: 6px;/* 主页放上去之后边框的宽度 */
    stroke-dashoffset: 0;
    stroke: #f0e352;/* 主页放上去之后边框的颜色 */
}

a:hover{
    cursor: pointer;
}

</style>