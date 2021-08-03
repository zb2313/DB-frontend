<template>
  <div class="questions">
    <Header1 />
    <el-card class="box-card">
      <div class="head">常见问题解答</div>
      <div class="divide"></div>
      <el-table
        :data="tableData"
        :show-header="false"
        style="width: 100%"
        @cell-click="click_question"
      >
        <el-table-column prop="questioN_NAME" width="750"> </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<style scoped>
.head {
  margin-left: 10px;
  text-align: left;
  font-size: 20px;
  font-weight: bold;
  width: 100%;
  float: left;
  margin-bottom: 10px;
}
.box-card {
  width: 800px;
  margin: auto;
  margin-top: 20px;
}
.divide {
  width: 100%;
  height: 1px;
  background: rgb(167, 165, 165);
  float: left;
}
.el-table::before {
  height: 0;
}
.triangle-left {
  display: inline-block;
  width: 0;
  height: 0;
  margin-left: 200px;
  margin-top: 20px;
  border-top: 15px solid transparent;
  border-right: 25px solid #003680;
  border-bottom: 15px solid transparent;
}
</style>
<script>
import Header1 from "@/components/Header1";
export default {
  components: {
    Header1,
  },
  data() {
    return {
      tableData: [],
    };
  },
  methods: {
    click_question(row) {
      console.log(row);
      const q = row.questioN_NAME;
      const a = row.solution;
      this.$msgbox({
        title: q,
        message: a,
      });
    },
  },

  mounted() {
    let _this = this;
    this.$axios
      .get("http://49.234.18.247:8080/api/Faqs/")
      .then(function (response) {
        console.log(response);
        _this.tableData = response.data;
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};
</script>
