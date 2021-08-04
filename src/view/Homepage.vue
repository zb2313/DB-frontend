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
              >{{ province }}出发
              <div class="el-icon-caret-bottom"></div
            ></span>
            <div class="drop-content">
              <a href="" style="color: black">北京</a>
              <a href="" style="color: black">上海</a>
              <a href="" style="color: black">天津</a>
              <a href="" style="color: black">广州</a>
              <a href="" style="color: black">深圳</a>
              <a href="" style="color: black">南京</a>
              <a href="" style="color: black">三亚</a>
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
            <div class="attriInfo"></div>
            <div class="attriInfo"></div>
            <div class="attriInfo"></div>
            <div class="attriInfo"></div>
            <div class="attriInfo"></div>
            <div class="attriInfo"></div>
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
            <div class="hotelInfo"></div>
            <div class="hotelInfo"></div>
            <div class="hotelInfo"></div>
            <div class="hotelInfo"></div>
            <div class="hotelInfo"></div>
            <div class="hotelInfo"></div>
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
              >{{ province }}出发
              <div class="el-icon-caret-bottom"></div
            ></span>
            <div class="drop-content">
              <a href="" style="color: black">北京</a>
              <a href="" style="color: black">上海</a>
              <a href="" style="color: black">天津</a>
              <a href="" style="color: black">广州</a>
              <a href="" style="color: black">深圳</a>
              <a href="" style="color: black">南京</a>
              <a href="" style="color: black">三亚</a>
            </div>
          </span>
        </h2>
        <div class="Box1">
          <div class="ticketBox">
            <div
              class="ticketInfo"
              v-for="item in tickets"
              :key="item.index"
            ></div>
          </div>
        </div>
      </div>
    </el-main>

    <el-footer>
      <div class="main infomation">
        <dl class="footer-item advantage">
          <dt>为什么选择旅道</dt>
          <dd>
            <div class="advan-item advan-server">
              <div class="advan-img">
                <i class="ico server-ico"></i>
              </div>
              <div class="advan-text">
                <p class="advan-title">放心的服务</p>
                <p>领先的服务标准 独创的保障体系</p>
              </div>
            </div>

            <div class="advan-item advan-price">
              <div class="advan-img">
                <i class="ico price-ico"></i>
              </div>
              <div class="advan-text">
                <p class="advan-title">放心的价格</p>
                <p>具竞争力的价格 无任何隐形消费</p>
              </div>
            </div>
          </dd>
        </dl>
        <el-divider direction="vertical"></el-divider>
        <dl class="footer-item info">
          <dt>旅游资讯</dt>
          <dd class="ft-link-item">宾馆索引</dd>
          <dd class="ft-link-item">景点索引</dd>
          <dd class="ft-link-item">攻略索引</dd>
          <dd class="ft-link-item">机票索引</dd>
          <dd class="ft-link-item">火车票索引</dd>
        </dl>
        <el-divider direction="vertical"></el-divider>
        <dl class="footer-item advantage">
          <dt>加盟合作</dt>
          <dd class="ft-link-item">分销联盟</dd>
          <dd class="ft-link-item">友情链接</dd>
          <dd class="ft-link-item">广告业务</dd>
          <dd class="ft-link-item">保险代理</dd>
          <dd class="ft-link-item">酒店加盟</dd>
          <dd class="ft-link-item">景区合作</dd>
          <dd class="ft-link-item">智慧旅游</dd>
          <dd class="ft-link-item">更多合作</dd>
        </dl>
        <el-divider direction="vertical"></el-divider>
        <dl class="footer-item advantage">
          <dt>关于旅道</dt>
          <dd class="ft-link-item">关于旅道</dd>
          <dd class="ft-link-item">联系我们</dd>
          <dd class="ft-link-item">诚聘英才</dd>
          <dd class="ft-link-item">用户协议</dd>
          <dd class="ft-link-item">隐私政策</dd>
          <dd class="ft-link-item">营业执照</dd>
          <dd class="ft-link-item">安全中心</dd>
          <dd class="ft-link-item">知识产权</dd>
          <dd class="ft-link-item">内容中心</dd>
        </dl>
      </div>

      <div class="copyright">
        <p class="copyright">
          <a
            href="http://pages.ctrip.com/public/copyright.htm"
            style="color: #666"
            >Copyright&copy;</a
          >
          1999-2021,&nbsp;
          <a href="http://www.ctrip.com/">ctrip.com</a>. All rights
          reserved.&nbsp;|&nbsp;
          <a
            target="_blank"
            href="https://ws.downloadfile.fx.ctripcorp.com/files/6/portal/0AS29120008br5oqa9ADD.pdf"
            >ICP证：沪B2-20050130&nbsp;|&nbsp;</a
          ><a rel="nofollow" target="_blank" href="http://beian.miit.gov.cn/"
            >沪ICP备08023580号</a
          >
        </p>
        <p class="gns">
          <a
            href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31010502002731"
            ><i class="icon-gns"></i>沪公网备31010502002731号</a
          >丨<a
            href="https://ws.downloadfile.fx.ctripcorp.com/files/6/portal/0AS6j120008cc8iw85F86.pdf"
            >互联网药品信息服务资格证</a
          >
        </p>
        <p class="supervision-call">
          违法和不良信息举报电话021-22500846丨全国旅游投诉热线12301丨<a
            href="http://pages.c-ctrip.com/commerce/promote/201611/other/zz/pc/index.html"
            target="_blank"
            >上海市旅游网站落实诚信建设主体责任承诺书</a
          >
        </p>
        <div class="honour_wrap">
          <a
            href="http://www.cecpsp.org.cn/index.credit?action=certDetail&amp;id=40288084605466f1016057ea4cb20021"
            class="honour1"
            target="_blank"
            rel="nofollow"
            >信用评级</a
          ><a
            href="http://scjgj.sh.gov.cn/lz/licenseLink.do?method=licenceView&amp;entyId=20110428175405415"
            title="工商亮照标识"
            class="honour2"
            target="_blank"
            rel="nofollow"
            >上海工商</a
          ><a
            href="https://credit.szfw.org/CX20111018000615000623.html"
            title="诚信认证示范企业"
            class="honour3"
            target="_blank"
            rel="nofollow"
            >诚信网站</a
          ><a
            href="http://www.zx110.org/"
            class="honour4"
            target="_blank"
            rel="nofollow"
            title="征信网"
            >网络社会征信网</a
          ><a
            href="http://www.shjbzx.cn/"
            class="honour5"
            target="_blank"
            rel="nofollow"
            title="上海市互联网违法与违规信息举报中心"
            >信息举报中心</a
          ><a
            href="https://ss.knet.cn/verifyseal.dll?sn=e12061531010025926306977"
            class="honour6"
            target="_blank"
            rel="nofollow"
            title="可信网站"
            >可信网站</a
          >
        </div>
        <div class="honour_wrap">
          <a
            href="http://www.creditchina.gov.cn/"
            class="honour10"
            title="信用中国"
            target="_blank"
            rel="nofollow"
            >信用中国</a
          ><a
            href="https://www.12377.cn/"
            class="honour12"
            title="网上有害信息举报专区"
            target="_blank"
            rel="nofollow"
            >网上有害信息举报专区</a
          ><a
            href="https://im-synthesize.ctrip.com/complaints/rights/AppealCreate"
            class="honour11"
            title="消费维权联络点"
            target="_blank"
            rel="nofollow"
            >消费维权联络点</a
          ><a
            href="https://fw.scjgj.sh.gov.cn/platform/survey/step1_phone"
            class="honour9"
            title="网购大家评"
            target="_blank"
            rel="nofollow"
            >网购大家评</a
          >
        </div>
      </div>
    </el-footer>
  </el-container>
