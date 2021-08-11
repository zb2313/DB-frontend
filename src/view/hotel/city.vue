<template>
  <el-container direction="vertical">
    <Header activeIndex="1" />
    <div class="Form"></div>
    <Search />
    <el-main>
      <div class="main">
        <!-- <div class="left">
          <div class="form2">
            <div class="labelForForm2">缩小搜索范围</div>
            <div class="budget">
              <p>预算：</p>
              <el-checkbox-group v-model="checkList1">
                <el-checkbox label="1">200元以下</el-checkbox>
                <el-checkbox label="2">200-500元</el-checkbox>
                <el-checkbox label="3">500元以上</el-checkbox>
              </el-checkbox-group>
            </div>

            <div class="grade">
              <p>评分：</p>
              <el-checkbox-group v-model="checkList2">
                <el-checkbox label="1">好极了：5分</el-checkbox>
                <el-checkbox label="2">非常好：4分</el-checkbox>
                <el-checkbox label="3">一般般：3分</el-checkbox>
                <el-checkbox label="4">不太好：2分</el-checkbox>
                <el-checkbox label="5">非常差：1分</el-checkbox>
              </el-checkbox-group>
            </div>

            <div class="select">
              <button @click="Select">筛选</button>
            </div>
          </div>
        </div> -->

        <div class="left">
          <!-- <div class="title">
            <h1>{{ title.city }}：共{{ title.num }}家住宿</h1>
          </div> -->

          <div class="sort">
            <el-radio-group
              v-model="radio"
              @change="sortClick"
              style="margin-bottom: 100px"
            >
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
                />
              </li>
            </ul>
          </div>
        </div>

        <div class="right">
          <div class="amap-wrap">
            <el-amap vid="amapDemo"></el-amap>
          </div>
        </div>
      </div>
    </el-main>
    <Footer1 />
  </el-container>
</template>

<style scoped>
.Form {
  width: 100%;
  height: 130px;
  margin-bottom: -105px;
  text-align: center;
  background-color: #f2f2f2;
}

.main {
  margin-top: 40px;
}
.left {
  width: 750px;
  text-align: left;
}
.right {
  position: absolute;
  top: 346px;
  left: 881px;
  width: 300px;
  height: 350px;
  border-radius: 2px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.amap-wrap {
  width: 100%;
  height: 100%;
}

.title {
  font-size: 20px;
  text-align: left;
}

.sort {
  height: 60px;
  text-align: left;
}

.form2 {
  margin-top: 15px;
  border-radius: 5px;
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
  margin-bottom: 18px;
}

.el-checkbox-group {
  padding-left: 60px;
  width: 90px;
}
.form2 p {
  font-size: 15px;
  text-align: left;
  text-indent: 25px;
}

.select {
  height: 50px;
  line-height: 50px;
}

.select button {
  width: 80px;
}

.budget,
.grade {
  border-bottom: 1px solid rgb(189, 178, 178);
}
</style>

<script>
import Header from "@/components/Header.vue";
import contentListItem from "@/components/contentListItem.vue";
import Search from "@/components/Search.vue";
import Footer1 from "@/components/Footer1.vue";
export default {
  components: {
    Header,
    contentListItem,
    Search,
    Footer1,
  },
  data() {
    return {
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
    handleTabFix() {
      let box = document.querySelector(".right");
      if (window.pageYOffset > box.offsetTop) {
        box.style.position = "fixed";
        box.style.top = "115px";
      }
      if (window.pageYOffset < box.offsetTop) {
        box.style.position = "absolute";
        box.style.top = "346px";
      }
    },
  },
  created() {
    this.$axios
      .get(
        "http://49.234.18.247:8080/api/FunGetCommentNumByHotelLocation/" +
          this.title.city
      )
      .then((response) => {
        this.items = response.data.sort(function (a, b) {
          return a.lowestprice - b.lowestprice;
        });
        this.title.num = response.data.length;
        this.orginData = JSON.parse(JSON.stringify(response.data));
      });
  },
  // 监听页面滚动
  mounted() {
    window.addEventListener("scroll", this.handleTabFix, true);
  },
  //离开当前组件前一定要清除滚动监听，否则进入其他路由会报错
  beforeRouteLeave(to, from, next) {
    window.removeEventListener("scroll", this.handleTabFix, true);
    next();
  },
};
</script>
