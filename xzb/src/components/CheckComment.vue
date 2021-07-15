<template>
<div class="Moment">
	<div class="showMoment">
		<h1>我的动态</h1>
    <el-button type="primary" icon="el-icon-back" @click="goBack">返回 </el-button>
	<div class="show" v-for="(item,index) in Moments" :key="index">
	<div class="singleMoment" >
		<router-link :to="'/3/'+item.momenT_ID">
		<span class="zhankai" type="primary">展开</span>
		</router-link>
		<span class="moment_id" style="float:left">{{item.momenT_ID}}</span>
		<br>
		<!-- 动态发布地点信息和时间信息 -->
		<span class="moment_location" style="float: left">{{item.momenT_LOCATION}}</span>
		<span class="moment_time" style="float: right">{{item.momenT_TIME}}</span>
		<br>
		<!-- 动态中的文本 -->
		<p class="moment_text">{{item.text}}</p>
		<!-- 动态中的图片 -->
		<img class="moment_img" :src="item.picture">
		<!-- 动态中的视频 -->
		<div class="moment_video" v-if="item.vedio!==null">
		<iframe :src="item.vedio" frameborder='0'
         allow='autoplay;encrypted-media' allowfullscreen style='width:100%;height:50%;'>
        </iframe>
		</div>
	</div>
	</div>
	<div class="block">
	<el-pagination
		@prev-click="prevClickChange"
		@next-click="nextClickChange"
		@current-change="handleCurrentChange"
		small
		background
		layout="prev, pager, next"
		:total="20">
	</el-pagination>
	</div>
</div>
</div>
</template>

<script>
import axios from 'axios'
export default {
	data() {
		return {
			Moments: [],
		}
	},
  methods: {
    // eslint-disable-next-line no-mixed-spaces-and-tabs
	  prevClickChange(val) {
        console.log(`当前页：${val}`);
      },
    // eslint-disable-next-line no-mixed-spaces-and-tabs
	  nextClickChange(val) {
        console.log(`当前页：${val}`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      goBack() {
        this.$router.push('/moment')
      },
    // eslint-disable-next-line no-mixed-spaces-and-tabs
	  getMoments(){
      // eslint-disable-next-line no-mixed-spaces-and-tabs
		  axios
			.get('http://49.234.18.247:8080/api/FunGetAllMomentByUserId/1234567890')
			.then((res) => {
				console.log(res.data);
				this.Moments=res.data
				console.log("moment:",this.Moments)
				console.log('res:',this.$route.params.useR_ID)
			return res.data;
		})
      // eslint-disable-next-line no-mixed-spaces-and-tabs
	  }
   },
	// created()：在实例创建完成后被立即调用
	created() {
		this.getMoments();
		},
}
</script>

<style scoped>
.Moment{
	height: 100%;
	width: 100%;
	position: absolute;
	background-image: url(../assets/login-bg.jpg);
}
.zhankai{
	display: flex;
	cursor: pointer;
	position: absolute;
	right: 12px;
	bottom: 12px;
}
.showMoment {
	min-width: 80%;
	max-width: 80%;
	margin: 12px auto;
	border-radius: 10px;
}
.singleMoment {
	padding: 20px;
	margin: 20px auto;
	box-sizing: border-box;
	background: rgb(82, 198, 233);
	border: 1px dotted rgb(169, 185, 108);
	border-radius: 10px;
	position: relative;
}
</style>
