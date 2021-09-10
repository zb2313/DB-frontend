<template>
  <div
    class="login-wrap"
    :style="{
      backgroundImage: 'url(' + coverImgUrl + ')',
      backgroundSize: '100% 100%',
      backgroundRepeat: 'no-repeat',
    }"
  >
    <iframe
      id="geoPage"
      width="0"
      height="0"
      frameborder="0"
      style="display: none"
      scrolling="no"
      src="https://apis.map.qq.com/tools/geolocation?key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=myapp"
    >
    </iframe>

    <div class="main">
      <div class="ms-login">
        <div class="ms-title">
          <img src="../../public/lvdao.png" width="60px" />
          <div style="height: 40px; line-height: 40px">LvDao旅游信息系统</div>
        </div>
        <el-form
          :model="param"
          :rules="rules"
          ref="login"
          label-width="0px"
          class="ms-content"
        >
          <el-form-item prop="username">
            <el-input v-model="param.userid" placeholder="username">
              <template #prepend>
                <el-button icon="el-icon-user"></el-button>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              placeholder="password"
              v-model="param.password"
              show-password
            >
              <template #prepend>
                <el-button icon="el-icon-lock"></el-button>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-card>
              <template>
                <p>请选择登录身份</p>
                <el-radio v-model="role" label="user">用户</el-radio>
                <el-radio v-model="role" label="hotel">商家</el-radio>
                <el-radio v-model="role" label="administrator">管理员</el-radio>
              </template>
            </el-card>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm()" style="width: 140px"
              >登录</el-button
            >
            <el-button type="primary" @click="goRegister()" style="width: 140px"
              >注册</el-button
            >
          </el-form-item>
          <el-button
            type="text"
            @click="forgetPassword()"
            style="width: 70px; text-align: left"
            >忘记密码</el-button
          >
          <el-button
            type="text"
            @click="mailVisible = true"
            style="width: 128px"
            >验证码登录</el-button
          >
          <el-button
            type="text"
            @click="hotelRegister()"
            style="width: 70px; text-align: right"
            >商家入驻</el-button
          >
        </el-form>
      </div>
    </div>
    <el-dialog title="验证码登录" :visible="mailVisible" width="640px">
      <el-form ref="login" label-width="80px" class="ms-content">
        <el-form-item label="邮箱/手机">
          <el-input style="width: 340px" v-model="param.userid"> </el-input>
          <el-button
            type="primary"
            style="float: right"
            @click="sendVerifyCodeLogin"
            >发送验证码</el-button
          >
        </el-form-item>
        <el-form-item label="验证方式">
          <el-radio v-model="loginType" label="1">手机号验证</el-radio>
          <el-radio v-model="loginType" label="2">邮箱验证</el-radio>
        </el-form-item>
        <el-form-item label="验证码">
          <el-input style="width: 340px" v-model="verifycode"> </el-input>
        </el-form-item>
      </el-form>
      <div style="margin-left: 230px">
        <el-button type="primary" @click="mailLogin">登录</el-button>
        <el-button @click="mailVisible = false">关闭</el-button>
      </div>
    </el-dialog>

    <el-dialog title="找回密码" :visible="forgetVisible" width="780px">
      <el-form ref="login" label-width="90px" class="ms-content">
        <el-form-item label="邮箱/手机号">
          <el-input style="width: 450px" v-model="param.userid"> </el-input>
          <el-button
            type="primary"
            style="float: right"
            @click="sendVerifyCodeFind"
            >发送验证码</el-button
          >
        </el-form-item>

        <el-form-item label="验证方式">
          <el-radio v-model="loginType" label="1">手机号验证</el-radio>
          <el-radio v-model="loginType" label="2">邮箱验证</el-radio>
        </el-form-item>

        <el-form-item label="验证码">
          <el-input style="width: 450px" v-model="verifycode"> </el-input>
        </el-form-item>

        <el-form-item label="新密码">
          <el-input style="width: 450px" v-model="param.password"> </el-input>
        </el-form-item>

        <el-form-item label="确认新密码">
          <el-input style="width: 450px" v-model="param.checkPassword">
          </el-input>
        </el-form-item>
      </el-form>
      <div style="margin-left: 260px">
        <el-button type="primary" @click="resetPassword">重置密码</el-button>
        <el-button @click="forgetVisible = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      loginType: "1",
      verifycode: "",
      forgetVisible: false,
      mailVisible: false,
      role: "user",
      userinfo: [],
      adminList: {},
      hotelList: {},
      imgList: [],
      coverImgUrl: require("../assets/img/login-bg.jpg"),
      param: {
        password: "000001",
        userid: "0000000001",
        checkPassword: "",
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入注册邮箱/手机号",
            trigger: "blur",
          },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    hotelRegister() {
      this.$router.push("/hotelRegister");
    },
    submitForm() {
      // eslint-disable-next-line no-unused-vars
      //get api/OAuth/token?role=user&id=userid&password=password
      //response: 204 重新检查 200 返回了token
      //user administrator hotel
      // eslint-disable-next-line no-unused-vars
      // eslint-disable-next-line no-unused-vars
      let check = false;
      let t =
        "role=" +
        this.role +
        "&id=" +
        this.param.userid +
        "&password=" +
        this.param.password +
        "&type=logbypwd";
      axios
        .get("http://49.234.18.247:8080/api/OAuth/token?" + t)
        .then((response) => {
          if (response.status == "204") {
            check = false;
            alert("用户id或密码输入有误");
            return;
          } else {
            localStorage.setItem("token", response.data);
            localStorage.setItem("ms_username", this.param.userid);
            check = true;
            this.$message.success("登录成功");
            this.Login();
          }
        });
    },
    Login() {
      if (this.role == "user") {
        localStorage.setItem("usertype", 0);
        this.$router.push("/homepage");
      } else if (this.role == "hotel") {
        this.$router.push("/SellerHome");
      } else {
        this.$router.push("/personalpage");
      }
    },
    sendVerifyCodeFind() {
      if (this.loginType == "1") {
        axios.post(
          "http://49.234.18.247:8080/api/Email/" +
            this.param.userid +
            "&findpwd"
        );
      } else {
        axios.post(
          "http://49.234.18.247:8080/api/CellphoneCode/86" +
            this.param.userid +
            "&findpwd"
        );
      }
    },
    sendVerifyCodeLogin() {
      if (this.loginType == "2") {
        axios.post(
          "http://49.234.18.247:8080/api/Email/" + this.param.userid + "&login"
        );
      } else {
        axios.post(
          "http://49.234.18.247:8080/api/CellphoneCode/86" +
            this.param.userid +
            "&login"
        );
      }
    },
    goRegister() {
      this.$router.push("/Register");
    },
    forgetPassword() {
      this.forgetVisible = true;
    },
    mailLogin() {
      this.mailVisible = true;
      let t =
        "role=user" +
        "&id=" +
        this.param.userid +
        "&password=" +
        this.verifycode +
        "&type=logbyvericode";
      axios
        .get("http://49.234.18.247:8080/api/OAuth/token?" + t)
        .then((response) => {
          if (response.status == "204") {
            alert("用户id或验证码输入有误");
            return;
          } else {
            localStorage.setItem("token", response.data);
            localStorage.setItem("ms_username", this.param.userid);
            this.$message.success("登录成功");
            this.Login();
          }
        });
    },
    Tmap() {
      window.addEventListener(
        "message",
        function (event) {
          let loc = event.data;
          // console.log(loc.city); // 显示你当前位置
        },
        false
      );
    },
    resetPassword() {
      if (this.param.password != this.param.checkPassword) {
        this.$message.error("两次输入的密码不一致");
        return;
      }
      axios.patch(
        "http://49.234.18.247:8080/api/Users/" +
          this.param.userid +
          "&" +
          this.verifycode +
          "&" +
          this.param.password
      );
    },
  },
  created() {},
  mounted() {
    this.Tmap();
  },
};
</script>

<style scoped>
.login-wrap {
  position: absolute;
  width: 100%;
  height: 100%;
}
.ms-title {
  width: 100%;
  margin-top: 15px;
  text-align: center;
  font-size: 24px;
  color: #2d8cf0;
  border-bottom: 1px solid #ddd;
}
.main {
  height: 100%;
  width: 350px;
  display: flex;
  align-items: center;
}
.ms-login {
  width: 350px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.5);
  overflow: hidden;
}
.ms-content {
  padding: 20px 30px 30px 30px;
}
.login-btn {
  width: 100px;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #1f2d3d;
}
</style>
