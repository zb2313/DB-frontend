<template>
<div>
  <div class="crumbs">
      <el-select  v-model="orderType" placeholder="选择订单类型">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>

  </div>
  <div class="container">
    <el-table :data="testList" border class="table" ref="multipleTable" header-cell-class-name="table-header">
      <el-table-column prop="attractioN_NAME" label="景点名称"></el-table-column>
      <el-table-column prop="opeN_TIME" label="订单名称"></el-table-column>
      <el-table-column prop="price" label="订单金额"></el-table-column>
      <el-table-column prop="star" label="订单类型"></el-table-column>

      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button type="text" icon="el-icon-delete" class="red"
                     @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination background layout="total, prev, pager, next" :current-page="query.pageIndex"
                     :page-size="query.pageSize" :total="pageTotal" @current-change="handlePageChange"></el-pagination>
    </div>
    <p></p>
  </div>
  {{testList}}
  <el-dialog title="编辑" v-model="editVisible" width="30%">
    <el-form label-width="70px">
      <el-form-item label="用户名">
        <el-input v-model="dataList[0].name"></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="dataList[0].id"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
                <span class="dialog-footer">
                    <el-button @click="editVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveEdit">确 定</el-button>
                </span>
    </template>
  </el-dialog>

</div>
</template>

<script>
import axios from "axios"
export default {
  name: "BaseTable",
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
      testList:{},
      dataList:[
        {
          id:"1",
          name:"中华艺术宫",
          money:23,
          type:"景点门票"
        },
        {
          id:"2",
          name:"上海->苏州",
          money:13,
          type: "火车票"
        },
        {
          id:"2",
          name:"上海->苏州",
          money:13,
          type: "火车票"
        },
        {
          id:"2",
          name:"上海->苏州",
          money:13,
          type: "火车票"
        },
        {
          id:"2",
          name:"上海->苏州",
          money:13,
          type: "火车票"
        },
        {
          id:"2",
          name:"上海->苏州",
          money:13,
          type: "火车票"
        },
        {
          id:"2",
          name:"上海->苏州",
          money:13,
          type: "火车票"
        },
        {
          id:"2",
          name:"上海->苏州",
          money:13,
          type: "火车票"
        },
        {
          id:"2",
          name:"上海->苏州",
          money:13,
          type: "火车票"
        },
        {
          id:"1",
          name:"中华艺术宫",
          money:23,
          type:"景点门票"
        },
        {
          id:"1",
          name:"中华艺术宫",
          money:23,
          type:"景点门票"
        },
        {
          id:"1",
          name:"中华艺术宫",
          money:23,
          type:"景点门票"
        },
      ],
      query:{
        address: "",
        name: "",
        pageIndex: 1,
        pageSize: 10,
      },
      pageTotal:20
    }
  },
  methods:{
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
    saveEdit()
    {

    }

  },
  created() {
    let baseUrl="http://49.234.18.247:8080/api/";
    // eslint-disable-next-line no-unused-vars
    let choose="PurchaseAttractionTicket";
    if(this.orderType==1)choose="PurchaseAttractionTicket";//景点
    else if(this.orderType==2)choose="PurchaseTrafficTicket";//交通
    else choose="BookRoom";//酒店
    axios.get(baseUrl+choose).then((response)=>{
      this.testList=response.data;
    })
  },
  getListData()
  {
    axios.get("http://49.234.18.247:8080/api/Attraction").then((response)=>{
      this.testList=response.data;
    })
  }
}
</script>

<style scoped>

</style>
