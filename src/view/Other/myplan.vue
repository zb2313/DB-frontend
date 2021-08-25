<template>
    <div class="myplan">
        <Header activeIndex="5" />
        <div
        class="everyday"
        v-for="(day, index) in plan.slice(0,days)"
        :key="index"
        >
        Day{{index+1}}
        <div
        class="item"
        v-for="(item, indexx) in day"
        :key="indexx+index*15"
        >
        
        {{item.item_name}}
        {{item.location}}
        </div>
        </div>
    </div>
</template>
<style scoped>
.everyday{
    margin: 30px 10px;
}
.item{
    margin: 10px 10px;
}
</style>
<script>
import Header from "@/components/Header.vue";
export default {
    components: {Header},
    data(){
        return{
            plan:[],
            days:'',
        }
    },
    mounted(){
        this.plan=JSON.parse(this.$route.query.plan);
        this.days=this.$route.query.day;
        console.log(this.plan);
    }
}
</script>