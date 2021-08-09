<template>
  <el-container direction="vertical">
    <Header activeIndex="1" />

    <div class="Form">
      <el-form :inline="true" :model="form_Select" class="form-inline">
        <el-form-item>
          <el-select v-model="form_Select.location" filterable allow-create placeholder="目的地/酒店名称">
          
            <el-option-group
              v-for="group in locations"
              :key="group.label"
              :label="group.label">
              <el-option
                v-for="item in group.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-option-group>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-date-picker
            v-model="form_Select.time"
            type="daterange"
            format="yyyy/MM/dd"
            range-separator="——"
            start-placeholder="入住时间"
            end-placeholder="退房时间"
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-popover
            placement="bottom"
            width="200"
            trigger="click">
            <div class="">
              <div>
                <span>房间：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <el-input-number v-model="form_Select.room_num" size="mini" :min="1" :max="10"></el-input-number>
              </div>
              <div>
                <span>成人：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <el-input-number v-model="form_Select.adult_num" size="mini" :min="1" :max="10"></el-input-number>
              </div>
              <div>
                <span>儿童<i style="font-size:13px;font-style:normal;color:#606266">(18岁以下)</i>：&nbsp;</span>
                <el-input-number v-model="form_Select.child_num" size="mini" :min="0" :max="10"></el-input-number>
              </div>  
            </div>
            <div slot="reference" class="dropdown">
              <span class="el-icon-s-custom icon"></span>
              <span class="title">{{form_Select.adult_num}}位成人·{{form_Select.child_num}}位儿童·{{form_Select.room_num}}间客房</span>
            </div>
          </el-popover>
        </el-form-item>

        <el-form-item>
         <div @click="onSubmit" class="search_btn el-icon-search"></div>
        </el-form-item>
      </el-form>
    </div>

    <div class="ad main">
      <el-carousel :interval="4000" height="250px">
        <el-carousel-item v-for="fit in 4" :key="fit.index">
          <el-image
          style="width: 1100px; height: 250px"
          :src="url"
          fit="cover">
          </el-image>
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="main recommend">
      <div class="tuijian">酒店推荐</div>
      <div class="buttons"> 
        <div class="button" v-for="(item,index) in cities.slice(0,6)" :key="index">
          {{item.name}}
        </div>
        <div class="more" :class="icon">
          <div class="dropdown-content">
            <div class="cities" v-for="item in cities.slice(6)" :key="item.index">{{item.name}}</div>
          </div>
        </div>
      </div>
      <div class="hotels">
        <div
          class="box"
          v-for="item in 8"
          :key="item"
        >   
        </div>
      </div>
    </div>

    <Footer />
  </el-container>
</template>

<style scoped>
/* 搜索框css */
.Form {
  width: 100%;
  height: 100px;
  padding-top: 50px;
  text-align: center;
  background-color: #f2f2f2;
}

.el-form--inline .el-form-item{
  margin-right: 0px;
}
.el-select /deep/ .el-input__inner{
  height: 50px;
  border:1px solid lightgrey;
  border-radius: 0px;
  cursor:text;
}
.el-date-editor--daterange.el-input__inner{
  width: 250px;
  height: 50px;
  border:1px solid lightgrey;
  border-radius: 0px;
}
.el-range-editor.is-active,
.dropdown:focus {
  border:1px solid #409EFF;
}

.dropdown {
  position: relative;
  height: 48px;
  width: 250px;
  background-color: #fff;
  border:1px solid lightgrey;
  border-radius: 0px;
  line-height: 48px;
}

.dropdown .icon {
  margin-right:20px;
  color:#DCDFE6;
}
.dropdown .title {
  margin-right:35px;
  color:#606266;
}
.el-input-number--mini {
  width: 86px;
}
.el-input-number /deep/.el-input-number__decrease,
.el-input-number /deep/ .el-input-number__increase {
  width: 23px;
}
.search_btn {
  height: 50px;
  width: 50px;
  font-size: 33px;
  background-color: #003680;
  color: white;
  line-height: 50px;
}
/* 广告css */
.ad {
  margin-top:40px;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

/* 推荐css */
.recommend {
  margin-top:50px;
  margin-bottom: 35px;
  text-align: center;
}
.tuijian {
  font-size:28px;
  margin-bottom:17px;
  font-weight: 700;
}
.box {
  width: 265px;
  height: 190px;
  background-color: rgb(85, 124, 150);
  float: left;
  margin: 5px 5px;
}

.buttons {
  width: 500px;
  height: 40px;
  margin:0 auto;
}

.button,
.more {
  float:left;
  margin-left: 5px;
  margin-right: 5px;
  width: 63px;
  height: 30px;
  border: 1px solid lightgray;
  border-radius: 4px;
  line-height: 30px;
  font-size: 14px;
}

.more {
  position: relative;
  width: 30px;
}
.button:hover,
.more:hover {
  border-color:#409EFF;
  cursor: pointer;
}
.more:hover .dropdown-content{
  display: block;
}
.dropdown-content {
  position:absolute;
  display:none;
  top: 35px;
  left: -270px;
  min-width: 300px;
  min-height: 100px;
  border-radius: 2px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}
.cities {
  float: left;
  width: 50px;
  height: 30px;
}
.cities:hover {
  background-color: #ffd04b;
}
</style>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
export default {
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      
      form_Select: {
        location:"",
        time:"",  
        room_num:1,
        adult_num:1,
        child_num:0,
      },
      locations: [{
          label: '热门城市',
          options: [{
            value: 'Shanghai',
            label: '上海'
          }, {
            value: 'Beijing',
            label: '北京'
          }]
        }, {
          label: '附近酒店',
          options: [{
            value: 'Chengdu',
            label: '格林豪泰快捷酒店'
          }, {
            value: 'Shenzhen',
            label: '七天酒店'
          }, {
            value: 'Guangzhou',
            label: '四季酒店'
          }, {
            value: 'Dalian',
            label: '秋果酒店'
          }]
        }],
      pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now()-86400000;
          },
      },
      url: require("@/assets/img/ad.png"),
      cities:[
        {name:"北京"},
        {name:"上海"},
        {name:"深圳"},
        {name:"广州"},
        {name:"杭州"},
        {name:"南京"},
        {name:"苏州"},
        {name:"武汉"},
        {name:"无锡"},
        {name:"重庆"},
        {name:"长沙"},
        {name:"天津"},
        {name:"郑州"},
        {name:"济南"},
        {name:"宁波"},
        {name:"西安"},
        {name:"青岛"},
        {name:"合肥"},
        {name:"福州"},
        {name:"佛山"},
        {name:"大连"},
        {name:"沈阳"},
        {name:"厦门"},
        {name:"昆明"},
        {name:"南昌"},
        {name:"珠海"},
      ],
      icon:"el-icon-arrow-down",
    };
  },
  methods: {
    onSubmit() {
      console.log(this.form_Select.time);
      // this.$router.push({
      //   path: "/hotel/city",
      //   query: { search: this.form_Select.location },
      // });
    },
   
  },
  mounted() {
      this.restaurants = this.loadAll();
    }
};
</script>
