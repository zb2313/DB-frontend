<template>
  <el-container direction="vertical">
    <Header activeIndex="4" />

    <el-main>
      <div class="main">
        <div class="left">
          <el-input
            v-model="input"
            prefix-icon="el-icon-search"
            placeholder="目的地……"
            @change="inputChange"
          ></el-input>

          <div class="create">
            <router-link to="/travelplan"> 创建我的攻略 </router-link>
          </div>
          <p>旅游攻略导航</p>
          <el-divider></el-divider>

          <div class="dropdowns">
            <el-popover placement="bottom" width="150" trigger="click">
              <div class="popover-content">
                <span v-for="(item, index) in guoNei" :key="index"
                  ><span v-show="index"> | </span
                  ><span class="popover-place" @click="topClick(item.place)"
                    >{{ item.place }} ({{ item.num }})</span
                  >
                </span>
              </div>
              <div class="dropdown" slot="reference">
                国内<span class="el-icon-caret-bottom"></span>
              </div>
            </el-popover>

            <el-popover placement="bottom" width="200" trigger="click">
              <div class="popover-content">
                <el-empty :image-size="80"></el-empty>
              </div>
              <div class="dropdown" slot="reference">
                国外<span class="el-icon-caret-bottom"></span>
              </div>
            </el-popover>
          </div>

          <el-divider></el-divider>

          <div class="top" v-for="(item, index) in top" :key="index">
            <el-divider v-if="index"></el-divider>
            <span class="top-number">{{ index + 1 }}</span>
            <span class="top-title" @click="topClick(item)">{{ item }}</span>
          </div>
        </div>

        <div class="right">
          <div style="text-indent: 2%; font-size: 18px">推荐攻略</div>
          <div
            class="box"
            v-for="(item, index) in plans"
            :key="index"
            @click="toDetail(item.useR_ID, item.plaN_ID)"
          >
            <div class="divider"><el-divider></el-divider></div>

            <div class="box1">
              <div class="title">
                {{ item.plaN_TITLE }}
                <div class="star">
                  <div class="like-number">
                    <span
                      style="
                        color: #ea9518;
                        font-weight: 600;
                        line-height: 30px;
                        font-size: 14px;
                      "
                      >{{ item.plaN_STAR }}</span
                    >
                    <span
                      style="
                        color: black !important;
                        margin-left: 5px;
                        line-height: 30px;
                      "
                      >点赞</span
                    >
                  </div>
                  <img src="../../assets/img/like.svg" />
                </div>
              </div>
              <div class="content">
                <div
                  class="picture"
                  :style="{
                    backgroundImage: 'url(' + item.picture + ')',
                    backgroundSize: '100% 100%',
                    backgroundRepeat: 'no-repeat',
                  }"
                ></div>
                <div class="detail">
                  <div class="text">
                    {{ item.plaN_DESC }}
                  </div>
                  <div class="writer">
                    <el-avatar size="small" :src="item.uprofile"></el-avatar>
                    <div class="username">{{ item.useR_NAME }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-main>

    <Footer1 />
  </el-container>
</template>


<style scoped>
/* 左边css */
.left {
  float: left;
  width: 200px;
}
.el-input /deep/ .el-input__inner {
  border: 3px solid #ea9518;
  border-radius: unset;
}
.el-input {
  margin-bottom: 20px;
}
.create {
  width: 100%;
  height: 40px;
  margin-bottom: 20px;
  text-align: center;
  line-height: 40px;
  background-color: #0071c2;
  border-radius: 5px;
  color: white;
  font-weight: 700;
  cursor: pointer;
}
.create:hover {
  background-color: #003680;
}
.popover-place:hover {
  color: #0071c2;
  cursor: pointer;
}
.dropdown {
  display: inline-block;
  width: 50px;
  height: 25px;
  font-size: 15px;
  margin-right: 10px;
  cursor: pointer;
}
.dropdown span {
  color: gray;
}
.dropdown:hover {
  color: #ea9518;
}
.dropdown:hover span {
  color: #ea9518;
}
.top-number {
  font-size: 18px;
  font-weight: 600;
  color: #ea9518;
}
.top-title {
  font-size: 14px;
  margin-left: 20px;
}
.top-title:hover {
  cursor: pointer;
  color: #ea9518;
}
/* 右边css */
.right {
  float: right;
  width: 860px;
}
.box:hover {
  cursor: pointer;
  background-color: rgba(236, 234, 234, 0.5);
}
.box:hover .title {
  color: #ea9518;
}
.divider {
  width: 96%;
  margin: 0 auto;
}
.box1 {
  width: 100%;
  text-indent: 2%;
  height: 210px;
}
.title {
  font-size: 18px;
}
.star {
  float: right;
  margin-right: 2%;
  margin-top: 2px;
  height: 30px;
  width: 110px;
  border: 1px solid #ea9518;
  border-radius: 15px;
  font-size: 12px;
}
.star .like-number {
  width: 60%;
  float: left;
  margin-left: 8px;
  line-height: 30px;
}
.star img {
  float: right;
  margin-top: 3px;
  margin-right: 8px;
}
.picture {
  float: left;
  width: 30%;
  height: 150px;
  margin-left: 2%;
  margin-top: 18px;
}
.detail {
  position: relative;
  width: 63%;
  float: left;
  margin-top: 18px;
  margin-left: 2%;
}
.text {
  width: 100%;
  color: #666;
  font-size: 15px;
}
.writer {
  position: absolute;
  top: 120px;
  left: 80%;
}
.el-avatar--small {
  width: 20px;
  height: 20px;
  line-height: 20px;
}
.el-avatar {
  float: left;
}
.username {
  float: right;
  width: 70px;
  font-size: 13px;
  margin-left: 5px;
  color: #ea9518;
}
.el-divider--horizontal {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>

<script>
import Header from "@/components/Header.vue";
import Footer1 from "@/components/Footer1.vue";

export default {
  components: {
    Header,
    Footer1,
  },
  data() {
    return {
      input: "",
      guoNei: [],
      top: [
        "上海",
        "成都",
        "重庆",
        "北京",
        "南京",
        "广州",
        "济南",
        "秦皇岛",
        "涠洲岛",
      ],
      plans: [],
      originData: [],
    };
  },
  methods: {
    inputChange() {
      if (this.input) {
        var tmp = [];
        for (let i = 0; i < this.originData.length; i++) {
          if (this.originData[i].plaN_TITLE.includes(this.input)) {
            tmp.push(this.originData[i]);
          }
        }
        this.plans = tmp;
      } else {
        this.plans = this.originData;
      }
    },
    topClick(city) {
      var tmp = [];
      for (let i = 0; i < this.originData.length; i++) {
        if (this.originData[i].plaN_TITLE.includes(city)) {
          tmp.push(this.originData[i]);
        }
      }
      this.plans = tmp;
    },
    async getUserNameById(id) {
      return fetch("http://49.234.18.247:8080/api/Users/" + id)
        .then(function (response) {
          return response.json();
        })
        .then((res) => {
          var useR_NAME = res[0].useR_NAME;
          var uprofile = res[0].uprofile;
          return { useR_NAME: useR_NAME, uprofile: uprofile };
        });
    },
    async getAvatar(id) {
      return this.$axios
        .get("http://49.234.18.247:8080/api/Portrait/" + id)
        .then((res) => {
          return res.data;
        });
    },
    toDetail(useR_ID, plaN_ID) {
      this.$router.push({
        path: "/strategyDetail",
        query: {
          useR_ID: useR_ID,
          plaN_ID: plaN_ID,
        },
      });
    },
  },
  created() {
    this.$axios.get("http://49.234.18.247:8080/api/Plan").then((response) => {
      this.plans = [];
      this.guoNei = [];
      for (let i = 0; i < response.data.length; i++) {
        var endIndex = response.data[i].plaN_TITLE.indexOf("】");

        let place = response.data[i].plaN_TITLE
          .split("】")[0]
          .slice(1, endIndex)
          .split("|");
        var j = 0;
        var k = 0;
        for (; k < place.length; k++) {
          for (; j < this.guoNei.length; j++) {
            if (this.guoNei[j].place == place[k].slice(0, 2)) {
              this.guoNei[j].num++;
              break;
            }
          }
          if (j == this.guoNei.length) {
            this.guoNei.push({ place: place[k].slice(0, 2), num: 1 });
          }
        }

        this.getUserNameById(response.data[i].useR_ID).then((res) => {
          let picture = JSON.parse(response.data[i].plan);
          picture = picture[0][0].picture;

          this.getAvatar(response.data[i].useR_ID).then((avatar) => {
            console.log(avatar);
            let plan = {
              useR_ID: response.data[i].useR_ID,
              useR_NAME: res.useR_NAME,
              uprofile: avatar,
              plaN_ID: response.data[i].plaN_ID,
              picture: picture,
              plaN_STAR: response.data[i].plaN_STAR,
              plaN_TITLE: response.data[i].plaN_TITLE,
              plaN_DESC:
                response.data[i].plaN_DESC.length < 200
                  ? response.data[i].plaN_DESC
                  : response.data[i].plaN_DESC.slice(0, 200) + "……",
            };
            this.plans.push(plan);
            this.originData.push(plan);
          });
        });
      }
    });
  },
};
</script>
