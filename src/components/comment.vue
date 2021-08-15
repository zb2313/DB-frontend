<template>
  <el-card class="content" shadow="never">
    <div class="clearfix">
      <div class="leftPart">
        <div style="width: 200px" class="clearfix">
          <div
            class="leftimg"
            :style="{
              backgroundImage:
                'url(' + (userAvatar ? userAvatar : baseImg) + ')',
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat',
            }"
          ></div>
          <div style="float: left">
            <p>{{ userName }}</p>
            <p class="hint">{{ commentTime }}</p>
          </div>
        </div>
        <div class="hint">
          <p>
            <i class="el-icon-receiving"></i>
            <span>{{ commentRoom }}</span>
          </p>
          <p>
            <i class="el-icon-date"></i>
            <span>于{{ bookTime }}入住</span>
          </p>
          <p>
            <i class="el-icon-edit-outline"></i>
            <span>{{ userCommentNum }}条点评</span>
          </p>
        </div>
      </div>

      <!-- 评论内容 -->
      <div class="comment">
        <div>
          <span class="rate">{{ commentRate }}</span>
          <span class="hint">/5</span><span class="rate">{{ level }}</span>
        </div>
        <div>
          {{ commentContent }}
        </div>
      </div>
    </div>
  </el-card>
</template>

<style scoped>
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
.hint {
  color: grey;
  font-size: 12px;
  text-align-last: left;
}
.leftPart {
  float: left;
}

.leftimg {
  width: 60px;
  height: 60px;
  float: left;
}
.rate {
  margin-left: 5px;
  font-size: 24px;
  color: #003580;
  font-weight: 700;
}
.content {
  margin-left: 10%;
  margin-right: 10%;
  height: 210px;
}
.comment {
  float: left;
  font-size: 14px;
  margin-right: 10%;
  height: 210px;
}
</style>

<script>
export default {
  //   props: {
  //     title: String,
  //     address: String,
  //     commentRate: Number,
  //     type: String,
  //     price: Number,
  //     coverImgUrl: String,
  //     dianping_number: Number,
  //     ID: String,
  //   },
  data() {
    return {
      userName: "蔡蔡小游侠",
      userAvatar:
        "https://ak-d.tripcdn.com/images/0Z83i120008sxl11y398B_R_100_100_R5_Q70_D.jpg",
      commentRoom: "山系·城景大床房",
      bookTime: "08/14/2021",
      commentPicture:
        "https://ak-d.tripcdn.com/images/0230c120008um7i69E50B_R_150_150_R5_Q70_D.jpg",
      userCommentNum: 1,
      commentRate: 4,
      commentContent:
        "楼下有个人的早餐店铺 豌杂面还不错，不能加床。 🛏️床确实是1.5米的，这个必须肯定。楼下有免费停车🅿️场 。 房间没有介绍的45平米，感觉被骗了。最多30平米左右，窗子对着居民楼，跟图片上完全不一样。整个旅途住宿费最贵的 真的是最差的一家。江边一直有施工，很乱。",
      commentTime: "08/14/2021 20:53",
      baseImg:
        "https://cf.bstatic.com/xdata/images/hotel/square600/85559901.webp?k=7a865b31371310881afb72f105e70efa1d6dbc79aeb0190dae1334290997bdbb&o=",
    };
  },
  computed: {
    level: function () {
      if (this.commentRate == 5) {
        return "好极了";
      } else if (this.commentRate == 4) {
        return "非常好";
      } else if (this.commentRate == 3) {
        return "一般般";
      } else if (this.commentRate == 2) {
        return "不太好";
      } else {
        return "非常差";
      }
    },
  },
  methods: {
    
  },
  created() {},
};
</script>
