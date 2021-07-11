<template>
  <div id="app">
    <router-view />
  </div>
</template>


<style>
html,
body,
#app {
  height: 100%;
  margin: 0px;
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

.left1 {
  text-align: left;
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
</style>
