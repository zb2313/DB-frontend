<template>
  <div>
    <admiHeader/>
    <img src="../assets/img/audit2.jpg" width="100%" height="100%" style="z-index:-100;position:fixed;left:0;top:0">
    <div class="page">
      <el-card> 
        <el-switch
   v-model="value"
  active-text="审核已通过"
  inactive-text="审核未通过">
  </el-switch><br><br>
       <el-table :max-height="580"
       :data="tableData.filter(data => 
         data.iS_CHECK==value&&data.hoteL_NAME.toLowerCase().includes(search.toLowerCase()))"
    style="width: 1000px">
    <el-table-column
      label="商家 ID"
      prop="hoteL_ID">
    </el-table-column>
    <el-table-column
      label="商家名称"
      prop="hoteL_NAME">
    </el-table-column>
    <el-table-column
      label="位置信息"
      prop="hlocation">
    </el-table-column>
     <el-table-column align="right"> 
        <template slot="header" slot-scope="scope">
              <el-input
              v-model="search"
              size="small"
              placeholder="输入商家名称搜索"
              @keyup.enter="empty(scope.row)"/>
            </template>
     <template slot-scope="scope">
    <el-button icon="el-icon-info"
    size="mini"   v-if="tableData.length!=0"
     @click="view(scope.$index,scope.row);merchantDialogVisible=true">
    查看</el-button>
     </template>
    </el-table-column>
  </el-table>
      </el-card>
      <el-dialog
  title="商家入驻信息"
  :visible.sync="merchantDialogVisible"
  width="100%"
  center>
  <div  style="text-align:left;font-size:18px">
    商家ID：{{dialogrow.hoteL_ID}}<br>
    商家名称：{{dialogrow.hoteL_NAME}}<br>
    商家位置: <i class="el-icon-location-outline"/>{{dialogrow.hlocation}}<br>
    <img
    :src="dialogrow.picture"
    v-if="dialogrow.picture!== null"
    style="width: 30%"
    /><br>
    商家入驻执照：<span v-if="license== ''">无</span><br>
    <img
    :src="license"
    v-if="license!= ''"
    style="width: 50%"
    />
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button class="el-icon-check" type="success" size="medium" @click="pass();merchantDialogVisible = false">通过审核</el-button>
    <el-button class="el-icon-close" type="warning" size="medium" @click="dispass();merchantDialogVisible=false">不通过</el-button>
    <el-button class="el-icon-delete" type="danger" size="medium" @click="dele();merchantDialogVisible=false">删除该商家</el-button>
  </span>
</el-dialog>
    </div>
    </div>
</template>
<script>
import admiHeader from "./admiHeader.vue";
import axios from 'axios';
  export default {
    components: { admiHeader },
    data() {
      return {
        merchantDialogVisible: false,
        license:'',
        search:'',
        dialogrow:"",
        dialogindex:"",
         tableData: [],
         value:false,
      }
    },
    created()
     {  
         axios.get("http://49.234.18.247:8080/api/Hotel")
         .then(res=>{
          this.tableData=res.data;
                })
     .catch(err=>{
       console.log(err)
                });
    },
    methods: {
      recreated()
      {
 
         axios.get("http://49.234.18.247:8080/api/Hotel")
         .then(res=>{
          this.tableData=res.data;
                })
     .catch(err=>{
       console.log(err)
                });
      },
        view(index,row)
    {this.dialogrow=row;
    this.dialogindex=index;
    this.license=""
      axios.get("http://49.234.18.247:8080/api/HotelLicense/"+row.hoteL_ID)
      .then(res=>
      {
        if(res.data!="NULL")
        this.license=res.data;
      })
    },
   pass()
   {
axios.put("http://49.234.18.247:8080/api/Hotel/"+this.dialogrow.hoteL_ID,
{
"hoteL_ID":this.dialogrow.hoteL_ID, 
  "hoteL_NAME": this.dialogrow.hoteL_NAME,
  "hlocation":this.dialogrow.hlocation,
  "picture": this.dialogrow.picture,
  "star": this.dialogrow.star,
  "lowesT_PRICE":this.dialogrow.lowesT_PRICE,
  "hpassword":this.dialogrow.hpassword,
  "label": this.dialogrow.label,
  "iS_CHECK":1
})
.then(()=>
{
  this.$message({
    type: 'success',
     message: '已通过!'
    });this.recreated();
}
)
.catch(()=>
{
  this.$message({
    type: 'error',
     message: '网络错误!'
    });
})  
    },
    dispass()
    {axios.put("http://49.234.18.247:8080/api/Hotel/"+this.dialogrow.hoteL_ID,
{
"hoteL_ID":this.dialogrow.hoteL_ID, 
  "hoteL_NAME": this.dialogrow.hoteL_NAME,
  "hlocation":this.dialogrow.hlocation,
  "picture":this.dialogrow.picture,
  "star": this.dialogrow.star,
  "lowesT_PRICE":this.dialogrow.lowesT_PRICE,
  "hpassword":this.dialogrow.hpassword,
  "label": this.dialogrow.label,
  "iS_CHECK":0
})
.then(()=>
{this.$message({
    type: 'info',
     message: '已驳回!'
    });
  this.recreated();
}
)
.catch(()=>
{
  this.$message({
    type: 'error',
     message: '网络错误!'
    });
})  
    },
    dele()
    {
      axios.delete("http://49.234.18.247:8080/api/Hotel/"+this.dialogrow.hoteL_ID)
      .then(()=>
      {
        axios.delete("http://49.234.18.247:8080/api/HotelLicense/"+this.dialogrow.hoteL_ID)
      })
      .then(()=>
      {this.$message({
      type: 'info',
      message: '已删除!'
      });
        this.recreated();
      })
    }
    }
  }
</script>
<style scoped>
.page{
  position:absolute;
  top: 180px;
  left:300px;
}
 .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>