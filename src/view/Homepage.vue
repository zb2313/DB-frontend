<template>
  <el-container direction="vertical">
    <Header activeIndex="0" />
    <!-- 搜索区域 -->
    <div class="search">
      <div class="block">
        <h1>搜索预订美好体验</h1>
        <p>发现目的地更多精彩活动，尽享欢乐旅程</p>
        <!-- 搜索框 -->
        <el-row type="flex">
          <el-col :span="16"
            ><div>
              <el-input
                v-model="input"
                placeholder="搜索旅行地/酒店/景点……"
              ></el-input></div
          ></el-col>
          <el-col :span="2"
            ><div>
              <el-button type="primary" icon="el-icon-search" @click="onSearch"
                >搜索</el-button
              >
            </div></el-col
          >
        </el-row>
      </div>
    </div>

    <!-- 内容展示区域 -->
    <el-main>
      <div class="attraction main">
        <h2 class="title">
          <span @click="onClick(0, 0)">热门<i v-show="show[0][0]"></i></span>
          <span @click="onClick(0, 1)">周边游<i v-show="show[0][1]"></i></span>
          <span @click="onClick(0, 2)">门票<i v-show="show[0][2]"></i></span>

          <span class="dropdown" style="margin-left: 76%">
            <span style="color: blue; font-size: 14px" class="drop-btn"
              >{{ attrStart }}出发
              <div class="el-icon-caret-bottom"></div
            ></span>
            <div class="drop-content">
              <a
                v-for="item in attrDropdown"
                :key="item.index"
                :href="item.link"
                style="color: black"
                >{{ item.city }}</a
              >
            </div>
          </span>
        </h2>

        <div class="attrBox Box1">
          <div class="rightBox">
            <dl class="keyword-short">
              <dt>热门主题游</dt>
              <dd>
                <span class="entrance-item" title="海岛">
                  <a href="" target="_blank"> 海岛 </a>
                </span>
                <el-divider direction="vertical"></el-divider>
                <span class="entrance-item" title="亲子游">
                  <a href="" target="_blank"> 亲子游 </a>
                </span>
                <el-divider direction="vertical"></el-divider>
                <span class="entrance-item" title="蜜月">
                  <a href="" target="_blank"> 蜜月 </a>
                </span>
              </dd>

              <dd style="margin-top: 10px">
                <span class="entrance-item" title="美食">
                  <a href="" target="_blank"> 美食 </a>
                </span>
                <el-divider direction="vertical"></el-divider>
                <span class="entrance-item" title="古镇">
                  <a href="" target="_blank"> 古镇 </a>
                </span>
                <el-divider direction="vertical"></el-divider>
                <span class="entrance-item" title="星空">
                  <a href="" target="_blank"> 星空 </a>
                </span>
              </dd>
            </dl>

            <dl class="keyword-short" style="margin-top: 30px">
              <dt>热门目的地</dt>
              <dd>
                <span class="entrance-item" title="北京">
                  <a href="" target="_blank"> 北京 </a>
                </span>
                <el-divider direction="vertical"></el-divider>
                <span class="entrance-item" title="上海">
                  <a href="" target="_blank"> 上海 </a>
                </span>
                <el-divider direction="vertical"></el-divider>
                <span class="entrance-item" title="三亚">
                  <a href="" target="_blank"> 三亚 </a>
                </span>
              </dd>

              <dd style="margin-top: 10px">
                <span class="entrance-item" title="南京">
                  <a href="" target="_blank"> 南京 </a>
                </span>
                <el-divider direction="vertical"></el-divider>
                <span class="entrance-item" title="古镇">
                  <a href="" target="_blank"> 乌鲁木齐 </a>
                </span>
                <el-divider direction="vertical"></el-divider>
                <span class="entrance-item" title="成都">
                  <a href="" target="_blank"> 成都 </a>
                </span>
              </dd>
            </dl>
          </div>
          <div class="leftBox">
            <div
              class="attriInfo"
              v-for="(item, index) in attractions.slice(0, 6)"
              :key="index"
            >
              <div
                class="infoImg"
                :style="{
                  backgroundImage: 'url(' + item.img + ')',
                  backgroundSize: '100% 100%',
                  backgroundRepeat: 'no-repeat',
                }"
              ></div>
              <div class="infoDetail">
                <div class="Name" style="font-size: 14px">
                  {{ item.name }}
                </div>
                <img
                  src="../assets/img/star.svg"
                  v-for="i in item.star"
                  :key="i"
                  style="margin-top: 2px"
                />
                <div class="Details">
                  <span class="address">{{ item.address }}</span>
                  <span class="price price1">{{ item.price }}元</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="hotel main">
        <h2 class="title">
          <span @click="onClick(1, 0)"
            >国内酒店<i v-show="show[1][0]"></i
          ></span>
          <span @click="onClick(1, 1)"
            >国外酒店<i v-show="show[1][1]"></i
          ></span>
        </h2>

        <div class="hotelBox Box1">
          <div class="rightBox">
            <dl class="keyword-short">
              <dt>热门地标周边酒店</dt>
              <dd>
                <span class="entrance-item">
                  <a href="" target="_blank"> 还没想好周末去哪玩？</a>
                </span>
              </dd>
            </dl>

            <dl class="keyword-short" style="margin-top: 30px">
              <dt>促销</dt>
              <dd style="margin-top: 10px">
                <span class="entrance-item">
                  <a href="" target="_blank"> 全国火车站周边酒店8折起</a>
                </span>
              </dd>
              <dd style="margin-top: 10px">
                <span class="entrance-item">
                  <a href="" target="_blank"> 全国机场周边酒店8折起</a>
                </span>
              </dd>
              <dd style="margin-top: 10px">
                <span class="entrance-item">
                  <a href="" target="_blank"> 优选酒店80元起</a>
                </span>
              </dd>
            </dl>
          </div>
          <div class="leftBox">
            <div
              class="hotelInfo"
              v-for="(item, index) in hotels.slice(0, 6)"
              :key="index"
            >
              <div
                class="infoImg"
                :style="{
                  backgroundImage: 'url(' + item.img + ')',
                  backgroundSize: '100% 100%',
                  backgroundRepeat: 'no-repeat',
                }"
              ></div>
              <div class="infoDetail">
                <div class="Name" style="font-size: 14px">
                  {{ item.name }}
                </div>
                <img
                  src="../assets/img/diamond.svg"
                  v-for="i in item.star"
                  :key="i"
                  style="margin-top: 2px"
                />
                <div class="Details">
                  <span class="address">{{ item.address }}</span>
                  <span class="Price"
                    ><span class="price"> ￥{{ item.price }}</span
                    ><i>起</i></span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="tickets main">
        <h2 class="title">
          <span @click="onClick(2, 0)"
            >特价机票<i v-show="show[2][0]"></i
          ></span>
          <span @click="onClick(2, 1)"
            >特价火车票<i v-show="show[2][1]"></i
          ></span>

          <span class="dropdown" style="margin-left: 75%">
            <span style="color: blue; font-size: 14px" class="drop-btn"
              >{{ ticketStart }}出发
              <div class="el-icon-caret-bottom"></div
            ></span>
            <div class="drop-content">
              <a
                v-for="item in ticketDropdown"
                :key="item.index"
                :href="item.link"
                style="color: black"
                >{{ item.city }}</a
              >
            </div>
          </span>
        </h2>
        <div class="Box1">
          <div class="ticketBox">
            <div
              class="ticketInfo"
              v-for="item in tickets.slice(0, 14)"
              :key="item.index"
            >
              <div class="item-name">
                {{ item.begin }}
                <div class="dancheng"></div>
                {{ item.end }}
              </div>
              <div class="item-date">
                {{ item.date }}
              </div>
              <div class="item-info">
                <strong>￥{{ item.price }}</strong
                ><i>起</i>
                <div class="item-btn">立抢</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-main>

    <Footer />
  </el-container>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
