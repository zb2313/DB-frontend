<template>
    <div class="moment">
        <li class="show" v-for="(item,index) in Moments" :key="index" style="list-style:none">
	    <el-card class="singleMoment" >
		<router-link :to="'/1/'+item.momenT_ID">
		<span class="zhankai" type="primary">展开</span>
		</router-link>
		<el-avatar size=medium :src=item.uprofile style="float:left"></el-avatar>
		<pre><span class="user_id" style="float:left">{{item.useR_ID}}</span>
		<span class="user_name" style="float: left">{{item.useR_NAME}}</span>
		<!-- 动态发布地点信息和时间信息 -->
		<span class="moment_location" style="float: left">{{item.momenT_LOCATION}}</span>
		<span class="moment_time" style="float: right">{{item.momenT_TIME}}</span></pre>
		<el-card style="background:#FBFBEF">
		<!-- 动态中的文本 -->
		<p class="moment_text">{{item.text}}</p>
		<!-- 动态中的图片 -->
		<img class="moment_img" :src="item.picture" v-if="item.picture!==null" style="width:30%;height:80px">
		<!-- 动态中的视频 -->
		<div class="moment_video" v-if="item.vedio!==null">
		<iframe :src="item.vedio" frameborder='0'
         allow='autoplay;encrypted-media' allowfullscreen style='width:100%;height:50%;'>
        </iframe>
		</div>
		</el-card>
		</el-card>
		</li>
    </div>
</template>
<script>
import axios from 'axios'
export default ({
    data() {
		return {
			Moments: [],
			user_moment:[],
			user:[],
			display_users:[{useR_ID:"",useR_NAME:"",uprofile:"", momenT_ID: "",
    		momenT_TIME: "",
			momenT_LOCATION: "",
			text: "",
			picture: "",
			vedio: ""}]
		}
	},
    methods:{
	    getMoments(){
		  axios
			.get('http://49.234.18.247:8080/api/FunGetAllMomentInfo')
			.then((res) => {
				console.log(res.data);
				this.Moments=res.data
				console.log(this.Moments)
			return res.data;
		    })
	    },
		// 得到所有发送给动态的用户id
		getuser_moments(){
			axios
			   .get('http://49.234.18.247:8080/api/ReleaseMoment')
			   .then((res)=>{
				   this.user_moment=res.data
				   console.log("user_moment:",this.user_moment)
				   return this.user_moment
			   })
		},
		// 得到用户信息
		getuser(){
			axios
				.get('http://49.234.18.247:8080/api/Users')
				.then((res)=>{
					this.user=res.data
					return this.user
				})
		},
		getdisplay_users()
		{
			console.log("ee:",this.display_users.length)
			console.log("ee:",this.display_users)
			for(let i=0;i<this.user_moment.length;i++)
			{
				for(let j=0;j<this.user.length;j++)
				{
					console("1",this.user_moment[i].useR_ID)
					if(this.user_moment[i].useR_ID==this.user[j].useR_ID)
					{
						this.display_users[i].useR_ID=this.user[j].useR_ID;
						this.display_users[i].useR_NAME=this.user[j].useR_NAME;
						this.display_users[i].uprofile=this.user[j].uprofile;
						this.display_users[i].momenT_ID=this.user_moments[i].useR_ID;
					}
				}
				for(let k=0;k<this.Moments.length;k++)
				{
					if(this.user_moment[i].momenT_ID==this.Moments[k].momenT_ID)
					{
						this.display_users[i].momenT_LOCATION=this.Moments[k].momenT_LOCATION;
						this.display_users[i].text=this.Moments[k].text;
						this.display_users[i].picture=this.Moments[k].picture;
						this.display_users[i].vedio=this.Moments[k].vedio;
						this.display_users[i].momenT_TIME=this.Moments[k].momenT_TIME;
					}
				}
			}
			console.log("ees:",this.display_users.length)
			console.log("ees:",this.display_users)
		}
		},
    created() {
		this.getMoments();
		this.getuser_moments();
		this.getuser();
		this.getdisplay_users();
		}
})
</script>
<style scoped>
.moment{
	max-height: 400px;
}
.zhankai{
	display: flex;
	cursor: pointer;
	position: absolute;
	right: 12px;
	bottom: 12px;
}
.singleMoment {
	padding: 20px;
	margin: 20px auto;
	box-sizing: border-box;
	background: #ECF8E0;
	border: 1px dotted rgb(169, 185, 108);
	border-radius: 10px;
	position: relative;
}
</style>