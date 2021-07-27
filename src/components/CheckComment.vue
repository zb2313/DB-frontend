<template>
  <div class="ALLMoment">
    <el-header height="100px">
        <div class="logo">LVDAO
        </div>
      <div class="sss">
        <el-button type="primary" icon="el-icon-back" @click="goBack"
        >返回
        </el-button>
      </div>

    </el-header>
    <!-- 动态区域 -->
    <div class="showMoment">
      <span v-if="this.Moments.length===0">暂无数据···</span>
      <li
        class="show"
        v-for="(item, index) in Moments"
        :key="index"
        style="list-style: none"
      >
        <el-card class="singleMoment">
          <router-link :to="'/3/' + item.momenT_ID">
            <span class="zhankai" type="primary">展开</span>
          </router-link>
          <pre><span class="user_id" style="float:left">{{item.useR_ID}}</span>
		<span class="moment_id" style="float:left">{{item.momenT_ID}}</span></pre>
          <!-- 动态发布地点信息和时间信息 -->
          <pre><span class="moment_location" style="float: left">{{item.momenT_LOCATION}}</span>
		<span class="moment_time" style="float: right">{{item.momenT_TIME}}</span></pre>
          <!-- 动态中的文本 -->
          <el-card class="mymoment_text">
            <p class="moment_text">{{ item.text }}</p>
            <!-- 动态中的图片 -->
            <img
              class="moment_img"
              :src="item.picture"
              v-if="item.picture !== null"
              style="width: 30%; height: 80px"
            />
            <!-- 动态中的视频 -->
            <div class="moment_video" v-if="item.vedio !== null">
              <iframe
                :src="item.vedio"
                frameborder="0"
                allow="autoplay;encrypted-media"
                allowfullscreen
                style="width: 100%; height: 50%"
              >
              </iframe>
            </div>
          </el-card>
        </el-card>
      </li>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      Moments: [],
    };
  },
  methods: {
    prevClickChange(val) {
      console.log(`当前页：${val}`);
    },
    nextClickChange(val) {
      console.log(`当前页：${val}`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    goBack() {
      this.$router.push("/Moment");
    },
    getMoments() {
      let n=localStorage.getItem("ms_username");
      console.log(n)
      axios
        .get(
          "http://49.234.18.247:8080/api/FunGetAllMomentByUserId/"+n
        )
        .then((res) => {
          console.log(res.data);
          this.Moments = res.data;
          console.log("moment:", this.Moments);
          console.log("res:", this.$route.params.useR_ID);
          return res.data;
        });
    },
  },
  // created()：在实例创建完成后被立即调用
  created() {
    this.getMoments();
  },
};
</script>

<style scoped>
.sss {
  float:right;
  margin-top:50px;
  margin-right: 50px;
}
.ALLMoment {
  max-height: 1000px;
  width: 100%;
  position: absolute;
  background-color: #fbf8ef;
}
.zhankai {
  display: flex;
  cursor: pointer;
  position: absolute;
  right: 12px;
  bottom: 12px;
  color: #0d0d0d;
}
.showMoment {
  height: auto;
  max-width: 1000px;
  margin: 12px auto;
  border-radius: 10px;
}
.singleMoment {
  padding: 20px;
  margin: 12px auto;
  box-sizing: border-box;
  background: #ecf8e0;
  border: 1px dotted rgb(169, 185, 108);
  border-radius: 10px;
  position: relative;
}
</style>
