<template>
  <div>
    <admiHeader />
    <div class="page">
      <el-card id="nomoment" v-if="momentlist.length===0">暂无动态
      </el-card>
      <el-card class="box-card" v-for="(item,i) in momentlist" :key="i" id="moment">
        <div>
          <el-image v-bind:src="item.picture" v-if="item.picture!=null"></el-image>
          <div><br>{{item.text}}
          </div><br>
          <el-button icon="el-icon-error" @click="del=i;clear()">清除内容</el-button>
          <el-button icon="el-icon-delete" type="danger" @click="del=i;dele()">删 除</el-button>
        </div >
      </el-card>
    </div>
  </div>
</template>
<style>
#moment{
    width: 1000px;
}
#nomoment
{text-align: center;
  width: 1000px;
}
.page{
  position:absolute;
  top: 200px;
  left:300px;
}
</style>
<script>
import admiHeader from './admiHeader.vue';
import axios from 'axios';
export default {
  components: { admiHeader },
  data()
  {
      return{
          momentlist:[],
         del:''
      };
  },
  created()
  {
       var that=this;
          axios.get("http://49.234.18.247:8080/api/Moment")
        .then(res=>{
            that.momentlist=res.data;
                })
        .catch(err=>{
        console.log(err)
                });
  },
  methods:
  {
      clear()
      { 
           this.$confirm('此操作将清除该动态内容, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.put("http://49.234.18.247:8080/api/Moment/"+this.momentlist[this.del].momenT_ID,
          {
             "momenT_ID": this.momentlist[this.del].momenT_ID,
            "momenT_TIME": this.momentlist[this.del].momenT_TIME,
            "momenT_LOCATION":this.momentlist[this.del].momenT_LOCATION,
            "text": "违规内容，内容已清除！",
           "picture":null,
           "vedio": null
          });
          this.momentlist[this.del].text="违规内容，内容已清除！";
          this.momentlist[this.del].picture=null;
          this.momentlist[this.del].vedio=null;
          this.$message({
            type: 'success',
            message: '清除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        }); 
      },
    dele()
    { this.$confirm('此操作将删除该动态, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
         axios.delete("http://49.234.18.247:8080/api/FunDeleteMomentByMomentId/"+this.momentlist[this.del].momenT_ID);
         this.momentlist.splice(this.del,1);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        }); 
    }
  }
}
</script>
