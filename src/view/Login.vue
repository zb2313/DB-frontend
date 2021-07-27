<template>

  <div class="login-wrap">
    <iframe id="geoPage" width=0 height=0 frameborder=0 style="display:none;" scrolling="no"
            src="https://apis.map.qq.com/tools/geolocation?key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=myapp">

    </iframe>
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
        <el-form-item prop="password">
          <el-card>
          <template>
            <p>请选择登录身份</p>
            <el-radio v-model="role" label="1">用户</el-radio>
            <el-radio v-model="role" label="2">商家</el-radio>
            <el-radio v-model="role" label="3">管理员</el-radio>
          </template>
          </el-card>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()" style="width: 140px">登录</el-button>
          <el-button type="primary" @click="goRegister()" style="width: 140px">注册</el-button>
        </el-form-item>
        <el-button type="text" @click="forgetPassword()" style="width: 140px">忘记密码</el-button>
        <el-button type="text" @click="mailLogin()" style="width: 140px">邮箱验证码登录</el-button>
      </el-form>
    </div>
    <el-dialog
        title="验证码登录"
      :visible="mailVisible"
    >
    <el-button @click="mailVisible=false">关闭</el-button>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios"

export default {
  data()
  {
    return{
      mailVisible:false,
      role:1,
      userList:{},
      adminList:{},
      hotelList:{},
      param:
      {
        password: "000001",
        username:"0000000001"
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
          // eslint-disable-next-line no-unused-vars
          let check=false;
          let admin=false;
          let seller=false;
          let u1=this.param.username;
          let u10=this.param.password;
          for(let i=0;i<this.userList.length;i++)
          {
            let u2=this.userList[i].useR_ID;
            let u3=this.param.password;
            let u4=this.userList[i].upassword


            if((u1==u2)&& (u3==u4))
            {
              localStorage.setItem("ms_username", this.param.username);
              localStorage.setItem("pictrue",this.userList[i].uprofile)
              localStorage.setItem("usertype",0);
              localStorage.setItem('mailbox_id',this.userList[i].mailboX_ID);
              check=true;
              break;
            }
          }
          for(let i=0;i<this.hotelList.length;i++)
          {
            let u3=this.param.password;
            let u5=this.hotelList[i].hoteL_ID;
            let u6=this.hotelList[i].hpassword;
            if((u1==u5)&&(u3==u6))
            {
              localStorage.setItem("ms_username", this.param.username);
              localStorage.setItem("usertype",2);
              localStorage.setItem("password",this.param.password);
              seller=true;
              break;
            }
          }
          for(let i=0;i<this.adminList.length;i++)
          {
            let u3=this.param.password;
            let u7=this.adminList[i].administratoR_ID;
            let u8=this.adminList[i].password;
            if((u1==u7)&&(u3==u8))
            {
              localStorage.setItem("ms_username", this.param.username);
              localStorage.setItem("usertype",1);
              admin=true;
              break;
            }
          }
          if(check==true)
          {
            this.$router.push("/hotel");
            this.$message.success("登录成功");
          }
          if(admin==true)
          {
            this.$router.push("/personalpage");
            this.$message.success("管理员登录成功");
          }
          if(seller==true)
          {
            this.$router.push("/SellerHome");
            this.$message.success("商家登录成功");
          }
          if(check==true||admin==true||seller==true)
          {
            // eslint-disable-next-line no-unused-vars
            let t="username="+u1+"&"+"password="+u10;
            // eslint-disable-next-line no-unused-vars
            axios.get("http://49.234.18.247:8080/api/OAuth/token?username=admin&password=12345678")
            .then((response)=>
            {
              localStorage.setItem("token",response.data);
              console.log("token",localStorage.getItem("token"));
            })
            return;
          }
           this.$message.error("用户名或密码不存在");
        },
        goRegister()
        {
          this.$router.push("/Register");
        },
        forgetPassword()
        {

        },
        mailLogin()
        {
          this.mailVisible=true;
        },
        Tmap()
        {
          window.addEventListener('message', function(event) {

            let loc = event.data;
            console.log(loc.city)  // 显示你当前位置
          }, false);

        }
      },
  created() {
    axios.get("http://49.234.18.247:8080/api/Users")
        .then((response)=>{
          this.userList=response.data;
              axios.get("http://49.234.18.247:8080/api/Administrator")
                  .then((respopnse)=>
                  {
                    this.adminList=respopnse.data;
                    axios.get("http://49.234.18.247:8080/api/Hotel")
                        .then((response)=>
                        {
                          this.hotelList=response.data;
                        })
                  })
        }
        );

  },
  mounted(){
    this.Tmap();
  }

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
