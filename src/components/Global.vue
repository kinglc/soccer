<template>
    <div></div>
</template>

<script>
    export default {
        name: "global",
        countries: [],
        letter:[],
        setLetter:function () {
            var c = 'A';
            var l = 0,r;
            for (var i = 0; i < this.countries.length; i++) {
                if (this.countries[i].countryName.charAt(0) !== c) {
                    r = i;
                    var tmp = {
                        beg: l,
                        end: r,
                        c:c,
                    };
                    this.letter.push(tmp);
                    l = i;
                    c=String.fromCharCode(c.charCodeAt(0)+1);
                }
            }
            this.letter[23]={beg:0,end:0,c:'X'};
        }
    }
</script>

<style scoped>

</style>