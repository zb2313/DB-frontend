<template>
    <div class="myplan">
       
        <el-timeline class="timeline">
        <el-timeline-item 
        class="everyday"
        v-for="(day, index) in plan.slice(0,days)"
        :timestamp="show_day(index)"
        placement="top"
        color="rgb(36,47,66)"
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
          v-if="item.dis_to_pre>0.2"
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
        <div class="edit">
            <div class="title" >选择出行日期</div>
             <el-date-picker
             style="margin-left:20px"
      v-model="travel_date"
      type="date"
      value-format="yyyy-MM-dd" 
      placeholder="选择出行日期">
    </el-date-picker>
            <div class="title">编辑您的标题</div>
        <el-input style="margin:0px 20px" v-model="title" placeholder="请输入内容"></el-input>
        <div class="title">编辑文字描述</div>
        <el-input
        style="margin:0px 20px"
        type="textarea"
        :rows="10"
        placeholder="请输入内容"
         v-model="textarea">
</el-input>
        <el-button type="primary" style="margin:20px 20px"  @click="submit()">生成攻略</el-button>
        </div>
         
    </div>
</template>
<style scoped>
.title{
    font-size: 20px;
    margin: 10px 20px;
}
.edit{
    font-size: 20px;
    margin: 10px 30px;
}
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
export default {
    data(){
        return{
            plan:[],
            days:'',
            textarea:'',
            title:'',
            travel_date:'',
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
            return item.dis_to_pre>0.2? "140px" :"115px";
        },
        submit(){
            this.$axios.get("http://49.234.18.247:8080/api/FunGetPlanIdByUserId/"+ localStorage.getItem("ms_username"))
      .then((response) => {
        this.$axios.post("http://49.234.18.247:8080/api/Plan", {
      "useR_ID": localStorage.getItem("ms_username"),
      "plaN_ID": response.data.length? response.data[0].planid:0,
      "plan": JSON.stringify(this.plan),
      "plaN_STAR": 0,
       "plaN_TITLE": this.title,
        "plaN_DESC": this.textarea,
        "plaY_TIME": this.travel_date,
        "pubL_TIME": this.storeTime,
      })
      .then((response) => {
      
        this.$alert("攻略生成成功！可在“我的攻略”中查看","提示", {confirmButtonText: "确定", })
      });
      })
        }
    },
    computed:{
     storeTime: function () {
      let date = new Date();
       var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      var h = date.getHours();
      var minute = date.getMinutes();
      minute = minute < 10 ? "0" + minute : minute;
      var second = date.getSeconds();
      second = second < 10 ? "0" + second : second;
      var Time = y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
      return Time;
    },
  }
}
</script>