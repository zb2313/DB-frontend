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
          <div class="css11">
            <div>在这一年里，</div>
            <div>
              你一共在旅道支付了<i style="font-size: 70px">{{
                flight_order_num +
                train_order_num +
                attraction_order_num +
                hotel_order_num
              }}</i
              >笔订单
            </div>
          </div>
        </div>
      </el-carousel-item>

      <el-carousel-item>
        <div class="css2">
          <div style="margin: 0 auto">
            <p class="css21">
              你点亮了<i style="font-size: 90px">{{ unique_cities.size }}</i
              >个城市
            </p>

            <span
              v-for="(item, index) in unique_cities"
              :key="index"
              style="
                font-weight: 700;
                font-size: 20px;
                margin: 0 6px;
                color: gold;
              "
            >
              {{ item }}
            </span>

            <p class="css21">
              乘坐<i style="font-size: 70px">{{ flight_order_num }}</i
              >次飞机、<i style="font-size: 70px">{{ train_order_num }}</i
              >次火车
            </p>
          </div>
        </div>
      </el-carousel-item>

      <el-carousel-item>
        <div class="css3">
          <p style="top: 68%">
            旅行距离共计<i style="font-size: 60px">{{
              journey_length.toFixed(2)
            }}</i
            >公里
          </p>
          <p style="top: 82%">
            相当于跑了<i style="font-size: 60px">{{
              (journey_length / 42.195).toFixed(2)
            }}</i
            >个全程马拉松
          </p>
        </div>
      </el-carousel-item>

      <el-carousel-item>
        <div class="css4">
          <div class="css41">
            <p>
              今年，你游玩了<i style="font-size: 60px">{{
                attractions.length
              }}</i
              >个景点
            </p>

            <div
              v-for="item in attractions"
              :key="item.index"
              style="font-size: 16px; color: #f5f7fa"
            >
              {{ item.attractioN_NAME }}
            </div>
            <p style="margin-top: -10px">
              花费了<i style="font-size: 60px">{{ attraction_price }}</i
              >元
            </p>
          </div>
        </div>
      </el-carousel-item>

      <el-carousel-item>
        <div class="css5">
          <div class="css51">
            <div class="css52">
              您已经撰写<i style="font-size: 60px">{{ plans.length }}</i
              >篇攻略
            </div>
            <div class="css52">
              共收获了<i style="font-size: 60px">{{ like_num }}</i
              >个赞
            </div>
            <div style="margin-top: 40%"></div>
            <div
              v-for="item in plans"
              :key="item"
              style="color: white; font-size: 16px"
            >
              {{ item.plaN_TITLE }}
            </div>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<style scoped>
.AnnualReport {
  width: 100%;
  height: 100%;
}
.css1 {
  position: relative;
  font-family: Georgia, "Times New Roman", Times, serif;
  font-size: 30px;
  color: #f4ff50;
  font-weight: 900;
  height: 100%;
  width: 100%;
  background-image: url("https://gtc.knt.co.jp/img/toppage/biz/http7004-kntgtcbizcompany_trip.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.css11 {
  position: absolute;
  top: 50px;
  left: 30px;
}
.css2 {
  display: flex;
  align-items: center;
  font-family: Georgia, "Times New Roman", Times, serif;
  color: #f56c6c;
  text-align: center;
  width: 100%;
  height: 100%;
  background-image: url("https://tse1-mm.cn.bing.net/th/id/R-C.339733fa2b18f32989c6846936b5c718?rik=kDCEaro6YAG90Q&riu=http%3a%2f%2fimg95.699pic.com%2fphoto%2f50060%2f6195.jpg_wh860.jpg&ehk=DYbGkjCjKjKM62Yg%2buTF4sO52IR45Ve%2fuMCR5bltvq4%3d&risl=&pid=ImgRaw&r=0");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.css21 {
  font-weight: 700;
  font-size: 30px;
}
.css3 {
  position: relative;
  color: white;
  width: 100%;
  height: 100%;
  background-image: url("https://tse1-mm.cn.bing.net/th/id/R-C.874ed740eeb227cf6372d5fe2321ea37?rik=EyYHi0quXhXhTA&riu=http%3a%2f%2fimage.qianye88.com%2fpic%2fba1481efcede12d66fe42610a40e64dc&ehk=tqFw1sdUmA6IVucop3QbB8S1%2bpSfdJ5nig4g2zC62Sk%3d&risl=&pid=ImgRaw&r=0");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.css3 p {
  font-family: Georgia, "Times New Roman", Times, serif;
  font-size: 25px;
  position: absolute;
  left: 30px;
}
.css4 {
  display: flex;
  align-items: center;
  font-family: Georgia, "Times New Roman", Times, serif;
  width: 100%;
  height: 100%;
  color: #fca234;
  font-size: 30px;
  font-weight: 700;
  background-image: url("https://img.zcool.cn/community/01166d59efef08a801202b0c13e9d9.jpg@1280w_1l_2o_100sh.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.css41 {
  margin: 0 auto;
}
.css5 {
  position: relative;
  font-family: Georgia, "Times New Roman", Times, serif;
  width: 100%;
  height: 100%;
  font-weight: 700;
  background-image: url("https://uploadfile.bizhizu.cn/up/f3/c5/57/f3c5570fe4c8322d35ae5cc19da496a6.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.css51 {
  position: absolute;
  top: 20px;
  margin-left: 30px;
}
.css52 {
  font-size: 30px;
  color: #135ead;
}
</style>
<script>
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
      await this.$axios
        .get(
          "http://49.234.18.247:8080/api/FunGetHotelInfoByUserId/" +
            localStorage.getItem("ms_username")
        )
        .then((response) => {
          this.origin_hotels = response;
        });
    },
    async filt(year) {
      //plan
      this.plans = this.origin_plans.data.filter(function (value) {
        return value.plaY_TIME.slice(0, 4) == year;
      });
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
      //hotel
      this.hotels = this.origin_hotels.data.filter(function (value) {
        return value.ordeR_TIME.slice(0, 4) == year;
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

      //attraction

      let temp2 = [];
      this.attraction_price = 0;
      this.attraction_order_num = this.attractions.length;
      // console.log()
      for (var j = 0; j < this.attractions.length; j++) {
        this.attraction_price += this.attractions[j].price;
        temp2[j] = this.attractions[j].attractioN_NAME;
      }

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
      //hotel
      this.hotel_order_num = this.hotels.length;
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