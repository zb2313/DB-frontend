<template>
  <el-container direction="vertical">
    <Header activeIndex="3" />
    <el-container>
      <el-aside width="250px" style="background-color: rgb(238, 241, 246)">
      <div class="rec_title">&nbsp;&nbsp;&nbsp;精选酒店</div> 
      
        <div
              class="hotelInfo"
              v-for="(item, index) in hotels.slice(0, 6)"
              :key="index+20"
              @click="to_this_hotel(item.hoteid)"
            >
        <div
                class="infoImg"
                :style="{
                  backgroundImage: 'url(' + item.picture + ')',
                  backgroundSize: '100% 100%',
                  backgroundRepeat: 'no-repeat',
                }"
              ></div>
              <div class="infoDetail">
                 <el-tooltip class="item" effect="dark"  placement="right">
                    <div slot="content">{{ item.hotelname }}</div>
                <div class="Name" style="font-size: 14px">
                  {{ item.hotelname.slice(0,14) }}
                  <span v-if="item.hotelname.length>14 ">...</span> 
                </div>
                 </el-tooltip>
                <el-tooltip class="item" effect="dark"  placement="right">
                  <div slot="content">{{ item.location }}</div>
      <span class="address">{{ item.location.slice(0,16) }}
        <span v-if="item.location.length>16 ">...</span> </span>
      
    </el-tooltip>
                <br>
                <img
                  src="../../assets/img/diamond.svg"
                  v-for="i in item.star"
                  :key="i"
                  style="margin-top: 2px"
                />
                <div class="Details">
                  
                  <span class="Price"
                    ><span class="price1"> ￥{{ item.lowestprice }}</span
                    ><i>起</i></span
                  >
                </div>
              </div>
            </div>
         <div class="more" @click="more(1)">更多附近酒店...</div>
 
      <div class="rec_title">&nbsp;&nbsp;&nbsp;精选景点</div> 
      <div
              class="attriInfo"
              v-for="(item, index) in attractions.slice(0, 6)"
              :key="index+10"
              @click="to_this_attraction(item.attractionid)"
            >
              <div
                class="infoImg"
                :style="{
                  backgroundImage: 'url(' + item.picture + ')',
                  backgroundSize: '100% 100%',
                  backgroundRepeat: 'no-repeat',
                }"
              ></div>
              <div class="infoDetail">
                 <el-tooltip class="item" effect="dark"  placement="right">
                    <div slot="content">{{ item.attractionname }}</div>
                <div class="Name" style="font-size: 14px">
                  {{ item.attractionname.slice(0,14) }}
                  <span v-if="item.attractionname.length>14 ">...</span> 
                </div>
                 </el-tooltip>
                  <el-tooltip class="item" effect="dark"  placement="right">
                    <div slot="content">{{ item.location }}</div>
                <span class="address">{{ item.location.slice(0,16) }}
                <span v-if="item.location.length>16 ">...</span> </span>
                </el-tooltip>
                <br>
                <img
                  src="../../assets/img/star.svg"
                  v-for="i in item.star"
                  :key="i"
                  style="margin-top: 2px"
                />
                <div class="Details">
                  
                  <span class="price2">{{ item.price }}元</span>
                </div>
              </div>
            </div>
        <div class="more" @click="more(2)">更多附近景点...</div>
   
      </el-aside>

      <el-container>

        <el-main>
          
          <div class="anti_virus" >
            <i class="el-icon-warning" style="float:left ;color:red;margin-top:3px"></i>
            <div style="float:left;width:95%;margin-left:10px">
            <font style="color:red;font-weight:bold;font-size:15px">出行提醒：</font>
            <font style="font-size:13px; color:rgb(108,131,151)">受新冠疫情影响，各地疫情防控政策调整频繁，请在出行前务必与出发地以及目的地疫情管控相关单位进一步确认核酸检测报告时限要求以及落地管控政策，合理安排出行。有中高风险地区旅居史的人员，请配合落实14天（自离开中高风险地区之日起）的隔离医学观察。中高风险地区所在市的低风险地区外来人员，应主动向社区报告，并配合做好核酸检测。</font>
            </div>

          </div>
          <div class="search">
            <el-form :model="formInline">
              <el-row>
                <el-col :span="5"
                  ><el-form-item>
                    <el-select
                      v-model="formInline.ticket_type"
                      placeholder="机票"
                    >
                      <el-option label="机票" value="机票"></el-option>
                      <el-option label="火车票" value="火车票"></el-option>
                    </el-select> </el-form-item
                ></el-col>

                <el-col :span="5"
                  ><el-form-item>
                    <el-input
                      v-model="query_departure_airport"
                      placeholder="出发地"
                    ></el-input> </el-form-item
                ></el-col>

                <el-col :span="5">
                  <el-form-item>
                    <el-input
                      v-model="query_arrival_airport"
                      placeholder="目的地"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
              <el-form-item>
                <el-date-picker
                  v-model="formInline.departure_date"
                  type="date"
                  placeholder="选择日期"
                  :picker-options="pickerOptions"
                  value-format="yyyy-MM-dd" 
                  style="width:200px"
                  >
                </el-date-picker>
                
              </el-form-item>
            </el-col>

                <el-col :span="3">
                  <el-button
                    style="width: 100%;height:40px"
                    type="primary"
                    @click="newQuery"
                    icon="el-icon-search"
                    >查询</el-button
                  >
                </el-col>
              </el-row>
            </el-form>
          </div>
          <div>
            <div>
    <el-radio-group v-model="sort_prior" @change="sort" style="margin-right:50px">
      <el-radio-button label="1">时间顺序</el-radio-button>
      <el-radio-button label="2">低价优先</el-radio-button>
    </el-radio-group>
  </div>
          </div>
           <div
           
            v-for="(item,index) in vehicle_info"
            :key="index"> 
          <el-card
            class="cardstyle"
            
          >
            <div class="headers">
              <div style="font-weight:bold;font-size:20px">{{ item.companY_NAME }}</div>
             <br>
             <div style="color:rgb(0,54,128)">{{ item.vehiclE_ID }}</div>
              
            </div>
            
            <div class="body">
              <div class="time_place">
                <div class="time">
                  {{ item.starT_TIME }}
                  <br />
                  <div style="font-size: 14px">{{ item.starT_AIRPORT }}</div>
                </div>
              </div>
              <div style="margin-top:15px;margin-left: 10px;margin-right: 10px;float: left;height: 100%;width: 100px;">&nbsp;&nbsp;&nbsp;{{item.drive_time}}<div class="dancheng"></div></div>
              <div class="time_place">
                <div class="time">
                  {{ item.enD_TIME }}
                  <br />
                  <div style="font-size: 14px">{{ item.enD_AIRPORT }}</div>
                </div>
              </div>
               
               <div class="price">￥{{item.LOWEST_PRICE}} <span style="font-size:10px">起</span> </div>
                <div
                class="magic_button"
                :class="{changeStyle:magic_button_status[index] == '收起▲' }"
                @click="change_button_status(index)"
                >
                {{magic_button_status[index]}}
                </div>

            </div>
            
            
          </el-card>
          <div
            class="prices"
            v-for="(x,indexx) in item.prices"
            :key="indexx"
            :class="{hide:magic_button_status[index] == '展开▼' }"
            >
            <span>退改￥233起&nbsp;|&nbsp;托运行李额20KG&nbsp;|&nbsp;小食&nbsp;|&nbsp;行程单</span>
           <el-button
           style="float:right;margin-right:120px;margin-left:10px;background-color:rgb(0,54,128);"
           type="primary"
                    @click="onSubmit(index,x.seaT_TYPE,x.price)"
                    >选购</el-button>
            
            <div style="color:red;font-size:20px;font-weight:bold;float:right">￥{{x.price}}</div>
              <div style="color:black;font-size:15px;float:right">{{x.seaT_TYPE}}</div>
            
            </div>
           </div>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<style scoped>
