<template>

    <div class="travelplan">
        <!-- <Header activeIndex="5" /> -->
        <div class="leftbox">
            <div class="rec_title">&nbsp;&nbsp;已选目的地</div>
            <div class="divider"></div>
            <div class="select_item"
            v-for="(item,index) in select_cities"
            :key="index"
            >
            <i class="el-icon-s-opportunity"></i>
            {{item.city_name}}
            <div style="float:right;margin-left:10px;margin-right:5px"> 
                <div class="count">
                <el-input-number size="mini" v-model="item.day" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
                天
                </div>
            <div style="height:50px;width:10px;float:left"></div>
            <i class="el-icon-error" style="float:left;margin-top:5px" @click="delete_item(index)"></i></div>
           
            </div>
           
        </div>
        <div class="create">
               <el-button type="primary" @click="submit()">创建攻略</el-button>
               </div> 
        <div class="cities_list">
            <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="国内"  name="first" >
        
        <div class="city_card" 
        v-for="item in cities" 
        :key="item.city_name"
        :style="{
          backgroundImage: 'url(' + item.img + ')',
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
        }" >
        <div class="dark_and_button"><el-button type="primary" @click="add(item.city_name)">添加</el-button></div>
         
        {{item.city_name}}
        </div>
    </el-tab-pane>
    <el-tab-pane label="国际·港澳台" name="second">
    <div class="city_card" 
        v-for="item in other_cities" 
        :key="item.city_name"
        :style="{
          backgroundImage: 'url(' + item.img + ')',
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
        }" >
        <div class="dark_and_button"><el-button type="primary" @click="add(item.city_name)">添加</el-button></div>
         
        {{item.city_name}}
        </div>
        </el-tab-pane>
  </el-tabs>
        </div>
    </div>
</template>
<style scoped>
.leftbox{
    width: 240px;
    top: 0px;
    bottom:60px;
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
    height: 40px;
    width: 200px;
    background-color: rgb(236,236,236);
    margin-top: 10px;
    padding-top: 20px;
    margin-left: 5px;
    padding-left: 5px;

}
.count{
    height: 100%;
    float: left;
    margin-right: 10px;
}
.el-input-number{
    width: 70px;

}

.el-input-number /deep/ .el-input__inner{
    padding-left: 25px;
    padding-right: 25px;
   
    
}
.el-input-number /deep/ .el-input-number__decrease{
    width: 20px;
   
}
.el-input-number /deep/ .el-input-number__increase{
    width: 20px;
}
.cities_list{
left: 280px;
right:0px;
top: 10px;
bottom: 0px;
position: absolute;
overflow-y:scroll;
}
.create{
    bottom: 0px;
    width: 280px;
    left: 0px;
    height: 20px;
    position: absolute;
    text-align: center;
    padding-bottom: 30px;
}
.el-tabs /deep/ .el-tabs__item{
    font-size: 16px;
}
.city_card{
    width: 250px;
    height: 150px;
    background-color: powderblue;
    float: left;
    margin: 10px 20px 10px 0px;
    color:white;
    font-family: \6977\4F53;
    text-align: center;
    line-height: 150px;
    font-size: 25px;
}
.dark_and_button{
opacity: 0.85;
background-color: gray;
display:none;
}
.city_card:hover .dark_and_button {
display: block;
}
</style>
<script>
// import Header from "@/components/Header.vue";
export default {
//     components: {
//     Header,
//   },
name: "travelplan",
  data(){
      return{
        activeName:'first',
        cities:[
            {city_name:"北京",
             img:"https://iknow-pic.cdn.bcebos.com/060828381f30e924e5181acb47086e061c95f788?x-bce-process%3Dimage%2Fresize%2Cm_lfit%2Cw_600%2Ch_800%2Climit_1%2Fquality%2Cq_85%2Fformat%2Cf_jpg"},
            {city_name:"上海",
            img:"https://nimg.ws.126.net/?url=http%3A%2F%2Fcrawl.ws.126.net%2F1dc13a6e54059cce885cd4082035d3a7.jpg&thumbnail=650x2147483647&quality=80&type=jpg"
            },
            {city_name:"南京",
            img:"https://ac-q-cf.static.booking.cn/xdata/images/city/540x270/683805.webp?k=f17521ef2323b4e61ed402abfa5988ba05ea0898a63bf36c86318a0a42039cfa&o="},
            {city_name:"兰州",
            img:"https://p7.itc.cn/q_70/images03/20210721/ed03b324d6aa4627bb908601d753832d.jpeg"},
            {city_name:"重庆",
            img:"http://n.sinaimg.cn/sinacn10115/18/w2000h1218/20200224/596a-ipvnszf4465812.jpg"},
            {city_name:"玉林",
            img:"http://5b0988e595225.cdn.sohucs.com/images/20180702/8e2a168891ba42dca29bbcaf17f8265b.jpeg"},
            {city_name:"大理",
            img:"https://pic3-nc.pocoimg.cn/image/poco/works/81/2013/0415/01/4153885720130415094307025_41538857_H1920.jpg"},
            {city_name:"广州",
            img:"http://photo.tuchong.com/1183782/f/28462921.jpg"},
        ],
        other_cities:[
            {city_name:"香港",
             img:"http://t1-q.mafengwo.net/s9/M00/0A/E4/wKgBs1hPaj2AczSlAAL2AlKY4dU40.jpeg?imageMogr2%2Fthumbnail%2F%21690x450r%2Fgravity%2FCenter%2Fcrop%2F%21690x450%2Fquality%2F90%7Cwatermark%2F1%2Fimage%2FaHR0cDovL2IxLXEubWFmZW5nd28ubmV0L3MxMS9NMDAvNDQvOUIvd0tnQkVGc1A1UnlBRHY3cEFBQUhaWlVQUmxROTkwLnBuZw%3D%3D%2Fgravity%2FSouthEast%2Fdx%2F10%2Fdy%2F11"},
        ],
        select_cities:[],
      }
  },
  methods:{
      add(name){
          var temp=this.select_cities.find(x => x.city_name === name);
            if(temp) this.$message('您已添加过该城市');
            else{
                var json={city_name:name,day:3};
          this.select_cities.push(json);
            }

      },
      handleClick(tab, event) {
        //console.log(tab, event);
      },
      handleChange(value) {
        // console.log(value);
        // console.log(this.cities);

      },
      delete_item(index){
          this.select_cities.splice(index,1);
      },
      submit(){
          this.$router.push({
          path: `/makeplan`,
          query: {
            cities: JSON.stringify(this.select_cities),
          },
        });
      }
  }
}
</script>