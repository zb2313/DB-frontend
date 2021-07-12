<template>

<el-container>
  <!-- 头部区域 -->
  <el-header>
    <el-button type="primary" icon="el-icon-back" @click="goBack">返回 </el-button>
  </el-header>
</el-container>
</template>
<script>
  export default {
    methods: {
      goBack() {
        this.$router.push('/')
      }
    }
  }
 </script>