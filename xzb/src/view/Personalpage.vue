<template>
<div>
<admiHeader/>
<div class="page" id="form">
 <el-tabs type="border-card" id="page">
  <el-tab-pane>
    <span slot="label"><i class="el-icon-user"></i> 基础信息</span>
   <div id="admi">管理员ID：<br>{{AdministratorID}}<br><br>
   管理员密码：<br>{{password}}</div>
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
.el-container{
  position:relative;
  top:15px;
  left:15px;
}
#page{
  margin-top: 10px;
  height: 320px;
}
#form{
  width:60%;
}
#input{
  width:60%;
}
#admi{
  font-family: "Arial","宋体",serif;
  font-size: 20px;
}
</style>
<script>
import admiHeader from "../components/admiHeader.vue";
import axios from 'axios'
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
    {var that=this;
          axios.get("http://49.234.18.247:8080/api/Administrator")
        .then(res=>{
            that.AdministratorID=res.data[0].administratoR_ID;
            that.password=res.data[0].password;
          that.editpassword=that.password;
                })
    },
    methods: {
     submit()
     {
     if(this.editpassword.length!=0)
     {axios.put("http://49.234.18.247:8080/api/Administrator/"+this.AdministratorID,
          {
           "administratoR_ID":this.editAdministratorID,
            "password":''+this.editpassword,
          })
        this.$message({
            type: 'success',
            message: '修改成功!'
          });
         this.password=this.editpassword;
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
