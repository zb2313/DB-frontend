<template>
  <div>
    <div style="margin:auto;">
      <el-button icon="el-icon-delete" @click="deleteElVisible=true">从收藏夹中删除</el-button>
      <el-button icon="el-icon-back" @click="returnToFavorites">返回收藏夹列表</el-button>
      <el-button icon="el-icon-circle-plus-outline" @click="createElVisible=true">新建收藏内容</el-button>
    </div>
    <li v-for="item in favors" :key="item" style="list-style: none">
      <el-card style="margin:30px auto;width: 1100px;height: 90px">
        <p>{{item.label}}</p>
      </el-card>
    </li>

    <el-dialog
        :visible="createElVisible"
        style="width: 1000px;float: top;left: 300px"
    >
      <h2 style="margin: auto">新建</h2><br>
      <p>输入新建收藏链接</p>
      <el-input v-model="newFavoriteName"></el-input>
      <div style="text-align: center">
        <el-button type="primary" @click="createFavorite">确认</el-button>
        <el-button @click="createElVisible=false">关闭</el-button>
      </div>
    </el-dialog>

    <el-dialog
        :visible="deleteElVisible"
        style="width: 1000px;float: top;left: 300px;"
    >
      <h2 style="margin: auto">删除</h2>
      <el-select v-model="deleteFavoriteName" placeholder="请选择要删除的收藏链接" style="left: 70px;width: 300px">
        <el-option
            v-for="item in favors"
            :key="item.label"
            :label="item.label"
            :value="item.label">
        </el-option>
      </el-select>
      <div style="text-align: center;float: bottom" >
        <el-button type="primary" @click="deleteFromFavorites">确认</el-button>
        <el-button @click="deleteElVisible=false">关闭</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
//import Schart from "vue-schart";
import axios from 'axios'
export default {
  name: "FavoritesContent",
  components: {
    // Schart,
  },
  data()
  {
    return{
      favors:[

      ],
      createElVisible:false,
      deleteElVisible:false,
      deleteFavoriteName:"",
      newFavoriteName:""
    }
  },
  methods:
      {
        returnToFavorites()
        {
          this.$router.push("/Favorites");
        },
        getFavorite()
        {

        },
        deleteFromFavorites()
        {
          for(let i=0;i<this.favors.length;i++)
          {
            if(this.favors[i].label==this.deleteFavoriteName)
            {
              axios.delete("http://49.234.18.247:8080/api/FavouriteContents/"+localStorage.getItem("favorites_num")+"&"+this.favors[i].id);
              this.deleteElVisible=false;
              return;
            }
          }
          this.$message.success("删除成功");
        },
        setLinkID() {

          let chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
          let ID = '';
          for (let i = 0; i < 10; i++) {
            let id = Math.ceil(Math.random() * 9);
            ID += chars[id];
          }
          return ID;

        },
        createFavorite()
        {
          this.createElVisible=true;
          let newID = this.setLinkID();
          console.log(newID);
          let favorID = localStorage.getItem("favorites_num");
          console.log(favorID)
          console.log(this.newFavoriteName)
          axios.post("http://49.234.18.247:8080/api/FavouriteContents",
              {
                "favoR_ID": favorID,
                "linK_ID": newID,
                "merchanT_LINK":this.newFavoriteName
              })
          this.createElVisible=false;
          this.$message("添加成功")
        }
      },
  created(){
          axios.get("http://49.234.18.247:8080/api/FavouriteContents")
              .then((response)=>{
                let t=response.data;
                let id=localStorage.getItem("favorites_num");
                //console.log(t);
                let k=0;
                for(let i=0;i<t.length;i++)
                {
                  if(id==t[i].favoR_ID)
                  {
                    this.favors.push({value:k+1,label:t[i].merchanT_LINK,id:t[i].linK_ID});
                    k++;
                  }
                }
                console.log(this.favors[1])
              })

          }
};
</script>

<style scoped>
.schart-box {
  display: inline-block;
  margin: 20px;
}
.schart {
  width: 600px;
  height: 400px;
}
.content-title {
  clear: both;
  font-weight: 400;
  line-height: 50px;
  margin: 10px 0;
  font-size: 22px;
  color: #1f2f3d;
}
</style>

