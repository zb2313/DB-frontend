<template>
  <el-container direction="vertical">
    <Header activeIndex="0" />
    <!-- 搜索区域 -->
    <div class="search">
      <div class="block">
        <h1 style="font-size: 30px">搜索预订美好体验</h1>
        <p style="margin-top: 4px">发现目的地更多精彩活动，尽享欢乐旅程</p>
        <!-- 搜索框 -->
        <el-row type="flex">
          <el-col :span="16"
            ><div>
              <el-input
                v-model="input"
                placeholder="搜索旅行地/酒店/景点……"
              ></el-input></div
          ></el-col>
          <el-col :span="2"
            ><div>
              <el-button type="primary" icon="el-icon-search" @click="onSearch"
                >搜索</el-button
              >
            </div></el-col
          >
        </el-row>
      </div>
    </div>

    <!-- 内容展示区域 -->
    <el-main>
      <div class="attraction main">
        <h2 class="title">
          <span @click="onClick(0, 0)" :class="{ titleClick: show[0] == 0 }"
            >门票<i v-show="!show[0]"></i
          ></span>
          <span @click="onClick(0, 1)" :class="{ titleClick: show[0] == 1 }"
            >周边游<i v-show="show[0]"></i
          ></span>

          <span class="dropdown" style="margin-left: 80%">
            <el-popover placement="bottom-end" width="50" trigger="click"
              ><div class="drop-content">
                <span
                  v-for="item in attrDropdown"
                  :key="item.index"
                  @click="changeCity1(item)"
                  >{{ item }}</span
                >
              </div>
              <span
                slot="reference"
                style="color: #0071c2; font-size: 14px"
                class="drop-btn"
                >玩在{{ attrStart }}
                <div class="el-icon-caret-bottom"></div
              ></span>
            </el-popover>
          </span>
        </h2>

        <div class="attrBox Box1">
          <div class="rightBox">
            <dl class="keyword-short">
              <dt>热门主题游</dt>
              <dd>
                <span title="地标">
                  <router-link to="/attraction/city?search=全部&label=地标">
                    地标
                  </router-link>
                </span>
                <el-divider direction="vertical"></el-divider>
                <span title="亲子">
                  <router-link to="/attraction/city?search=全部&label=亲子">
                    亲子
                  </router-link>
                </span>
                <el-divider direction="vertical"></el-divider>
                <span title="建筑">
                  <router-link to="/attraction/city?search=全部&label=建筑">
                    建筑
                  </router-link>
                </span>
              </dd>

              <dd style="margin-top: 10px">
                <span title="休闲">
                  <router-link to="/attraction/city?search=全部&label=休闲">
                    休闲
                  </router-link>
                </span>
                <el-divider direction="vertical"></el-divider>
                <span title="历史">
                  <router-link to="/attraction/city?search=全部&label=历史">
                    历史
                  </router-link>
                </span>
              </dd>
            </dl>

            <dl class="keyword-short" style="margin-top: 30px">
              <dt>热门目的地</dt>
              <dd>
                <span title="北京">
                  <router-link to="/attraction/city?search=北京">
                    北京
                  </router-link>
                </span>
                <el-divider direction="vertical"></el-divider>
                <span title="上海">
                  <router-link to="/attraction/city?search=上海">
                    上海
                  </router-link>
                </span>
                <el-divider direction="vertical"></el-divider>
                <span title="南京">
                  <router-link to="/attraction/city?search=南京">
                    南京
                  </router-link>
                </span>
              </dd>

              <dd style="margin-top: 10px">
                <span title="成都">
                  <router-link to="/attraction/city?search=成都">
                    成都
                  </router-link>
                </span>
                <el-divider direction="vertical"></el-divider>
                <span title="乌鲁木齐">
                  <router-link to="/attraction/city?search=乌鲁木齐">
                    乌鲁木齐
                  </router-link>
                </span>
                <el-divider direction="vertical"></el-divider>
                <span title="拉萨">
                  <router-link to="/attraction/city?search=拉萨">
                    拉萨
                  </router-link>
                </span>
              </dd>
            </dl>
          </div>
          <div class="leftBox">
            <div
              class="attriInfo"
              v-for="(item, index) in attractions.slice(0, 6)"
              :key="index"
              @click="toArrDetail(item.attractionid)"
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
                <div class="Name" style="font-size: 14px">
                  {{ item.attractionname }}
                </div>
                <div
                  v-show="!item.star"
                  style="
                    height: 20px;
                    width: 50px;
                    font-size: 12px;
                    margin-top: 2px;
                    color: lightgray;
                  "
                >
                  暂无评分
                </div>
                <img
                  src="../assets/img/star.svg"
                  v-for="i in item.star"
                  :key="i"
                  style="margin-top: 2px"
                />
                <div class="Details">
                  <span class="address">{{ fun_district(item.location) }}</span>
                  <span class="price price1">{{ item.price }}元</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="hotel main">
        <h2 class="title">
          <span @click="onClick(1, 0)" :class="{ titleClick: show[1] == 0 }"
            >国内酒店<i v-show="!show[1]"></i
          ></span>
          <span @click="onClick(1, 1)" :class="{ titleClick: show[1] == 1 }"
            >国外酒店<i v-show="show[1]"></i
          ></span>

          <span class="dropdown" style="margin-left: 76%">
            <el-popover placement="bottom-end" width="50" trigger="click"
              ><div class="drop-content">
                <span
                  v-for="item in attrDropdown"
                  :key="item.index"
                  @click="changeCity2(item)"
                  >{{ item }}</span
                >
              </div>
              <span
                slot="reference"
                style="color: #0071c2; font-size: 14px"
                class="drop-btn"
                >住在{{ hotelStart }}
                <div class="el-icon-caret-bottom"></div
              ></span>
            </el-popover>
          </span>
        </h2>

        <div class="hotelBox Box1">
          <div class="rightBox">
            <dl class="keyword-short">
              <dt>热门地标周边酒店</dt>
              <dd>
                <span>
                  <a href="" target="_blank"> 还没想好周末去哪玩？</a>
                </span>
              </dd>
            </dl>

            <dl class="keyword-short" style="margin-top: 30px">
              <dt>促销</dt>
              <dd style="margin-top: 10px">
                <span>
                  <a href="" target="_blank"> 全国火车站周边酒店8折起</a>
                </span>
              </dd>
              <dd style="margin-top: 10px">
                <span>
                  <a href="" target="_blank"> 全国机场周边酒店8折起</a>
                </span>
              </dd>
              <dd style="margin-top: 10px">
                <span>
                  <a href="" target="_blank"> 优选酒店80元起</a>
                </span>
              </dd>
            </dl>
          </div>
          <div class="leftBox">
            <div
              class="hotelInfo"
              v-for="(item, index) in hotels.slice(0, 6)"
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
                <div class="Name" style="font-size: 14px">
                  {{ item.hotelname.split("(")[0] }}
                </div>
                <img
                  src="../assets/img/diamond.svg"
                  v-for="i in item.star"
                  :key="i"
                  style="margin-top: 2px"
                />
                <div class="Details">
                  <span class="address">{{
                    fun_hotel_district(item.location)
                  }}</span>
                  <span class="Price"
                    ><span class="price"> ￥{{ item.lowestprice }}</span
                    ><i>起</i></span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="tickets main">
        <h2 class="title">
          <span @click="onClick(2, 0)" :class="{ titleClick: show[2] == 0 }"
            >国内特价机票<i v-show="!show[2]"></i
          ></span>
          <span @click="onClick(2, 1)" :class="{ titleClick: show[2] == 1 }"
            >国际特价机票<i v-show="show[2]"></i
          ></span>

          <span class="dropdown" style="margin-left: 70%">
            <el-popover placement="bottom-end" width="50" trigger="click"
              ><div class="drop-content">
                <span
                  v-for="item in ticketDropdown"
                  :key="item.index"
                  @click="changeCity3(item)"
                  >{{ item }}</span
                >
              </div>
              <span
                slot="reference"
                style="color: #0071c2; font-size: 14px"
                class="drop-btn"
                >{{ ticketStart }}出发
                <div class="el-icon-caret-bottom"></div
              ></span>
            </el-popover>
          </span>
        </h2>
        <div class="Box1">
          <div class="ticketBox">
            <div
              class="ticketInfo"
              v-for="item in tickets.slice(0, 14)"
              :key="item.index"
            >
              <div class="item-name">
                {{ item.starT_LOCATION }}
                <div class="dancheng"></div>
                {{ item.enD_LOCATION }}
              </div>
              <div class="item-date">
                {{ item.starT_TIME }}
              </div>
              <div class="item-info">
                <strong>￥{{ item.price }}</strong
                ><i>起</i>
                <div class="item-btn">立抢</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-main>

    <Footer />
  </el-container>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
