<template>
  <div class="order">
    <Header activeIndex="3" />
    <div class="fill">
      <el-card class="box-card">
        <div class="passenger_info">选择座位</div>
        <el-divider></el-divider>
        <div class="passenger_input">
        <el-select v-model="seat_id" placeholder="请选择" style="width=100px" @change="change_seat_id">

    <el-option
      v-for="item in options"
      :key="item.value"
      :value="item.value"
      >
    </el-option>
  </el-select>
  </div>

        <div class="passenger_info">乘机人信息</div>
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
        <el-button type="primary" @click="book">预定</el-button>
      </el-card>
    </div>

    <div class="flight_info">
      <el-card class="box-card">
        <div class="flight_info_header">
          {{ company_name }}&nbsp;{{ vehicle_id }}
        </div>
        <div class="time_place">
          <div class="time">
            {{ start_time }}
            <br />
            <div style="font-size: 14px">{{ from }}</div>
          </div>
        </div>
        <div class="time_place"><br />---------</div>
        <div class="time_place">
          <div class="time">
            {{ end_time }}
            <br />
            <div style="font-size: 14px">{{ to }}</div>
          </div>
        </div>
        <div class="divide"></div>
        <div style="font-size:14px; float:left;margin-top:10px;margin-left:10px">{{seat_type}} &nbsp; {{seat_id}}</div>
        <div class="price">￥{{ price }}</div>
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
  margin-top: 20px;
  margin-bottom: 20px;
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
  margin-top: 10px;
  margin-bottom: 10px;
}
.time_place {
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 30px;
  margin-right: 30px;
  float: left;
  height: 100%;
  width: 50px;
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
  color: #1356b4;
  margin-left: 0px;
  margin-right: 10px;
  margin-top: 10px;
  margin-bottom: 20px;
  float: left;
  text-align: left;
  width: 100%;
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
      user_name:"",
      user_id: "",
      id_number: "",
      tele_number: "",
      from: "北京",
      to: "上海",
      company_name: "东方航空",
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
      if(this.user_id&&this.id_number&&this.tele_number){
        var myDate = new Date();
        console.log(myDate);
      let _this=this;
      console.log(this.vehicle_id);
      console.log(this.seat_id);
      console.log(this.seat_type);
      console.log(this.price);


      this.$axios.post(
          "http://49.234.18.247:8080/api/PurchaseTrafficTicket",
          {
          "vehiclE_ID": this.vehicle_id,
         "seaT_ID": this.seat_id,
         "useR_ID": this.user_ID,
          "ordeR_AMOUNT": this.price,
         "ordeR_TIME": this.storeTime,
         "telephone":this.tele_number
          }
          )
          .then(function(){
        console.log('postsucc');
           _this.$axios.put('http://49.234.18.247:8080/api/TrafficTicket/'+_this.vehicle_id+'&'+_this.seat_id,{
             "vehiclE_ID": _this.vehicle_id,
          "seaT_ID": _this.seat_id,
         "seaT_TYPE": _this.seat_type,
          "price": _this.price,
         "tradE_STATUS": "已售"
           })
          .then(function () {
          console.log('modifysucc');
          })

          .catch(function () {

          console.log('modifystatus');
  });
            _this.$alert(_this.vehicle_id+" "+_this.seat_id+" 预定成功","提示", {
        confirmButtonText: "确定",

      })
          }

)
.catch(function () {
  console.log('err');
  _this.$alert(_this.vehicle_id+" "+_this.seat_id+" 预定失败","提示", {
        confirmButtonText: "确定",

      })
})


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
    this.vehicle_id=this.$route.query.vehicle_id;
    this.seat_type=this.$route.query.seat_type;

this.$axios.get(
          "http://49.234.18.247:8080/api/QueOptSeat/"+this.vehicle_id+'&'+this.seat_type,{

          }
          )
          .then(function(response){
            //console.log(response);
            _this.tableData=response.data;
            let temp=response.data[0];
           _this.from=temp.starT_LOCATION;
           _this.to=temp.enD_LOCATION;
           _this.start_time=temp.starT_TIME;
           _this.end_time=temp.enD_TIME;
          _this.seat_type=temp.seaT_TYPE;
           _this.price=temp.price;
           _this.company_name=temp.companY_NAME;
           const l=response.data.length;
          console.log(response.data.length);
          console.log(response.data);
          for(let i=0;i<l;i++){
            console.log(i);
            var json = {"value":response.data[i].seaT_ID};
            if(response.data[i].tradE_STATUS=="未售")_this.options.push(json);
          }}

)
.catch(function () {
  console.log('err');

})
  },
  computed:{
     storeTime: function () {
      let now = new Date().toLocaleString();
      return now.substring(5, 9) + "/" + now.substring(0, 4)+" "+now.substring(9, 16);
    },
  }
};
</script>
