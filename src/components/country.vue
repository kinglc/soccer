<template>
    <div id="countries">
        <div class='selector'>
            <div class="nowl" @click="showSelect">{{nowl}}</div>
                <transition name="el-zoom-in-center">
                    <div v-show="select" class="transition-box">
                        <span @click="change(index)" class="select-item" v-for="item,index in letters">
                            {{item.c}}
                        </span>
                    </div>
                </transition>
        </div>
        <div id="country" v-for="item in countries">
            <img :src='item.imgUrl' />
            <div class="name"> {{item.countryName}}</div>
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
            }

        }
    }

</script>

<style scoped>
    #country{
        width: 6rem;
        padding: 10px;
        float: left;
    }

    #country:hover{
        cursor: pointer;
        background-color: rgba(0, 0, 0, 0.35); /*(0, 75, 2, 0.76)*/
        transform: scale(1.1);
        -ms-transform:scale(1.1);     /* IE 9 */
        -moz-transform:scale(1.1);     /* Firefox */
        -webkit-transform:scale(1.1); /* Safari 和 Chrome */
        -o-transform:scale(1.1);
    }

    #country img{
        width: 6rem;
    }
    #country .name{
        text-align: center;
        color: #fff;
        font-size:0.7rem;
        font-weight: bold;
    }

    .transition-box{
        position: fixed;
        margin-left: 15%;
    }

    .nowl{
        /*font-family: "MV Boli";*/
        font-size: 3.4rem;
        font-weight: bold;
        color: #303030;
        text-align: center;
        /*text-shadow: 2px 2px 1px #303030;*/
        box-shadow: 3px 3px 5px #303030;
        background-color: #f0e352;
        width: 70px;
        height: 70px;
        border-radius: 40px;
        border: 5px solid #fff;
        margin: 0 auto;
        font-family: Consolas;
    }

    .nowl:hover{
        cursor: pointer;
    }

    .transition-box{
        width: 20rem;
        background-color: #ecfff0;
        border-radius: 5px;
        padding: 15px 0px 15px 15px;
        box-shadow: 0px 3px 10px #101010;
    }

    .select-item{
        font-family: Consolas;
        font-size: 1.5rem;
        text-align: center;
        padding: 0;
    }

    .select-item:hover{
        cursor: pointer;
        background-color: #7bc76f;
        border-radius: 5px;
    }
</style>