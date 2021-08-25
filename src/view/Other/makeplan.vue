<template>

    <div class="travelplan">
        <Header activeIndex="5" />
        <div style="width:100%;height:45px">
        <div style="width:300px;height:45px;padding-top:10px;font-size:25px;float:left">&nbsp;&nbsp;&nbsp;定制你的{{days}}日游</div> 
        <el-button type="primary" style="float:right;margin-top:10px;margin-right:10px" @click="submit()">完成</el-button>
        </div>
        
        
        <div class="divider"></div>
        <div class="leftbox">
            <div class="rec_title">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;我的行程单</div>
            <div class="divider"></div>
            
            <div class="select_item"
            v-for="(item,index) in day_schedule"
            :key="index"
            @click="changeSelect(index)"
            >
            <div class="day_icon" :class="{selected:select_active==index}">D{{item.day}}</div>
            <div class="city_name"> {{item.city_name}}</div>
           
            
            </div>
           
        </div>
       <div class="middle_box">
                <div class="day_title">第&nbsp;{{select_active+1}}&nbsp;天</div>
        <div class="selected_items"
        v-for="(item,index) in selected_items[select_active]"
        :key="index+200"
        >
        <div class="midimg"
        :style="{
          backgroundImage: 'url(' + item.picture + ')',
        }" ></div>
        
        <div style="color:#003680;font-size:18px;font-weight:bold;margin-top:10px;margin-bottom:10px">
            {{index+1}}
            <span style="color:black">{{item.item_name}}</span>
        </div>
       
       <div style="font-size:15px;">地址：{{item.location}}</div>
        
        </div>
            </div>
  <div class="right_box">
      <el-tabs v-model="att_or_hot" type="card" @tab-click="handleClick">
    <el-tab-pane label="景点" name="first">
        <el-input style="width:310px;margin-left:10px;margin-right:10px" v-model="search_attraction" placeholder="搜索景点" @change="filt_attraction()"></el-input>
         <el-button type="primary" icon="el-icon-search" circle></el-button>
        <div class="show_att"
        v-for="(item,index) in filt_attraction_list"
        :key="index+100">
        <div class="rightimg"
        :style="{
          backgroundImage: 'url(' + item.picture + ')',
        }" 
        ></div>
        <div class="show_att_content"> 
            <div style="font-weight:bold;font-size:16px;margin-top:15px;margin-bottom:10px">{{item.attractionname}}</div>
            <div style="font-size:13px;line-height:16px;margin-bottom:20px">标签：{{item.label}}
                <br>
                推荐指数：{{item.star}}分
            </div>
            <el-button type="primary" icon="el-icon-plus"  style="height:30px;padding:5px 8px" @click="add(index,1)">添加到行程</el-button>
            </div>
           
        </div>
    </el-tab-pane>
    <el-tab-pane label="酒店" name="second">
        <el-input style="width:310px;margin-left:10px;margin-right:10px" v-model="search_hotel" placeholder="搜索酒店" @change="filt_hotel()"></el-input>
         <el-button type="primary" icon="el-icon-search" circle></el-button>
        <div class="show_att"
        v-for="(item,index) in filt_hotel_list"
        :key="index+100">
        <div class="rightimg"
        :style="{
          backgroundImage: 'url(' + item.picture + ')',
        }" 
        ></div>
        <div class="show_att_content"> 
            <div style="font-weight:bold;font-size:16px;margin-top:10px;margin-bottom:10px">{{item.hotelname}}</div>
            <div style="font-size:13px;line-height:16px;margin-bottom:5px">地址：{{item.location}}
                <br>
                星级：{{item.star}}星
            </div>
            <el-button type="primary" icon="el-icon-plus"  style="float:bottom;margin-bottom:10px;height:30px;padding:5px 8px" @click="add(index,2)">添加到行程</el-button>
            </div>
           
        </div>
    </el-tab-pane>

  </el-tabs>
  </div>
      
    </div>
