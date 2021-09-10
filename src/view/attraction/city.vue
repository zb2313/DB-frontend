<template>
  <el-container direction="vertical">
    <Header activeIndex="2" />
    <el-main>
      <div class="main">
        <div class="left">
          <div class="title">
            <h1>{{ title.city }}：共{{ title.num }}个景点</h1>
          </div>

          <!-- 地图 -->
          <img
            class="bigger-icon"
            src="../../assets/img/bigger.svg"
            title="点击放大"
            @click="dialogVisible = true"
          />
          <el-dialog :visible.sync="dialogVisible" width="90%" top="20px">
            <div class="amap-wrap1">
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
          <div class="amap-wrap">
            <el-amap
              vid="amapDemo"
              isHotspot="true"
              resizeEnable="true"
              :amap-manager="amapManager"
              :center="center"
              :zoom="zoom"
              :lang="lang"
              :events="events1"
            ></el-amap>
          </div>

          <div class="form2">
            <div class="labelForForm2">缩小搜索范围</div>

            <div class="type">
              <p>类别</p>
              <el-checkbox-group v-model="checkList">
                <el-checkbox label="地标"></el-checkbox>
                <el-checkbox label="亲子"></el-checkbox>
                <el-checkbox label="建筑"></el-checkbox>
                <el-checkbox label="休闲"></el-checkbox>
                <el-checkbox label="历史"></el-checkbox>
              </el-checkbox-group>
            </div>

            <div class="budget">
              <p>预算</p>
              <el-checkbox-group v-model="checkList1">
                <el-checkbox label="1">50元以下</el-checkbox>
                <el-checkbox label="2">50-100元</el-checkbox>
                <el-checkbox label="3">100元以上</el-checkbox>
              </el-checkbox-group>
            </div>

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

        <!-- 右侧搜索框 -->
        <div class="right">
          <div class="search1">
            <el-row>
              <el-col :span="22"
                ><el-input placeholder="地点/景点……" v-model="input"> </el-input
              ></el-col>
              <el-col :span="2"
                ><el-button
                  type="primary"
                  icon="el-icon-search"
                  @click="onSelect"
                  >查询</el-button
                ></el-col
              >
            </el-row>
          </div>

          <div class="sort">
            <div class="sortBox">
              <el-dropdown @command="Sort">
                <span class="el-dropdown-link">
                  {{ sortBy }}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="a">热门推荐</el-dropdown-item>
                  <el-dropdown-item command="b">低价优先</el-dropdown-item>
                  <el-dropdown-item command="c">高分优先</el-dropdown-item>
                  <el-dropdown-item command="d">距离最短</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
          <div class="contents">
            <ul>
              <li v-for="item in items" :key="item.attractionid">
                <contentListItem
                  :title="item.attractionname"
                  :address="item.location"
                  :grade="item.star"
                  :coverImgUrl="item.picture"
                  type="游客"
                  words="平均"
                  :price="item.price"
                  :ID="item.attractionid"
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
  margin-top: 15px;
}
.left {
  width: 300px;
  float: left;
}
.right {
  float: left;
  width: 750px;
  margin-left: 27px;
}
.title {
  font-size: 16px;
  text-align: left;
}
/* 地图css */
.amap-wrap1 {
  width: 100%;
  height: 500px;
}
.amap-wrap {
  position: relative;
  width: 270px;
  height: 300px;
  margin-top: 15px;
  border: 1px solid rgb(189, 178, 178);
  border-radius: 3px;
}

