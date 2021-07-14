<template>
  <el-row type="flex">
    <el-col :span="16"
      ><div>
        <el-input v-model="input" placeholder="地名、景点"></el-input></div
    ></el-col>
    <el-col :span="2"
      ><div>
        <el-button type="primary" icon="el-icon-search" @click="onSearch"
          >搜索</el-button
        >
      </div></el-col
    >
  </el-row>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      input: "",
    };
  },
  methods: {
    onSearch() {
      this.$router.push({
        path: "/attraction/city",
        query: { search: this.input },
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
