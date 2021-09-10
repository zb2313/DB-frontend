<template>
  <el-container direction="vertical">
    <Header activeIndex="4" />

    <el-main>
      <img class="bgc" :src="bgc" style="width: 100%; height: 400px" />

      <div class="main">
        <div class="titleBox">
          <img :src="uprofile" class="avatar" />

          <div class="title">
            {{ plaN_TITLE }}
          </div>

          <div class="block">
            <div class="username">{{ useR_NAME }}</div>
            <div class="update-time">{{ pubL_TIME }}</div>

            <div class="icons" @click="like">
              <img
                v-if="liked"
                class="heart"
                src="../../assets/img/heartPink.svg"
              />
              <img v-else class="heart" src="../../assets/img/heartGrey.svg" />
              <div class="text">喜欢 {{ plaN_STAR }}</div>
            </div>

            <!-- 收藏用 -->
            <el-popover placement="bottom-start" width="50" trigger="hover">
              <div
                v-for="(item, index) in favs"
                :key="index"
                @click="collect(index)"
                class="popover-collect"
              >
                {{ item.favoR_NAME }}
              </div>
              <div class="icons" slot="reference" v-show="!collected">
                <img class="star" src="../../assets/img/starGrey.svg" />
                <div class="text">收藏 {{ collectNum }}</div>
              </div>
            </el-popover>

            <!-- <div class="icons" v-show="!collected">
              <img class="star" src="../../assets/img/starGrey.svg" />
              <div class="text">收藏 {{ collectNum }}</div>
            </div> -->

            <div class="icons" v-show="collected" @click="quitCollect()">
              <img class="star" src="../../assets/img/starYellow.svg" />
              <div class="text">收藏 {{ collectNum }}</div>
            </div>

            <div class="icons">
              <img class="eye" src="../../assets/img/eye.svg" />
              <div class="text">浏览 34万+</div>
            </div>
          </div>
        </div>

        <div class="block1"></div>

        <div class="main">
          <div class="left">
            <div class="intro">
              <span><i class="calendar"></i> 游玩天数: {{ timeSpan }}天</span>
              <span><i class="clock"></i> 时间：{{ plaY_TIME }}</span>
              <div class="positions">
                <i class="position"></i> 作者去了这些地方：
                <p v-for="(day, i) in days" :key="i">
                  Day{{ i + 1 }}：<span
                    v-for="(item, index) in day"
                    :key="index"
                    ><span class="el-icon-arrow-right" v-show="index"></span>
                    <el-popover
                      placement="bottom-start"
                      width="350"
                      trigger="hover"
                    >
                      <div class="popover-content">
                        <div
                          class="popover-picture"
                          :style="{
                            backgroundImage: 'url(' + item.picture + ')',
                            backgroundSize: '100% 100%',
                            backgroundRepeat: 'no-repeat',
                          }"
                        ></div>
                        <div class="popover-detail">
                          <h3 class="popover-title">{{ item.item_name }}</h3>
                          <img
                            src="../../assets/img/star.svg"
                            v-for="i in item.star"
                            :key="i"
                            style="margin-top: 8px; margin-left: -1px"
                          />
                          <div
                            v-show="!item.star"
                            style="
                              height: 20px;
                              width: 50px;
                              font-size: 12px;
                              margin-top: 8px;
                              color: gray;
                            "
                          >
                            暂无评分
                          </div>
                          <div class="popover-address" style="margin-top: 8px">
                            {{ item.location }}
                          </div>
                          <div
                            class="popover-button"
                            @click="toDetail(item.id, item.type)"
                          >
                            了解详情
                          </div>
                        </div>
                      </div>
                      <span class="location" slot="reference">{{
                        item.item_name
                      }}</span>
                    </el-popover>
                  </span>
                </p>
              </div>
            </div>
            <el-divider></el-divider>
            <div class="mainText" style="white-space: pre-wrap">
              <p v-for="txt in plaN_DESC" :key="txt.index">{{ txt }}</p>
            </div>
          </div>

          <div class="right">
            <div style="font-size: 17px">推荐相关攻略</div>
            <el-divider></el-divider>
            <div
              class="rightBox"
              v-for="item in recommend"
              :key="item.index"
              @click="toDetail1(item.useR_ID, item.plaN_ID)"
            >
              <div
                class="Img"
                :style="{
                  backgroundImage: 'url(' + item.picture + ')',
                  backgroundSize: '100% 100%',
                  backgroundRepeat: 'no-repeat',
                }"
              ></div>
              <div class="boxTitle">{{ item.plaN_TITLE }}</div>
              <div class="boxWriter">{{ item.useR_NAME }}</div>
              <div class="boxTime">{{ item.pubL_TIME }}</div>
            </div>
          </div>
        </div>
      </div>
    </el-main>
    <Footer1 />
  </el-container>
