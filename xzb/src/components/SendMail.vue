<template>
  <div>
    <admiHeader />
    <div class="page">
      <el-card>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm"   label-width="100px" class="demo-ruleForm" style="width:900px">
          <el-form-item label="用户ID" prop="mailboxID">
            <el-input maxlength="10" v-model="ruleForm.mailboxID" show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="通知类型" prop="type">
            <el-radio-group v-model="ruleForm.type">
              <el-radio label="投诉反馈"></el-radio>
              <el-radio label="系统通知"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="通知信息"  prop="message">
            <el-input type="textarea" rows="10" v-model="ruleForm.message"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-s-promotion" @click="submitForm('ruleForm');resetForm('ruleForm')">发送</el-button>
            <el-button @click="resetForm('ruleForm')">清空</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>
<script>
import admiHeader from "./admiHeader.vue";
import axios from 'axios';
 export default {
   components: { admiHeader },
    data() {
      return {
        ruleForm: {
          mailboxID: '',
          type: '',
          message: ''
        },
        rules: {
          mailboxID: [
            { required: true, message: '请输入收件人邮箱', trigger: 'blur' },
          ],
          type: [
            { required: true, message: '请选择通知类型', trigger: 'change' }
          ],
          message: [
            { required: true, message: '请填写通知内容', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let nowDate = year + "-" + month + "-" + day;
              let mail_id=Math.floor(Math.random()*10000000000);
              let  administratoR_ID=localStorage.getItem("ms_username");
              let mailboX_ID=this.ruleForm.mailboxID;
              let message=this.ruleForm.type+":"+this.ruleForm.message;
            axios.post("http://49.234.18.247:8080/api/SendMessage",
            {
               "administratoR_ID":administratoR_ID,
               "mailboX_ID":mailboX_ID,
               "senD_TIME":nowDate,
              "maiL_ID":''+ mail_id
            });
              axios.post("http://49.234.18.247:8080/api/mail",
            {"maiL_ID":''+ mail_id,
               "message": message
            });
           this.$message({
            type: 'success',
            message: '发送成功'
          });
          } else {
            alert('输入错误!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
<style scoped>
.page{
  position:absolute;
  top: 200px;
  left:300px;
}
</style>

