<template>
<el-container>
  <!-- 头部区域 -->
  <el-header>
    <el-button type="primary" icon="el-icon-back" @click="goBack">返回 </el-button>
  </el-header>
<!-- 主体部分 -->
  <el-main>
  <el-input
  type="textarea"
  :autosize="{ minRows: 12, maxRows: 20}"
  placeholder="请输入内容"
  v-model="textarea1">
  </el-input>
  <!-- 上传图片部分 -->
  <el-upload class="el-upload"
  action="https://jsonplaceholder.typicode.com/posts/"
  list-type="picture-card"
  :on-preview="handlePictureCardPreview"
  :on-remove="handleRemove">
  <i class="el-icon-plus"></i>
  <div slot="tip">请插入图片</div>
  </el-upload>
  <el-dialog :visible.sync="dialogVisible">
  <img width="100%" :src="dialogImageUrl" alt="">
  </el-dialog>
  <!-- 选择地址栏 -->
    <el-select v-model="value" filterable placeholder="请选择所在位置" class="select-city" >
    <el-option 
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  
  </el-main>
  <!-- 尾部区域 -->
  <el-footer>
    <el-button type="primary" icon="el-icon-confirm" @click="confirm">确认发送</el-button>
  </el-footer>
</el-container>
</template>

<style scoped>
 .el-dropdown {
    vertical-align: top;
  }
  .el-dropdown + .el-dropdown {
    margin-left: 15px;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
.el-upload{
  display: block;
  float: left;
  margin: 0px;
}
.el-input{
  width: 200px;
}
.select-city{
  display: block;
  float: right;
}
</style>
<script>
  export default {
     data() {
    return {
      textarea1: '',
      dialogImageUrl: '',
      dialogVisible: false,
       options: [{
          value: 1,
          label: '上海'
        }, {
          value: 2,
          label: '北京'
        }, {
          value: 3,
          label: '广州'
        }, {
          value: 4,
          label: '深圳'
        }, {
          value: 5,
          label: '西安'
        }],
        value: ''
    }
  },
    methods: {
      goBack() {
        this.$router.push('/')
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      confirm() {
        if(this.value>0){
          this.$confirm('此操作将提交动态, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '发送成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消发送'
          });          
        });
        }
        else{
          this.$alert('请选择一个地址', '地址未选择', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
        }
      }
    }
  }
</script>