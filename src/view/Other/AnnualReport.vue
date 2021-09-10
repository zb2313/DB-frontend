<template>
  <div class="AnnualReport">
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        {{ year }}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="2019">2019</el-dropdown-item>
        <el-dropdown-item command="2020">2020</el-dropdown-item>
        <el-dropdown-item command="2021">2021</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <el-carousel indicator-position="outside" :autoplay="false" height="500px">
      <el-carousel-item>
        <div class="css1">
          在这一年里，你一共在旅道消费了{{
            flight_order_num + train_order_num + attraction_order_num
          }}笔订单
        </div>
      </el-carousel-item>

      <el-carousel-item>
        <div class="css2">
          你点亮了{{ unique_cities.size }}个城市
          <div v-for="(item, index) in unique_cities" :key="index">
            {{ item }}
          </div>
          <br />
          乘坐{{ flight_order_num }}次飞机
          <br />
          {{ train_order_num }}次火车
        </div>
      </el-carousel-item>

      <el-carousel-item>
        旅行距离共计{{ journey_length }}公里 相当于跑了{{
          journey_length / 42.195
        }}个全程马拉松
      </el-carousel-item>

      <el-carousel-item>
        今年，你游玩了{{ attractions.length }}个景点
        <div id="all_attractions"></div>
        花费了{{ attraction_price }}元
      </el-carousel-item>

      <el-carousel-item>
        您已经撰写{{ plans.length }}篇攻略，收获了{{ like_num }}个赞
        <div id="all_plans"></div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<style scoped>
