<template>
  <div>
    <admiHeader/>
    <img src="../assets/img/audit2.jpg" width="100%" height="100%" style="z-index:-100;position:fixed;left:0;top:0">
    <div class="page">
      <el-card>
       <el-table :max-height="600"
    :data="tableData"
    style="width: 1000px">
    <el-table-column
      label="商家 ID"
      prop="id">
    </el-table-column>
    <el-table-column
      label="商家名称"
      prop="name">
    </el-table-column>
    <el-table-column
      label="基础信息"
      prop="basicinfo">
    </el-table-column>
    <el-table-column align="right">
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
  title="商家信息"
  :visible.sync="merchantDialogVisible"
  width="80%"
  center>
  <span>{{dialog_name}}</span>
  <span slot="footer" class="dialog-footer">
    <el-button size="medium" @click="merchantDialogVisible = false">不通过</el-button>
    <el-button size="medium" @click="merchantDialogVisible = false">通 过</el-button>
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
        dialog_name:'',
         tableData: [{
          id: '12987122',
          name: '蜜雪冰城',
          basicinfo: '冰鲜柠檬水',
        }, {
          id: '12987123',
          name: '茉沏',
          basicinfo: '多肉瓜瓜',
        }, {
          id: '12987125',
          name: '天猫超市',
          basicinfo: '',
        }, {
          id: '12987126',
          name: '教育超市',
          basicinfo: '',
        }]
      }
    },
    created()
     {  // let that=this;
    //       axios.get("http://49.234.18.247:8080/api/Faqs")
    //     .then(res=>{
    //         that.tableData=res.data;
    //             })
    //     .catch(err=>{
    //     console.log(err)
    //             });
    },
    methods: {
        view(index,row)
    {
       this.dialog_name=row.name;
    }
    }
  }
</script>
<style scoped>
.page{
  position:absolute;
  top: 200px;
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