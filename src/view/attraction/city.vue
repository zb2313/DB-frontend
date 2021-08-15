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
          <div class="amap-wrap">
            <el-amap vid="amapDemo"></el-amap>
          </div>

          <div class="form2">
            <div class="labelForForm2">缩小搜索范围</div>

            <div class="type">
              <p>类别</p>
              <el-checkbox-group v-model="checkList">
                <el-checkbox label="1">地标</el-checkbox>
                <el-checkbox label="2">博物馆</el-checkbox>
                <el-checkbox label="3">亲子</el-checkbox>
                <el-checkbox label="4">自然</el-checkbox>
                <el-checkbox label="3">蜜月</el-checkbox>
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
                <el-checkbox label="1">好极了：5分</el-checkbox>
                <el-checkbox label="2">非常好：4分</el-checkbox>
                <el-checkbox label="3">一般般：3分</el-checkbox>
                <el-checkbox label="4">不太好：2分</el-checkbox>
                <el-checkbox label="5">非常差：1分</el-checkbox>
              </el-checkbox-group>
            </div>

            <div class="select" @click="Select">点击筛选</div>
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
              <el-dropdown @command="handleCommand">
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
                  :price="item.price"
                  :ID="item.attractionid"
                  :dianping_number="item.commentnum"
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
  text-align: right;
}
.title {
  font-size: 16px;
  text-align: left;
}
/* 地图css */
.amap-wrap {
  width: 270px;
  height: 300px;
  margin-top: 15px;
  border: 1px solid rgb(189, 178, 178);
  border-radius: 3px;
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

.select {
  height: 50px;
  line-height: 50px;
  cursor: pointer;
  color: white;
  font-size: 17px;
  font-weight: 600;
  background-color: #0071c2;
  text-align: center;
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

export default {
  components: {
    Header,
    contentListItem,
    Footer1,
  },
  data() {
    return {
      title: {
        city: "广州",
        num: "333",
      },
      checkList: [],
      checkList1: [],
      checkList2: [],
      items: [],
      orginData: [],
      input: "",
      sortBy: "热门推荐",
    };
  },
  methods: {
    onSelect() {
      if (this.input) {
        this.title.city = this.input;
        this.$axios
          .get(
            "http://49.234.18.247:8080/api/FunGetCommentNumByAttLocation/" +
              this.title.city
          )
          .then((response) => {
            this.items = response.data.sort(function (a, b) {
              return b.star - a.star;
            });
            this.title.num = response.data.length;
          });
      }
    },
    Select() {
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
        } else if (this.checkList1.includes("1") && this.items[i].price <= 50) {
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
          this.items[i].price > 50 &&
          this.items[i].price <= 100
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
        } else if (this.checkList1.includes("3") && this.items[i].price > 100) {
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
    handleCommand(command) {
      if (command == "a") {
        this.sortBy = "热门推荐";
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
      }
    },
  },
  created() {
    if (this.$route.query.search) {
      this.title.city = this.$route.query.search;
    } else {
      this.title.city = "全部";
    }
  },
  mounted() {
    this.$axios
      .get(
        "http://49.234.18.247:8080/api/FunGetCommentNumByAttLocation/" +
          this.title.city
      )
      .then((response) => {
        this.items = response.data.sort(function (a, b) {
          return b.star - a.star;
        });
        this.title.num = response.data.length;
        this.orginData = JSON.parse(JSON.stringify(response.data));
      });
  },
};
</script>
