<template>
  <div>
    <div style="margin: auto">
      <el-button icon="el-icon-circle-plus" @click="open">新建收藏夹</el-button>
      <el-button icon="el-icon-delete" @click="deleteElVisible = true"
        >删除收藏夹</el-button
      >
    </div>

    <li
      v-for="item in favorites"
      :key="item"
      style="list-style: none; display: inline-block"
      @click="getContent(item.id)"
    >
      <el-card style="margin: 20px 20px; width: 450px; height: 90px">
        <p class="title">{{ item.label }}</p>
        <p class="number">共{{ item.num }}项</p>
      </el-card>
    </li>

    <el-dialog
      title="删除"
      :visible.sync="deleteElVisible"
      width="400px"
      :before-close="handleClose"
    >
      <el-select
        v-model="deleteFavoritesName"
        placeholder="请选择要删除的收藏夹"
      >
        <el-option
          v-for="item in favorites"
          :key="item.label"
          :label="item.label"
          :value="item.label"
        >
        </el-option>
      </el-select>

      <div class="buttonBox">
        <el-button class="button" type="primary" @click="deleteFavorites"
          >确认</el-button
        >
        <el-button class="button" @click="deleteElVisible = false"
          >关闭</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Favorites",
  components: {},
  data() {
    return {
      favorIDs: [], // favor_id
      favorites: [], //value label
      deleteElVisible: false,
      newFavoritesName: "",
      deleteFavoritesName: "",
    };
  },
  methods: {
    //颜色对象
    getRandomColor() {
      this.r = Math.floor(Math.random() * 255);
      this.g = Math.floor(Math.random() * 255);
      this.b = Math.floor(Math.random() * 255);
      this.color = "rgba(" + this.r + "," + this.g + "," + this.b + ",0.8)";
    },
    open() {
      this.$prompt("输入新建收藏夹名称", "创建", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
          let newID = this.setFavorID();
          let userID = localStorage.getItem("ms_username");
          this.favorites.push({
            id: newID,
            value: this.favorites.length,
            label: value,
          });
          axios
            .post("http://49.234.18.247:8080/api/Favorites", {
              favoR_ID: newID,
              favoR_NAME: value,
              favoR_CONTENT_NUM: 0,
            })
            .then(() => {
              axios.post("http://49.234.18.247:8080/api/HasFavorites", {
                favoR_ID: newID,
                useR_ID: userID,
              });
            });
          this.$message({
            type: "success",
            message: value + "已成功创建",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
    handleClose() {
      this.deleteElVisible = false;
      this.$message({
        type: "info",
        message: "放弃删除",
      });
    },
    getContent(val) {
      localStorage.setItem("favorites_num", val);
      this.$router.push("/FavoritesContent");
    },
    deleteFavorites() {
      for (let i = 0; i < this.favorites.length; i++) {
        if (this.favorites[i].label == this.deleteFavoritesName) {
          axios.delete(
            "http://49.234.18.247:8080/api/HasFavorites/" + this.favorites[i].id
          );
          this.deleteElVisible = false;
          this.favorites.splice(i, 1);
          return;
        }
      }
    },
    createFavorites() {
      let newID = this.setFavorID();
      let userID = localStorage.getItem("ms_username");
      this.favorites.push({
        id: newID,
        value: this.favorites.length,
        label: this.newFavoritesName,
      });
      axios
        .post("http://49.234.18.247:8080/api/Favorites", {
          favoR_ID: newID,
          favoR_NAME: this.newFavoritesName,
          favoR_CONTENT_NUM: 0,
        })
        .then(() => {
          axios.post("http://49.234.18.247:8080/api/HasFavorites", {
            favoR_ID: newID,
            useR_ID: userID,
          });
        });
    },
    setFavorID() {
      let chars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
      let ID = "";
      for (let i = 0; i < 10; i++) {
        let id = Math.ceil(Math.random() * 9);
        ID += chars[id];
      }
      return ID;
    },
  },
  created() {
    axios.get("http://49.234.18.247:8080/api/HasFavorites").then((response) => {
      let t = response.data;
      let n = localStorage.getItem("ms_username");
      for (let i = 0; i < t.length; i++) {
        if (n == t[i].useR_ID) {
          this.favorIDs.push(t[i].favoR_ID);
        }
      }
      axios.get("http://49.234.18.247:8080/api/Favorites").then((response) => {
        let t = response.data;
        let k = 0;
        for (let i = 0; i < this.favorIDs.length; i++) {
          for (let j = 0; j < t.length; j++) {
            if (t[j].favoR_ID == this.favorIDs[i]) {
              this.favorites.push({
                id: t[j].favoR_ID,
                value: k + 1,
                label: t[j].favoR_NAME,
                num: t[j].favoR_CONTENT_NUM,
              });
              k = k + 1;
            }
          }
        }
      });
    });
  },
};
</script>

<style scoped>
.buttonBox {
  margin-top: 15px;
  text-align: left;
}
.button {
  width: 60px;
  height: 30px;
  line-height: 0;
  padding: 0;
}
.title {
  font-size: 20px;
  color: #003680;
  font-weight: 700;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
}
.number {
  margin-top: 5px;
  margin-left: 2px;
  font-size: 14px;
}
li:hover {
  cursor: pointer;
}
</style>
