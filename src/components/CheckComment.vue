<template>
<div>
   <Header1/>
  <div class="ALLMoment">
<div class="sss">
        <el-button type="success" plain icon="el-icon-back" size="medium" @click="goBack"
        >返回
        </el-button>
      </div>
    <!-- 动态区域 -->
    <div class="showMoment">
     <el-card v-if="this.Moments.length===0"> <span>暂无数据···</span></el-card><br>
      <li
        class="show"
        v-for="(item, index) in Moments"
        :key="index"
        style="list-style: none"
      >
        <el-card class="singleMoment">
          <el-avatar
          :size="55"
          :src="user_avator"
          style="float: left"
        ></el-avatar>
        <pre><span style="float: left">{{user_name}}</span>
        <span style="float:left">发布于{{item.momenT_TIME}}</span>
        <span style="float:left"><i class="el-icon-location-outline"/>{{item.momenT_LOCATION}}</span>
		<!-- 动态发布地点信息和时间信息 --></pre>
          <router-link :to="'/3/' + item.momenT_ID">
            <span class="zhankai" type="primary"><i class="el-icon-arrow-down"> 查看动态详情</i></span>
          </router-link> 
          <!-- 动态中的文本 -->
         <div><br><br>
            <p >{{ item.text }}</p>
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
         </div>
              <!-- 动态发布地点信息和时间信息 -->
         <br>
        </el-card>
      </li>
    </div><Footer1/>
  </div>
</div>
</template>

<script>
import axios from "axios";
import Header1 from "@/components/Header1.vue";
import Footer1 from "@/components/Footer1.vue";
export default {
  components:{
      Header1,Footer1
    },
  data() {
    return {
      Moments: [],
      user_avator:"",
      user_name:"",
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
    this.user_avator=localStorage.getItem("pictrue");
      this.user_avator="http://49.234.47.118:8080/pictures/user_uprofile_3.jpg";
axios.get("http://49.234.18.247:8080/api/Users/"+localStorage.getItem("ms_username"))
.then((res)=>
{
  this.user_name=res.data[0].useR_NAME;
})
  },
};
</script>

<style scoped>
.sss {
  float:left;
  margin-top:45px;
  margin-left: 190px;
}
.ALLMoment {
  min-height: 633px;
  width: 100%;
  position: absolute;
  background-color: whitesmoke;
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
  border-radius: 10px;
  position: relative;
  text-align: center;
}
</style>
