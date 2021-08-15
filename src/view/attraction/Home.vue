<template>
  <el-container direction="vertical">
    <Header activeIndex="2" />

    <div class="Form"></div>
    <div class="searchBox"></div>

    <!-- 热门目的地 -->
    <div class="main hot">
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
            class="attrBox margin"
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
            class="attrBox margin"
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

    <div class="main"><el-divider></el-divider></div>

    <!-- 产品优势 -->
    <div class="main advantage">
      <h3>找我们就对了</h3>
      <ul style="margin-top: 20px">
        <li>
          <img src="../../assets/img/attraction.svg" />
          <div>
            <h4>探索热门景点</h4>
            <p>尽情体验目的地，著名景点、观光导览和丰富活动等你来</p>
          </div>
        </li>
        <li>
          <img src="../../assets/img/book.svg" style="margin-left: 34px" />
          <div>
            <h4>快速又灵活</h4>
            <p>在线订票仅需几分钟，许多景点支持免费取消</p>
            <br />
          </div>
        </li>
        <li>
          <img
            src="../../assets/img/service-staff.svg"
            style="margin-left: 34px"
          />
          <div>
            <h4>随时提供支持</h4>
            <p>旅道客服团队7x24小时提供专业帮助</p>
            <br />
          </div>
        </li>
      </ul>
    </div>

    <div class="main"><el-divider></el-divider></div>

    <div class="main more">
      <h3>探索更多目的地</h3>
      <div class="menubox">
        <el-menu
          default-active="1"
          mode="horizontal"
          active-text-color="#003680"
        >
          <el-menu-item index="1"> 华东</el-menu-item>
          <el-menu-item index="2"> 华南</el-menu-item>
          <el-menu-item index="3"> 华北</el-menu-item>
          <el-menu-item index="4"> 华中</el-menu-item>
          <el-menu-item index="5"> 东北</el-menu-item>
          <el-menu-item index="6"> 西南</el-menu-item>
          <el-menu-item index="7"> 西北</el-menu-item>
          <el-menu-item index="8"> 东南</el-menu-item>
          <el-menu-item index="9"> 青藏</el-menu-item>
        </el-menu>
      </div>
    </div>
    <div class="main moreCity">
      <div
        class="box"
        v-for="item in moreCity"
        :key="item.index"
        :style="{
          backgroundImage: 'url(' + item.img + ')',
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
        }"
      >
        <div class="mask">
          <div class="text">
            <h4>{{ item.cityname }}</h4>
            <p>{{ item.num }}项</p>
          </div>
        </div>
      </div>
    </div>
    <Footer1 />
  </el-container>
</template>

<style scoped>
/* 搜索框 */
.Form {
  width: 100%;
  height: 130px;
  /* margin-bottom: -105px; */
  text-align: center;
  background-color: #f2f2f2;
}

/* 展示区域公用 */
h3 {
  font-size: 20px;
}
.el-divider--horizontal {
  width: 1100px;
}

/* 热门推荐 */
.hot {
  height: 245px;
  margin-top: 25px;
  margin-bottom: 15px;
}
.mainDest {
  margin-top: 20px;
  width: 100%;
  height: 200px;
}

.attrBox {
  float: left;
  width: 352px;
  height: 100%;
  color: #fff;
  text-align: center;
  line-height: 200px;
  border-radius: 2px;
}

.margin {
  margin-left: 20px;
}
/* 产品优势 */
.advantage {
  height: 125px;
  margin-top: 5px;
}
.advantage img,
.advantage li,
.advantage div {
  display: inline-block;
}
.advantage li {
  width: 366px;
  height: 60px;
}
.advantage img {
  margin-bottom: 25px;
}
.advantage div {
  width: 290px;
  margin-left: 8px;
}
.advantage p {
  font-size: 13px;
  margin-top: 5px;
}

