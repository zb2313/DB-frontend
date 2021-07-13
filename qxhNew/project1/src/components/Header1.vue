<template>
  <el-header height="80px">
    <router-link to="/hotel"><div class="logo">LVDAO</div></router-link>

    <div class="nav1">
      <ul>
        <li>
          <router-link to="/questions"
            ><div class="el-icon-question Mark"></div
          ></router-link>
        </li>
        <li>
          <el-badge :value="msgValue" :max="maxMsg" class="item">
            <div class="el-icon-bell Mark" style="margin-left: 8px"></div>
          </el-badge>
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
                <el-dropdown-item>管理账户</el-dropdown-item>
                <el-dropdown-item>订单</el-dropdown-item>
                <el-dropdown-item>收藏</el-dropdown-item>
                <el-dropdown-item divided>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </li>
      </ul>
    </div>
  </el-header>
</template>

<style scoped>
html,
body,
#app {
  height: 100%;
  margin: 0px;
  padding: 0px;
}

.el-header {
  background-color: #003680;
  color: white;
  text-align: center;
}

.logo {
  width: 200px;
  height: 80px;
  font-family: "Microsoft YaHei";
  font-size: 38px;
  text-align: left;
  line-height: 80px;
  text-indent: 1em;
  float: left;
  margin-left: 6%;
}

.nav1 {
  float: left;
  margin-left: 55%;
  margin-top: 10px;
}

.nav1 ul li {
  float: left;
}

li {
  list-style: none;
}

a:link {
  text-decoration: none;
  color: white;
}

a:visited {
  color: white;
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
};
</script>
