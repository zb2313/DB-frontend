<template>
  <el-container direction="vertical">
    <Header />
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      style="width: 900px"
    >
      <el-form-item label="收件人邮箱" prop="mailid">
        <el-input v-model="ruleForm.mailid"></el-input>
      </el-form-item>

      <el-form-item label="发送时间" required>
        <el-col :span="11">
          <el-form-item prop="date1">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="ruleForm.date1"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item prop="date2">
            <el-time-picker
              placeholder="选择时间"
              v-model="ruleForm.date2"
              style="width: 100%"
            ></el-time-picker>
          </el-form-item>
        </el-col>
      </el-form-item>

      <el-form-item label="通知类型" prop="type">
        <el-radio-group v-model="ruleForm.type">
          <el-radio label="投诉反馈"></el-radio>
          <el-radio label="系统通知"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="通知信息" prop="info">
        <el-input type="textarea" rows="10" v-model="ruleForm.info"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >发送</el-button
        >
        <el-button @click="resetForm('ruleForm')">清空</el-button>
      </el-form-item>
    </el-form>
  </el-container>
</template>

<style>
</style>

<script>
import Header from "@/components/Header.vue";
export default {
  components: {
    Header,
  },
  data() {
    return {
      ruleForm: {
        mailid: "",
        date1: "",
        date2: "",
        type: "",
        info: "",
      },
      rules: {
        mailid: [
          { required: true, message: "请输入收件人邮箱", trigger: "blur" },
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change",
          },
        ],
        type: [
          { required: true, message: "请选择通知类型", trigger: "change" },
        ],
        info: [{ required: true, message: "请填写通知内容", trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

