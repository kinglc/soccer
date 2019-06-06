<template>
    <div id="content">
        <div class='selector'>
            <div class="nowl" @click="showSelect">{{nowl}}</div>
                <transition name="el-zoom-in-center">
                    <div v-show="select" class="transition-box">
                        <span @click="change(index)" class="select-item" v-for="(item,index) in letters">
                            {{item.c}}
                        </span>
                    </div>
                </transition>
        </div>

        <div id="countries">
            <div class="country" v-for="item in countries">
                <img :src='item.imgUrl' />
                <div class="name"> {{item.countryName}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "country",
        data() {
            return {
                letters:this.GLOBAL.letter,
                countries: [],
                nowl: '',
                select:false,

            }
        },
        mounted(){
            this.change(0);
        },
        methods: {
            showSelect:function () {
                this.select=!this.select;
            },
            change:function (index) {
                this.countries = this.GLOBAL.countries.slice(this.letters[index].beg,this.letters[index].end);
                this.nowl = this.letters[index].c;
                this.select=false;
            }

        }
    }

</script>

<style scoped>
    #content{
        /*margin-top:20px;*/
        padding: 10px;
    }

    .nowl{
        font-size: 3rem;
        font-weight: bold;
        color: #303030;
        box-shadow: 3px 3px 5px #303030;
        background-color: #f0e352;
        width: 60px;
        text-align: center;
        height: 60px;
        border-radius: 40px;
        border: 5px solid #fff;
        margin: 0 auto;
        margin-top: 10px;
        margin-bottom: 10px;
        font-family: Consolas;
    }

    .nowl:hover{
        cursor: pointer;
    }

    .transition-box{
        width: 15%;
        position: fixed;
        margin-left: 12%;
        z-index: 1000;
        background-color: #ecfff0;
        border-radius: 5px;
        padding: 15px;
        box-shadow: 0px 3px 10px #101010;
    }

    .select-item{
        font-size: 1.5rem;
        text-align: center;
        width: 1.6rem;
        margin: 0 auto;
        font-family: Consolas;
        padding: 0;
    }

    .select-item:hover {
        cursor: pointer;
        color: #7bc76f;
        border-radius: 5px;
    }

    #countries{
        width: 30rem;
        height: 80%;
        padding: 20px;
        background-color: rgba(205, 238, 211, 0.4);
        margin: 0 auto;
        /*border: 3px solid red;*/
        border-radius: 10px;
        overflow-y: scroll;
    }

    #countries::-webkit-scrollbar{
        width: 10px;
        height: 10px;
    }
    #countries::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 5px rgba(205, 238, 211, 0.6);
        background: #ecfff0;
    }
    #countries::-webkit-scrollbar-track {/*滚动条里面轨道*/
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        border-radius: 10px;
        background: rgba(0,0,0,0.2);
    }

    .country{
        width: 6rem;
        height: 5.5rem;
        padding: 10px;
        margin-bottom: 20px;
        float: left;
        display: table-cell;
    }

    .country:hover{
        cursor: pointer;
        background-color: rgba(0, 0, 0, 0.35);
        border-radius: 6px;
        transform: scale(1.1);
        -ms-transform:scale(1.1);     /* IE 9 */
        -moz-transform:scale(1.1);     /* Firefox */
        -webkit-transform:scale(1.1); /* Safari 和 Chrome */
        -o-transform:scale(1.1);
    }

    .country img{
        width: 6rem;
        /*height: 4rem;*/
    }

    .country .name{
        text-align: center;
        color: #fff;
        font-size:0.7rem;
        font-weight: bold;
    }
</style>