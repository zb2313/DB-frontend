<template>
  <div class="page" id="form">
    <el-tabs type="border-card" id="page">
      <el-tab-pane>
        <span slot="label"><i class="el-icon-user"></i> 基础信息</span>
        <el-table-column>
          <br />
          <span>管理员昵称： </span>
          <span>{{ 用户昵称 }} </span>
        </el-table-column>
        <el-table-column>
          <br /><br />
          <span>管理员头像： </span>
          <el-avatar :size="100" :src="avatorurl"></el-avatar>
        </el-table-column>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label"><i class="el-icon-edit"></i>修改信息</span>
        <el-form>
          <el-form-item>
            <div id="input">
              <el-input
                maxlength="10"
                show-word-limit
                v-model="input"
                placeholder="请输入昵称"
              ></el-input>
            </div>
          </el-form-item>
          <el-form-item>
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">提交</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<style>
.el-container {
  position: relative;
  top: 15px;
  left: 15px;
}
#page {
  margin-top: 10px;
  height: 320px;
}
#form {
  width: 60%;
}
#input {
  width: 60%;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  top: 10px;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 90px;
  height: 90px;
  line-height: 90px;
  text-align: center;
}
.avatar {
  width: 90px;
  height: 90px;
  display: block;
}
</style>
<script>
export default {
  data() {
    return {
      imageUrl: "",
      input: "",
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
};
</script>