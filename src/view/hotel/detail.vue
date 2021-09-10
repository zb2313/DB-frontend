<template>
  <el-container direction="vertical">
    <Header activeIndex="1" />
    <Search />
    <div class="main">
      <el-card class="box-card" shadow="never">
        <div class="clearfix">
          <div class="namePicture">
            <div class="clearfix">
              <div class="hotelName">
                <h2>{{ hotelName }}</h2>
              </div>
              <div class="star">
                <img
                  src="../../assets/img/diamond.svg"
                  v-for="i in starNum"
                  :key="i"
                  style="margin-top: 2px"
                />
              </div>
            </div>
            <div style="font-size: 12px">
              <i class="el-icon-location"></i>{{ location }}
              <span @click="mapVisible = true" class="hint">查看地图</span>
              <el-dialog :visible.sync="mapVisible" width="90%" top="20px">
                <div class="amap-wrap">
                  <el-amap
                    vid="amapDemo"
                    isHotspot="true"
                    resizeEnable="true"
                    :amap-manager="amapManager"
                    :center="center"
                    :zoom="14"
                    :lang="lang"
                    :events="events"
                  ></el-amap>
                </div>
              </el-dialog>
              <div>
                <span style="width: 200px"
                  ><i class="el-icon-s-home"></i
                  >{{ openTime ? openTime : "1988" }} 客房数：{{
                    totalRoom ? totalRoom : "99"
                  }}
                  联系电话：{{
                    telephone ? telephone : "07752185，18877525662"
                  }}</span
                >
                <span @click="moreInfoVisible = true" class="hint"
                  >查看更多</span
                >
                <el-dialog
                  :visible.sync="moreInfoVisible"
                  width="70%"
                  top="20px"
                >
                  <div>
                    <h1>酒店简介</h1>
                    <br />
                    开业：{{ openTime ? openTime : "1988" }} 客房数：{{
                      totalRoom ? totalRoom : "99"
                    }}
                    联系电话：{{ telephone ? telephone : "637412,18877525662" }}
                    <div
                      class="picture"
                      :style="{
                        backgroundImage: 'url(' + baseImg + ')',
                        backgroundSize: '100% 100%',
                        backgroundRepeat: 'no-repeat',
                      }"
                    ></div>
                    <p>
                      {{
                        description
                          ? description
                          : "酒店毗邻以高新技术、金融、现代商贸、电子商务、文化创意产业为主力的中成智谷创意园区，距离玻璃博物馆约1.5公里。酒店设计理念是以阅读和户外游为主题，高品质的客房产品设施+细致温馨的服务，带给你“自然、静谧、温暖、朴实”的健康生活方式。所有客房均采用普兰特系列优质床品，分体式空调，全套高端Afu精油洗浴用品，100M高速光纤，全WIFI覆盖。"
                      }}
                    </p>
                    <br />
                    <h3>住宿预订提供方</h3>
                    <img
                      :src="license"
                      alt=""
                      style="width: 700px; height: 400px"
                    />
                  </div>
                </el-dialog>
              </div>
            </div>

            <div
              class="picture"
              :style="{
                backgroundImage: 'url(' + baseImg + ')',
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat',
              }"
            ></div>
          </div>
          <div class="other" style="float: left">
            <div class="clearfix">
              <div style="float: left">
                <div class="dianping">
                  <div class="dianping-icon">{{ grade }}</div>
                  <div class="dianping-wenzi">
                    <p class="dianping-wenzi1">{{ level }}</p>
                    <p class="dianping-wenzi2">
                      共{{ dianping_number }}名房客评分
                    </p>
                  </div>
                </div>
                <a
                  href="#comments"
                  style="color: cornflowerblue; font-size: 12px"
                  >显示所有{{ dianping_number }}条点评</a
                >
              </div>
              <div class="chooseRoom" style="float: right">
                <div class="clearfix">
                  <div style="float: left">
                    <span
                      style="color: #003580; font-weight: 700; font-size: 24px"
                    >
                      ￥{{ minPrice }}
                    </span>
                    <span
                      style="
                        color: grey;
                        height: 50px;
                        line-height: 50px;
                        font-weight: 700;
                      "
                      >起</span
                    >
                  </div>

                  <a href="#rooms" class="choose_btn" style="float: left">
                    选择房间
                  </a>
                </div>
              </div>
            </div>
            <el-divider></el-divider>
            <div class="clearfix">
              <div class="map">
                <el-amap
                  vid="amapDemo"
                  isHotspot="true"
                  resizeEnable="true"
                  :amap-manager="amapManager"
                  :center="center"
                  :zoom="zoom"
                  :lang="lang"
                  :events="events1"
                ></el-amap>
              </div>
              <div class="aboutMap">
                <div>
                  <img
                    src="../../assets/img/airport.svg"
                    style="margin-top: 2px"
                  />{{ airport }}公里
                </div>
                <div>
                  <img
                    src="../../assets/img/train.svg"
                    style="margin-top: 2px"
                  />{{ train }}公里
                </div>
                <div>
                  <img
                    src="../../assets/img/subway.svg"
                    style="margin-top: 2px"
                  />{{ subway }}公里
                </div>
                <p
                  style="
                    font-size: 8px;
                    color: gray;
                    margin-top: 5px;
                    width: 130px;
                  "
                >
                  附近9公里内有{{ attrationNum }}个景点
                </p>
                <div
                  @click="mapVisible = true"
                  class="hint"
                  style="margin-top: 5px"
                >
                  查看完整地图
                </div>
              </div>
            </div>
            <el-divider></el-divider>
            <div style="font-size: 12px; margin-top: 0px">
              <span>接机服务</span
              ><el-divider direction="vertical"></el-divider>
              <span>24小时大堂经理</span>
            </div>
          </div>
        </div>
      </el-card>
      <el-card class="box-card" shadow="never">
        <div class="clearfix">
          <div style="float: left">
            <span>超大优惠</span>
            <span style="color: #f7ba2a; font-weight: 700; font-size: 14px">
              新客最高减100
            </span>
          </div>
          <div @click="onReceive" class="receive_btn">领取</div>
        </div>
      </el-card>
      <br />
      <div id="rooms">
        <ul>
          <li v-for="room in rooms" :key="room.typE_ID">
            <Room
              :roomName="room.typE_NAME"
              :customerNum="room.customeR_NUM"
              :bed="room.bed"
              :dish="room.dish"
              :smoke="room.smoke"
              :window="room.window"
              :cancel="room.cancel"
              :price="room.price"
              :originalPrice="room.originaL_PRICE"
              :coverImgUrl="room.coveR_IMG_URL"
              :roomID="room.typE_ID"
              :hotelID="hotelId"
            />
          </li>
        </ul>
      </div>
      <br />
      <el-card class="box-card" shadow="never">
        <div id="comments">
          <h1>
            点评<span
              style="
                color: grey;
                font-weight: 700;
                font-size: 18px;
                margin-left: 10px;
              "
              >({{ dianping_number }}名住客真实点评)</span
            >
          </h1>
        </div>
        <div class="sort">
          <el-form :inline="true" :model="form_Select">
            <el-form-item>
              <el-select
                v-model="form_Select.roomType"
                @change="roomTypeChange"
              >
                <el-option
                  v-for="item in roomTypes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select
                v-model="form_Select.commentLevel"
                @change="commentLevelChange"
              >
                <el-option label="所有点评" value="1"></el-option>
                <el-option label="好评（打分>3）" value="2"></el-option>
                <el-option label="非好评（打分<4）" value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select
                v-model="form_Select.bookSort"
                @change="sortWayChange1"
              >
                <el-option label="所有点评" value="1"></el-option>
                <el-option label="最近入住" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select
                v-model="form_Select.commentSort"
                @change="sortWayChange2"
              >
                <el-option label="推荐排序" value="1"></el-option>
                <el-option label="最近点评" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
      <div>
        <ul>
          <li v-for="comment in commentList" :key="comment.userId">
            <Comment
              :userName="comment.userName"
              :userAvatar="comment.userAvatar"
              :commentRoom="comment.commentRoom"
              :bookTime="comment.bookTime"
              :userCommentNum="comment.userCommentNum"
              :commentRate="comment.commentRate"
              :commentContent="comment.commentContent"
              :commentTime="comment.commentTime"
            />
          </li>
        </ul>
        <!-- 分页 -->
        <!-- <div style="text-align: center; color: #003580">
          <br />
          <el-pagination
            layout="prev, pager, next"
            :total="commentList.length"
            :page-size="10"
            @prev-click="prevPage"
            @next-click="nextPage"
          >
          </el-pagination>
        </div> -->
      </div>
      <br />
      <!-- 酒店政策 -->
      <el-card class="box-card policy" shadow="never">
        <h1>酒店政策</h1>
        <div class="bold">
          <el-row type="flex" style="margin-top: 20px">
            <el-col :span="6">入住及退房</el-col>
            <el-col :span="18"
              >入住时间： 14:00后 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              退房时间： 12:00前</el-col
            >
          </el-row>
          <el-divider></el-divider>
          <el-row type="flex">
            <el-col :span="6">入住方式</el-col>
            <el-col :span="18" style="font-weight: 400"
              >请到前台领取钥匙/门卡</el-col
            >
          </el-row>
          <el-divider></el-divider>
          <el-row type="flex">
            <el-col :span="6">儿童及加床</el-col>
            <el-col :span="18" style="font-weight: 400"
              >酒店允许携带12岁及以上儿童入住
              <div style="margin-top: 20px">
                <div style="font-weight: 700">· 使用现有床铺</div>
                <p>每房间可有1名12-17岁的儿童使用现有床铺。</p>
                <div style="font-weight: 700">· 加床：</div>
                <p>不可加床</p>
                <div style="font-weight: 700">· 备注</div>
                <p>
                  加床政策、儿童政策会根据客房类型而有所不同，房价仅适用于特定数量的客人。携带儿童与额外客人可能会产生额外费用，详情请咨询酒店。
                </p>
              </div>
            </el-col>
          </el-row>
          <el-divider></el-divider>
          <el-row type="flex">
            <el-col :span="6">早餐</el-col>
            <el-col :span="18" style="font-weight: 400">
              <p>早餐类型中式</p>
              <el-divider></el-divider>
              <p>菜单类型自助餐</p>
              <el-divider></el-divider>
              <p>营业时间07:00-09:00 [星期一 - 星期日]</p>
            </el-col>
          </el-row>
          <el-divider></el-divider>
          <el-row type="flex">
            <el-col :span="6">停车场</el-col>
            <el-col :span="18" style="font-weight: 400">
              不可预约：酒店内提供公共停车场（免费）。</el-col
            >
          </el-row>
          <el-divider></el-divider>
          <el-row type="flex">
            <el-col :span="6">宠物</el-col>
            <el-col :span="18" style="font-weight: 400"> 不可携带宠物。</el-col>
          </el-row>
          <el-divider></el-divider>
          <el-row type="flex">
            <el-col :span="6">年龄限制</el-col>
            <el-col :span="18" style="font-weight: 400"
              >入住办理人需年满18岁</el-col
            >
          </el-row>
          <el-divider></el-divider>
          <el-row type="flex">
            <el-col :span="6">到店付款方式</el-col>
            <el-col :span="18" style="font-weight: 400"
              >酒店接受以下付款方式
              <div>
                <img
                  src="https://tse1-mm.cn.bing.net/th/id/R-C.692de9abd94bc6a408ce5591e04403b1?rik=Pdt3a4ecCmrvQQ&riu=http%3a%2f%2fpic.ntimg.cn%2ffile%2f20191130%2f29554138_095901936699_2.jpg&ehk=deyCCJtpHBww4tY9QO9z8ZGsTCZWN%2fdTHjfZ3SYvktU%3d&risl=&pid=ImgRaw&r=0"
                  alt=""
                />
                <img
                  src="https://pic38.photophoto.cn/20160325/1155115744558206_b.jpg"
                  alt=""
                />
              </div>
            </el-col>
          </el-row>
        </div>
      </el-card>
      <br />

      <!--附近的酒店  -->
      <el-card class="box-card near" shadow="never">
        <h1>附近的酒店</h1>
        <div class="nearhotels">
          <div
            class="box"
            v-for="(item, index) in nearhotels"
            :key="index"
            @click="toHotelDetail(item[1].hoteid)"
          >
            <div
              class="infoImg"
              :style="{
                backgroundImage: 'url(' + item[1].picture + ')',
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat',
              }"
            ></div>
            <div class="infoDetail">
              <div class="Name" style="font-size: 14px; font-weight: 700">
                {{ item[1].hotelname.split("(")[0] }}
              </div>
              <img
                src="../../assets/img/diamond.svg"
                v-for="i in item[1].star"
                :key="i"
                style="margin-top: 2px"
              />

              <div class="Details">
                <div class="leftstar">
                  <div class="star">
                    {{ item[1].star }}.0<i
                      style="
                        font-style: normal;
                        font-size: 11px;
                        color: #4880cf;
                      "
                      >/5</i
                    >
                  </div>
                  <span class="dianping">{{ item[1].commentnum }}点评</span>
                </div>
                <div class="rightprice">
                  ￥{{ item[1].lowestprice
                  }}<i style="font-size: 11px; font-style: normal; color: gray"
                    >&nbsp;起</i
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-card>
    </div>
    <br />
    <Footer1 />
  </el-container>
