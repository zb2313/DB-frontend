<template>
  <el-container direction="vertical">
    <Header activeIndex="4" />

    <el-main>
      <div class="main"></div>
    </el-main>
    <Footer1 />
  </el-container>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer1 from "@/components/Footer1.vue";
export default {
  components: {
    Header,
    Footer1,
  },
};
</script>
