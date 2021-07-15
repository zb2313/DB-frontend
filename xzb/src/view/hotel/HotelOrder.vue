<template>
  <div class="hotelOrder">
    <Header activeIndex="1" />
    <div class="main">
      <div
        class="hotelOrderBg"
        :style="{
          backgroundImage: 'url(' + baseImg + ')',
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
        }"
      >
        <h1>{{ HOTEL_NAME }}</h1>
      </div>
      <div>
        <div class="infoPay clearfix">
          <div class="infoBox">
            <div class="orderLeft">
              <h2 class="hotelName">{{ HOTEL_NAME }}</h2>

              <h3><i class="el-icon-position"></i> 地址</h3>
              <p>{{ location }}</p>
              <h3><i class="el-icon-star-off"></i> 星级</h3>
              <div class="star">
                <ul>
                  <li
                    class="yellow"
                    v-for="(o, index) in STAR"
                    :key="o"
                    :offset="index > 0 ? 0 : 0"
                  >
                    <i class="el-icon-star-on"></i>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="orderBox payBox">
            <h4 style="margin-left: 40px">预定今日的票</h4>
            <el-row type="flex" justify="space-around">
              <el-col :span="3"><span>时间</span></el-col>
              <el-col :span="16"
                ><span>{{ currentDate | dateFormat }}</span></el-col
              >
            </el-row>
            <el-row type="flex" justify="space-around">
              <el-col :span="3"><span>类型</span></el-col>
              <el-col :span="16"
                ><span>
                  <el-radio-group v-model="radio">
                    <span v-if="Single" class="Radio"
                      ><el-radio :label="1">{{ TYPE_NAME1 }}</el-radio></span
                    >
                    <span v-if="Double" class="Radio"
                      ><el-radio :label="2">{{ TYPE_NAME2 }}</el-radio></span
                    >
                    <span v-if="President" class="Radio"
                      ><el-radio :label="3">{{ TYPE_NAME3 }}</el-radio></span
                    >
                  </el-radio-group></span
                ></el-col
              >
            </el-row>
            <el-row type="flex" justify="space-around">
              <el-col :span="3"><span>单价</span></el-col>
              <el-col :span="16"
                ><span>{{ price }}</span></el-col
              >
            </el-row>
            <el-row type="flex" justify="space-around">
              <el-col :span="3"><span>数量</span></el-col>
              <el-col :span="16"
                ><span>很抱歉，目前一次只能定一间房</span></el-col
              >
            </el-row>
            <el-row type="flex" justify="space-around">
              <el-col :span="3"><span>总计</span></el-col>
              <el-col :span="16"
                ><span>{{ priceSum }}</span></el-col
              >
            </el-row>
            <el-row type="flex" justify="space-around">
              <el-col :span="3"><span></span></el-col>
              <el-col :span="16"
                ><span>
                  <el-button type="primary" round @click="onPay"
                    >支付</el-button
                  ></span
                ></el-col
              >
            </el-row>
          </div>
        </div>
      </div>

      <div class="horse">
        <el-carousel height="250px">
          <el-carousel-item v-for="item in items" :key="item.useR_NAME">
            <h3>评论时间：{{ item.commenT_TIME }}</h3>
            <h3>用户ID：{{ item.useR_NAME }}</h3>
            <h3>{{ item.ctext }}</h3>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>

<style>
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
.Radio {
  margin-left: 5px;
  margin-right: 5px;
}
.hotelOrderBg {
  margin-top: 20px;
  margin-bottom: 20px;
  height: 395px;
  color: #fff;
  line-height: 395px;
  text-align: center;
}

.hotelName {
  margin-top: 10px;
}
.hotelOrder .infoPay {
  width: 100%;
  height: 290px;
  margin: 0 auto;
}
.hotelOrder .infoBox {
  width: 300px;
  height: 250px;
  margin: 5px;
  float: left;
}
.hotelOrder .payBox {
  width: 500px;
  height: 290px;
  margin: 5px;
  float: right;
}
.orderLeft {
  text-align: left;
}
.star {
  width: 400px;
  height: 30px;
  line-height: 30px;
  font-size: 30px;
}
ul {
  padding: 0;
}
ul li {
  float: left;
  list-style: none;
}

.yellow {
  color: #f7ba2a;
}

.el-row {
  margin-bottom: 10px;
  margin-top: 10px;
}

.el-col {
  text-align: center;
}

