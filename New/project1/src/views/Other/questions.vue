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
        <el-table-column prop="question" width="750"> </el-table-column>
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
  margin-top: 40px;
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
</style>
<script>
import Header1 from "@/components/Header1";
export default {
  components: {
    Header1,
  },
  data() {
    return {
      tableData: [
        {
          question: "我觉得我成为了诈骗案受害者，怎么办？",
          answer:
            "如果您怀疑自己曾接触过以LVDAO名义进行诈骗的案件，建议您尽快与我们联系。",
        },
        {
          question: "是否收取手续费？",
          answer:
            "您不会被收取信用卡手续费。您可在查看订单时了解所付价格的明细。",
        },
        {
          question: "可以开票吗？",
          answer:
            "目前，您可以联系我们要求提供支付确认信息，但该信息并非有法律效力的发票。",
        },
        { question: "谁是世界上最美的女人？", answer: "秦晓慧" },
        { question: "222", answer: "" },
      ],
    };
  },
  methods: {
    click_question(row, column, event, cell) {
      console.log(row);
      const q = row.question;
      const a = row.answer;
      this.$msgbox({
        title: q,
        message: a,
      });
    },
  },
};
</script>