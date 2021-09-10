<template>
  <el-container direction="vertical">
    <Header activeIndex="2" />
    <div class="main">
      <el-card class="box-card" shadow="never">
        <div class="clearfix">
          <div class="namePicture">
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
            <div>
              <div class="clearfix">
                <div class="attrationName">
                  <h2>{{ attrationName }}</h2>
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
            </div>
            <el-divider></el-divider>
            <div class="clearfix">
              <div style="float: left">
                <div class="dianping">
                  <div class="dianping-icon">{{ grade }}</div>
                  <div class="dianping-wenzi">
                    <p class="dianping-wenzi1">{{ level }}</p>
                    <p class="dianping-wenzi2">
                      共{{ dianping_number }}名用户评分
                    </p>
                  </div>
                </div>
                <a
                  href="#comments"
                  style="color: cornflowerblue; font-size: 14px"
                  >显示所有{{ dianping_number }}条点评</a
                >
              </div>
              <div class="chooseRoom" style="float: right">
                <div class="clearfix">
                  <div style="float: left">
                    <span
                      style="color: #003580; font-weight: 700; font-size: 24px"
                    >
                      ￥{{ ticketPrice }}
                    </span>
                    <span
                      style="
                        color: grey;
                        height: 50px;
                        line-height: 50px;
                        font-weight: 700;
                      "
                    ></span>
                  </div>

                  <button
                    @click="beforePay"
                    class="choose_btn"
                    style="float: left"
                  >
                    购买门票
                  </button>
                  <div class="order">
                    <el-dialog :visible.sync="payVisible" width="30%">
                      <div slot="title">
                        <h2 style="color: #003580">购买今日的门票</h2>
                      </div>
                      <el-row
                        type="flex"
                        justify="space-between"
                        style="margin-top: 10px"
                      >
                        <el-col :span="7"><div>价格</div></el-col>
                        <el-col :span="7"
                          ><div>￥{{ ticketPrice }}</div></el-col
                        >
                      </el-row>
                      <el-row
                        type="flex"
                        justify="space-between"
                        style="margin-top: 20px"
                      >
                        <el-col :span="12"
                          ><div style="margin-top: 5px">数量</div></el-col
                        >
                        <el-col :span="12"
                          ><div>
                            <el-input-number
                              v-model="orderNum"
                              @change="ticketNumChange"
                              :min="1"
                              :max="leftOut"
                              label="订票数量"
                            ></el-input-number></div
                        ></el-col>
                      </el-row>
                      <el-row
                        type="flex"
                        justify="space-between"
                        style="margin-top: 10px"
                      >
                        <el-col :span="7">应付金额</el-col>
                        <el-col :span="7"
                          ><div
                            style="
                              color: #003680;
                              font-weight: 700;
                              font-size: 20px;
                            "
                          >
                            ￥{{ storePrice }}
                          </div></el-col
                        >
                      </el-row>

                      <br />

                      <!-- 订票人信息 -->
                      <h3 style="color: black">订票人信息</h3>
                      <div v-for="i in orderNum" :key="i">
                        <div class="orderInfo">
                          <br />
                          <el-row
                            type="flex"
                            justify="space-between"
                            style="margin-top: 10px"
                          >
                            <el-col :span="6"
                              ><span>姓名{{ i }} </span>
                            </el-col>
                            <el-col :span="14"
                              ><input
                                type="text"
                                placeholder="填写身份证上真实姓名"
                            /></el-col>
                          </el-row>

                          <el-row
                            type="flex"
                            justify="space-between"
                            style="margin-top: 10px"
                          >
                            <el-col :span="6"
                              ><span>身份证号{{ i }}</span>
                            </el-col>
                            <el-col :span="14"
                              ><input
                                type="text"
                                placeholder="填写18位身份证号"
                            /></el-col>
                          </el-row>
                          <el-row
                            type="flex"
                            justify="space-between"
                            style="margin-top: 10px"
                          >
                            <el-col :span="6"
                              ><span
                                style="margin-bottom: 5px; margin-top: 5px"
                              >
                                电话号码{{ i }}
                              </span>
                            </el-col>
                            <el-col :span="14">
                              <input
                                type="text"
                                placeholder="+86 中国内陆电话号码"
                            /></el-col>
                          </el-row>
                        </div>
                        <el-divider></el-divider>
                      </div>
                      <h1>{{ payWay }}</h1>
                      <br />
                      <div id="qrcode"></div>
                      <br />
                      <div style="text-align: right">
                        <button
                          @click="aliPay"
                          class="pay_btn"
                          v-if="buttonVisible"
                        >
                          支付宝支付
                        </button>
                        <button
                          @click="wechatPay"
                          class="pay_btn"
                          v-if="buttonVisible"
                        >
                          微信支付
                        </button>
                        <button
                          @click="close"
                          class="pay_btn"
                          v-if="submitVisible"
                        >
                          完成支付
                        </button>
                        <button
                          @click="close"
                          class="pay_btn"
                          v-if="submitVisible"
                        >
                          取消支付
                        </button>
                      </div>
                    </el-dialog>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <div>
              <i class="el-icon-location-outline"></i> &nbsp;&nbsp;
              {{ location }}
              <br />
              <br />
              <div>
                <i class="el-icon-date"></i> &nbsp;&nbsp; {{ openTime }}-{{
                  closeTime
                }}开放（ {{ stopTime }}停止检票）
              </div>
              <br />
              <div>
                <i class="el-icon-phone-outline"></i> &nbsp;&nbsp; {{ call }}
              </div>
            </div>
          </div>
        </div>
      </el-card>
      <br />

      <div class="clearfix box-card" id="comments">
        <div style="float: left">
          <el-card class="left-box-card" shadow="never">
            <h1>
              点评<span
                style="
                  color: grey;
                  font-weight: 700;
                  font-size: 18px;
                  margin-left: 10px;
                "
                >({{ dianping_number }}名用户真实点评)</span
              >
            </h1>
            <div class="sort">
              <el-form :inline="true" :model="form_Select">
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
                    v-model="form_Select.buySort"
                    @change="sortWayChange1"
                  >
                    <el-option label="所有点评" value="1"></el-option>
                    <el-option label="最近购买" value="2"></el-option>
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
              <li v-for="(comment, index) in commentList" :key="index">
                <CommentOnAttr
                  :userName="comment.userName"
                  :userAvatar="comment.userAvatar"
                  :commentTicket="comment.commentTicket"
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
                :total="comments.length"
                :page-size="10"
                @prev-click="prevPage"
                @next-click="nextPage"
              >
              </el-pagination>
            </div> -->
          </div>
          <br />
          <!-- 景点详情 -->
          <el-card class="left-box-card details" shadow="never">
            <h1>景点介绍</h1>
            <div>
              <el-row type="flex" style="margin-top: 20px">
                <el-col :span="24"
                  >{{
                    description
                      ? description
                      : "该景点历史悠久，文化底蕴丰厚，与时俱进，不落俗套。全体职工人员倾心付出，诚恳地为您服务。春夏秋冬，不论寒暑，欢迎您的到来。"
                  }}
                </el-col>
              </el-row>
              <el-divider></el-divider>
              <h1>开放时间</h1>
              <el-row type="flex" style="margin-top: 20px">
                <el-col :span="24"
                  >7月1日-8月31日 周一至周五 {{ openTime }}-{{
                    closeTime
                  }}(最晚检票{{ closeTime }}) 周六至周日 {{ openTime }}-{{
                    closeTime
                  }}(最晚检票{{ openTime }}-{{
                    closeTime
                  }})；年卡中心开卡时间：开园前半小时至闭园前一个半小时。
                  景区现场停止售票时间：闭园前一个半小时。
                  闭园前1小时停止检票</el-col
                >
              </el-row>
              <el-divider></el-divider>
              <h1>优待政策</h1>
              <el-row type="flex" style="margin-top: 20px">
                <el-col :span="24"
                  >儿童：身高1.0米（含）以下或者3周岁以下（需持本人身份证等有效证件原件，购票成人陪同），免费；身高1.0米（不含）-1.4米（含）之间，优惠
                  <br />
                  老人：65周岁（含）以上（持本人有效身份证件），优惠 <br />
                  军人：现役军人、残疾军人、烈士遗属、因公牺牲军人遗属、病故军人遗属、现役军人家属、在职/退休消防救援人员和消防救援院校学员（持本人有效证件至现场购买），优惠
                  <br />
                  残疾人：凭有效证件，优惠 <br />
                  补充说明：以上信息仅供参考，具体信息请以景区当天披露为准。</el-col
                >
              </el-row>
              <el-divider></el-divider>
              <h1>服务设施</h1>
              <el-row type="flex" style="margin-top: 20px">
                <el-col :span="24"
                  >停车场： 地址：{{
                    location
                  }};库位：约1000个；除了景区内停车场，周边还设有三个市政配套停车场，所有停车位总共约3000多个。
                  <br />行李寄存：行李寄存处位于园区正门右侧，大件60元/件，小件50元/件。
                  <br />
                  婴儿车租赁：婴儿车60元/车/天，押金300元；单人童车70元/车/天，押金200元；双人童车90元/车/天，押金200元。车辆乘坐体重限制标准：婴儿车限10kg，单人童车限25kg，双人童车限45kg。
                  <br />
                  轮椅租赁：免费租赁，押金300元。 <br />
                  卫生间：园区内设有多个卫生间，有明显标识。</el-col
                >
              </el-row>
              <el-divider></el-divider>
              <h1>交通攻略</h1>
              <el-row type="flex" style="margin-top: 20px">
                <el-col :span="24"
                  >距{{ nearSubwayStation
                  }}{{ nearSubwayDistance }}m,步行12mins</el-col
                >
              </el-row>
            </div>
          </el-card>
          <br />
        </div>
        <div style="float: right">
          <el-card class="right-box-card" shadow="never">
            <h4>附近景点</h4>
            <div
              class="box"
              v-for="(item, index) in attractions"
              :key="index"
              @click="toAttrDetail(item[1].attractionid)"
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
                  {{ item[1].attractionname }}
                </div>
                <div class="Details">
                  <div class="leftstar">
                    <div class="star">
                      {{ item[1].star
                      }}<i
                        style="
                          font-style: normal;
                          font-size: 11px;
                          color: #4880cf;
                        "
                        >/5</i
                      >
                    </div>
                    <i style="font-size: 11px; font-style: normal; color: gray"
                      >{{ item[1].commentnum }}点评</i
                    >
                  </div>
                  <div class="rightprice">
                    <i style="font-size: 11px; font-style: normal; color: gray"
                      >&nbsp;直线距离{{ parseInt(item[0]) }}米</i
                    >
                  </div>
                </div>
              </div>
            </div>
          </el-card>
        </div>
      </div>
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

