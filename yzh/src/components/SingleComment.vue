<template>
<div class="singleShow">
	<div class="singleMoment" v-for="(item,activeIndex) in Moments" :key="activeIndex">
		<h1>{{ item.momenT_ID }}</h1>
		<br>
		<span style="float: right">{{item.momenT_LOCATION}}</span>
		<br>
		<span style="float: right">{{item.momenT_TIME}}</span>
		<article>{{ item.text }}</article>
		<br>
		<img class="moment_img" :src="item.picture">
		<br>
		<iframe :src="item.vedio" frameborder='0'
         allow='autoplay;encrypted-media' allowfullscreen style='width:100%;height:500px;'>
        </iframe>
		<button class="button1" @click="deleteBlog">删除</button>
		<button class="button2" @click="goback">返回</button>
	</div>
</div>
</template>

<script>
import axios from 'axios'
export default {
	name: 'singleComment',
	data() {
		return {
			// 当前路由的 id 值
			id: this.$route.params.id,
			Moments: [],
		}
	},
	// created()：在实例创建完成后被立即调用
	created() {
		const url = `http://49.234.18.247:8080/api/Moment/${this.$route.params.momenT_ID}`
		axios.get(url).then((res) => {
			this.Moments = res.data
		}, err=>{
			console.log(err)
		})
	},
	methods: {
		goback(){
			this.$route.push('/3')
		},
		deleteBlog() {
		const url = `http://49.234.18.247:8080/api/Moment/${this.$route.params.momenT_ID}`
		axios.delete(url).then((res) => {
			// 删除完成后返回首页（showBlog 页面）	
		this.$router.push('/3')
		},err=>{
			console.log(err)
		}
		)},
	},
}
</script>
<style scoped>
.singleMoment {
	max-width: 80%;
	padding: 20px;
	border: 1px dotted rgb(207, 229, 230);
	background-color:lavender;
	min-width: 500px;
	margin: 12px auto;
	border-radius: 10px;
	margin-bottom: 30px;
}
.singleMoment ul li {
	margin-left: 65px;
}
.button1 {
	text-decoration: none;
	text-align: center;
	vertical-align: middle;
	display: inline-block;
	margin: 20px 0;
	background: #007acc;
	color: #fff;
	border: 0;
	padding: 9px;
	border-radius: 4px;
	font-size: 18px;
	cursor: pointer;
	width: 80px;
	height: 40px;
	outline: none;
}
.button2{
	text-decoration: none;
	text-align: center;
	vertical-align: middle;
	display: inline-block;
	margin: 20px 0;
	background: #007acc;
	color: #fff;
	border: 0;
	padding: 9px;
	border-radius: 4px;
	font-size: 18px;
	cursor: pointer;
	width: 80px;
	height: 40px;
	outline: none;
}
.button.left {
	margin-left: 15px;
}
</style>
