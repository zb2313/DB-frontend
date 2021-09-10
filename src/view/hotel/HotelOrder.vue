<template>
  <el-container direction="vertical">
    <Header activeIndex="1" />

    <el-container>
      <el-aside width="800px">
        <div class="info">
          <el-card class="box-card1" shadow="never">
            <!-- 酒店名+星级 -->
            <div class="clearfix">
              <div class="hotelName">
                <h2>{{ hotelName }}</h2>
              </div>
              <div class="star">
                <img
                  src="../../assets/img/diamond.svg"
                  v-for="i in starNum"
                  :key="i"
                  style="margin-top: 2px"
                />
              </div>
            </div>

            <i class="el-icon-location"></i>{{ location }}
            <div class="roomInfo">
              <h4 style="margin-bottom: 5px; margin-top: 10px">
                {{ typeName }}
              </h4>
              <i class="el-icon-user"></i>{{ cNum }}人入住
              <i class="el-icon-receiving"></i>{{ bed }}
              <i class="el-icon-dish"></i>{{ dish }}早餐
            </div>
            <el-divider></el-divider>
            <div>
              <h3>订房必读</h3>
              <i class="el-icon-info" style="margin-top: 7px"></i>
              该房型允许携带儿童入住。
            </div>
            <el-divider></el-divider>
            <div class="advertise">
              <ul>
                <li>好赞！你挑到了本店最划算的房间</li>
                <li>预订成功后房间将为您整晚保留</li>
              </ul>
            </div>
          </el-card>
          <br />
          <el-card class="box-card1" shadow="never">
            <div class="form">
              <el-form :inline="true" :model="form_Select">
                <el-form-item>
                  <el-date-picker
                    v-model="form_Select.time"
                    @change="dateChange"
                    type="daterange"
                    format="yyyy/MM/dd"
                    range-separator="——"
                    start-placeholder="入住时间"
                    end-placeholder="退房时间"
                    :picker-options="pickerOptions"
                  >
                  </el-date-picker>
                </el-form-item>

                <el-form-item>
                  <span>房间数 &nbsp;&nbsp;</span>
                  <el-input-number
                    v-model="form_Select.room_num"
                    @change="roomNumChange"
                    :min="1"
                    :max="leftOut"
                    label="订票数量"
                  ></el-input-number>
                </el-form-item>
              </el-form>
            </div>
            <div>
              <h3>住客资料</h3>
              <p style="font-size: 12px; color: grey; margin-top: 7px">
                <i class="el-icon-info"></i
                >请按实际入住人数填写，姓名与证件保持一致
              </p>
            </div>
            <br />
            <div class="personInfo" v-for="i in form_Select.room_num" :key="i">
              <p style="margin-bottom: 5px; margin-top: 5px">住客姓名{{ i }}</p>
              <input type="text" placeholder="每间只需填1人" />
              <p style="margin-bottom: 5px; margin-top: 5px">电话号码{{ i }}</p>
              <input type="text" placeholder="+86 中国内陆电话号码" />
            </div>
          </el-card>
          <br />
          <el-card class="box-card1" shadow="never">
            <h2>到达时间</h2>
            <div>
              <p style="font-size: 16px; margin-top: 7px; margin-bottom: 7px">
                到达时间
              </p>

              <el-time-picker
                v-model="form_Select.arrival"
                :picker-options="{
                  selectableRange: '00:00:00 - 23:59:59',
                }"
                placeholder="请选择时间"
                format="HH:mm"
              >
              </el-time-picker>
              <p style="font-size: 16px; margin-top: 7px; margin-bottom: 7px">
                房间整晚保留
              </p>
            </div>
          </el-card>
          <br />
          <el-card class="box-card1" shadow="never">
            <h2>特别要求</h2>
            <p
              style="
                font-size: 12px;
                color: grey;
                margin-top: 7px;
                margin-bottom: 7px;
              "
            >
              该酒店不支持填写特殊要求
            </p>
          </el-card>
          <br />
          <el-card class="box-card1" shadow="never">
            <h2>发票信息</h2>
            <p
              style="
                font-size: 16px;

                margin-top: 7px;
                margin-bottom: 7px;
              "
            >
              如需要发票，可向酒店索取（酒店可开普票、不可开专票）
            </p>
          </el-card>
          <br />
          <el-card class="box-card1" shadow="never">
            <div class="clearfix">
              <div style="float: left">
                <span>在线付</span>
                <span style="color: #003680; font-weight: 700; font-size: 24px">
                  ￥{{ storePrice }}
                </span>
              </div>

              <div @click="onPay" class="pay_btn" style="float: right">
                去支付
              </div>
              <el-dialog :visible.sync="payVisible" width="30%">
                <div style="text-align: center">
                  <h1 style="color: #003580; font-size: 30px">
                    ￥{{ storePrice }}
                  </h1>

                  <h1>{{ payWay }}</h1>
                  <br />
                  <div id="qrcode" style="margin-left: 75px"></div>
                  <br />
                  <div>
                    <button @click="aliPay" class="payBtn" v-if="buttonVisible">
                      支付宝支付
                    </button>
                    <button
                      @click="wechatPay"
                      class="payBtn"
                      v-if="buttonVisible"
                    >
                      微信支付
                    </button>
                    <button @click="close" class="payBtn" v-if="submitVisible">
                      完成支付
                    </button>
                  </div>
                </div>
              </el-dialog>
            </div>
          </el-card>
        </div>
      </el-aside>
      <!-- 显示金额订单部分 -->
      <el-main>
        <div class="order-form">
          <el-card class="box-card2" shadow="hover">
            <el-row type="flex" justify="space-between" class="">
              <el-col :span="7"
                ><div>{{ form_Select.room_num }}间X{{ days }}晚</div></el-col
              >
              <el-col :span="7"
                ><div>￥{{ totalPrice }}</div></el-col
              >
            </el-row>
            <el-row type="flex" justify="space-between">
              <el-col :span="7"><div>十亿豪补</div></el-col>
              <el-col :span="7"
                ><div class="yellow">-￥{{ discount }}</div></el-col
              >
            </el-row>
            <el-row type="flex" justify="space-between">
              <el-col :span="7"><h1>应付金额</h1></el-col>
              <el-col :span="7"
                ><div style="color: #003680; font-weight: 700; font-size: 20px">
                  ￥{{ storePrice }}
                </div></el-col
              >
            </el-row>
            <el-divider></el-divider>
            <h4>不可取消</h4>
            <p style="font-size: 12px; color: grey; margin-top: 7px">
              该订单确认后不可被取消修改，若未入住将收取您首日房费RMB
              98。旅道会根据您的付款方式扣除房费，订单需等酒店或供应商确认后生效，订单确认结果以旅道短信、邮件或app通知为准，如订单不确认将全额退款至您的付款账户。
            </p>
            <el-divider></el-divider>
            <h4>说明</h4>
            <p style="font-size: 12px; color: grey; margin-top: 7px">
              预订服务由旅道旗下上海旅道国际旅行社有限公司及其分公司提供、住宿服务由酒店提供，交易款项由商家委托旅道旗下子公司统一收取。
            </p>
          </el-card>
          <el-card class="box-card2" shadow="never">
            <p
              style="
                font-size: 12px;
                color: cornflowerblue;
                margin-top: 7px;
                text-align: center;
              "
            >
              旅道专业服务 全程保障
            </p>
          </el-card>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.clearfix:before,
