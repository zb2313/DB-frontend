<template>
  <div class="singleShow">
    <Header1/> 
    <!-- 动态区 --><el-container style="min-height:633px">
    <div class="singleMoment" v-for="(item, index) in Moments" :key="index">
       
      <el-card>
        <el-image
          :src="item.uprofile"
          style="float: left;border-radius: 100%;width:60px"
        ><div slot="error" style="font-size:13px">加载中...</div>
        </el-image>
        <pre><span style="float: left">{{item.useR_NAME}}</span>
		<span style="float: left">发布于{{item.momenT_TIME}}</span><br><span style="float: left"><i class="el-icon-location-outline"/>{{item.momenT_LOCATION}}</span>
		</pre>
        <div style="text-align:center">
           <p>{{ item.text }}</p>
          <img
            class="moment_img"
            :src="item.picture"
            v-if="item.picture !== null"
            style="height: 430px "
          />
          <div class="moment_video" v-if="item.vedio !== null">
            <iframe
              :src="item.vedio"
              frameborder="0"
              allow="autoplay;encrypted-media"
              allowfullscreen
              style="width: 80px; height: 50px"
            >
            </iframe>
           
          </div>
        </div> <br>
        <div id="end">~THE END~</div>
      </el-card>
    </div>
    <el-aside style="width:400px">
    <!-- 发表评论区 -->
    <div class="submit">
      <div><sapn style="font-size:20px">评论</sapn>({{Comments.length}})</div><br>
      <el-input
        class="comment_input"
        type="textarea"
        :autosize="{ minRows: 2 }"
        placeholder="输入你的评论"
        v-model="comment_text"
        maxlength="100"
        show-word-limit
      ></el-input>
 <br /><br>
      <el-button size="medium" type="primary" class="el-icon-s-promotion" @click="submit">发表</el-button>
      <el-button size="medium" type="primary" plain @click="goback">返 回</el-button>
      
    </div>
    <!-- 评论区 -->
    <div class="commentMoment_box">
      <li
        class="CommentMoment"
        v-for="(item1, index) in Comments"
        :key="index"
        style="list-style: none"
      >
        <el-card>
          <el-image
            :src="item1.uprofile"
            style="float: left;border-radius: 100%;width:60px"
          ><div slot="error" style="font-size:13px">加载中...</div>
          </el-image>
          <div>
         <span> {{item1.useR_NAME}}</span><br>
            <span style="color:gray" >发表于{{item1.commenT_TIME}}</span>
           </div> <br>
          <div >{{ item1.commenT_TEXT }}</div>
        </el-card>
      </li>
    </div>
    </el-aside>
    </el-container>
    <Footer1/>
  </div>
</template>
<script>
import axios from "axios";
import Header1 from "@/components/Header1.vue";
import Footer1 from "@/components/Footer1.vue";
export default {
   components:{
      Header1,
      Footer1
    },
  name: "singleMomment",
  data() {
    return {
      Moments: [],
      // 评论数据
      Comments: [],
      //用户发表的评论
      comment_text: "",
      //动态id
      comment_ID: "",
      //用户id
      useR_ID: "",
      time: "",
    };
  },
  // created()：在实例创建完成后被立即调用
  created() {
    const url = `http://49.234.18.247:8080/api/FunMoment/${this.$route.params.momenT_ID}`;
    axios.get(url).then(
      (res) => {
        this.Moments = res.data; 
        axios.get("http://49.234.18.247:8080/api/MomentPic/"+this.Moments[0].momenT_ID)
        .then(res=>
        {var pic=res.data;
          if(pic!="NULL")
          this.Moments[0].picture=pic;
        });
      axios.get("http://49.234.18.247:8080/api/Portrait/"+this.Moments[0].useR_ID)
        .then(res=>
        {
           if(res.data!="NULL")
          this.Moments[0].uprofile=res.data;
        })
        console.log(this.Moments);
      },
      (err) => {
        console.log(err);
      }
    );
    axios
      .get(
        `http://49.234.18.247:8080/api/FunGetCommentByMomentId/${this.$route.params.momenT_ID}`
      )
      .then((res) => {
        this.Comments = res.data;
         axios.get("http://49.234.18.247:8080/api/Portrait/"+this.Comments[0].useR_ID)
        .then(res=>
        {
           if(res.data!="NULL")
          this.Comments[0].uprofile=res.data;
        })
        console.log("comments", this.Comments);
      });
  },
  methods: {
    goback() {
      this.$router.push("/1");
    },
    gettime() {
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let nowDate = year + "-" + month + "-" + day;
      this.time = nowDate;
    },
    submit() {
      let userid=localStorage.getItem("ms_username");
      if (this.comment_text !== "") {
        this.$confirm("此操作将提交评论, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            (this.comment_ID = this.$route.params.momenT_ID), this.gettime();
            this.$axios
              .post("http://49.234.18.247:8080/api/CommentMoment", {
                useR_ID: userid,
                momenT_ID: this.comment_ID,
                commenT_TEXT: this.comment_text,
                commenT_TIME: this.time,
              })
              .then(() => {
                this.comment_text = "";
                axios
                  .get(
                    `http://49.234.18.247:8080/api/FunGetCommentByMomentId/${this.$route.params.momenT_ID}`
                  )
                  .then((res) => {
                    this.Comments = res.data;
                  });
              });
            this.$message({
              type: "success",
              message: "发布成功!",
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消发布",
            });
          });
      } else {
        this.$message("评论内容不能为空！");
      }
    },
  },
};
</script>
<style scoped>
.submit {
  width: 90%;
  height:170px;
  padding-left:10%;
}
.comment_input {
  width: 100%;
  margin: auto;
}
.comment_input {
  width: 90%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.singleMoment {
  width: 70%;
  margin: 12px auto;
 position: relative;
 left: 1%;
 right: 1%;
}
.CommentMoment {
  width: 80%;
  margin: 12px auto;
}
#end{
  text-align: center;
  font-size:30px;
  color: gray;
}
</style>
