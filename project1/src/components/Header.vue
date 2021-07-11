<template>
  <el-header height="120px">
    <div class="upheader">
      <div class="logo margin1">LVDAO</div>
      <div class="nav1">
        <ul>
          <li><a href="#">帮助</a></li>
          <li><a href="#">登录</a></li>
          <li><a href="#">注册</a></li>
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
  margin-left: 51%;
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
</style>

<script>
export default {
  props: {
    activeIndex: "1",
  },
};
</script>
