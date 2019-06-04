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
        background-color: rgba(0, 75, 2, 0.76);
        transform: scale(1.05);
        -ms-transform:scale(1.05);     /* IE 9 */
        -moz-transform:scale(1.05);     /* Firefox */
        -webkit-transform:scale(1.05); /* Safari 和 Chrome */
        -o-transform:scale(1.05);
    }

    #country img{
        width: 6rem;
    }
    #country .name{
        text-align: center;
        color: #fff;
        font-size:0.6rem;
        font-weight: bold;
    }

    .transition-box{
        position: fixed;
        margin-left: 15%;
    }

    .nowl{
        font-family: "MV Boli";
        font-size: 3rem;
        font-weight: bold;
        color: #e2e2e2;
        text-align: center;
    }

    .nowl:hover{
        cursor: pointer;
    }

    .transition-box{
        width: 20rem;
        background-color: rgba(23, 87, 123, 0.47);
    }

    .select-item{
        font-family: "MV Boli";
        font-size: 1.5rem;
    }

    .select-item:hover{
        cursor: pointer;
        background-color: #3a8ee6;
    }
</style>