<template>
  <el-container direction="vertical">
    <Header activeIndex="1" />
    <el-main>
      <div class="main">
        <div class="left">
          <div class="form1">
            <h2></h2>
            <form action="" method="post">
              <label for="lacation">目的地</label>
              <input type="text" v-model="form1.location" placeholder="广州" />
              <label for="people">人数</label>
              <input type="text" v-model="form1.people" placeholder="1" />
              <label for="room">房间数</label>
              <input type="text" v-model="form1.room" placeholder="1" />
              <div>
                <button type="submit">搜索</button>
              </div>
            </form>
          </div>

          <div class="form2">
            <form action="">
              <div class="labelForForm2">缩小搜索范围</div>

              <div class="budget">
                <p>预算：</p>
                <el-checkbox-group v-model="checkList1">
                  <el-checkbox label="200元以下"></el-checkbox>
                  <el-checkbox label="200-300元"></el-checkbox>
                  <el-checkbox label="300-400元"></el-checkbox>
                  <el-checkbox label="400-500元"></el-checkbox>
                  <el-checkbox label="500元以上"></el-checkbox>
                </el-checkbox-group>
              </div>

              <div class="grade">
                <p>评分：</p>
                <el-checkbox-group v-model="checkList2">
                  <el-checkbox label="好极了：5分"></el-checkbox>
                  <el-checkbox label="非常好：4分"></el-checkbox>
                  <el-checkbox label="一般般：3分"></el-checkbox>
                  <el-checkbox label="不太好：2分"></el-checkbox>
                  <el-checkbox label="非常差：1分"></el-checkbox>
                </el-checkbox-group>
              </div>

              <div class="select">
                <button type="submit">筛选</button>
              </div>
            </form>
          </div>
        </div>

        <div class="right">
          <div class="title">
            <h1>{{ title.city }}：共{{ title.num }}家住宿</h1>
          </div>

          <div class="sort">
            <el-radio-group v-model="radio" style="margin-bottom: 100px">
              <el-radio-button label="热门推荐">热门推荐</el-radio-button>
              <el-radio-button label="价格">优先显示低价住宿</el-radio-button>
              <el-radio-button label="距离"
                >优先显示距离较近住宿</el-radio-button
              >
              <el-radio-button label="评分">优先显示高评分住宿</el-radio-button>
            </el-radio-group>
          </div>
          <div class="contents">
            <ul>
              <li v-for="item in items" :key="item.hoteL_NAME">
                <contentListItem
                  :title="item.hoteL_NAME"
                  :address="item.hlocation"
                  :grade="item.star"
                  type="房客"
                  :price="250"
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
      radio: "热门推荐",
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    onSubmit() {
      console.log("submit!");
    },
  },
  created() {
    this.form1.location = this.$route.query.search;
    if (this.$route.query.search) {
      this.title.city = this.$route.query.search;
    } else {
      this.title.city = "全部";
    }
  },
  mounted() {
    this.$axios.get("http://49.234.18.247:8080/api/Hotel").then((response) => {
      this.items = response.data;
    });
  },
};
</script>