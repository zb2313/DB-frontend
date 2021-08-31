<template>
  <el-container direction="vertical">
    <Header activeIndex="1" />

    <el-main>
      <div class="main">
        <!-- 左边展示区域 -->
        <div class="left">
          <!-- 重新搜索 -->
          <div class="searchBox">
            <div class="searchForm">
              <p>目的地/酒店名称</p>
              <el-input placeholder="上海" v-model="searchForm.location">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>

              <p class="margin">入住日期</p>
              <el-date-picker
                v-model="searchForm.date1"
                type="date"
                placeholder="开始日期"
                :picker-options="searchForm.pickerOptions0"
              >
              </el-date-picker>

              <p class="margin">退房日期</p>
              <el-date-picker
                v-model="searchForm.date2"
                type="date"
                placeholder="结束日期"
                :picker-options="searchForm.pickerOptions1"
              >
              </el-date-picker>
              <p>入住{{ searchForm.dates }}晚</p>

              <div class="input-number margin" style="margin-bottom: 7px">
                <div class="input-number-text">
                  {{ searchForm.adult }}位成人
                </div>
                <div class="input-number-icon">
                  <div class="input-number-up-icon" @click="numberPlus(1)">
                    <i class="el-icon-arrow-up"></i>
                  </div>
                  <div class="input-number-down-icon" @click="numberMinus(1)">
                    <i class="el-icon-arrow-down"></i>
                  </div>
                </div>
              </div>
              <div
                class="input-number"
                style="display: inline-block; width: 82px; margin-right: 4px"
              >
                <div class="input-number-text">
                  {{ searchForm.child }}名儿童
                </div>
                <div class="input-number-icon">
                  <div class="input-number-up-icon" @click="numberPlus(2)">
                    <i class="el-icon-arrow-up"></i>
                  </div>
                  <div class="input-number-down-icon" @click="numberMinus(3)">
                    <i class="el-icon-arrow-down"></i>
                  </div>
                </div>
              </div>
              <div
                class="input-number"
                style="display: inline-block; width: 82px"
              >
                <div class="input-number-text">{{ searchForm.room }}间房</div>
                <div class="input-number-icon">
                  <div class="input-number-up-icon" @click="numberPlus(3)">
                    <i class="el-icon-arrow-up"></i>
                  </div>
                  <div class="input-number-down-icon" @click="numberMinus(3)">
                    <i class="el-icon-arrow-down"></i>
                  </div>
                </div>
              </div>

              <div class="searchBtn" @click="onSubmit">点击搜索</div>
            </div>
          </div>

          <!-- 地图 -->
          <div class="map">
            <div class="el-icon-location locationMark"></div>
            <div class="mapshow-btn" @click="dialogVisible = true">
              在地图上查看
            </div>
          </div>
          <el-dialog :visible.sync="dialogVisible" width="90%" top="20px">
            <div class="amap-wrap">
              <el-amap
                vid="amapDemo"
                isHotspot="true"
                resizeEnable="true"
                :amap-manager="amapManager"
                :center="center"
                :zoom="zoom"
                :lang="lang"
                :events="events"
              ></el-amap>
            </div>
          </el-dialog>
          <!-- 筛选框 -->
          <div class="form2">
            <div class="labelForForm2">缩小搜索范围</div>

            <!-- 按类别筛选 -->
            <div class="type">
              <p>类别</p>
              <el-checkbox-group v-model="checkList">
                <el-checkbox label="民宿"></el-checkbox>
                <el-checkbox label="酒店公寓"></el-checkbox>
                <el-checkbox label="带娃爱住"></el-checkbox>
                <el-checkbox label="闪住"></el-checkbox>
                <el-checkbox label="浪漫情侣"></el-checkbox>
              </el-checkbox-group>
            </div>

            <!-- 按价格筛选 -->
            <div class="budget">
              <p>你的预算(每晚)</p>
              <el-checkbox-group v-model="checkList1">
                <el-checkbox label="1">200元以下</el-checkbox>
                <el-checkbox label="2">200-500元</el-checkbox>
                <el-checkbox label="3">500元以上</el-checkbox>
              </el-checkbox-group>
            </div>
            <!-- 按星级筛选 -->
            <div class="grade">
              <p>评分</p>
              <el-checkbox-group v-model="checkList2">
                <el-checkbox label="5">好极了：5分</el-checkbox>
                <el-checkbox label="4">非常好：4分</el-checkbox>
                <el-checkbox label="3">一般般：3分</el-checkbox>
                <el-checkbox label="2">不太好：2分</el-checkbox>
                <el-checkbox label="1">非常差：1分</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
        </div>

        <div class="right">
          <div class="title">
            <h1>{{ title.city }}：共{{ title.num }}家住宿</h1>
          </div>

          <div class="sort">
            <el-radio-group v-model="radio" @change="sortClick">
              <el-radio-button label="1">低价优先</el-radio-button>
              <el-radio-button label="2">高评分优先</el-radio-button>
              <el-radio-button label="3">距离(直线)最近</el-radio-button>
              <el-radio-button label="4">热门推荐</el-radio-button>
            </el-radio-group>
          </div>
          <div class="contents">
            <ul>
              <li v-for="item in items" :key="item.hoteid">
                <contentListItem
                  :title="item.hotelname"
                  :address="item.location"
                  :grade="item.star"
                  :coverImgUrl="item.picture"
                  type="房客"
                  words="最低"
                  :price="item.lowestprice"
                  :ID="item.hoteid"
                  :dianping_number="item.commentnum"
                  :label="item.label"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <el-backtop :right="20"> </el-backtop>
    </el-main>
    <Footer1 />
  </el-container>
