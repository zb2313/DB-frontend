<template>
  <div class="order">
    <Header activeIndex="3" />
    <div class="fill">
      <el-card class="box-card">
        <div class="generate">出票成功!</div>
        <!-- <el-divider></el-divider> -->
        <div class="passenger_input">

  </div>

        <div class="passenger_info">请填写乘客信息</div>
        <el-divider></el-divider>
        <div class="passenger_input">
          <div class="passenger_input_item">
            <div class="item_header">姓名</div>
            <el-input
              v-model="user_name"
              placeholder="请与证件姓名保持一致"
            ></el-input>
          </div>

          <div class="passenger_input_item">
            <div class="item_header">身份证号</div>
            <el-input
              v-model="id_number"
              placeholder="请输入身份证号"
            ></el-input>
          </div>

          <div class="passenger_input_item">
            <div class="item_header">手机号</div>
            <el-input
              v-model="tele_number"
              placeholder="乘机人手机号码，用于接收短信"
            ></el-input>
          </div>
        </div>
        <el-button type="primary" @click="book">支付</el-button>
      </el-card>
    </div>

    <div class="flight_info">
      <el-card class="box-card" style="box-shadow: 2px 2px 10px #909090;">
        <div class="flight_info_header">
          {{ vehicle.companY_NAME }}&nbsp;{{ vehicle.vehiclE_ID }}
        </div>
        <!-- <div class="divide"></div> -->
        <div class="time_place">
          <div class="time">
            {{ vehicle.starT_TIME }}
            <br />
            <div style="font-size: 14px">{{ vehicle.starT_LOCATION }}</div>
          </div>
        </div>
        <div style="float:left;height:100%;line-height:50px">----</div>
        <div class="time_place">
          <div class="time">
            {{ vehicle.enD_TIME }}
            <br />
            <div style="font-size: 14px">{{ vehicle.enD_LOCATION }}</div>
          </div>
        </div>
       <span style="margin:10px 10px"> {{date}}</span>
        <div class="divide"></div>
        <div style="font-size:14px; float:left;margin-top:10px;margin-left:10px">{{seat_type}} &nbsp; {{seat_id}}</div>
        <div class="price">{{ price }}</div>
      </el-card>
    </div>
  </div>
</template>

<style>
.el-button {
  margin-left: 290px;
}
.passenger_info {
  font-size: 20px;
  text-align: left;
  margin-top: 30px;

}
.generate{
  font-size: 20px;
  text-align: left;
  margin-top: 20px;
  margin-bottom: 20px;
  font-weight: bold;
}
.passenger_input {
  margin-left: 30px;
  text-align: left;
}
.item_header {
  font-size: 18px;
  float: left;
  width: 80px;
  margin-bottom: 10px;
}
.el-input__inner {
  width: 500px;
}
.passenger_input_item {
  margin-top: 10px;
  margin-bottom: 20px;
}
.fill {
  width: 700px;
  height: 450px;
  margin-left: 80px;
  float: left;
  /* background:#ff0000; */
}
.flight_info {
  width: 400px;
  position: fixed;
  left: 800px;
  top: 150px;
  height: 300px;
  /* background: #000000; */
}
.flight_info_header {
  text-align: left;
  font-size: 25px;
  margin-bottom:20px;
}
.time_place {
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 20px;
  margin-right: 20px;
  float: left;
  height: 70px;
  width: 120px;
}
.time {
  font-size: 30px;
  margin-top: 0px;
  margin-bottom: 10px;
  margin-left: 0px;
  float: left;
  height: 100%;
}
.price {
  font-size: 30px;
  margin-left: 0px;
  margin-right: 10px;
  margin-top: 10px;
  margin-bottom: 20px;
  text-align: left;
  width: 100%;
  float:left;
}
.divide {
  background: rgb(177, 175, 175);
  height: 1px;
  width: 360px;
  float: left;
}
</style>

