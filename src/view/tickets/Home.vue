<template>
  <div class="hom">
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
                  <el-option label="机票" value="0000000001"></el-option>
                  <el-option label="火车票" value="0000000002"></el-option>
                </el-select> </el-form-item
            ></el-col>

            <el-col :span="5">
              <el-form-item>
                <el-autocomplete
                  v-model="state1"
                  :fetch-suggestions="querySearch1"
                  placeholder="出发地"
                  @select="handleSelect"
                ></el-autocomplete>
              </el-form-item>
            </el-col>

            <el-col :span="5">
              <el-form-item>
                <el-autocomplete
                  v-model="state2"
                  :fetch-suggestions="querySearch2"
                  placeholder="目的地"
                  @select="handleSelect"
                ></el-autocomplete>
              </el-form-item>
            </el-col>

            <el-col :span="5">
              <el-form-item>
                <el-select v-model="formInline.seat_type" :placeholder="holder">
                  <el-option
                    v-if="formInline.ticket_type == 1"
                    label="经济舱"
                    value="经济舱"
                  ></el-option>
                  <el-option v-else label="一等座" value="一等座"></el-option>
                  <el-option
                    v-if="formInline.ticket_type == '0000000001'"
                    label="商务舱"
                    value="商务舱"
                  ></el-option>
                  <el-option v-else label="二等座" value="二等座"></el-option>
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
.welcome {
  width: 100px;
  height: 30px;
  font-size: 25px;
  font-weight: bold;
  float: left;
  position:relative;
  top:150px;
  left:17%;
}
.pic {
  width: 100%;
  height: 700px;
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
      city1: [],
      city2: [],
      state1: "",
      state2: "",
      holder: "经济舱",
      baseImg:
        "https://tse1-mm.cn.bing.net/th/id/R-C.00c0fcb56d11f58ee2f172191eefa476?rik=U79UiqqhgYmd8Q&riu=http%3a%2f%2ffile06.16sucai.com%2f2016%2f0603%2f91c401949dae819c4f08213f78b63916.jpg&ehk=5bAmiltNduhHMDU%2fKDLJIGdIUjZNwpmZgrqRWRtzgjU%3d&risl=&pid=ImgRaw",
    };
  },

  methods: {
    typechange(val) {
      if (val == "0000000002") {
        this.holder = "一等座";
        this.baseImg =
          "https://images.unsplash.com/photo-1442570468985-f63ed5de9086?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1393&q=80";
      } else {
        this.holder = "经济舱";
        this.baseImg =
          "https://tse1-mm.cn.bing.net/th/id/R-C.00c0fcb56d11f58ee2f172191eefa476?rik=U79UiqqhgYmd8Q&riu=http%3a%2f%2ffile06.16sucai.com%2f2016%2f0603%2f91c401949dae819c4f08213f78b63916.jpg&ehk=5bAmiltNduhHMDU%2fKDLJIGdIUjZNwpmZgrqRWRtzgjU%3d&risl=&pid=ImgRaw";
      }
    },
    onSubmit() {
      if (
        this.formInline.ticket_type &&
        this.formInline.seat_type &&
        this.state1 &&
        this.state2
      ) {
        //this.$router.replace("/tickets/detail");}
        this.$router.push({
          path: `/tickets/detail`,
          query: {
            ticket_type: this.formInline.ticket_type,
            from: this.state1,
            to: this.state2,
            seat_type: this.formInline.seat_type,
          },
        });
      } else {
        this.$alert("请填写所有选项再查询", "提示", {
          confirmButtonText: "确定",
        });
      }
    },
    querySearch1(queryString, cb) {
      var city1 = this.city1;
      var results = queryString
        ? city1.filter(this.createFilter(queryString))
        : city1;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    querySearch2(queryString, cb) {
      var city2 = this.city2;
      var results = queryString
        ? city2.filter(this.createFilter(queryString))
        : city2;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (city) => {
        return (
          city.value.toLowerCase().indexOf(queryString.toLowerCase()) != -1
        );
      };
    },

    handleSelect(item) {
      console.log(item);
    },
  },

  mounted() {
    let _this = this;
    this.$axios
      .get("http://49.234.18.247:8080/api/ReturnPlace/%E8%B5%B7%E7%82%B9")
      .then(function (response) {
        _this.city1 = [];
        for (let i = 0; i < response.data.length; i++) {
          _this.city1.push({ value: response.data[i] });
        }
      })

      .catch(function (error) {
        console.log(error);
      });
    this.$axios
      .get("http://49.234.18.247:8080/api/ReturnPlace/%E7%BB%88%E7%82%B9")
      .then(function (response) {
        _this.city2 = [];
        for (let i = 0; i < response.data.length; i++) {
          _this.city2.push({ value: response.data[i] });
        }
      })

      .catch(function (error) {
        console.log(error);
      });
  },
};
</script>
