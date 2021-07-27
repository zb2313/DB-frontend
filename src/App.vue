<template>
  <div>
    <router-view :key="$route.fullPath"/>
  </div>
</template>

<script>
export default {

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

.el-container {
  height: 100%;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}
.main {
  width: 1100px;
  margin: 0px auto;
}

.left {
  width: 250px;
  float: left;
}

.right {
  float: left;
  width: 800px;
  margin-left: 50px;
  text-align: left;
}

.title {
  font-size: 20px;
  text-align: left;
}

.form2 {
  margin-top: 15px;
  border-radius: 5px;
  border: 1px solid rgb(189, 178, 178);
  margin-bottom: 40px;
}

.labelForForm2 {
  height: 40px;
  border-bottom: 1px solid rgb(189, 178, 178);
  line-height: 40px;
  font-size: 18px;
  font-weight: 700;
  text-align: left;
  text-indent: 5px;
}

.form2 p {
  font-size: 15px;
  text-align: left;
  text-indent: 25px;
}

.select {
  height: 50px;
  line-height: 50px;
}

.select button {
  width: 80px;
}

.budget,
.grade {
  border-bottom: 1px solid rgb(189, 178, 178);
}

.el-checkbox {
  margin-bottom: 18px;
}

.el-checkbox-group {
  padding-left: 60px;
  width: 90px;
}

.el-header {
  background-color: #003680;
  color: white;
}

.upheader {
  height: 60px;
}
a:link {
  text-decoration: none;
  color: white;
}

a:visited {
  color: white;
}

.margin1 {
  margin-left: 5%;
}
.logo {
  width: 300px;
  height: 60px;
  font-family: "Microsoft YaHei";
  font-size: 38px;
  text-align: left;
  line-height: 60px;
  text-indent: 1em;
  float: left;
}
#bkimg{
  position: absolute;
  top:120px;
  left:0;
  right: 0;
  bottom:0;
}
#personinfo{
  position: absolute;
  top: 30px;
  right: 33px;
}
.page{
  position:absolute;
  top: 200px;
  left:300px;
}
</style>
