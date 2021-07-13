<template>
  <div class="dashboard-container">
    <p>{{testInfo}}</p>
    <div class="title"><h1>注册</h1></div><br>
    <el-form ref="form" :model="form" label-width="400px" >
      <el-form-item label="User Name">
        <el-input style="width: 550px" v-model="form.name"  />
      </el-form-item>
      <el-form-item label="User ID">
        <el-input style="width: 550px" v-model="form.ID"  />
      </el-form-item>
      <el-form-item label="password">
        <el-input style="width: 550px" v-model="form.password" />
      </el-form-item>
      <el-form-item label="phone number">
        <el-input style="width: 550px" v-model="form.phoneNumber" />
      </el-form-item>
      <el-form-item label="e-mail">
        <el-input style="width: 550px" v-model="form.mail" />
      </el-form-item>
      <el-form-item >
         <div style="text-align: center"  class="divwrap" v-if="show">
          <v-distpicker type="mobile" @province="onChangeProvince1" @city="onChangeCity"
                        @area="onChangeArea"></v-distpicker >
         </div>
      </el-form-item>

      <el-form-item label="Gender">
        <el-radio-group v-model="form.gender">
          <el-radio label="Male" />
          <el-radio label="Female" />
        </el-radio-group>
      </el-form-item>
      <v-distpicker></v-distpicker>
      <el-form-item label="Motto">
        <el-input style="width: 550px"  v-model="form.desc" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import VDistpicker from 'v-distpicker'
import axios from "axios";
export default {
  name: 'Register',
  computed: {

  },
  components: {VDistpicker},
  data() {
    return {
      form: {
        name: 'aaaaaa',
        password: 'aaaaaa',
        ID:"11111",
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        gender: '',
        desc: '',
        phoneNumber:" ",
        mail:"",
        dState: true,
      }
      ,
      testInfo:'AAAAAA',
      //省市区
      province: '',
      city: '',
      area: '',
      show: false
    }
  },
  methods:{
    onSubmit() {

      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      }),
          this.$router.push("/Login")
    },
    onEdit() {
      this.form.dState = false
    },

    //打开选择地区
    choose: function () {
      this.show = true;
    },

    onChangeProvince1: function (a) {
      this.province = a.value;
      if (a.value == '台湾省') {
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
    }

  },
  mounted: function () {
    axios
        .get('http://49.234.18.247:8080/api/Users/1234567890')
        .then(response => (this.testInfo = response.data[0].gender))
  }
}
</script>

<style scoped>
.dashboard-container
{
  margin:100px;

}
.title
{
  text-align: center;
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
