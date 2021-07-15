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
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          <div
            class="love el-icon-star-on"
            :class="{ color: clicked }"
            @click="quit"
          ></div>
        </span>
        <el-dropdown-menu slot="dropdown" v-if="!clicked">
          <h6>选择收藏夹：</h6>
          <el-dropdown-item
            v-for="(fav, index) in favs"
            :key="index"
            :command="index"
            >{{ fav.favoR_NAME }}</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
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
      <p style="color: red">最低{{ price }}元/人</p>
      <button @click="Book">点击预定 ></button>
    </div>
  </div>
</template>

<style scoped>
.love {
  font-size: 40px;
  padding: 5px;
  color: rgba(126, 115, 115, 0.9);
}
h6 {
  margin: 0px;
  padding: 0px;
  text-indent: 2px;
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
    dianping_number: Number,
    ID: String,
  },
  data() {
    return {
      temp: [],
      favs: [],
      command: "",
      last: 0,
      user_ID: "", //测试记得删
      clicked: false,
      baseImg:
        "https://cf.bstatic.com/xdata/images/hotel/square600/85559901.webp?k=7a865b31371310881afb72f105e70efa1d6dbc79aeb0190dae1334290997bdbb&o=",
    };
  },
  methods: {
    Book() {
      let iPath =
        this.type == "游客" ? "/attraction/AttrOrder" : "/hotel/HotelOrder";
      this.$router.push({
        path: iPath,
        query: { id: this.ID },
      });
    },
    handleCommand(command) {
      this.clicked = !this.clicked;
      this.last = command;
      console.log(this.last);
      this.$axios.post("http://49.234.18.247:8080/api/FavouriteContents", {
        favoR_ID: this.favs[command].favoR_ID,
        linK_ID: this.ID,
        merchanT_LINK: "http://localhost:8080" + this.iPath + "/" + this.ID,
      });
      this.$axios.put(
        "http://49.234.18.247:8080/api/Favorites/" +
          this.favs[command].favoR_ID,
        {
          favoR_ID: this.favs[command].favoR_ID,
          favoR_NAME: this.favs[command].favoR_NAME,
          favoR_CONTENT_NUM: this.favs[command].favoR_CONTENT_NUM + 1,
        }
      );
      this.$message("收藏成功！");
    },
    quit() {
      if (this.clicked === true) {
        this.clicked = !this.clicked;
        this.$message("取消收藏！");
      }

      this.$axios.delete(
        "http://49.234.18.247:8080/api/FavouriteContents/" +
          this.favs[this.last].favoR_ID +
          "&" +
          this.ID
      );
      this.$axios.put(
        "http://49.234.18.247:8080/api/Favorites/" +
          this.favs[this.last].favoR_ID,
        {
          favoR_ID: this.favs[this.last].favoR_ID,
          favoR_NAME: this.favs[this.last].favoR_NAME,
          favoR_CONTENT_NUM: this.favs[this.last].favoR_CONTENT_NUM,
        }
      );
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
  created() {
    this.user_ID=localStorage.getItem("ms_username");
    console.log("username",this.user_ID);
    this.$axios
      .get("http://49.234.18.247:8080/api/HasFavorites")
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].useR_ID == this.user_ID) {
            this.temp.push(response.data[i].favoR_ID);
          }
        }
      });

    this.$axios
      .get("http://49.234.18.247:8080/api/Favorites")
      .then((response) => {
        for (var i = 0; i < response.data.length; i++) {
          if (this.temp.includes(response.data[i].favoR_ID)) {
            this.favs.push(response.data[i]);
          }
        }
      });

    this.$axios
      .get("http://49.234.18.247:8080/api/FavouriteContents")
      .then((response) => {
        for (var i = 0; i < response.data.length; i++) {
          if (
            this.temp.includes(response.data[i].favoR_ID) &&
            response.data[i].linK_ID == this.ID
          ) {
            this.clicked = true;
          }
        }
      });
  },
};
</script>
