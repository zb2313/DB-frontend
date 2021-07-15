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
        <el-table-column label="图片" align="center" prop="pictrue">
            <template slot-scope="{}">
              <img src="scope.row.pictrue" alt="" style="width: 20px;height: 20px">
          </template>
        </el-table-column>
        <el-table-column prop="ordeR_TIME" label="下单时间" align="center"></el-table-column>
        <el-table-column prop="alocation"  label="地址" align="center"></el-table-column>

        <el-table-column label="操作" width="200" align="center">
          <template #default="scope">
            <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button type="text" icon="el-icon-delete" class="red"
                       >退款</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination background layout="total, prev, pager, next" :current-page="query.pageIndex"
                       :page-size="query.pageSize" :total="pageTotal" @current-change="handlePageChange"></el-pagination>
      </div>
      <p>{{attractionList}}</p>
    </div>


      <el-dialog title="编辑" v-model="editVisible" width="30%">
<!--        <el-form label-width="70px">-->
<!--          <el-form-item label="用户名">-->
<!--            <el-input v-model="dataList[0].name"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="地址">-->
<!--            <el-input v-model="dataList[0].id"></el-input>-->
<!--          </el-form-item>-->
<!--        </el-form>-->
<!--        <template #footer>-->
<!--                    <span class="dialog-footer">-->
<!--                        <el-button @click="editVisible = false">取 消</el-button>-->
<!--                        <el-button type="primary" @click="saveEdit">确 定</el-button>-->
<!--                    </span>-->
<!--        </template>-->
      </el-dialog>
  </div>
</template>

<script>

import axios from "axios"
export default {
  name: "AttractionOrder",
  data()
  {
    return{
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
      attractionList:[
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
      if(this.orderType==1)this.$router.push("/AttractionOrder");
      else if(this.orderType==2)this.$router.push("/TrafficOrder");
      else this.$router.push("HotelOrder")
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
    let n=localStorage.getItem("ms_username")
    console.log(n);
    axios.get("http://49.234.18.247:8080/api/FunGetAttractionInfoByUserId/"+n)
    .then((response)=>
    {
      this.attractionList=response.data;
      console.log(this.attractionList)
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

