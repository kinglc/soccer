<template>
    <div></div>
</template>

<script>
    export default {
        name: "global",
        teams: [],
        letter:[],
        setLetter:function () {
            var c = 'A';
            var l = 0,r;
            for (var i = 0; i < this.teams.length; i++) {
                if (this.teams[i].teamName.charAt(0) !== c) {
                    r = i;
                    var tmp = {
                        beg: l,
                        end: r,
                        c:c,
                    };
                    this.letter.push(tmp);
                    l = i;
                    c=this.teams[i].teamName.charAt(0);
                }
            }
            this.letter[24]={beg:l,end:this.teams.length,c:'Z'};
        }
    }
</script>

<style scoped>

</style>