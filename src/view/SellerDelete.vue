<template>
<div>
  <div class="crumbs">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>
        <i class="el-icon-lx-cascades"></i> 房间类型信息列表
      </el-breadcrumb-item>
      <el-breadcrumb-item><el-button @click="createState=true">新建房间类型</el-button></el-breadcrumb-item>
    </el-breadcrumb>
  </div>

  <div class="container">
    <el-table :data="typeList" border class="table" ref="multipleTable" header-cell-class-name="table-header">
      <el-table-column prop="typE_ID" label="类型ID" align="center"  min-width="30"></el-table-column>
      <el-table-column prop="bed" label="床铺类型" align="center"></el-table-column>
      <el-table-column prop="originaL_PRICE" label="原始价格" align="center">
      </el-table-column>
      <el-table-column prop="dish" label="有无早餐" align="center">
      </el-table-column>
      <el-table-column prop="window" label="有无窗户" align="center"></el-table-column>
      <el-table-column prop="smoke" label="能否吸烟" align="center"></el-table-column>
      <el-table-column
          fixed="right"
          align="center"
          label="操作"
          min-width="70"
      >
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="editLine(scope.row)"
          >详细信息</el-button
          >
          <el-button @click="deleteLine(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>


  <el-dialog :visible="editState">
    <h1>房间类型信息修改</h1><br>
    <el-form ref="form" label-width="100px">
      <el-form-item label="床铺类型">
        <el-input v-model="editBedType" style="width: 480px"></el-input>
      </el-form-item>
      <el-form-item label="有无早餐">
        <el-input v-model="editMeal" style="width: 480px"></el-input>
      </el-form-item>
      <el-form-item label="有无窗户">
        <el-input v-model="editWindow" style="width: 480px"></el-input>
      </el-form-item>
      <el-form-item label="能否吸烟">
        <el-input v-model="editSmoke" style="width: 480px"></el-input>
      </el-form-item>
      <el-form-item label="原始价格">
        <el-input v-model="editPrice" style="width: 480px"></el-input>
      </el-form-item>
    </el-form>
    <el-button @click="editRoomT2()">确认</el-button>
    <el-button @click="editState=false">关闭</el-button>
  </el-dialog>

  <el-dialog :visible="createState">
    <h1>新建房间类型</h1><br>
    <el-form ref="form" label-width="100px">
      <el-form-item label="房间类型名">
         <el-input v-model="newTypename" style="width: 480px"></el-input>
      </el-form-item>
      <el-form-item label="可容纳人数">
         <el-input v-model="newPeopleNum" style="width: 480px"></el-input>
      </el-form-item>
      <el-form-item label="可取消类型">
         <el-input v-model="newCancelType" style="width: 480px"></el-input>
      </el-form-item>
      <el-form-item label="床铺类型">
        <el-input v-model="newBedType" style="width: 480px"></el-input>
      </el-form-item>
      <el-form-item label="有无早餐">
        <el-input v-model="newMeal" style="width: 480px"></el-input>
      </el-form-item>
      <el-form-item label="有无窗户">
        <el-input v-model="newWindow" style="width: 480px"></el-input>
      </el-form-item>
      <el-form-item label="能否吸烟">
        <el-input v-model="newSmoke" style="width: 480px"></el-input>
      </el-form-item>
      <el-form-item label="原始价格">
        <el-input v-model="newPrice" style="width: 480px"></el-input>
      </el-form-item>
    </el-form>
    <el-button @click="createType">新建</el-button>
    <el-button @click="createState=false">关闭</el-button>
  </el-dialog>



</div>
</template>

<script>
import axios from "axios";

export default {
  name: "SellerDelete",

  data() {
    return{
      roomList:[],
      typeidList:[],
      typeList:[],
      editState:false,
      createState:false,

      newTypename:"",
      newPeopleNum:"",
      newCancelType:"",
      newBedType:"",
      newMeal:"",
      newWindow:"",
      newSmoke:"",
      newPrice:"",

      editTypeID:"",
      editTypename:"",
      editPeopleNum:"",
      editCancelType:"",
      editBedType:"",
      editMeal:"",
      editWindow:"",
      editSmoke:"",
      editPrice:""

    }
  },
  methods:{
    editRoomT2()
    {
      axios.put("http://49.234.18.247:8080/api/RoomType/"+this.editTypeID,
          {
            "typE_ID": this.editTypeID,
            "typE_NAME": this.editTypename,
            "originaL_PRICE": this.editPrice,
            "rooM_NAME": null,
            "customeR_NUM": this.editPeopleNum,
            "bed": this.editBedType,
            "dish": this.editMeal,
            "smoke": this.editSmoke,
            "window": this.editWindow,
            "cancel": this.editCancelType,
            "price": this.editPrice,
            "coveR_IMG_URL": null
          })
      this.$message.success("修改成功")
    },
    createType()
    {
      axios.post("http://49.234.18.247:8080/api/RoomType",
          {
            "typE_ID":this.typeList.length+1+' ',
            "typE_NAME":this.newTypename,
            "originaL_PRICE":this.newPrice,
            "rooM_NAME":null,
            "customeR_NUM":this.newPeopleNum,
            "bed":this.newBedType,
            "dish":this.newMeal,
            "smoke":this.newSmoke,
            "window":this.newWindow,
            "cancel":this.newCancelType,
            "price":this.newPrice,
            "coveR_IMG_URL":null
          });
      this.$message.success("新建成功")
    },
    deleteLine(row)
    {
      axios.delete("http://49.234.18.247:8080/api/RoomType/"+row.typE_ID);
      this.$message.success("删除成功");
      //window.location.reload();
      this.$router.go(0);
    },
  editLine(row)
  {
    this.editState=true;
    this.editTypeID=row.typE_ID;
    this.editTypename=row.typE_NAME,
        this.editPeopleNum=row.customeR_NUM,
      this.editCancelType=row.cancel,
      this.editBedType=row.bed,
      this.editMeal=row.dish,
      this.editWindow=row.window,
      this.editSmoke=row.smoke,
      this.editPrice=row.price
  }},
  created() {
    axios.get("http://49.234.18.247:8080/api/FunGetAllRoomByHotelId/" + localStorage.getItem("ms_username"))
        .then(
            (response) => {
              this.roomList = response.data;
              console.log(this.roomList)
            }
        );
    axios.get("http://49.234.18.247:8080/api/RoomType")
        .then(
            (response) => {
              console.log(response.data);
              this.typeList=response.data;
              // for(let i=0;i<this.typeidList.length;i++)
              // {
              //   axios.get("http://49.234.18.247:8080/api/RoomType/"+this.typeidList[i].typeid)
              //       .then(
              //           (response)=>
              //           {
              //             this.typeList.push(response.data[0])
              //           }
              //       );
              // }
              console.log(this.typeList);
            }
        );

  }
}
</script>

<style scoped>

</style>
