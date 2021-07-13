<template>
  <div class="order">
    <Header activeIndex="3" />
    <div class="fill">
      <el-card class="box-card">
        <div class="passenger_info">乘机人信息</div>
        <el-divider></el-divider>
        <div class="passenger_input">
          <div class="passenger_input_item">
            <div class="item_header">姓名</div>
            <el-input
              v-model="user_id"
              placeholder="请与证件姓名保持一致"
            ></el-input>
          </div>

          <div class="passenger_input_item">
            <div class="item_header">身份证号</div>
            <el-input
              v-model="id_number"
              placeholder="请输入身份证号"
            ></el-input>
          </div>

          <div class="passenger_input_item">
            <div class="item_header">手机号</div>
            <el-input
              v-model="tele_number"
              placeholder="乘机人手机号码，用于接收短信"
            ></el-input>
          </div>
        </div>
        <el-button type="primary" @click="book">预定</el-button>
      </el-card>
    </div>

    <div class="flight_info">
      <el-card class="box-card">
        <div class="flight_info_header">
          {{ company_name }}&nbsp;{{ vehicle_id }}
        </div>
        <div class="time_place">
          <div class="time">
            {{ start_time }}
            <br />
            <div style="font-size: 14px">{{ from }}</div>
          </div>
        </div>
        <div class="time_place"><br />---------</div>
        <div class="time_place">
          <div class="time">
            {{ end_time }}
            <br />
            <div style="font-size: 14px">{{ to }}</div>
          </div>
        </div>
        <div class="divide"></div>
        <div class="price">￥{{ price }}</div>
      </el-card>
    </div>
  </div>
</template>

<style>
.el-button {
  margin-left: 290px;
}
.passenger_info {
  font-size: 20px;
  text-align: left;
  margin-top: 20px;
  margin-bottom: 20px;
}
.passenger_input {
  margin-left: 30px;
  text-align: left;
}
.item_header {
  font-size: 18px;
  float: left;
  width: 80px;
  margin-bottom: 10px;
}
.el-input__inner {
  width: 500px;
}
.passenger_input_item {
  margin-top: 10px;
  margin-bottom: 20px;
}
.fill {
  width: 700px;
  height: 450px;
  margin-left: 80px;
  float: left;
  /* background:#ff0000; */
}
.flight_info {
  width: 400px;
  position: fixed;
  left: 800px;
  top: 150px;
  height: 300px;
  /* background: #000000; */
}
.flight_info_header {
  text-align: left;
  margin-top: 10px;
  margin-bottom: 10px;
}
.time_place {
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 30px;
  margin-right: 30px;
  float: left;
  height: 100%;
  width: 50px;
}
.time {
  font-size: 30px;
  margin-top: 0px;
  margin-bottom: 10px;
  margin-left: 0px;
  float: left;
  height: 100%;
}
.price {
  font-size: 30px;
  color: #042758;
  margin-left: 0px;
  margin-right: 10px;
  margin-top: 10px;
  margin-bottom: 20px;
  float: left;
  text-align: left;
  width: 100%;
}
.divide {
  background: rgb(177, 175, 175);
  height: 1px;
  width: 360px;
  float: left;
}
</style>

<script>
import Header from "@/components/Header.vue";
export default {
  components: {
    Header,
  },
  data() {
    return {
      user_id: "",
      id_number: "",
      tele_number: "",
      from: "北京",
      to: "上海",
      company_name: "东方航空",
      vehicle_id: "MU5099",
      start_time: "7:00",
      end_time: "9:15",
      price: "666",
    };
  },
  methods: {
    book() {
      this.$alert("预定成功{{this.vehicle_id}}", "提示", {
        confirmButtonText: "确定",
        callback: (action) => {
          this.$message({
            type: "info",
            message: `action: ${action}`,
          });
        },
      });
    },
  },
};
</script>