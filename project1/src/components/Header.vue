<template>
  <el-header height="121px">
    <div class="upheader">
      <div class="logo margin1">LVDAO</div>
      <div class="nav1">
        <ul>
          <li><div class="el-icon-question questionMark"></div></li>
          <li>
            <div
              class="profile"
              :style="{
                backgroundImage:
                  'url(' + (coverImgUrl ? coverImgUrl : baseImg) + ')',
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat',
              }"
            ></div>
          </li>
          <li>
            <div class="pull">
              <el-dropdown>
                <span class="el-dropdown-link"
                  ><i class="el-icon-arrow-down"></i>
                </span>
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
    </div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu margin1"
      mode="horizontal"
      @select="handleSelect"
      background-color="#003680"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="1"
        ><router-link to="/hotel">酒店</router-link></el-menu-item
      >
      <el-menu-item index="2"
        ><router-link to="/attraction">景点</router-link></el-menu-item
      >
      <el-menu-item index="3"
        ><router-link to="/tickets">机/车票</router-link></el-menu-item
      >
    </el-menu>
  </el-header>
</template>


<script>
export default {
  name: "Header",
};
</script>

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

.nav1 {
  float: left;
  margin-left: 60%;
}

.nav1 ul li {
  float: left;
}

.nav1 ul li a {
  display: block;
  height: 40px;
  line-height: 40px;
  padding: 0 10px;
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

.margin1 {
  margin-left: 6%;
}

.questionMark {
  font-size: 30px;
}

.profile {
  margin-left: 10px;
  width: 30px;
  height: 30px;
  border-radius: 15px;
}
.pull {
  width: 20px;
  height: 20px;
  font-size: 10px;
  padding-top: 10px;
}
</style>

<script>
export default {
  props: {
    activeIndex: "1",
  },
  data() {
    return {
      baseImg:
        "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80",
      coverImgUrl: "",
    };
  },
};
</script>
