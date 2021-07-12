<template>
<div class="page">
    <el-container>
        <router-link to="/updateQA">
        <i class="el-icon-back"></i>
        </router-link>
    
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm"   label-width="100px" class="demo-ruleForm" style="width:800px">
  <el-form-item label="问题" prop="question" label-width="100px">
    <el-input v-model="ruleForm.question"></el-input>
  </el-form-item>
 
  <el-form-item label="解答"  prop="answer" label-width="100px">
    <el-input type="textarea" v-model="ruleForm.answer"></el-input>
  </el-form-item>
  <el-form-item label-width="150px">
    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
  </el-form-item>
</el-form>

    </el-container>
    </div>
</template>
<script>
 export default {
    data() {
      return {
        ruleForm: {
          question: '',
          answer: ''
        },
        rules: {
          question: [
            { required: true, message: '请输入问题', trigger: 'blur' },
          ],
          answer: [
            { required: true, message: '请填写回答', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }
</script>
<style>
.el-container{
    position:relative;
    top:30px;
    left:30px;
}
</style>