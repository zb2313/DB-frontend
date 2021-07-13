<template>
  <div class="hotelOrder">
    <Header activeIndex="1" />
    <div class="main">
      <div class="hotelOrderBg">
        <h1>{{ HOTEL_NAME }}</h1>
      </div>
      <div>
        <div class="infoPay clearfix">
          <div class="infoBox">
            <div class="orderLeft">
              <h2 class="hotelName">{{ HOTEL_NAME }}</h2>

              <h3><i class="el-icon-position"></i> 地址</h3>
              <p>{{ LOCATION }}</p>
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
            <el-row type="flex" justify="space-around">
              <el-col :span="3"><span>时间</span></el-col>
              <el-col :span="16"
                ><span>{{ currentDate }}</span></el-col
              >
            </el-row>
            <el-row type="flex" justify="space-around">
              <el-col :span="3"><span>类型</span></el-col>
              <el-col :span="16"
                ><span>
                  <el-radio-group v-model="radio">
                    <el-radio :label="3">{{ TYPE_NAME1 }}</el-radio>
                    <el-radio :label="6">{{ TYPE_NAME2 }}</el-radio>
                    <el-radio :label="9">{{ TYPE_NAME3 }}</el-radio>
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
                ><div>
                  <el-input-number
                    v-model="num"
                    @change="handleAmount"
                    :min="1"
                    :max="10"
                    label="订房数"
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
                  <el-button type="primary" round>支付</el-button></span
                ></el-col
              >
            </el-row>
          </div>
        </div>
      </div>

      <div class="block1 horse">
        <el-carousel height="150px">
          <el-carousel-item v-for="item in 6" :key="item">
            <h3>{{ item }}</h3>
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
.hotelOrderBg {
  background: no-repeat center/100%
    url(https://tse1-mm.cn.bing.net/th/id/R-C.f79fd9e6223bc5658d329a5d5093114b?rik=EqFkznLcD%2bW1pw&riu=http%3a%2f%2fimg.mp.itc.cn%2fupload%2f20170103%2f6c44acfb4cdc49da98da2556b141bf48_th.jpg&ehk=9kvZqZf1mrI16XNH84PrHtJ1xu9n%2bJR572cGDsYvX7o%3d&risl=&pid=ImgRaw);
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
  height: 250px;
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
  height: 250px;
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
      currentDate: new Date(),
      num: 1,
      priceSum: 100000,
      price: 1000,
      LOCATION: "北京城外",
      HOTEL_NAME: "北京长城",
      STAR: 5,
      radio: 3,
      TYPE_NAME1: "单间",
      TYPE_NAME2: "双人大床房",
      TYPE_NAME3: "总统套房",
    };
  },
  methods: {
    handleAmount(value) {
      console.log(value);
    },
  },
};
</script>