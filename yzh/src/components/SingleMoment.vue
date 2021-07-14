<template>
    <div class="singleShow">
		<!-- 动态区 -->
	<div class="singleMoment" v-for="(item,index) in Moments" :key="index">
		<h1>{{ item.useR_ID }}</h1>
		<el-avatar size="small" :src=item.uprofile></el-avatar>
		<span>{{item.useR_NAME}}</span>
		<br>
		<span style="float: right">{{item.momenT_LOCATION}}</span>
		<br>
		<span style="float: right">{{item.momenT_TIME}}</span>
		<article>{{ item.text }}</article>
		<br>
		<img class="moment_img" :src="item.picture" style="width:15px;height:15px">
		<br>
        <div class="moment_video" v-if="item.vedio!==null">
		<iframe :src="item.vedio" frameborder='0'
         allow='autoplay;encrypted-media' allowfullscreen style='width:100%;height:50%;'>
        </iframe>
        </div>
	<!-- 评论区 -->
	<li class="CommentMoment" v-for="(item1,index) in Comments" :key="index" style="list-style: none">
		<el-card class="moment_block">
			<span class="user_id">{{item1.useR_ID}}</span>
			<br>
			<span class="moment_id">{{item1.momenT_ID}}</span>
			<span class="comment_time">{{item1.commenT_TIME}}</span>
			<p class="comment_text">{{item1.commenT_TEXT}}</p>
		</el-card>
	</li>
	</div>
	<!-- 发表评论区 -->
	<div class="submit">
		<el-input class="comment_input"
		type="textarea"
  		:autosize="{minRows: 2}"
 		placeholder="说点什么吧..."
  		v-model="comment_text"
		maxlength="100"
  		show-word-limit
		></el-input>
		<el-button round @click="submit">发送</el-button>
	</div>
	<button class="button-back" @click="goback">返回</button>
</div>
</template>
<script>
import axios from 'axios'
export default ({
	name: 'singleMomment',
	data() {
		return {
			Moments: [],
			// 评论数据
			Comments:[],
			//用户发表的评论
			comment_text:'',
			//动态id 
			comment_ID: '',
			//用户id
			useR_ID:'',
		}
	},
	// created()：在实例创建完成后被立即调用
	created() {
		const url = `http://49.234.18.247:8080/api/FunMoment/${this.$route.params.momenT_ID}`
		axios.get(url).then((res) => {
			this.Moments = res.data
			console.log(this.Moments)
		}, err=>{
			console.log(err)
		})
		axios.get(`http://49.234.18.247:8080/api/FunGetCommentByMomentId/${this.$route.params.momenT_ID}`).then((res)=>{
			this.Comments=res.data;
			console.log(this.Comments)
		})
	},
	methods: {
		goback(){
			this.$router.push('/1')
		},
		submit(){
			if(this.comment_text!=='')
			{
				this.$confirm('此操作将提交评论, 是否继续?', '提示', {
          		confirmButtonText: '确定',
          		cancelButtonText: '取消',
         		 type: 'warning'
        	})
			.then(() => {
			this.comment_ID=this.$route.params.momenT_ID,
			this.$axios
			.post('http://49.234.18.247:8080/api/CommentMoment',
				{
					"useR_ID": "0000000005",
 					"momenT_ID": this.comment_ID,
 					"commenT_TEXT": this.comment_text,
  					"commenT_TIME": null
				}
			)
          	this.$message({
            type: 'success',
            message: '发布成功!'
          	});
       		})
			.catch(() => {
         	this.$message({
            type: 'info',
            message: '已取消发布'
          	});          
        	});
			}
			else
			{
				this.$message('评论内容不能为空！')
			}
		}
	},
})
</script>
<style scoped>
.comment_input{
	width: 80%;
	box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
.singleMoment{
	width: 80%;
	margin: 12px auto;
}
.CommentMoment{
	width: 80%;
	margin: 12px auto;
}
.button-back {
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
</style>