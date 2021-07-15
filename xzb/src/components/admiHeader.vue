<template>
    <el-header height="120px">
    <div class="upheader">
      <router-link to="/">
       <i class="el-icon-s-custom" id="personinfo">账户信息</i>
        </router-link>
      <div class="logo margin1">
        ADMINISTRATOR
        </div>

    </div>
    <el-menu
      class="el-menu margin1"
      mode="horizontal"
      background-color="#003680"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="1"
        ><router-link to="/audit">审核动态信息</router-link></el-menu-item
      >
      <el-menu-item index="2"
        ><router-link to="/updateQA">更新常见问题</router-link></el-menu-item
      >
      <el-menu-item index="3"
        ><router-link to="/sendmail">发送邮件通知</router-link></el-menu-item
      >
    </el-menu>
  </el-header>
</template>
<script>
export default {
  name: "admiHeader",
};
</script>