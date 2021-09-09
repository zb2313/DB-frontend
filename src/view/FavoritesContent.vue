<template>
  <div>
    <div style="margin: auto">
      <!-- <el-button icon="el-icon-delete" @click="deleteElVisible = true"
        >从收藏夹中删除</el-button
      > -->
      <el-button icon="el-icon-back" @click="returnToFavorites"
        >返回收藏夹列表</el-button
      >
    </div>

    <!-- 酒店列表 -->
    <div
      class="box"
      v-for="item in hotels"
      :key="item.index"
      @click="toHotelDetail(item.hoteL_ID)"
    >
      <div
        class="leftimg"
        :style="{
          backgroundImage: 'url(' + item.picture + ')',
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
        }"
      ></div>
      <div class="detail">
        <div class="head">
          <h4>{{ item.hoteL_NAME }}</h4>
          <div class="label">酒店</div>
        </div>
        <img src="../assets/img/diamond.svg" v-for="i in item.star" :key="i" />
        <div class="address">{{ item.hlocation }}</div>
        <div class="price">最低价格: {{ item.lowesT_PRICE }}/人</div>
        <div class="labels">
          <span
            v-for="label in (item.label || '').length
              ? item.label.split('_')
              : 0"
            :key="label.index"
            >{{ label }}</span
          >
        </div>
        <img class="more" src="../assets/img/more.svg" />
      </div>
    </div>

    <!-- 景点列表 -->
    <div
      class="box"
      v-for="item in attractions"
      :key="item.index"
      @click="toAttrDetail(item.attractioN_ID)"
    >
      <div
        class="leftimg"
        :style="{
          backgroundImage: 'url(' + item.picture + ')',
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
        }"
      ></div>
      <div class="detail">
        <div class="head">
          <h4>{{ item.attractioN_NAME }}</h4>
          <div class="label">景点</div>
        </div>
        <div
          v-show="!item.star"
          style="height: 20px; width: 50px; font-size: 12px; color: lightgray"
        >
          暂无评分
        </div>
        <img src="../assets/img/star.svg" v-for="i in item.star" :key="i" />
        <div class="address">{{ item.alocation }}</div>
        <div class="price">平均价格: {{ item.price }}/人</div>
        <div class="labels">
          <span
            v-for="label in (item.label || '').length
              ? item.label.split('_')
              : 0"
            :key="label.index"
            >{{ label }}</span
          >
        </div>
        <img class="more" src="../assets/img/more.svg" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "FavoritesContent",
  components: {},
  data() {
    return {
      favors: [],
      createElVisible: false,
      deleteElVisible: false,
      deleteFavoriteName: "",
      newFavoriteName: "",
      hotels: [],
      attractions: [],
      strategies: [],
    };
  },
  methods: {
    returnToFavorites() {
      this.$router.push("/Favorites");
    },
    toHotelDetail(HotelID) {
      this.$router.push({
        path: "/hotel/detail",
        query: { id: HotelID },
      });
    },
    toArrDetail(AttrID) {
      this.$router.push({
        path: "/attraction/detail",
        query: { id: AttrID },
      });
    },
    deleteFromFavorites() {
      for (let i = 0; i < this.favors.length; i++) {
        if (this.favors[i].label == this.deleteFavoriteName) {
          axios.delete(
            "http://49.234.18.247:8080/api/FavouriteContents/" +
              localStorage.getItem("favorites_num") +
              "&" +
              this.favors[i].id
          );
          this.deleteElVisible = false;
          return;
        }
      }
      this.$message.success("删除成功");
    },
    setLinkID() {
      let chars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
      let ID = "";
      for (let i = 0; i < 10; i++) {
        let id = Math.ceil(Math.random() * 9);
        ID += chars[id];
      }
      return ID;
    },
    createFavorite() {
      this.createElVisible = true;
      let newID = this.setLinkID();
      let favorID = localStorage.getItem("favorites_num");
      axios.post("http://49.234.18.247:8080/api/FavouriteContents", {
        favoR_ID: favorID,
        linK_ID: newID,
        merchanT_LINK: this.newFavoriteName,
      });
      this.createElVisible = false;
      this.$message("添加成功");
    },
  },
  created() {
    axios
      .get("http://49.234.18.247:8080/api/FavouriteContents")
      .then((response) => {
        let t = response.data;
        let id = localStorage.getItem("favorites_num");
        let k = 0;
        for (let i = 0; i < t.length; i++) {
          if (id == t[i].favoR_ID) {
            if (t[i].merchanT_LINK.includes("游客")) {
              axios
                .get("http://49.234.18.247:8080/api/Attraction/" + t[i].linK_ID)
                .then((attr) => {
                  this.attractions.push(attr.data[0]);
                  console.log(attr.data[0]);
                });
            } else if (t[i].merchanT_LINK.includes("房客")) {
              axios
                .get("http://49.234.18.247:8080/api/Hotel/" + t[i].linK_ID)
                .then((hotel) => {
                  this.hotels.push(hotel.data[0]);
                  console.log(this.hotels[0]);
                });
            }
            // else if(t[i].merchanT_LINK.includes("攻略")){

            // }
            this.favors.push({
              value: k + 1,
              label: t[i].merchanT_LINK,
              id: t[i].linK_ID,
            });
            k++;
          }
        }
      });
  },
};
</script>

<style scoped>
.box {
  float: left;
  width: 48%;
  height: 200px;
  background-color: white;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  margin-right: 10px;
}
.leftimg {
  float: left;
  width: 45%;
  height: 165px;
  margin-left: 10px;
  margin-top: 16px;
  border-radius: 5px;
}
.detail {
  position: relative;
  float: right;
  width: 50%;
  height: 90%;
  margin-top: 16px;
}
.detail .head {
  height: 45px;
}
.detail h4 {
  float: left;
  width: 76%;
}
.detail .label {
  float: right;
  width: 45px;
  height: 20px;
  border-radius: 4px;
  text-align: center;
  line-height: 20px;
  font-size: 14px;
  margin-right: 8px;
  color: #003086;
  border: 1px solid #003086;
}
.detail .address {
  margin-top: 4px;
  font-size: 14px;
}
.detail .price {
  margin-top: 6px;
  font-size: 14px;
  color: red;
}
.labels {
  position: absolute;
  top: 140px;
}
.labels span {
  padding: 1px 3px;
  font-size: 14px;
  display: inline-block;
  margin-right: 4px;
  border-radius: 4px;
  border: 1px solid #003086;
}
.more {
  position: absolute;
  top: 145px;
  left: 215px;
}
</style>

