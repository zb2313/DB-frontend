<template>
  <el-container direction="vertical">
    <Header activeIndex="2" />
    <el-main>
      <div class="main">
        <div class="left">
          <div class="title">
            <h1>{{ title.city }}：共{{ title.num }}个景点</h1>
          </div>

          <div class="form2">
            <form>
              <div class="labelForForm2">缩小搜索范围</div>

              <div class="budget">
                <p>预算：</p>
                <el-checkbox-group v-model="checkList1">
                  <el-checkbox label="1">50元以下</el-checkbox>
                  <el-checkbox label="2">50-100元</el-checkbox>
                  <el-checkbox label="3">100元以上</el-checkbox>
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
            </form>
          </div>
        </div>

        <div class="right">
          <div class="search1">
            <el-row>
              <el-col :span="20"
                ><el-input
                  placeholder="地点/景点……"
                  prefix-icon="el-icon-search"
                  v-model="input"
                >
                </el-input
              ></el-col>
              <el-col :span="4"
                ><el-button
                  type="primary"
                  icon="el-icon-search"
                  @click="onSelect"
                  >查询</el-button
                ></el-col
              >
            </el-row>
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
  </el-container>
</template>

<style scoped>
.title {
  font-size: 16px;
}
.search1 {
  width: 650px;
  margin-top: 50px;
  margin-bottom: 30px;
}
.detail {
  float: right;
}
</style>

<script>
import Header from "@/components/Header.vue";
import contentListItem from "@/components/contentListItem.vue";
export default {
  components: {
    Header,
    contentListItem,
  },
  data() {
    return {
      title: {
        city: "广州",
        num: "333",
      },
      checkList1: [],
      checkList2: [],
      items: [],
      orginData: [],
      input: "",
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
      for (var i = 0; i < this.title.num; i++) {
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
        this.orginData = response.data;
      });
  },
};
</script>
