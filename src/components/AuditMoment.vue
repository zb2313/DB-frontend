<template>
  <div>
    <admiHeader /> <img src="../assets/img/audit1.jpg" width="100%" height="100%" style="z-index:-100;position:fixed;left:0;top:0">
    <div class="page">
      <el-card id="nomoment" v-if="momentlist.length===0">暂无动态
      </el-card>
      <el-card class="box-card" v-for="(item,i) in momentlist" :key="i" id="moment">
        <div>
          <el-image
          :src="item.uprofile"
          style="float: left;border-radius: 100%;width:60px"
        ><div slot="error" style="font-size:13px">加载中...</div>
        </el-image>
        <pre><span class="user_name" style="float: left"> 用户名：{{item.useR_NAME}}</span>
    <span class="user_name" style="float: left"> 用户ID:{{item.useR_ID}}</span>
		<span class="moment_time" style="float:left"> {{item.momenT_TIME}}发布于{{item.momenT_LOCATION}}</span>
      </pre>
          <div>{{item.text}}<br>
          <img
            :src="item.picture"
            v-if="item.picture !== null"
            style="height: 300px"
          />
          <div v-if="item.vedio !== null">
            <iframe
              :src="item.vedio"
              frameborder="0"
              allow="autoplay;encrypted-media"
              allowfullscreen
              style="width: 100%; height: 50%"
            >
            </iframe>
          </div>
          </div><br>
          <el-button icon="el-icon-error" size="small" @click="del=i;clear()">清除内容</el-button>
          <el-button icon="el-icon-delete" size="small" type="danger" @click="del=i;dele()">删 除</el-button>
        </div >
      </el-card>
    </div>
  </div>
</template>
<style>
#moment{
    width: 1000px;
    margin: 15px;
    padding: 10px;
}
#nomoment
{text-align: center;
  width: 1000px;
}
.page{
  position:absolute;
  top: 150px;
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
  {axios.get("http://49.234.18.247:8080/api/FunGetAllMomentInfo")
        .then(res=>{
            this.momentlist=res.data;
            for(let i=0;i<this.momentlist.length;i++)
            {
               axios.get("http://49.234.18.247:8080/api/MomentPic/"+this.momentlist[i].momenT_ID)
        .then(res=>
        {let  pic=res.data;
          if(pic!="NULL")
          this.momentlist[i].picture=pic;
        });
        axios.get("http://49.234.18.247:8080/api/Portrait/"+this.momentlist[i].useR_ID)
        .then(res=>
        {
           let pic=res.data;
           if(pic!="NULL")
          this.momentlist[i].uprofile=pic;
        })
            }
                })
        .catch(err=>{
        console.log(err)
                });
  },
  methods:
  {
    recreated()
    {
      axios.get("http://49.234.18.247:8080/api/FunGetAllMomentInfo")
        .then(res=>{
            this.momentlist=res.data;
             for(let i=0;i<this.momentlist.length;i++)
            {
               axios.get("http://49.234.18.247:8080/api/MomentPic/"+this.momentlist[i].momenT_ID)
        .then(res=>
        {var pic=res.data;
          if(pic!="NULL")
          this.momentlist[i].picture=pic;
        });
        axios.get("http://49.234.18.247:8080/api/Portrait/"+this.momentlist[i].useR_ID)
        .then(res=>
        {
           let pic=res.data;
           if(pic!="NULL")
          this.momentlist[i].uprofile=pic;
        })
            }
                })
    },
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
          })
          .then(()=>
          {if(this.momentlist[this.del].picture!=null)
            axios.delete("http://49.234.18.247:8080/api/MomentPic/"+this.momentlist[this.del].momenT_ID);
            this.recreated();
            this.$message({
              type: 'success',
              message: '清除成功!'
            });
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
         axios.delete("http://49.234.18.247:8080/api/FunDeleteMomentByMomentId/"+this.momentlist[this.del].momenT_ID)
         .then(()=>
         {if(this.momentlist[this.del].picture!=null)
           axios.delete("http://49.234.18.247:8080/api/MomentPic/"+this.momentlist[this.del].momenT_ID);
           this.momentlist.splice(this.del,1);
           this.$message({
             type: 'success',
             message: '删除成功!'
           });
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
            message: '已取消'
          });
        });
    }
  }
}
</script>
