<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 交通票订单列表
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
        <el-table-column label="操作" width="200" align="center">
          <template #default="scope">
            <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button type="text" icon="el-icon-delete" class="red"
                       @click="handleDelete(scope.$index, scope.row)">退款</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination background layout="total, prev, pager, next" :current-page="query.pageIndex"
                       :page-size="query.pageSize" :total="pageTotal" @current-change="handlePageChange"></el-pagination>
      </div>
    </div>
          <el-dialog title="编辑" v-model="editVisible" width="30%">

          </el-dialog>
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
      // this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(() => {
      //   let a=this.testList[v1].attractioN_ID;
      //   alert(a)
      //   axios.delete(
      //       "http://49.234.18.247:8080/api/Attraction/",
      //       {
      //         data: {
      //           "attractioN_ID": a
      //         }
      //       }
      //   )
      //   //this.getListData();
      //   this.$message({
      //     type: 'success',
      //     message: '删除成功!'
      //   });
      //   // this.getDate();
      // }).catch(() => {
      //   this.$message({
      //     type: 'info',
      //     message: '已取消删除'
      //   });
      // });

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
    saveEdit()
    {

    }

  },
  created() {
    let n=localStorage.getItem("ms_username");
    axios.get("http://49.234.18.247:8080/api/FunGetTrafficTicketInfoByUserId/"+n)
        .then((response)=>{
          this.trafficList=response.data;
        })
  },
  getListData()
  {

  }
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


