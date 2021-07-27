<template>
    <div>
      <div style="margin:auto;">
      <el-button icon="el-icon-circle-plus" @click="createElVisible=true">新建收藏夹</el-button>
      <el-button icon="el-icon-delete" @click="deleteElVisible=true">删除收藏夹</el-button>
      </div>
      <li v-for="item in favorites" :key="item" style="list-style: none">
          <el-card style="margin:30px auto;width: 1100px;height: 90px" >
            <p>{{item.label}}</p>
            <el-button style="float: right" @click="getContent(item.id)">进入</el-button>
          </el-card>
      </li>
      <el-dialog
          :visible="createElVisible"
          style="width: 1000px;float: top;left: 300px"
       >
        <h2 style="margin: auto">新建</h2><br>
        <p>输入新建收藏夹名称</p>
        <el-input v-model="newFavoritesName"></el-input>
        <div style="text-align: center">
        <el-button type="primary" @click="createFavorites">确认</el-button>
        <el-button @click="createElVisible=false">关闭</el-button>
        </div>
      </el-dialog>

      <el-dialog
          :visible="deleteElVisible"
          style="width: 1000px;float: top;left: 300px;"
      >
        <h2 style="margin: auto">删除</h2>
        <el-select v-model="deleteFavoritesName" placeholder="请选择要删除的收藏夹" style="left: 70px;width: 300px">
          <el-option
              v-for="item in favorites"
              :key="item.label"
              :label="item.label"
              :value="item.label">
          </el-option>
        </el-select>
        <div style="text-align: center;float: bottom" >
          <el-button type="primary" @click="deleteFavorites">确认</el-button>
          <el-button @click="deleteElVisible=false">关闭</el-button>
        </div>
      </el-dialog>

    </div>
</template>

<script>
import axios from "axios"
//import Schart from "vue-schart";
export default {
  name: "Favorites",
  components: {
    // Schart,
  },
  data() {
    return {
      favorIDs: [],// favor_id
      favorites: [],//value label
      items: [
        {
          value: 1,
          label: "收藏夹1"
        },
        {
          value: 2,
          label: "收藏夹2"
        },
        {
          value: 3,
          label: "收藏夹3"
        }
      ],
      createElVisible: false,
      deleteElVisible: false,
      newFavoritesName: "",
      deleteFavoritesName: ""
    }
  },
  methods:
      {
        getContent(val) {
          localStorage.setItem("favorites_num", val);
          this.$router.push("/FavoritesContent");
        },
        deleteFavorites() {
          for(let i=0;i<this.favorites.length;i++)
          {
            if(this.favorites[i].label==this.deleteFavoritesName)
            {
              axios.delete("http://49.234.18.247:8080/api/HasFavorites/"+this.favorites[i].id);
              this.deleteElVisible=false;
              return;
            }
          }
        },
        createFavorites() {
          this.items.push({value: this.items.length, label: this.newFavoritesName});
          this.createElVisible = false;

          let newID = this.setFavorID();
          let userID = localStorage.getItem("ms_username");
          let newCapacity = 10;
          axios.post("http://49.234.18.247:8080/api/Favorites",
              {
                "favoR_ID": newID,
                "favoR_NAME": this.newFavoritesName,
                "favoR_CONTENT_NUM": newCapacity
              }).then(() => {
                axios.post("http://49.234.18.247:8080/api/HasFavorites",
                    {
                      "favoR_ID": newID,
                      "useR_ID": userID
                    });
              }
          )
        },
        setFavorID() {

          let chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
          let ID = '';
          for (let i = 0; i < 10; i++) {
            let id = Math.ceil(Math.random() * 9);
            ID += chars[id];
          }
          return ID;

        },
      },
        created() {
          axios.get("http://49.234.18.247:8080/api/HasFavorites")
              .then((response) => {
                let t = response.data;
                console.log(t)
                let n = localStorage.getItem("ms_username")
                for (let i = 0; i < t.length; i++) {
                  if (n == t[i].useR_ID) {
                    this.favorIDs.push(t[i].favoR_ID)
                  }
                }
                axios.get("http://49.234.18.247:8080/api/Favorites")
                    .then((response) => {
                      let t = response.data;
                      let k = 0;
                      for (let i = 0; i < this.favorIDs.length; i++) {
                        for (let j = 0; j < t.length; j++) {
                          if (t[j].favoR_ID == this.favorIDs[i]) {
                            this.favorites.push({id: t[j].favoR_ID, value: k + 1, label: t[j].favoR_NAME});
                            k = k + 1;
                          }
                        }
                      }
                      console.log(this.favorites[0])
                    })
              })

        },

}
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
