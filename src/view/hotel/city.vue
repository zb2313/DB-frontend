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
              <el-amap vid="amapDemo"></el-amap>
            </div>
          </el-dialog>
          <!-- 筛选框 -->
          <div class="form2">
            <div class="labelForForm2">缩小搜索范围</div>

            <!-- 按类别筛选 -->
            <div class="type">
              <p>类别</p>
              <el-checkbox-group v-model="checkList">
                <el-checkbox label="1">民宿</el-checkbox>
                <el-checkbox label="2">酒店公寓</el-checkbox>
                <el-checkbox label="3">带娃爱住</el-checkbox>
                <el-checkbox label="4">闪住</el-checkbox>
                <el-checkbox label="5">浪漫情侣</el-checkbox>
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
                <el-checkbox label="1">好极了：5分</el-checkbox>
                <el-checkbox label="2">非常好：4分</el-checkbox>
                <el-checkbox label="3">一般般：3分</el-checkbox>
                <el-checkbox label="4">不太好：2分</el-checkbox>
                <el-checkbox label="5">非常差：1分</el-checkbox>
              </el-checkbox-group>
            </div>

            <div class="select" @click="Select">筛选</div>
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

.select {
  height: 50px;
  line-height: 50px;
  cursor: pointer;
  color: white;
  font-size: 17px;
  font-weight: 600;
  background-color: #0071c2;
}
.type,
.budget,
.grade {
  border-bottom: 1px solid rgb(189, 178, 178);
}

.select:hover,
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
export default {
  components: {
    Header,
    contentListItem,
    Footer1,
  },
  data() {
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
      dialogVisible: false,
      checkList: [],
      checkList1: [],
      checkList2: [],
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
    Select: function () {
      var newitems = [];
      this.items = this.orginData;
      for (var i = 0; i < this.items.length; i++) {
        if (!this.checkList1.length) {
          if (!this.checkList2.length) {
            newitems.push(this.items[i]);
          } else if (
            this.items[i].star === 5 &&
            this.checkList2.includes("1")
          ) {
            newitems.push(this.items[i]);
          } else if (
            this.items[i].star === 4 &&
            this.checkList2.includes("2")
          ) {
            newitems.push(this.items[i]);
          } else if (
            this.items[i].star === 3 &&
            this.checkList2.includes("3")
          ) {
            newitems.push(this.items[i]);
          } else if (
            this.items[i].star === 2 &&
            this.checkList2.includes("4")
          ) {
            newitems.push(this.items[i]);
          } else if (
            this.items[i].star === 1 &&
            this.checkList2.includes("5")
          ) {
            newitems.push(this.items[i]);
          }
        } else if (
          this.checkList1.includes("1") &&
          this.items[i].lowestprice <= 200
        ) {
          if (!this.checkList2.length) {
            newitems.push(this.items[i]);
          } else if (
            this.items[i].star === 5 &&
            this.checkList2.includes("1")
          ) {
            newitems.push(this.items[i]);
          } else if (
            this.items[i].star === 4 &&
            this.checkList2.includes("2")
          ) {
            newitems.push(this.items[i]);
          } else if (
            this.items[i].star === 3 &&
            this.checkList2.includes("3")
          ) {
            newitems.push(this.items[i]);
          } else if (
            this.items[i].star === 2 &&
            this.checkList2.includes("4")
          ) {
            newitems.push(this.items[i]);
          } else if (
            this.items[i].star === 1 &&
            this.checkList2.includes("5")
          ) {
            newitems.push(this.items[i]);
          }
        } else if (
          this.checkList1.includes("2") &&
          this.items[i].lowestprice > 200 &&
          this.items[i].lowestprice <= 500
        ) {
          if (!this.checkList2.length) {
            newitems.push(this.items[i]);
          } else if (
            this.items[i].star === 5 &&
            this.checkList2.includes("1")
          ) {
            newitems.push(this.items[i]);
          } else if (
            this.items[i].star === 4 &&
            this.checkList2.includes("2")
          ) {
            newitems.push(this.items[i]);
          } else if (
            this.items[i].star === 3 &&
            this.checkList2.includes("3")
          ) {
            newitems.push(this.items[i]);
          } else if (
            this.items[i].star === 2 &&
            this.checkList2.includes("4")
          ) {
            newitems.push(this.items[i]);
          } else if (
            this.items[i].star === 1 &&
            this.checkList2.includes("5")
          ) {
            newitems.push(this.items[i]);
          }
        } else if (
          this.checkList1.includes("3") &&
          this.items[i].lowestprice > 500
        ) {
          if (!this.checkList2.length) {
            newitems.push(this.items[i]);
          } else if (
            this.items[i].star === 5 &&
            this.checkList2.includes("1")
          ) {
            newitems.push(this.items[i]);
          } else if (
            this.items[i].star === 4 &&
            this.checkList2.includes("2")
          ) {
            newitems.push(this.items[i]);
          } else if (
            this.items[i].star === 3 &&
            this.checkList2.includes("3")
          ) {
            newitems.push(this.items[i]);
          } else if (
            this.items[i].star === 2 &&
            this.checkList2.includes("4")
          ) {
            newitems.push(this.items[i]);
          } else if (
            this.items[i].star === 1 &&
            this.checkList2.includes("5")
          ) {
            newitems.push(this.items[i]);
          }
        }
      }
      this.items = newitems;
      this.title.num = newitems.length;
    },
    cutLabel(str) {
      var labels = str.split("_");
      var res = [];
      for (var i = 0; i < labels.length; i++) {
        res.push(labels[i]);
      }
      console.log(res);
      return res;
    },
  },
  created() {
    this.$axios
      .get(
        "http://49.234.18.247:8080/api/FunGetCommentNumByHotelLocation/" +
          this.title.city
      )
      .then((response) => {
        for (var i = 0; i < response.data.length; i++) {
          response.data[i].hotelname = response.data[i].hotelname.split("(")[0];
          response.data[i].location = this.fun_hotel_district(
            response.data[i].location
          );
        }
        this.items = response.data.sort(function (a, b) {
          return a.lowestprice - b.lowestprice;
        });
        this.title.num = response.data.length;
        this.orginData = JSON.parse(JSON.stringify(response.data));
      });
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
  },
  mounted() {
    this.searchForm.date1 = Date.now();
    this.searchForm.date2 = Date.now() + 8.64e7;
  },
};
</script>
