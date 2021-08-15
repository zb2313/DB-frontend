<template>
  <el-container direction="vertical">
    <Header activeIndex="1" />
    <Search />
    <el-divider></el-divider>
    <el-card class="box-card" shadow="never">
      <div class="clearfix">
        <div class="name_picture">
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
              <a href="#comment" style="color: cornflowerblue; font-size: 14px"
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

                <a href="#room" class="choose_btn" style="float: left">
                  选择房间
                </a>
              </div>
            </div>
          </div>
          <el-divider></el-divider>
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
.name_picture {
  float: left;
  width: 700px;
}
.other {
  float: left;
  margin-top: 100px;
  margin-left: 15px;
}
.hotelName {
  float: left;
}
.star {
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
.dianping {
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
/* .choose_btn:hover {
  cursor: pointer;
} */
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
</style>


<script>
import Header from "@/components/Header.vue";
import Search from "@/components/Search.vue";
export default {
  components: {
    Header,
    Search,
  },
  data() {
    return {
      hotelId: "",
      hotelName: "速八酒店",
      starNum: 5,
      location: "上海市嘉定区安亭镇曹安公路4800号",
      dianping_number: 999,
      grade: 5,
      description: "开业：2021 客房数：198 联系方式：+86-19823483690",
      minPrice: 99,
      baseImg:
        "https://dimg11.c-ctrip.com/images/0AD5d120008nj322zC5A7_R_300_120.jpg",
      comments: [
        {
          userName: "蔡蔡小游侠",
          userAvatar:
            "https://dimg11.c-ctrip.com/images/0AD5d120008nj322zC5A7_R_300_120.jpg",
          commentRoom: "",
          userCommentNum: 1,
          commentRate: 2.5,
          commentContent:
            "楼下有个人的早餐店铺 豌杂面还不错，不能加床。 🛏️床确实是1.5米的，这个必须肯定。楼下有免费停车🅿️场 。 房间没有介绍的45平米，感觉被骗了。最多30平米左右，窗子对着居民楼，跟图片上完全不一样。整个旅途住宿费最贵的 真的是最差的一家。江边一直有施工，很乱。",
          commentTime: "08/14/2021 20:53",
        },
        {
          userName: "兰州潇洒哥",
          userAvatar: "",
          commentRoom:
            "https://dimg11.c-ctrip.com/images/0AD5d120008nj322zC5A7_R_300_120.jpg",
          userCommentNum: 1,
          commentRate: 5.0,
          commentContent:
            "环境真的挺不错，价格对于学生党真的好实惠！离解放碑挺近，没想到这个价钱能订到这么好的酒店！我和闺蜜都很满意！保洁阿姨的态度也很好，见到还会问好！强烈推荐！下次来还会订！",
          commentTime: "08/14/2021 20:53",
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
  },
  mounted() {},
};
</script>
