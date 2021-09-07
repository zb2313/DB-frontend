<template>
  <el-container direction="vertical">
    <Header activeIndex="4" />

    <el-main>
      <img
        class="bgc"
        src="https://marriotteventsasia.com.cn/wp-content/uploads/2020/10/mfmsi-attraction-tower-3410-ver-clsc.jpg"
        style="width: 100%; height: 400px"
      />

      <div class="main">
        <div class="titleBox">
          <img
            src="http://49.234.47.118:8080/pictures/user_uprofile_3.jpg"
            class="avatar"
          />

          <div class="title">
            芬兰瑞典 ▏感觉孤独的时候我就去北欧凛冽的世界尽头
          </div>

          <div class="block">
            <div class="username">张三</div>
            <div class="update-time">2021-9-7 18:00</div>

            <div class="icons" @click="like">
              <img
                v-if="liked"
                class="heart"
                src="../../assets/img/heartPink.svg"
              />
              <img v-else class="heart" src="../../assets/img/heartGrey.svg" />
              <div class="text">喜欢 520</div>
            </div>
            <div class="icons" @click="collect">
              <img
                v-if="collected"
                class="star"
                src="../../assets/img/starYellow.svg"
              />
              <img v-else class="star" src="../../assets/img/starGrey.svg" />
              <div class="text">收藏 340</div>
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
              <span><i class="calendar"></i> 天数: 6天</span>
              <span><i class="clock"></i> 时间：2021年5月</span>
              <div class="positions">
                <i class="position"></i> 作者去了这些地方：
                <p v-for="(day, i) in 3" :key="i">
                  Day{{ i + 1 }}：<span v-for="(item, index) in 5" :key="index"
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
                            backgroundImage: 'url(' + picture + ')',
                            backgroundSize: '100% 100%',
                            backgroundRepeat: 'no-repeat',
                          }"
                        ></div>
                        <div class="popover-detail">
                          <h3 class="popover-title">天坛</h3>
                          <img
                            src="../../assets/img/star.svg"
                            v-for="i in 4"
                            :key="i"
                            style="margin-top: 8px; margin-left: -1px"
                          />
                          <div class="popover-address" style="margin-top: 8px">
                            上海市嘉定区曹安公路4800号
                          </div>
                          <div class="popover-button">了解详情</div>
                        </div>
                      </div>
                      <span class="location" slot="reference">喜马拉雅</span>
                    </el-popover>
                  </span>
                </p>
              </div>
            </div>
            <el-divider></el-divider>
            <div class="mainText">
              <p v-for="i in 10" :key="i">
                仍记得3年前初见丽江的模样：蓝天、白云、青山、绿水，遥望雪山看着“印象丽江”，不设防地被剧情所渲染，以至于现在再与他邂逅时，如朋友般，可以随着旋律一起哼唱……这是一个神奇的地方，被雪山守护庇佑着，这是一个美丽的地方，赏风花雪月，不争朝夕，与苍山洱海为伴，闲来看云卷云舒，繁星点点……
              </p>
            </div>
          </div>
          <div class="right">
            <div style="font-size: 17px">推荐相关攻略</div>
            <el-divider></el-divider>
            <div class="rightBox" v-for="i in 4" :key="i">
              <div
                class="Img"
                :style="{
                  backgroundImage: 'url(' + picture + ')',
                  backgroundSize: '100% 100%',
                  backgroundRepeat: 'no-repeat',
                }"
              ></div>
              <div class="boxTitle">感觉孤独的时候我就去北欧凛冽的世界尽头</div>
              <div class="boxWriter">李四</div>
              <div class="boxTime">2020-12-08</div>
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
.location:hover {
  cursor: pointer;
  color: #ea9518;
}
.popover-picture {
  float: left;
  width: 130px;
  height: 130px;
}
.popover-detail {
  position: relative;
  float: left;
  margin-left: 13px;
  width: 200px;
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
  margin: 0 5px;
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
      liked: false,
      collected: false,
      picture:
        "https://marriotteventsasia.com.cn/wp-content/uploads/2020/10/mfmsi-attraction-tower-3410-ver-clsc.jpg",
    };
  },
  methods: {
    like() {
      this.liked = !this.liked;
    },
    collect() {
      this.collected = !this.collected;
    },
  },
};
</script>
