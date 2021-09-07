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
      <el-dialog :visible.sync="roomInfoVisible" width="80%" top="20px">
        <div style="text-align: left; height: 550px">
          <div style="float: left; width: 720px; height: 500px">
            <div slot="title">
              <h1 style="color: black">{{ roomName }}</h1>
            </div>
            <br />
            <div
              class="infoPic"
              :style="{
                backgroundImage: 'url(' + coverImgUrl + ')',
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat',
              }"
            ></div>
          </div>
          <div
            v-infinite-scroll="load"
            style="
              overflow: auto;
              float: left;
              backgroundcolor: white;
              width: 450px;
              height: 540px;
            "
          >
            <br />
            <h1>基本信息</h1>
            <p><i class="el-icon-s-grid"></i> 20-27平方米</p>
            <div>
              <i class="el-icon-mobile"></i> {{ bed }}
              <p>加床费用：该房型不可加床</p>
            </div>
            <p><i class="el-icon-school"></i> 5-7楼</p>
            <h2>全部设施</h2>

            <h3>洗浴用品</h3>
            <p>
              <i class="el-icon-circle-check"></i> 牙刷
              <span style="margin-left: 150px">
                <i class="el-icon-circle-check"></i> 牙膏</span
              >
            </p>
            <p>
              <i class="el-icon-circle-check"></i> 沐浴露
              <span style="margin-left: 136px">
                <i class="el-icon-circle-check"></i> 洗发水</span
              >
            </p>
            <p>
              <i class="el-icon-circle-check"></i> 护发素
              <span style="margin-left: 136px">
                <i class="el-icon-circle-check"></i> 香皂</span
              >
            </p>
            <p>
              <i class="el-icon-circle-check"></i> 浴帽
              <span style="margin-left: 150px">
                <i class="el-icon-circle-check"></i> 梳子</span
              >
            </p>
            <p><i class="el-icon-circle-check"></i> 剃须刀</p>

            <h3>便利设施</h3>
            <p>
              <i class="el-icon-circle-check"></i>
              房间内高速上网
              <span style="margin-left: 80px">
                <i class="el-icon-circle-check"></i> 客房WIFI
                <span style="color: green; font-weight: 600"
                  >（免费）</span
                ></span
              >
            </p>
            <p>
              <i class="el-icon-circle-check"></i> 遮光窗
              <span style="margin-left: 136px">
                <i class="el-icon-circle-check"></i> 空调</span
              >
            </p>
            <p>
              <i class="el-icon-circle-check"></i> 衣柜/衣橱
              <span style="margin-left: 118px">
                <i class="el-icon-circle-check"></i> 休闲椅</span
              >
            </p>
            <p>
              <i class="el-icon-circle-check"></i> 床具:鸭绒被
              <span style="margin-left: 104px">
                <i class="el-icon-circle-check"></i> 衣架</span
              >
            </p>
            <p>
              <i class="el-icon-circle-check"></i> 地毯
              <span style="margin-left: 150px">
                <i class="el-icon-circle-check"></i> 220V电压插座</span
              >
            </p>

            <h3>媒体科技</h3>
            <p>
              <i class="el-icon-circle-check"></i>
              电话
              <span style="margin-left: 150px">
                <i class="el-icon-circle-check"></i>
                液晶电视机</span
              >
            </p>
            <p>
              <i class="el-icon-circle-check"></i>
              国内长途电话
              <span style="margin-left: 94px">
                <i class="el-icon-circle-check"></i>国际长途电话</span
              >
            </p>
            <p>
              <i class="el-icon-circle-check"></i>
              有线频道
              <span style="margin-left: 123px">
                <i class="el-icon-circle-check"></i> 智能门锁</span
              >
            </p>

            <h3>浴室</h3>
            <p>
              <i class="el-icon-circle-check"></i>
              独立淋浴间
              <span style="margin-left: 108px">
                <i class="el-icon-circle-check"></i> 独立卫生间</span
              >
            </p>
            <p>
              <i class="el-icon-circle-check"></i> 智能马桶
              <span style="margin-left: 123px">
                <i class="el-icon-circle-check"></i> 吹风机</span
              >
            </p>
            <p>
              <i class="el-icon-circle-check"></i> 浴室化妆放大镜
              <span style="margin-left: 80px">
                <i class="el-icon-circle-check"></i> 浴衣</span
              >
            </p>
            <p>
              <i class="el-icon-circle-check"></i> 浴巾
              <span style="margin-left: 150px">
                <i class="el-icon-circle-check"></i> 24小时热水</span
              >
            </p>
            <p>
              <i class="el-icon-circle-check"></i> 拖鞋
              <span style="margin-left: 150px">
                <i class="el-icon-circle-check"></i>卫生纸</span
              >
            </p>

            <h3>食品饮品</h3>
            <p>
              <i class="el-icon-circle-check"></i> 茶包
              <span style="margin-left: 150px">
                <i class="el-icon-circle-check"></i> 瓶装水</span
              >
            </p>
            <p><i class="el-icon-circle-check"></i> 电热水壶</p>

            <h3>其他</h3>
            <p><i class="el-icon-circle-check"></i> 刷卡进门</p>

            <h3>特别提示</h3>
            无
          </div>
        </div>
      </el-dialog>
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
      <p>{{ smoke }}烟</p>
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
.infoPic {
  width: 700px;
  height: 500px;
}
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
  cursor: pointer;
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
    hotelID: String,
  },
  data() {
    return {
      roomInfoVisible: false,
      baseImg:
        "https://ak-d.tripcdn.com/images/0202u120008axc7o1A37D_R_1080_808_R5_D.jpg_.webp",
    };
  },
  methods: {
    viewRoomInfo() {
      this.roomInfoVisible = true;
    },
    Book() {
      this.$router.push({
        path: "/hotel/HotelOrder",
        query: {
          roomID: this.roomID,
          hotelID: this.hotelID,
        },
      });
    },
    load() {
      this.count += 2;
    },
  },
  created() {},
};
</script>
