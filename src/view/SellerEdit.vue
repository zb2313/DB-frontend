<template>
<div>
  <div class="crumbs">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>
        <i class="el-icon-lx-cascades"></i> 房间信息列表
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <el-button @click="createState=true">新建房间</el-button>
      </el-breadcrumb-item>
    </el-breadcrumb>

  </div>

  <div class="container">
    <el-table :data="roomList" border class="table" ref="multipleTable" header-cell-class-name="table-header">
      <el-table-column prop="rooM_ID" label="门牌号" align="center"></el-table-column>
      <el-table-column prop="price" label="价格" align="center">
      </el-table-column>
      <el-table-column prop="booK_STATUS" label="预定状态" align="center">
      </el-table-column>
      <el-table-column prop="typE_ID" label="房间类型编号" align="center"></el-table-column>
      <el-table-column
          fixed="right"
          align="center"
          label="操作"
          min-width="70"
      >
        <template slot-scope="scope">
          <el-button @click="editRoom(scope.row)">修改</el-button>
          <el-button type="primary" size="small" @click="deleteLine(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <el-dialog :visible="editState">
    <h1>房间信息修改</h1>
    <el-form>
      <el-form-item label="房间ID">
         <el-input v-model="editRoomID" style="width: 380px"></el-input>
      </el-form-item>
      <el-form-item label="房间类型ID">
         <el-input v-model="editTypeID" style="width: 380px"></el-input>
      </el-form-item >
      <el-form-item label="预定状态">
         <el-input v-model="editBookStatus" style="width: 380px"></el-input>
      </el-form-item>
      <el-form-item label="价格">
         <el-input v-model="editPrice" style="width: 380px"></el-input>
      </el-form-item>

    </el-form>
    <el-button @click="editRoom2">确认</el-button>
    <el-button @click="editState=false">关闭</el-button>
  </el-dialog>

  <el-dialog :visible="createState">
    <h1>新建房间</h1>
    <el-form label-width="150px">
      <el-form-item label="房间号">
        <el-input v-model="newRoomId" style="width: 450px"></el-input>
      </el-form-item>
      <el-form-item label="房间类型id">
        <el-input v-model="newTypeId" style="width: 450px"></el-input>
      </el-form-item>
      <el-form-item label="预定状态">
        <el-input v-model="newBookStatus"></el-input>
      </el-form-item>
      <el-form-item label="价格">
        <el-input v-model="newPrice" style="width: 450px"></el-input>
      </el-form-item>
    </el-form>
    <el-button @click="createRoom">新建</el-button>
    <el-button @click="createState=false">关闭</el-button>
  </el-dialog>


</div>
</template>

<script>
import axios from "axios"
export default {
  name: "SellerEdit",
  data() {
    return{
      roomList:[],
      typeidList:[],
      typeList:[],
      createState:false,
      editState:false,

      newRoomId:"",
      newTypeId:"",
      newBookStatus:"",
      newPrice:"",

      editRoomID:"",
      editTypeID:"",
      editBookStatus:"",
      editPrice:""

    }
  },
  methods:
  {
    editRoom(row)
    {
      this.editState=true;
      this.editRoomID=row.rooM_ID;
      this.editPrice=row.price;
      this.editTypeID=row.typE_ID;
      this.editBookStatus=row.booK_STATUS;
    },
    editRoom2()
    {
      axios.put("http://49.234.18.247:8080/api/Room/"+localStorage.getItem("ms_username")+"&"+this.editRoomID,
          {
            "hoteL_ID": localStorage.getItem("ms_username"),
            "rooM_ID": this.editRoomID,
            "typE_ID": this.editTypeID,
            "booK_STATUS": this.editBookStatus,
            "price": this.editPrice
          })
      this.$message.success("修改成功")
    },
    createRoom()
    {
       axios.post("http://49.234.18.247:8080/api/Room",
           {
             "hoteL_ID": localStorage.getItem("ms_username"),
             "rooM_ID": this.newRoomId,
             "typE_ID": this.newTypeId,
             "booK_STATUS": this.newBookStatus,
             "price": this.newPrice
           })
    },
    deleteLine(row){
      axios.delete("http://49.234.18.247:8080/api/Room/"+localStorage.getItem("ms_username")+"&"+row.rooM_ID);
      this.$message.success("删除成功");
    }
  },
  created() {
    axios.get("http://49.234.18.247:8080/api/FunGetAllRoomByHotelId/" + localStorage.getItem("ms_username"))
        .then(
            (response) => {
              this.roomList = response.data;
              console.log(this.roomList)
            }
        );
    axios.get("http://49.234.18.247:8080/api/FunGetAllTypeIdByHotelId/" + localStorage.getItem("ms_username"))
        .then(
            (response) => {
             console.log(response.data);
              this.typeidList=response.data;
              for(let i=0;i<this.typeidList.length;i++)
              {
                axios.get("http://49.234.18.247:8080/api/RoomType/"+this.typeidList[i].typeid)
                    .then(
                        (response)=>
                        {
                          this.typeList.push(response.data[0])
                        }
                    );
              }
              console.log(this.typeList);
            }
        );

  }

}
</script>

<style scoped>
.dashboard-container {
  width: 550px;
  height: 650px;
  margin:70px auto;

}
</style>
