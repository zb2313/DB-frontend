<template>
  <el-container direction="vertical">
    <Header activeIndex="3" />
    <el-container>
      <el-aside width="250px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1', '2']">
          <el-submenu index="1">
            <template slot="title"
              ><i class="el-icon-cold-drink"></i>交通公司</template
            >
            <el-menu-item-group>
              <el-checkbox-group class="checkbox_style" v-model="form.company_type" v-for="item in show_company" :key="item">
                <el-checkbox :label="item" name="type"></el-checkbox>

              </el-checkbox-group>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title"
              ><i class="el-icon-cold-drink"></i>价格区间</template
            >
            <el-menu-item-group>
              <el-checkbox-group class="checkbox_style" v-model="form.price_type">
                <el-checkbox label="2000以上" name="type"></el-checkbox>
                <el-checkbox label="1000-2000" name="type"></el-checkbox>
                <el-checkbox label="500-1000" name="type"></el-checkbox>
                <el-checkbox label="500以下" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-menu-item-group>
          </el-submenu>

          <div class="select">
            <el-button type="primary" @click="multi_selest">筛选</el-button>
          </div>
        </el-menu>
      </el-aside>

      <el-container>
        <el-main>
          <div class="search">
            <el-form :model="formInline">
              <el-row>
                <el-col :span="5"
                  ><el-form-item>
                    <el-select
                      v-model="formInline.ticket_type"
                      placeholder="机票"
                      @change="typechange"
                    >
                      <el-option label="机票" value="0000000001"></el-option>
                      <el-option label="火车票" value="0000000002"></el-option>
                    </el-select> </el-form-item
                ></el-col>

                <el-col :span="5"
                  ><el-form-item>
                    <el-autocomplete
                      v-model="formInline.state1"
                      :fetch-suggestions="querySearch1"
                      placeholder="出发地"
                    ></el-autocomplete> </el-form-item
                ></el-col>

                <el-col :span="5">
                  <el-form-item>
                    <el-autocomplete
                      v-model="formInline.state2"
                      :fetch-suggestions="querySearch2"
                      placeholder="目的地"
                    ></el-autocomplete>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item>
                    <el-select
                      v-model="formInline.seat_type"
                       :placeholder="holder"
                    >
                      <el-option
                        v-if="formInline.ticket_type == 1"
                        label="经济舱"
                        value="经济舱"
                      ></el-option>
                      <el-option v-else label="一等座" value="一等座"></el-option>
                      <el-option
                        v-if="formInline.ticket_type == 1"
                        label="商务舱"
                        value="商务舱"
                      ></el-option>
                      <el-option v-else label="二等座" value="二等座"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="3">
                  <el-button
                    style="width: 100%"
                    type="primary"
                    @click="newQuery"
                    icon="el-icon-search"
                    >查询</el-button
                  >
                </el-col>
              </el-row>
            </el-form>
          </div>
          <div>
            <div>
    <el-radio-group v-model="sort_prior" @change="sort">
      <el-radio-button label="1">默认排序</el-radio-button>
      <el-radio-button label="2">低价优先</el-radio-button>
      <el-radio-button label="3">高价优先</el-radio-button>

    </el-radio-group>
  </div>
          </div>

          <el-card
            class="cardstyle"
            v-model="tableData"
            v-for="(item,index) in tableData"
            :key="item.vehicle_id"
          >
            <div class="header">
              <div>{{ item.companY_NAME }}</div>
              <br />
              <div>{{ item.vehiclE_ID }}</div>
            </div>
            <div class="body">
              <div class="time_place">
                <div class="time">
                  {{ item.starT_TIME }}
                  <br />
                  <div style="font-size: 14px">{{ item.starT_LOCATION }}</div>
                </div>
              </div>
              <div class="time_place"><br />----------</div>
              <div class="time_place">
                <div class="time">
                  {{ item.enD_TIME }}
                  <br />
                  <div style="font-size: 14px">{{ item.enD_LOCATION }}</div>
                </div>
              </div>
              <div class="price">￥{{ item.price }}</div>
              <div class="qi">起</div>
              <div class="detail">
                <div class="jump_to_detail"><el-button type="primary"  @click="onSubmit(index)"
                  >查看详情 ></el-button ></div>

              </div>
            </div>
          </el-card>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<style>
