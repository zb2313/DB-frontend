<template>
  <el-container direction="vertical">
    <Header activeIndex="1" />

    <div class="Form"></div>
    <Search />
    <div class="ad main">
      <el-carousel :interval="4000" height="250px">
        <el-carousel-item v-for="fit in 4" :key="fit.index">
          <el-image style="width: 1100px; height: 250px" :src="url" fit="cover">
          </el-image>
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="main recommend">
      <div class="text">酒店推荐</div>
      <div class="buttons">
        <div
          class="button"
          :class="{ buttonBgc: background == index }"
          v-for="(item, index) in cities"
          :key="index"
          @click="chooseCity1(item, index)"
        >
          {{ item }}
        </div>
        <div
          class="button"
          :class="{ buttonBgc: background == 6 }"
          @click="chooseCity1(sixth_city, 6)"
        >
          {{ sixth_city }}
        </div>

        <el-popover placement="bottom-end" width="300" trigger="click"
          ><div
            class="cities"
            v-for="(item, index) in morecity"
            :key="index"
            @click="chooseCity(item, index)"
          >
            {{ item }}
          </div>
          <div class="more el-icon-arrow-down" slot="reference"></div>
        </el-popover>
      </div>
      <div class="hotels">
        <div
          class="box"
          v-for="(item, index) in hotels.slice(0, 8)"
          :key="index"
          @click="toHotelDetail(item.hoteid)"
        >
          <div
            class="infoImg"
            :style="{
              backgroundImage: 'url(' + item.picture + ')',
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat',
            }"
          ></div>
          <div class="infoDetail">
            <div class="Name" style="font-size: 14px; font-weight: 700">
              {{ item.hotelname.split("(")[0] }}
            </div>
            <img
              src="../../assets/img/diamond.svg"
              v-for="i in item.star"
              :key="i"
              style="margin-top: 2px"
            />

            <div class="Details">
              <div class="leftstar">
                <div class="star">
                  {{ item.star }}.0<i
                    style="font-style: normal; font-size: 11px; color: #4880cf"
                    >/5</i
                  >
                </div>
                <span class="dianping">{{ item.commentnum }}点评</span>
              </div>
              <div class="rightprice">
                ￥{{ item.lowestprice
                }}<i style="font-size: 11px; font-style: normal; color: gray"
                  >&nbsp;起</i
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="main server-upgrade">
      <div class="text">酒店业务升级</div>
      <ul>
        <li>
          <span class="icon-logo service1"></span>
          <p class="desc">确认后变更，最多赔付首晚房费的3倍</p>
        </li>
        <li>
          <span class="icon-logo service2"></span>
          <p class="desc">到店无房，最多赔付首晚房费的3倍</p>
        </li>
        <li>
          <span class="icon-logo service3"></span>
          <p class="desc">退改服务保障与承诺</p>
        </li>
      </ul>
      <p class="link">
        <a href="#">更多<i class="el-icon-arrow-right"></i> </a>
      </p>
    </div>
    <Footer1 />
  </el-container>
</template>

<style scoped>
/* 搜索框css */
.Form {
  width: 100%;
  height: 130px;
  margin-bottom: -105px;
  text-align: center;
  background-color: #f2f2f2;
}

