<template>
  <div class="content">
    <div
      class="leftimg"
      :style="{
        backgroundImage: 'url(' + (coverImgUrl ? coverImgUrl : baseImg) + ')',
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
      }"
    >
      <div
        class="love el-icon-star-on"
        :class="{ color: clicked }"
        @click="loveClick"
      ></div>
    </div>
    <div class="detail">
      <h1>{{ content.title }}</h1>
      <p>{{ content.address }}</p>
      <div class="dianping">
        <div class="dianping-wenzi">
          <p class="dianping-wenzi1">{{ dianping.level }}</p>
          <p class="dianping-wenzi2">
            共{{ dianping.number }}名{{ content.type }}评分
          </p>
        </div>
        <div class="dianping-icon">{{ dianping.grade }}</div>
      </div>
      <p style="color: red">平均{{ content.price }}元/人</p>
      <button>点击购买 ></button>
    </div>
  </div>
</template>

<style scoped>
.love {
  font-size: 40px;
  float: right;
  padding: 5px;
  color: rgba(126, 115, 115, 0.9);
}
.color {
  color: orange !important;
}
.leftimg {
  float: left;
  width: 300px;
  height: 230px;
  border-radius: 10px;
}
.content h1,
.content p {
  padding: 0;
  margin: 0;
  margin-bottom: 5px;
  text-align: right;
}

.content h1 {
  color: #0071c2;
}
.content {
  width: 730px;
  height: 250px;
  padding: 25px 25px 0 25px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  border-radius: 5px;
}
.detail {
  float: left;
  margin-left: 20px;
  width: 400px;
  height: 230px;
}

.dianping {
  width: 150px;
  height: 50px;
  position: relative;
  left: 240px;
  margin-bottom: 10px;
}
.dianping-wenzi {
  float: left;
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

.content button {
  position: relative;
  top: 15px;
  left: 300px;
  width: 90px;
  height: 40px;
  background-color: #003580;
  color: white;
}
</style>

<script>
export default {
  data() {
    return {
      clicked: false,
      dianping: {
        level: "好极了",
        number: 471,
        grade: 4.5,
      },
      content: {
        title: "Youth Space",
        address: "上海市，嘉定区，黄渡理工，学生公寓14号楼",
        price: "250",
        type: "房客",
      },
      baseImg:
        "https://cf.bstatic.com/xdata/images/hotel/square600/85559901.webp?k=7a865b31371310881afb72f105e70efa1d6dbc79aeb0190dae1334290997bdbb&o=",
      coverImgUrl: "",
    };
  },
  methods: {
    loveClick: function () {
      this.clicked = !this.clicked;
    },
  },
};
</script>
