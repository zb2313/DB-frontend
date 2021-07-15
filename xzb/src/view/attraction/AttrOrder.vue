<template>
  <div class="attrOrder">
    <Header activeIndex="2" />
    <div class="main">
      <div class="attrOrderBg">
        <h1>{{ attractionName }}</h1>
      </div>
      <div class="infoPay clearfix">
        <div class="infoBox">
          <div class="orderLeft">
            <h2 class="attrName">{{ attractionName }}</h2>

            <h3><i class="el-icon-position"></i> 地址</h3>
            <p>{{ location }}</p>
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
          <h4 style="margin-left: 30px">预定今日的票</h4>
          <el-row type="flex" justify="space-around">
            <el-col :span="3"><span>时间</span></el-col>
            <el-col :span="16"
              ><span>{{ currentDate }}</span></el-col
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
        <el-carousel height="250px">
          <el-carousel-item v-for="item in items" :key="item.useR_ID">
            <div>
              <h3>评论时间：{{ item.commenT_TIME }}</h3>
              <h3>用户ID：{{ item.useR_ID }}</h3>
              <h3>{{ item.ctext }}</h3>
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
  background: no-repeat center/100%
    url(https://tse1-mm.cn.bing.net/th/id/R-C.f79fd9e6223bc5658d329a5d5093114b?rik=EqFkznLcD%2bW1pw&riu=http%3a%2f%2fimg.mp.itc.cn%2fupload%2f20170103%2f6c44acfb4cdc49da98da2556b141bf48_th.jpg&ehk=9kvZqZf1mrI16XNH84PrHtJ1xu9n%2bJR572cGDsYvX7o%3d&risl=&pid=ImgRaw);
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
  height: 250px;
}

.attrOrder .infoBox {
  width: 400px;
  height: 250px;
  margin: 5px;
  float: left;
}

.attrOrder .payBox {
  width: 400px;
  height: 260px;
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

export default {
  name: "About",
  components: {
    Header,
  },
  data() {
    return {
      currentDate: new Date().toLocaleString(),
      num: 1,
      price: 1000,
      location: "北京城外",
      attractionName: "北京长城",
      closeTime: "17:00",
      openTime: "08:00",
      items: [
        {
          useR_ID: "Foo",
          ctext:
            "一路走来，九寨沟，黄龙都很美，夏日来旅游是避暑胜地。蔡导游服务周到，司机也特别辛苦，在这里感谢你们了，让我们度过了一个不一样的假期，总体上非常棒，很美好的一次旅行，累也快乐～",
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
    onPay() {
      this.$axios.post("http://49.234.18.247:8080/api/Users", {
        useR_ID: "asjklskj",
        useR_NAME: "ajklsjak",
        iD_NUMBER: "ahjksh",
        telE_NUMBER: "ahjksh",
        mailboX_ID: "ajkslj",
        uprofile: "aaaa",
        upassword: "ajhskh",
        gender: "ajsklh",
        ulocation: "jahksjh",
      });
    },
  },
  computed: {
    priceSum: function () {
      return this.num * this.price;
    },
  },
  mounted() {
    this.$axios
      .get("http://49.234.18.247:8080/api/CommentOnAttractions")
      .then((response) => {
        this.items = response.data;
      });
    this.$axios
      .get("http://49.234.18.247:8080/api/Attraction")
      .then((response) => {
        this.location = response.data[0].alocation;
        this.attractionName = response.data[0].attractioN_NAME;
        this.openTime = response.data[0].opeN_TIME;
        this.closeTime = response.data[0].closE_TIME;
        this.price = response.data[0].price;
      });
  },
};
</script>