</template>
<style>
.leftbox{
    width: 280px;
    top: 200px;
    bottom:0px;
    left: 0px;
    border-style: none double none none;
    position: absolute;
    overflow-y:scroll;
}
.rec_title{
  font-size: 18px;
  font-weight: bold;
  width: 100%;
  margin-top: 15px;
}
.divider{
    width: 100%;
    height: 1px;
    background-color:rgb(220,223,230);

    margin-top: 10px;
}
.select_item{
    height: 60px;
    width: 235px;
    background-color: rgb(236,236,236);
    margin-top: 10px;
    
    margin-left: 5px;
    padding-left: 20px;
}
.day_icon{
width: 40px;
height: 40px;
background-color: #5b93e0;
color: white;
font-size: 20px;
text-align: center;
line-height: 40px;
float: left;
margin-top: 10px;
}
.city_name{
    float: left;
    font-size: 18px;
    margin-left: 20px;
    line-height: 60px;
}
.selected{
    background-color: #003680;
}
.middle_box{
left: 330px;
right:430px;
top: 200px;
bottom: 0px;
position: absolute;
overflow-y:scroll;
}
.day_title{
    text-align: center;
    font-size: 20px;
    width: 100%;
    margin-top: 20px;
}
.right_box{
right:0px;
width: 400px;
top: 200px;
bottom: 0px;
position: absolute;
overflow-y:scroll;

}
.show_att{
    
    height: 150px;
    margin: 10px 10px;
    padding-top: 10px;
    box-shadow: 2px 2px 10px #909090;
}
.show_att_content{
    float: left;
    height: 100%;
    width: 170px;
}
.rightimg{
    margin-top: 10px;
    margin-left: 10px;
    margin-right: 10px;
    width: 160px;
    height: 120px;
    background-size: 100% 100%;
    background-repeat:no-repeat;
     float: left;
}
.selected_items{
height: 120px;
    margin: 10px 10px;
    padding-top: 10px;
    
}
.midimg{
    margin-top: 10px;
    margin-left: 10px;
    margin-right: 10px;
    width: 130px;
    height: 100px;
    background-size: 100% 100%;
    background-repeat:no-repeat;
     float: left;
}
</style>
<script>
import Header from "@/components/Header.vue";
export default {
components: {Header},
    data(){
        return {
            days:0,
            cities:[],
            day_schedule:[],
            select_active:0,
            attraction_list:[],
            filt_attraction_list:[],
            hotel_list:[],
            filt_hotel_list:[],
            att_or_hot:'first',
            selected_items:[],
            search_attraction:'',
            search_hotel:'',
        }
    },
    mounted(){
        let temp=JSON.parse(this.$route.query.cities);
        let k=1;
        for(let i=0;i<50;i++)this.selected_items[i] = new Array();
        
        for(let i=0;i<temp.length;i++){
            let j=temp[i].day;
            this.days+=j;
            while(j--){
                var json={city_name:temp[i].city_name,day:k};
                this.day_schedule.push(json);
                k++;
        }
        }
        this.$axios
        .get(
        "http://49.234.18.247:8080/api/FunGetCommentNumByAttLocation/" +
          this.day_schedule[0].city_name
      )
      .then((response) => {
        this.items = response.data.sort(function (a, b) {
          return b.star - a.star;
        });
        this.attraction_list = JSON.parse(JSON.stringify(response.data));
        this.filt_attraction_list = JSON.parse(JSON.stringify(response.data));
      });
    this.$axios
        .get(
          "http://49.234.18.247:8080/api/FunGetCommentNumByHotelLocation/" +
            this.day_schedule[0].city_name
        )
        .then((response) => {
         this.items = response.data.sort(function (a, b) {
          return b.star - a.star;
        });
        this.hotel_list = JSON.parse(JSON.stringify(response.data));
        this.filt_hotel_list = JSON.parse(JSON.stringify(response.data));
        //console.log(this.attraction_list);
      });
    },
    methods:{
    changeSelect(index){
        this.select_active=index;
        this.$axios
        .get(
        "http://49.234.18.247:8080/api/FunGetCommentNumByAttLocation/" +
          this.day_schedule[index].city_name
      )
      .then((response) => {
        this.items = response.data.sort(function (a, b) {
          return b.star - a.star;
        });
        this.attraction_list = JSON.parse(JSON.stringify(response.data));
        this.filt_attraction_list = JSON.parse(JSON.stringify(response.data));
      });
      this.$axios
        .get(
        "http://49.234.18.247:8080/api/FunGetCommentNumByHotelLocation/" +
          this.day_schedule[index].city_name
      )
      .then((response) => {
        this.items = response.data.sort(function (a, b) {
          return b.star - a.star;
        });
        this.hotel_list = JSON.parse(JSON.stringify(response.data));
        this.filt_hotel_list = JSON.parse(JSON.stringify(response.data));
      });
    },
     handleClick(tab, event) {
        //console.log(tab, event);
      },
      add(index,opt){
          if(opt==1){
              var json={item_name:this.filt_attraction_list[index].attractionname,picture:this.filt_attraction_list[index].picture,location:this.filt_attraction_list[index].location};
              
              this.selected_items[this.select_active].push(json);
              this.$forceUpdate();
          }
          else if(opt==2){
            var jsonn={item_name:this.filt_hotel_list[index].hotelname,picture:this.filt_hotel_list[index].picture,location:this.filt_hotel_list[index].location};
            this.selected_items[this.select_active].push(jsonn);
            this.$forceUpdate();
          }
          

      },
      filt_attraction(){

          let _this=this;
          this.filt_attraction_list=this.attraction_list.filter(function (value) {
        return value.attractionname.toLowerCase().indexOf(_this.search_attraction.toLowerCase()) != -1
        });
      },
      filt_hotel(){

          let _this=this;
          this.filt_hotel_list=this.hotel_list.filter(function (value) {
        return value.hotelname.toLowerCase().indexOf(_this.search_hotel.toLowerCase()) != -1
        });
      },
    submit(){
        console.log(this.selected_items);
         this.$router.push({
          path: `/myplan`,
          query: {
            plan: JSON.stringify(this.selected_items),
            day: this.days,
          },
        });
    },
    }
}
</script>