export default {
  name: "Homepage",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      attrStart: "上海",
      ticketStart: "上海",
      attrDropdown: [
        { link: "https://music.163.com", city: "上海" },
        { link: "https://music.163.com", city: "北京" },
        { link: "https://music.163.com", city: "兰州" },
        { link: "https://music.163.com", city: "南京" },
        { link: "https://music.163.com", city: "重庆" },
        { link: "https://music.163.com", city: "深圳" },
        { link: "https://music.163.com", city: "桂林" },
        { link: "https://music.163.com", city: "苏州" },
      ],
      ticketDropdown: [
        { link: "https://music.163.com", city: "上海" },
        { link: "https://music.163.com", city: "北京" },
        { link: "https://music.163.com", city: "兰州" },
        { link: "https://music.163.com", city: "南京" },
        { link: "https://music.163.com", city: "重庆" },
        { link: "https://music.163.com", city: "深圳" },
        { link: "https://music.163.com", city: "桂林" },
        { link: "https://music.163.com", city: "苏州" },
      ],
      show: [
        [true, false, false],
        [true, false],
        [true, false],
      ],
      attractions: [
        {
          name: "黄渡公园",
          star: 3,
          price: 10,
          address: "同济大学周边",
          img: "https://dimg04.c-ctrip.com/images/300r13000000uv525D82B_C_500_280.jpg",
        },
        {
          name: "黄渡公园",
          star: 3,
          price: 10,
          address: "同济大学周边",
          img: "https://dimg04.c-ctrip.com/images/300r13000000uv525D82B_C_500_280.jpg",
        },
        {
          name: "黄渡公园",
          star: 3,
          price: 10,
          address: "同济大学周边",
          img: "https://dimg04.c-ctrip.com/images/300r13000000uv525D82B_C_500_280.jpg",
        },
        {
          name: "黄渡公园",
          star: 3,
          price: 10,
          address: "同济大学周边",
          img: "https://dimg04.c-ctrip.com/images/300r13000000uv525D82B_C_500_280.jpg",
        },
        {
          name: "黄渡公园",
          star: 3,
          price: 10,
          address: "同济大学周边",
          img: "https://dimg04.c-ctrip.com/images/300r13000000uv525D82B_C_500_280.jpg",
        },
        {
          name: "黄渡公园",
          star: 3,
          price: 10,
          address: "同济大学周边",
          img: "https://dimg04.c-ctrip.com/images/300r13000000uv525D82B_C_500_280.jpg",
        },
        {
          name: "黄渡公园",
          star: 3,
          price: 10,
          address: "同济大学周边",
          img: "https://dimg04.c-ctrip.com/images/300r13000000uv525D82B_C_500_280.jpg",
        },
      ],

      hotels: [
        {
          name: "格林豪泰酒店",
          star: 3,
          price: 400,
          address: "同济大学正门外",
          img: "https://dimg11.c-ctrip.com/images/0AD5d120008nj322zC5A7_R_300_120.jpg",
        },
        {
          name: "格林豪泰酒店",
          star: 3,
          price: 400,
          address: "同济大学正门外",
          img: "https://dimg11.c-ctrip.com/images/0AD5d120008nj322zC5A7_R_300_120.jpg",
        },
        {
          name: "格林豪泰酒店",
          star: 3,
          price: 400,
          address: "同济大学正门外",
          img: "https://dimg11.c-ctrip.com/images/0AD5d120008nj322zC5A7_R_300_120.jpg",
        },
        {
          name: "格林豪泰酒店",
          star: 3,
          price: 400,
          address: "同济大学正门外",
          img: "https://dimg11.c-ctrip.com/images/0AD5d120008nj322zC5A7_R_300_120.jpg",
        },
        {
          name: "格林豪泰酒店",
          star: 3,
          price: 400,
          address: "同济大学正门外",
          img: "https://dimg11.c-ctrip.com/images/0AD5d120008nj322zC5A7_R_300_120.jpg",
        },
        {
          name: "格林豪泰酒店",
          star: 3,
          price: 400,
          address: "同济大学正门外",
          img: "https://dimg11.c-ctrip.com/images/0AD5d120008nj322zC5A7_R_300_120.jpg",
        },
        {
          name: "格林豪泰酒店",
          star: 3,
          price: 400,
          address: "同济大学正门外",
          img: "https://dimg11.c-ctrip.com/images/0AD5d120008nj322zC5A7_R_300_120.jpg",
        },
      ],
      tickets: [
        { begin: "武汉", end: "上海", price: 300, date: "8月5日" },
        { begin: "武汉", end: "上海", price: 300, date: "8月5日" },
        { begin: "武汉", end: "上海", price: 300, date: "8月5日" },
        { begin: "武汉", end: "上海", price: 300, date: "8月5日" },
        { begin: "武汉", end: "上海", price: 300, date: "8月5日" },
        { begin: "武汉", end: "上海", price: 300, date: "8月5日" },
        { begin: "武汉", end: "上海", price: 300, date: "8月5日" },
        { begin: "武汉", end: "上海", price: 300, date: "8月5日" },
        { begin: "武汉", end: "上海", price: 300, date: "8月5日" },
        { begin: "武汉", end: "上海", price: 300, date: "8月5日" },
        { begin: "武汉", end: "上海", price: 300, date: "8月5日" },
        { begin: "武汉", end: "上海", price: 300, date: "8月5日" },
        { begin: "武汉", end: "上海", price: 300, date: "8月5日" },
        { begin: "武汉", end: "上海", price: 300, date: "8月5日" },
      ],
    };
  },
  methods: {
    onClick(a, b) {
      console.log(this.show);
      for (var i = 0; i < this.show[a].length; i++) {
        this.$set(this.show[a], i, false);
      }
      this.$set(this.show[a], b, true);
    },
  },
};
</script>