.left-box-card {
  width: 800px;
}
.right-box-card {
  width: 290px;
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
  width: 600px;
}
.other {
  float: left;
  margin-top: 20px;
  margin-left: 15px;
}
.attrationName {
  float: left;
}
.other .star {
  height: 30px;
  line-height: 30px;
  font-size: 30px;
  float: left;
}
.hint {
  color: #003580;
  font-weight: 700;
  font-size: 14px;
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
  width: 95px;
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
  margin-right: 5px;
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
.pay_btn {
  width: 80px;
  font-size: 14px;
  background-color: #003580;
  color: white;
  line-height: 30px;
  text-align: center;
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
}
.map {
  width: 200px;
  height: 190px;
  float: left;
}
.aboutMap {
  float: left;
  margin-left: 15px;
  font-size: 14px;
}
.sort {
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
.details {
  font-size: 14px;
}
.box {
  width: 250px;
  height: 180px;
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
.leftstar {
  float: left;
  width: 50%;
}
.rightprice {
  float: right;
  width: 42%;
  margin-right: 5px;
  text-align: right;
  font-weight: 700;
  color: red;
  margin-top: -5px;
}
.orderInfo input {
  background: #fff;
  width: 200px;
  height: 40px;
  box-sizing: border-box;
  border: solid #ced2d9;
  border-width: 0 0 1px;
  transition: border-color 0.25s;
}
.orderInfo p {
  margin-top: 5px;
}
.el-dialog__body {
  padding: 0px 25px 10px 25px !important;
  color: #606266;
  font-size: 14px;
  word-break: break-all;
}
</style>


<script src="https://cdn.bootcss.com/blueimp-md5/2.10.0/js/md5.min.js"></script>    
<script>
import QRCode from "qrcodejs2";
import Header from "@/components/Header";
import CommentOnAttr from "@/components/commentOnAttr.vue";
import Footer1 from "@/components/Footer1.vue";
export default {
  components: {
    Header,
    CommentOnAttr,
    Footer1,
  },
  data() {
    return {
      payWay: " ",
      leftOut: 10,
      orderNum: 1,
      submitVisible: false,
      payVisible: false,
      buttonVisible: true,
      AttrId: "",
      purchaseTime: "",
      attrationName: "上海海昌海洋公园",
      starNum: 5,
      location: "上海市浦东新区南汇新城镇银飞路166号",
      dianping_number: 999,
      grade: 5,
      openTime: "09:00",
      closeTime: "20:30",
      ticketPrice: 59,
      storePrice: 59,
      nearSubwayStation: "临港中运量1号线杞青路站",
      nearSubwayDistance: 793,
      description: "",
      baseImg:
        "https://dimg06.c-ctrip.com/images/100q11000000qcqie2920_C_1600_1200.jpg",
      form_Select: {
        commentLevel: "所有点评",
        buySort: "所有点评",
        commentSort: "推荐排序",
      },
      airport: 22.78,
      train: 12.45,
      subway: 10.44,
      attrationNum: 7,
      call: "400-601-6699,021-50606666",
      comments: [],
      commentList: [],
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
    stopTime: function () {
      return this.closeTime;
    },
  },
  methods: {
    // prevPage() {},
    // nextPage() {},

    // 时间格式化
    timestampToTime(chinaStandard) {
      var date = new Date(chinaStandard);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      var h = date.getHours();
      var minute = date.getMinutes();
      minute = minute < 10 ? "0" + minute : minute;
      var second = date.getSeconds();
      second = second < 10 ? "0" + second : second;
      var Time = y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
      return Time;
    },
    ticketNumChange() {
      this.storePrice = this.ticketPrice * this.orderNum;
    },
    beforePay() {
      this.payVisible = true;
    },
    close() {
      this.payVisible = false;
    },
    commentLevelChange(val) {
      if (val === "1") {
        this.commentList = this.comments;
      } else if (val === "2") {
        var temp1 = [];
        for (var i = 0; i < this.comments.length; i++) {
          if (this.comments[i].commentRate > 3) temp1.push(this.comments[i]);
        }
        this.commentList = this.comments.filter(function (val) {
          return temp1.indexOf(val) > -1;
        });
      } else if (val === "3") {
        var temp2 = [];
        for (var k = 0; k < this.comments.length; k++) {
          if (this.comments[k].commentRate < 4) temp2.push(this.comments[k]);
        }
        this.commentList = this.comments.filter(function (val) {
          return temp2.indexOf(val) > -1;
        });
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
    Pay() {
      var Now = new Date();
      this.purchaseTime = this.timestampToTime(Now);
      this.$axios
        .post("http://49.234.18.247:8080/api/PurchaseAttractionTicket", {
          useR_ID: "0000000001",
          attractioN_ID: this.AttrId,
          price: this.storePrice,
          ordeR_TIME: this.purchaseTime,
        })
        .then((response) => {
          console.log("加订单成功");
          this.$message({
            message: "恭喜你，成功预定该景点票！",
            type: "success",
          });
          this.payVisible = false;
        });
    },
    aliPay() {
      this.buttonVisible = false;
      this.submitVisible = true;
      var Now = new Date();
      var specialID = this.timestampToTime(Now);
      this.orderId = specialID;
      var specialConst = "TJcfy";
      var specialPrice = this.storePrice.toString();
      var specialSign = md5(md5(specialID + specialPrice) + specialConst);
      console.log(specialSign);
      this.$axios
        .post("/qrcode", {
          order_id: specialID,
          order_type: "alipay",
          order_price: specialPrice,
          order_name: "景点",
          sign: specialSign,
          redirect_url: window.location.href,
          extension: "1111",
        })
        .then((response) => {
          console.log(response.data.qr_url);
          this.qrcode = response.data.qr_url;
          this.payWay = "支付宝支付";
          var qrCode = new QRCode(document.getElementById("qrcode"), {
            width: 200, //设置宽高
            height: 200,
          });
          qrCode.makeCode(this.qrcode);

          for (let m = 10; m < 11; m++) {
            let _this = this;
            window.setTimeout(_this.Pay, 3000 * m);
          }
        });
    },
    wechatPay() {
      this.buttonVisible = false;
      this.submitVisible = true;
      var Now = new Date();
      var specialID = this.timestampToTime(Now);
      this.orderId = specialID;
      var specialConst = "TJcfy";
      var specialPrice = this.storePrice.toString();
      var specialSign = md5(md5(specialID + specialPrice) + specialConst);
      console.log(specialSign);
      this.$axios
        .post("/qrcode", {
          order_id: specialID,
          order_type: "wechat",
          order_price: specialPrice,
          order_name: "景点",
          sign: specialSign,
          redirect_url: window.location.href,
          extension: "1111",
        })
        .then((response) => {
          console.log(response.data.qr_url);
          this.qrcode = response.data.qr_url;
          this.payWay = "微信支付";
          var qrCode = new QRCode(document.getElementById("qrcode"), {
            width: 200, //设置宽高
            height: 200,
          });
          qrCode.makeCode(this.qrcode);
          for (let m = 10; m < 11; m++) {
            let _this = this;
            window.setTimeout(_this.Pay, 3000 * m);
          }
        });
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
    // 附近景点推荐
    nearestAttraction(address) {
      fetch(
        "https://restapi.amap.com/v3/geocode/geo?key=b46e001d88ea385075cc97e1c892ce37&address=" +
          address
      )
        .then(function (response) {
          return response.json();
        })
        .then((res) => {
          this.$axios
            .get(
              "http://49.234.18.247:8080/api/FunGetCommentNumByAttLocation/" +
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
                  if (distance !== 0) {
                    if (this.attractions.length < 8) {
                      this.attractions.push([distance, response.data[i]]);
                      this.attractions.sort(function (a, b) {
                        return a[0] - b[0];
                      });
                    } else {
                      if (this.attractions[7][0] > distance) {
                        this.attractions[7] = [distance, response.data[i]];
                        this.attractions.sort(function (a, b) {
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
    // 跳转到景点详情页面
    toAttrDetail(AttrID) {
      this.$router.push({
        path: "/attraction/detail",
        query: { id: AttrID },
      });
    },
  },
  created() {
    if (this.$route.query.id) {
      this.AttrId = this.$route.query.id;
    }

    this.$axios
      .get("http://49.234.18.247:8080/api/Attraction/" + this.AttrId)
      .then((response) => {
        this.attrationName = response.data[0].attractioN_NAME;
        this.openTime = response.data[0].opeN_TIME;
        this.closeTime = response.data[0].closE_TIME;
        this.ticketPrice = response.data[0].price;
        this.storePrice = response.data[0].price;
        this.baseImg = response.data[0].picture;
        this.location = response.data[0].alocation;
        this.grade = response.data[0].star;
        this.addressToLnglat(this.location).then((res) => {
          this.Lnglat = res.split(",");
          this.nearestAttraction(this.location);
        });
      });

    this.$axios
      .get(
        "http://49.234.18.247:8080/api/FunGetCommentByAttractionId/" +
          this.AttrId
      )
      .then((response) => {
        this.dianping_number = response.data.length;
        if (this.comments.length < response.data.length) {
          for (var j = this.comments.length; j < response.data.length; j++)
            this.comments.push({
              userName: "柏拉M兔",
              userAvatar:
                "https://ak-d.tripcdn.com/images/t1/headphoto/424/398/503/0386f569fd0d4b488ff41b64bbc5743b_R_100_100_R5_Q70_D.jpg",
              commentTicket: "成人票",
              bookTime: "2021-08-12",
              commentPicture:
                "https://ak-d.tripcdn.com/images/0230c120008um7i69E50B_R_150_150_R5_Q70_D.jpg",
              userCommentNum: 13,
              commentRate: 5.0,
              commentContent: " ",
              commentTime: "08/14/2021 20:53",
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
              "http://49.234.18.247:8080/api/FunGetAllAttractionOrderByUserid/" +
                temp +
                "&" +
                this.AttrId
            )
            .then((response) => {
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
          this.comments[i].commentTime = response.data[i].acommenT_TIME;
          this.comments[i].commentRate = response.data[i].grade;
          this.comments[i].commentContent = response.data[i].ctext;
        }
        this.commentList = this.comments;
      });
  },
};
</script>
