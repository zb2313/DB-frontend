<template>
  <div class="attrHome">
    <Header activeIndex="2" />
    <div class="search">
      <div class="block">
        <div class="">
          <h1>搜索预订美好体验</h1>
          <p>发现目的地更多精彩活动，尽享欢乐旅程</p>
        </div>
        <Search />
      </div>
    </div>
    <div class="main">
      <h3>热门目的地</h3>
      <div class="mainDest">
        <router-link to="/attraction/city?search=北京"
          ><div
            class="attrBox"
            :style="{
              backgroundImage: 'url(' + baseImg1 + ')',
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat',
            }"
          >
            北京
          </div></router-link
        >
        <router-link to="/attraction/city?search=上海"
          ><div
            class="attrBox"
            :style="{
              backgroundImage: 'url(' + baseImg2 + ')',
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat',
            }"
          >
            上海
          </div></router-link
        >
        <router-link to="/attraction/city?search=南京"
          ><div
            class="attrBox"
            :style="{
              backgroundImage: 'url(' + baseImg3 + ')',
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat',
            }"
          >
            南京
          </div></router-link
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
html,
body,
#app {
  height: 100%;
  margin: 0px;
  padding: 0px;
}

.search {
  background: #f2f2f2;
  padding: 64px 32px;
}

.main h3 {
  text-indent: 5px;
}

.mainDest div {
  float: left;
}

.attrBox {
  width: 350px;
  height: 200px;
  margin: 5px;
  color: #fff;
  text-align: center;
  line-height: 170px;
}

.block {
  margin: 0 auto;
  width: 61.8%;
}
</style>

<script>
// @ is an alias to /src
import Search from "@/components/Search.vue";
import Header from "@/components/Header.vue";

export default {
  name: "Home",
  components: {
    Search,
    Header,
  },
  data() {
    return {
      baseImg1:
        "https://cf.bstatic.com/xdata/images/city/540x270/683677.webp?k=b81f21cfcce3f7fb99c0f80b37b2f5b7dde081c02598e74f6f39cfd90bfc114e&o=",
      baseImg2:
        "https://cf.bstatic.com/xdata/images/city/540x270/683830.webp?k=cd9dac81254fc90e53f4c05635b61cedade3b1609f9676e3e636d8974a0fcb0a&o=",
      baseImg3:
        "https://ac-q-cf.static.booking.cn/xdata/images/city/540x270/683805.webp?k=f17521ef2323b4e61ed402abfa5988ba05ea0898a63bf36c86318a0a42039cfa&o=",
    };
  },
};
</script>

