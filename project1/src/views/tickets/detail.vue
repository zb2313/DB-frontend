<template>
  <el-container direction="vertical">
    <Header activeIndex="3" />
    <el-container>
      <el-aside width="250px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1', '2']">
          <el-submenu index="1">
            <template slot="title"
              ><i class="el-icon-cold-drink"></i>航空公司</template
            >
            <el-menu-item-group>
              <el-checkbox-group class="checkbox_style" v-model="form.type">
                <el-checkbox label="东方航空" name="type"></el-checkbox>
                <el-checkbox label="中国国际航空" name="type"></el-checkbox>
                <el-checkbox label="中国南方航空" name="type"></el-checkbox>
                <el-checkbox label="吉祥航空" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title"
              ><i class="el-icon-cold-drink"></i>价格区间</template
            >
            <el-menu-item-group>
              <el-checkbox-group class="checkbox_style" v-model="form.type">
                <el-checkbox label="2000以上" name="type"></el-checkbox>
                <el-checkbox label="1000-2000" name="type"></el-checkbox>
                <el-checkbox label="500-1000" name="type"></el-checkbox>
                <el-checkbox label="500以下" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-menu-item-group>
          </el-submenu>

          <div class="select">
            <el-button type="primary" @click="onSubmit">筛选</el-button>
          </div>
        </el-menu>
      </el-aside>

      <el-container>
        <el-main>
          <div class="search">
            <el-form :model="formInline">
              <el-row>
                <el-col :span="5"
                  ><el-form-item>
                    <el-select
                      v-model="formInline.ticket_type"
                      placeholder="机票"
                      @change="typechange"
                    >
                      <el-option label="机票" value="1"></el-option>
                      <el-option label="火车票" value="2"></el-option>
                    </el-select> </el-form-item
                ></el-col>

                <el-col :span="5"
                  ><el-form-item>
                    <el-autocomplete
                      v-model="formInline.state1"
                      :fetch-suggestions="querySearch"
                      placeholder="出发地"
                      @select="handleSelect"
                    ></el-autocomplete> </el-form-item
                ></el-col>

                <el-col :span="5">
                  <el-form-item>
                    <el-autocomplete
                      v-model="formInline.state2"
                      :fetch-suggestions="querySearch"
                      placeholder="目的地"
                      @select="handleSelect"
                    ></el-autocomplete>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item>
                    <el-select
                      v-model="formInline.seat_type"
                       :placeholder="holder"
                    >
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

                <el-col :span="3">
                  <el-button
                    style="width: 100%"
                    type="primary"
                    @click="onSubmit"
                    icon="el-icon-search"
                    >查询</el-button
                  >
                </el-col>
              </el-row>
            </el-form>
          </div>

          <el-card
            class="cardstyle"
            v-model="tableData"
            v-for="item in tableData"
            :key="item.vehicle_id"
          >
            <div class="header">
              <div>{{ item.company_name }}</div>
              <br />
              <div>{{ item.vehicle_id }}</div>
            </div>
            <div class="body">
              <div class="time_place">
                <div class="time">
                  {{ item.start_time }}
                  <br />
                  <div style="font-size: 14px">{{ item.from }}</div>
                </div>
              </div>
              <div class="time_place"><br />----------</div>
              <div class="time_place">
                <div class="time">
                  {{ item.end_time }}
                  <br />
                  <div style="font-size: 14px">{{ item.to }}</div>
                </div>
              </div>
              <div class="price">￥{{ item.price }}</div>
              <div class="detail">
                <el-button type="primary" @click="onSubmit"
                  >查看详情 ></el-button
                >
              </div>
            </div>
          </el-card>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<style>
.select {
  width: 40%;
  height: 40px;
  margin: 0 auto 30px auto;
}
.select .el-button {
  width: 100%;
  height: 100%;
}
.search {
  margin-top: 30px;
  margin-bottom: 30px;
}
.vehicle-info {
  margin-top: 10px;
  height: 500px;
}
.cardstyle {
  width: 100%;
  height: 120px;
  margin-top: 20px;
  margin-bottom: 20px;
}

.time_place {
  margin-top: 10px;
  margin-bottom: 20px;
  margin-left: 30px;
  margin-right: 30px;
  float: left;
  height: 100%;
  width: 70px;
}
.detail {
  margin-top: 10px;
  margin-left: 50px;
  float: left;
}
.el-menu {
  margin-bottom: 20px;
}
.el-submenu__title {
  font-size: 16px;
  margin-left: 0px;
  padding-left: 0px;
}
.el-checkbox__label {
  line-height: 25px;
  font-size: 15px;
}

.time {
  font-size: 30px;
  margin-top: 0px;
  margin-bottom: 20px;
  margin-left: 0px;
  float: left;
  height: 100%;
}
.price {
  font-size: 30px;
  color: #042758;
  margin-left: 80px;
  margin-right: 80px;
  margin-top: 10px;
  float: left;
}
.header {
  width: 100px;
  height: 100px;
  float: left;
  margin-right: 20px;
  margin-top: 10px;
}
.body {
  float: left;
  width: 800px;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
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
      formInline: {
        user: "",
        ticket_type: "",
        restaurants: [],
        seat_type: "",
        state1: "",
        state2: "",
      },

      form: {
        type: [],
      },
      tableData: [],
      /*  tableData: {
          company_name:'',
          vehicle_id:'',
          start_time:'',
          end_time:'',
          logo_url: require('')

        } */
      holder:"经济舱",
    };
  },
  methods: {
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
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
    loadAll2() {
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
    typechange(val) {
      if (val == "2") {
        this.holder="一等座";
        
      } else {
        this.holder="经济舱";
        
      }
    },

    loadAll() {
      return [
        {
          company_name: "东方航空",
          vehicle_id: "MU5099",
          start_time: "7:00",
          end_time: "9:15",
          from: "上海",
          to: "北京",
          price: "666",
        },
        {
          company_name: "中国国际航空",
          vehicle_id: "CA1832",
          start_time: "11:30",
          end_time: "14:55",
          from: "上海",
          to: "北京",
          price: "748",
        },
        {
          company_name: "吉祥航空",
          vehicle_id: "HO5809",
          start_time: "15:00",
          end_time: "17:20",
          from: "上海",
          to: "北京",
          price: "748",
        },
      ];
    },
  },
  created() {
    this.tableData = this.loadAll();
    this.restaurants = this.loadAll2();
  },
};
</script>