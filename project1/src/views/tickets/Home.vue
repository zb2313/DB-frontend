<template>
  <div class="home">
    <Header activeIndex="3" />
    <div
      class="pic"
      :style="{
        backgroundImage: 'url(' + baseImg + ')',
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
      }"
    >
    <div class="welcome">开启旅途</div>
      <div class="search">
        <el-form :model="formInline">
          <el-row>
            <el-col :span="5"
              ><el-form-item>
                <el-select
                  v-model="formInline.ticket_type"
                  @change="typechange"
                  placeholder="机票"
                >
                  <el-option label="机票" value="1"></el-option>
                  <el-option label="火车票" value="2"></el-option>
                </el-select> </el-form-item
            ></el-col>

            <el-col :span="5">
              <el-form-item>
                <el-autocomplete
                  v-model="state1"
                  :fetch-suggestions="querySearch"
                  placeholder="出发地"
                  @select="handleSelect"
                ></el-autocomplete>
              </el-form-item>
            </el-col>

            <el-col :span="5">
              <el-form-item>
                <el-autocomplete
                  v-model="state2"
                  :fetch-suggestions="querySearch"
                  placeholder="目的地"
                  @select="handleSelect"
                ></el-autocomplete>
              </el-form-item>
            </el-col>

            <el-col :span="5">
              <el-form-item>
                <el-select v-model="formInline.seat_type" placeholder="经济舱">
                  <el-option
                    v-if="formInline.ticket_type == 1"
                    label="经济舱"
                    value="1"
                  ></el-option>
                  <el-option v-else label="一等座" value="1"></el-option>
                  <el-option
                    v-if="formInline.ticket_type == 1"
                    label="商务舱"
                    value="2"
                  ></el-option>
                  <el-option v-else label="二等座" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="4">
              <el-form-item>
                <el-button
                  style="
                    height: 60px;
                    width: 100%;
                    background-color: #003680;
                    border-radius: 0px;
                  "
                  type="primary"
                  @click="onSubmit"
                  >查询</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.welcome{
  font-size: 20px;
  font-weight: bold;
  margin-left: 135px;
  margin-top: 150px;
  width:100%;
  height: 15px;
  float: left;
}
.pic {
  width: 100%;
  height: 500px;
}
.pic:before {
  content: "";
  display: table;
}

.el-row {
  width: 1000px;
  padding: 0;
  margin: 190px auto;
}

.el-select /deep/ .el-input__inner {
  height: 60px;
  border-radius: 0px;
  background-color: rgba(246, 247, 248, 0.87);
}

.el-autocomplete /deep/ .el-input__inner {
  height: 60px;
  border-radius: 0px;
  background-color: rgba(246, 247, 248, 0.87);
}
</style>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";

export default {
  components: {
    Header,
  },
  data() {
    return {
      formInline: {
        user: "",
        ticket_type: "",
        seat_type: "",
      },
      city: [],
      state1: "",
      state2: "",
      baseImg:
        "https://media.cntraveler.com/photos/5fd26c4ddf72876c320b8001/16:9/w_2560%2Cc_limit/952456172",
    };
  },

  methods: {
    typechange(val) {
      if (val == "2") {
        this.baseImg =
          "https://images.unsplash.com/photo-1442570468985-f63ed5de9086?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1393&q=80";
      } else {
        this.baseImg =
          "https://media.cntraveler.com/photos/5fd26c4ddf72876c320b8001/16:9/w_2560%2Cc_limit/952456172";
      }
    },
    onSubmit() {
      console.log("submit!");
      this.$router.replace("/tickets/detail");
    },
    querySearch(queryString, cb) {
      var city = this.city;
      var results = queryString
        ? city.filter(this.createFilter(queryString))
        : city;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    loadAll() {
      return [
        { value: "北京", address: "长宁区新渔路144号" },
        { value: "上海", address: "上海市长宁区淞虹路661号" },
        { value: "兰州", address: "上海市普陀区真北路988号创邑金沙谷6号楼113" },
        { value: "重庆", address: "天山西路438号" },
        {
          value: "成都",
          address: "上海市长宁区金钟路968号1幢18号楼一层商铺18-101",
        },
        { value: "广东", address: "上海市长宁区金钟路633号" },
        { value: "玉林", address: "上海市嘉定区曹安公路曹安路1685号" },
      ];
    },
    handleSelect(item) {
      console.log(item);
    },
  },

  mounted() {
    this.city = this.loadAll();
  },
};
</script>
