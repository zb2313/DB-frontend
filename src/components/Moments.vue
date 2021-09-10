<template>
  <div class="moment">
    <span v-if="this.Moments.length===0">暂无数据···</span>
      <el-col :span="9" v-for="(item, index) in Moments" 
      :key="index"
      :offset="2">
       <router-link :to="'/1/' + item.momenT_ID" >
        <el-card  class="singleMoment">
          <el-image
          :src="item.uprofile"
          style="float: left;border-radius: 100%;width:60px"
        ><div slot="error" style="font-size:13px">加载中...</div>
        </el-image>
        <pre>
		<span style="float: left"> {{item.useR_NAME}}</span>
		<span style="float:left"> 发布于{{item.momenT_TIME}}<br> <i class="el-icon-location-outline"/>{{item.momenT_LOCATION}}</span>
		<!-- 动态发布地点信息和时间信息 -->
      </pre>
        <div style="text-align:center">
          <!-- 动态中的文本 -->
          <span >{{ item.text }}</span><br>
          <!-- 动态中的图片 -->
          <img
            class="moment_img"
            :src="item.picture"
            v-if="item.picture !== null"
            style="height: 150px"
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
      </div><br>
        </el-card>
       </router-link>
      </el-col>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      Moments: [],
      user_moment: [],
      user: [],
      display_users: [
        {
          useR_ID: "",
          useR_NAME: "",
          uprofile: "",
          momenT_ID: "",
          momenT_TIME: "",
          momenT_LOCATION: "",
          text: "",
          picture: "",
          vedio: "",
        },
      ],
    };
  },
  watch:{//跳转到该页面将重新获取动态
    $route()
    {
      this.getMoments();
    this.getuser_moments();
    this.getuser();
    this.getdisplay_users();
    }
  },
  methods: {
    getMoments() {
      axios
        .get("http://49.234.18.247:8080/api/FunGetAllMomentInfo")
        .then((res) => {
          console.log(res.data);
          this.Moments = res.data;
        for(let i=0;i<this.Moments.length;i++)
            {
              axios.get("http://49.234.18.247:8080/api/MomentPic/"+this.Moments[i].momenT_ID)
              .then(res=>
              {if(res.data!="NULL")
                this.Moments[i].picture=res.data;
              })
              axios.get("http://49.234.18.247:8080/api/Portrait/"+this.Moments[i].useR_ID)
        .then(res=>
        {
           if(res.data!="NULL")
          this.Moments[i].uprofile=res.data;console.log(this.Moments[i].uprofile)
        })
            }
          return res.data;
        });
    },
    // 得到所有发送给动态的用户id
    getuser_moments() {
      axios.get("http://49.234.18.247:8080/api/ReleaseMoment").then((res) => {
        this.user_moment = res.data;
        console.log("user_moment:", this.user_moment);
        return this.user_moment;
      });
    },
    // 得到用户信息
    getuser() {
      axios.get("http://49.234.18.247:8080/api/Users").then((res) => {
        this.user = res.data;
        return this.user;
      });
    },
    getdisplay_users() {
      console.log("ee:", this.display_users.length);
      console.log("ee:", this.display_users);
      for (let i = 0; i < this.user_moment.length; i++) {
        for (let j = 0; j < this.user.length; j++) {
          console("1", this.user_moment[i].useR_ID);
          if (this.user_moment[i].useR_ID == this.user[j].useR_ID) {
            this.display_users[i].useR_ID = this.user[j].useR_ID;
            this.display_users[i].useR_NAME = this.user[j].useR_NAME;
            this.display_users[i].uprofile = this.user[j].uprofile;
            this.display_users[i].momenT_ID = this.user_moments[i].useR_ID;
          }
        }
        for (let k = 0; k < this.Moments.length; k++) {
          if (this.user_moment[i].momenT_ID == this.Moments[k].momenT_ID) {
            this.display_users[i].momenT_LOCATION =
              this.Moments[k].momenT_LOCATION;
            this.display_users[i].text = this.Moments[k].text;
            this.display_users[i].picture = this.Moments[k].picture;
            this.display_users[i].vedio = this.Moments[k].vedio;
            this.display_users[i].momenT_TIME = this.Moments[k].momenT_TIME;
          }
        }
      }
      console.log("ees:", this.display_users.length);
      console.log("ees:", this.display_users);
    },
  },
  created() {
    this.getMoments();
    this.getuser_moments();
    this.getuser();
    this.getdisplay_users();
  },
};
</script>
<style scoped>
.zhankai {
  display: flex;
  cursor: pointer;
  position: absolute;
  right: 12px;
  bottom: 12px;
  color: #0d0d0d;
}
.singleMoment {
  padding: 20px;
  margin: 20px auto;
  box-sizing: border-box;
   background: #ecf8e0;
  border-radius: 10px;
  position: relative;
}
</style>
