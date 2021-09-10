<template>
  <div class="bgc">
    <div class="dashboard-container">
      <div class="title"><h1>修改个人信息</h1></div>
      <br />
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="用户头像">
          <el-upload
          class="avatar-uploader"
          ref="upload"
        :action="avaurl"
        :before-upload="beforeAvatarUpload"
        :on-success="handleAvatarSuccess"
        :on-error="handleAvatarError"
        list-type="picture-card"
        :limit="1">
        <el-tooltip content="点击上传头像" placement="top"><img v-if="flag" :src="imageUrl"  class="avatar"></el-tooltip>
      </el-upload><br>
        </el-form-item>
        <el-form-item label="用户昵称">
          <el-input style="width: 380px" v-model="form.user_NAME" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input style="width: 380px" v-model="form.Password" />
        </el-form-item>
        <el-form-item label="手机">
          <el-input style="width: 380px" v-model="form.tele_NUMBER" />
        </el-form-item>
        <el-form-item label="E-mail">
          <el-input style="width: 380px" v-model="form.mail" />
        </el-form-item>
        <el-form-item label="地点">
          <v-distpicker
              @province="onChangeProvince" @city="onChangeCity" @area="onChangeArea">
          </v-distpicker>
        </el-form-item>
        <div style="text-align: center; margin-top: 40px">
          <el-button type="primary" @click="onSubmit">保存</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import VDistpicker from "v-distpicker";
import axios from "axios";
export default {
  name: "Register",
  computed: {},
  components: { VDistpicker },
  data() {
    return {
      form: {
        mail:"待修改",
        user_NAME: "未命名",//用户昵称 待修改
        Password: "待修改",//密码 待修改
        tele_NUMBER: "待修改",//电话号码 待修改
      },
      flag:true,
      imageUrl:"",
      avaurl:"",
      userid:"",
      userInfo:{},
      testInfo: "",
      //省市区
      province: "",
      city: "",
      area: "",
      location:" ",
      show: false,
      fileList: [],
    };
  },
  methods: {
      handleAvatarSuccess(res,file){this.flag=false;
  this.imageUrl = URL.createObjectURL(file.raw);
      },
      handleAvatarError(res,file){this.flag=true;
  this.imageUrl = URL.createObjectURL(file.raw);
      },
    deleteFormal()
    {
      axios.delete("http://49.234.18.247:8080/api/Portrait/"+localStorage.getItem("ms_username"));
    },
    beforeAvatarUpload()
    {
      this.deleteFormal()
    },
    onSubmit() {
      let n=localStorage.getItem("ms_username");
     axios.put("http://49.234.18.247:8080/api/Users/"+n,
          {
            "useR_ID": n,
            "useR_NAME": this.form.user_NAME,
            "iD_NUMBER": this.userInfo[0].iD_NUMBER,
            "telE_NUMBER":this.form.tele_NUMBER,
            "mailboX_ID": n,
            "uprofile": this.imageUrl,
            "upassword": this.form.Password,
            "gender": this.userInfo[0].gender,
            "ulocation": this.location,
            "motto": null
          }
      );
      this.$message.success("修改成功");
      this.$router.push('/Login');
    },
    onCancel(){
      this.$message({
        message: "cancel!",
        type: "warning",
      }),
          this.$router.push("/Login");
    },
    //打开选择地区
    onChangeProvince(data) {
      this.province= data.value
    },
    onChangeCity(data) {
      this.city= data.value
    },
    onChangeArea(data) {
      this.area= data.value
      this.location=this.province+this.city+this.area;
    },
  },
  created() {
    //昵称 密码 手机号
    this.userid=localStorage.getItem("ms_username");
    axios.get("http://49.234.18.247:8080/api/Users/"+this.userid)
        .then((response)=>{
          this.userInfo=response.data
          console.log(this.userInfo[0].uprofile)
          this.form.user_NAME=this.userInfo[0].useR_NAME;
          this.form.Password=this.userInfo[0].upassword;
          this.form.tele_NUMBER=this.userInfo[0].telE_NUMBER;
          this.imageUrl=this.userInfo[0].uprofile;
        });
      this.avaurl="http://49.234.18.247:8080/api/Portrait/"+this.userid;
       axios.get("http://49.234.18.247:8080/api/Portrait/"+this.userid)
        .then(res=>
        {
           if(res.data!="NULL")
          this.imageUrl=res.data;
        })
  },
};
</script>

<style scoped>
h1 {
  margin: 0;
  padding: 0;
}
.bgc:before {
  content: "";
  display: table;
}
.bgc {
  height:800px;
  background: no-repeat center/100%
}
.dashboard-container {
  width: 50%;
  height: 650px;
  margin:70px auto;
  background-color: rgba(99, 126, 147, 0.58);
}
.title {
  text-align: center;
  color: white;
}
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
.el-form /deep/ .el-form-item__label {
  color: white;
}
.el-form /deep/ .el-radio__label {
  color: white;
}
/*省市区三级联动*/
.divwrap {
  height: 50%;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 99;
}

/*外部*/
.divwrap > .distpicker-address-wrapper {
  color: #0d0d0d;
  height: 100%;
}

/*头部*/
.divwrap >>> .address-header {
  background: #000;
  color: #fff;
  width: 100%;
  position: fixed;
  bottom: 50%;
  height: 0.5rem;
  font-size: 0.2rem;
}

/*头部内容*/
.divwrap >>> .address-header ul li {
  flex-grow: 1;
  text-align: center;
}

/*选择过省市区的头部*/
.divwrap >>> .address-header .active {
  color: #fff;
  border-bottom: 0.05rem solid #666;
}

/*内容部分*/
.divwrap >>> .address-container {
  overflow: scroll;
  height: 100%;
}

/*点过的地区内容*/
.divwrap >>> .address-container .active {
  color: red;
}
</style>
