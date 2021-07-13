<template>
  <div class="login-wrap">
    <div align="center">
      <img src="../assets/img/lvdao.png" height="300" width="300">
    </div>
    <div class="ms-login">
      <div class="ms-title">旅游信息系统</div>
      <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
        <el-form-item prop="username">
          <el-input v-model="param.username" placeholder="username">
            <template #prepend>
              <el-button icon="el-icon-user"></el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="password" v-model="param.password">
            <template #prepend>
              <el-button icon="el-icon-lock"></el-button>
            </template>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm()">登录</el-button><br>
          <el-button type="primary" @click="goRegister()">注册</el-button><br>
          <el-button  @click="onTest()">忘记密码</el-button>
        </div>
        <p class="login-tips">Tips : 用户名和密码随便填。</p>
      </el-form>
    </div>
  </div>
</template>

<script>
// import { ref, reactive } from "vue";
// import { useStore } from "vuex";
// import { useRouter } from "vue-router";
//import { ElMessage } from "element-plus";

export default {
  data()
  {
    return{
      param:
      {
        password: "123123",
        username:"admin"
      },
      rules:{
        username: [
            {
              required: true,
              message: "请输入用户名",
              trigger: "blur",
            },
          ],
          password: [
            { required: true, message: "请输入密码", trigger: "blur" },
          ]
      }
    }
  },
  methods:
      {
        submitForm()
        {
               localStorage.setItem("ms_username", this.param.username);
               this.$router.push("/");
               this.$message.success("登录成功");
        },
        goRegister()
        {
          this.$router.push("/Register");
        },
        onTest()
        {
          this.$router.push("/table");
        }
      },

};
</script>

<style scoped>
.login-wrap {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url("../assets/img/login-bg.jpg");
  background-size: 100%;
}
.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #2d8cf0;
  border-bottom: 1px solid #ddd;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 60%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
}
.ms-content {
  padding: 30px 30px;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #fff;
}
</style>