<style scoped>
.search {
  background: #f2f2f2;
  padding: 60px 32px;
}
.search p {
  margin-bottom: 5px;
}
.block {
  margin-left: 25%;
  width: 60%;
  color: #003680;
}
.el-button {
  background-color: #003680;
  border: none;
}

.title {
  font: 16px/26px "Microsoft YaHei", SimHei, SimSun, Tahoma, Verdana, Arial,
    sans-serif;
}
.Box1 {
  width: 100%;
  height: 390px;
  background-color: #f2f2f2;
  border: 1px solid #e0e0e0;
  border-top: 2px solid #003680;
  margin-bottom: 20px;
  margin-top: 3px;
}
.rightBox {
  float: left;
  width: 25%;
  height: 100%;
  border-right: 1px dashed #807c7c;
}
.keyword-short {
  margin-left: 10%;
}
.keyword-short dd a {
  color: #003680 !important;
  font-size: 13px;
}
.leftBox {
  float: left;
  width: 74%;
  height: 100%;
}

.attriInfo,
.hotelInfo {
  float: left;
  margin: 21px 0px 0px 15px;
  width: 255px;
  height: 164px;
  background-color: #fff;
}

.infoImg {
  height: 60%;
  width: 100%;
}

.infoDetail {
  padding: 3px 13px;
}

