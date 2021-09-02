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
                  <el-select
                    v-model="form_Select.room_num"
                    @change="roomNumChange"
                    placeholder="房间数"
                  >
                    <el-option label="1" value="1"></el-option>
                    <el-option label="2" value="2"></el-option>
                  </el-select>
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
            <div class="personInfo">
              <p style="margin-bottom: 5px; margin-top: 5px">住客姓名</p>
              <input type="text" placeholder="每间只需填1人" />
              <p style="margin-bottom: 5px; margin-top: 5px">电话号码</p>
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

              <div
                @click="onPay"
                class="pay_btn"
                style="float: right"
              >
                去支付
              </div>
              <el-dialog :visible.sync="payVisible" width="30%">
                <div style="display: inline-block; vertical-align: middle">
                  
                  <p class="">支付二维码</p>
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
                ><div>
                  {{ form_Select.room_num }}间X{{ form_Select.room_num }}晚
                </div></el-col
              >
              <el-col :span="7"
                ><div>￥{{ price }}</div></el-col
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
        
<script>
import Header from "@/components/Header";
export default {
  components: {
    Header,
  },
  data() {
    return {
      payVisible: false,
      hotelName: "速八酒店",
      starNum: 5,
      location: "上海市嘉定区安亭镇曹安公路4800号",
      typeName: "特惠大床房",
      cNum: 2,
      bed: "1张大床",
      dish: "无",
      price: 198.0,
      discount: 11.0,
      qrcode:
        "https://dimg11.c-ctrip.com/images/0AD5d120008nj322zC5A7_R_300_120.jpg",
      form_Select: {
        time: " ",
        room_num: undefined,
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
    roomNumChange() {},
    onPay() {
      this.payVisible = true;
      console.log(this.form_Select.time);
    },
  },
  computed: {
    storePrice: function () {
      return this.price - this.discount;
    },
  },
  mounted() {
    // 目前跨域？？
    // this.$axios
    //   .post("http://110.40.186.162:7001/api/order", {
    //     order_id: 1,
    //     order_type: "wechat",
    //     order_price: 0.01,
    //     order_name: "酒店",
    //     sign: "977ec4fe167433ae4eddf7c29f2f05c6",
    //     redirect_url: "http://127.0.0.1/324",
    //     extension: 1111,
    //   })
    //   .then((response) => {
    //     this.qrcode = response.data.qr_url;
    //     console.log(response.data.qr_url);
    //   });
    // 留给订房的post请求
    // this.$axios
    //   .post("http://110.40.186.162:7001/api/order", {
    //     order_id: 1,
    //     order_type: "wechat",
    //     order_price: 0.01,
    //     order_name: "酒店",
    //     sign: "977ec4fe167433ae4eddf7c29f2f05c6",
    //     redirect_url: "http://127.0.0.1/324",
    //     extension: 1111,
    //   })
    //   .then((response) => {
    //     this.qrcode = response.data.qr_url;
    //     console.log(response.data.qr_url);
    //   });
  },
};
</script>