.clearfix:after {
  content: "";
  display: table;
}
.clearfix:after {
  clear: both;
}
.clearfix {
  *zoom: 1;
}
.payBtn {
  width: 120px;
  font-size: 16px;
  background-color: #003580;
  color: white;
  line-height: 50px;
  text-align: center;
}
.roomInfo {
  margin-top: 5px;
}
.info {
  margin-left: 100px;
}

.box-card1 {
  width: 680px;
}
.box-card2 {
  width: 400px;
}
.order-form {
  position: fixed;
  margin-right: 100px;
}
.hotelName {
  float: left;
}
.star {
  height: 30px;
  line-height: 30px;
  font-size: 30px;
  float: left;
}
.star ul {
  padding: 0;
}
.star ul li {
  float: left;
  list-style: none;
}

.yellow {
  color: #f7ba2a;
}
.advertise {
  color: #f7ba2a;
  font-weight: 700;
}
.form {
  width: 100%;
  height: 80px;
  padding-top: 20px;
  text-align: center;
}
.el-row {
  margin-bottom: 10px;
}
.personInfo input {
  background: #fff;
  width: 100%;
  height: 40px;
  box-sizing: border-box;
  font-size: 16px;
  font-weight: 700;
  border: solid #ced2d9;
  border-width: 0 0 1px;
  transition: border-color 0.25s;
  color: #0f294d;
}
.el-select {
  width: 100%;
  color: #0f294d;
}
.pay_btn {
  width: 100px;
  font-size: 20px;
  background-color: #f7ba2a;
  color: white;
  line-height: 50px;
  text-align: center;
}
.pay_btn:hover {
  cursor: pointer;
}
</style>

