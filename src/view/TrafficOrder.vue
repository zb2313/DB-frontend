<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 飞机票订单列表
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-table :data="trafficList" border class="table" ref="multipleTable" header-cell-class-name="table-header">
        <el-table-column prop="starT_LOCATION" label="始发站" align="center"></el-table-column>
        <el-table-column prop="enD_LOCATION" label="终点站" align="center"></el-table-column>
        <el-table-column prop="ordeR_AMOUNT" label="订单金额(元)" align="center">
        </el-table-column>
        <el-table-column prop="vehiclE_ID" label="班次" align="center"></el-table-column>
        <el-table-column prop="seaT_TYPE" label="座位类型" align="center"></el-table-column>
        <el-table-column prop="ordeR_TIME" label="下单时间" align="center"></el-table-column>
      </el-table>
    </div>

    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 火车票订单列表
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-table :data="trainList" border class="table" ref="multipleTable" header-cell-class-name="table-header">
        <el-table-column prop="starT_LOCATION" label="始发站" align="center"></el-table-column>
        <el-table-column prop="enD_LOCATION" label="终点站" align="center"></el-table-column>
        <el-table-column prop="ordeR_AMOUNT" label="订单金额(元)" align="center">
        </el-table-column>
        <el-table-column prop="vehiclE_ID" label="班次" align="center"></el-table-column>
        <el-table-column prop="seaT_TYPE" label="座位类型" align="center"></el-table-column>
        <el-table-column prop="ordeR_TIME" label="下单时间" align="center"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>

import axios from "axios"
export default {
  name: "TrafficOrder",
  data()
  {
    return{
      editVisible:false,
      trafficList:[
      ],
      trainList:[],
      query:{
        address: "",
        name: "",
        pageIndex: 1,
        pageSize: 10,
      },
      pageTotal:20,

    }

  },

  methods:{
    getTables()
    {

    },
    handleDelete(){
      this.editVisible=true;

    },
    handleEdit()
    {
      alert("aaa")
      this.editVisible=true;
    },
    handlePageChange(val)
    {
      this.query.pageIndex=val;
    },

  },
  created(){
    let n=localStorage.getItem("ms_username");
    axios.get("http://49.234.18.247:8080/api/FunGetFlightTicketByUid/"+n)
        .then((response)=>{
          console.log(response.data)
          this.trafficList=response.data;
        });
    axios.get("http://49.234.18.247:8080/api/FunGetTrainTicketByUid/"+n)
        .then((response)=>{
          console.log(response.data)
          this.trainList=response.data;
        });
  },
}
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>


