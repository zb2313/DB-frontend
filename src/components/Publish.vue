<template>
<div>
  <Header1/>
  <el-container>
    <el-main>
      <div id="editor">
        <mavon-editor
            style="height: 95% ;width:90%;margin:auto"
            v-model="md"
            ref="md"
        ></mavon-editor>
      </div>
      <div class="upload">
      <el-upload
       class="upload-demo"
       ref="upload"
       :action="uploadurl"
      :on-preview="handlePreview"
       :on-remove="handleRemove"
     :file-list="fileList"
     :auto-upload="false"
     :limit="1"
     list-type="picture">
      <el-button slot="trigger" size="large" type="primary" @click="creatMoment_ID()">添加图片</el-button>
      <div slot="tip" class="el-upload__tip">只能上传一个jpg/png文件，且不超过5MB</div>
      </el-upload>
      </div>
      <div class="pick_location">
        <div class="notice">请选择地点</div>
        <div class="selects">
          <v-distpicker
              @province="onChangeProvince" @city="onChangeCity" @area="onChangeArea">
            </v-distpicker>
        </div>
        <el-button type="primary" icon="el-icon-s-promotion" style="float: right;margin-right:10px" @click="PublishButton">发布动态</el-button>
       <el-button type="primary" plain style="float:right;margin-right:10px" @click="goBack">取消发布</el-button>
      </div>
    </el-main>
  </el-container>
  <Footer1/>
</div>
</template>

<script>
// Local Registration
import axios from "axios";

import Header1 from "@/components/Header1.vue";
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
axios.defaults.baseURL = "http://127.0.0.1:8081";
import VDistpicker from 'v-distpicker'
import Footer1 from "@/components/Footer1.vue";
export default {
  components: {VDistpicker,  Header1,Footer1},
  name: "pulishNav",
  data() {
    return {fileList: [],
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
      uploadurl:""
    };
  },
  methods:{
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
    goBack() {
      this.$router.push('/1')
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
      if(this.momenT_ID=="")
      {
      do{
      let chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
      var Moment_ID='';
      for(let i=0;i<10;i++)
      {
        let id = Math.ceil(Math.random()*35);
        Moment_ID+=chars[id];
      }
      var rep=false;//id重复标志
      this.$axios
      .get("http://49.234.18.247:8080/api/Moment")
      .then((res)=>{
        this.momenTID_LIST=res.data
        console.log("list:",this.momenTID_LIST)
        for(let j=0;j<this.momenTID_LIST.length;j++)
        {
          console.log("data:",this.momenTID_LIST[j].momenT_ID)
          if(Moment_ID===this.momenTID_LIST[j].momenT_ID)
         rep=true;
        }
      })
    }while(rep===true)//动态id重复时重新生成一个
      this.momenT_ID=Moment_ID;
      this.uploadurl="http://49.234.18.247:8080/api/MomentPic/"+this.momenT_ID;}
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
        //this.momenT_ID="";
        if(this.uploadurl=="")
         this.creatMoment_ID();
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
              console.log('id:',this.momenT_ID);
              this.$refs.upload.submit();
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
  height: 575px;
}
.el-row {
  margin-bottom: 20px;
}
.pick_location{
  position: relative;
  width: 90%;
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
.upload{
  position: relative;
  left: 80px;
  bottom: 20px;
  width: 300px;
}
.submit_button{
  margin-right: 20px;
}
</style>
