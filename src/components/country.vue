<template>
    <div id="countries">
        <div v-for="country in countries">
            <img src="{{country.imgUrl}}"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "country",
        data:{
            countries:global.countries,
        },
        methods:{

        },
    }
</script>

<style scoped>

</style>