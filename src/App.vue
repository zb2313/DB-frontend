<template>
  <div>
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script>
export default {};
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

.el-notification.right {
  right: 20%;
}
</style>
