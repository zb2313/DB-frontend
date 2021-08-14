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
            <i class="el-icon-location"></i>{{ location }}
            <span @click="viewMap" class="hint">查看地图</span>
          </div>
        </div>
        <div class="other"></div>
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
  color: #003680;
  font-weight: 700;
  font-size: 14px;
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
      cities: [
        { name: "北京" },
        { name: "上海" },
        { name: "深圳" },
        { name: "广州" },
        { name: "杭州" },
        { name: "南京" },
        { name: "苏州" },
        { name: "武汉" },
        { name: "无锡" },
        { name: "重庆" },
        { name: "长沙" },
        { name: "天津" },
        { name: "郑州" },
        { name: "济南" },
        { name: "宁波" },
        { name: "西安" },
        { name: "青岛" },
        { name: "合肥" },
        { name: "福州" },
        { name: "佛山" },
        { name: "大连" },
        { name: "沈阳" },
        { name: "厦门" },
        { name: "昆明" },
        { name: "南昌" },
        { name: "珠海" },
      ],
      icon: "el-icon-arrow-down",
      hotels: [
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
          star: 4,
          price: 400,
          address: "同济大学正门外",
          commentnum: 250,
          img: "https://dimg11.c-ctrip.com/images/0AD5d120008nj322zC5A7_R_300_120.jpg",
        },
        {
          name: "格林豪泰酒店",
          star: 5,
          price: 400,
          address: "同济大学正门外",
          commentnum: 250,
          img: "https://dimg11.c-ctrip.com/images/0AD5d120008nj322zC5A7_R_300_120.jpg",
        },
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
};
</script>
