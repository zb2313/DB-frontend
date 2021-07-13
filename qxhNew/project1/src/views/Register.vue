<template>
  <div class="bgc">
    <div class="dashboard-container">
      <div class="title"><h1>注册</h1></div>
      <br />
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="用户名">
          <el-input style="width: 320px" v-model="form.name" />
        </el-form-item>

        <el-form-item label="密码">
          <el-input style="width: 320px" v-model="form.password" />
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input style="width: 320px" v-model="form.ID" />
        </el-form-item>
        <el-form-item label="手机">
          <el-input style="width: 320px" v-model="form.phoneNumber" />
        </el-form-item>
        <el-form-item label="E-mail">
          <el-input style="width: 320px" v-model="form.mail" />
        </el-form-item>
        <el-form-item>
          <div style="text-align: center" class="divwrap" v-if="show">
            <v-distpicker
              type="mobile"
              @province="onChangeProvince1"
              @city="onChangeCity"
              @area="onChangeArea"
            ></v-distpicker>
          </div>
        </el-form-item>

        <el-form-item label="性别">
          <el-radio-group v-model="form.gender">
            <el-radio label="Male" />
            <el-radio label="Female" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="地点">
          <v-distpicker></v-distpicker>
        </el-form-item>
        <div style="text-align: center; margin-top: 40px">
          <el-button type="primary" @click="onSubmit">注册</el-button>
          <el-button @click="onCancel">取消</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import VDistpicker from "v-distpicker";

import axios from "axios";
export default {
  name: "Register",
  computed: {},
  components: { VDistpicker },
  data() {
    return {
      form: {
        name: "aaaaaa",
        password: "aaaaaa",
        ID: "11111",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        gender: "",
        desc: "",
        phoneNumber: " ",
        mail: "",
        dState: true,
      },
      testInfo: "AAAAAA",
      //省市区
      province: "",
      city: "",
      area: "",
      show: false,
    };
  },
  methods: {
    onSubmit() {
      this.$message("submit!");
    },
    onCancel() {
      this.$message({
        message: "cancel!",
        type: "warning",
      }),
        this.$router.push("/Login");
    },
    onEdit() {
      this.form.dState = false;
    },

    //打开选择地区
    choose: function () {
      this.show = true;
    },

    onChangeProvince1: function (a) {
      this.province = a.value;
      if (a.value == "台湾省") {
        this.show = false;
      }
    },
    onChangeCity: function (a) {
      this.city = a.value;
    },
    onChangeArea: function (a) {
      this.area = a.value;
      this.show = false;
      this.city = this.province + this.city + this.area;
    },
  },
  mounted: function () {
    axios
      .get("http://49.234.18.247:8080/api/Users/1234567890")
      .then((response) => (this.testInfo = response.data[0].gender));
  },
};
</script>

<style scoped>
h1 {
  margin: 0;
  padding: 0;
}
.bgc:before {
  content: "";
  display: table;
}
.bgc {
  background: no-repeat center/100%
    url(https://ids.tongji.edu.cn:8443/nidp/img/background.jpg);
}
.dashboard-container {
  width: 37%;
  height: 600px;
  margin: 20px auto;
  background-color: rgba(99, 126, 147, 0.58);
  border-radius: 20px;
}
.title {
  text-align: center;
  color: white;
}
.el-form /deep/ .el-form-item__label {
  color: white;
}
.el-form /deep/ .el-radio__label {
  color: white;
}
/*省市区三级联动*/
.divwrap {
  height: 50%;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 99;
}

/*外部*/
.divwrap > .distpicker-address-wrapper {
  color: #0d0d0d;
  height: 100%;
}

/*头部*/
.divwrap >>> .address-header {
  background: #000;
  color: #fff;
  width: 100%;
  position: fixed;
  bottom: 50%;
  height: 0.5rem;
  font-size: 0.2rem;
}

/*头部内容*/
.divwrap >>> .address-header ul li {
  flex-grow: 1;
  text-align: center;
}

/*选择过省市区的头部*/
.divwrap >>> .address-header .active {
  color: #fff;
  border-bottom: 0.05rem solid #666;
}

/*内容部分*/
.divwrap >>> .address-container {
  overflow: scroll;
  height: 100%;
}

/*点过的地区内容*/
.divwrap >>> .address-container .active {
  color: red;
}
</style>