.horse {
  margin: 30px auto 0 auto;
  text-align: center;
}
.horse h3 {
  height: 20px;
  margin-top: 0%;
  margin-bottom: 0%;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.orderBox {
  border-radius: 4px;
  border: 1px solid black;
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
      user_ID: "0000000003",
      currentDate: new Date(),
      location: "北京城外",
      HOTEL_NAME: "北京长城",
      STAR: 5,
      radio: 1,
      room_ID1: "00001",
      room_ID2: "00001",
      room_ID3: "00001",
      price1: 0,
      price2: 0,
      price3: 0,
      TYPE_NAME1: "单间",
      TYPE_NAME2: "大床房",
      TYPE_NAME3: "总统套房",
      hotelId: "",
      items: [
        { useR_ID: "Foo", ctext: "棒极了", commenT_TIME: "2021-07-13" },
        { useR_ID: "Bar", ctext: "不太好", commenT_TIME: "2021-07-13" },
      ],
    };
  },
  methods: {
    onPay() {
      let _this = this;
      _this.$axios
        .post("http://49.234.18.247:8080/api/PurchaseHotelRoom", {
          hoteL_ID: _this.hotelId,
          rooM_ID: _this.room_ID,
          useR_ID: _this.user_ID,
          ordeR_AMOUNT: _this.price,
          ordeR_TIME: _this.storeTime,
        })
        .then(function () {
          console.log("suc");
          _this.$alert(_this.HOTEL_NAME + "预定成功", "提示", {
            confirmButtonText: "确定",
          });
        })
        .catch(function () {
          console.log("err");
          console.log(_this.hotelId);
          console.log(_this.room_ID);
          console.log(_this.user_ID);
          console.log(_this.price);
          console.log(_this.storeTime);
          _this.$alert(_this.HOTEL_NAME + "预定失败", "提示", {
            confirmButtonText: "确定",
          });
        });
    },
  },
  computed: {
    priceSum: function () {
      if (this.radio === 1) return this.price1;
      else if (this.radio === 2) return this.price2;
      else return this.price3;
    },
    price: function () {
      return this.priceSum;
    },
    storeTime: function () {
      let now = new Date().toLocaleString();
      return (
        now.substring(5, 9) +
        "/" +
        now.substring(0, 4) +
        " " +
        now.substring(9, 16)
      );
    },



    room_ID: function () {
      if (this.radio === 1) return this.room_ID1;
      else if (this.radio === 2) return this.room_ID2;
      else return this.room_ID3;
    },
  },
  watch:
  {
    President: function () {
      for (let i = 0; i < this.grocery.length; i++) {
        if (this.grocery[i].typE_NAME === this.TYPE_NAME3) {
          this.price3 = this.grocery[i].price;
          this.room_ID3 = this.grocery[i].rooM_ID;
          return true;
        }
      }
      return false;
    },
    Double: function () {
      for (let j = 0; j < this.grocery.length; j++) {
        if (this.grocery[j].typE_NAME === "大床房") {
          this.price2 = this.grocery[j].price;
          this.room_ID2 = this.grocery[j].rooM_ID;
          return true;
        }
      }
      return false;
    },
    Single: function () {
      for (let k = 0; k < this.grocery.length; k++) {
        if (this.grocery[k].typE_NAME === this.TYPE_NAME1) {
          this.price1 = this.grocery[k].price;
          this.room_ID1 = this.grocery[k].rooM_ID;
          return true;
        }
      }
      return false;
    },
  },
  created() {
    this.hotelId = this.$route.query.id;
    this.user_ID=localStorage.getItem("ms_username")
  },
  mounted() {
    this.$axios
      .get(
        "http://49.234.18.247:8080/api/FunGetVacantRoomTypeByHotelId/" +
          this.hotelId
      )
      .then((response) => {
        this.grocery = response.data;
      });
    this.$axios
      .get(
        "http://49.234.18.247:8080/api/FunGetCommentByHotelId/" + this.hotelId
      )
      .then((response) => {
        this.items = response.data;
      });
    this.$axios
      .get("http://49.234.18.247:8080/api/Hotel/" + this.hotelId)
      .then((response) => {
        this.location = response.data[0].hlocation;
        this.HOTEL_NAME = response.data[0].hoteL_NAME;
        this.STAR = response.data[0].star;
        this.baseImg = response.data[0].picture;
      });
  },
};
</script>
