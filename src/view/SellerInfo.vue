<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card shadow="hover" class="mgb20" style="height:252px;">
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
        <el-card shadow="hover" style="height:252px;">
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
        <el-card shadow="hover" style="height:525px;">
          <template #header>
            <div class="clearfix">
              <span>通知大厅</span>
            </div>
          </template>
          <el-table :show-header="false" :data="todoList" style="width:100%;">
            <el-table-column width="40">
              <template #default="scope">
                <el-checkbox v-model="scope.row.status"></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column>
              <template #default="scope">
                <div class="todo-item" :class="{
                                        'todo-item-del': scope.row.status,
                                    }">{{ scope.row.title }}</div>
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
          <schart ref="bar" class="schart" canvasId="bar" :options="options"></schart>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover">
          <!--                    <schart ref="line" class="schart" canvasId="line" :options="options2"></schart>-->
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "SellerInfo",
  data()
  {
    return{
      hotelInfo:{

      }
    }
  },
  created() {
    let n=localStorage.getItem("ms_username");
    axios.get("http://49.234.18.247:8080/api/Hotel/"+n)
    .then(
        (response)=>{
          this.hotelInfo=response.data;
          console.log(this.hotelInfo)
        }
    )

  }
}
</script>

<style scoped>

</style>
