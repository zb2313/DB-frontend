<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 景点订单列表
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="container">
      <el-table :data="attractionList" border class="table" ref="multipleTable" header-cell-class-name="table-header">
        <el-table-column prop="attractioN_NAME" label="订单名称" width="250" align="center"></el-table-column>
        <el-table-column prop="price" label="订单金额(元)" align="center"></el-table-column>
        <el-table-column prop="ordeR_TIME" label="下单时间" align="center"></el-table-column>
        <el-table-column prop="alocation"  label="地址" align="center"></el-table-column>
        <el-table-column
            fixed="right"
            align="center"
            label="操作"
            min-width="70"
        >
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="deleteLine(scope.row)"
            >退款</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>

import axios from "axios"
export default {
  name: "AttractionOrder",
  data()
  {
    return{
      chooseDelete:"",
      editVisible:false,
      attractionList:[
      ],
      query:{
        address: "",
        name: "",
        pageIndex: 1,
        pageSize: 10,
      },
      pageTotal:20,
      options:[]
    }

  },

  methods:{
    deleteLine(row) {
      this.$confirm("此订单将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
          .then(() => {
            console.log(row);
            axios.delete("http://49.234.18.247:8080/api/PurchaseAttractionTicket/"
                +localStorage.getItem("ms_username")+"&"+row.attractioN_ID);
            this.$message.success("退款成功");
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
    },
    handlePageChange(val)
    {
      this.query.pageIndex=val;
    },
  },
  created() {
    let n=localStorage.getItem("ms_username")
    axios.get("http://49.234.18.247:8080/api/FunGetAttractionInfoByUserId/"+n)
    .then((response)=>
    {
      this.attractionList=response.data;

      for(let i=0;i<this.attractionList.length;i++)
      {
        this.options.push({value:this.attractionList[i].attractioN_NAME,label:i+1,id:this.attractionList[i].attractioN_ID})
      }
    })
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

