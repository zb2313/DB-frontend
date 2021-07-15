<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 表单
                </el-breadcrumb-item>
                <el-breadcrumb-item>个人信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
          <el-card shadow="hover">
            <template #header>
              <div class="clearfix">
                <span>账户编辑</span>
              </div>
            </template>
            <el-form label-width="90px">
              <el-form-item label="用户名："> {{ userData[0].useR_NAME}} </el-form-item>
              <el-form-item label="密码：">{{userData[0].upassword}}</el-form-item>
              <el-form-item label="手机号">{{userData[0].telE_NUMBER}}</el-form-item>
              <el-form-item label="个性签名：">
                {{userData[0].motto}}
              </el-form-item>
            </el-form>
          </el-card><br>
            <div class="form-box">
                <el-form ref="formRef" :rules="rules" :model="form" label-width="80px">
                    <el-form-item label="用户昵称">
                        <el-input :disabled=editState v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input :disabled=editState v-model="form.password"></el-input>
                    </el-form-item>
                  <el-form-item label="手机号">
                    <el-input :disabled=editState v-model="form.telephone"></el-input>
                  </el-form-item>
                    <el-form-item label="修改时间">
                        <el-col :span="11">
                            <el-form-item prop="date1">
                                <el-date-picker type="date" placeholder="选择日期" v-model="form.date1"
                                    style="width: 100%;"></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col class="line" :span="2">-</el-col>
                        <el-col :span="11">
                            <el-form-item prop="date2">
                                <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;">
                                </el-time-picker>
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                  <el-form-item label="地点">
                    <v-distpicker
                        @province="onChangeProvince" @city="onChangeCity" @area="onChangeArea">
                    </v-distpicker>
                  </el-form-item>

                    <el-form-item label="个性签名" prop="desc">
                        <el-input :disabled="editState" type="textarea" rows="5" v-model="form.desc"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onReset">修改</el-button>
                        <el-button @click="onSubmit">保存</el-button>
                    </el-form-item>
                </el-form>

            </div>

        </div>
    </div>
</template>

<script>
//import { reactive, ref } from "vue";
//import { ElMessage } from "element-plus";
//import axios from "axios";
import axios from "axios";

export default {
    name: "baseform",
    data(){
      return {
        editState:true,
        rules: [
            // name:
            //      { required: true,
            //        message: "请输入表单名称",
            //        trigger: "blur"
            //      },
        ],
        form: {
          name: "",
          password:"",
          region: "",
          telephone: "",
          date1: "",
          date2: "",
          delivery: true,
          type: [" "],
          resource: "",
          desc: "",
          options:[]
        },
        userData:[]
      }
    },
    methods:
        {
          onReset()
          {
            this.editState=false;
          },
          onSubmit()
          {
            let n=localStorage("ms_username");
            // eslint-disable-next-line no-unused-vars
            let userInfo;
            axios.get(
                "http://49.234.18.247:8080/api/Users/"+n
            )
            .then((response)=>{
              userInfo=response.data;
            })
            axios.put(
                "http://49.234.18.247:8080/api/Users/"+n,
                {
                  "useR_ID": n,
                  "useR_NAME": this.form.name,
                  "iD_NUMBER": userInfo.iD_NUMBER,
                  "telE_NUMBER": userInfo.telE_NUMBER,
                  "mailboX_ID": userInfo.mailboX_ID,
                  "uprofile": userInfo.uprofile,
                  "upassword": this.form.password,
                  "gender": userInfo.gender,
                  "ulocation": userInfo.ulocation,
                  "motto": this.form.desc
                }
            )
            this.$message.success("提交成功");
          },
          onChangeProvince(data) {
            this.province= data.value
          },
          onChangeCity(data) {
            this.city= data.value
          },
          onChangeArea(data) {
            this.area= data.value
            this.location=this.province+this.city+this.area;
          }
        },
   created() {
      axios.get("http://49.234.18.247:8080/api/Users/"+localStorage.getItem("ms_username"))
     .then((response)=>{this.userData=response.data});
   },
};
</script>
