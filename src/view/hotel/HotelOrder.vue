<template>
  <el-container direction="vertical">
    <Header activeIndex="1" />

    <!-- 步骤条部分 -->
    <div>
      <el-steps :space="200" :active="1" finish-status="success" simple="true">
        <el-step title="已选酒店"></el-step>
        <el-step title="个人信息"></el-step>
        <el-step title="最后一步"></el-step>
      </el-steps>
    </div>
    <el-container>
      <el-aside width="800px">
        <div class="info">
          <el-card class="box-card1" shadow="never">
            <!-- 酒店名+星级 -->
            <div class="clearfix">
              <div class="hotelName">
                <h2>{{ hotelName }}</h2>
              </div>
              <div class="star">
                <ul>
                  <li
                    class="yellow"
                    v-for="(o, index) in starNum"
                    :key="o"
                    :offset="index > 0 ? 0 : 0"
                  >
                    <i class="el-icon-star-on"></i>
                  </li>
                </ul>
              </div>
            </div>

            <i class="el-icon-location"></i>{{ location }}
            <div class="roomInfo">
              <h4>{{ typeName }}</h4>
              <i class="el-icon-user"></i>{{ cNum }}人入住
              <i class="el-icon-receiving"></i>{{ bedNum }}张床
              <i class="el-icon-dish"></i>{{ dish }}早餐
            </div>
            <el-divider></el-divider>
            <div>
              <h3>订房必读</h3>
              <i class="el-icon-info"></i>该房型允许携带儿童入住。
            </div>
            <el-divider></el-divider>
            <div class="advertise">
              <ul>
                <li>好赞！你挑到了本店最划算的房间</li>
                <li>预订成功后房间将为您整晚保留</li>
              </ul>
            </div>
          </el-card>
          <br />
          <el-card class="box-card1" shadow="never">
            <div form>
              <el-form :inline="true" :model="form_Select">
                <el-form-item>
                  <el-date-picker
                    v-model="form_Select.time"
                    type="daterange"
                    format="yyyy/MM/dd"
                    range-separator="——"
                    start-placeholder="入住时间"
                    end-placeholder="退房时间"
                    :picker-options="pickerOptions"
                  >
                  </el-date-picker>
                </el-form-item>

                <el-form-item>
                  <el-select
                    v-model="form_Select.room_num"
                    @change="cNumChange"
                    placeholder="房间数"
                  >
                    <el-option label="1" value="0000000001"></el-option>
                    <el-option label="2" value="0000000002"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              
              <div>
                <h3>住客资料</h3>
                <i class="el-icon-info"></i>请按实际入住人数填写，姓名与证件保持一致
              </div>
            </div>
          </el-card>
        </div>
      </el-aside>
      <!-- 显示金额订单部分 -->
      <el-main>
        <div class="order-form">
          <el-card class="box-card2" shadow="hover"> </el-card>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.clearfix:before,
.clearfix:after {
  content: "";
  display: table;
}
.clearfix:after {
  clear: both;
}
.clearfix {
  *zoom: 1;
}
.roomInfo {
  margin-top: 5px;
}
.info {
  margin-left: 100px;
}

.box-card1 {
  width: 680px;
}
.box-card2 {
  width: 400px;
}
.order-form {
  position: fixed;
  margin-right: 100px;
}
.hotelName {
  float: left;
}
.star {
  height: 30px;
  line-height: 30px;
  font-size: 30px;
  float: left;
}
.star ul {
  padding: 0;
}
.star ul li {
  float: left;
  list-style: none;
}

.yellow {
  color: #f7ba2a;
}
.advertise {
  color: #f7ba2a;
  font-weight: 700;
}
.form {
  width: 100%;
  height: 100px;
  padding-top: 50px;
  text-align: center;
  background-color: #f2f2f2;
}
</style>
        
<script>
import Header from "@/components/Header";
export default {
  components: {
    Header,
  },
  data() {
    return {
      hotelName: "速八酒店",
      starNum: 5,
      location: "北京城外",
      typeName: "特惠大床房",
      cNum: 2,
      bedNum: 1,
      dish: "无",
      form_Select: {
        time: "2021/08/11",
        room_num: 1,
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 86400000;
        },
      },
    };
  },
  methods: {},
};
</script>