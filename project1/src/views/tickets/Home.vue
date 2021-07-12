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
        "https://tse1-mm.cn.bing.net/th/id/R-C.00c0fcb56d11f58ee2f172191eefa476?rik=U79UiqqhgYmd8Q&riu=http%3a%2f%2ffile06.16sucai.com%2f2016%2f0603%2f91c401949dae819c4f08213f78b63916.jpg&ehk=5bAmiltNduhHMDU%2fKDLJIGdIUjZNwpmZgrqRWRtzgjU%3d&risl=&pid=ImgRaw",
    };
  },

  methods: {
    typechange(val) {
      if (val == "2") {
        this.baseImg =
          "https://tse1-mm.cn.bing.net/th/id/R-C.8e1e176979168b67722ff769656f1b10?rik=oipr3IDM2TztAQ&riu=http%3a%2f%2fimg.ivsky.com%2fimg%2ftupian%2fpre%2f201711%2f28%2fxingshizhongdezhengqihuochetupian-004.jpg&ehk=VgMty5004CTtVyOfLYqURK%2b2hEsUjFvs8qwtTGJsXoY%3d&risl=&pid=ImgRaw";
      } else {
        this.baseImg =
          "https://tse1-mm.cn.bing.net/th/id/R-C.00c0fcb56d11f58ee2f172191eefa476?rik=U79UiqqhgYmd8Q&riu=http%3a%2f%2ffile06.16sucai.com%2f2016%2f0603%2f91c401949dae819c4f08213f78b63916.jpg&ehk=5bAmiltNduhHMDU%2fKDLJIGdIUjZNwpmZgrqRWRtzgjU%3d&risl=&pid=ImgRaw";
      }
    },
    onSubmit() {
      console.log("submit!");
      this.$router.replace("/about");
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
