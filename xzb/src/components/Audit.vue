<template>
<div>
    <admiHeader />
    <div class="page">
    <el-card class="box-card" v-for="(item,i) in commentlist" :key="i" id="comment">
      <div>
          <el-image v-bind:src="item.picture" v-if="item.picture!=null"></el-image>

        <div><br>{{item.text}}
 </div><br>
        <el-button icon="el-icon-error" @click="id=item.momenT_ID;del=i;NotPass()">审核不通过</el-button>
 </div >
</el-card>

    </div></div>
</template>
<style>
#comment{
    width: 1000px;
}
</style>
<script>
import admiHeader from './admiHeader.vue';
import axios from "axios";
export default {
  components: { admiHeader },
  data()
  {
      return{
          commentlist:[],
          releasemomentlist:[],
         id:'',
         del:''
      };
  },
  created()
  {
       var that=this;
          axios.get("http://49.234.18.247:8080/api/Moment")
        .then(res=>{
            that.commentlist=res.data;
                })
        .catch(err=>{
        console.log(err)
                });
            axios.get("http://49.234.18.247:8080/api/ReleaseMoment")
        .then(res=>{
            that.releasecommentlist=res.data;
                })
        .catch(err=>{
        console.log(err)
                });
  },
  methods:
  {
      NotPass()
      {
           this.$confirm('此操作将删除该动态, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            axios.delete("http://49.234.18.247:8080/api/Moment/"+this.id);
            axios.delete("http://49.234.18.247:8080/api/ReleaseMoment/"+this.id);
          this.commentlist.splice(this.del,1);
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