.rec_title{
  font-size: 18px;
  font-weight: bold;
  width: 100%;
  float: left;
 
  margin-top: 20px;
}
.hotel_rec{
  width: 100%;
  height: 150px;
  background-color: white;
  padding: 20px 20px ;
  float: left;
}
.attriInfo,
.hotelInfo {
  float: left;
  margin: 21px 0px 0px 15px;
  width: 220px;
  height: 210px;
  background-color: #fff;
}
.attriInfo:hover{
  box-shadow: 2px 2px 10px #909090;
  cursor: pointer;
}
.hotelInfo:hover{
  box-shadow: 2px 2px 10px #909090;
  cursor: pointer;
}
.more{

  margin: 20px 20px;
  font-size: 13px;
  color: #666;
  float: left;
  font-weight: bold;
}
.more:hover{
  color: #003680;
  cursor: pointer;
}
.infoImg {
  height: 60%;
  width: 100%;
}

.infoDetail {
  padding: 3px 5px;
}

.address {
  font: 12px/14px "Microsoft YaHei", SimHei, SimSun, Tahoma, Verdana, Arial,
    sans-serif;
  color: #666;

}

.Details .price1 {
  color: orangered;
  font: bold 22px/22px "Lucida Console", "Courier New", monospace, sans-serif;

}
.Details .price2 {
  color: orangered;
  font: bold 22px/22px "Lucida Console", "Courier New", monospace, sans-serif;
  float: left;
}