</template>


<style scoped>
/* title部分css */
.el-main {
  padding: 0px;
}
.bgc {
  position: relative;
}
.titleBox {
  position: absolute;
  height: 100px;
  margin-top: -45px;
}
.avatar {
  float: left;
  width: 100px;
  height: 100%;
  margin-top: -35px;
  border-radius: 50px;
}
.title {
  float: left;
  width: 900px;
  font-size: 35px;
  margin-left: 20px;
  color: white;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  font-weight: 600;
}
.block {
  height: 20px;
  margin-top: 2px;
}
.block1 {
  height: 40px;
}
.block div {
  height: 100%;
}
.username {
  float: left;
  margin-left: 20px;
  color: #ea9518;
}
.update-time {
  float: left;
  margin-left: 20px;
  margin-top: 5px;
  color: #acacac;
  font-size: 13px;
}
.icons {
  float: left;
  margin-top: 3px;
  margin-left: 20px;
}
.popover-collect {
  width: 100%;
  height: 20px;
  text-align: center;
}
.popover-collect:hover {
  cursor: pointer;
  background-color: #0071c2;
  color: white;
}
.location:hover {
  cursor: pointer;
  color: #ea9518;
}
.popover-picture {
  float: left;
  width: 150px;
  height: 130px;
}
.popover-detail {
  position: relative;
  float: left;
  margin-left: 13px;
  width: 180px;
}
.popover-address {
  font-size: 13px;
}
.popover-button {
  position: absolute;
  height: 30px;
  width: 70px;
  background-color: #0071c2;
  border-radius: 5px;
  text-align: center;
  line-height: 30px;
  color: white;
  top: 100px;
}
.popover-button:hover {
  background-color: #003680;
  cursor: pointer;
}
.text {
  float: right;
  font-size: 12px;
  margin-top: 1px;
  color: #acacac;
  margin-left: 10px;
}
.icons:hover {
  cursor: pointer;
}

/* 正文部分CSS */
.left {
  float: left;
  width: 70%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 10px;
  margin-bottom: 20px;
}
/* 简介部分 */
.intro {
  font-size: 14px;
}
.intro i {
  background: url("https://pages.c-ctrip.com/gs_static/travels/img/icon_ctd_bg.png?t=503df08415beb17e3b1553d8bda287a4")
    no-repeat;
  vertical-align: middle;
  display: inline-block;
  width: 16px;
  height: 16px;
}
.intro > span {
  margin-right: 30px;
}
.intro .calendar {
  background-position: -360px 0;
}
.intro .clock {
  background-position: -384px 0;
}
.intro .position {
  background-position: -384px -120px;
}
.positions {
  margin-top: 10px;
}
.positions p {
  margin-left: 25px;
  margin-top: 8px;
}
.mainText p {
  text-indent: 2em;
  font-family: "Microsoft YaHei";
  margin-bottom: 25px;
  line-height: 1.6em;
}

