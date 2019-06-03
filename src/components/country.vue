<template>
    <div id="countries">

        <div v-for="item in countries">
            {{item.countryName}}
            <img  :src='item.imgUrl' />
        </div>
    </div>
</template>

<script>
    import global from "./Global"
    export default {
        name: "country",
        data() {
            return {
                countries:this.GLOBAL.countries,
            }
        },
        mounted(){
            console.log(this.GLOBAL.countries);
            console.log(this.countries);
        },
        methods:{

        }
    }
</script>

<style scoped>

</style>