.Details i {
  margin-left: 3px;
  font-style: normal;
  font-size: 13px;
}
.anti_virus{

  width: 100%;
  background-color:rgb(255, 241, 240);
  padding-left: 10px;
  padding-top: 10px;
  height: 70px;
  
}
.select {
  width: 40%;
  height: 40px;
  margin: 0 auto 30px auto;
}
.select .el-button {
  width: 100%;
  height: 100%;
}
.search {
  margin-top: 30px;
  margin-bottom: 5px;
}
.vehicle-info {
  margin-top: 10px;
  height: 500px;
}
.cardstyle {
  width: 100%;
  height: 130px;
  margin-top: 20px;
  margin-bottom: 20px;

}
.prices{
  width: 100%;
  height: 30px;
  margin:10px 40px;
  font-size: 13px;
  color: #666;
}
.time_place {
  margin-top: 10px;
  margin-bottom: 20px;
  margin-left: 30px;
  margin-right: 10px;
  float: left;
  height: 100%;
  width: 120px;
  text-align: center;
}
.magic_button{
  width: 60px;
  height: 30px;
  margin: 30px 20px;
  background-color: rgb(0,54,128);
  color: white;
  float: right;
  text-align: center;
  line-height: 30px;
  font-size: 14px;
  cursor: pointer;
}
.changeStyle{
  background-color: white;
  color: rgb(0,54,128);
  border-style:solid;
  border-width:1px; 
  border-color:#000
}
.hide{
  display: none;
}
.detail {
  margin-top: 10px;
  margin-left: 50px;
  float: left;
}
.el-menu {
  margin-bottom: 20px;
}
.el-submenu__title {
  font-size: 16px;
  margin-left: 0px;
  padding-left: 0px;
}
.el-checkbox__label {
  line-height: 25px;
  font-size: 15px;
}

.time {
  font-size: 30px;
  margin-bottom: 20px;
  margin-left: 0px;
  float: left;
  height: 100%;
}
.seattype{
  font-size: 15px;
  width: 50px;
  height: 100%;
  margin-left: 70px;
  margin-right: 5px;
  margin-top: 10px;
  line-height: 25px;
  float: left;
}
.leftticket{
  font-size: 15px;
  width: 50px;
  height: 100%;
  margin-left: 5px;
  margin-right: 5px;
  margin-top: 10px;
  line-height: 25px;
  float: left;
}
.price {
  font-size: 30px;
  width: 100px;
  height: 100%;
  margin-left: 30px;
  margin-right: 10px;
  line-height: 100px;
  float: left;
}
.yuding_buttons{
  width: 50px;
  height: 100%;
  float: right;
  margin-top: 10px;
  margin-right: 50px;
}
.headers {
  width: 120px;
  height: 100px;
  float: left;
  margin-right: 20px;
  margin-top: 10px;
  text-align: center;
  font-size:15px;
}
.body {
  float: left;
  width: 750px;
  height: 100px;
}
.el-button{
 float: right;
 height: 22px; 
 width: 55px;
 padding:3px 5px;
 margin-top:1px ;
 margin-bottom:1px ;
 
}
.dancheng {
  display: inline-block;
  width: 130px;
  height: 20px;
  background: center/100% url("../../assets/img/dancheng.png") no-repeat;
}
.el-aside {
  color: #333;
}
.jump_to_detail{
  float: left;
  margin-left: 10px;
  margin-top: 10px;
  width: 200px;
}


