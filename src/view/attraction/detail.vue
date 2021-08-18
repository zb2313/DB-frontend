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
                    购买门票
                  </a>
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
                <i class="el-icon-date"></i> &nbsp;&nbsp;{{ openTime }}-{{
                  closeTime
                }}开放（ {{ stopTime }}停止入园）
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

      <div class="clearfix box-card">
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
                    <el-option label="所有点评" value="所有点评"></el-option>
                    <el-option
                      label="好评（打分>3）"
                      value="好评（打分>3）"
                    ></el-option>
                    <el-option
                      label="非好评（打分<4）"
                      value="非好评（打分<4）"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-select
                    v-model="form_Select.sortWay"
                    @change="sortWayChange"
                  >
                    <el-option label="智能排序" value="智能排序"></el-option>
                    <el-option label="最近购买" value="最近购买"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </div>
          </el-card>
          <div id="comments">
            <ul>
              <li v-for="comment in comments" :key="comment.userName">
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
            <!-- 得加个分页 -->
          </div>
          <br />
          <!-- 景点详情 -->
          <el-card class="left-box-card details" shadow="never">
            <h1>景点介绍</h1>
            <div>
              <el-row type="flex" style="margin-top: 20px">
                <el-col :span="24">{{ description }}</el-col>
              </el-row>
              <el-divider></el-divider>
              <h1>开放时间</h1>
              <el-row type="flex" style="margin-top: 20px">
                <el-col :span="24"
                  >7月1日-8月31日 周一至周五 09:00-20:00(最晚入园19:00)
                  周六至周日
                  09:00-20:30(最晚入园19:30)；年卡中心开卡时间：开园前半小时至闭园前一个半小时。
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
              v-for="(item, index) in attrations.slice(0, 8)"
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
                <div class="Name" style="font-size: 14px; font-weight: 700">
                  {{ item.name }}
                </div>
                <div class="Details">
                  <div class="leftstar">
                    <div class="star">
                      {{ item.star
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
                      >{{ item.commentnum }}点评</i
                    >
                  </div>
                  <div class="rightprice">
                    <i style="font-size: 11px; font-style: normal; color: gray"
                      >&nbsp;直线距离{{ item.distance }}米</i
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
  width: 40%;
  margin-right: 5px;
  text-align: right;
  font-size: 22px;
  font-weight: 700;
  color: red;
  margin-top: -5px;
}
</style>


<script>
import Header from "@/components/Header.vue";
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
      hotelId: "",
      attrationName: "上海海昌海洋公园",
      starNum: 5,
      location: "上海市浦东新区南汇新城镇银飞路166号",
      dianping_number: 999,
      grade: 5,
      openTime: "09:00",
      closeTime: "20:30",
      stopTime: "19:30",
      minPrice: 59,
      nearSubwayStation: "临港中运量1号线杞青路站",
      nearSubwayDistance: 793,
      description:
        "上海海昌海洋公园被评定为国家4A级旅游景区，以海洋文化为主题，缔造五大区域和一个度假酒店，拥有《虎鲸科普秀》《海象嘻游记》《海豚恋曲》等十六大明星剧目；设有南极企鹅馆、海兽探秘馆等六大动物展示场馆，提供火山漂流、海豚过山车等十余项游乐设施，汇聚三万余只海洋生物，展现海洋梦幻花车巡游及百场演艺！",
      baseImg:
        "https://dimg06.c-ctrip.com/images/100q11000000qcqie2920_C_1600_1200.jpg",
      form_Select: {
        commentLevel: "所有点评",
        sortWay: "最近购买",
      },
      airport: 22.78,
      train: 12.45,
      subway: 10.44,
      attrationNum: 7,
      call: "400-601-6699,021-50606666",
      comments: [
        {
          userName: "蔡蔡小游侠",
          userAvatar:
            "https://ak-d.tripcdn.com/images/Z80p180000013uw9yF21F_R_100_100_R5_Q70_D.jpg",
          commentTicket: "成人票",
          bookTime: "08/14/2021",
          commentPicture:
            "https://ak-d.tripcdn.com/images/0230c120008um7i69E50B_R_150_150_R5_Q70_D.jpg",
          userCommentNum: 12,
          commentRate: 4,
          commentContent:
            "真的真的超赞的！做攻略想玩的都玩到啦～ 交通： 我们开车去的，实在是太偏了！花了一个多小时去的，宝宝一直在问到了没？回来有些堵车，时间更长。一次50元。九点过一点点到的，停车已经停到3楼了！ 游玩路线： 路上先在公众号查了下剧场时间，发现和做的攻略有点出入，稍微调整了一点，先看了海狮、企鹅、天幕影院，穿过鸽子，时间将将好看虎鲸表演！没人敢坐前三排，我们仨勇猛的很，太爽了！下午去喂了斑海豹、花了60买了4条鱼，太亏了，人家海豹都不要吃，哼哼。又时间刚刚好，坐在前排看了白鲸表演，很震撼。看完坐缆车，要等40分钟，我们差不多35分钟排到，宝宝正好睡了一觉。起来在缆车上看风景～之后看了海洋世界馆、珊瑚水母馆、美人鱼表演，垮馆的时候又碰上花车巡游，和美人鱼隔空互动了！哈哈哈。 tips： 带宝宝的话推车和零食水果很重要，看表演后场的时候可以消磨时间～现在的天气，南极北极馆和室外温差大，给宝宝准备件外套吧，看虎鲸表演坐前15排的话的请带好雨具！",
          commentTime: "08/14/2021 20:53",
        },
        {
          userName: "柏拉M兔",
          userAvatar:
            "https://ak-d.tripcdn.com/images/t1/headphoto/424/398/503/0386f569fd0d4b488ff41b64bbc5743b_R_100_100_R5_Q70_D.jpg",
          commentTicket: "成人票",
          bookTime: "08/14/2021",
          commentPicture:
            "https://ak-d.tripcdn.com/images/0230c120008um7i69E50B_R_150_150_R5_Q70_D.jpg",
          userCommentNum: 13,
          commentRate: 5.0,
          commentContent:
            "宝宝两岁还小，没有带他去比较贵的迪士尼，而是性价比相对高的海昌。 这次是他第二次来，第一次是他17个月的时候。 两次都在携程boss带货直播中抢购了房+两个成人票的套餐，1300左右的价格，玩两天住一晚太核算啦。 而且海昌海洋公园的酒店边门就是乐园的入口，玩累了，拉臭臭了，肚子饿了，衣服出汗湿了，回房间休整一下，不要太方便。 娃小，不懂什么IP，也不能玩刺激的项目，海昌乐园的项目就特别合适，人不多的时候，海洋木马项目的工作人员会让可以连续乘个两次。 乐园的动物也有很多，有北京熊、虎鲸、白鲸、海豚、企鹅、海豹等等大动物，也有各种好看的热带鱼、珊瑚等等。 总之，娃很开心，老母亲觉得性价比很高。",
          commentTime: "08/14/2021 20:53",
        },
        {
          userName: "加油干饭呀",
          userAvatar:
            "https://ak-d.tripcdn.com/images/Z80p180000013uw9yF21F_R_100_100_R5_Q70_D.jpg",
          commentTicket: "成人票",
          bookTime: "08/14/2021",
          commentPicture:
            "https://ak-d.tripcdn.com/images/0230c120008um7i69E50B_R_150_150_R5_Q70_D.jpg",
          userCommentNum: 115,
          commentRate: 4,
          commentContent:
            "不管年龄多大 总有人把你宠成孩子 不能出沪的春节假期，人山人海的除了迪士尼，还有海昌海洋公园，抓住小长假的尾巴错峰出行，分享一下省钱又省时的玩乐攻略💌 首先要告诉你们的是，海洋公园真的没有你们想象中那么大，但是由于标识不够清晰容易晕头转向，可以关注gzh获取电子地图和当日演出表 🎫行程紧凑的话游玩半天就够了，推荐购买7折夜场票，3点入园8点闭园，绝对值回票价 🚗不建议开车前往，有限的车位无法满足膨胀的人流，16号线打车5分钟即可抵达 🗺参观顺序完全被演出时间牵着走，虎鲸和海豚表演值得一看，还有人鱼公主从海底捞“福”，非常具有春节特色哟 🎆晚上7:30有光影水幕和无人机表演，江边最佳观景位先到先得，结束以后还会有烟花秀哦",
          commentTime: "08/14/2021 20:53",
        },
        {
          userName: "erin1227",
          userAvatar:
            "https://ak-d.tripcdn.com/images/t1/headphoto/424/398/503/0386f569fd0d4b488ff41b64bbc5743b_R_100_100_R5_Q70_D.jpg",
          commentTicket: "成人票",
          bookTime: "08/14/2021",
          commentPicture:
            "https://ak-d.tripcdn.com/images/0230c120008um7i69E50B_R_150_150_R5_Q70_D.jpg",
          userCommentNum: 12,
          commentRate: 5.0,
          commentContent:
            "我们是上午11点半到的，根据场馆表演时间，先后去看了11:45海象表演，12:204D电影，13点的虎鲸表演，13:40晶彩奇航，13:45鲨鱼馆的人鱼表演，14:15海豚恋曲（海豚馆），15:00白鲸之恋，15:20水上飞人。看完表演，去了几个场馆看海洋动物，因为基本都是在室内的，所以整个下午都不算太热。4点半左右排队45分钟去了漂流，在漂流门口花10块钱买一次性雨披和鞋套。最后去儿童乐园玩了几个项目，6点半结束，没有看晚上的灯光秀，有点遗憾。",
          commentTime: "08/14/2021 20:53",
        },
        {
          userName: "大胃张😍",
          userAvatar:
            "https://ak-d.tripcdn.com/images/t1/headphoto/424/398/503/0386f569fd0d4b488ff41b64bbc5743b_R_100_100_R5_Q70_D.jpg",
          commentTicket: "成人票",
          bookTime: "08/14/2021",
          commentPicture:
            "https://ak-d.tripcdn.com/images/0230c120008um7i69E50B_R_150_150_R5_Q70_D.jpg",
          userCommentNum: 25,
          commentRate: 3,
          commentContent: "只能说一般般呀",
          commentTime: "08/14/2021 20:53",
        },
      ],
      attrations: [
        {
          name: "南极企鹅馆",
          star: 4.8,
          price: 400,
          address: "同济大学正门外",
          commentnum: 250,
          img: "https://dimg07.c-ctrip.com/images/10091f000001gsmc674CC_C_1600_1200.jpg",
          distance: 300,
        },
        {
          name: "海豚过山车",
          star: 3.2,
          price: 400,
          address: "同济大学正门外",
          commentnum: 250,
          img: "https://dimg04.c-ctrip.com/images/100j0y000000m8x8jB7D9_C_1600_1200.jpg",
          distance: 150,
        },
        {
          name: "虎鲸剧场《虎鲸科普秀》",
          star: 3.6,
          price: 400,
          address: "同济大学正门外",
          commentnum: 250,
          img: "https://dimg03.c-ctrip.com/images/350e19000001661l2B737_C_1600_1200.jpg",
          distance: 400,
        },
        {
          name: "深海奇航",
          star: 4.6,
          price: 400,
          address: "同济大学正门外",
          commentnum: 250,
          img: "https://dimg06.c-ctrip.com/images/100v1f000001h1b2y1909_C_1600_1200.jpg",
          distance: 130,
        },
      ],
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
      } else {
        return "非常差";
      }
    },
  },
  methods: {
    viewMap() {
      const h = this.$createElement;
      this.$msgbox({
        title: "消息",
        message: h("p", null, [
          h("span", null, "内容可以是 "),
          h("i", { style: "color: teal" }, "VNode"),
        ]),
        showCancelButton: false,
        confirmButtonText: "确定",
      });
    },
    viewMore() {
      const h = this.$createElement;
      this.$msgbox({
        title: "消息",
        message: h("p", null, [
          h("span", null, "内容可以是 "),
          h("i", { style: "color: teal" }, "VNode"),
        ]),
        showCancelButton: false,
        confirmButtonText: "确定",
      });
    },
    commentLevelChange() {},
    sortWayChange() {},
  },
  mounted() {},
};
</script>
