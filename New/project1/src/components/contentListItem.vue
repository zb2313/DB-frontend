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
      <h1>{{ title }}</h1>
      <p>{{ address }}</p>
      <div class="dianping">
        <div class="dianping-wenzi">
          <p class="dianping-wenzi1">{{ level }}</p>
          <p class="dianping-wenzi2">共{{ dianping_number }}名{{ type }}评分</p>
        </div>
        <div class="dianping-icon">{{ grade }}</div>
      </div>
      <p style="color: red">平均{{ price }}元/人</p>
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
  props: {
    title: String,
    address: String,
    grade: Number,
    type: String,
    price: Number,
    coverImgUrl: String,
  },
  data() {
    return {
      clicked: false,
      dianping_number: 471,
      baseImg:
        "https://cf.bstatic.com/xdata/images/hotel/square600/85559901.webp?k=7a865b31371310881afb72f105e70efa1d6dbc79aeb0190dae1334290997bdbb&o=",
    };
  },
  methods: {
    loveClick: function () {
      this.clicked = !this.clicked;
    },
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
};
</script>