</template>

<style scoped>
.main {
  margin-top: 25px;
}
/* 左侧css */
.left {
  width: 300px;
  float: left;
  text-align: center;
}
/* 重新搜索 */
.searchBox {
  width: 270px;
  height: 400px;
  border-radius: 3px;
  border: 1px solid rgb(189, 178, 178);
  background-color: #ffc489;
}
.searchForm {
  width: 80%;
  height: 90%;
  margin: 0 auto;
  margin-top: 20px;
  background-color: #fff;
  font-size: 13px;
  text-align: left;
  background-color: #ffc489;
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner,
.el-input {
  width: 211px;
}
.input-number {
  width: 190px;
  height: 30px;
  line-height: 30px;
  border: 1px solid lightgray;
  padding: 0 10px;
  border-radius: 4px;
  background-color: white;
}
.input-number-text {
  float: left;
  text-align: left;
  height: 100%;
}
.input-number-icon {
  float: right;
  text-align: right;
  height: 100%;
}
.input-number-up-icon {
  font-size: 8px;
  height: 50%;
  line-height: 23px;
}
.input-number-down-icon {
  font-size: 8px;
  height: 50%;
  line-height: 8px;
}
.searchBtn {
  width: 120px;
  height: 50px;
  border: 1px solid lightgray;
  border-radius: 4px;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  color: white;
  background-color: #0071c2;
  margin: 0 auto;
  margin-top: 15px;
  cursor: pointer;
}
.margin {
  margin-top: 12px;
}
/* 地图btn css */
.left .map {
  margin-top: 20px;
  width: 272px;
  height: 180px;
  border-radius: 3px;
  background: url("http://ac-q-cf.static.booking.cn/static/img/map/map-entry-point/7813a559b03ef30ba107ca5224172615a210e416.png")
    no-repeat;
  background-size: cover;
}
.left .locationMark {
  font-size: 60px;
  margin-top: 45px;
  color: #0071c2;
}
.left .mapshow-btn {
  width: 105px;
  height: 32px;
  line-height: 32px;
  margin: 8px auto;
  font-size: 15px;
  color: white;
  border-radius: 3px;
  background-color: #0071c2;
  cursor: pointer;
}
.amap-wrap {
  position: relative;
  width: 100%;
  height: 500px;
}

/* 左侧筛选框 */
.form2 {
  width: 270px;
  margin-top: 20px;
  border-radius: 3px;
  border: 1px solid rgb(189, 178, 178);
  margin-bottom: 40px;
}

.labelForForm2 {
  height: 40px;
  border-bottom: 1px solid rgb(189, 178, 178);
  line-height: 40px;
  font-size: 18px;
  font-weight: 700;
  text-align: left;
  text-indent: 5px;
}
.el-checkbox {
  margin-bottom: 8px;
}

.el-checkbox-group {
  padding-left: 20px;
  width: 70px;
}
.form2 p {
  font-size: 14px;
  font-weight: 600;
  text-align: left;
  text-indent: 18px;
  margin: 10px 0;
}

.type,
.budget {
  border-bottom: 1px solid rgb(189, 178, 178);
}
.mapshow-btn:hover,
.searchBtn:hover {
  background-color: #003680;
}

/* 右边展示区css */
.right {
  float: left;
  margin-left: 27px;
  width: 750px;
  text-align: left;
}
.right .title {
  font-size: 20px;
  text-align: left;
  margin-bottom: 15px;
}

/* 搜索框 */
.right .sort {
  height: 60px;
}
</style>

<script>
import Header from "@/components/Header.vue";
import contentListItem from "@/components/contentListItem.vue";
import Footer1 from "@/components/Footer1.vue";
import { AMapManager, lazyAMapApiLoaderInstance } from "vue-amap";
const amapManager = new AMapManager();
export default {
  components: {
    Header,
    contentListItem,
    Footer1,
  },
  data() {
    const _this = this;
    return {
      searchForm: {
        location: "",
        date1: "",
        date2: "",
        dates: "",
        pickerOptions0: {
          disabledDate: (time) => {
            return time.getTime() < Date.now() - 8.64e7;
          },
        },
        pickerOptions1: {
          disabledDate: (time) => {
            return (
              time.getTime() < this.searchForm.date1 ||
              time.getTime() < Date.now() - 8.64e7
            );
          },
        },
        adult: 1,
        child: 0,
        room: 1,
      },

      map: null,
      lang: "zh_en",
      zoom: 15,
      center: [121.473701, 31.230416],
      amapManager,
      events: {
        init() {
          lazyAMapApiLoaderInstance.load().then(() => {
            _this.initMap();
          });
        },
      },
      dialogVisible: false,
      checkList: [],
      checkList1: [],
      checkList2: [],
      withList: [],
      withList1: [],
      withList2: [],
      title: {
        city: "北京",
        num: 400,
      },
      radio: "1",
      items: [],
      originData: [],
    };
  },
  methods: {
    numberPlus(n) {
      if (n == 1 && this.searchForm.adult != 10) {
        this.searchForm.adult++;
      } else if (n == 2 && this.searchForm.child != 5) {
        this.searchForm.child++;
      } else if (n == 3 && this.searchForm.room != 10) {
        this.searchForm.room++;
      }
    },
    numberMinus(n) {
      if (n == 1 && this.searchForm.adult != 1) {
        this.searchForm.adult--;
      } else if (n == 2 && this.searchForm.child != 0) {
        this.searchForm.child--;
      } else if (n == 3 && this.searchForm.room != 1) {
        this.searchForm.room--;
      }
    },
    onSubmit() {
      var city = "全部北京市上海市重庆市成都市南京市";
      var hotelname = "格林豪泰酒店如家酒店7天酒店速8酒店四季酒店";
      this.title.city = this.searchForm.location;
      if (city.includes(this.searchForm.location)) {
        this.getHotelbyCity();
      } else if (hotelname.includes(this.searchForm.location)) {
        this.getHotelbyName();
      } else {
        this.$notify({
          title: "温馨提醒",
          dangerouslyUseHTMLString: true,
          message:
            "暂无" +
            '"' +
            this.searchForm.location +
            '"' +
            "相关的信息！&nbsp;请尝试搜索其他关键词！",
          posotion: "top-left",
        });
      }
    },
    initMap() {
      this.map = amapManager.getMap();
      // 比例尺
      this.map.addControl(new AMap.Scale());
      // 工具条
      this.map.addControl(
        new AMap.ToolBar({
          position: "LT",
          useNative: true,
          autoPosition: false,
          locate: true,
          ruler: false,
          liteStyle: true,
        })
      );
      let a = this;
      var len = a.items.length;
      for (let i = 0; i < len; i++) {
        this.addressToLnglat(a.items[i].location).then((res) => {
          let lnglat = res.split(",");
          a.addMarker(lnglat, a.items[i]);
        });
      }
    },
    addMarker(position, item) {
      let marker = new AMap.Marker({
        position: position,
        animation: "AMAP_ANIMATION_DROP",
      });

      this.map.add(marker);
      let a = this;

      marker.on("click", function () {
        console.log(item);
        a.$notify({
          title: item.hotelname,
          message: "这是一条不会自动关闭的消息",
          offset: 50,
        });
      });
    },

    async addressToLnglat(address) {
      return fetch(
        "https://restapi.amap.com/v3/geocode/geo?key=b46e001d88ea385075cc97e1c892ce37&address=" +
          address
      )
        .then(function (response) {
          return response.json();
        })
        .then((res) => {
          if (res.geocodes[0].location) {
            return res.geocodes[0].location;
          } else return -1;
        });
    },
    getHotelbyCity() {
      this.$axios
        .get(
          "http://49.234.18.247:8080/api/FunGetCommentNumByHotelLocation/" +
            this.title.city
        )
        .then((response) => {
          for (var i = 0; i < response.data.length; i++) {
            response.data[i].hotelname =
              response.data[i].hotelname.split("(")[0];
            response.data[i].location = this.fun_hotel_district(
              response.data[i].location
            );
          }
          this.originData = JSON.parse(JSON.stringify(response.data));
          this.items = response.data;
          this.title.num = response.data.length;
        });
    },
    getHotelbyName() {
      this.$axios
        .get(
          "http://49.234.18.247:8080/api/FunGetHotelInfoByName/" +
            this.title.city
        )
        .then((response) => {
          for (var i = 0; i < response.data.length; i++) {
            response.data[i].hotelname =
              response.data[i].hotelname.split("(")[0];
            response.data[i].location = this.fun_hotel_district(
              response.data[i].location
            );
          }
          this.originData = JSON.parse(JSON.stringify(response.data));
          this.items = response.data;
          this.title.num = response.data.length;
        });
    },
    goTop() {
      // document.documentElement.scrollTop = document.body.scrollTop = 0;
      let top = document.documentElement.scrollTop || document.body.scrollTop;
      // 实现过度滚动效果
      const timeTop = setInterval(() => {
        document.body.scrollTop =
          document.documentElement.scrollTop =
          top -=
            50;
        if (top <= 0) {
          clearInterval(timeTop);
        }
      }, 30);
    },
    sortClick: function (val) {
      if (val === "2") {
        this.items = this.items.sort(function (a, b) {
          return b.star - a.star;
        });
      }
      if (val === "1") {
        this.items = this.items.sort(function (a, b) {
          return a.lowestprice - b.lowestprice;
        });
      }
    },
    // 酒店地址处理
    fun_hotel_district(detail) {
      var tmp;
      if (detail[5] == "市") {
        tmp = detail.slice(3, 6) + detail.slice(7);
      } else {
        tmp = detail;
      }
      return tmp;
    },
    // 下面四个函数用于实现筛选框功能
    narrow(List) {
      this.withList = [];
      for (var i = 0; i < this.originData.length; i++) {
        var labels = (this.originData[i].label || "").split("_");
        for (var j = 0; j < List.length; j++) {
          if (labels.includes(List[j])) {
            this.$set(this.withList, this.withList.length, i);
            break;
          }
        }
      }
    },
    narrow1(list) {
      this.withList1 = [];

      for (var i = 0; i < this.originData.length; i++) {
        var price = this.originData[i].lowestprice;
        if (
          (list.includes("1") && price <= 200) ||
          (list.includes("2") && price <= 500 && price > 200) ||
          (list.includes("3") && price > 500)
        ) {
          this.$set(this.withList1, this.withList1.length, i);
        }
      }
    },
    narrow2(List) {
      this.withList2 = [];
      for (var i = 0; i < this.originData.length; i++) {
        var star = this.originData[i].star;
        if (List.includes(star.toString())) {
          this.withList2.push(i);
        }
      }
    },
    intersect() {
      if (this.withList.length === 0 && this.checkList.length === 0) {
        for (var i = 0; i < this.originData.length; i++) {
          this.withList.push(i);
        }
      }
      if (this.withList1.length === 0 && this.checkList1.length === 0) {
        for (var j = 0; j < this.originData.length; j++) {
          this.withList1.push(j);
        }
      }
      if (this.withList2.length === 0 && this.checkList2.length === 0) {
        for (var k = 0; k < this.originData.length; k++) {
          this.withList2.push(k);
        }
      }

      var withList1 = this.withList1;
      var withList2 = this.withList2;
      var res = this.withList.filter(function (v) {
        return withList1.includes(v);
      });
      res = res.filter(function (v) {
        return withList2.includes(v);
      });

      var items = [];
      for (var n = 0; n < this.originData.length; n++) {
        if (res.includes(n)) {
          items.push(this.originData[n]);
        }
      }
      this.items = items;
      this.title.num = items.length;
    },
  },
  created() {
    // 搜索框日期初始化
    this.searchForm.date1 = Date.now();
    this.searchForm.date2 = Date.now() + 8.64e7;

    // 接收其他页面传递的参数
    if (this.$route.query.find) {
      this.title.city = this.$route.query.find;
      this.getHotelbyName();
    } else if (this.$route.query.city) {
      this.title.city = this.$route.query.city;
      if (this.$route.query.time1) {
        this.searchForm.date1 = parseInt(this.$route.query.time1);
        this.searchForm.date2 = parseInt(this.$route.query.time2);
      }
      this.searchForm.adult = this.$route.query.adult;
      this.searchForm.child = this.$route.query.child;
      this.searchForm.room = this.$route.query.room;
      this.getHotelbyCity();
    } else if (this.$route.query.hotelname) {
      this.title.city = this.$route.query.hotelname;
      if (this.$route.query.time1) {
        this.searchForm.date1 = parseInt(this.$route.query.time1);
        this.searchForm.date2 = parseInt(this.$route.query.time2);
      }
      this.getHotelbyName();
    } else {
      this.title.city = "全部";
      this.getHotelbyCity();
    }
    this.searchForm.location = this.title.city;

    if (this.title.city !== "全部") {
      this.addressToLnglat(this.title.city).then((res) => {
        this.center = res.split(",");
      });
    }
  },
  watch: {
    "searchForm.date1"(inew, iold) {
      if (this.searchForm.date2) {
        var time1 = Number.isFinite(inew)
          ? this.searchForm.date1
          : this.searchForm.date1.getTime();

        var time2 = Number.isFinite(this.searchForm.date2)
          ? this.searchForm.date2
          : this.searchForm.date2.getTime();

        if (time1 > time2) {
          this.searchForm.date1 = time2;
          this.searchForm.date2 = time1;
        } else if (time1 == time2) {
          this.searchForm.date2 = time1 + 8.64e7;
        }
        this.searchForm.dates = Math.ceil(
          (this.searchForm.date2 - this.searchForm.date1) / 8.64e7
        );
      }
    },
    "searchForm.date2"(inew, iold) {
      if (this.searchForm.date1) {
        this.searchForm.dates = Math.ceil(
          (inew - this.searchForm.date1) / 8.64e7
        );
      }
    },
    deep: true,
    checkList(newValue, oldValue) {
      this.narrow(newValue);
      this.intersect();
      this.goTop();
    },
    checkList1(newValue, oldValue) {
      this.narrow1(newValue);
      this.intersect();
      this.goTop();
    },
    checkList2(newValue, oldValue) {
      this.narrow2(newValue);
      this.intersect();
      this.goTop();
    },
  },
  mounted() {},
};
</script>
