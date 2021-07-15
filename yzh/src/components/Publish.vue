<template>
<el-container>
  <!-- 头部区域 -->
  <el-header class="PublishHead">
    <el-button type="primary" icon="el-icon-back" @click="goBack">返回 </el-button>
  </el-header>
  <el-main>
  <el-row :gutter="3">
    <el-col>
      <div id="editor">
        <mavon-editor
          style="height: 100%"
          v-model="md"
          ref="md"
        ></mavon-editor>
      </div>
    </el-col>
  </el-row>
  <el-row>
    <el-col>
      <el-form>
      <el-form-item label="请选择地点" label-position=right>
      <v-distpicker
      @province="onChangeProvince" @city="onChangeCity" @area="onChangeArea">
      </v-distpicker>
      </el-form-item>
      </el-form>
    </el-col>
  </el-row>
  </el-main>
  <el-footer>
    <el-row :gutter="3">
            <el-col>
              <el-button type="success" @click="PublishButton">动态发布</el-button>
            </el-col>
          </el-row>
  </el-footer>
</el-container>
  
</template>

<script>
// Local Registration
import axios from "axios";
import qs from "qs"; // post请求传form-data要转换
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
      })
      for(let j=0;j<this.momenTID_LIST.length;j++)
      {
        console.log("data:",this.momenTID_LIST[j].momenT_ID)
        if(Moment_ID===this.momenTID_LIST[j].momenT_ID)
        {
          alert("动态id重复，请重新发布")
        }
      }
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
            message: '发布成功!'
          	});
            }
            this.$router.push('/1')
          })
          .catch((error)=> {
            console.log("error");
          });
          this.$axios
          .post("http://49.234.18.247:8080/api/ReleaseMoment",
          {
            "momenT_ID": this.momenT_ID,
            "useR_ID": "1234567890"
          })
          .then((res)=>{
             this.momenT_ID="";
             console.log("aId:",this.momenT_ID)
          })
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
  height: 700px;
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
/*省市区三级联动*/
</style>