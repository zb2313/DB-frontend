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
          <div class="search1">
            <el-row>
              <el-col :span="20"
                ><el-input
                  placeholder="博物馆、公园……"
                  prefix-icon="el-icon-search"
                  v-model="input2"
                >
                </el-input
              ></el-col>
              <el-col :span="4"
                ><el-button type="primary" icon="el-icon-search"
                  >查询</el-button
                ></el-col
              >
            </el-row>
          </div>
          <div class="contents">
            <contentListItem content.type="游客" />
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
      value: [4, 8],
      checkList1: [],
      checkList2: [],
    };
  },
};
</script>
