<template>
  <div>
    <li class="show" v-for="(item,index) in Moments" :key="index" style="list-style:none">
      <el-card class="singleMoment" >
        <router-link :to="'/1/'+item.momenT_ID">
          <span class="zhankai" type="primary" @click="zhankai">展开</span>
        </router-link>
        <span class="moment_id" style="float:left">{{item.momenT_ID}}</span>
        <br>
        <!-- 动态发布地点信息和时间信息 -->
        <span class="moment_location" style="float: left">{{item.momenT_LOCATION}}</span>
        <span class="moment_time" style="float: right">{{item.momenT_TIME}}</span>
        <br>
        <!-- 动态中的文本 -->
        <p class="moment_text">{{item.text}}</p>
        <!-- 动态中的图片 -->
        <img class="moment_img" :src="item.picture" style="height:30%;width:30%">
        <!-- 动态中的视频 -->
        <div class="moment_video" v-if="item.vedio!==null">
          <iframe :src="item.vedio" frameborder='0'
                  allow='autoplay;encrypted-media' allowfullscreen style='width:100%;height:50%;'>
          </iframe>
        </div>
      </el-card>
    </li>
  </div>
</template>
<script>
import axios from 'axios'
export default ({
  data() {
    return {
      Moments: [],
    }
  },
  methods:{
    getMoments(){
      axios
          .get('http://49.234.18.247:8080/api/Moment')
          .then((res) => {
            console.log(res.data);
            this.Moments=res.data
            console.log(this.Moments)
            return res.data;
          })
    }
  },
  created() {
    this.getMoments();
  },
})
</script>
<style scoped>
.zhankai{
  display: flex;
  cursor: pointer;
  position: absolute;
  right: 12px;
  bottom: 12px;
}
.singleMoment {
  padding: 20px;
  margin: 20px auto;
  box-sizing: border-box;
  background: rgb(82, 198, 233);
  border: 1px dotted rgb(169, 185, 108);
  border-radius: 10px;
  position: relative;
}
</style>
