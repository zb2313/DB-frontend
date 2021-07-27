<template>
  <el-container>
    <!-- 头部区域 -->
    <el-header class="PublishHead" style="height: 80px">
      <div class="headline">动态发布</div>

      <el-button type="primary" icon="el-icon-back" style="margin-top: 30px;margin-right:75px" @click="goBack">返回 </el-button>
    </el-header>
    <el-main>

      <div id="editor">
        <mavon-editor
            style="height: 95% ;width:90%;margin:auto"
            v-model="md"
            ref="md"
        ></mavon-editor>
      </div>

      <div class="pick_location">
        <div class="notice">请选择地点</div>
        <div class="selects">
          <v-distpicker
              @province="onChangeProvince" @city="onChangeCity" @area="onChangeArea">
            </v-distpicker>
        </div>
        <el-button type="primary" style="float: right;margin-right:145px" @click="PublishButton">动态发布</el-button>

      </div>

    </el-main>

  </el-container>

</template>

<script>
// Local Registration
import axios from "axios";

import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
axios.defaults.baseURL = "http://127.0.0.1:8081";
import VDistpicker from 'v-distpicker'
export default {
  components: {VDistpicker},
  name: "pulishNav",
  data() {
    return {
      md: "", // 文章内容
      momenT_ID:"",//动态ID
      momenTID_LIST:[],
      // 地址分类
      province: "",
      city: "",
      area: "",
      location:" ",
      time:"",
      value:0, //是否选择了地点
    };
  },
  methods:{
    goBack() {
      this.$router.push('/')
    },
    //打开选择地区
    onChangeProvince(data) {
      this.province= data.value
      this.location=this.province
      this.value=1
    },
    onChangeCity(data) {
      this.city= data.value
      this.location=this.province+this.city
      this.value=1
    },
    onChangeArea(data) {
      this.area= data.value
      this.location=this.province+this.city+this.area;
      this.value=1
    },
    creatMoment_ID(){
      let chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
      let Moment_ID='';
      for(let i=0;i<10;i++)
      {
        let id = Math.ceil(Math.random()*35);
        Moment_ID+=chars[id];
      }
      this.$axios
      .get("http://49.234.18.247:8080/api/Moment")
      .then((res)=>{
        this.momenTID_LIST=res.data
        console.log("list:",this.momenTID_LIST)
        for(let j=0;j<this.momenTID_LIST.length;j++)
        {
          console.log("data:",this.momenTID_LIST[j].momenT_ID)
          if(Moment_ID===this.momenTID_LIST[j].momenT_ID)
          {
            alert("动态id重复，请重新发布")
          }
        }
      })
      this.momenT_ID=Moment_ID;
    },
    gettime(){
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let nowDate = year + "-" + month + "-" + day;
      this.time=nowDate
    },
    PublishButton() {
      if (this.md) {
        if(this.value){
        // 获取文章之后的处理逻辑
        //自动生成一个momenT_ID
        this.momenT_ID="",
        this.creatMoment_ID()
        this.gettime()
        this.$axios
          .post(
            "http://49.234.18.247:8080/api/Moment",
           {
            "momenT_ID": this.momenT_ID,
            "momenT_TIME": this.time,
            "momenT_LOCATION": this.location,
            "text": this.md,
            "picture": null,
            "vedio": null
           }
          )
          .then((res)=> {
            console.log("res:",res.data);
            if (res.status === 201) {
              console.log('id:',this.momenT_ID)
            this.$message({
            type: 'success',
            message: '发布成功!'})
              let n=localStorage.getItem("ms_username");
              this.$axios
                  .post("http://49.234.18.247:8080/api/ReleaseMoment",
                      {
                        "momenT_ID": this.momenT_ID,
                        "useR_ID": n
                      })
                  .then(()=>{
                    this.momenT_ID="";
                    console.log("aId:",this.momenT_ID)
                  });
            }
            this.$router.push('/1')
          })
          .catch(()=> {
            console.log("error");
          });


      }
      else {
        alert("地址不能为空！");
          }
      }
        else {
        alert("文章内容不能不空！");
      }
    },
  },
  comments: mavonEditor,
}
</script>
<style scoped>
#editor {
  margin: auto;
  width: 100%;
  height: 580px;
}
.PublishHead button{
  display: block;
  float: right;
  justify-content: center;
  align-content: center;
  margin-top: 10px;
}
.el-row {
  margin-bottom: 20px;
}
.pick_location{
  width: 100%;
  height: 40px;
  margin-left: 70px;
}
.notice{
  height:100%;
  width: 80px;
  float: left;
  margin-top: 10px;
}
.selects{
  height:100%;
  width:500px;
  float: left;
  text-align: left;
  margin-left: 20px;
}

.submit_button{

  margin-right: 20px;
}
.headline{
  margin-top: 20px;
  margin-left: 75px;
  font-size: 30px;
  font-weight: bold;
  color: #ffffff;
  float: left;
}
</style>
