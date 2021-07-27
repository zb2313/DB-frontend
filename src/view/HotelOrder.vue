<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 酒店订单列表
        </el-breadcrumb-item>

      </el-breadcrumb>
    </div>

    <div class="container">
      <el-table :data="hotelList" border class="table" ref="multipleTable" header-cell-class-name="table-header">
        <el-table-column prop="id" label="序号" align="center"  min-width="30"></el-table-column>
        <el-table-column prop="hoteL_NAME" label="酒店名称" align="center"></el-table-column>
        <el-table-column prop="ordeR_AMOUNT" label="订单金额" align="center">
        </el-table-column>
        <el-table-column prop="hlocation" label="地址" align="center">
        </el-table-column>
        <el-table-column prop="ordeR_TIME" label="下单时间" align="center"></el-table-column>
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
  name: "HotelOrder",
  data()
  {
    return{
      chooseDelete:" ",
      orderType:"",
      options:[
        {
          value:1,
          label:"景点门票"
        },
        {
          value: 2,
          label: "交通票"
        },
        {
          value: 3,
          label: "酒店订单"
        }
      ],

      editVisible:false,
      hotelList:[
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
    deleteLine(row) {
      this.$confirm("此订单将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
          .then(() => {
           axios.delete("http://49.234.18.247:8080/api/BookRoom/"+row.hoteL_ID+"&"+row.rooM_ID);
           this.$message.success("退款成功");
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
    },
    getTables()
    {

    },
    handleDelete(v1){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let a=this.testList[v1].attractioN_ID;
        alert(a)
        axios.delete(
            "http://49.234.18.247:8080/api/Attraction/",
            {
              data: {
                "attractioN_ID": a
              }
            }
        )
        //this.getListData();
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        // this.getDate();
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

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
  created() {
   let n=localStorage.getItem("ms_username");
    axios.get("http://49.234.18.247:8080/api/FunGetHotelInfoByUserId/"+n)
        .then((response)=>{
          console.log(response.data);
         let t=response.data;
         for(let i=0;i<t.length;i++)
         {
           this.hotelList.push({
             id:i+1,
             hoteL_NAME: t[i].hoteL_NAME,
             picture: t[i].picture,
             ordeR_AMOUNT: t[i].ordeR_AMOUNT,
             ordeR_TIME: t[i].ordeR_TIME,
             hlocation: t[i].hlocation,
             hoteL_ID:t[i].hoteL_ID,
             rooM_ID:t[i].rooM_ID
           })
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


