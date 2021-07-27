<template>
<div>
<admiHeader/>
<div class="page" id="form">
 <el-tabs type="border-card" id="page">
  <el-tab-pane>
    <span slot="label"><i class="el-icon-user"></i> 基础信息</span>
   <el-form>
<el-form-item>
  <div id="input">管理员ID：
<el-input v-model="AdministratorID" :disabled="true"></el-input>
  </div>
  </el-form-item>
 <el-form-item>
  <div id="input">管理员密码：
<el-input v-model="password" :disabled="true"></el-input>
  </div>
  </el-form-item>
 </el-form>
       </el-tab-pane>
  <el-tab-pane>
    <span slot="label"><i class="el-icon-edit"></i>修改信息</span>
 <el-form>
<el-form-item>
  <div id="input">管理员ID：
<el-input v-model="AdministratorID" :disabled="true"></el-input>
  </div>
  </el-form-item>
 <el-form-item>
  <div id="input">请输入密码：
<el-input maxlength="20" show-word-limit v-model="editpassword"></el-input>
  </div>
  </el-form-item>
<el-form-item>
  <el-button type="primary" @click="submit()">提交</el-button>
</el-form-item>
 </el-form>
</el-tab-pane>
</el-tabs>
</div>
</div>
</template>
<style>
#page{
  position: relative;
  left: 20%;
  width: 60%;
  margin-top: 10px;
  height: 320px;
}
#form{
  width:60%;
}
#input{
  width:60%;
}
</style>
<script>
import admiHeader from "../components/admiHeader.vue";
import axios from 'axios';
export default {
   components: { admiHeader },
    data() {
      return {
       AdministratorID:"loading",
       password:"loading",
       editpassword:""
      };
    },
    created()
    {
      let that=this;
          this.AdministratorID=localStorage.getItem("ms_username")
          that.password=localStorage.getItem("password");
          that.editpassword=that.password;
    },
    methods: {
     submit()
     {
     if(this.editpassword.length!=0)
     {axios.put("http://49.234.18.247:8080/api/Administrator/"+this.AdministratorID,
          {
           "administratoR_ID":this.AdministratorID,
            "password":''+this.editpassword,
          })
     .then(()=>
     {
       localStorage.setItem("password",this.editpassword);
       this.$message({
         type: 'success',
         message: '修改成功!'
       });
       this.password=this.editpassword;
     })
     .catch(()=>
     {
       this.$message({
         type: 'error',
         message: '网络错误!'
       });
     });

     }
     else{
       this.$message({
            type: 'warning',
            message: '密码不能为空！'
          });
     }
     }
    }
  }
</script>
