<template>
  <el-card class="content main-box" shadow="never">
    <div class="leftPart">
      <div style="width: 200px" class="clearfix">
        <div
          class="leftimg"
          :style="{
            backgroundImage: 'url(' + (userAvatar ? userAvatar : baseImg) + ')',
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
          }"
        ></div>
        <div style="float: left; margin-left: 10px">
          <p>{{ userName }}</p>
          <p class="hint">{{ commentTime }}</p>
        </div>
      </div>

      <div style="margin-top: 20px">
        <p class="hint">
          <i class="el-icon-s-finance">&nbsp;</i>
          <span>{{ commentTicket }}</span>
        </p>
        <p class="hint">
          <i class="el-icon-date">&nbsp;</i>
          <span>于{{ bookTime }}购买门票</span>
        </p>
        <p class="hint">
          <i class="el-icon-edit-outline">&nbsp;</i>
          <span>{{ userCommentNum }}条点评</span>
          <br /><br />
        </p>
      </div>
    </div>

    <!-- 评论内容 -->
    <div class="comment">
      <div>
        <span class="rate">{{ commentRate }}</span>
        <span class="hint">/5</span><span class="rate">{{ level }}</span>
      </div>
      <div style="margin-top: 15px">
        {{ commentContent }}
        <br /><br />
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
.leftPart {
  float: left;
}
.hint {
  margin-top: 5px;
  color: grey;
  font-size: 13px;
  text-align: left;
}
.leftimg {
  width: 50px;
  height: 50px;
  border-radius: 2px;
  float: left;
}
.rate {
  margin-left: 5px;
  font-size: 24px;
  color: #003580;
  font-weight: 700;
}

.comment {
  float: right;
  width: 500px;
  font-size: 14px;
}
.main-box {
  width: 800px;
  margin: auto 0px;
}
</style>

<script>
export default {
  props: {
    userName: String,
    userAvatar: String,
    commentTicket: String,
    bookTime: String,
    userCommentNum: Number,
    commentRate: Number,
    commentContent: String,
    commentTime: String,
  },
  data() {
    return {
      baseImg:
        "https://ak-d.tripcdn.com/images/Z80p180000013uw9yF21F_R_100_100_R5_Q70_D.jpg",
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
  methods: {},
  created() {},
};
</script>