/* 广告css */
.ad {
  margin-top: 40px;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

/* 推荐css */
.recommend {
  margin-top: 50px;
  text-align: center;
}
.text {
  font-size: 28px;
  margin-bottom: 17px;
  font-weight: 700;
}
.box {
  width: 265px;
  height: 190px;
  float: left;
  margin: 5px 5px;
  text-align: left;
}
.box:hover {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

.buttons {
  width: 500px;
  height: 40px;
  margin: 0 auto;
}
.buttonBgc {
  background-color: rgba(68, 138, 255, 0.1);
  border-color: rgba(68, 138, 255, 0.1) !important;
  color: #287dfa;
}
.button,
.more {
  float: left;
  margin-left: 5px;
  margin-right: 5px;
  width: 63px;
  height: 30px;
  border: 1px solid lightgray;
  border-radius: 4px;
  line-height: 30px;
  font-size: 14px;
}

.more {
  position: relative;
  width: 30px;
}
.button:hover,
.more:hover {
  border-color: #409eff;
  cursor: pointer;
}
.more:hover .dropdown-content {
  display: block;
}
.dropdown-content {
  position: absolute;
  display: none;
  top: 35px;
  left: -270px;
  min-width: 300px;
  min-height: 100px;
  border-radius: 2px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.cities {
  float: left;
  width: 50px;
  height: 30px;
  text-align: center;
  line-height: 30px;
}
.cities:hover {
  cursor: pointer;
  background-color: #ffd04b;
}

.infoImg {
  height: 60%;
  width: 100%;
}
.infoDetail {
  width: 100%;
  height: 80%;
  margin-left: 2px;
  margin-top: 5px;
}
.infoDetail .star {
  display: inline-block;
  width: 40px;
  height: 20px;
  color: white;
  text-align: center;
  background-color: #003680;
  border-radius: 5px 5px 0px 5px;
}

.dianping {
  height: 20px;
  line-height: 20px;
  font-size: 13px;
  margin-left: 5px;
  display: inline-block;
  color: rgb(189, 189, 189);
}

.leftstar {
  float: left;
  width: 50%;
}
.rightprice {
  float: right;
  width: 40%;
  margin-right: 5px;
  text-align: right;
  font-size: 22px;
  font-weight: 700;
  color: red;
  margin-top: -5px;
}

/* 服务升级css */
.server-upgrade {
  text-align: center;
  margin-top: 50px;
  margin-bottom: 35px;
}
.server-upgrade ul > li {
  display: inline-block;
  width: 300px;
  text-align: center;
  margin-left: 10px;
  margin-right: 10px;
  color: #455873;
  font-size: 14px;
}
.icon-logo {
  display: block;
  height: 48px;
  width: 48px;
  margin: 0 auto;
}
.service1 {
  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAAAXNSR0IArs4c6QAACB9JREFUeAHtm2tsFFUUgM/d2S4tW9rdpbDLtrUVaOkDaGkLAjHUBCRGQF6KMUJKQU2QX8SIxAA2UYP+MP4VjUBR/vBQUOSPiSb+4tGWZ1XaIsrLYoXW0vJoO72e02G6053ZnYGd3Z02e5LduXOf535z7rmP2QVISIJAgkCCQIJAgsBwJcCMKF5c0/eiKPZvB2BFAFwwUiZaeSqL7Jd6BDZn9yrWFq02lPXalDda4YKa3oUI5wCmTYs3HNIvI5VPyvfAxY21fKyWvmbH6QJiImwwu9FI6/OmgTvTD00bjnJ3pHXpldcFxBmfqFdJPNJ96eDJcvCWaEPSBQQcDPmpeECa4GKebAdvfmM/T49W+/qAotWySfX6XGxsjou3bD7Cx5hU5ZBqhj0g6g1aUkZaMr8UDUgjAhBB8rvZuLQUaF6zlzvp3iwZMYAIiN8F3nwvbzET0ogCRJAy3cyXN563bNrPU+g+UhlxgAhIlof53GnmQLJHSjjW5Rsu90PLzX4jzfo77rJPMOObRjKHyjPsAF1u46H6oopnNhbxGm5EDjEVqQgiEoB04CUAJQDpENBJtrQFPZkBkJKk04MoJ1sWUL4XYN96O+xcI8QVkiUBEZw9a+3gdjKYmWuLKyTLAZpCcKolOPLoIUifoyWNdsgxsbtaChDB2U1wRqvXdxVxgmQZQAW+0HBkeynPscGnq2L7UiVqgF4oYbBjhQA2tTHI/R28DsAhn6NhOYOZMND9gMPOXwztw5TFIgpHZS82AGc5wkE6AgLa8o0I/SG2UIVoObsQjssAnNe/EuH0lRAVRYQhdGHTLWgpWc5DONTskhIbfLxS25KsDof0N9WClpUy+HCZZDlUuSyLp0vP4Z1DAUsqmgDwZZUxy3ltrwhnrsbWcmTdTQMUCo7cEEGiw4fNB0Ugn0PDKj0lvIMinxNPOKS7aYBohiGfE04WTbNB6iiA0mymC6frPgfyOfGyHLkfpgHa/p04MGOtKAvv1irzw6eTYgSHLOfstfgMKxkOXfW1VeYOE+bYl61HRDjUENk0bCU41F3TLIgqG4B0WKQgrNSxpIFMQV8EZz1azjkLWI6smmkWJFdI160I6WD9o1nSHQvCob6YakFUoSzbcLiRB3mpXP8ZDMCpFeH89fj7HFl/+aqvvZzzMa7bEdIBHUuyMhzqclQBUQMEaX+d9nAjOOssajmkO0nUhphUvfT9Hi4BSFZVBJ5H5z3JIV+IcFil4BnRJC+DyV4beFIZOHGd5cANf/cDAGx1mWcR7wABjqwtgxOMsUcew+FXdtipgm095/CCv0+MXGqW2ODlmQIQHLKcxhuPrO+gEnR4NhfXVCV4TiQYeD+IHW20CbClqpwdHazEQCCmgEiftxfa4NgFHhGcPB+DRaUCOJJ01ddCcNThhldX57FOrcTgON0WzLSg4MYf5372ZBvMK6Shqqt66OoZ/Mbs8Hz1DPZn6ExSSsAp6OW0QHpJDkM4dKKoDWcc/nRqyjiAIjy6zUyTfJGm2hwKeR8c+7qZY67wEhMnHV4FY6mZHgYLpmkft2bhTzhnPQGQnjy0rl700uf/BjiLH5UgpJ522IfxS1RpiohhY0Hzi7Wd8VQ8Onk2X4Jzq1sCcvo6wOXbUi9v3VX0Vh1cXFvPF6ujAzHDwoIK/Ax8LvWzpCFVkQXQh8usk1cALrYFOkYhOu4VdSbKfhE+4pz/EGoJoG51aBuWuJuerVaTvNDcXPRGGPipWQ2HFA+G84SLYocK8ive0wBPDY0N3KlbDqRZIuTAd/PZGWqnnOsB8IwG+OMWwHUDE/Zs9FHz8yQnruqYCEtVcQ8jLA/I78I3IxonleSYSX4PGlZS7NDvEj9AIc5sJHNyAHKC/+GBk6OUqv62PKDUoJlJ7kLaw/j28E54YNovy5RLSUOyciKAb0wgDo8dEKG2WN5JpyYHhtcY3GfNypY66cYf+dK7tnnYWZL6awDt96Sw8rsL92Q/NgHk4U9paFhSvtsINeg9Hc6F2mJ5C+rpCyh+Bzt77T/0Sehsk3BJRCOPwjfvaMOhkuSfqIw8Sq92SPf/dAXqxRAuELTF8oC6cGOrFJrKG9AKZGlsxbUPfsIJzXQZuCSghWPHfY2cDG5oxA5EWX6ItXcPBURa08qYfnnmQO1PXg3VtUD8VHTQtPtvQrh0bq4hOAi1xfKA2nD4dN7lkBb07v74FckXaXcrEOtFZ1yKLvgBDtU6heUFciA0Bt8r75Vhyw8xUvZiKy6VNURpDRNw2zk+NZBpFD76GTh7PTcFTwXRX9WhpREklTDoFZwQ8oxI14Jw/PYqFVE1EIOIU5f6YQa+ubXT3kFDyL8swEWgHR83bTvI1yRjz8j30Gx1Aq2t6V+NghiFWT6rKmS43NQWXQtCOOe0i8Yutgsdax3+RyOU0Cb1+F8AbTgz0cMk/0TW0oxQDl8A+PWmdkmE0+kU4H3tVCkW84SX4ho+Wezvq8eWdc9OwtcUWaqAj/KVuQL+cU73mRrapKJ10b9xV1RXsMPhNNMFRIULP+A50NO3CYNF+IRwRMdH0p3gWP20vdzpADP+C/buullsh15PDAHSqySW6bsbuQ+Xdd/iSJr9WO2iT2U22Fhdzr4wUl7fXo3UEsM81cWs1euGZ2w22IFPV2NzEVaZOkGASqNwqKZhZ0HK7tee4ZliL7yFb7uWo0XlKtPkMPqaHvQ2PzMBdlWVwYFQB2Ny/uDrsAak7MzeU3wqHpDl46LPj1CcCKwVwd1IcsEJo694lPUlwgkCCQIJAlYg8D9IaC0CKEej8AAAAABJRU5ErkJggg==")
    no-repeat 50%;
  background-size: 48px 48px;
}
.service2 {
  background: url("data:image/png;base64,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")
    no-repeat 50%;
  background-size: 48px 48px;
}
.service3 {
  background: url("data:image/png;base64,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")
    no-repeat 50%;
  background-size: 48px 48px;
}
.link {
  text-align: right;
  margin-top: 16px;
}
.link a {
  color: #287dfa;
  cursor: pointer;
}
</style>

<script>
import Header from "@/components/Header.vue";
import Footer1 from "@/components/Footer1.vue";
import Search from "@/components/Search.vue";
export default {
  components: {
    Header,
    Footer1,
    Search,
  },
  data() {
    return {
      currentCity: "",
      url: require("@/assets/img/ad.png"),
      cities: ["北京", "上海", "南京", "广州", "杭州"],
      sixth_city: "苏州",
      morecity: [
        "武汉",
        "无锡",
        "重庆",
        "长沙",
        "天津",
        "郑州",
        "济南",
        "宁波",
        "西安",
        "青岛",
        "合肥",
        "福州",
        "佛山",
        "大连",
        "沈阳",
        "厦门",
        "昆明",
        "南昌",
        "珠海",
      ],
      hotels: [],
      background: 0,
    };
  },
  methods: {
    // 浏览器获得当前城市名
    getLocation() {
      let a = this;
      navigator.geolocation.getCurrentPosition(function (position) {
        var Ing, Lat;
        Ing = position.coords.longitude.toFixed(6);
        Lat = position.coords.latitude.toFixed(6);

        fetch(
          "https://restapi.amap.com/v3/geocode/regeo?key=b46e001d88ea385075cc97e1c892ce37&location=" +
            Ing +
            "," +
            Lat
        )
          .then(function (response) {
            return response.json();
          })
          .then(function (myJson) {
            a.currentCity = myJson.regeocode.addressComponent.province;
          });
      });
    },
    // 根据城市名获取酒店信息
    getHotelbyCity(city) {
      this.$axios
        .get(
          "http://49.234.18.247:8080/api/FunGetCommentNumByHotelLocation/" +
            city
        )
        .then((response) => {
          this.hotels = response.data;
        });
    },
    chooseCity1(cityName, index) {
      this.getHotelbyCity(cityName);
      this.background = index;
    },
    chooseCity(cityName, index) {
      this.$set(this.morecity, index, this.sixth_city);
      this.sixth_city = cityName;
      this.chooseCity1(cityName, 6);
    },
    // 跳转到酒店详情页面
    toHotelDetail(HotelID) {
      this.$router.push({
        path: "/hotel/detail",
        query: { id: HotelID },
      });
    },
  },
  created() {
    this.getHotelbyCity("北京");
    this.getLocation();
  },
  watch: {
    // 根据获得的当前地址推荐酒店，若被地址获取拒绝则推荐北京的
    currentCity(newValue, oldValue) {
      this.getHotelbyCity(newValue);
      newValue = newValue.slice(0, 2);
      for (var i = 0; i < 5; i++) {
        if (this.cities[i] == newValue) {
          this.background = i;
          break;
        }
      }
      if (this.background == 0 && this.sixth_city == newValue) {
        this.background = 6;
      }
      if (this.background == 0) {
        for (var j = 0; j < this.morecity.length; j++) {
          if (this.morecity[j] == newValue) {
            this.$set(this.morecity, j, this.sixth_city);
            this.sixth_city = newValue;
            break;
          }
        }
      }
      if (this.background == 0 && newValue != "北京") {
        this.$set(this.morecity, this.morecity.length, this.sixth_city);
        this.sixth_city = newValue;
        this.background = 6;
      }
    },
  },
};
</script>
