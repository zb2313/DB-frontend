<template>
  <div>
    {{ msg }}
    <div class="click" @click="onClick"></div>
  </div>
</template>

<style scoped>
.click {
  width: 50px;
  height: 50px;
  background-color: red;
}
</style>
<script>
export default {
  data() {
    return {
      msg: "",
      id: "1",
      question: "你好吗？",
      answer: "我不好",
    };
  },
  methods: {
    onClick() {
      this.$axios.put("http://49.234.18.247:8080/api/Faqs/1", {
        questioN_ID: "1",
        questioN_NAME: "你好吗",
        solution: "我不好",
      });
    },
  },
  mounted() {
    this.$axios.get("http://49.234.18.247:8080/api/Faqs").then((response) => {
      this.msg = response.data;
    });
  },
};
</script>
