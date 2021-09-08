<template>
    <div class="myplan">
        <div class="title">
        <span v-if="plans.length">
            您已经撰写{{plans.length}}篇攻略，收获了{{like_num}}个赞
        </span>
        <span v-else>您还没有写过攻略哦，快去“编辑与上传->创建攻略”中创建吧！</span>
        </div>
        <el-timeline class="timeline">
        <el-timeline-item 
        v-for="(item, index) in plans"
        :timestamp="item.pubL_TIME"
        placement="top"
        color="rgb(36,47,66)"
        :key="index"
       
        >
        <div class="everyday" @click="jump(item.plaN_ID)">
            {{item.plaN_TITLE}}
        </div>
        
         </el-timeline-item >
        </el-timeline>
        </div>
</template>
<style scoped>
.timeline{
    margin: 20px 20px;
}
.title{
    margin: 10px 20px;
    font-size: 22px;
    font-weight: bold;
}
.everyday:hover{
    color: rgb(32,160,228);
    cursor: pointer;
    text-decoration:underline;
}
</style>
<script>
export default {
    data(){
        return{
            plans:[],
            like_num:0,
        }
    },
    mounted(){
        this.$axios
        .get("http://49.234.18.247:8080/api/FunGetAllPlanByUserId/"+localStorage.getItem("ms_username"))
        .then((response)=>{
            this.plans=response.data;
            for(var i=0;i<this.plans.length;i++)this.like_num+=this.plans[i].plaN_STAR;
        })
        
    },
    methods:{
        jump(id){
        this.$router.push({
          path: `/strategyDetail`,
          query: {
            useR_ID: localStorage.getItem("ms_username"),
            plaN_ID: id,
          },
        });
        }
    }
}
</script>