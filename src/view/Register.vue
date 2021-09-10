<template>
  <div
    class="bgc"
    :style="{
      backgroundImage: 'url(' + coverImgUrl + ')',
      backgroundSize: '100% 100%',
      backgroundRepeat: 'no-repeat',
    }"
  >
    <div class="main">
      <div class="dashboard-container">
        <div class="title"><h1>注册</h1></div>
        <br />
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="用户昵称">
            <el-input style="width: 380px" v-model="form.user_NAME" />
          </el-form-item>
          <el-form-item label="密码">
            <el-input style="width: 380px" v-model="form.Password" />
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input
              type="password"
              style="width: 380px"
              v-model="form.checkPassword"
            />
          </el-form-item>
          <el-form-item label="身份证号">
            <el-input style="width: 380px" v-model="form.id_number" />
          </el-form-item>
          <el-form-item label="注册方式">
            <el-radio v-model="registerType" label="1">手机号注册</el-radio>
            <el-radio v-model="registerType" label="2">邮箱注册</el-radio>
          </el-form-item>
          <el-form-item label="手机" v-if="registerType == 1">
            <el-input style="width: 268px" v-model="form.tele_NUMBER" />
            <el-button type="primary" @click="sendPhoneVerifyCode"
              >发送验证码</el-button
            >
          </el-form-item>
          <el-form-item label="E-mail" v-if="registerType == 2">
            <el-input style="width: 268px" v-model="form.mail" />
            <el-button type="primary" @click="sendMailVerifyCode"
              >发送验证码</el-button
            >
          </el-form-item>
          <el-form-item label="邮箱验证码" v-if="mailVerifyStatus">
            <el-input style="width: 250px" v-model="form.verifycode"></el-input>
          </el-form-item>
          <el-form-item label="手机验证码" v-if="phoneVerifyStatus">
            <el-input style="width: 250px" v-model="form.verifycode"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="form.Gender">
              <el-radio label="男" />
              <el-radio label="女" />
            </el-radio-group>
          </el-form-item>
          <el-form-item label="地点">
            <v-distpicker
              @province="onChangeProvince"
              @city="onChangeCity"
              @area="onChangeArea"
            >
            </v-distpicker>
          </el-form-item>
          <div style="text-align: center; margin-top: 40px">
            <el-button type="primary" @click="onSubmit">注册</el-button>
            <el-button @click="goBack">取消</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import VDistpicker from "v-distpicker";
