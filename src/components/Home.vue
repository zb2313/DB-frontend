<template>
  <el-container class="home-container" direction="vertical">
    <!--头部区域-->
  <Header1/>
  <!--页面主体区域-->
  <el-container>
    <!-- 侧边栏 -->
    <el-aside width=240px>
      <!-- 侧边栏菜单区域 -->
      <el-menu
      text-color="#black"
      active-text-color="#224EFF"
      router>
      <!-- 一级菜单 -->
      <el-menu-item index="1">
        <!-- 一级菜单模板区 -->
        <template slot="title">
          <!-- 图标 -->
          <i class="el-icon-menu"></i>
          <!-- 文本 -->
          <span>动态列表</span>
        </template>
      </el-menu-item>
      <!-- 发送动态路由 -->
      <el-menu-item index="2">
        <!-- 一级菜单模板区 -->
        <template slot="title" >
          <!-- 图标 -->
         <i class="el-icon-share"></i>
          <!-- 文本 -->
           <span>发送动态</span>
        </template>
      </el-menu-item>
        <!-- 查看动态路由  -->
       <el-menu-item index="3">
        <!-- 一级菜单模板区 -->
        <template slot="title" >
          <!-- 图标 -->
          <i class="el-icon-check"></i>
          <!-- 文本 -->
          <span>查看动态</span>
        </template>
      </el-menu-item>
    </el-menu>
    </el-aside>
    <!-- 右侧内容主体 -->
    <el-main>
      <!-- 路由占位符 -->
      <router-view></router-view>

    </el-main>
  </el-container>
</el-container>
</template>

<style scopend>
.home-container{
  height :100vh;
}
.el-header {
  background-color: #003680;
  color: white;
  text-align: center;
}
.upheader {
  height: 60px;
}

.logo {
  width: 200px;
  height: 60px;
  font-family: "Microsoft YaHei";
  font-size: 38px;
  text-align: left;
  line-height: 60px;
  text-indent: 1em;
  float: left;
}
.el-aside{
  background-color: white;

}

.el-main{
  background-color: #EAEDF1;
}
</style>

<script>
import Header1 from "@/components/Header1.vue";
  export default {
    components:{
      Header1
    },
     data () {

      return {
      }
    },
    methods: {
      getMenuList(){},
      //点击按钮，切换菜单折叠状态
    }
  }
</script>
