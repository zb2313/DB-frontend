<template>
  <el-container>
    <!-- 头部区域 -->
    <el-header>
      <el-button type="primary" icon="el-icon-back" @click="goBack"
        >返回
      </el-button>
    </el-header>
    <el-main>
      <el-row :gutter="3">
        <el-col>
          <div id="editor">
            <mavon-editor
              style="height: 100%"
              v-model="md"
              ref="md"
              @imgAdd="$imgAdd"
              @change="change"
            ></mavon-editor>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-select
            v-model="value"
            filterable
            placeholder="请选择所在位置"
            style="width: 50%"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col>
      </el-row>
    </el-main>
    <el-footer>
      <el-row :gutter="3">
        <el-col>
          <el-button type="success" @click="PublishButton">文章发布</el-button>
          <el-button type="primary" @click="PublishSave">保存草稿</el-button>
        </el-col>
      </el-row>
    </el-footer>
  </el-container>
</template>

<script>
export default {
  name: "pulishNav",
  data() {
    return {
      md: "", // 文章内容
      // 地址分类
      options: [
        {
          value: 1,
          label: "上海",
        },
        {
          value: 2,
          label: "北京",
        },
        {
          value: 3,
          label: "广州",
        },
        {
          value: 4,
          label: "深圳",
        },
        {
          value: 5,
          label: "西安",
        },
      ],
      value: "", // 地址选择
      // textarea: "",     // 简介
      OssUrl: "", // 图片上传aliyun返回的url
      html: "", // markdown解析成html
      fileList: [
        {
          name: "demo.jpeg",
          url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
      ],
    };
  },
  methods: {
    goBack() {
      this.$router.push("/");
    },
  },
};
</script>
<style scoped>
#editor {
  margin: auto;
  width: 100%;
  height: 700px;
}

.el-row {
  margin-bottom: 20px;
}
</style>