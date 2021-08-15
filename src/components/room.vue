<template>
  <el-card class="content" shadow="never">
    <div class="leftPart">
      <div
        class="leftimg"
        :style="{
          backgroundImage: 'url(' + (coverImgUrl ? coverImgUrl : baseImg) + ')',
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
        }"
      ></div>
      <h4>{{ roomName }}</h4>
      <span @click="viewRoomInfo" class="hint">查看客房信息</span>
    </div>

    <!-- 分割线 -->
    <div style="float: left; height: 700px">
      <el-divider direction="vertical"></el-divider>
    </div>
    <!-- 住房数 -->
    <div class="detail">
      <i class="el-icon-user"></i>
      <span class="customer"> x {{ customerNum }}</span>
    </div>
    <!-- 床以及餐食 -->
    <div class="detail">
      <p>{{ bed }}</p>
      <br />
      <p>{{ dish }}餐食</p>
    </div>
    <!-- 烟及窗 -->
    <div class="detail">
      <p>{{ smoke }}吸烟</p>
      <br />
      <p>{{ window }}窗</p>
    </div>
    <!-- 不可取消及立即确认 -->
    <div class="detail" style="color: #06aebd">
      <p>{{ cancel }}</p>
      <br />
      <p>立即确认</p>
    </div>
    <!-- 预定 -->
    <div class="detail">
      <div class="relative">
        <div class="clearfix">
          <div style="float: left">
            <span style="color: #003580; font-weight: 700; font-size: 24px">
              ￥{{ price }}
            </span>
          </div>
          <div style="float: left">
            <span style="color: grey; font-size: 14px; text-decoration: line-through;">
              ￥{{ originalPrice }}
            </span>
          </div>
          <button @click="Book">预定</button>
        </div>
      </div>
    </div>
  </el-card>
</template>

<style scoped>
.hint {
  color: cornflowerblue;
  font-size: 14px;
}
.leftPart {
  float: left;
}

.leftimg {
  width: 200px;
  height: 130px;
}

.content h4 {
  margin-top: 5px;
}
.content {
  margin-left: 10%;
  margin-right: 10%;
  height: 210px;
  text-align: center;
}
.detail {
  float: left;
  margin-top: 40px;
  margin-left: 20px;
  margin-right: 40px;
  font-size: 14px;
}
.customer {
  background-color: navy;
  color: white;
  font-size: 14px;
}
.relative {
  position: relative;
  top: 15px;
  left: 100px;
}
button {
  width: 90px;
  height: 40px;
  background-color: #f7ba2a;
  color: white;
}
</style>

<script>
export default {
  //   props: {
  //     title: String,
  //     address: String,
  //     grade: Number,
  //     type: String,
  //     price: Number,
  //     coverImgUrl: String,
  //     dianping_number: Number,
  //     ID: String,
  //   },
  data() {
    return {
      roomName: "山系·城景大床房",
      customerNum: 2,
      bed: "1张大床和1张双人床",
      dish: "有",
      smoke: "可",
      window: "有",
      cancel: "不可取消",
      price: 999,
      originalPrice:1314,
      coverImgUrl:
        "https://dimg11.c-ctrip.com/images/0AD5d120008nj322zC5A7_R_300_120.jpg",
      baseImg:
        "https://cf.bstatic.com/xdata/images/hotel/square600/85559901.webp?k=7a865b31371310881afb72f105e70efa1d6dbc79aeb0190dae1334290997bdbb&o=",
    };
  },
  methods: {
    viewRoomInfo() {
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
  created() {},
};
</script>