/* 更多目的地 */
.more {
  margin-top: 5px;
}
.el-menu--horizontal > .el-menu-item {
  height: 50px;
  color: gray;
}
.moreCity {
  margin-top: 15px;
  margin-bottom: 30px;
}
.moreCity .box {
  float: left;
  margin: 5px;
  width: 264px;
  height: 150px;
  border-radius: 2px;
}
.mask {
  width: 264px;
  height: 150px;
  color: white;
  text-indent: 5px;
  border-radius: 2px;
  background: rgba(161, 159, 159, 0.3);
}
.mask p {
  font-size: 12px;
}
.mask .text {
  position: relative;
  top: 110px;
  width: 100%;
  height: 50px;
}

.block {
  margin: 0 auto;
  width: 61.8%;
}

.el-button {
  background-color: #003680;
  border: none;
}
</style>

<script>
import Header from "@/components/Header.vue";
import Footer1 from "@/components/Footer1.vue";

export default {
  name: "Home",
  components: {
    Header,
    Footer1,
  },
  data() {
    return {
      input: "",
      moreCity: [
        {
          cityname: "上海",
          num: 20,
          img: "https://ac-q-cf.static.booking.cn/xdata/images/city/540x270/683805.webp?k=f17521ef2323b4e61ed402abfa5988ba05ea0898a63bf36c86318a0a42039cfa&o=",
        },
        {
          cityname: "杭州",
          num: 20,
          img: "https://ac-q-cf.static.booking.cn/xdata/images/city/540x270/683805.webp?k=f17521ef2323b4e61ed402abfa5988ba05ea0898a63bf36c86318a0a42039cfa&o=",
        },
        {
          cityname: "嘉兴",
          num: 20,
          img: "https://ac-q-cf.static.booking.cn/xdata/images/city/540x270/683805.webp?k=f17521ef2323b4e61ed402abfa5988ba05ea0898a63bf36c86318a0a42039cfa&o=",
        },
        {
          cityname: "苏州",
          num: 20,
          img: "https://ac-q-cf.static.booking.cn/xdata/images/city/540x270/683805.webp?k=f17521ef2323b4e61ed402abfa5988ba05ea0898a63bf36c86318a0a42039cfa&o=",
        },
        {
          cityname: "无锡",
          num: 20,
          img: "https://ac-q-cf.static.booking.cn/xdata/images/city/540x270/683805.webp?k=f17521ef2323b4e61ed402abfa5988ba05ea0898a63bf36c86318a0a42039cfa&o=",
        },
        {
          cityname: "南京",
          num: 20,
          img: "https://ac-q-cf.static.booking.cn/xdata/images/city/540x270/683805.webp?k=f17521ef2323b4e61ed402abfa5988ba05ea0898a63bf36c86318a0a42039cfa&o=",
        },
        {
          cityname: "舟山",
          num: 20,
          img: "https://ac-q-cf.static.booking.cn/xdata/images/city/540x270/683805.webp?k=f17521ef2323b4e61ed402abfa5988ba05ea0898a63bf36c86318a0a42039cfa&o=",
        },
        {
          cityname: "宁波",
          num: 20,
          img: "https://ac-q-cf.static.booking.cn/xdata/images/city/540x270/683805.webp?k=f17521ef2323b4e61ed402abfa5988ba05ea0898a63bf36c86318a0a42039cfa&o=",
        },
      ],
      baseImg1:
        "https://cf.bstatic.com/xdata/images/city/540x270/683677.webp?k=b81f21cfcce3f7fb99c0f80b37b2f5b7dde081c02598e74f6f39cfd90bfc114e&o=",
      baseImg2:
        "https://cf.bstatic.com/xdata/images/city/540x270/683830.webp?k=cd9dac81254fc90e53f4c05635b61cedade3b1609f9676e3e636d8974a0fcb0a&o=",
      baseImg3:
        "https://ac-q-cf.static.booking.cn/xdata/images/city/540x270/683805.webp?k=f17521ef2323b4e61ed402abfa5988ba05ea0898a63bf36c86318a0a42039cfa&o=",
    };
  },
  methods: {
    // onSearch() {
    //   this.$router.push({
    //     path: "/attraction/city",
    //     query: { search: this.input },
    //   });
    // },
  },
};
</script>