.select {
  width: 40%;
  height: 40px;
  margin: 0 auto 30px auto;
}
.select .el-button {
  width: 100%;
  height: 100%;
}
.search {
  margin-top: 30px;
  margin-bottom: 5px;
}
.vehicle-info {
  margin-top: 10px;
  height: 500px;
}
.cardstyle {
  width: 100%;
  height: 120px;
  margin-top: 20px;
  margin-bottom: 20px;
}

.time_place {
  margin-top: 10px;
  margin-bottom: 20px;
  margin-left: 30px;
  margin-right: 30px;
  float: left;
  height: 100%;
  width: 70px;
}
.detail {
  margin-top: 10px;
  margin-left: 50px;
  float: left;
}
.el-menu {
  margin-bottom: 20px;
}
.el-submenu__title {
  font-size: 16px;
  margin-left: 0px;
  padding-left: 0px;
}
.el-checkbox__label {
  line-height: 25px;
  font-size: 15px;
}

.time {
  font-size: 30px;
  margin-top: 0px;
  margin-bottom: 20px;
  margin-left: 0px;
  float: left;
  height: 100%;
}
.price {
  font-size: 30px;
  color: #042758;
  width: 50px;
  height: 100%;
  margin-left: 60px;
  margin-right: 40px;
  margin-top: 20px;
  float: left;
}
.header {
  width: 100px;
  height: 100px;
  float: left;
  margin-right: 20px;
  margin-top: 10px;
}
.body {
  float: left;
  width: 750px;
  height: 100px;
}
.qi{
  float: left;
  height: 100%;
  width: 10px;
  font-size: 10px;
  margin-top: 40px;
}


.el-aside {
  color: #333;
}
.jump_to_detail{
  float: left;
  margin-left: 10px;
  margin-top: 10px;
}
</style>