<script>
import Header from "@/components/Header.vue";
export default {
  components: {
    Header,
  },
  data() {
    return {
      vehicle:'',
      user_name:"",
      user_id: "",
      id_number: "",
      tele_number: "",
      from: "北京",
      to: "上海",
      company_name: "",
      vehicle_id: "MU5099",
      start_time: "7:00",
      end_time: "9:15",
      show_start_time: "7:00",
      show_end_time: "9:15",
      price: "666",
      seat_id: '',
      seat_type: '经济舱',
      options:[],
      tableData:[],
      date:'',
      //[{value:"45C"},{value:"46A"},{value:"48B"},{value:"49F"}]
    };
  },
  created() {
    this.user_id=localStorage.getItem("ms_username")
  },
  methods: {
      change_seat_id(value){
        //console.log(value);
        for(let i=0;i<this.tableData.length;i++){
          if(value==this.tableData[i].seaT_ID){
            this.price=this.tableData[i].price;
            break;
          }
        }
      },


    book() {
      if(this.user_name&&this.id_number&&this.tele_number){
        var myDate = new Date();
        console.log(myDate);
      let _this=this;
      if(this.vehicle.companY_NAME){
        this.$axios.post(
          "http://49.234.18.247:8080/api/PurchaseTrafficTicket",
          {
          "vehiclE_ID": this.vehicle.vehiclE_ID,
          "useR_ID": localStorage.getItem("ms_username"),
          "flighT_DATE": this.date,
          "seaT_TYPE": this.seat_type,
          "ordeR_AMOUNT": this.price.slice(1),
          "ordeR_TIME": this.storeTime,
          "telephone": this.tele_number,
          }
          )
          .then((response) => {
            console.log('succ');
            this.$alert(_this.vehicle_id+" "+_this.seat_id+" 预定成功","提示", {confirmButtonText: "确定", })
          })
          .catch(function () {
  console.log('err');
  _this.$alert(_this.vehicle_id+" "+_this.seat_id+" 预定失败","提示", {
        confirmButtonText: "确定",

      })
})
      }
      else {
         this.$axios.post(
          "http://49.234.18.247:8080/api/PurchaseTrainTicket",
          {
          "vehiclE_ID": this.vehicle.vehiclE_ID,
         "useR_ID": localStorage.getItem("ms_username"),
          "seaT_TYPE": this.seat_type,
          "ordeR_AMOUNT": parseInt(this.price.slice(1)),
         "ordeR_TIME": this.storeTime,
         "telephone":this.tele_number,
         "traiN_DATE": this.date
          }
          )
           .then((response) => {
            console.log('succ');
            this.$alert(_this.vehicle_id+" "+_this.seat_id+" 预定成功","提示", {confirmButtonText: "确定", })
          })
          .catch(function () {
  console.log('err');
  _this.$alert(_this.vehicle_id+" "+_this.seat_id+" 预定失败","提示", {
        confirmButtonText: "确定",

      })
})
      }
     







    }
    else {
      this.$alert('请填写所有信息', '提示', {
          confirmButtonText: '确定'
        })
    }

  }},
   mounted(){
    let _this=this;

    //await  _this.get_ticket_info() ;
    //await  new Promise((resolve, reject) => {_this.get_checi_info() ;resolve()} );
    //this.formInline.state1=this.$route.query.from;
    this.vehicle=JSON.parse(this.$route.query.vehicle);
    this.seat_type=this.$route.query.seat_type;
    this.date=this.$route.query.date;
    console.log(this.seat_type);
    this.price=this.$route.query.price;
    if(this.vehicle.starT_AIRPORT){
      this.vehicle.starT_LOCATION=this.vehicle.starT_AIRPORT;
      this.vehicle.enD_LOCATION=this.vehicle.enD_AIRPORT;
    }
// this.$axios.get(
//           "http://49.234.18.247:8080/api/QueOptSeat/"+this.vehicle_id+'&'+this.seat_type,{

//           }
//           )
//           .then(function(response){
//             //console.log(response);
//             _this.tableData=response.data;
//             let temp=response.data[0];
//            _this.from=temp.starT_LOCATION;
//            _this.to=temp.enD_LOCATION;
//            _this.start_time=temp.starT_TIME;
//            _this.end_time=temp.enD_TIME;
//           _this.seat_type=temp.seaT_TYPE;
//            _this.price=temp.price;
//            _this.company_name=temp.companY_NAME;
//            const l=response.data.length;
//           console.log(response.data.length);
//           console.log(response.data);
//           for(let i=0;i<l;i++){
//             console.log(i);
//             var json = {"value":response.data[i].seaT_ID};
//             if(response.data[i].tradE_STATUS=="未售")_this.options.push(json);
//           }}

// )
// .catch(function () {
//   console.log('err');

// })
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
};
</script>
