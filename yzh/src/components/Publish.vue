<template>
<el-container>
  <!-- 头部区域 -->
  <el-header class="PublishHead">
    <el-button type="primary" icon="el-icon-back" @click="goBack">返回 </el-button>
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
                  :value="item.value">
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
// Local Registration
import axios from "axios";
import qs from "qs"; // post请求传form-data要转换
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
axios.defaults.baseURL = "http://127.0.0.1:8081";
export default {
  name: "pulishNav",
  data() {
    return {
      md: "", // 文章内容
      // 地址分类
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
      value: '', // 地址选择
      // textarea: "",     // 简介
      OssUrl: "", // 图片上传aliyun返回的url
      html: "", // markdown解析成html
    };
  },
  methods:{
      goBack() {
        this.$router.push('/')
      },
    PublishButton() {
      if (this.md) {
        if(this.value){
        // 获取文章之后的处理逻辑
        this.$axios
          .post(
            "http://49.234.18.247:8080/api/Moment/",
            // 构造请求参数form-data
            // qs.stringify({
            //   value: this.value,
            //   ossUrl: this.OssUrl,
            //   html: this.html,
            //   status: true,
            //   md: this.md
            // })

          )
          .then(function(response) {
            console.log("res:", response);
            if (response.data.code === 1000) {
              alert("文章发布成功！");
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
      else {
        alert("地址不能为空！");
          }
      }
        else {
        alert("文章内容不能不空！");
      }
    },
    // 保存文章
    PublishSave() {
      if (this.md && this.value) {
        // 获取文章之后的处理逻辑
        this.$axios
          .post(
            "",
            // 构造请求参数form-data
            qs.stringify({
              value: this.value,
              ossUrl: this.OssUrl,
              html: this.html,
              status: false,
              md: this.md
            })
          )
          .then(function(response) {
            alert("文章保存为草稿！");
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        alert("内容不能为空！");
      }
    },
    $imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData();
      formdata.append("upload", $file);
      this.$axios({
        url: "http://127.0.0.1:8081/api/v1/upload",
        method: "post",
        data: formdata,
        headers: { "Content-Type": "multipart/form-data" }
      }).then(data => {
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        /**
         * $vm 指为mavonEditor实例，可以通过如下两种方式获取
         * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
         * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
         */
        // console.log(data)
        // 将后端返回的url替换到文本原位置
        this.$refs.md.$img2Url(pos, data.data.imgurl);
        // $vm.$img2Url(pos, url);
      });
    },
    // 所有操作都会被解析重新渲染
    change(value, render) {
      // render 为 markdown 解析后的结果[html]
      this.html = render;
    },
  },
  comments: mavonEditor,
  // 钩子 组件加载后运行 查询所有分类
  created: function() {
    // 组件创建之后
    // 在created这个方法中可以操作后端的数据  数据驱动试图
    // 应用：发起Ajax请求

    this.$axios
      .get("")
      .then(res => {
        // 校验后端返回的code
        if (res.data.code === 1000) {
          this.options = res.data.categoryList;
          console.log(res.data.categoryList);
        } else {
          alert("数据获取失败");
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
}
</script>
<style scoped>
#editor {
  margin: auto;
  width: 100%;
  height: 700px;
}
.PublishHead button{
    display: block;
    float: right;
    justify-content: center;
    align-content: center;
    margin-top: 10px;
}
.el-row {
  margin-bottom: 20px;
}
</style>