</template>

<script>
import Header from "@/components/Header.vue";
export default {
  name: "Homepage",
  components: {
    Header,
  },
  data() {
    return {
      province: "上海",
      show: [
        [true, false, false],
        [true, false],
        [true, false],
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
  margin: 0 auto;
  width: 61.8%;
  color: #003680;
}
.el-button {
  background-color: #003680;
  border: none;
}
.el-footer .el-divider--vertical {
  float: left;
  height: 170px;
  margin: 8px 10px;
  width: 1.5px;
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
.attriInfo:hover,
.hotelInfo:hover {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  cursor: pointer;
}
.ticketBox {
  width: 970px;
  height: 100%;
  margin: auto;
  padding: auto;
}
.ticketInfo {
  float: left;
  margin: 19px 10px 0px 10px;
  width: 220px;
  height: 105px;
  background-color: #fff;
  border-radius: 4px;
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
.el-footer {
  height: 350px !important;
  background-color: #f2f2f2;
}

.el-footer a:link,
.el-footer .copyright {
  color: #666;
  text-align: center;
}

.infomation {
  height: 200px;
}
.el-footer dl {
  float: left;
  width: 250px;
  font-family: "Microsoft YaHei", SimHei, SimSun, Tahoma, Verdana, Arial,
    sans-serif;
}
dt {
  font-size: 18px;
  margin: 8px 0;
}
.el-footer dd {
  color: #666;
}
.advan-item {
  width: 300px;
  height: 50px;
  margin-bottom: 15px;
}
.advan-img {
  float: left;
}
.ico {
  display: inline-block;
  width: 36px;
  height: 36px;
  background-image: url("http://pic.c-ctrip.com/platform/online/home/pic_partner.png");
  background-repeat: no-repeat;
  border-radius: 18px;
}
.server-ico {
  background-position: -41px -250px;
}

.price-ico {
  background-position: -41px -200px;
}
.advan-text {
  float: left;
  margin-left: 15px;
}
.advan-text .advan-title {
  font: bold 16px "Microsoft Yahei";
  color: black;
}

.advan-text p {
  font-size: 13px;
}

.ft-link-item {
  float: left;
  width: 120px;
  margin-top: 8px;
  font-size: 14px;
}

.icon-gns,
.honour_wrap a,
.honour_wrap span {
  background-image: url(//pic.c-ctrip.com/platform/online/home/phone_list20190617.png);
  background-repeat: no-repeat;
  background-color: f2f2f2;
  background-position: 0 0;
}
.icon-gns {
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: 3px;
  background-position: 0 -235px;
  vertical-align: middle;
}
.honour_wrap {
  display: inline-block;
  padding-top: 10px;
  *display: inline;
  *zoom: 1;
  text-align: left;
}
.honour_wrap a {
  float: left;
  margin: 0 5px;
  width: 88px;
  height: 32px;
  border: 1px solid #d1d1d1;
  border-radius: 2px;
  font: 12px/32px Simsun;
  color: #666;
  overflow: hidden;
  text-indent: -99em;
  white-space: normal;
  background-color: #fff;
}
.honour_wrap .honour1 {
  background-position: -88px -50px;
  text-indent: 36px;
}
.honour_wrap .honour2 {
  background-position: -88px -85px;
  text-indent: 36px;
}
.honour_wrap .honour3 {
  background-position: 0 -50px;
}
.honour_wrap .honour4 {
  background-position: -88px -118px;
  text-indent: 0;
  padding: 2px 0 2px 37px;
  width: 51px;
  height: 28px;
  line-height: 1.2;
}
.honour_wrap .honour5 {
  width: 95px;
  background-position: 0 -387px;
}
.honour_wrap .honour6 {
  background-position: 0 -118px;
}
.honour_wrap .honour7 {
  background-position: 0 -155px;
  width: 128px;
}
.honour_wrap .honour8 {
  background-position: 0 -193px;
  width: 90px;
}
.honour_wrap .honour10 {
  background-position: 0 -429px;
  width: 102px;
}
.honour_wrap .honour11 {
  display: none;
}
.honour_wrap .honour11 {
  background-position: 0 -480px;
  width: 50px;
}
.honour_wrap .honour12 {
  background-position: 0 -155px;
  width: 114px;
}
.honour_wrap .honour9 {
  background-position: 0 -350px;
  width: 130px;
}
</style>