<script src="https://cdn.bootcss.com/blueimp-md5/2.10.0/js/md5.min.js"></script>    
<script>
import QRCode from "qrcodejs2";
import Header from "@/components/Header";
export default {
  components: {
    Header,
  },
  data() {
    return {
      days: 1,
      leftOut: 12,
      payVisible: false,
      submitVisible: false,
      buttonVisible: true,
      payWay: " ",
      hotelId: "",
      roomTypeId: "",
      orderId: "",
      orderStatus: undefined,
      hotelName: "同济嘉定酒店",
      starNum: 5,
      location: "上海市嘉定区安亭镇曹安公路4800号",
      typeName: "14号楼双床房",
      cNum: 2,
      bed: "",
      dish: "",
      price: 996,
      totalPrice: 996,
      discount: 11,
      bookTime: new Date(),
      vacantRooms: [],
      qrcode:
        "https://dimg11.c-ctrip.com/images/0AD5d120008nj322zC5A7_R_300_120.jpg",
      form_Select: {
        time: " ",
        room_num: 1,
        arrival: " ",
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 86400000;
        },
      },
    };
  },
  methods: {
    async sleeping(time) {
      return new Promise((resolve) => setTimeout(resolve, time));
    },
    innerWindow(para) {
      this.$axios
        .get("http://110.40.186.162:8080/api/GetOrderStatus/" + para)
        .then((response) => {
          console.log(response.data[0].pay_status);
          this.orderStatus = response.data[0].pay_status;
        });
    },
    dateChange() {
      this.days = this.GetNumberOfDays(
        this.timestampToTime(this.form_Select.time[0]),
        this.timestampToTime(this.form_Select.time[1])
      );
      this.totalPrice = this.price * this.form_Select.room_num * this.days;
    },
    roomNumChange() {
      this.totalPrice = this.price * this.form_Select.room_num * this.days;
    },
    onPay() {
      this.payVisible = true;
    },
    close() {
      this.payVisible = false;
    },
    // 时间格式化
    timestampToTime(chinaStandard) {
      var date = new Date(chinaStandard);
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
    GetNumberOfDays(date1, date2) {
      //获得天数
      //date1：开始日期，date2结束日期
      var a1 = Date.parse(new Date(date1));
      var a2 = Date.parse(new Date(date2));
      var day = parseInt((a2 - a1) / (1000 * 60 * 60 * 24)); //核心：时间戳相减，然后除以天数
      return day;
    },
    Pay() {
      for (var i = 0; i < this.form_Select.room_num; i++) {
        let _i = i;
        console.log(_i);
        var Now = new Date();
        this.bookTime = this.timestampToTime(Now);
        this.$axios
          .post("http://49.234.18.247:8080/api/BookRoom", {
            hoteL_ID: this.hotelId,
            rooM_ID: this.vacantRooms[_i].rooM_ID,
            useR_ID: "0000000001",
            ordeR_AMOUNT: this.price,
            ordeR_TIME: this.bookTime,
          })
          .then((response) => {
            console.log("加订单成功");
            this.$axios
              .put(
                "http://49.234.18.247:8080/api/Room/" +
                  this.hotelId +
                  "&" +
                  this.vacantRooms[_i].rooM_ID,
                {
                  hoteL_ID: this.hotelId,
                  rooM_ID: this.vacantRooms[_i].rooM_ID,
                  typE_ID: this.vacantRooms[_i].typE_ID,
                  booK_STATUS: "Y",
                  price: this.vacantRooms[_i].price,
                }
              )
              .then((response) => {
                console.log("改房间状态成功");
              });
          });

        if (i === this.form_Select.room_num - 1) {
          this.$message({
            message: "恭喜你，成功预定本店房间！",
            type: "success",
          });
          this.payVisible = false;
        }
      }
    },
    aliPay() {
      this.buttonVisible = false;
      this.submitVisible = true;
      var Now = new Date();
      var specialID = this.timestampToTime(Now);
      this.orderId = specialID;
      var specialConst = "TJcfy";
      var specialPrice = this.storePrice.toString();
      var specialSign = md5(md5(specialID + specialPrice) + specialConst);
      console.log(specialSign);
      this.$axios
        .post("/qrcode", {
          order_id: specialID,
          order_type: "alipay",
          order_price: specialPrice,
          order_name: "酒店",
          sign: specialSign,
          redirect_url: window.location.href,
          extension: "1111",
        })
        .then((response) => {
          console.log(response.data.qr_url);
          this.qrcode = response.data.qr_url;
          this.payWay = "支付宝支付";
          var qrCode = new QRCode(document.getElementById("qrcode"), {
            width: 200, //设置宽高
            height: 200,
          });
          qrCode.makeCode(this.qrcode);

          for (let m = 10; m < 11; m++) {
            let _this = this;
            window.setTimeout(_this.Pay, 3000 * m);
          }
        });
    },
    wechatPay() {
      this.buttonVisible = false;
      this.submitVisible = true;
      var Now = new Date();
      var specialID = this.timestampToTime(Now);
      this.orderId = specialID;
      var specialConst = "TJcfy";
      var specialPrice = this.storePrice.toString();
      var specialSign = md5(md5(specialID + specialPrice) + specialConst);
      console.log(specialSign);
      this.$axios
        .post("/qrcode", {
          order_id: specialID,
          order_type: "wechat",
          order_price: specialPrice,
          order_name: "酒店",
          sign: specialSign,
          redirect_url: window.location.href,
          extension: "1111",
        })
        .then((response) => {
          console.log(response.data.qr_url);
          this.qrcode = response.data.qr_url;
          this.payWay = "微信支付";
          var qrCode = new QRCode(document.getElementById("qrcode"), {
            width: 200, //设置宽高
            height: 200,
          });
          qrCode.makeCode(this.qrcode);
          console.log(this.orderId);

          for (let m = 10; m < 11; m++) {
            let _this = this;
            window.setTimeout(_this.Pay, 3000 * m);
          }
        });
    },
  },
  computed: {
    storePrice: function () {
      return this.totalPrice - this.discount;
    },
  },
  // watch: {
  //   orderStatus: function () {
  //     if (this.orderStatus === "已支付") {
  //       this.$message({
  //         message: "恭喜你，成功预定本店房间！",
  //         type: "success",
  //       });
  //     } else if (this.orderStatus === "已过期") {
  //       this.$message("支付二维码已过期，请重新发起支付");
  //       this.payVisible = false;
  //     }
  //   },
  // },
  mounted() {},
  created() {
    if (this.$route.query.hotelID) {
      this.hotelId = this.$route.query.hotelID;
    }
    if (this.$route.query.roomID) {
      this.roomTypeId = this.$route.query.roomID;
    }

    this.$axios
      .get("http://49.234.18.247:8080/api/Hotel/" + this.hotelId)
      .then((response) => {
        this.hotelName = response.data[0].hoteL_NAME;
        this.location = response.data[0].hlocation;
        this.starNum = response.data[0].star;
      });

    this.$axios
      .get("http://49.234.18.247:8080/api/RoomType/" + this.roomTypeId)
      .then((response) => {
        this.bed = response.data[0].bed;
        this.dish = response.data[0].dish;
        this.typeName = response.data[0].typE_NAME;
        this.price = response.data[0].price;
        this.totalPrice = response.data[0].price;
        this.cNum = response.data[0].customeR_NUM;
      });

    this.$axios
      .get(
        "http://49.234.18.247:8080/api/VacantRoom/" +
          this.hotelId +
          "&" +
          this.roomTypeId
      )
      .then((response) => {
        this.leftOut = response.data.length;
        this.vacantRooms = response.data;
      });
  },
};
</script>