.bigger-icon {
  position: absolute;
  z-index: 999;
  margin-top: 18px;
  margin-left: 237px;
  cursor: pointer;
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
  width: 90px;
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

/* 搜索框 */
.search1 {
  width: 100%;
  margin-top: 45px;
  margin-bottom: 20px;
}
.el-input /deep/ .el-input__inner {
  height: 55px;
  border: 3px solid orange;
  border-radius: 3px 0 0 3px;
}
.el-button {
  height: 55px;
  border: 3px solid orange;
  border-left: unset;
  border-radius: 0 3px 3px 0;
}

/* 排序 */
.sort {
  width: 100%;
  text-align: right;
}
.sortBox {
  margin-left: 690px;
  margin-bottom: 10px;
  width: 85px;
  height: 25px;
  line-height: 25px;
  border: 1px solid orange;
  border-radius: 2px;
  cursor: pointer;
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
      title: {
        city: "广州",
        num: "333",
      },
      // 地图的数据
      dialogVisible: false,
      map: null,
      lang: "zh_en",
      zoom: 12,
      center: [121.473701, 31.230416],
      amapManager,
      events: {
        init() {
          lazyAMapApiLoaderInstance.load().then(() => {
            _this.initMap();
          });
        },
      },
      events1: {
        init() {
          lazyAMapApiLoaderInstance.load().then(() => {
            _this.initMap1();
          });
        },
      },
      label: "",
      checkList: [],
      checkList1: [],
      checkList2: [],
      withList: [],
      withList1: [],
      withList2: [],
      items: [],
      originData: [],
      attractions: [],
      Lnglat: [],
      input: "",
      sortBy: "热门推荐",
    };
  },
  methods: {
    initMap() {
      this.map = amapManager.getMap();
      // 比例尺;
      this.map.addControl(new AMap.Scale());
      // 工具条;
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
    initMap1() {
      this.map = amapManager.getMap();
      // 比例尺;
      this.map.addControl(new AMap.Scale());
      let a = this;
      var len = a.items.length;
      for (let i = 0; i < len; i++) {
        this.addressToLnglat(a.items[i].location).then((res) => {
          let lnglat = res.split(",");
          a.addMarker1(lnglat);
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
      marker.on("mouseover", function () {
        a.openInfo(marker, item);
      });
    },
    addMarker1(position) {
      let marker = new AMap.Marker({
        position: position,
        animation: "AMAP_ANIMATION_DROP",
      });

      this.map.add(marker);
    },
    //在指定位置打开信息窗体
    openInfo(marker, item) {
      //实例化信息窗体
      var title = item.attractionname,
        content = [];
      content.push(
        "<img class='pic' src='" +
          item.picture +
          "'>地址：" +
          item.location +
          "<br/>"
      );
      if (item.star == 0) {
        content.push(
          "<span style='font-size:11px;color:grey;'>暂无评分</span>"
        );
      } else {
        for (var i = 0; i < item.star; i++) {
          content.push("<i class='star el-icon-star-on'></i>");
        }
      }
      content.push(
        '<br/><span style="font-size:11px;color:#F00;">价格:' +
          item.price +
          "元</span>"
      );
      content.push(
        "<a href='http://kefan-zheng.space/attraction/detail?id=" +
          item.attractionid +
          "'>了解详情</a>"
      );

      let a = this;
      let infoWindow = new AMap.InfoWindow({
        isCustom: true, //使用自定义窗体
        content: a.createInfoWindow(title, content.join("")),
        offset: new AMap.Pixel(16, -45),
      });

      infoWindow.open(this.map, marker.getPosition());
    },
    //构建自定义信息窗体
    createInfoWindow(title, content) {
      var info = document.createElement("div");
      info.className = "custom-info input-card content-window-card";

      //可以通过下面的方式修改自定义窗体的宽高
      info.style.width = "300px";
      // 定义顶部标题
      var top = document.createElement("div");
      var titleD = document.createElement("div");
      var closeX = document.createElement("img");
      top.className = "info-top";
      titleD.innerHTML = title;
      closeX.src = "https://webapi.amap.com/images/close2.gif";
      closeX.onclick = this.closeInfoWindow;

      top.appendChild(titleD);
      top.appendChild(closeX);
      info.appendChild(top);

      // 定义中部内容
      var middle = document.createElement("div");
      middle.className = "info-middle";
      middle.style.backgroundColor = "white";
      middle.innerHTML = content;
      info.appendChild(middle);

      // 定义底部内容
      var bottom = document.createElement("div");
      bottom.className = "info-bottom";
      bottom.style.position = "relative";
      bottom.style.top = "0px";
      bottom.style.margin = "0 auto";
      var sharp = document.createElement("img");
      sharp.src = "https://webapi.amap.com/images/sharp.png";
      bottom.appendChild(sharp);
      info.appendChild(bottom);
      return info;
    },

    //关闭信息窗体
    closeInfoWindow() {
      this.map.clearInfoWindow();
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
    getAttrbyCity() {
      this.$axios
        .get(
          "http://49.234.18.247:8080/api/FunGetCommentNumByAttLocation/" +
            this.title.city
        )
        .then((response) => {
          this.originData = JSON.parse(JSON.stringify(response.data));
          var items;
          if ((items = this.checkLabel(this.label, response.data))) {
            this.items = items;
            this.title.num = items.length;
          } else {
            this.items = response.data;
            this.title.num = response.data.length;
          }
        });
    },
    gitAttrbyName() {
      this.$axios
        .get(
          "http://49.234.18.247:8080/api/FunGetAttractionInfoByName/" +
            this.title.city
        )
        .then((response) => {
          this.originData = JSON.parse(JSON.stringify(response.data));
          var items;
          if ((items = this.checkLabel(this.label, response.data))) {
            this.items = items;
            this.title.num = items.length;
          } else {
            this.items = response.data;
            this.title.num = response.data.length;
          }
        });
    },
    // 回到顶部
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
    // 检查是否有某标签
    checkLabel(label, data) {
      if (label) {
        var newitems = [];
        for (var i = 0; i < data.length; i++) {
          var labels = (data[i].label || "").split("_");
          if (labels.includes(label)) {
            newitems.push(data[i]);
          }
        }
        return newitems;
      }
      return false;
    },
    // 下面四个函数供筛选框使用
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
        var price = this.originData[i].price;
        if (
          (list.includes("1") && price <= 50) ||
          (list.includes("2") && price <= 100 && price > 50) ||
          (list.includes("3") && price > 100)
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
    // 点击搜索框
    onSelect() {
      if (this.input) {
        var cities =
          "全部;上海市嘉定区浦东区黄埔区朱家松江区普陀区;北京市东城区昌平区海淀区丰台区西城区;南京市秦淮区玄武区栖霞区江宁区;重庆市沙坪坝区武隆区北碚区九龙坡区渝中区大足区丰都县渝北区;成都市青羊区都江堰武侯区金牛区成华区";
        if (cities.includes(this.input)) {
          this.$router.push({
            path: "/attraction/city",
            query: { search: this.input },
          });
        } else {
          this.$router.push({
            path: "/attraction/city",
            query: { find: this.input },
          });
        }
      } else {
        this.$notify({
          title: "温馨提醒",
          dangerouslyUseHTMLString: true,
          message:
            "暂无" +
            '"' +
            this.input +
            '"' +
            "相关的信息！&nbsp;请尝试搜索其他关键词！",
          posotion: "top-left",
        });
      }

      if (this.title.city !== "全部") {
        this.addressToLnglat(this.title.city).then((res) => {
          this.center = res.split(",");
        });
      }
    },
    // 改变排序
    Sort(command) {
      if (command == "a") {
        this.sortBy = "热门推荐";
        this.items = this.originData;
      } else if (command == "b") {
        this.sortBy = "低价优先";
        this.items = this.items.sort(function (a, b) {
          return a.price - b.price;
        });
      } else if (command == "c") {
        this.sortBy = "高分优先";
        this.items = this.items.sort(function (a, b) {
          return b.star - a.star;
        });
      } else if (command == "d") {
        this.sortBy = "距离最短";
        this.attractions = [];
        let len = this.items.length;
        for (let i = 0; i < len; i++) {
          this.addressToLnglat(this.items[i].location).then((res) => {
            var distance = AMap.GeometryUtil.distance(
              res.split(","),
              this.Lnglat
            );
            this.attractions.push([distance, this.items[i]]);
            this.attractions.sort(function (a, b) {
              return a[0] - b[0];
            });
            if (this.attractions.length == len) {
              this.items = [];
              for (var j = 0; j < len; j++) {
                this.$set(this.items, j, this.attractions[j][1]);
              }
            }
          });
        }
      }
    },
  },
  created() {
    if (this.$route.query.search) {
      this.title.city = this.$route.query.search;
      this.getAttrbyCity();
    } else if (this.$route.query.find) {
      this.title.city = this.$route.query.find;
      this.gitAttrbyName();
    } else {
      this.title.city = "全部";
      this.getAttrbyCity();
    }
    if (this.$route.query.label) {
      this.label = this.$route.query.label;
      this.$set(this.checkList, 0, this.label);
    }

    if (this.title.city !== "全部") {
      this.addressToLnglat(this.title.city).then((res) => {
        this.Lnglat = this.center = res.split(",");
      });
    }
  },
  mounted() {},
  watch: {
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
};
</script>
