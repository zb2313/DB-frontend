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
          <span
            @click="viewMap"
            @mousemove="underline"
            class="hint"
            :class="{ under: isunder }"
            >查看地图</span
          >
          <div>
            <i class="el-icon-s-home"></i>{{ description }}
            <span
              @click="viewMore"
              @mousemove="underline"
              class="hint"
              :class="{ under: isunder }"
              >查看更多</span
            >
          </div>
         <div
        class="attrOrderBg"
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
                <div class="dianping-wenzi">
                  <p class="dianping-wenzi1">{{ level }}</p>
                  <p class="dianping-wenzi2">
                    共{{ dianping_number }}名房客评分
                  </p>
                </div>
                <div class="dianping-icon">{{ grade }}</div>
              </div>
            </div>
            <div class="chooseRoom" style="float: right">
              <div class="clearfix">
                <div style="float: left">
                  <span
                    style="color: #003580; font-weight: 700; font-size: 24px"
                  >
                    ￥{{ minPrice }}
                  </span>
                  <span style="color: grey;height:50px;line-height:50px">起</span>
                </div>

                <div @click="onPay" class="choose_btn" style="float: left">
                  选择房间
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </el-container>
</template>

<style>
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
}
.other {
  float: left;
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
.under {
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
.choose_btn:hover {
  cursor: pointer;
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
      hotelName: "速八酒店",
      starNum: 5,
      location: "上海市嘉定区安亭镇曹安公路4800号",
      isunder: false,
      dianping_number: 999,
      grade: 5,
      description: "开业：2021 客房数：198 联系方式：+86-19823483690",
      minPrice: 99,
       attractionId: "",
      items: [
        {
          useR_ID: "Foo",
          ctext: "一路走来，九寨沟，黄龙都很美。",
          commenT_TIME: "2021-07-13",
        },
        { useR_ID: "Bar", ctext: "不太好", commenT_TIME: "2021-07-13" },
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
    underline() {
      this.isunder = true;
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
  mounted() {
    this.$axios
      .get(
        "http://49.234.18.247:8080/api/FunGetCommentByAttractionId/" +
          this.attractionId
      )
      .then((response) => {
        this.items = response.data;
      });
    this.$axios
      .get("http://49.234.18.247:8080/api/Attraction/" + this.attractionId)
      .then((response) => {
        this.location = response.data[0].alocation;
        this.attractionName = response.data[0].attractioN_NAME;
        this.openTime = response.data[0].opeN_TIME;
        this.closeTime = response.data[0].closE_TIME;
        this.price = response.data[0].price;
        this.baseImg = response.data[0].picture;
      });
  },
};
</script>
