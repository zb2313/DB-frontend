<template>
<div class="singleShow">
	<div class="singleMoment" v-for="(item,index) in Moments" :key="index">
		<h1>{{ item.momenT_ID }}</h1>
		<br>
		<span style="float: right">{{item.momenT_LOCATION}}</span>
		<br>
		<span style="float: right">{{item.momenT_TIME}}</span>
		<article>{{ item.text }}</article>
		<br>
		<img class="moment_img" :src="item.picture">
		<br>
		<div class="moment_video" v-if="item.vedio!==null">
		<iframe :src="item.vedio" frameborder='0'
         allow='autoplay;encrypted-media' allowfullscreen style='width:100%;height:50%;'>
        </iframe>
		</div>
		<li class="CommentMoment" v-for="(item1,index) in Comments" :key="index" style="list-style: none">
		<el-card class="moment_block">
			<span class="user_id">{{item1.useR_ID}}</span>
			<br>
			<span class="moment_id">{{item1.momenT_ID}}</span>
			<span class="comment_time">{{item1.commenT_TIME}}</span>
			<p class="comment_text">{{item1.commenT_TEXT}}</p>
		</el-card>
		</li>
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
			Comments:[],
			DeleteComments:[],//存储需要删除的评论

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
		this.print()
	},
	methods: {
		print(){
			this.$axios
		.get(`http://49.234.18.247:8080/api/FunGetCommentByMomentId/${this.$route.params.momenT_ID}`)
		.then((res)=>{
			this.Comments=res.data
			console.log("Comments:",this.Comments)
			console.log('res:',this.$route.params.momenT_ID)
		})
		},
		goback(){
			this.$router.push('/3')
		},
		deleteBlog() {
		}
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
