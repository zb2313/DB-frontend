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
        <div class="attrBox">北京</div>
        <div class="attrBox">上海</div>
        <div class="attrBox">南京</div>
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
  background: no-repeat center/100%
    url(https://tse1-mm.cn.bing.net/th/id/R-C.f79fd9e6223bc5658d329a5d5093114b?rik=EqFkznLcD%2bW1pw&riu=http%3a%2f%2fimg.mp.itc.cn%2fupload%2f20170103%2f6c44acfb4cdc49da98da2556b141bf48_th.jpg&ehk=9kvZqZf1mrI16XNH84PrHtJ1xu9n%2bJR572cGDsYvX7o%3d&risl=&pid=ImgRaw);
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
};
</script>

