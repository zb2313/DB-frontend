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
      label: "",
      checkList: [],
      checkList1: [],
      checkList2: [],
      withList: [],
      withList1: [],
      withList2: [],
      items: [],
      originData: [],
      input: "",
      sortBy: "热门推荐",
    };
  },
  methods: {
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
    onSelect() {
      if (this.input) {
        var cities = "北京市上海市重庆市成都市苏州市南京市";
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
    },
    // 改变排序
    Sort(command) {
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
