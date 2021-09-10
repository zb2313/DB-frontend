<template>
  <div>
    <admiHeader />
    <img src="../assets/img/mail.jpg" width="100%" height="100%" style="z-index:-100;position:absolute;left:0;top:0"> 
    <div class="page">
      <el-card>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm"   label-width="100px" class="demo-ruleForm" style="width:900px">
          <el-form-item label="收件人" prop="mailboxID">
             <el-select v-model="ruleForm.mailboxID" filterable placeholder="请选择收件人">
              <el-option
              v-for="item in users"
              :key="item.useR_ID"
               :label="item.useR_NAME"
               :value="item.mailboX_ID">
              </el-option>
           </el-select>
          </el-form-item>
          <el-form-item label="收件人信箱" prop="mailboxID">
            <el-select v-model="ruleForm.mailboxID" filterable placeholder="请选择收件人信箱">
              <el-option
              v-for="item in users"
              :key="item.useR_ID"
               :label="item.mailboX_ID"
               :value="item.mailboX_ID">
              </el-option>
           </el-select>
          </el-form-item>
          <el-form-item label="通知类型" prop="type">
            <el-radio-group v-model="ruleForm.type">
              <el-radio label="投诉反馈"></el-radio>
              <el-radio label="系统通知"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="通知内容"  prop="message">
            <el-input type="textarea" rows="10" v-model="ruleForm.message"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="medium" icon="el-icon-s-promotion" @click="submitForm('ruleForm');resetForm('ruleForm')">发送</el-button>
            <el-button size="medium" icon="el-icon-refresh" @click="resetForm('ruleForm')">清空</el-button>
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
        MailList:[],
        users:[],
        ruleForm: {
          mailboxID: '',
          type: '',
          message: ''
        },
        rules: {
          mailboxID: [
            { required: true, message: '请输入收件人信箱', trigger: 'blur' },
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
    created()
    {
          axios.get("http://49.234.18.247:8080/api/Users")
          .then(res=>
          {
            this.users=res.data;
          })
    },
    methods: {
      createID()
      {do{
      let chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
      var ID='';
      for(let i=0;i<10;i++)
      {
        let id = Math.ceil(Math.random()*35);
        ID+=chars[id];
      }
      var rep=false;
      axios.get("http://49.234.18.247:8080/api/Mail")
        .then(res=>{
            this.MailList=res.data;
                });
      for(let j=0;j<this.MailList.length;j++)
      if(ID===this.MailList[j].maiL_ID)
      rep=true;
      }while(rep===true)
      return ID;
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        month=month<10?('0'+month):month
        let day = date.getDate();
        day=day<10?('0'+day):day;
        let nowDate = year + "-" + month + "-" + day;
      let mail_id=this.createID();
              let mailboX_ID=''+this.ruleForm.mailboxID;
              let message=this.ruleForm.type+":"+this.ruleForm.message;
              axios.post("http://49.234.18.247:8080/api/mail",
            {"maiL_ID":mail_id,
               "message": message
            })
              .then(()=>
              {
                axios.post("http://49.234.18.247:8080/api/SendMessage",
                    {
                      "administratoR_ID":localStorage.getItem("ms_username"),
                      "mailboX_ID":mailboX_ID,
                      "senD_TIME":nowDate,
                      "maiL_ID": mail_id
                    })
                .then(()=>
                {
                  this.$message({
                    type: 'success',
                    message: '发送成功'
                  });
                })
                .catch(()=>
                {
                  this.$message({
                    type: 'error',
                    message: '发送失败!'
                  });
                });
              })
              .catch(()=>
              {
                this.$message({
                  type: 'error',
                  message: '网络错误!'
                });
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

