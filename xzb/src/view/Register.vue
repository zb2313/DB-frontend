<template>
  <div class="bgc">
    <div class="dashboard-container">
      <div class="title"><h1>注册</h1></div>
      <br />
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="用户昵称">
          <el-input style="width: 380px" v-model="form.user_NAME" />
        </el-form-item>
        <el-form-item label="用户ID">
          <p>{{form.user_ID}}</p>
        </el-form-item>
        <el-form-item label="密码">
          <el-input style="width: 380px" v-model="form.Password" />
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input style="width: 380px" v-model="form.id_number" />
        </el-form-item>
        <el-form-item label="手机">
          <el-input style="width: 380px" v-model="form.tele_NUMBER" />
        </el-form-item>
        <el-form-item label="E-mail">
          <el-input style="width: 380px" v-model="form.mail" />
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="form.Gender">
            <el-radio label="Male" />
            <el-radio label="Female" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="地点">
          <v-distpicker
              @province="onChangeProvince" @city="onChangeCity" @area="onChangeArea">
          </v-distpicker>
        </el-form-item>
        <div style="text-align: center; margin-top: 40px">
          <el-button type="primary" @click="onSubmit">注册</el-button>
          <el-button @click="checkInput">取消</el-button>

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
  userList:{},
  computed: {},
  components: { VDistpicker },
  data() {
    return {
      form: {
        mail:"",
        user_NAME: "",//用户名
        Password: "",//密码
        user_ID: "",//用户编号
        id_number:"",
        delivery: false,
        type: [],
        Gender: "男",//性别
        desc: "",
        tele_NUMBER: "",//电话号码
        mailbox_ID: "",//
        dState: true,
      },
      testInfo: "",
      //省市区
      province: "aaaaa",
      city: "",
      area: "",
      location:" ",
      show: false,
    };
  },
  methods: {
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
    checkInput()
    {
      this.onSubmit();
    },
    onSubmit() {

      axios.post("http://49.234.18.247:8080/api/Users",

          {
            "useR_ID": this.form.user_ID,
            "useR_NAME": this.form.user_NAME,
            "iD_NUMBER": this.form.id_number,
            "telE_NUMBER":this.form.tele_NUMBER,
            "mailboX_ID": null,
            "uprofile": null,
            "upassword": this.form.Password,
            "gender": this.form.Gender,
            "ulocation": this.location,
            "motto": null
          }
      );
      this.$message.success("注册成功,请返回登录界面登录");
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
    checkRepeatitive()
    {
      for(let i=0;i<this.userList[0].length;i++)
      {
        if((this.user_ID==this.userList[i].useR_ID)||(this.mailbox_ID==this.userList[i].mailboX_ID))
        {
          return false;
        }
      }

      return true;
    }
  },
  created() {
    do {
      this.setUserID();
      this.setMailBoxID();
    }while(this.checkRepeatitive()==true);
    axios.get("http://49.234.18.247:8080/api/Users")
        .then((response)=>{this.userList=response.data});
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
.bgc:before {
  content: "";
  display: table;
}
.bgc {
  height:800px;
  background: no-repeat center/100%
  url(https://dimg04.c-ctrip.com/images/tg/891/081/421/a93d36fd50a443e2a84b65c03049427a_R_1024_10000_Q90.jpg);
}
.dashboard-container {
  width: 37%;
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
