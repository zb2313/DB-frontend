<template>
	<div v-theme:column="'wide'" id="showBlogs">
		<h1>评论过的动态</h1>
    <el-button type="primary" icon="el-icon-back" @click="goBack">返回 </el-button>
		<input type="text" v-model="search" placeholder="搜索" />
		<div class="singleComment" v-for="(blog, index) in filterBlog" :key="index">
			<router-link v-bind:to="'/blog/' + blog.id">
				<h2 v-rainbow>{{ blog.title }}</h2>
			</router-link>
			<article>{{ blog.content | snippet }}</article>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import SingleComment from './SingleComment.vue'
import CheckComment from './CheckComment.vue'
export default {
	name: 'showComment',
  components: {
		SingleComment,
    CheckComment,
	},
  methods: {
      goBack() {
        this.$router.push('/')
      }
   },
	data() {
		return {
			blogs: [],
			search: '',
		}
	},
	// created()：在实例创建完成后被立即调用
	created() {
		axios
			.get('')
			.then((res) => {
				return res.data
			})
			.then((res) => {
				var blogsArry = []
				// typeof res  ===  Object
				for (let key in res) {
					// key 为数据库自动生成的字符串，res[key] = 某一对象
					// 使用每个对象的 key 值，给对象添加 id 属性
					res[key].id = key
					// 把添加完id属性的对象push到数组
					blogsArry.push(res[key])
					this.blogs = blogsArry
				}
			})
	},
	// 计算属性，相对于 methods 存在性能优势
	computed: {
		filterBlog() {
			return this.blogs.filter((blog) => {
				return blog.title.match(this.search)
			})
		},
	},
}
</script>

<style scoped>
#showBlogs {
	min-width: 80%;
	margin: 12px auto;
	border-radius: 10px;
	margin-bottom: 30px;
  position: relative;
  background: #FFCCCC !important;
}
.singleCommnent {
	padding: 20px;
	margin: 20px 0;
	box-sizing: border-box;
	background: #eee;
	border: 1px dotted rgb(169, 185, 108);
	border-radius: 10px;
}
#showBlogs a {
	text-decoration: none;
}
input[type='text'] {
	padding: 8px;
	margin-top: 10px;
	width: 100%;
	box-sizing: border-box;
	border-radius: 5px;
	outline: none;
}
</style>
