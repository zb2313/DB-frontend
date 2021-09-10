<template>
<div>
   <Header1/>
   <el-container>
   <!-- 侧边栏 -->
    <el-aside width=240px>
      <!-- 侧边栏菜单区域 -->
      <el-menu
      text-color="#black"
      active-text-color="#224EFF"
      router>
      <!-- 一级菜单 -->
      <el-menu-item index="1">
        <!-- 一级菜单模板区 -->
        <template slot="title">
          <!-- 图标 -->
          <i class="el-icon-chat-dot-square"></i>
          <!-- 文本 -->
          <span>动态广场</span>
        </template>
      </el-menu-item>
      <!-- 发送动态路由 -->
      <el-menu-item index="2">
        <!-- 一级菜单模板区 -->
        <template slot="title" >
          <!-- 图标 -->
         <i class="el-icon-s-promotion"></i>
          <!-- 文本 -->
           <span>发布动态</span>
        </template>
      </el-menu-item>
        <!-- 查看动态路由  -->
       <el-menu-item index="3">
        <!-- 一级菜单模板区 -->
        <template slot="title" >
          <!-- 图标 -->
          <i class="el-icon-user"></i>
          <!-- 文本 -->
          <span>个人动态</span>
        </template>
      </el-menu-item>
    </el-menu>
    </el-aside>
    <!-- 右侧内容主体 -->
    <el-main>
     
 <div class="ALLMoment">

    <!-- 动态区域 -->
    <div class="showMoment">
     <el-card v-if="this.Moments.length===0"> <span>暂无数据···</span></el-card><br>
       <el-col :span="9" v-for="(item, index) in Moments" 
      :key="index"
      :offset="2">
        <el-card class="singleMoment">
          <el-image
          :src="user_avator"
          style="float: left;border-radius: 100%;width:60px"
        ><div slot="error" style="font-size:13px">加载中...</div>
      </el-image>
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
         </div>
              <!-- 动态发布地点信息和时间信息 -->
         <br>
        </el-card>
       </el-col>
    </div>
  </div>
    </el-main></el-container>
  <Footer1/>
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
           for(let i=0;i<this.Moments.length;i++)
            {
              axios.get("http://49.234.18.247:8080/api/MomentPic/"+this.Moments[i].momenT_ID)
              .then(res=>
              {if(res.data!="NULL")
                this.Moments[i].picture=res.data;
              });
            }
          console.log("moment:", this.Moments);
          console.log("res:", this.$route.params.useR_ID);
          return res.data;
        });
    },
  },
  // created()：在实例创建完成后被立即调用
  created() {
    this.getMoments();
axios.get("http://49.234.18.247:8080/api/Users/"+localStorage.getItem("ms_username"))
.then((res)=>
{this.user_avator=res.data[0].uprofile;
  this.user_name=res.data[0].useR_NAME;
              axios.get("http://49.234.18.247:8080/api/Portrait/"+localStorage.getItem("ms_username"))
        .then(res=>
        {
           let pic=res.data;
           if(pic!="NULL")
          this.user_avator=pic;
        })
})
  },
};
</script>

<style scoped>

.ALLMoment {
  min-height: 633px;
  width: 100%;
  position: relative;
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
.el-aside{
  background-color: white;
}
.el-main{
  background-color: #f1f3f0;
}
</style>
