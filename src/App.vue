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
</style>
