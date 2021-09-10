<template>
  <div class="bgc">
    <div class="dashboard-container">
      <div class="title"><h1>商家信息修改</h1></div>
      <br />
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="商家名称">
          <el-input style="width: 380px" v-model="form.hotelName" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" style="width: 380px" v-model="form.hotelPassword" />
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input type="password" style="width: 380px" v-model="form.checkPassword" />
        </el-form-item>

        <el-form-item label="电话号码">
          <el-input style="width: 380px" v-model="form.teleNUMBER" />
        </el-form-item>

        <el-form-item label="描述" >
          <el-input style="width: 380px" v-model="form.descripTion"></el-input>
        </el-form-item>

        <el-form-item label="开业时间">
          <div class="block">
            <el-date-picker
                v-model="value1"
                type="date"
                placeholder="选择日期">
            </el-date-picker>
          </div>
        </el-form-item>

        <el-form-item label="最低价">
          <el-input-number v-model="form.num" :step="1"></el-input-number>
        </el-form-item>
        <div style="text-align: center; margin-top: 40px">
          <el-button type="primary" @click="onSubmit">保存</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import VDistpicker from "v-distpicker";
import axios from "axios";
//email 后加发送验证码按钮和输入框
//
export default {
  name: "Register",
  userList:{},
  computed: {},
  //用户id在注册完后生成
  data() {
    return {
      value1:"",
      hotelinfo:{},
      form: {
        num:0,
        mail:"",
        hotelName:"",
        hotelPassword: "",//密码
        checkPassword:"",

        teleNUMBER: "",//电话号码
        descripTion:"",
        openTime:"",
        labeL:""

      },
      testInfo: "",
      //省市区
      province: "aaaaa",
      city: "",
      area: "",
      location:"",
      show: false,
      mailVerifyStatus:false,
      phoneVerifyStatus:false,
      registerType:'1'
    };
  },
  methods: {
    onSubmit()
    {
      axios.put("http://49.234.18.247:8080/api/Hotel/"+localStorage.getItem("ms_username"),
          {
            "hoteL_ID": localStorage.getItem("ms_username"),
            "hoteL_NAME": this.form.hotelName,
            "hlocation": this.hotelinfo.hlocation,
            "picture": this.hotelinfo.picture,
            "star": this.hotelinfo.star,
            "lowesT_PRICE": this.hotelinfo.lowesT_PRICE,
            "hpassword": this.form.hotelPassword,
            "label": this.hotelinfo.label,
            "opeN_TIME": this.hotelinfo.opeN_TIME,
            "totaL_NUM": this.hotelinfo.totaL_NUM,
            "telephone": this.form.teleNUMBER,
            "description": this.form.descripTion,
            "iS_CHECK": this.hotelinfo.iS_CHECK
          })
      this.$message.success("修改成功");
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
    },
  },
  mounted: function () {
  },
  created() {
    axios.get("http://49.234.18.247:8080/api/Hotel/"+localStorage.getItem("ms_username"))
    .then(
        (response)=>
        {
          this.hotelinfo=response.data[0];
          this.form.hotelName=this.hotelinfo.hoteL_NAME;
          this.form.hotelPassword=this.hotelinfo.hpassword;
          this.form.teleNUMBER=this.hotelinfo.telephone;
          this.form.descripTion=this.hotelinfo.description;
          this.form.num=this.hotelinfo.lowesT_PRICE;
        }
    )
  }
};
</script>

<style scoped>
h1 {
  margin: 0;
  padding: 0;
}
.bgc {
  background: url("../assets/img/login-bg.jpg") no-repeat;
  background-position: center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
}
.dashboard-container {
  width: 550px;
  height: 650px;
  margin-left:300px;
  margin-bottom: 30px;

  background-color: rgba(99, 126, 147, 0.58);
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

