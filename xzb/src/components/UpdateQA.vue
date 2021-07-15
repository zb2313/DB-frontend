<template>
  <div>
    <admiHeader/>
    <div class="page">
      <el-card>
        <el-table :max-height="600" 
        :data="tableData.filter(data => !search || 
         data.questioN_NAME.toLowerCase().includes(search.toLowerCase())
        ||data.solution.toLowerCase().includes(search.toLowerCase()))"
        style="width: 1000px">
          <el-table-column
          label="问题"
          prop="questioN_NAME">
          </el-table-column>
          <el-table-column
          label="解答"
          prop="solution">
          </el-table-column>
          <el-table-column>
            <template slot="header">
              <el-button icon="el-icon-plus" size="small" @click="addFormVisible=true">
              增加常见问题</el-button>
            </template>
          </el-table-column>
          <el-table-column align="right">
            <template slot="header" slot-scope="scope">
              <el-input
              v-model="search"
              size="small"
              placeholder="输入关键字搜索"
              @keyup.enter="empty(scope.row)"/>
            </template>
            <template slot-scope="scope">
              <el-button icon="el-icon-edit"
               size="mini"   v-if="tableData.length!=0"
               @click="handleEdit(scope.$index,scope.row);editFormVisible=true">
               更改</el-button> 
              <el-button icon="el-icon-delete"
              size="mini"  v-if="tableData.length!=0"
              type="danger"
              @click="handleDelete(scope.$index,scope.row)">
              删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <el-dialog title="请输入问题及解答！" :visible.sync="addFormVisible">
        <el-form :model="ruleform" :rules="rules" :ref="ruleform" class="demo-ruleForm" >
          <el-form-item label="问题" prop="questioN_NAME" :label-width="formLabelWidth">
            <el-input v-model="ruleform.questioN_NAME" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="解答" prop="solution" :label-width="formLabelWidth">
            <el-input v-model="ruleform.solution" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="add()">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="请输入问题及解答！" :visible.sync="editFormVisible">
        <el-form :model="editform" :rules="rules" :ref="editform" class="demo-ruleForm" >
          <el-form-item label="问题" prop="questioN_NAME" :label-width="formLabelWidth">
            <el-input v-model="editform.questioN_NAME" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="解答" prop="solution" :label-width="formLabelWidth">
            <el-input v-model="editform.solution" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="save()">确 定</el-button>
       </div>
      </el-dialog>
    </div></div>
</template>
<script>
import admiHeader from "./admiHeader.vue";
import axios from 'axios';
  export default {
    components: { admiHeader },
    data() {
      return {
        search:'',
        editindex:0,
        tableData: [],
        rules: {
          questioN_NAME: [
            { required: true, message: '请输入问题', trigger: 'blur' },
          ],
          solution: [
            { required: true, message: '请填写回答', trigger: 'blur' }
          ]
        },
        editFormVisible:false,
        addFormVisible: false,
        ruleform: {
          questioN_NAME: '',
          solution: '',
        },
        editform: {
          questioN_NAME: '',
          solution: '',
          id:''
        },
        formLabelWidth: '150px'
      }
    },
    created()
    {   let that=this;
          axios.get("http://49.234.18.247:8080/api/Faqs")
        .then(res=>{
            that.tableData=res.data;
                })
        .catch(err=>{
        console.log(err)
                });
    },
    methods: {
      handleEdit(index,row) {
         this.editform.questioN_NAME=row.questioN_NAME;
        this.editform.solution=row.solution;
        this.editform.id=row.questioN_ID;
        this.editindex=index;
      },
      handleDelete(index,row) {
           this.$confirm('此操作将永久删除该问题, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.delete("http://49.234.18.247:8080/api/Faqs/"+row.questioN_ID);
          this.tableData.splice(index,1);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      add()
      { this.$confirm('确认上传?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {if(this.ruleform.questioN_NAME!=''&&this.ruleform.solution!='')
          { let question_id=Math.floor(Math.random()*10000000000);
        axios.post("http://49.234.18.247:8080/api/Faqs",
          {
              "questioN_ID":''+question_id,
              "questioN_NAME":this.ruleform.questioN_NAME,
              "solution":this.ruleform.solution
          });
       this.tableData.push(this.ruleform);
       this.ruleform=[];
          this.$message({
            type: 'success',
            message: '上传成功!'
          });
          this.addFormVisible=false;
          }
          else   alert('输入不能为空!');
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消上传'
          });          
        });
      },
      save()
      {if(this.editform.questioN_NAME!=''&&this.editform.solution!='')
      {
        axios.put("http://49.234.18.247:8080/api/Faqs/"+this.editform.id,
          {
              "questioN_ID":this.editform.id,
              "questioN_NAME":this.editform.questioN_NAME,
              "solution":this.editform.solution
          });
        this.tableData[this.editindex].questioN_NAME=this.editform.questioN_NAME;
         this.tableData[this.editindex].solution=this.editform.solution;
         this.$message({
            type: 'success',
            message: '修改成功'
          }); 
          this.editFormVisible=false;
      }
      else  alert('输入不能为空!');
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
</style>