</template>

<style scoped>
.Form {
  width: 100%;
  height: 130px;
  margin-bottom: -105px;
  text-align: center;
  background-color: #f2f2f2;
}
.clearfix:before,
.clearfix:after {
  content: "";
  display: table;
}
.clearfix:after {
  clear: both;
}
.clearfix {
  *zoom: 1;
}
.namePicture {
  float: left;
  width: 700px;
}
.other {
  float: left;
  margin-top: 100px;
  margin-left: 10px;
}
.hotelName {
  float: left;
}
.namePicture .star {
  height: 30px;
  line-height: 30px;
  font-size: 30px;
  float: left;
}
.hint {
  color: #003580;
  font-weight: 700;
  font-size: 12px;
  cursor: pointer;
}
.hint:hover {
  text-decoration: underline;
}
.other .dianping {
  width: 155px;
  height: 50px;
  left: 240px;
  margin-bottom: 10px;
}
.dianping-wenzi {
  float: left;
  margin-right: 5px;
  width: 100px;
  height: 100%;
}

.dianping-wenzi1 {
  font-weight: 700;
  font-size: 18px;
}
.dianping-wenzi2 {
  font-size: 10px;
  color: grey;
}
.dianping-icon {
  float: left;
  width: 50px;
  height: 100%;
  border-radius: 10px 10px 10px 0px;
  text-align: center;
  font: normal 700 25px/50px "Microsoft YaHei";
  color: white;
  background-color: #003580;
}
.choose_btn {
  width: 100px;
  font-size: 20px;
  background-color: #003580;
  color: white;
  line-height: 50px;
  text-align: center;
  border-radius: 4px;
  margin-left: 5px;
}
.picture {
  margin-top: 20px;
  margin-bottom: 20px;
  height: 395px;
  color: #fff;
  line-height: 395px;
  text-align: center;
}
.receive_btn {
  width: 70px;
  font-size: 16px;
  background-color: #f7ba2a;
  color: white;
  line-height: 30px;
  text-align: center;
  float: right;
  cursor: pointer;
}
.map {
  width: 200px;
  height: 180px;
  float: left;
}
.aboutMap {
  float: left;
  margin-left: 15px;
  font-size: 14px;
}
.sort {
  background-color: #f0f2f5;
  height: 50px;
}
.el-select {
  margin-top: 5px;
  color: #0f294d;
}
img {
  height: 20px;
  line-height: 30px;
  font-size: 30px;
}
.bold {
  font-weight: 700;
}
.policy {
  font-size: 12px;
}
.box {
  width: 250px;
  height: 190px;
  float: left;
  margin: 5px 5px;
  text-align: left;
}
.box:hover {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

.infoImg {
  height: 60%;
  width: 100%;
}
.infoDetail {
  width: 100%;
  height: 80%;
  margin-left: 2px;
  margin-top: 5px;
}
.infoDetail .star {
  display: inline-block;
  width: 40px;
  height: 20px;
  color: white;
  text-align: center;
  background-color: #003680;
  border-radius: 5px 5px 0px 5px;
}

.near .dianping {
  height: 20px;
  line-height: 20px;
  font-size: 13px;
  margin-left: 5px;
  display: inline-block;
  color: rgb(189, 189, 189);
}

.leftstar {
  float: left;
  width: 50%;
}
.rightprice {
  float: right;
  width: 40%;
  margin-right: 5px;
  text-align: right;
  font-size: 22px;
  font-weight: 700;
  color: red;
  margin-top: -5px;
}
.amap-wrap {
  width: 100%;
  height: 500px;
}
</style>


<script>
import Header from "@/components/Header.vue";
import Search from "@/components/Search.vue";
import Room from "@/components/room.vue";
import Comment from "@/components/comment.vue";
import Footer1 from "@/components/Footer1.vue";
import { AMapManager, lazyAMapApiLoaderInstance } from "vue-amap";
const amapManager = new AMapManager();

export default {
  components: {
    Header,
    Search,
    Room,
    Comment,
    Footer1,
  },
  data() {
    const _this = this;
    return {
      // 地图的数据
      map: null,
      lang: "zh_en",
      zoom: 12,
      center: [121.473701, 31.230416],
      amapManager,
      events1: {
        init() {
          lazyAMapApiLoaderInstance.load().then(() => {
            _this.initMap1();
          });
        },
      },
      events: {
        init() {
          lazyAMapApiLoaderInstance.load().then(() => {
            _this.initMap();
          });
        },
      },
      // 其他页面传过来的酒店ID给你用的，ｂｙ秦
      hotelId: " ",
      mapVisible: false,
      moreInfoVisible: false,
      license:
        "http://dimg04.c-ctrip.com/images/0201z120008qyeks66EC1_Z_702_0_Q70.jpg",
      hotelName: "速八酒店",
      starNum: 5,
      location: "上海市嘉定区安亭镇曹安公路4800号",
      dianping_number: 999,
      grade: 5,
      openTime: undefined,
      totalRoom: null,
      telephone: "",
      description: "",
      minPrice: 99,
      baseImg:
        "https://dimg11.c-ctrip.com/images/0AD5d120008nj322zC5A7_R_300_120.jpg",
      form_Select: {
        roomType: "所有房型",
        commentLevel: "所有点评",
        bookSort: "所有点评",
        commentSort: "推荐排序",
      },
      airport: 22.78,
      train: 12.45,
      subway: 10.44,
      attrationNum: 0,
      attrationCommentNumTest: 2,
      hotelCommentNumTest: 2,
      avatarTest: "",

      rooms: [],
      comments: [],
      commentList: [],
      commentList1: [],
      commentList2: [],
      commentPage: [],
      nearhotels: [],
      hotels: [],
      attractions: [],
      Lnglat: [],
    };
  },
  computed: {
    level: function () {
      if (this.grade == 5) {
        return "好极了";
      } else if (this.grade == 4) {
        return "非常好";
      } else if (this.grade == 3) {
        return "一般般";
      } else if (this.grade == 2) {
        return "不太好";
      } else if (this.grade == 1) {
        return "非常差";
      } else {
        return "暂无评分";
      }
    },
    roomTypes: function () {
      var tp = [
        {
          value: "0",
          label: "所有房型",
        },
      ];
      for (var i = 0; i < this.comments.length; i++) {
        for (var j = 0; j < tp.length; j++) {
          if (
            j === tp.length - 1 &&
            tp[j].label != this.comments[i].commentRoom
          ) {
            tp.push({
              value: tp.length,
              label: this.comments[i].commentRoom,
            });
          }

          if (tp[j].label === this.comments[i].commentRoom) break;
          else continue;
        }
      }
      return tp;
    },
  },
  methods: {
    initMap1() {
      this.map = amapManager.getMap();
      // 比例尺;
      this.map.addControl(new AMap.Scale());
    },
    initMap() {
      this.map = amapManager.getMap();
      // 比例尺;
      this.map.addControl(new AMap.Scale());
      // 工具条;
      this.map.addControl(
        new AMap.ToolBar({
          position: "LT",
          useNative: true,
          autoPosition: false,
          locate: true,
          ruler: false,
          liteStyle: true,
        })
      );
      this.addMarker(this.Lnglat);

      let a = this;
      var len1 = a.hotels.length;
      for (let i = 0; i < len1; i++) {
        this.addressToLnglat(a.hotels[i].location).then((res) => {
          let lnglat = res.split(",");
          a.addMarker1(lnglat, a.hotels[i]);
        });
      }

      var len2 = a.attractions.length;
      for (let i = 0; i < len2; i++) {
        this.addressToLnglat(a.attractions[i].location).then((res) => {
          let lnglat = res.split(",");
          a.addMarker2(lnglat, a.attractions[i]);
        });
      }
    },
    addMarker(position, n) {
      let marker = new AMap.Marker({
        icon: new AMap.Icon({
          // 图标尺寸
          size: new AMap.Size(40, 50),
          // 图标的取图地址
          image: "https://pages.c-ctrip.com/hotels/IBU/online/map_sprite.png",
          imageOffset: new AMap.Pixel(-238, -10),
        }),
        position: position,
        animation: "AMAP_ANIMATION_DROP",
      });

      this.map.add(marker);
      let a = this;

      marker.on("mouseover", function () {
        a.openInfo(marker, a.hotel);
      });
    },
    addMarker1(position, item) {
      let marker = new AMap.Marker({
        icon: new AMap.Icon({
          // 图标尺寸
          size: new AMap.Size(32, 32),
          // 图标的取图地址
          image: "https://pages.c-ctrip.com/hotels/IBU/online/map_sprite.png",
          imageOffset: new AMap.Pixel(-12, -186),
        }),
        position: position,
        animation: "AMAP_ANIMATION_DROP",
      });

      this.map.add(marker);

      let a = this;
      marker.on("mouseover", function () {
        a.openInfo(marker, item);
      });
    },
    addMarker2(position, item) {
      let marker = new AMap.Marker({
        icon: new AMap.Icon({
          // 图标尺寸
          size: new AMap.Size(32, 32),
          // 图标的取图地址
          image: "https://pages.c-ctrip.com/hotels/IBU/online/map_sprite.png",
          imageOffset: new AMap.Pixel(-240, -83),
        }),
        position: position,
        animation: "AMAP_ANIMATION_DROP",
      });

      this.map.add(marker);

      let a = this;
      marker.on("mouseover", function () {
        a.openInfo(marker, item);
      });
    },
    //在指定位置打开信息窗体
    openInfo(marker, item) {
      //实例化信息窗体
      var title = item.hotelname ? item.hotelname : item.attractionname,
        content = [];
      content.push(
        "<img class='pic' src='" +
          item.picture +
          "'>地址：" +
          item.location +
          "<br/>"
      );
      if (item.star == 0) {
        content.push(
          "<span style='font-size:11px;color:grey;'>暂无评分</span>"
        );
      } else {
        for (var i = 0; i < item.star; i++) {
          content.push("<i class='star el-icon-star-on'></i>");
        }
      }
      var price = item.lowestprice ? item.lowestprice : item.price;
      content.push(
        '<br/><span style="font-size:11px;color:#F00;">价格:' +
          price +
          "元</span>"
      );
      if (item.hoteid) {
        content.push(
          "<a href='http://kefan-zheng.space/hotel/detail?id=" +
            item.hoteid +
            "'>了解详情</a>"
        );
      } else if (item.attractionid) {
        content.push(
          "<a href='http://kefan-zheng.space/attraction/detail?id=" +
            item.attractionid +
            "'>了解详情</a>"
        );
      }

      let a = this;
      let infoWindow = new AMap.InfoWindow({
        isCustom: true, //使用自定义窗体
        content: a.createInfoWindow(title, content.join("")),
        offset: new AMap.Pixel(16, -45),
      });

      infoWindow.open(this.map, marker.getPosition());
    },
    //构建自定义信息窗体
    createInfoWindow(title, content) {
      var info = document.createElement("div");
      info.className = "custom-info input-card content-window-card";

      //可以通过下面的方式修改自定义窗体的宽高
      info.style.width = "300px";
      // 定义顶部标题
      var top = document.createElement("div");
      var titleD = document.createElement("div");
      var closeX = document.createElement("img");
      top.className = "info-top";
      titleD.innerHTML = title;
      closeX.src = "https://webapi.amap.com/images/close2.gif";
      closeX.onclick = this.closeInfoWindow;

      top.appendChild(titleD);
      top.appendChild(closeX);
      info.appendChild(top);

      // 定义中部内容
      var middle = document.createElement("div");
      middle.className = "info-middle";
      middle.style.backgroundColor = "white";
      middle.innerHTML = content;
      info.appendChild(middle);

      // 定义底部内容
      var bottom = document.createElement("div");
      bottom.className = "info-bottom";
      bottom.style.position = "relative";
      bottom.style.top = "0px";
      bottom.style.margin = "0 auto";
      var sharp = document.createElement("img");
      sharp.src = "https://webapi.amap.com/images/sharp.png";
      bottom.appendChild(sharp);
      info.appendChild(bottom);
      return info;
    },
    //关闭信息窗体
    closeInfoWindow() {
      this.map.clearInfoWindow();
    },
    // 地址转经纬度
    async addressToLnglat(address) {
      return fetch(
        "https://restapi.amap.com/v3/geocode/geo?key=b46e001d88ea385075cc97e1c892ce37&address=" +
          address
      )
        .then(function (response) {
          return response.json();
        })
        .then((res) => {
          if (res.geocodes[0].location) {
            return res.geocodes[0].location;
          } else return -1;
        });
    },
    // 附近酒店推荐+地图上酒店+地图上景点
    nearestHotels(address) {
      fetch(
        "https://restapi.amap.com/v3/geocode/geo?key=b46e001d88ea385075cc97e1c892ce37&address=" +
          address
      )
        .then(function (response) {
          return response.json();
        })
        .then((res) => {
          // 附近7km有多少景点
          this.$axios
            .get(
              "http://49.234.18.247:8080/api/FunGetCommentNumByAttLocation/" +
                res.geocodes[0].city
            )
            .then((response) => {
              this.attractions = response.data;
              for (let i = 0; i < response.data.length; i++) {
                this.addressToLnglat(response.data[i].location).then(
                  (lnglat) => {
                    var distance = AMap.GeometryUtil.distance(
                      lnglat.split(","),
                      this.Lnglat
                    );
                    if (distance <= 5000) {
                      this.attrationNum++;
                    }
                  }
                );
              }
            });
          // 酒店推荐
          this.$axios
            .get(
              "http://49.234.18.247:8080/api/FunGetCommentNumByHotelLocation/" +
                res.geocodes[0].city
            )
            .then((response) => {
              var len = response.data.length;
              for (let i = 0; i < len; i++) {
                this.addressToLnglat(response.data[i].location).then((res) => {
                  var distance = AMap.GeometryUtil.distance(
                    res.split(","),
                    this.Lnglat
                  );
                  if (distance === 0) {
                    this.hotel = response.data[i];
                  } else {
                    this.hotels.push(response.data[i]);
                    if (this.nearhotels.length < 4) {
                      this.nearhotels.push([distance, response.data[i]]);
                      this.nearhotels.sort(function (a, b) {
                        return a[0] - b[0];
                      });
                    } else {
                      if (this.nearhotels[3][0] > distance) {
                        this.nearhotels[3] = [distance, response.data[i]];
                        this.nearhotels.sort(function (a, b) {
                          return a[0] - b[0];
                        });
                      }
                    }
                  }
                });
              }
            });
        });
    },
    // 跳转到酒店详情页面
    toHotelDetail(HotelID) {
      this.$router.push({
        path: "/hotel/detail",
        query: { id: HotelID },
      });
    },
    onReceive() {
      const h = this.$createElement;
      this.$msgbox({
        title: "领券",
        message: h("div", { style: "width:500px" }, [
          h(
            "span",
            { style: "color: #003580;font-weight:700" },
            "您已经领取完所有的优惠券"
          ),
        ]),
        showCancelButton: false,
        confirmButtonText: "确定",
      });
    },
    // prevPage() {},
    // nextPage() {},
    roomTypeChange(val) {
      if (val === "0") {
        this.commentList = this.commentList2;
        this.commentList1 = this.commentList;
      } else {
        for (var count = 1; count < this.roomTypes.length; count++) {
          if (val === count) {
            var roomTypeTemp = [];
            for (var i = 0; i < this.comments.length; i++) {
              if (this.comments[i].commentRoom === this.roomTypes[count].label)
                roomTypeTemp.push(this.comments[i]);
            }
            this.commentList = this.commentList2.filter(function (val) {
              return roomTypeTemp.indexOf(val) > -1;
            });
            this.commentList1 = this.commentList;
          }
        }
      }
    },
    commentLevelChange(val) {
      if (val === "1") {
        this.commentList = this.commentList1;
        this.commentList2 = this.commentList;
      } else if (val === "2") {
        var temp1 = [];
        for (var i = 0; i < this.comments.length; i++) {
          if (this.comments[i].commentRate > 3) temp1.push(this.comments[i]);
        }
        this.commentList = this.commentList1.filter(function (val) {
          return temp1.indexOf(val) > -1;
        });
        this.commentList2 = this.commentList;
      } else if (val === "3") {
        var temp2 = [];
        for (var k = 0; k < this.comments.length; k++) {
          if (this.comments[k].commentRate < 4) temp2.push(this.comments[k]);
        }
        this.commentList = this.commentList1.filter(function (val) {
          return temp2.indexOf(val) > -1;
        });
        this.commentList2 = this.commentList;
      }
    },
    sortWayChange1(val) {
      if (val === "1") {
        this.commentList = this.comments.filter(function (val) {
          return this.commentList.indexOf(val) > -1;
        });
      } else if (val === "2") {
        this.form_Select.commentSort = "推荐排序";
        this.commentList = this.commentList.sort(function (a, b) {
          return parseInt(
            Date.parse(new Date(b.bookTime)) - Date.parse(new Date(a.bookTime))
          );
        });
      }
    },
    sortWayChange2(val) {
      if (val === "1") {
        this.commentList = this.commentList.sort(function (a, b) {
          return b.commentContent.length - a.commentContent.length;
        });
      } else if (val === "2") {
        this.form_Select.bookSort = "所有点评";
        this.commentList = this.commentList.sort(function (a, b) {
          return parseInt(
            Date.parse(new Date(b.commentTime)) -
              Date.parse(new Date(a.commentTime))
          );
        });
      }
    },
  },
  mounted() {},
  created() {
    if (this.$route.query.id) {
      this.hotelId = this.$route.query.id;
    }
    this.$axios
      .get("http://49.234.18.247:8080/api/Hotel/" + this.hotelId)
      .then((response) => {
        this.hotelName = response.data[0].hoteL_NAME;
        this.minPrice = response.data[0].lowesT_PRICE;
        this.baseImg = response.data[0].picture;
        this.location = response.data[0].hlocation;
        this.grade = response.data[0].star;
        this.totalRoom = response.data[0].totaL_NUM;
        this.openTime = response.data[0].opeN_TIME;
        this.telephone = response.data[0].telephone;
        this.description = response.data[0].description;
        this.addressToLnglat(this.location).then((res) => {
          this.center = this.Lnglat = res.split(",");
          this.nearestHotels(this.location);
        });
      });

    let tempHotelId = this.hotelId;
    // 获得空的房间类型
    this.$axios
      .get(
        "http://49.234.18.247:8080/api/FunGetVacantRoomTypeByHotelId/" +
          tempHotelId
      )
      .then((response) => {
        this.rooms = response.data;
      });

    // 获得评论信息
    this.$axios
      .get(
        "http://49.234.18.247:8080/api/FunGetCommentByHotelId/" + tempHotelId
      )
      .then((response) => {
        this.dianping_number = response.data.length;
        if (this.comments.length < response.data.length) {
          for (var j = this.comments.length; j < response.data.length; j++)
            this.comments.push({
              userName: "兰州潇洒哥",
              useR_ID: "0000000002",
              userAvatar:
                "https://ak-d.tripcdn.com/images/t1/headphoto/424/398/503/0386f569fd0d4b488ff41b64bbc5743b_R_100_100_R5_Q70_D.jpg",
              commentRoom: "经济大床房",
              bookTime: "2021-08-14",
              userCommentNum: 1,
              commentRate: 4,
              commentContent: "",
              commentTime: "2021-08-14 20:53:25",
            });
        }
        for (var i = 0; i < response.data.length; i++) {
          this.comments[i].userId = response.data[i].useR_ID;
          var temp = this.comments[i].userId;
          let _i = i;
          this.$axios
            .get(
              "http://49.234.18.247:8080/api/FunGetHotelCommentNumByUserid/" +
                temp
            )
            .then((response) => {
              this.comments[_i].userCommentNum =
                response.data[0].hotelcommentnum;
            });
          this.$axios
            .get(
              "http://49.234.18.247:8080/api/FunGetAttractionCommentNumByUserid/" +
                temp
            )
            .then((response) => {
              this.comments[_i].userCommentNum =
                response.data[0].hotelcommentnum +
                this.comments[_i].userCommentNum;
            });

          //获取用户订单信息
          this.$axios
            .get(
              "http://49.234.18.247:8080/api/FunGetAllHotelOrderByUserid/" +
                temp +
                "&" +
                tempHotelId
            )
            .then((response) => {
              this.comments[_i].commentRoom = response.data[0].typename;
              this.comments[_i].bookTime = response.data[0].ordertime.slice(
                0,
                10
              );
            });

          // 获取评论用户的头像
          this.$axios
            .get(
              "http://49.234.18.247:8080/api/Portrait/" +
                this.comments[_i].userId
            )
            .then((response) => {
              this.comments[_i].userAvatar = response.data;
            });

          this.comments[i].userName = response.data[i].useR_NAME;
          this.comments[i].commentTime = response.data[i].commenT_TIME;
          this.comments[i].commentRate = response.data[i].grade;
          this.comments[i].commentContent = response.data[i].ctext;
        }
      });
    this.commentList = this.comments;
    this.commentList1 = this.comments;
    this.commentList2 = this.comments;
  },
};
</script>
