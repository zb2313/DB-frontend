<template>
	<div v-theme:column="'wide'" id="SingleBlog">
		<h1>{{ blog.title }}</h1>
		<br />
		<article>{{ blog.content }}</article>
		<br />
		<br />
		<p>作者：{{ blog.author }}</p>
		<button class="button" @click="deleteBlog">删除</button>
		<router-link class="button left" v-bind:to="'/edit/' + id">编辑</router-link>
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
			blog: {},
		}
	},
	// created()：在实例创建完成后被立即调用
	created() {
		axios.get('/posts/' + this.id + '/.json').then((res) => {
			this.blog = res.data
		})
	},
	methods: {
		deleteBlog() {
			axios.delete('/posts/' + this.id + '/.json').then((res) => {
				// 删除完成后返回首页（showBlog 页面）
				this.$router.push({ path: '/' })
			})
		},
	},
}
</script>

<style scoped>
#SingleBlog {
	padding: 20px;
	border: 1px dotted rgb(207, 229, 230);
	min-width: 500px;
	margin: 0 auto;
	border-radius: 10px;
	margin-bottom: 30px;
}
#SingleBlog ul li {
	margin-left: 65px;
}
.button {
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
