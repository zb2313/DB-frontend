<template>
  <div class="fixed">
    <el-form :inline="true" :model="form_Select">
      <el-form-item>
        <el-select
          v-model="form_Select.location"
          filterable
          allow-create
          placeholder="目的地/酒店名称"
        >
          <el-option-group
            v-for="group in locations"
            :key="group.label"
            :label="group.label"
          >
            <el-option
              v-for="item in group.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-option-group>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-date-picker
          v-model="form_Select.time"
          type="daterange"
          format="yyyy/MM/dd"
          range-separator="至"
          start-placeholder="入住日期"
          end-placeholder="退房日期"
          :picker-options="pickerOptions"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-popover placement="bottom" width="316" trigger="click">
          <div class="">
            <div class="popover-item">
              <span
                >房间：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
              >
              <el-input-number
                v-model="form_Select.room_num"
                size="mini"
                :min="1"
                :max="10"
              ></el-input-number>
            </div>
            <div class="popover-item">
              <span
                >成人<i
                  style="font-size: 13px; font-style: normal; color: #606266"
                  >(18岁以上)</i
                >：&nbsp;</span
              >
              <el-input-number
                v-model="form_Select.adult_num"
                size="mini"
                :min="1"
                :max="10"
              ></el-input-number>
            </div>
            <div class="popover-item">
              <span
                >儿童<i
                  style="font-size: 13px; font-style: normal; color: #606266"
                  >(18岁以下)</i
                >：&nbsp;</span
              >
              <el-input-number
                v-model="form_Select.child_num"
                size="mini"
                :min="0"
                :max="10"
              ></el-input-number>
            </div>
          </div>
          <div slot="reference" class="dropdown">
            <span class="el-icon-s-custom icon"></span>
            <span class="title"
              >{{ form_Select.adult_num }}位成人·{{
                form_Select.child_num
              }}位儿童·{{ form_Select.room_num }}间客房</span
            >
          </div>
        </el-popover>
      </el-form-item>

      <el-form-item>
        <div @click="onSubmit" class="search_btn el-icon-search"></div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form_Select: {
        location: "",
        time: "",
        room_num: 1,
        adult_num: 1,
        child_num: 0,
      },
      locations: [
        {
          label: "热门城市",
          options: [
            {
              value: "Shanghai",
              label: "上海",
            },
            {
              value: "Beijing",
              label: "北京",
            },
          ],
        },
        {
          label: "附近酒店",
          options: [
            {
              value: "Chengdu",
              label: "格林豪泰快捷酒店",
            },
            {
              value: "Shenzhen",
              label: "七天酒店",
            },
            {
              value: "Guangzhou",
              label: "四季酒店",
            },
            {
              value: "Dalian",
              label: "秋果酒店",
            },
          ],
        },
      ],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 86400000;
        },
      },
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
};
</script>

<style scoped>
/* 搜索框css */

.fixed {
  position: -webkit-sticky;
  position: sticky;
  top: -1px;
  z-index: 99;
  width: 100%;
  height: 70px;
  padding-top: 10px;
  text-align: center;
  background-color: #f2f2f2;
}

.el-form--inline .el-form-item {
  margin-right: 0px;
}
.el-select /deep/ .el-input__inner {
  width: 345px;
  height: 60px;
  border: 1px solid lightgrey;
  border-radius: 0px;
  cursor: text;
}
.el-date-editor /deep/ .el-range__icon {
  margin-left: 25px;
  line-height: 50px;
}
.el-date-editor--daterange.el-input__inner {
  width: 345px;
  height: 60px;
  border: 1px solid lightgrey;
  border-radius: 0px;
}
.el-range-editor.is-active,
.dropdown:focus {
  border: 1px solid #409eff;
}
.el-date-editor /deep/ .el-range-separator {
  line-height: 50px;
}
.dropdown {
  position: relative;
  height: 58px;
  width: 300px;
  background-color: #fff;
  border: 1px solid lightgrey;
  border-radius: 0px;
  line-height: 58px;
}

.dropdown .icon {
  margin-right: 20px;
  color: #dcdfe6;
}
.dropdown .title {
  margin-right: 35px;
  color: #606266;
}
.popover-item {
  width: 300px;
  margin: 0 auto;
}
.popover-item span {
  margin-right: 100px;
}
.el-input-number--mini {
  width: 86px;
}
.el-input-number /deep/.el-input-number__decrease,
.el-input-number /deep/ .el-input-number__increase {
  width: 23px;
}
.search_btn {
  height: 60px;
  width: 106px;
  font-size: 33px;
  background-color: #003680;
  color: white;
  line-height: 60px;
}
.search_btn:hover {
  cursor: pointer;
}
</style>
