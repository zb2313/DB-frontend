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
                  <div class="input-number-up-icon">
                    <i class="el-icon-arrow-up"></i>
                  </div>
                  <div class="input-number-down-icon">
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
                  <div class="input-number-up-icon">
                    <i class="el-icon-arrow-up"></i>
                  </div>
                  <div class="input-number-down-icon">
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
                  <div class="input-number-up-icon">
                    <i class="el-icon-arrow-up"></i>
                  </div>
                  <div class="input-number-down-icon">
                    <i class="el-icon-arrow-down"></i>
                  </div>
                </div>
              </div>

              <div class="searchBtn">点击搜索</div>
            </div>
          </div>

          <!-- 地图 -->
          <div class="map">
            <div class="el-icon-location locationMark"></div>
            <div class="mapshow-btn" @click="dialogVisible = true">
              在地图上查看
            </div>
          </div>
          <el-dialog
            :visible.sync="dialogVisible"
            width="90%"
            center="true"
            top="20px"
          >
            <div class="amap-wrap">
              <el-amap
                vid="amapDemo"
                isHotspot="true"
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
              time.getTime() < Date.now() - 86400000
            );
          },
        },
        adult: 1,
        child: 0,
        room: 1,
      },
      position: [0, 0],
      address: "",
      map: null,
      lang: "zh_en",
      zoom: 18,
      center: [116.397428, 39.90923],
      amapManager,
      events: {
        init() {
          lazyAMapApiLoaderInstance.load().then(() => {
            _this.initMap();
          });
        },
        click(e) {
          // 点击获得经纬度和地址
          let { lng, lat } = e.lnglat;
          _this.position = [lng, lat];
          // 更改地图中心点
          _this.map.setCenter([lng, lat]);

          var geocoder = new AMap.Geocoder({
            radius: 1000,
            extensions: "all",
          });

          geocoder.getAddress([lng, lat], function (status, result) {
            if (status === "complete" && result.info === "OK") {
              if (result && result.regeocode) {
                console.log(result.regeocode);
                _this.address = result.regeocode.formattedAddress;
                _this.$nextTick();
              }
            }
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
        city: "上海",
        num: 400,
      },
      radio: "1",
      items: [],
      orginData: [],
    };
  },
  methods: {
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
          // direction: false,
        })
      );
      let a = this;
      let marker = new AMap.Marker({
        position: [121, 31],
        title: "here",
        // anchor: "bottom-left",
        // icon: "@/assets/位置.png",
        // content: "你好",
        draggable: true,
        raiseOnDrag: true,
        animation: "AMAP_ANIMATION_DROP",
      });
      marker.setMap(this.map);

      // 高德UI
      AMapUI.loadUI(["overlay/SimpleMarker"], (SimpleMarker) => {
        const marker = new SimpleMarker({
          iconLabel: "A",
          iconStyle: "red",
          map: this.map,
          position: this.map.getCenter(),
          animation: "AMAP_ANIMATION_DROP",
        });
      });

      // 热点信息展示
      let placeSearch = new AMap.PlaceSearch(); //构造地点查询类
      let infoWindow = new AMap.AdvancedInfoWindow({
        // isCustom: true,  //使用自定义窗体
        // anchor: 'top-left',  //设置锚点
        // offset: new AMap.Pixel(1, 1),
      });

      // 地图的热点
      this.map.on("hotspotclick", function (result) {
        placeSearch.getDetails(result.id, function (status, result) {
          if (status === "complete" && result.info === "OK") {
            placeSearch_CallBack(result);
          }
        });
      });
      //回调函数

      function placeSearch_CallBack(data) {
        //infoWindow.open(map, result.lnglat);
        let poiArr = data.poiList.pois;
        let location = a.position;
        infoWindow.setContent(createContent(poiArr[0]));
        infoWindow.open(a.map, location);
      }
      function createContent(poi) {
        //信息窗体内容
        var s = [];
        s.push(
          '<div class="info-title">' +
            poi.name +
            '</div><div class="info-content">' +
            "地址：" +
            poi.address
        );
        s.push("电话：" + poi.tel);
        s.push("类型：" + poi.type);
        s.push("<div>");
        return s.join("<br>");
      }

      //创建右键菜单
      let contextMenu = new AMap.ContextMenu();
      //右键放大
      contextMenu.addItem(
        "放大一级",
        function () {
          a.map.zoomIn();
        },
        0
      );
      //右键缩小
      contextMenu.addItem(
        "缩小一级",
        function () {
          a.map.zoomOut();
        },
        1
      );
      // 右键添加Marker标记
      let contextMenuPositon;
      contextMenu.addItem(
        "添加标记",
        function () {
          AMapUI.loadUI(["overlay/SvgMarker"], function (SvgMarker) {
            if (!SvgMarker.supportSvg) {
              //当前环境并不支持SVG，此时SvgMarker会回退到父类，即SimpleMarker
            }
            //创建一个shape实例
            var shape = new SvgMarker.Shape.TriangleFlagPin({
              height: 50, //高度
              //width: **, //不指定时会维持默认的宽高比
              fillColor: "lightpink", //填充色
              strokeWidth: 1, //描边宽度
              strokeColor: "aliceblue", //描边颜色
            });

            //利用该shape构建SvgMarker
            var marker = new SvgMarker(
              //第一个参数传入shape实例
              shape,
              //第二个参数为SimpleMarker的构造参数（iconStyle除外）
              {
                showPositionPoint: false, //显示定位点
                map: a.map,
                position: contextMenuPositon,
              }
            );
          });
        },
        2
      );
      //地图绑定鼠标右击事件——弹出右键菜单
      this.map.on("rightclick", function (e) {
        contextMenu.open(a.map, e.lnglat);
        contextMenuPositon = e.lnglat;
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

      this.items = [];
      for (var n = 0; n < this.originData.length; n++) {
        if (res.includes(n)) {
          this.items.push(this.originData[n]);
        }
      }
      this.title.num = this.items.length;
    },
  },
  created() {
    this.getHotelbyCity();
  },
  watch: {
    "searchForm.date1"(inew, iold) {
      if (this.searchForm.date2) {
        if (inew > this.searchForm.date2) {
          var temp = this.searchForm.date1;
          this.searchForm.date1 = this.searchForm.date2;
          this.searchForm.date2 = temp;
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
  mounted() {
    this.searchForm.date1 = Date.now();
    this.searchForm.date2 = Date.now() + 8.64e7;
  },
};
</script>
