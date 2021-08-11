<template>
<div class="singleShow">
	<div class="singleMoment" v-for="(item,index) in Moments" :key="index">
    <el-avatar
        size="medium"
        :src="item.uprofile"
        style="float: left"
    ></el-avatar>
		<br>
		<pre>
		<span style="float: right">{{item.momenT_LOCATION}}</span>
		<span style="float: right">{{item.momenT_TIME}}</span></pre>
		<el-card style="background:#FBFBEF">
		<p>{{ item.text }}</p>
		</el-card>
		<br>
		<img class="moment_img" :src="item.picture" v-if="item.picture!==null" style="width:40px;height:40px">
		<br>
		<div class="moment_video" v-if="item.vedio!==null">
		<iframe :src="item.vedio" frameborder='0'
         allow='autoplay;encrypted-media' allowfullscreen style='width:100%;height:50%;'>
        </iframe>
		</div>
		<!-- 评论区 -->
		<li class="CommentMoment" v-for="(item1,index) in Comments" :key="index" style="list-style: none">
		<el-card class="moment_block">
			<el-avatar size=medium :src=item1.uprofile style="float:left"></el-avatar>
			<pre><span class="user_id" style="float:left">{{item1.useR_ID}}</span>
			<span class="user_name" style="float: left">{{item1.useR_NAME}}</span>
			<span class="comment_time" style="float:right">{{item1.commenT_TIME}}</span></pre>
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
		const url = `http://49.234.18.247:8080/api/FunMoment/${this.$route.params.momenT_ID}`
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
		})
		},
		goback(){
			this.$router.push('/3')
		},
		deleteBlog() {
			this.$axios
			.delete(`http://49.234.18.247:8080/api/FunDeleteMomentByMomentId/${this.$route.params.momenT_ID}`)
			.then(()=>
			{
				this.$message("删除成功")
				this.$router.push('/3')
			})
		}
	},
}
</script>
<style scoped>
.singleMoment {
	max-width: 80%;
	padding: 20px;
	border: 1px dotted rgb(207, 229, 230);
	background-color:#ECF8E0;
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
	margin: 20px 20px;
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
