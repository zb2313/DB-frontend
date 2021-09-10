<template>
  <div>
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script>
export default {
  mounted() {
    window.onload = function () {
      console.log(window.sessionStorage["ISlogin"]);
      if (!window.sessionStorage["ISlogin"]) {
        // 关闭浏览器
        window.localStorage.removeItem("ms_username");
      } else {
        // 刷新
      }
    };
    window.onunload = function () {
      window.sessionStorage["ISlogin"] = true;
    };
    window.onbeforeunload = function () {
      window.sessionStorage["ISlogin"] = true;
    };
  },
};
</script>

<style>
html,
body,
#app {
  height: 100%;
  margin: 0px;
  padding: 0px;
}
ul {
  padding: 0px;
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

.main {
  width: 1100px;
  margin: 0px auto;
}

/* 这个东西比较特别只能在这设置 */
.el-popover {
  min-width: 50px !important;
  padding: 8px !important;
}

/* 定义 my-red 主题 */

.amap-ui-control-theme-my-red .amap-ui-control-layer {
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.4);
  background: #25a5f7;
}

.amap-ui-control-theme-my-red .amap-ui-control-layer-expanded {
  color: #fff;
  background: #25a5f7;
}

.amap-ui-control-theme-my-red .amap-ui-control-layer-toggle {
  color: #fff;
}

.content-window-card {
  position: relative;
  box-shadow: none;
  bottom: 0;
  left: 0;
  width: auto;
  padding: 0;
  text-align: left;
}

.content-window-card p {
  height: 2rem;
}

.custom-info {
  border: solid 1px silver;
}

.info-top {
  position: relative;
  background: none repeat scroll 0 0 #f9f9f9;
  border-bottom: 1px solid #ccc;
  border-radius: 5px 5px 0 0;
}

.info-top div {
  display: inline-block;
  color: #333333;
  font-size: 14px;
  font-weight: bold;
  line-height: 31px;
  padding: 0 10px;
}

.info-top img {
  position: absolute;
  top: 10px;
  right: 10px;
  transition-duration: 0.25s;
}

.info-top img:hover {
  box-shadow: 0px 0px 5px #000;
}

.info-middle {
  font-size: 12px;
  padding: 10px 6px;
  padding-bottom: 20px;
  line-height: 20px;
}
.info-middle .pic {
  margin-top: 2px;
  width: 100px;
  height: 70px;
}
.info-middle .star {
  font-size: 18px;
  color: gold;
}
.info-middle a {
  color: rgb(24, 135, 226);
  margin-left: 10px;
}
.info-bottom {
  height: 0px;
  width: 100%;
  clear: both;
  text-align: center;
}

.info-bottom img {
  position: relative;
  z-index: 104;
}

.info-middle img {
  float: left;
  margin-right: 6px;
}

.order .el-dialog__body {
  padding: 0px 25px 25px 25px !important;
  color: #606266;
  font-size: 14px;
  word-break: break-all;
}

.content-box {
  padding-bottom: 0px !important;
}
</style>
