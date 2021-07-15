<template>
  <el-container direction="vertical">
    <Header activeIndex="1" />
    <el-main>

      <div class="Form">
        <el-form :inline="true" :model="form_Select" class="form-inline">
          <el-form-item>
            <el-input
              v-model="form_Select.location"
              placeholder="目的地？"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="form_Select.number1"
              placeholder="人数"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="form_Select.number2"
              placeholder="房间数 "
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="tuijian">
        <h2>热门推荐</h2>
      </div>

      <div class="all clearfix">
        <div
          class="city"
          style="
            background: url(https://cf.bstatic.com/xdata/images/city/540x270/683830.webp?k=cd9dac81254fc90e53f4c05635b61cedade3b1609f9676e3e636d8974a0fcb0a&o=);
          "
        >
          <a class="url" href="http://localhost:8080/hotel/city?search=上海"
            >上海</a
          >
        </div>
        <div
          class="city"
          style="
            background: url(https://cf.bstatic.com/xdata/images/city/540x270/683765.webp?k=00061c9094e7e1fb27820678f5f7395fac52b2486b5d8e372915b5ddd5a61786&o=);
          "
        >
          <a class="url" href="http://localhost:8080/hotel/city?search=广州"
            >广州</a
          >
        </div>
        <div
          class="city"
          style="
            background: url(https://cf.bstatic.com/xdata/images/city/540x270/683773.webp?k=9640b12fb650a6950b4de10177c4226086a27208298642c4758dfd1832b73aae&o=);
          "
        >
          <a class="url" href="http://localhost:8080/hotel/city?search=桂林"
            >桂林</a
          >
        </div>
        <div
          class="city"
          style="
            background: url(https://cf.bstatic.com/xdata/images/city/540x270/683677.webp?k=b81f21cfcce3f7fb99c0f80b37b2f5b7dde081c02598e74f6f39cfd90bfc114e&o=);
          "
        >
          <a class="url" href="http://localhost:8080/hotel/city?search=北京"
            >北京</a
          >
        </div>
        <div
          class="city"
          style="
            background: url(https://cf.bstatic.com/xdata/images/city/540x270/683699.webp?k=51677c1ca3ac4186ed7747dc52511a43ec7de7ddb02b880dc689e99c4a4bc91f&o=);
          "
        >
          <a class="url" href="http://localhost:8080/hotel/city?search=重庆"
            >重庆</a
          >
        </div>
        <div
          class="city"
          style="
            background: url(https://cf.bstatic.com/xdata/images/city/540x270/619299.webp?k=f8a7bb80ec633fcf1e09ceef6f1aee0a619bac60954291614c09977b543a5ead&o=);
          "
        >
          <a class="url" href="http://localhost:8080/hotel/city?search=洱源"
            >洱源</a
          >
        </div>
        <div
          class="city"
          style="
            background: url(https://cf.bstatic.com/xdata/images/city/540x270/691634.webp?k=ddf54cbd0699b6686e4188cfd3b8725ab21bc25c4f8d2e6b5a498bbff341c0e4&o=);
          "
        >
          <a class="url" href="http://localhost:8080/hotel/city?search=大理"
            >大理</a
          >
        </div>
        <div
          class="city"
          style="
            background: url(https://cf.bstatic.com/xdata/images/city/540x270/683728.webp?k=61585e2417bda63b6434e1c0b1b8ceaf97f3e0586b4fd700f272ca439f8f5486&o=);
          "
        >
          <a class="url" href="http://localhost:8080/hotel/city?search=成都"
            >成都</a
          >
        </div>
        <div
          class="city"
          style="
            background: url(https://cf.bstatic.com/xdata/images/city/540x270/683818.webp?k=719bc7f3d7f0799c550bcfe84bfe3b36d77a364ce91984701f3caa1909414eb5&o=);
          "
        >
          <a class="url" href="http://localhost:8080/hotel/city?search=三亚"
            >三亚</a
          >
        </div>
      </div>
      <el-divider></el-divider>
      <p>版权所有@idontkonw</p>
    </el-main>
  </el-container>
</template>

<style scoped>
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}

.clearfix:before,
.clearfix:after {
  content: "";
  display: table;
}

.clearfix:after {
  clear: both;
}
.clearfix {
  *zoom: 1;
}

.Form {
  margin-top: 5px;
}
.all {
  width: 1100px;
  margin: 0 auto;
}
.url {
  display: block;
  width: 100%;
  height: auto;
}
.city {
  width: 350px;
  height: 200px;
  background-color: rgb(85, 124, 150);
  float: left;
  margin: 5px 5px;
  font-family: "Times New Roman", Times, serif;
  font-size: 40px;

  line-height: 250px;
  color: white;
}
p {
  text-indent: 64px;
  text-align-last: left;
  font-size: 7px;
}
</style>

<script>
import Header from "@/components/Header.vue";
export default {
  components: {
    Header,
  },
  data() {
    return {
      activeIndex: "1",
      form_Select: {
        location: "",
        number1: "",
        number2: "",
      },
    };
  },
  methods: {
    onSubmit() {
      this.$router.push({
        path: "/hotel/city",
        query: { search: this.form_Select.location },
      });
    },
  },
};
</script>
