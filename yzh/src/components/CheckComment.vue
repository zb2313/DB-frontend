<template>
<div class="Moment">
	<div class="showMoment">
		<h1>我的动态</h1>
    <el-button type="primary" icon="el-icon-back" @click="goBack">返回 </el-button>
		<!-- <input type="text" v-model="search" placeholder="搜索" />
		<div class="singleMomment" v-for="(Moment, index) in filterMoment" :key="index">
			<router-link v-bind:to="'/Moment/' + Moments.momenT_ID">
				<h2 v-rainbow>{{ Moments.momenT_ID }}</h2>
			</router-link>
			<article>{{ Moments.text | snippet}}</article>
		</div> -->
	<div class="show" v-for="(item,activeIndex) in Moments" :key="activeIndex">
	<div class="singleMoment" >
		<router-link :to="'/3/'+item.momenT_ID">
		<span class="zhankai" type="primary" @click="zhankai">展开</span>
		</router-link>
		<span class="moment_id" style="float:left">{{item.momenT_ID}}</span>
		<br>
		<span class="moment_location" style="float: left">{{item.momenT_LOCATION}}</span>
		<span class="moment_time" style="float: right">{{item.momenT_TIME}}</span>
		<br>
		<p class="moment_text">{{item.text}}</p>
		<img class="moment_img" :src="item.picture">
		<iframe :src="item.vedio" frameborder='0'
         allow='autoplay;encrypted-media' allowfullscreen style='width:100%;height:500px;'>
        </iframe>
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
		:total="50">
	</el-pagination>
	</div>
</div>
</div>
</template>

<script>
import axios from 'axios'
import SingleComment from './SingleComment.vue'
export default {
	// name: 'showComment',
    // components: {
	// 	SingleComment,
	// },
	data() {
		return {
			Moments: [],
			// search: '',
		}
	},
  methods: {
	  prevClickChange(val) {
        console.log(`当前页：${val}`);
      },
	  nextClickChange(val) {
        console.log(`当前页：${val}`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      goBack() {
        this.$router.push('/')
      },
	  zhankai(){
		  this.$router.push('/3-1/')
	  },
	  getMoments(){
		  axios
			.get('http://49.234.18.247:8080/api/Moment')
			.then((res) => {
				// var MomentArry = []
				// typeof res  ===  Object
				// for (let key in res) {
					// key 为数据库自动生成的字符串，res[key] = 某一对象
					// 使用每个对象的 key 值，给对象添加 id 属性
					// res[key] = key
					// 把添加完id属性的对象push到数组
					// MomentArry.push(res[key])
					// this.Moments = MomentArry
				// this.Moments=res.data;

				console.log(res.data);
				this.Moments=res.data
				console.log(this.Moments)
			return res.data;
			
		})
	  }
   },
	
	// created()：在实例创建完成后被立即调用
	created() {
		this.getMoments();
		},
	// 计算属性，相对于 methods 存在性能优势
	computed: {
		filterMoment() {
			return this.Moments.filter((Moment) => {
				// return Moment.Moment_ID.match(this.search)
			})
		},
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
	float: right;
	margin-top: 10%;
	cursor: pointer;
}
.showMoment {
	min-width: 80%;
	max-width: 80%;
	margin: 12px auto;
	border-radius: 10px;
}
.singleMoment {
	padding: 20px;
	margin: 20px 0;
	max-height: ;
	box-sizing: border-box;
	background: rgb(82, 198, 233);
	border: 1px dotted rgb(169, 185, 108);
	border-radius: 10px;
}
.showMoment a {
	text-decoration: none;
}
</style>
