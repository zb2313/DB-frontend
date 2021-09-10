<template>
<div>
<Header1/>
<div class="singleShow">
	<el-container>
	<div class="singleMoment" v-for="(item,index) in Moments" :key="index">
    <el-image
        :src="item.uprofile"
        style="float: left;border-radius: 100%;width:60px"
    ><div slot="error" style="font-size:13px">加载中...</div>
	</el-image>
		<pre><span style="float: left">{{item.useR_NAME}}</span>
		<span style="float: left">发布于{{item.momenT_TIME}}</span><br><span style="float: left"><i class="el-icon-location-outline"/>{{item.momenT_LOCATION}}</span>
		</pre>
		<p>{{ item.text }}</p>
		<br>
		<img class="moment_img" :src="item.picture" v-if="item.picture!==null" style="height:420px">
		<br>
		<div class="moment_video" v-if="item.vedio!==null">
		<iframe :src="item.vedio" frameborder='0'
         allow='autoplay;encrypted-media' allowfullscreen style='width:100%;height:50%;'>
        </iframe>
		</div>
		<el-button type="danger" size="small" @click="deleteBlog">删除</el-button>
		<el-button size="small" @click="goback">返回</el-button>
	</div>
	<el-aside style="width:400px">
		<div><sapn style="font-size:20px">评论</sapn>({{Comments.length}})</div><br>
		<li class="CommentMoment" v-for="(item1,index) in Comments" :key="index" style="list-style: none">
		<div class="singlecomment" >
			<el-image  :src=item1.uprofile style="float:left;border-radius: 100%;width:60px"><div slot="error" style="font-size:13px">加载中...</div>
			</el-image>
			<pre><span class="user_id" style="float:left">{{item1.useR_ID}}</span>
			<span class="user_name" style="float: left">{{item1.useR_NAME}}</span>
			<span class="comment_time" style="float:right">{{item1.commenT_TIME}}</span></pre>
			<p class="comment_text">{{item1.commenT_TEXT}}</p>
		</div><br>
		</li>
	</el-aside>
	</el-container>
</div>
<Footer1/>
</div>
</template>

<script>
import axios from 'axios'
import Header1 from "@/components/Header1.vue";
import Footer1 from "@/components/Footer1.vue";
export default { 
	components:{
      Header1,Footer1
    },
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
		axios.get(url)
		.then((res)=>{
			this.Moments=res.data;
		axios.get("http://49.234.18.247:8080/api/MomentPic/"+this.Moments[0].momenT_ID)
        .then(res=>{var pic=res.data;
          if(pic!="NULL")
          this.Moments[0].picture=pic;
        });
		axios.get("http://49.234.18.247:8080/api/Portrait/"+this.Moments[0].useR_ID)
        .then(res=>
        {
           let pic=res.data;
           if(pic!="NULL")
          this.Moments[0].uprofile=pic;
        })
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
			this.Comments=res.data;
		axios.get("http://49.234.18.247:8080/api/Portrait/"+this.Comments[0].useR_ID)
        .then(res=>
        {
           let pic=res.data;
           if(pic!="NULL")
          this.Comments[0].uprofile=pic;
        })
		})
		},
		goback(){
			this.$router.push('/3')
		},
		deleteBlog() {
			this.$axios
			.delete(`http://49.234.18.247:8080/api/FunDeleteMomentByMomentId/${this.$route.params.momenT_ID}`)
			.then(()=>
			{if(this.Moments[0].picture!=null)
				axios.delete("http://49.234.18.247:8080/api/MomentPic/"+this.Moments[0].momenT_ID);
				this.$message("删除成功")
				this.$router.push('/3')
			})
		}
	},
}
</script>
<style scoped>
.singleShow{
	min-height: 633px;
}
.singleMoment {
	max-width: 70%;
	padding: 20px;
	border: 1px dotted rgb(207, 229, 230);
	background-color:#ECF8E0;
	min-width: 60%;
	margin: 12px auto;
	border-radius: 10px;
	margin-bottom: 30px;
}
.singlecomment {
	max-width: 80%;
	padding: 20px;
	border: 1px dotted rgb(207, 229, 230);
	background-color:#ECF8E0;
	margin: 12px auto;
	border-radius: 10px;
	margin-bottom: 30px;
}
.singleMoment ul li {
	margin-left: 65px;
}
</style>
