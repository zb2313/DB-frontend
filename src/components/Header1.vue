<template>
  <el-header height="100px">
    <router-link to="/homepage"><div class="logo">LVDAO</div></router-link>

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
  </el-header>
</template>

<style scoped>
.el-header {
  background-color: #003680;
  color: white;
  padding: 0 8%;
}

.logo {
  width: 170px;
  height: 80px;
  font-family: "Microsoft YaHei";
  font-size: 38px;
  text-align: left;
  line-height: 80px;
  float: left;
}
.nav1 {
  float: right;
  margin-left: 55%;
  margin-top: 10px;
}
.nav1 ul li {
  float: left;
}

.Mark {
  font-size: 30px;
}

.profile {
  display: inline-block;
  margin-left: 12px;
  width: 30px;
  height: 30px;
  border-radius: 15px;
}
</style>

<script>
export default {
  name: "Header1",
  data() {
    return {
      maxMsg: "99",
      msgValue: "20",
      baseImg:
        "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80",
      coverImgUrl: "",
    };
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
  },
  created() {this.$axios
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
