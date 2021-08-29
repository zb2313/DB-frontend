<template>
  <div>
    <admiHeader/>
    <img src="../assets/img/faq.jpg" width="100%" height="100%" style="z-index:-100;position:fixed;left:0;top:0"> 
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
               @click="handleEdit(scope.row);editFormVisible=true">
               更改</el-button>
              <el-button icon="el-icon-delete"
              size="mini"  v-if="tableData.length!=0"
              type="danger"
              @click="handleDelete(scope.row)">
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
          <el-button size="medium" @click="addFormVisible = false">取 消</el-button>
          <el-button  size="medium" type="primary" @click="add()">确 定</el-button>
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
          <el-button size="medium" @click="editFormVisible = false">取 消</el-button>
          <el-button size="medium" type="primary" @click="save()">确 定</el-button>
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
          questioN_ID:''
        },
        formLabelWidth: '150px'
      }
    },
    created()
    {  
          axios.get("http://49.234.18.247:8080/api/Faqs")
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
            axios.get("http://49.234.18.247:8080/api/Faqs")
        .then(res=>{
            this.tableData=res.data;
                })
      },
      createID()
      {do{
      let chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
      var ID='';
      for(let i=0;i<10;i++)
      {
        let id = Math.ceil(Math.random()*35);
        ID+=chars[id];
      }
      var rep=false;
      for(let j=0;j<this.tableData.length;j++)
      if(ID===this.tableData[j].questioN_ID)
      rep=true;//将生成的id与已有的问题id比较，如有相同的就重新生成一个
      }while(rep===true)
      return ID;
      },
      handleEdit(row) {
         this.editform.questioN_NAME=row.questioN_NAME;
        this.editform.solution=row.solution;
        this.editform.questioN_ID=row.questioN_ID;
      },
      handleDelete(row) {
           this.$confirm('此操作将永久删除该问题, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.delete("http://49.234.18.247:8080/api/UpdateFaqs/"+row.questioN_ID+'&'+localStorage.getItem("ms_username"))
          .then(()=>
          {axios.delete("http://49.234.18.247:8080/api/Faqs/"+row.questioN_ID)
          .then(()=>
          {
             this.recreated();
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          })
         .catch(()=>
            {
               this.$message({
              type: 'error',
              message: '服务器内部错误!'
            });
            })
          })
          .catch(()=>
          {
            this.$message({
              type: 'error',
              message: '网络错误!'
            });
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
          { 
          this.ruleform.questioN_ID=this.createID();
        axios.post("http://49.234.18.247:8080/api/Faqs",
          {
              "questioN_ID":this.ruleform.questioN_ID,
              "questioN_NAME":this.ruleform.questioN_NAME,
              "solution":this.ruleform.solution
          })
        .then(()=>
        {axios.post("http://49.234.18.247:8080/api/UpdateFaqs",
          {
            "administratoR_ID":localStorage.getItem("ms_username"),
              "questioN_ID":this.ruleform.questioN_ID,
          })
          .catch(()=>
          {
            this.$message({
              type: 'error',
              message: '服务器内部错误!'
            });
          })
          this.recreated();
          this.ruleform=[];
          this.$message({
            type: 'success',
            message: '上传成功!'
          });
          this.addFormVisible=false;
        })
        .catch(()=>{
            this.$message({
              type: 'error',
              message: '网络错误!'
            });
            });
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
      {axios.put("http://49.234.18.247:8080/api/Faqs/"+this.editform.questioN_ID,
          {
              "questioN_ID":this.editform.questioN_ID,
              "questioN_NAME":this.editform.questioN_NAME,
              "solution":this.editform.solution
          })
      .then(()=>
      {
        this.recreated();
        this.$message({
          type: 'success',
          message: '修改成功'
        });
        this.editFormVisible=false;
      })
      .catch(()=>
      {
        this.$message({
          type: 'error',
          message: '网络错误!'
        });
      });

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
