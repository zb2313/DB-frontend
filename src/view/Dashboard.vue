<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card shadow="hover" class="mgb20" style="height: 252px">
          <div class="user-info">
            <img :src="pictrue" class="user-avator" alt />
            <div class="user-info-cont">
              <div class="user-info-name">{{ name }}</div>
              <div>{{ role }}</div>
            </div>
          </div>
          <div class="user-info-list">
            上次登录时间：
            <span>2021-7-15</span>
          </div>
          <div class="user-info-list">
            上次登录地点：
            <span>上海</span>
          </div>
        </el-card>
        <el-card shadow="hover" style="height: 252px">
          <template #header>
            <div class="clearfix">
              <span>近几个月历史订单</span>
            </div>
          </template>
          交通票
          <el-progress :percentage="37" color="#42b983"></el-progress>景点门票
          <el-progress :percentage="37" color="#f1e05a"></el-progress>酒店订单
          <el-progress :percentage="26"></el-progress>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card shadow="hover" style="height: 525px">
          <template #header>
            <div class="clearfix">
              <span>通知大厅</span>
            </div>
          </template>
          <el-table :show-header="false" :data="state.recycle" style="width: 100%">
            <el-table-column width="40">
              <template #default="scope">
                <el-checkbox v-model="scope.row.status"></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column>
              <template #default="scope">
                <div
                  class="todo-item"
                  :class="{
                    'todo-item-del': scope.row.status,
                  }"
                >
                  {{ scope.row.title }}
                </div>
              </template>
            </el-table-column>
            <el-table-column width="60">
              <template>
                <i class="el-icon-edit"></i>
                <i class="el-icon-delete"></i>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-card shadow="hover">
          <schart
            ref="bar"
            class="schart"
            canvasId="bar"
            :options="options"
          ></schart>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover">
          <div class="amap-wrap">
            <el-amap vid="amapDemo" :zoom="zoom" :center="center"></el-amap>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Schart from "vue-schart";
import "@/assets/css/main.css";
import "@/assets/css/color-dark.css";
import axios from "axios";
export default {
  name: "dashboard",
  components: { Schart },
  data() {
    return {

      state:{
        recycle: [
          {
            date: "2018-04-19 20:00:00",
            title: "【系统通知】该系统将于今晚凌晨2点到5点进行升级维护",
          },
          {
            date:"2021-09-10 21:00:00",
            title:"【市政公告】同济大学嘉定校区门外将进行地铁站建设，请师生注意绕行"
          },
          {
            date:"2021-09-12 21:20:00",
            title:"【疫情资讯】目前南京市已无疫情中高风险地区，欢迎五湖四海的游客"
          },
          {
            date:"2021-09-13 22:20:00",
            title:"【天气预告】明日嘉定区阴转小雨，最高温度31度"
          }
        ],
      },
      dragData: {
        lng: null,
        lat: null,
        address: null,
        nearestJunction: null,
        nearestRoad: null,
        nearestPOI: null,
      },
      zoom: 12,
      center: [121.473701, 31.230416],
      name: "",
      role: "",
      pictrue: "",
      options: {
        type: "bar",
        title: {
          text: "最近几个月下单数据",
        },
        xRorate: 25,
        labels: ["3月", "4月", "5月", "6月", "7月"],
        datasets: [
          {
            label: "景点门票",
            data: [1, 2, 2, 0, 5],
          },
          {
            label: "交通票",
            data: [0, 1, 3, 2, 4],
          },
          {
            label: "酒店订单",
            data: [1, 1, 0, 2, 3],
          },
        ],
      },
      options2: {
        type: "line",
        title: {
          text: "最近几个月各品类销售趋势图",
        },
        labels: ["6月", "7月", "8月", "9月", "10月"],
        datasets: [
          {
            label: "家电",
            data: [234, 278, 270, 190, 230],
          },
          {
            label: "百货",
            data: [164, 178, 150, 135, 160],
          },
          {
            label: "食品",
            data: [74, 118, 200, 235, 90],
          },
        ],
      },
    };
  },
  created() {
    this.name = localStorage.getItem("ms_username");
    this.pictrue = localStorage.getItem("pictrue");
    axios
      .get(
        "http://49.234.18.247:8080/api/Portrait/" +
          localStorage.getItem("ms_username")
      )
      .then((response) => {
        this.pictrue = response.data;
      });
    axios.get("http://49.234.18.247:8080/api/Users/" +
        localStorage.getItem("ms_username"))
    .then(
        (response)=>
        {
          this.name=response.data[0].useR_NAME;
        }
    )
    this.role = this.name === "admin" ? "超级管理员" : "普通用户";
  },
  methods: {
    createMap() {},
    dragMap(data) {
      this.dragData = {
        lng: data.position.lng,
        lat: data.position.lat,
        address: data.address,
        nearestJunction: data.nearestJunction,
        nearestRoad: data.nearestRoad,
        nearestPOI: data.nearestPOI,
      };
    },
  },
  mounted() {
    this.createMap();
  },
};
</script>

<style scoped>
.amap-wrap {
  width: 100%;
  height: 300px;
}
.el-row {
  margin-bottom: 20px;
}

.grid-content {
  display: flex;
  align-items: center;
  height: 100px;
}

.grid-cont-right {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #999;
}

.grid-num {
  font-size: 30px;
  font-weight: bold;
}

.grid-con-icon {
  font-size: 50px;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: #fff;
}

.grid-con-1 .grid-con-icon {
  background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
  background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
  background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
  color: rgb(242, 94, 67);
}

.user-info {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
}

.user-avator {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}

.user-info-cont {
  padding-left: 50px;
  flex: 1;
  font-size: 14px;
  color: #999;
}

.user-info-cont div:first-child {
  font-size: 30px;
  color: #222;
}

.user-info-list {
  font-size: 14px;
  color: #999;
  line-height: 25px;
}

.user-info-list span {
  margin-left: 70px;
}

.mgb20 {
  margin-bottom: 20px;
}

.todo-item {
  font-size: 14px;
}

.todo-item-del {
  text-decoration: line-through;
  color: #999;
}

.schart {
  width: 100%;
  height: 300px;
}
</style>

