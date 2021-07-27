<template>
  <el-container direction="vertical">
    <Header activeIndex="1" />
    <el-main>
      <div class="main">
        <div class="left">
          <div class="form1">
            <h2></h2>

              <label>目的地</label>
              <input type="text" v-model="form1.location" placeholder="广州" />
              <label>人数</label>
              <input type="text" v-model="form1.people" placeholder="1" />
              <label>房间数</label>
              <input type="text" v-model="form1.room" placeholder="1" />
              <div>
                <button @click="find">搜索</button>
              </div>

          </div>

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
        </div>

        <div class="right">
          <div class="title">
            <h1>{{ title.city }}：共{{ title.num }}家住宿</h1>
          </div>

          <div class="sort">
            <el-radio-group
              v-model="radio"
              @change="sortClick"
              style="margin-bottom: 100px"
            >
              <el-radio-button label="1">优先显示低价住宿</el-radio-button>
              <el-radio-button label="2">优先显示高评分住宿</el-radio-button>
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
      </div>
    </el-main>
  </el-container>
</template>

<style scoped>
.form1 {
  background-color: #ffc48a;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 5px;
}

.form1 label {
  display: block;
  text-align-last: left;
  font-size: 6px;
  margin-left: 48px;
}

.form1 input {
  width: 150px;
  margin-bottom: 8px;
}
.form1 button {
  margin-top: 20px;
  width: 80px;
}

.sort {
  height: 60px;
  text-align: left;
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
      form1: {
        location: "",
        room: "",
        people: "",
      },
      checkList1: [],
      checkList2: [],
      title: {
        city: "广州",
        num: 400,
      },
      radio: "1",
      items: [],
      orginData: [],
    };
  },
  methods: {
    find() {
      if (this.form1.location) {
        this.title.city = this.form1.location;
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
          });
      }
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
  },
  created() {
    this.form1.location = this.$route.query.search;
    if (this.$route.query.search) {
      this.title.city = this.$route.query.search;
    } else {
      this.title.city = "全部";
    }

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
};
</script>