</style>
<script>
import Header from "@/components/Header.vue";
import FavoritesVue from '../Favorites.vue';
export default {
    components: {
    Header,
  },
  data(){
      return{
          sort_prior:"1",
         magic_button_status:[],
      train_type: false,
      formInline: {
        user: "",
        ticket_type: "",
        restaurants: [],
        seat_type: "",

        departure_date:"",
      },

      form: {
        company_type: [],
        price_type:[],
      },
        query_departure_airport: "",
        query_arrival_airport: "",
        departure_airport_list: [],
        arrival_airport_list:[],
      originalData:[],
      defult_vehicle_info:[],
      pickerOptions: {
             disabledDate(time) {
    
             return (time.getTime() < Date.now()-86400000)||(time.getTime() > Date.now()+14*86400000);
             },},
          hotels: [
        {
          hotelname: "格林豪泰酒店",
          star: 3,
          lowestprice: 400,
          location: "同济大学正门外",
          picture: "https://dimg11.c-ctrip.com/images/0AD5d120008nj322zC5A7_R_300_120.jpg",
        },
        {
          hotelname: "格林豪泰酒店",
          star: 3,
          lowestprice: 400,
          location: "同济大学正门外",
          picture: "https://dimg11.c-ctrip.com/images/0AD5d120008nj322zC5A7_R_300_120.jpg",
        }
        ],
        attractions: [
        {
          attractionname: "黄渡公园",
          star: 3,
          price: 10,
          location: "同济大学周边",
          picture: "https://dimg04.c-ctrip.com/images/300r13000000uv525D82B_C_500_280.jpg",
        },
        {
          attractionname: "黄渡公园",
          star: 3,
          price: 10,
          location: "同济大学周边",
          picture: "https://dimg04.c-ctrip.com/images/300r13000000uv525D82B_C_500_280.jpg",
        }
        ],
        vehicle_info:[
            {
                companY_NAME:'中国国际航空',
                vehiclE_ID:'122',
                starT_TIME:'8：35',
                enD_TIME:'9：35',
                starT_AIRPORT:'浦东机场',
                enD_AIRPORT:'北京大兴',
                LOWEST_PRICE:'688',
                prices:[
                  {
                    seaT_TYPE:"经济舱",
                    price:630,
                  },
                  {
                    seaT_TYPE:"商务舱",
                    price:880,
                  },
                ]
            },
             {
                companY_NAME:'外国国际航空',
                vehiclE_ID:'idjs',
                starT_TIME:'3：35',
                enD_TIME:'6：35',
                starT_AIRPORT:'浦东机场',
                enD_AIRPORT:'北京大兴',
                LOWEST_PRICE:'688',
            },
             {
                companY_NAME:'中国东方航空',
                vehiclE_ID:'MH370',
                starT_TIME:'8：35',
                enD_TIME:'9：35',
                starT_AIRPORT:'浦东机场',
                enD_AIRPORT:'北京大兴',
                LOWEST_PRICE:'688',
            },
        ]
      }
  },
  mounted(){
    this.vehicle_info=[];
    this.formInline.ticket_type="机票";
    this.query_departure_airport=this.$route.query.from;
    this.query_arrival_airport=this.$route.query.to;
    this.formInline.departure_date=this.$route.query.date;
    if(this.$route.query.cheap)this.sort_prior=2;
     this.$axios
        .get(
        "http://49.234.18.247:8080/api/FunGetFlightInfo/" +
        this.query_departure_airport+'&'+this.query_arrival_airport+'&'+ this.formInline.departure_date
      )
      .then((response) => {
        var lowest=100000000;
        response.data.reverse();
       this.vehicle_info[0]= {  
        "vehiclE_ID": response.data[0].vehiclE_ID,
        "companY_NAME": response.data[0].companY_NAME,
        "starT_AIRPORT": response.data[0].starT_AIRPORT,
        "enD_AIRPORT": response.data[0].enD_AIRPORT,
        "starT_TIME": response.data[0].starT_TIME,
        "enD_TIME": response.data[0].enD_TIME,
        "prices": [],
        }
        var json={
          seaT_TYPE:response.data[0].seaT_TYPE,
          price:response.data[0].price,
        }
        lowest=Math.min(lowest,response.data[0].price);
        //console.log(lowest);
        this.vehicle_info[0].LOWEST_PRICE=lowest;

        this.vehicle_info[0].prices[0]=json;
        console.log(this.vehicle_info[0].vehiclE_ID);
        var k=1;
        for(var i=1;i<response.data.length;i++){
          if(response.data[i].vehiclE_ID==this.vehicle_info[k-1].vehiclE_ID){
            var jsonn={
            seaT_TYPE:response.data[i].seaT_TYPE,
            price:response.data[i].price,
            }
        lowest=Math.min(lowest,response.data[i].price);
        this.vehicle_info[k-1].LOWEST_PRICE=lowest;
            this.vehicle_info[k-1].prices[this.vehicle_info[k-1].prices.length]=jsonn;
          }
          else{
            lowest=100000000;
            this.vehicle_info[k++]= {  
        "vehiclE_ID": response.data[i].vehiclE_ID,
        "companY_NAME": response.data[i].companY_NAME,
        "starT_AIRPORT": response.data[i].starT_AIRPORT,
        "enD_AIRPORT": response.data[i].enD_AIRPORT,
        "starT_TIME": response.data[i].starT_TIME,
        "enD_TIME": response.data[i].enD_TIME,
        "prices": [],
        }
        var jsonnn={
          seaT_TYPE:response.data[i].seaT_TYPE,
          price:response.data[i].price,
        }
         lowest=Math.min(lowest,response.data[i].price);
        this.vehicle_info[k-1].LOWEST_PRICE=lowest;
        this.vehicle_info[k-1].prices[0]=jsonnn;
          }
        }
        console.log(this.vehicle_info);
        this.defult_vehicle_info=JSON.parse(JSON.stringify(this.vehicle_info));
        })
    this.$axios
        .get(
        "http://49.234.18.247:8080/api/FunGetCommentNumByHotelLocation/" +
          this.query_arrival_airport
      )
      .then((response) => {
        var temp_hotel = response.data.sort(function (a, b) {
          return b.star - a.star;
        });
        this.hotels=temp_hotel.slice(0,2);
      })
      this.$axios
        .get(
        "http://49.234.18.247:8080/api/FunGetCommentNumByAttLocation/" +
          this.query_arrival_airport
      )
      .then((response) => {
        var temp_hotel = response.data.sort(function (a, b) {
          return b.star - a.star;
        });
        this.attractions=temp_hotel.slice(0,2);
      })
    for(var i=0;i<1000;i++)
    this.magic_button_status[i]="展开▼";
    this.$forceUpdate();
  },
  methods:{
    change_button_status(index){
      if(this.magic_button_status[index]=="收起▲")this.magic_button_status[index]="展开▼";
      else if(this.magic_button_status[index]=="展开▼")this.magic_button_status[index]="收起▲";
      console.log(this.magic_button_status[index])
      this.$forceUpdate();
    },
     sort(){

      if(this.sort_prior=="1")this.vehicle_info=JSON.parse(JSON.stringify(this.defult_vehicle_info));
      else if(this.sort_prior=="2"){
        this.vehicle_info=JSON.parse(JSON.stringify(this.defult_vehicle_info));
      this.vehicle_info.sort( function ( a , b ){ 
        return  a.LOWEST_PRICE-b.LOWEST_PRICE} );}
 
    },
     onSubmit(index,type,price){
      this.$router.push({
        path:`/tickets/order`,
        query:{
          vehicle:JSON.stringify(this.vehicle_info[index]),
          seat_type:type,
          price:'￥'+price,
          date:this.formInline.departure_date,
        }
      })
     console.log(index);
    },
     newQuery() {
      if (
        this.formInline.ticket_type &&
        this.query_departure_airport &&
        this.query_departure_airport &&
        this.formInline.departure_date
      ) {
        if(this.formInline.ticket_type=="火车票"){

          this.$router.push({
          path: `/tickets/trainquery`,
          query: {
            from: this.query_departure_airport,
            to: this.query_arrival_airport,
            date: this.formInline.departure_date,
          },
        });
      } 
        else {
          this.$router.push({
            path: `/tickets/planequery`,
            query: {
              from: this.query_departure_airport,
              to: this.query_arrival_airport,
              date: this.formInline.departure_date,
            },
          });
        }
        
      }
     else {
        this.$alert("请填写所有选项再查询", "提示", {
          confirmButtonText: "确定",
        });
        }
    },
    to_this_attraction(x){
      this.$router.push({
          path: "/attraction/detail",
          query: { id: x },
        });
    },
      to_this_hotel(x){
      this.$router.push({
        path: "/hotel/detail",
        query: { id: x },
        });
    },
    more(opt){
      if(opt==1){
        this.$router.push({
        path: "/hotel/city",
        query: { find: this.query_arrival_trainstation },
      });
      }
      else {
        this.$router.push({
        path: "/attraction/city",
        query: { search: this.query_arrival_trainstation },
      });
      }
    },
   
  }
}
</script>