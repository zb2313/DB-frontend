<template>
  <div id="app">

    <router-link to="/Login"
    >登录</router-link
    >
    ####
    <router-link to="/Register"
    >注册</router-link
    >
    ####
    <router-link to="/PersonalPage">
      个人界面
    </router-link>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {

  },
  data() {
    return {
      num: 1
    };
  },
  methods: {
    handleChange(value) {
      console.log(value);
    }
  }

}
</script>

<style scoped>

</style>
