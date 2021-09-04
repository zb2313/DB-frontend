<template>
    <div class="myplan">
        <Header activeIndex="5" />
        <el-timeline class="timeline">
        <el-timeline-item 
        class="everyday"
        v-for="(day, index) in plan.slice(0,days)"
        :timestamp="show_day(index)"
        placement="top"
        color="#003680"
        :key="index"
        >
   
        <div
        class="item"
        v-for="(item, indexx) in day"
        :key="indexx+index*15"
        :style="{
            height: compute_height(item),
        }"
        >
        <div 
          v-if="item.dis_to_pre>1"
          class="distance">
          <i class="el-icon-d-caret"></i>
          距离 {{item.dis_to_pre}} 千米
          </div>
         
        <div class="item_img"
        :style="{
          backgroundImage: 'url(' + item.picture + ')',
        }" ></div>
        <div class="right_part">
         <div style="margin-top:10px;margin-bottom:10px;height:30px;width:100%;font-size:22px;margin-bottom:10px;font-weight:bold">
              <div style="float:left;margin-right:10px">{{indexx+1}}</div>
              <div style="float:left">{{item.item_name}}</div>
          </div>
       <div style="width:100%;height:40px;margin-left:25px">
            地址：{{item.location}}
       </div>
       </div>
        </div>
        </el-timeline-item >
        </el-timeline>
    </div>
</template>
<style scoped>
.timeline{
    margin:10px 30px;
}
.everyday{
    margin: 30px 10px;
}
.item{
    margin: 10px 10px;
    width: 100%;
    height: 140px;
}
.item_img{
    margin-top: 10px;
    margin-left: 10px;
    margin-right: 10px;
    width: 130px;
    height: 100px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
     float: left;
}
.right_part{
    float: left;
    width: 500px;
    height: 120px;
}
.distance{
  height: 25px;
  margin-left: 10px;
  color: rgb(108,131,151);
  font-size: 14px;
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
    },
    methods:{
        show_day(index){
            let temp=index+1;
            return "第"+temp+"天"
        },
        compute_height(item){
            return item.dis_to_pre>1? "140px" :"115px";
        }
    }
}
</script>