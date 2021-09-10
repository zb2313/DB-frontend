<template>
  <el-header height="120px">
    <!-- header的上半部分 -->
    <div class="upheader" style="height: 60px">
      <!-- Logo -->
      <router-link to="/Homepage"><div class="logo">LVDAO</div></router-link>

      <!-- 顶部导航栏 -->
      <div class="nav1">
        <ul>
          <li>
            <router-link to="/questions"
              ><div class="el-icon-question Mark"></div
            ></router-link>
          </li>
          <li>
            <router-link to="/tabs">
              <el-badge is-dot class="item">
                <div class="el-icon-bell Mark" style="margin-left: 8px"></div>
              </el-badge>
            </router-link>
          </li>
          <li>
            <div class="pull">
              <el-dropdown>
                <div
                  class="profile"
                  :style="{
                    backgroundImage:
                      'url(' + (coverImgUrl ? coverImgUrl : baseImg) + ')',
                    backgroundSize: '100% 100%',
                    backgroundRepeat: 'no-repeat',
                  }"
                ></div>
                <el-dropdown-menu slot="dropdown">
                  <router-link to="/dashboard">
                    <el-dropdown-item>管理账户</el-dropdown-item></router-link
                  >
                  <router-link to="/AttractionOrder"
                    ><el-dropdown-item>订单</el-dropdown-item></router-link
                  >
                  <router-link to="/Favorites"
                    ><el-dropdown-item>收藏</el-dropdown-item></router-link
                  >
                  <router-link to="/Moment"
                    ><el-dropdown-item>动态</el-dropdown-item></router-link
                  >
                  <router-link to="/Login"
                    ><el-dropdown-item divided
                      >退出登录</el-dropdown-item
                    ></router-link
                  >
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="menubox">
      <el-menu
        :default-active="activeIndex"
        mode="horizontal"
        background-color="#003680"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="0"
          ><router-link class="url" to="/Homepage"
            >首页</router-link
          ></el-menu-item
        >
        <el-menu-item index="1"
          ><router-link class="url" to="/hotel">酒店</router-link></el-menu-item
        >
        <el-menu-item index="2"
          ><router-link class="url" to="/attraction"
            >景点</router-link
          ></el-menu-item
        >
        <el-menu-item index="3"
          ><router-link class="url" to="/tickets"
            >机/车票</router-link
          ></el-menu-item
        >
        <el-menu-item index="4"
          ><router-link class="url" to="/strategy"
            >攻略</router-link
          ></el-menu-item
        >
      </el-menu>
    </div>
  </el-header>
</template>

<style scoped>
.url {
  display: block;
  width: 100%;
  height: auto;
}
.el-header {
  background-color: #003680;
  color: white;
  padding: 0 8%;
}

.logo {
  width: 200px;
  height: 60px;
  font-family: "Microsoft YaHei";
  font-size: 38px;
  text-align: left;
  line-height: 70px;
  float: left;
}
.nav1 {
  float: right;
  height: 60px;
  width: 116px;
}

.nav1 ul li {
  float: left;
  margin-top: 18px;
  height: 40px;
}

.menubox {
  height: 60px;
}
.el-menu {
  border-right: none;
  border-bottom: none;
}
.Mark {
  font-size: 30px;
}

.profile {
  margin-left: 12px;
  width: 30px;
  height: 30px;
  border-radius: 15px;
}
</style>

<script>
export default {
  name: "Header",
  props: {
    activeIndex: {
      type: String,
      default: "1",
    },
  },
  data() {
    return {
      maxMsg: "99",
      msgValue: "20",
      baseImg:
        "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80",
      coverImgUrl: "",
    };
  },
  mounted() {
    this.$axios
      .get(
        "http://49.234.18.247:8080/api/Portrait/" +
          localStorage.getItem("ms_username")
      )
      .then((response) => {
        this.coverImgUrl = response.data;
      });
  },
};
</script>
