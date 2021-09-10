<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      background-color="#324157"
      text-color="#bfcbd9"
      active-text-color="#20a0ff"
      unique-opened
      router
    >
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template #title>
              <i :class="item.icon"></i>
              <span>{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu
                v-if="subItem.subs"
                :index="subItem.index"
                :key="subItem.index"
              >
                <template #title>{{ subItem.title }}</template>
                <el-menu-item
                  v-for="(threeItem, i) in subItem.subs"
                  :key="i"
                  :index="threeItem.index"
                >
                  {{ threeItem.title }}</el-menu-item
                >
              </el-submenu>
              <el-menu-item v-else :index="subItem.index" :key="subItem.index"
                >{{ subItem.title }}
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            <template #title>{{ item.title }}</template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          icon: "el-icon-s-custom",
          index: "/dashboard",
          title: "个人信息",
        },

        {
          icon: "el-icon-s-grid",
          index: "/HistoryOrder",
          title: "历史订单",
          subs: [
            {
              index: "/AttractionOrder",
              title: "景点门票",
            },
            {
              index: "/TrafficOrder",
              title: "交通票",
            },
            {
              index: "/HotelOrder",
              title: "酒店订单",
            },
          ],
        },

        {
          icon: "el-icon-tickets",
          index: "/myplan",
          title: "我的攻略",
        },
        {
          icon: "el-icon-document-copy",
          index: "/AnnualReport",
          title: "年度报告",
        },
        {
          icon: "el-icon-s-comment",
          index: "/tabs",
          title: "通知",
        },
        {
          icon: "el-icon-s-promotion",
          index: "3",
          title: "编辑与上传",
          subs: [
            {
              index: "/form",
              title: "修改个人信息",
            },
            {
              icon: "el-icon-edit-outline",
              index: "/travelplan",
              title: "创建攻略",
            },
          ],
        },
        {
          icon: "el-icon-s-management",
          index: "/Favorites",
          title: "收藏",
        },
        {
          icon: "el-icon-s-check",
          index: "7",
          title: "错误处理",
          subs: [
            {
              index: "/permission",
              title: "权限测试",
            },
            {
              index: "/404",
              title: "404页面",
            },
          ],
        },
        {
          icon: "el-icon-s-opportunity",
          index: "/donate",
          title: "使用帮助",
        },
      ],
      onRoutes: "",
    };
  },
  created() {
    this.onRoutes = this.$route.path;
  },
};
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}
.sidebar > ul {
  height: 100%;
}
</style>
