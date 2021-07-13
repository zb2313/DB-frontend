<template>
  <div class=" attrOrder">
    <Header activeIndex="2" />
    <div class="main">
      <div class="attrOrderBg">
        <h1>{{ ATTRACTION_NAME }}</h1>
      </div>
      <div class="infoPay clearfix">
        <div class="infoBox">
          <div class="orderLeft">
            <h2 class=" attrName">{{ ATTRACTION_NAME }}</h2>

            <h3><i class="el-icon-position"></i> 地址</h3>
            <p>{{ LOCATION }}</p>
            <h3><i class="el-icon-date"></i> 时间</h3>
            <el-row type="flex">
              <el-col :span="5"> <span class="bold">开放时间</span></el-col>
              <el-col :span="5"
                ><span>{{ OPEN_TIME }}</span></el-col
              >
            </el-row>
            <el-row type="flex">
              <el-col :span="5"> <span class="bold">关门时间</span></el-col>
              <el-col :span="5"
                ><span>{{ CLOSE_TIME }}</span></el-col
              >
            </el-row>
          </div>
        </div>
        <div class="orderBorder payBox">
          <el-row type="flex" justify="space-around">
            <el-col :span="3"><span>时间</span></el-col>
            <el-col :span="16"
              ><span>{{ currentDate }}</span></el-col
            >
          </el-row>
          <el-row type="flex" justify="space-around">
            <el-col :span="3"><span>单价</span></el-col>
            <el-col :span="16"
              ><span>{{ PRICE }}</span></el-col
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
                  label="描述文字"
                ></el-input-number></div
            ></el-col>
          </el-row>
          <el-row type="flex" justify="space-around">
            <el-col :span="3"><span>总计</span></el-col>
            <el-col :span="16"
              ><span>{{ PRICESum }}</span></el-col
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

      <div class="horse">
        <el-carousel height="150px">
          <el-carousel-item v-for="item in items" :key="item.message">
            <h3>{{ item.message }} {{ item.add }}</h3>
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
  height: 220px;
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
      currentDate: new Date(),
      num: 1,
      PRICESum: 100000,
      PRICE: 1000,
      LOCATION: "北京城外",
      ATTRACTION_NAME: "北京长城",
      CLOSE_TIME: "17:00",
      OPEN_TIME: "08:00",
      items: [
        { message: "Foo", add: "棒极了" },
        { message: "Bar", add: "不太好" },
      ],
    };
  },
  methods: {
    handleAmount(value) {
      console.log(value);
    },
  },
};
</script>