<script>
import Header from "@/components/Header.vue";
export default {
  components: {
    Header,
  },
  data() {
    return {
      sort_prior:"1",
      formInline: {
        user: "",
        ticket_type: "",
        restaurants: [],
        seat_type: "",
        state1: "",
        state2: "",
        city1: [],
        city2:[],
      },

      form: {
        company_type: [],
        price_type:[],
      },
      originalData:[],
      tableData: [],//当前数组
      defult_tabledata:[],
      /*  tableData: {
          company_name:'',
          vehicle_id:'',
          start_time:'',
          end_time:'',
          logo_url: require('')

        } */


      holder:"经济舱",
    };
  },
  methods: {
    onSubmit(index){
      this.$router.push({
        path:`/tickets/order`,
        query:{
          vehicle_id:this.tableData[index].vehiclE_ID,
          seat_type:this.formInline.seat_type,
        }
      })
      console.log(index);
    },
    multi_selest(){
      let temp=[];
      //console.log(this.form.company_type);
     // console.log(this.form.price_type);
      this.tableData=JSON.parse(JSON.stringify(this.originalData));
      for(let i=0;i<this.tableData.length;i++){
        let dec1=0;
        for(let j=0;j<this.show_company.length;j++){
          dec1=dec1||(this.form.company_type[j]==this.tableData[i].companY_NAME?1:0);
        }
        let dec2=0;
        for(let j=0;j<this.form.price_type.length;j++){

        if(this.form.price_type[j]=="2000以上")dec2=dec2||(this.tableData[i].price>2000?1:0);
        if(this.form.price_type[j]=="1000-2000")dec2=dec2||((this.tableData[i].price<=2000&&this.tableData[i].price>1000)?1:0);
        if(this.form.price_type[j]=="500-1000")dec2=dec2||((this.tableData[i].price<=1000&&this.tableData[i].price>500)?1:0);
        if(this.form.price_type[j]=="500以下")dec2=dec2||(this.tableData[i].price<=500?1:0);}
        let res=dec1&&dec2;

        if(res)temp.push(this.tableData[i]);
      }
     this.tableData=JSON.parse(JSON.stringify(temp));
     this.defult_tabledata=JSON.parse(JSON.stringify(temp));

    },
    newQuery(){
      if(this.formInline.ticket_type&&this.formInline.seat_type&&this.formInline.state1&&this.formInline.state2){
      this.$router.push({
        path:`/tickets/detail`,
        query:{
          ticket_type:this.formInline.ticket_type,
          from:this.formInline.state1,
          to:this.formInline.state2,
          seat_type:this.formInline.seat_type,
        }
        })

    }},
    querySearch1(queryString, cb) {
      var city1 = this.city1;
      var results = queryString
        ? city1.filter(this.createFilter(queryString))
        : city1;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
     querySearch2(queryString, cb) {
      var city2 = this.city2;
      var results = queryString
        ? city2.filter(this.createFilter(queryString))
        : city2;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (city) => {
        return (
          city.value.toLowerCase().indexOf(queryString.toLowerCase()) !=-1
        );
      };
    },

    typechange(val) {
      if (val == "2") {
        this.holder="一等座";

      } else {
        this.holder="经济舱";

      }
    },
    sort(){

      if(this.sort_prior=="1")this.tableData=JSON.parse(JSON.stringify(this.defult_tabledata));
      else if(this.sort_prior=="2"){
        this.tableData=JSON.parse(JSON.stringify(this.defult_tabledata));
      this.tableData.sort( function ( a , b ){ return  a.price - b.price } );}
      else {
        this.tableData=JSON.parse(JSON.stringify(this.defult_tabledata));
        this.tableData.sort( function ( a , b ){ return  b.price - a.price } );
        //this.tableData.reverse();
      }
    },
    async  load_vehicles(){
      this.formInline.state1=this.$route.query.from;
    this.formInline.ticket_type=this.$route.query.ticket_type;
    this.formInline.state2=this.$route.query.to;
    this.formInline.seat_type=this.$route.query.seat_type;
      let _this=this;
// eslint-disable-next-line no-unused-vars
return new Promise(function (resolve, reject) {
_this.$axios.get('http://49.234.18.247:8080/api/SeaVehBy/'+_this.formInline.ticket_type+'&'+_this.formInline.state1+'&'+_this.formInline.state2+'&'+_this.formInline.seat_type)
.then(function (response) {
  //console.log(response);
  for(var item in response.data){
    response.data[item].price=999;
  }
  _this.originalData=JSON.parse(JSON.stringify(response.data));
    //  console.log(_this.originalData);
 resolve();
 });
})
.catch(function (error) {
console.log(error);
});
    },

  async  load_price(){
      let _this=this;
     // console.log(_this.originalData);
// eslint-disable-next-line no-unused-vars
return new Promise(function (resolve, reject) {
for(let i=0;i< _this.originalData.length;i++){
  _this.$axios.get('http://49.234.18.247:8080/api/QueOptSeat/'+_this.originalData[i].vehiclE_ID+'&'+_this.originalData[i].seaT_TYPE)
  .then(function (response) {


     _this.originalData[i].price=Math.min.apply(Math, response.data.map(function(o) {return o.price}));
     _this.tableData=JSON.parse(JSON.stringify(_this.originalData));
     _this.defult_tabledata=JSON.parse(JSON.stringify(_this.originalData));
    // console.log(_this.originalData);

  })

  .catch(function (error) {

  console.log(error);
  });

  }

  console.log(_this.tableData);
  resolve();
  //console.log('_this.tableDat');
  //console.log(_this.tableData);

  })
},


  },
  async mounted() {
    let _this=this;
    await this.load_vehicles();
    await this.load_price();
  this.$axios.get('http://49.234.18.247:8080/api/ReturnPlace/%E8%B5%B7%E7%82%B9')
  .then(function (response) {
     _this.city1 = [];
          for (let i=0;i<response.data.length;i++) {
            _this.city1.push({"value": response.data[i]});
  }

  })
  .catch(function (error) {
  console.log(error);
  });
   this.$axios.get('http://49.234.18.247:8080/api/ReturnPlace/%E7%BB%88%E7%82%B9')
  .then(function (response) {
     _this.city2 = [];
          for (let i=0;i<response.data.length;i++) {
            _this.city2.push({"value": response.data[i]});
  }
  })

  .catch(function (error) {
  console.log(error);
  });

  },
  computed:{
    show_company(){
      var s=new Set();
      for(let i=0;i<this.originalData.length;i++){
        s.add(this.originalData[i].companY_NAME);
      }
      return Array.from(s);
    }
  }
};
</script>