import axios from "axios";
//email 后加发送验证码按钮和输入框
//
export default {
  name: "Register",
  userList: {},
  computed: {},
  components: { VDistpicker },
  //用户id在注册完后生成
  data() {
    return {
      form: {
        mail: "",
        user_NAME: "", //用户名
        Password: "", //密码
        user_ID: "", //用户编号
        id_number: "",
        Gender: "", //性别
        desc: "",
        tele_NUMBER: "", //电话号码
        mailbox_ID: "", //
        dState: true,
        verifycode: "",
        checkPassword: "",
      },
      coverImgUrl: require("../assets/img/login-bg.jpg"),
      testInfo: "",
      //省市区
      province: "aaaaa",
      city: "",
      area: "",
      location: "",
      show: false,
      mailVerifyStatus: false,
      phoneVerifyStatus: false,
      registerType: "1",
    };
  },
  methods: {
    returnToLogin() {
      this.$router.push("/Login");
    },
    setUserID() {
      let chars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
      let ID = "";
      for (let i = 0; i < 10; i++) {
        let id = Math.ceil(Math.random() * 9);
        ID += chars[id];
      }
      this.form.user_ID = ID;
    },
    setMailBoxID() {
      this.form.mailbox_ID = this.form.user_ID;
    },
    goBack() {
      this.$router.push("/Login");
    },
    onSubmit() {
      if (this.form.Password != this.form.checkPassword) {
        this.$message.error("两次输入的密码不一致");
        return;
      }
      if (this.registerType == "2") {
        axios
          .post("http://49.234.18.247:8080/api/OAuth/" + this.form.verifycode, {
            useR_ID: this.form.mail,
            useR_NAME: this.form.user_NAME,
            iD_NUMBER: this.form.id_number,
            telE_NUMBER: this.form.tele_NUMBER,
            mailboX_ID: this.form.mail,
            uprofile: "http://49.234.47.118:8080/pictures/user_uprofile_0.jpg",
            upassword: this.form.Password,
            gender: this.form.Gender,
            ulocation: this.location,
            motto: null,
          })
          .then((response) => {
            if (response.status == "204") {
              this.$message.error("验证码错误");
            } else if (response.status == "409") {
              //验证码正确 userid重复
            } else {
              //成功注册
              this.$message.success("注册成功");
              this.$alert(
                "用户id: " +
                  this.form.user_ID +
                  "  密码: " +
                  this.form.Password,
                "确认账户",
                {
                  confirmButtonText: "确定",
                  callback: (action) => {
                    this.$message({
                      type: "info",
                      message: `action: ${action}`,
                    });
                  },
                }
              );
            }
          });
      } else {
        axios
          .post("http://49.234.18.247:8080/api/OAuth/" + this.form.verifycode, {
            useR_ID: this.form.tele_NUMBER,
            useR_NAME: this.form.user_NAME,
            iD_NUMBER: this.form.id_number,
            telE_NUMBER: this.form.tele_NUMBER,
            mailboX_ID: this.form.mail,
            uprofile: "http://49.234.47.118:8080/pictures/user_uprofile_0.jpg",
            upassword: this.form.Password,
            gender: this.form.Gender,
            ulocation: this.location,
            motto: null,
          })
          .then((response) => {
            if (response.status == "204") {
              this.$message.error("验证码错误");
            } else if (response.status == "409") {
              //验证码正确 userid重复
            } else {
              //成功注册
              this.$message.success("注册成功");
              this.$alert(
                "用户id: " +
                  this.form.user_ID +
                  "  密码: " +
                  this.form.Password,
                "确认账户",
                {
                  confirmButtonText: "确定",
                  callback: (action) => {
                    this.$message({
                      type: "info",
                      message: `action: ${action}`,
                    });
                  },
                }
              );
            }
          });
      }
    },
    onCancel() {
      this.$message({
        message: "cancel!",
        type: "warning",
      }),
        this.$router.push("/Login");
    },
    //打开选择地区
    onChangeProvince(data) {
      this.province = data.value;
    },
    onChangeCity(data) {
      this.city = data.value;
    },
    onChangeArea(data) {
      this.area = data.value;
      this.location = this.province + this.city + this.area;
    },
    sendMailVerifyCode() {
      axios.post(
        "http://49.234.18.247:8080/api/Email/" + this.form.mail + "&register"
      );
      this.mailVerifyStatus = true;
    },
    sendPhoneVerifyCode() {
      axios.post(
        "http://49.234.18.247:8080/api/CellphoneCode/86" +
          this.form.tele_NUMBER +
          "&register"
      );
      this.phoneVerifyStatus = true;
    },
  },
  created() {
    this.setUserID();
    this.setMailBoxID();
  },
  mounted: function () {},
};
</script>

<style scoped>
h1 {
  margin: 0;
  padding: 0;
}
.bgc {
  position: absolute;
  height: 100%;
  width: 100%;
}
.main {
  height: 100%;
  width: 650px;
  display: flex;
  align-items: center;
}
.dashboard-container {
  padding-top: 10px;
  width: 550px;
  height: 650px;
  margin: 0px auto;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 5px;
}
.title {
  text-align: center;
  color: #2d8cf0;
}
.el-form /deep/ .el-form-item__label {
  color: #2d8cf0;
}
.el-form /deep/ .el-radio__label {
  color: #2d8cf0;
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
