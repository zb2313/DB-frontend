<template>
  <el-container class="home-container">
    <!--头部区域-->
  <el-header>
    <div>
      <img src="../assets/dongtai.png" alt="">
      <span>用户动态</span>
    </div>
    <el-button type="info" icon="el-icon-back" >返回 </el-button>
  </el-header>
  <!--页面主体区域-->
  <el-container>
    <!-- 侧边栏 -->
    <el-aside width="200px">
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
      <el-submenu index="1">
        <!-- 一级菜单模板区 -->
        <template slot="title">
          <!-- 图标 -->
          <i class="el-icon-location"></i>
          <!-- 文本 -->
          <span>筛选地区</span>
        </template>
        <!-- 二级菜单 -->
        <el-menu-item index="1-1">
           <!-- 二级菜单模板区 -->
        <template slot="title">
          <!-- 图标 -->
          <i class="el-icon-location"></i>
          <!-- 文本 -->
          <span>上海</span>
          </template>
        </el-menu-item>

        <!-- 二级菜单 -->
        <el-menu-item index="1-2">
           <!-- 二级菜单模板区 -->
        <template slot="title">
          <!-- 图标 -->
          <i class="el-icon-location"></i>
          <!-- 文本 -->
          <span>北京</span>
          </template>
        </el-menu-item>

        <el-menu-item index="1-3">
           <!-- 二级菜单模板区 -->
        <template slot="title">
          <!-- 图标 -->
          <i class="el-icon-location"></i>
          <!-- 文本 -->
          <span>广州</span>
          </template>
        </el-menu-item>

        <el-menu-item index="1-4">
           <!-- 二级菜单模板区 -->
        <template slot="title">
          <!-- 图标 -->
          <i class="el-icon-location"></i>
          <!-- 文本 -->
          <span>深圳</span>
          </template>
        </el-menu-item>
      </el-submenu>
      
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
      <router-view></router-view>
    </el-main> 
  </el-container>
</el-container>
</template>

<style scopend>
.home-container{
  height :100vh;
}
.el-header{
  background-color: #3093a588;
  display:flex;
  justify-content: space-between;
  align-items: center;
  color: #FFF;
  font-size: 20px;
  
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
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      //获取所有菜单
      getMenuList(){},
      //点击按钮，切换菜单折叠状态
      toggleCollapse(){
        this.isCollapse =!this.isCollapse;
      },
    }
  }
</script>