/* 右侧推荐css */
.right {
  float: right;
  width: 25%;
  padding: 0px 10px;
}
.rightBox {
  width: 95%;
  margin: 0 auto;
  margin-bottom: 5px;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1);
}
.rightBox:hover {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
  cursor: pointer;
}
.Img {
  width: 100%;
  height: 130px;
}
.boxTitle {
  margin-left: -3px;
  font-size: 15px;
  margin-bottom: 5px;
}
.boxWriter,
.boxTime {
  font-size: 10px;
  color: #acacac;
  margin: 0 5px;
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
      myUserId: "",
      temp: [],
      favs: [],
      liked: false,
      collected: false,
      collectNum: 340,
      useR_ID: "",
      plaN_ID: "",
      useR_NAME: "张三",
      uprofile: "",
      pubL_TIME: "2021-9-7 18:00",
      plaY_TIME: "2021-09-02",
      timeSpan: 6,
      plaN_STAR: 520,
      plaN_DESC:
        "同济大学嘉定校区占地面积1900余亩，建筑总面积约45万平方米，建设总投资约25亿人民币。校区分为",
      plaN_TITLE: "这里是一片净土——同济大学嘉定校区一日游",
      days: [],
      bgc: "",
      recommend: [],
    };
  },
  methods: {
    like() {
      if (this.liked == false) {
        this.plaN_STAR++;
        fetch(
          "http://49.234.18.247:8080/api/Plan/" +
            this.useR_ID +
            "&" +
            this.plaN_ID
        )
          .then(function (response) {
            return response.json();
          })
          .then((res) => {
            this.$axios.put(
              "http://49.234.18.247:8080/api/Plan/" +
                this.useR_ID +
                "&" +
                this.plaN_ID,
              {
                useR_ID: this.useR_ID,
                plaN_ID: this.plaN_ID,
                plan: res[0].plan,
                plaN_STAR: res[0].plaN_STAR + 1,
                plaN_TITLE: res[0].plaN_TITLE,
                plaN_DESC: res[0].plaN_DESC,
                plaY_TIME: res[0].plaY_TIME,
                pubL_TIME: res[0].pubL_TIME,
              }
            );
          });
      } else {
        this.plaN_STAR--;
        fetch(
          "http://49.234.18.247:8080/api/Plan/" +
            this.useR_ID +
            "&" +
            this.plaN_ID
        )
          .then(function (response) {
            return response.json();
          })
          .then((res) => {
            this.$axios.put(
              "http://49.234.18.247:8080/api/Plan/" +
                this.useR_ID +
                "&" +
                this.plaN_ID,
              {
                useR_ID: this.useR_ID,
                plaN_ID: this.plaN_ID,
                plan: res[0].plan,
                plaN_STAR: res[0].plaN_STAR - 1,
                plaN_TITLE: res[0].plaN_TITLE,
                plaN_DESC: res[0].plaN_DESC,
                plaY_TIME: res[0].plaY_TIME,
                pubL_TIME: res[0].pubL_TIME,
              }
            );
          });
      }
      this.liked = !this.liked;
    },
    collect(index) {
      this.collectNum++;

      this.collected = true;

      // this.$axios.post("http://49.234.18.247:8080/api/FavouriteContents", {
      //   favoR_ID: this.favs[index].favoR_ID,
      //   linK_ID: this.useR_ID + this.plaN_ID,
      //   merchanT_LINK: "攻略" + this.useR_ID + this.plaN_ID,
      // });
      // this.$axios.put(
      //   "http://49.234.18.247:8080/api/Favorites/" + this.favs[index].favoR_ID,
      //   {
      //     favoR_ID: this.favs[index].favoR_ID,
      //     favoR_NAME: this.favs[index].favoR_NAME,
      //     favoR_CONTENT_NUM: this.favs[index].favoR_CONTENT_NUM + 1,
      //   }
      // );
      this.$message("收藏成功！");
    },
    quitCollect() {
      this.collected = false;
      this.collectNum--;
    },
    toDetail(id, type) {
      if (type == "attraction") {
        this.$router.push({
          path: "/attraction/detail",
          query: { id: id },
        });
      } else if (type == "hotel") {
        this.$router.push({
          path: "/hotel/detail",
          query: { id: id },
        });
      }
    },
    toDetail1(useR_ID, plaN_ID) {
      this.$router.push({
        path: "/strategyDetail",
        query: { useR_ID: useR_ID, plaN_ID: plaN_ID },
      });
    },
  },
  created() {
    this.useR_ID = this.$route.query.useR_ID;
    this.plaN_ID = this.$route.query.plaN_ID;
    fetch(
      "http://49.234.18.247:8080/api/Plan/" + this.useR_ID + "&" + this.plaN_ID
    )
      .then(function (response) {
        return response.json();
      })
      .then((res) => {
        this.pubL_TIME = res[0].pubL_TIME;
        this.plaY_TIME =
          res[0].plaY_TIME.split("-")[0] +
          "年" +
          res[0].plaY_TIME.split("-")[1] +
          "月";
        this.plaN_TITLE = res[0].plaN_TITLE;
        this.$axios.get("http://49.234.18.247:8080/api/Plan").then((r) => {
          for (let i = 0; i < r.data.length; i++) {
            if (
              !(
                r.data[i].useR_ID == this.useR_ID &&
                r.data[i].plaN_ID == this.plaN_ID
              ) &&
              r.data[i].plaN_TITLE.includes(res[0].plaN_TITLE.slice(1, 3))
            ) {
              fetch("http://49.234.18.247:8080/api/Users/" + r.data[i].useR_ID)
                .then(function (response) {
                  return response.json();
                })
                .then((re) => {
                  console.log(re);
                  var useR_ID = r.data[i].useR_ID;
                  var plaN_ID = r.data[i].plaN_ID;
                  var useR_NAME = re[0].useR_NAME;
                  var plaN_TITLE = r.data[i].plaN_TITLE;
                  var picture = JSON.parse(r.data[i].plan)[0][0].picture;
                  var pubL_TIME = r.data[i].pubL_TIME.slice(0, 10);

                  this.recommend.push({
                    useR_ID: useR_ID,
                    plaN_ID: plaN_ID,
                    useR_NAME: useR_NAME,
                    plaN_TITLE: plaN_TITLE,
                    picture: picture,
                    pubL_TIME: pubL_TIME,
                  });
                });
            }
          }
        });
        this.plaN_STAR = res[0].plaN_STAR;
        this.plaN_DESC = res[0].plaN_DESC.split("\n");
        let plan = JSON.parse(res[0].plan);
        let picture = plan[0][0].picture;
        this.bgc = picture;
        this.days = [];
        this.timeSpan = 0;
        for (let i = 0; i < plan.length; i++) {
          if (plan[i].length !== 0) {
            this.days.push(plan[i]);
            this.timeSpan++;
          }
        }
      });

    fetch("http://49.234.18.247:8080/api/Users/" + this.useR_ID)
      .then(function (response) {
        return response.json();
      })
      .then((res) => {
        this.useR_NAME = res[0].useR_NAME;
      });

    this.$axios
      .get("http://49.234.18.247:8080/api/Portrait/" + this.useR_ID)
      .then((response) => {
        this.uprofile = response.data;
      });

    this.myUserId = localStorage.getItem("ms_username");
    this.$axios
      .get("http://49.234.18.247:8080/api/HasFavorites")
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].useR_ID == this.myUserId) {
            this.temp.push(response.data[i].favoR_ID);
          }
        }
        this.$axios
          .get("http://49.234.18.247:8080/api/Favorites")
          .then((response) => {
            for (let i = 0; i < response.data.length; i++) {
              if (this.temp.includes(response.data[i].favoR_ID)) {
                this.favs.push(response.data[i]);
              }
            }
          });
      });
  },
};
</script>
