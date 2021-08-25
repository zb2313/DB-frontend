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
      <h5>{{ roomName }}</h5>
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
    <div class="relative">
      <div class="clearfix">
        <button @click="Book">预定</button>
        <div style="float: right">
          <span style="color: #003580; font-weight: 700; font-size: 24px">
            ￥{{ price }}
          </span>
        </div>
        <div style="float: right">
          <span
            style="color: grey; font-size: 14px; text-decoration: line-through"
          >
            ￥{{ originalPrice }}
          </span>
        </div>
      </div>
    </div>
  </el-card>
</template>

<style scoped>
.hint {
  color: cornflowerblue;
  font-size: 12px;
}
.leftPart {
  float: left;
}

.leftimg {
  width: 120px;
  height: 80px;
}

.content h4 {
  margin-top: 5px;
}
.content {
  height: 150px;
  text-align: center;
}
.detail {
  float: left;
  margin-top: 40px;
  margin-left: 20px;
  margin-right: 40px;
  font-size: 12px;
}
.customer {
  background-color: navy;
  color: white;
  font-size: 14px;
}
.relative {
  text-align: right;
  margin-right: 100px;
  margin-left: 20px;
  margin-top: 50px;
}
button {
  width: 90px;
  height: 40px;
  background-color: #f7ba2a;
  color: white;
  float: right;
  line-height: 30px;
  border: none;
  margin-left: 5px;
}
</style>

<script>
export default {
  props: {
    roomName: String,
    customerNum: Number,
    bed: String,
    dish: String,
    smoke: String,
    window: String,
    cancel: String,
    price: Number,
    originalPrice: Number,
    coverImgUrl: String,
    roomID: String,
  },
  data() {
    return {
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
