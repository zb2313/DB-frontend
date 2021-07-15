<template>
  <div>
    <div style="margin:auto;">
      <el-button icon="el-icon-delete" @click="deleteElVisible=true">从收藏夹中删除</el-button>
      <el-button icon="el-icon-back" @click="returnToFavorites">返回收藏夹列表</el-button>
    </div>
    <li v-for="item in items" :key="item" style="list-style: none">
      <el-card style="margin:30px auto;width: 1100px;height: 90px">
        <p>{{item.label}}</p>
        <el-button style="float: right" @click="getFavorite(items.value)">进入</el-button>
      </el-card>
    </li>
    <el-dialog
        :visible="deleteElVisible"
        style="width: 1000px;float: top;left: 300px;"
    >
      <h2 style="margin: auto">删除</h2>
      <el-select v-model="deleteName" placeholder="请选择要删除的收藏夹" style="left: 70px;width: 300px">
        <el-option
            v-for="item in items"
            :key="item.value"
            :label="item.label"
            :value="item.value">
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
export default {
  name: "FavoritesContent",
  components: {
    // Schart,
  },
  data()
  {
    return{

      items:[
        {
          value:1,
          label:"收藏1"
        },
        {
          value:2,
          label:"收藏2"
        },
        {
          value:3,
          label: "收藏3"
        }
      ],
      deleteElVisible:false,
      deleteName:""
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
          this.items.splice(this.deleteName-1,1);
          for(let i=0;i<this.items.length;i++)
          {
            this.items[i].value=i+1;
          }
          this.deleteElVisible=false;
          this.deleteName="";
        }
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

