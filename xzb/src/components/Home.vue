<template>
  <el-container class="home-container">
    <!--头部区域-->
  <el-header height="120px">
    <div class="upheader">
      <div class="logo margin1">LVDAO</div>
      <div class="HomeTitle">动态页面</div>
    </div>
    <el-menu
      class="el-menu margin1"
      mode="horizontal"
      background-color="#003680"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
    <el-menu-item index="2"
        ><router-link to="/2">发送动态</router-link></el-menu-item
      >
      <el-menu-item index="3"
        ><router-link to="/3">查看评论</router-link></el-menu-item
      >
    </el-menu>
  </el-header>
  <!--页面主体区域-->
  <el-container>
    <!-- 侧边栏 -->
    <el-aside :width="isCollapse?'64px':'200px'">
      <div class="toggle-button" @click="toggleCollapse">|||</div>
      <!-- 侧边栏菜单区域 -->
      <el-menu
      background-color= "#333333"
      text-color="#fff"
      active-text-color="#224EFF"
      router
      :collapse=isCollapse
      :collapse-transition=false>
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
        <!--查看动态路由  -->
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
      <el-scrollbar style="height=100%">
      <router-view></router-view>
      </el-scrollbar>
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
.HomeTitle{
  text-align: center;
  line-height: 60px;
  font-size: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
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
  background-color: #333333;
}

.el-main{
  background-color: #EAEDF1;
}
/* 折叠按钮样式 */
.toggle-button{
  background-color: #6F6F6F;
  font-size: 10px;
  line-height: 24px;
  color: #FFF;
  text-align: center;
  letter-spacing: 0.2em;
  cursor:pointer;

}
</style>

<script>
  export default { 
     data () {
      return {
         isCollapse: false
      }
    },
    methods: {
      // handleOpen(key, keyPath) {
      //   console.log(key, keyPath);
      // },
      // handleClose(key, keyPath) {
      //   console.log(key, keyPath);
      // },
      //获取所有菜单
      getMenuList(){},
      //点击按钮，切换菜单折叠状态
      toggleCollapse(){
        this.isCollapse =!this.isCollapse;
      },
    }
  }
</script>