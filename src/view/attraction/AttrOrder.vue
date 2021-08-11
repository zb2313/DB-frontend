<template>
  <div class="attrOrder">
    <Header activeIndex="2" />
    <div class="main">
      <div
        class="attrOrderBg"
        :style="{
          backgroundImage: 'url(' + baseImg + ')',
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
        }"
      >
        <h1>{{ attractionName }}</h1>
      </div>
      <div class="infoPay clearfix">
        <div class="infoBox">
          <div class="orderLeft">
            <h1 class="attrName">{{ attractionName }}</h1>

            <h3><i class="el-icon-position"></i> 地址</h3>
            <p>{{ location }}</p>
            <mapDrag @drag="dragMap" class="mapbox"></mapDrag>
            <h3><i class="el-icon-date"></i> 时间</h3>
            <el-row type="flex">
              <el-col :span="5"> <span class="bold">开放时间</span></el-col>
              <el-col :span="5"
                ><span>{{ openTime }}</span></el-col
              >
            </el-row>
            <el-row type="flex">
              <el-col :span="5"> <span class="bold">关门时间</span></el-col>
              <el-col :span="5"
                ><span>{{ closeTime }}</span></el-col
              >
            </el-row>
          </div>
        </div>
        <div class="orderBorder payBox">
          <h4 style="margin-left: 30px; padding-top: 20px">预定今日的票</h4>
          <el-row type="flex" justify="space-around">
            <el-col :span="3"><span>时间</span></el-col>
            <el-col :span="16"
              ><span>{{ currentDate | dateFormat }}</span></el-col
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
              ><div>
                <el-input-number
                  v-model="num"
                  @change="handleAmount"
                  :min="1"
                  :max="10"
                  label="订票数"
                ></el-input-number></div
            ></el-col>
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

      <div class="horse">
        <el-carousel height="200px">
          <el-carousel-item v-for="item in items" :key="item.useR_NAME">
            <div>
              <h3>评论时间：{{ item.commenT_TIME }}</h3>
              <h3>用户名：{{ item.useR_NAME }}</h3>
              <div>{{ item.ctext }}</div>
            </div>
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

.attrOrderBg {
  margin-top: 20px;
  margin-bottom: 20px;
  height: 395px;
  color: #fff;
  line-height: 395px;
  text-align: center;
}

.attrName {
  margin-top: 10px;
}

.infoPay {
  width: 100%;
  height: 500px;
}

.attrOrder .infoBox {
  width: 500px;
  height: 250px;
  margin: 5px;
  float: left;
}

.attrOrder .payBox {
  width: 400px;
  margin: 5px;
  float: right;
}
.el-col {
  text-align: center;
}
.el-row {
  margin-bottom: 10px;
  margin-top: 10px;
}
.orderLeft {
  text-align: left;
}
.mapbox {
  width: 500px;
  height: 250px;
  margin-bottom: 20px;
  float: left;
}
.el-carousel__item div {
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

.orderBorder {
  border-radius: 4px;
  border: 1px solid black;
}

li {
  list-style: none;
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
</style>


<script>
import Header from "@/components/Header.vue";
import mapDrag from "@/components/mapDrag";
export default {
  components: {
    Header,
    mapDrag,
  },
  data() {
    return {
      dragData: {
        lng: null,
        lat: null,
        address: null,
        nearestJunction: null,
        nearestRoad: null,
        nearestPOI: null,
      },
      user_ID: "",
      currentDate: new Date(),
      num: 1,
      price: 1000,
      location: "北京城外",
      attractionName: "北京长城",
      closeTime: "17:00",
      openTime: "08:00",
      attractionId: "",
      items: [
        {
          useR_ID: "Foo",
          ctext: "一路走来，九寨沟，黄龙都很美。",
          commenT_TIME: "2021-07-13",
        },
        { useR_ID: "Bar", ctext: "不太好", commenT_TIME: "2021-07-13" },
      ],
    };
  },
  methods: {
    handleAmount(value) {
      let _this = this;
      _this.num = value;
      console.log(value);
    },
    dragMap(data) {
      this.dragData = {
        lng: data.position.lng,
        lat: data.position.lat,
        address: data.address,
        nearestJunction: data.nearestJunction,
        nearestRoad: data.nearestRoad,
        nearestPOI: data.nearestPOI,
      };
    },
    onPay() {
      let _this = this;
      _this.$axios
        .post("http://49.234.18.247:8080/api/PurchaseAttractionTicket", {
          useR_ID: _this.user_ID,
          attractioN_ID: _this.attractionId,
          ordeR_TIME: _this.storeTime,
          price: _this.priceSum,
        })
        .then(function () {
          console.log("suc");
          _this.$alert(_this.attractionName + "预定成功", "提示", {
            confirmButtonText: "确定",
          });
        })
        .catch(function () {
          console.log("err");
          console.log(_this.user_ID);
          console.log(_this.attractionId);
          console.log(_this.storeTime);
          console.log(_this.priceSum);
          _this.$alert(_this.attractionName + "预定失败", "提示", {
            confirmButtonText: "确定",
          });
        });
    },
  },
  computed: {
    priceSum: function () {
      return this.num * this.price;
    },
    storeTime: function () {
      let now = new Date().toLocaleString();
      return (
        now.substring(5, 9) +
        "/" +
        now.substring(0, 4) +
        " " +
        now.substring(9, 20)
      );
    },
  },
  created() {
    this.attractionId = this.$route.query.id;
    this.user_ID = localStorage.getItem("ms_username");
  },
  mounted() {
    this.$axios
      .get(
        "http://49.234.18.247:8080/api/FunGetCommentByAttractionId/" +
          this.attractionId
      )
      .then((response) => {
        this.items = response.data;
      });
    this.$axios
      .get("http://49.234.18.247:8080/api/Attraction/" + this.attractionId)
      .then((response) => {
        this.location = response.data[0].alocation;
        this.attractionName = response.data[0].attractioN_NAME;
        this.openTime = response.data[0].opeN_TIME;
        this.closeTime = response.data[0].closE_TIME;
        this.price = response.data[0].price;
        this.baseImg = response.data[0].picture;
      });
  },
};
</script>