.Details .address {
  font: 12px/14px "Microsoft YaHei", SimHei, SimSun, Tahoma, Verdana, Arial,
    sans-serif;
  color: #666;
}

.Details .price {
  color: orangered;
  font: bold 22px/22px "Lucida Console", "Courier New", monospace, sans-serif;
}
.Price,
.price1 {
  float: right;
}

.Details i {
  margin-left: 3px;
  font-style: normal;
  font-size: 13px;
}
.attriInfo:hover,
.hotelInfo:hover,
.ticketInfo:hover {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  cursor: pointer;
}
.ticketBox {
  width: 1050px;
  height: 100%;
  margin: auto;
  padding: auto;
}
.ticketInfo {
  float: left;
  margin: 19px 10px 0px 10px;
  width: 190px;
  height: 105px;
  background-color: #fff;
  border-radius: 2px;
  font-family: "Microsoft YaHei", SimHei, SimSun, Tahoma, Verdana, Arial,
    sans-serif;
}
.dancheng {
  display: inline-block;
  width: 30px;
  height: 13px;
  background: center/100% url("../assets/img/dancheng.png") no-repeat;
}
.item-name {
  margin-top: 15px;
  margin-bottom: 5px;
  margin-left: 20px;
  font-size: 15px;
}
.item-date {
  margin-left: 20px;
  font-size: 13px;
  color: #666;
}
.item-info {
  margin-top: 11px;
  margin-left: 16px;
}
.item-info > i {
  font-style: normal;
  font-size: 12px;
}
.item-btn {
  margin-left: 40px;
  display: inline-block;
  height: 26px;
  width: 55px;
  background-color: orange;
  border-radius: 3px;
  text-align: center;
  color: white;
  line-height: 26px;
  font-size: 14px;
}
.item-btn:hover {
  background-color: #ffb71b;
}
.title span {
  position: relative;
  margin-left: 15px;
}

.title > span:hover {
  color: #ffd04b;
  cursor: pointer;
}
.title span i {
  position: absolute;
  left: 50%;
  margin-left: -6px;
  bottom: -6px;
  width: 0;
  height: 0;
  overflow: hidden;
  line-height: 0;
  font-size: 0;
  vertical-align: middle;
  border-bottom: 6px solid #003680;
  border-top: 0 none;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
}

.dropdown {
  position: relative;
}
.drop-content {
  display: none;
  position: absolute;
  left: 10px;
  background-color: #f9f9f9;
  width: 90px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.dropdown:hover .drop-content {
  display: block;
}
.drop-content a {
  display: block;
  font-size: 13px;
  height: 20px;
  line-height: 20px;
  margin-left: 10px;
  margin-right: 10px;
}
.drop-content a:hover {
  background-color: #ffd04b;
}

dt {
  font-size: 18px;
  margin: 8px 0;
}
</style>