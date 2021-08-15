<template>
  <el-container direction="vertical">
    <Header activeIndex="2" />
    <Search />
    <el-divider></el-divider>
    <el-card class="box-card" shadow="never">
      <div class="clearfix">
        <div class="namePicture">
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
          <i class="el-icon-location"></i>{{ location }}
          <span @click="viewMap" class="hint">查看地图</span>
          <div>
            <i class="el-icon-s-home"></i>{{ description }}
            <span @click="viewMore" class="hint">查看更多</span>
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
              <a href="#comments" style="color: cornflowerblue; font-size: 14px"
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
            <div class="map"><el-amap vid="amapDemo"></el-amap></div>
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
              <p style="font-size: 8px; color: gray; margin-top: 5px">
                附近1公里内有{{ attrationNum }}个景点
              </p>
              <div @click="viewMap" class="hint" style="margin-top: 75px">
                查看完整地图
              </div>
            </div>
          </div>
          <el-divider></el-divider>
          <div style="font-size: 14px; margin-top: 0px">
            <span>接机服务</span><el-divider direction="vertical"></el-divider>
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
        <li v-for="room in rooms" :key="room.roomName">
          <Room
            :roomName="room.roomName"
            :customerNum="room.customerNum"
            :bed="room.bed"
            :dish="room.dish"
            :smoke="room.smoke"
            :window="room.window"
            :cancel="room.cancel"
            :price="room.price"
            :originalPrice="room.originalPrice"
            :coverImgUrl="room.coverImgUrl"
          />
        </li>
      </ul>
    </div>
    <br />
    <el-card class="box-card" shadow="never">
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
      <div class="sort">
        <el-form :inline="true" :model="form_Select">
          <el-form-item>
            <el-select v-model="form_Select.roomType" @change="roomTypeChange">
              <el-option label="所有房型" value="所有房型"></el-option>
              <el-option label="大床房" value="大床房"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="form_Select.sortWay" @change="sortWayChange">
              <el-option label="推荐排序" value="推荐排序"></el-option>
              <el-option label="最近入住" value="最近入住"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <div id="comments">
      <ul>
        <li v-for="comment in comments" :key="comment.userName">
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
      <!-- 得加个分页 -->
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
      <div class="hotels">
        <div
          class="box"
          v-for="(item, index) in hotels.slice(0, 8)"
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
            <img
              src="../../assets/img/diamond.svg"
              v-for="i in item.star"
              :key="i"
              style="margin-top: 2px"
            />

            <div class="Details">
              <div class="leftstar">
                <div class="star">
                  {{ item.star }}.0<i
                    style="font-style: normal; font-size: 11px; color: #4880cf"
                    >/5</i
                  >
                </div>
                <span class="dianping">{{ item.commentnum }}点评</span>
              </div>
              <div class="rightprice">
                ￥{{ item.price
                }}<i style="font-size: 11px; font-style: normal; color: gray"
                  >&nbsp;起</i
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-card>
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
.box-card {
  margin-left: 10%;
  margin-right: 10%;
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
  margin-left: 15px;
}
.attrationName {
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
</style>


<script>
import Header from "@/components/Header.vue";
import Search from "@/components/Search.vue";
import Room from "@/components/room.vue";
import Comment from "@/components/comment.vue";
import Footer1 from "@/components/Footer1.vue";
export default {
  components: {
    Header,
    Search,
    Room,
    Comment,
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
      description: "开业：2021 客房数：198 联系方式：+86-19823483690",
      minPrice: 99,
      baseImg:
        "https://dimg11.c-ctrip.com/images/0AD5d120008nj322zC5A7_R_300_120.jpg",
      form_Select: {
        roomType: "所有房型",
        sortWay: "最近入住",
      },
      airport: 22.78,
      train: 12.45,
      subway: 10.44,
      attrationNum: 7,
      rooms: [
        {
          roomName: "山系·城景大床房",
          customerNum: 2,
          bed: "1张大床",
          dish: "无",
          smoke: "可",
          window: "有",
          cancel: "不可取消",
          price: 999,
          originalPrice: 1314,
          coverImgUrl:
            "https://dimg11.c-ctrip.com/images/0AD5d120008nj322zC5A7_R_300_120.jpg",
        },
        {
          roomName: "山系·城景大床房",
          customerNum: 2,
          bed: "1张大床和1张双人床",
          dish: "有",
          smoke: "可",
          window: "有",
          cancel: "不可取消",
          price: 999,
          originalPrice: 1314,
          coverImgUrl:
            "https://dimg11.c-ctrip.com/images/0AD5d120008nj322zC5A7_R_300_120.jpg",
        },
        {
          roomName: "山系·城景大床房",
          customerNum: 2,
          bed: "1张大床和1张双人床",
          dish: "有",
          smoke: "可",
          window: "有",
          cancel: "不可取消",
          price: 999,
          originalPrice: 1314,
          coverImgUrl:
            "https://dimg11.c-ctrip.com/images/0AD5d120008nj322zC5A7_R_300_120.jpg",
        },
        {
          roomName: "山系·城景大床房",
          customerNum: 2,
          bed: "1张大床和1张双人床",
          dish: "有",
          smoke: "可",
          window: "有",
          cancel: "不可取消",
          price: 999,
          originalPrice: 1314,
          coverImgUrl:
            "https://dimg11.c-ctrip.com/images/0AD5d120008nj322zC5A7_R_300_120.jpg",
        },
      ],
      comments: [
        {
          userName: "蔡蔡小游侠",
          userAvatar:
            "https://ak-d.tripcdn.com/images/Z80p180000013uw9yF21F_R_100_100_R5_Q70_D.jpg",
          commentRoom: "山系·城景大床房",
          bookTime: "08/14/2021",
          commentPicture:
            "https://ak-d.tripcdn.com/images/0230c120008um7i69E50B_R_150_150_R5_Q70_D.jpg",
          userCommentNum: 1,
          commentRate: 4,
          commentContent:
            "楼下有个人的早餐店铺 豌杂面还不错，不能加床。 🛏️床确实是1.5米的，这个必须肯定。楼下有免费停车🅿️场 。 房间没有介绍的45平米，感觉被骗了。最多30平米左右，窗子对着居民楼，跟图片上完全不一样。整个旅途住宿费最贵的 真的是最差的一家。江边一直有施工，很乱。",
          commentTime: "08/14/2021 20:53",
        },
        {
          userName: "兰州潇洒哥",
          userAvatar:
            "https://ak-d.tripcdn.com/images/t1/headphoto/424/398/503/0386f569fd0d4b488ff41b64bbc5743b_R_100_100_R5_Q70_D.jpg",
          commentRoom: "山系·城景大床房",
          bookTime: "08/14/2021",
          commentPicture:
            "https://ak-d.tripcdn.com/images/0230c120008um7i69E50B_R_150_150_R5_Q70_D.jpg",
          userCommentNum: 1,
          commentRate: 5.0,
          commentContent:
            "环境真的挺不错，价格对于学生党真的好实惠！离解放碑挺近，没想到这个价钱能订到这么好的酒店！我和闺蜜都很满意！保洁阿姨的态度也很好，见到还会问好！强烈推荐！下次来还会订！",
          commentTime: "08/14/2021 20:53",
        },
        {
          userName: "蔡蔡小游侠",
          userAvatar:
            "https://ak-d.tripcdn.com/images/Z80p180000013uw9yF21F_R_100_100_R5_Q70_D.jpg",
          commentRoom: "山系·城景大床房",
          bookTime: "08/14/2021",
          commentPicture:
            "https://ak-d.tripcdn.com/images/0230c120008um7i69E50B_R_150_150_R5_Q70_D.jpg",
          userCommentNum: 1,
          commentRate: 4,
          commentContent:
            "楼下有个人的早餐店铺 豌杂面还不错，不能加床。 🛏️床确实是1.5米的，这个必须肯定。楼下有免费停车🅿️场 。 房间没有介绍的45平米，感觉被骗了。最多30平米左右，窗子对着居民楼，跟图片上完全不一样。整个旅途住宿费最贵的 真的是最差的一家。江边一直有施工，很乱。",
          commentTime: "08/14/2021 20:53",
        },
        {
          userName: "兰州潇洒哥",
          userAvatar:
            "https://ak-d.tripcdn.com/images/t1/headphoto/424/398/503/0386f569fd0d4b488ff41b64bbc5743b_R_100_100_R5_Q70_D.jpg",
          commentRoom: "山系·城景大床房",
          bookTime: "08/14/2021",
          commentPicture:
            "https://ak-d.tripcdn.com/images/0230c120008um7i69E50B_R_150_150_R5_Q70_D.jpg",
          userCommentNum: 1,
          commentRate: 5.0,
          commentContent:
            "环境真的挺不错，价格对于学生党真的好实惠！离解放碑挺近，没想到这个价钱能订到这么好的酒店！我和闺蜜都很满意！保洁阿姨的态度也很好，见到还会问好！强烈推荐！下次来还会订！",
          commentTime: "08/14/2021 20:53",
        },
        {
          userName: "兰州潇洒哥",
          userAvatar:
            "https://ak-d.tripcdn.com/images/t1/headphoto/424/398/503/0386f569fd0d4b488ff41b64bbc5743b_R_100_100_R5_Q70_D.jpg",
          commentRoom: "山系·城景大床房",
          bookTime: "08/14/2021",
          commentPicture:
            "https://ak-d.tripcdn.com/images/0230c120008um7i69E50B_R_150_150_R5_Q70_D.jpg",
          userCommentNum: 1,
          commentRate: 5.0,
          commentContent:
            "环境真的挺不错，价格对于学生党真的好实惠！离解放碑挺近，没想到这个价钱能订到这么好的酒店！我和闺蜜都很满意！保洁阿姨的态度也很好，见到还会问好！强烈推荐！下次来还会订！",
          commentTime: "08/14/2021 20:53",
        },
      ],
      hotels: [
        {
          name: "格林豪泰酒店",
          star: 2,
          price: 400,
          address: "同济大学正门外",
          commentnum: 250,
          img: "https://dimg11.c-ctrip.com/images/0AD5d120008nj322zC5A7_R_300_120.jpg",
        },
        {
          name: "格林豪泰酒店",
          star: 3,
          price: 400,
          address: "同济大学正门外",
          commentnum: 250,
          img: "https://dimg11.c-ctrip.com/images/0AD5d120008nj322zC5A7_R_300_120.jpg",
        },
        {
          name: "格林豪泰酒店",
          star: 3,
          price: 400,
          address: "同济大学正门外",
          commentnum: 250,
          img: "https://dimg11.c-ctrip.com/images/0AD5d120008nj322zC5A7_R_300_120.jpg",
        },
        {
          name: "格林豪泰酒店",
          star: 3,
          price: 400,
          address: "同济大学正门外",
          commentnum: 250,
          img: "https://dimg11.c-ctrip.com/images/0AD5d120008nj322zC5A7_R_300_120.jpg",
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
    roomTypeChange() {},
    sortWayChange() {},
  },
  mounted() {},
};
</script>
