<template>
  <div class="bgc">
    <div class="dashboard-container">
      <div class="title"><h1>商家入驻</h1></div>
      <br />
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="商家名称">
          <el-input style="width: 380px" v-model="form.hotel_name" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input style="width: 380px" v-model="form.Password" />
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input type="password" style="width: 380px" v-model="form.vPassword" />
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input style="width: 380px" v-model="form.id_number" />
        </el-form-item>
        <el-form-item label="手机">
          <el-input style="width: 380px" v-model="form.tele_NUMBER" />
        </el-form-item>
        <el-form-item label="E-mail">
          <el-input style="width: 268px" v-model="form.mail" />
          <el-button type="primary" @click="sendVerifyCode">发送验证码</el-button>
        </el-form-item>
        <el-form-item label="邮箱验证码" v-if="verifyStatus">
          <el-input style="width: 250px" v-model="form.verifycode"></el-input>
        </el-form-item>
        <el-form-item label="地点">
          <el-input style="width: 380px" v-model="form.location"> </el-input>
        </el-form-item>

        <el-upload
            class="upload-demo"
            action="http://49.234.18.247:8080/api/HotelLicense/0000000002"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            list-type="string">
          <el-button size="small" type="primary">点击上传资质证明</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>


        <div style="text-align: center; margin-top: 40px">
          <el-button type="primary" @click="onSubmit">注册</el-button>
          <el-button @click="goBack">取消</el-button>

        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
//email 后加发送验证码按钮和输入框
//
export default {
  name: "HotelRegister",
  computed: {},
  //用户id在注册完后生成
  data() {
    return {
      form: {
        mail:"",
        hotel_name: "",//用户名
        Password: "",//密码
        vPassword:"",
        user_ID: "",//用户编号
        id_number:"",
        Gender:"",//性别
        desc: "",
        tele_NUMBER: "",//电话号码
        mailbox_ID: "",//
        dState: true,
        verifycode:"",
        location:" "
      },
      testInfo: "",
      //省市区
      province: "aaaaa",
      city: "",
      area: "",
      location:" ",
      show: false,
      verifyStatus:false,
      fileList: [],
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    returnToLogin()
    {
      this.$router.push("/Login");
    },
    setUserID()
    {
      let chars = ['0','1','2','3','4','5','6','7','8','9'];
      let ID='';
      for(let i=0;i<10;i++)
      {
        let id = Math.ceil(Math.random()*9);
        ID+=chars[id];
      }
      this.form.user_ID=ID;
    },
    setMailBoxID()
    {
      this.form.mailbox_ID=this.form.user_ID;
    },
    goBack()
    {
      this.$router.push("/Login");
    },
    onSubmit() {
      axios.post("http://49.234.18.247:8080/api/Hotel",
      {
        "hoteL_ID":"1000000000",
        "hoteL_NAME":this.form.hotel_name,
        "hlocation":this.form.location,
        "pictrue":"1",
        "star":1,
        "lowesT_PRICE":1,
        "hpassword":this.form.Password,
        "label":"lalala"
      })
    },
    onCancel(){
      this.$message({
        message: "cancel!",
        type: "warning",
      }),
          this.$router.push("/Login");
    },
    //打开选择地区
    sendVerifyCode()
    {
      axios.get("http://49.234.18.247:8080/api/Email/"+this.form.mail+"&register");
      this.verifyStatus=true;
    }
  },
  created() {
    this.setUserID();
    this.setMailBoxID();
  },
  mounted: function () {

  },
};
</script>

<style scoped>
h1 {
  margin: 0;
  padding: 0;
}
.bgc {
  background: url("../assets/img/login-bg.jpg") no-repeat;
  background-position: center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
}
.dashboard-container {
  width: 550px;
  height: 650px;
  margin:70px auto;
  background-color: rgba(99, 126, 147, 0.58);
}
.title {
  text-align: center;
  color: white;
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