.AnnualReport {
  width: 100%;
  height: 100%;
}
.el-carousel__item {
  /* background-color: red; */
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.6);
}
.css1 {
  font-family: Georgia, "Times New Roman", Times, serif;
  font-size: 25px;
  height: 300px;
  width: 100%;
  text-align: center;
  /* background-image: url("https://img.51miz.com/preview/element/00/01/12/89/E-1128995-486D7A32.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat; */
}
.css2 {
  font-family: Georgia, "Times New Roman", Times, serif;
  font-size: 25px;
  height: 300px;
  width: 100%;
  text-align: center;
  /* background-image: url("https://img.tukuppt.com/ad_preview/00/15/58/5c99a64870021.jpg!/fw/780");
  background-size: 100% 100%;
  background-repeat: no-repeat; */
}
.tagcloud {
  width: 500px;
  height: 300px;
  margin: 20px 20px;
}
#all_plans {
  width: 500px;
  height: 500px;
}
#all_plans /deep/ tagcloud {
  width: 500px;
  height: 500px;
}
element.style {
  position: relative;
  width: 0px;
  height: 500px;
}
</style>
<script>
const TagCloud = require("TagCloud");
export default {
  data() {
    return {
      year: "2021",
      origin_hotels: [],
      origin_attractions: [],
      origin_plans: [],
      origin_train: [],
      origin_flight: [],
      hotels: [],
      attractions: [],
      attraction_price: 0,
      plans: [],
      trainticket: [],
      flight: [],
      like_num: 0,
      unique_cities: [],
      journey_length: 0,
      flight_order_num: 0,
      train_order_num: 0,
      attraction_order_num: 0,
      hotel_order_num: 0,
    };
  },
  async mounted() {
    await this.get_data();
    await this.filt("2021");
    await this.compute_data();
  },
  methods: {
    async get_data() {
      this.unique_cities = new Set();
      await this.$axios
        .get(
          "http://49.234.18.247:8080/api/FunGetAllPlanByUserId/" +
            localStorage.getItem("ms_username")
        )
        .then((response) => {
          this.origin_plans = response;
        });
      await this.$axios
        .get(
          "http://49.234.18.247:8080/api/FunGetAttractionInfoByUserId/" +
            localStorage.getItem("ms_username")
        )
        .then((response) => {
          this.origin_attractions = response;
        });
      await this.$axios
        .get(
          "http://49.234.18.247:8080/api/FunGetTrainTicketByUid/" +
            localStorage.getItem("ms_username")
        )
        .then((response) => {
          this.origin_train = response;
        });
      await this.$axios
        .get(
          "http://49.234.18.247:8080/api/FunGetFlightTicketByUid/" +
            localStorage.getItem("ms_username")
        )
        .then((response) => {
          this.origin_flight = response;
        });
    },
    async filt(year) {
      //plan
      console.log(this.origin_plans);
      this.plans = this.origin_plans.data.filter(function (value) {
        return value.plaY_TIME.slice(0, 4) == year;
      });
      console.log(this.plans);
      //attraction
      this.attractions = this.origin_attractions.data.filter(function (value) {
        return value.ordeR_TIME.slice(0, 4) == year;
      });
      //trainticket
      this.trainticket = this.origin_train.data.filter(function (value) {
        return value.traiN_DATE.slice(0, 4) == year;
      });
      //flight
      this.flight = this.origin_flight.data.filter(function (value) {
        return value.flighT_DATE.slice(0, 4) == year;
      });
    },
    async compute_data() {
      this.unique_cities = new Set();
      //plan

      let temp = [];
      this.like_num = 0;
      for (var i = 0; i < this.plans.length; i++) {
        this.like_num += this.plans[i].plaN_STAR;
        temp[i] = this.plans[i].plaN_TITLE;
      }
      let all_plans = document.getElementById("all_plans");

      const options = {};

      var box = document.getElementById("all_plans");
      if (box) if (box) box.innerHTML = "";
      //box.parentNode.removeChild(all_plans);
      TagCloud(all_plans, temp, this.tagCloud);

      //attraction

      let temp2 = [];
      this.attraction_price = 0;
      this.attraction_order_num = this.attractions.length;
      // console.log()
      for (var j = 0; j < this.attractions.length; j++) {
        this.attraction_price += this.attractions[j].price;
        temp2[j] = this.attractions[j].attractioN_NAME;
      }
      var box2 = document.getElementById("all_attraction");
      if (box2) box2.innerHTML = "";
      //box2.parentNode.removeChild(all_attraction);
      let all_attraction = document.getElementById("all_attractions");
      TagCloud(all_attraction, temp2, this.tagCloud);

      //trainticket
      //this.trainticket=this.origin_train.data;
      this.journey_length = 0;
      this.train_order_num = this.trainticket.length;
      var cities = [];
      var s = new Set();
      for (let i = 0; i < this.trainticket.length; i++) {
        this.journey_length += await this.compute_distance(
          this.trainticket[i].starT_LOCATION,
          this.trainticket[i].enD_LOCATION
        );
        cities.push(this.trainticket[i].starT_LOCATION);
        cities.push(this.trainticket[i].enD_LOCATION);
        s.add(this.trainticket[i].starT_LOCATION);
        s.add(this.trainticket[i].enD_LOCATION);
      }

      for (let x of s) this.unique_cities.add(x);
      //flight
      this.flight_order_num = this.flight.length;
      var cities2 = [];
      var s2 = new Set();
      for (let i = 0; i < this.flight.length; i++) {
        this.journey_length += await this.compute_distance(
          this.flight[i].starT_LOCATION,
          this.flight[i].enD_LOCATION
        );
        cities2.push(this.flight[i].starT_LOCATION);
        cities2.push(this.flight[i].enD_LOCATION);
        s2.add(this.flight[i].starT_LOCATION);
        s2.add(this.flight[i].enD_LOCATION);
      }
      for (let x of s2) this.unique_cities.add(x);
    },
    async compute_distance(s, t) {
      var l1, l2;
      await fetch(
        "https://restapi.amap.com/v3/geocode/geo?key=f7171076bbd21882cf1c0a5ae7be2725&address=" +
          s
      )
        .then(function (response) {
          return response.json();
        })
        .then((response) => {
          l1 = response.geocodes[0].location.split(",");
        });
      await fetch(
        "https://restapi.amap.com/v3/geocode/geo?key=f7171076bbd21882cf1c0a5ae7be2725&address=" +
          t
      )
        .then(function (response) {
          return response.json();
        })
        .then((response) => {
          l2 = response.geocodes[0].location.split(",");
        });
      return AMap.GeometryUtil.distance(l1, l2) / 1000;
    },
    async handleCommand(year) {
      console.log(year);
      this.year = year;
      await this.filt(year);
      await this.compute_data();
      this.$forceUpdate();
    },
  },
};
</script>