export default {
  name: "Homepage",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      currentCity: "",
      adcode: 110101,
      weather: "",
      attrStart: "北京",
      hotelStart: "北京",
      ticketStart: "北京",
      attrDropdown: [
        "上海",
        "北京",
        "兰州",
        "南京",
        "重庆",
        "深圳",
        "桂林",
        "苏州",
      ],
      ticketDropdown: [
        "上海",
        "北京",
        "兰州",
        "南京",
        "重庆",
        "深圳",
        "桂林",
        "苏州",
      ],
      show: [0, 0, 0],
      attractions: [],
      hotels: [],
      tickets: [],
      input: "",
    };
  },
  methods: {
    onSearch() {
      var cities = "上海市北京市南京市重庆市成都市";
      if (cities.includes(this.input)) {
        this.$notify({
          title: "尊敬的用户",
          message: "正在为您推荐" + this.input + "的相关信息！",
          position: "top-left",
        });
        this.currentCity = this.input;
        this.getAdcode(this.currentCity);
        this.attrStart = this.input;
        this.hotelStart = this.input;
        this.ticketStart = this.input;
      } else {
        this.$axios
          .get(
            "http://49.234.18.247:8080/api/FunGetAttractionInfoByName/" +
              this.input
          )
          .then((response) => {
            if (response.data.length !== 0) {
              this.$router.push({
                path: "/attraction/city",
                query: { find: this.input },
              });
            } else {
              this.$axios
                .get(
                  "http://49.234.18.247:8080/api/FunGetHotelInfoByName/" +
                    this.input
                )
                .then((response) => {
                  if (response.data.length !== 0) {
                    this.$router.push({
                      path: "/hotel/city",
                      query: { find: this.input },
                    });
                  } else {
                    this.$notify({
                      title: "尊敬的用户",
                      message:
                        "非常抱歉!我们暂无" + this.input + "的相关信息！",
                      position: "top-left",
                    });
                  }
                });
            }
          });
      }
    },
    onClick(a, b) {
      this.$set(this.show, a, b);
    },
    // 改变景点推荐城市
    changeCity1(newCity) {
      this.attrStart = newCity;
      this.getAttrbyCity(newCity);
    },
    toArrDetail(AttrID) {
      this.$router.push({
        path: "/attraction/detail",
        query: { id: AttrID },
      });
    },
    // 改变酒店推荐城市
    changeCity2(newCity) {
      this.hotelStart = newCity;
      this.getHotelbyCity(newCity);
    },
    toHotelDetail(HotelID) {
      this.$router.push({
        path: "/hotel/detail",
        query: { id: HotelID },
      });
    },
    // 改变航班出发城市
    changeCity3(newCity) {
      this.ticketStart = newCity;
      this.getTicketbyCity(newCity);
    },
    // 截取部分地址
    fun_district(detail) {
      var i = 0;
      var len = detail.length;
      var res = "";
      while (
        detail[i] != "路" &&
        detail[i] != "镇" &&
        detail[i] != "村" &&
        isNaN(detail[i]) &&
        i < len
      ) {
        res += detail[i];
        i++;
      }
      if (detail[i] == "路" || detail[i] == "镇" || detail[i] == "村") {
        return res + detail[i];
      } else {
        return res;
      }
    },
    // 酒店地址处理
    fun_hotel_district(detail) {
      var tmp;
      if (detail[5] == "市") {
        tmp = detail.slice(3, 6) + detail.slice(7);
      } else if (detail[5] == "省") {
        tmp = detail.slice(3, 6) + detail.slice(7, 10) + detail.slice(11);
      } else {
        tmp = detail;
      }
      return this.fun_district(tmp);
    },
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
            a.adcode = myJson.regeocode.addressComponent.adcode;
            a.attrStart = a.currentCity.substr(0, a.currentCity.length - 1);
            a.ticketStart = a.attrStart;
            a.hotelStart = a.attrStart;
          });
      });
    },
    // 根据城市名获取景点信息
    getAttrbyCity(city) {
      this.$axios
        .get(
          "http://49.234.18.247:8080/api/FunGetCommentNumByAttLocation/" + city
        )
        .then((response) => {
          this.attractions = response.data;
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
    // 根据城市名获取机票信息
    getTicketbyCity(city) {
      this.$axios
        .get("http://49.234.18.247:8080/api/FunGetLowestPrice/" + "上海")
        .then((response) => {
          var date = new Date();
          var day = date.getDate();
          var month = date.getMonth() + 1;
          for (var i = 0; i < response.data.length; i++) {
            response.data[i].starT_TIME =
              month + "月" + day + "日" + " " + response.data[i].starT_TIME;
          }
          this.tickets = response.data;
        });
    },
    getAdcode(city) {
      let a = this;
      fetch(
        "https://restapi.amap.com/v3/geocode/geo?address=" +
          city +
          "&key=b46e001d88ea385075cc97e1c892ce37"
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (myJson) {
          a.adcode = myJson.geocodes[0].adcode;
        });
    },
  },
  created() {
    // 获取浏览器地理位置
    this.getLocation();
    this.getAttrbyCity(this.attrStart);
    this.getHotelbyCity(this.hotelStart);
    this.getTicketbyCity(this.ticketStart);
  },
  mounted() {},
  watch: {
    adcode(newValue, oldValue) {
      let a = this;
      fetch(
        "https://restapi.amap.com/v3/weather/weatherInfo?city=" +
          newValue +
          "&key=b46e001d88ea385075cc97e1c892ce37&extensions=all"
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (myJson) {
          var current = myJson.forecasts[0].casts[0];
          var city = myJson.forecasts[0].city;
          var time = myJson.forecasts[0].reporttime;
          a.$notify({
            title: "实时天气",
            dangerouslyUseHTMLString: true,
            message:
              "<p>发布时间：" +
              time +
              "</p>" +
              "<p>城市/区：" +
              city +
              "</p>" +
              "<p>天气：" +
              current.dayweather +
              "</p>" +
              "<p>温度：" +
              current.nighttemp +
              "~" +
              current.daytemp +
              "℃</p>" +
              "<p>风力：" +
              current.daypower +
              "级</p>" +
              "<p>风向：" +
              current.daywind +
              "</p>" +
              "<h4>请注意天气合理出行！</h4>",
            position: "top-left",
          });
        });
    },
    attrStart(newValue, oldValue) {
      this.getAttrbyCity(newValue);
    },
    hotelStart(newValue, oldValue) {
      this.getHotelbyCity(newValue);
    },
    ticketStart(newValue, oldValue) {
      this.getTicketbyCity(newValue);
    },
  },
};
</script>

<style scoped>
.search {
  background: #f2f2f2;
  padding: 45px 20px;
}
.search p {
  margin-bottom: 5px;
}
.block {
  margin-left: 24%;
  width: 70%;
  color: #003680;
}
.el-input /deep/ .el-input__inner {
  height: 55px;
}
.el-button {
  background-color: #003680;
  border: none;
  height: 54px;
}

.title {
  font: 16px/26px "Microsoft YaHei", SimHei, SimSun, Tahoma, Verdana, Arial,
    sans-serif;
}
.Box1 {
  width: 100%;
  height: 390px;
  background-color: #f2f2f2;
  border: 1px solid #e0e0e0;
  border-top: 2px solid #003680;
  margin-bottom: 20px;
  margin-top: 3px;
}
.rightBox {
  float: left;
  width: 25%;
  height: 100%;
  border-right: 1px dashed #807c7c;
}
.keyword-short {
  margin-left: 10%;
}
.keyword-short dd a {
  color: #003680 !important;
  font-size: 13px;
}
.leftBox {
  float: left;
  width: 74%;
  height: 100%;
}

.attriInfo,
.hotelInfo {
  float: left;
  margin: 21px 0px 0px 15px;
  width: 255px;
  height: 164px;
  background-color: #fff;
}

.infoImg {
  height: 60%;
  width: 100%;
}

.infoDetail {
  padding: 3px 13px;
}

.Details .address {
  font: 12px/14px "Microsoft YaHei", SimHei, SimSun, Tahoma, Verdana, Arial,
    sans-serif;
  color: #666;
}

.Details .price {
  color: orangered;
  font: bold 22px/22px "Lucida Console", "Courier New", monospace, sans-serif;
}
.Price,
.price1 {
  float: right;
}

.Details i {
  margin-left: 3px;
  font-style: normal;
  font-size: 13px;
}
.attriInfo:hover,
.hotelInfo:hover,
.ticketInfo:hover {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  cursor: pointer;
}
.ticketBox {
  width: 1050px;
  height: 100%;
  margin: auto;
  padding: auto;
}
.ticketInfo {
  float: left;
  margin: 19px 10px 0px 10px;
  width: 190px;
  height: 105px;
  background-color: #fff;
  border-radius: 2px;
  font-family: "Microsoft YaHei", SimHei, SimSun, Tahoma, Verdana, Arial,
    sans-serif;
}
.dancheng {
  display: inline-block;
  width: 30px;
  height: 13px;
  background: center/100% url("../assets/img/dancheng.png") no-repeat;
}
.item-name {
  margin-top: 15px;
  margin-bottom: 5px;
  margin-left: 20px;
  font-size: 15px;
}
.item-date {
  margin-left: 20px;
  font-size: 13px;
  color: #666;
}
.item-info {
  margin-top: 11px;
  margin-left: 16px;
}
.item-info > i {
  font-style: normal;
  font-size: 12px;
}
.item-btn {
  margin-right: 14px;
  float: right;
  height: 26px;
  width: 55px;
  background-color: orange;
  border-radius: 3px;
  text-align: center;
  color: white;
  line-height: 26px;
  font-size: 14px;
}
.item-btn:hover {
  background-color: #ffb71b;
}

.titleClick {
  color: #003680;
}

.title span {
  position: relative;
  margin-left: 15px;
}

.title > span:hover {
  color: #003680;
  cursor: pointer;
}
.title span i {
  position: absolute;
  left: 50%;
  margin-left: -6px;
  bottom: -7px;
  width: 0;
  height: 0;
  overflow: hidden;
  line-height: 0;
  font-size: 0;
  vertical-align: middle;
  border-bottom: 6px solid #003680;
  border-top: 0 none;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
}

.drop-content span {
  display: block;
  color: black;
  font-size: 13px;
  height: 20px;
  line-height: 20px;
  text-align: center;
}
.drop-content span:hover {
  background-color: #2577e3;
  color: white;
  cursor: pointer;
}

dt {
  font-size: 18px;
  margin: 8px 0;
}
</style>