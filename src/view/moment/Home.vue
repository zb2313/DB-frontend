<template>
  <el-container direction="vertical">
    <!--头部区域-->
    <Header1 />
    <!--页面主体区域-->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="220px">
        <!-- 侧边栏菜单区域 -->
        <el-menu
          background-color="#3a5a74"
          text-color="#fff"
          active-text-color="#224EFF"
          router
          :collapse="isCollapse"
          :collapse-transition="false"
        >
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

          <!-- 新建动态路由 -->
          <el-menu-item index="2">
            <!-- 一级菜单模板区 -->
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-share"></i>
              <!-- 文本 -->
              <span>新建动态</span>
            </template>
          </el-menu-item>

          <!--查看动态路由  -->
          <el-menu-item index="4">
            <!-- 一级菜单模板区 -->
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-check"></i>
              <!-- 文本 -->
              <span>查看评论</span>
            </template>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main> </el-main>
    </el-container>
  </el-container>
</template>

<style scopend>
.el-aside {
  background-color: #3a5a74;
}

.el-main {
  background-color: #eaedf1;
}
</style>

<script>
import Header1 from "@/components/Header1";
export default {
  components: {
    Header1,
  },
  data() {
    return {
      isCollapse: false,
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    //获取所有菜单
    getMenuList() {},
  },
};
</script>