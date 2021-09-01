<template>
  <div class="fixed searchBox">
    <el-form :inline="true" :model="searchBox">
      <el-form-item>
        <el-popover
          class="popover1"
          placement="bottom"
          width="490"
          trigger="click"
        >
          <div class="allcity">
            <div id="hot" class="cityBox">
              <div class="label" style="font-size: 13px">热门</div>
              <div class="cities">
                <span
                  v-for="item in allcity.hotcity"
                  :key="item.index"
                  @click="cityClick(item)"
                  >{{ item }}</span
                >
              </div>
            </div>
            <div id="A" class="cityBox">
              <div class="label">A</div>
              <div class="cities">
                <span
                  v-for="item in allcity.A"
                  :key="item.index"
                  @click="cityClick(item)"
                  >{{ item }}</span
                >
              </div>
            </div>
            <div class="cityBox">
              <div class="label">B</div>
              <div class="cities">
                <span
                  v-for="item in allcity.B"
                  :key="item.index"
                  @click="cityClick(item)"
                  >{{ item }}</span
                >
              </div>
            </div>
            <div class="cityBox">
              <div class="label">C</div>
              <div class="cities">
                <span
                  v-for="item in allcity.C"
                  :key="item.index"
                  @click="cityClick(item)"
                  >{{ item }}</span
                >
              </div>
            </div>
            <div class="cityBox">
              <div class="label">D</div>
              <div class="cities">
                <span
                  v-for="item in allcity.D"
                  :key="item.index"
                  @click="cityClick(item)"
                  >{{ item }}</span
                >
              </div>
            </div>
            <div class="cityBox">
              <div class="label">E</div>
              <div class="cities">
                <span
                  v-for="item in allcity.E"
                  :key="item.index"
                  @click="cityClick(item)"
                  >{{ item }}</span
                >
              </div>
            </div>
            <div class="cityBox">
              <div id="F" class="label">F</div>
              <div class="cities">
                <span
                  v-for="item in allcity.F"
                  :key="item.index"
                  @click="cityClick(item)"
                  >{{ item }}</span
                >
              </div>
            </div>
            <div class="cityBox">
              <div class="label">G</div>
              <div class="cities">
                <span
                  v-for="item in allcity.G"
                  :key="item.index"
                  @click="cityClick(item)"
                  >{{ item }}</span
                >
              </div>
            </div>
            <div class="cityBox">
              <div class="label">H</div>
              <div class="cities">
                <span
                  v-for="item in allcity.H"
                  :key="item.index"
                  @click="cityClick(item)"
                  >{{ item }}</span
                >
              </div>
            </div>
            <div class="cityBox">
              <div class="label">J</div>
              <div class="cities">
                <span
                  v-for="item in allcity.J"
                  :key="item.index"
                  @click="cityClick(item)"
                  >{{ item }}</span
                >
              </div>
            </div>
            <div class="cityBox">
              <div class="label">K</div>
              <div class="cities">
                <span
                  v-for="item in allcity.K"
                  :key="item.index"
                  @click="cityClick(item)"
                  >{{ item }}</span
                >
              </div>
            </div>
            <div class="cityBox">
              <div id="L" class="label">L</div>
              <div class="cities">
                <span
                  v-for="item in allcity.L"
                  :key="item.index"
                  @click="cityClick(item)"
                  >{{ item }}</span
                >
              </div>
            </div>
            <div class="cityBox">
              <div class="label">M</div>
              <div class="cities">
                <span
                  v-for="item in allcity.M"
                  :key="item.index"
                  @click="cityClick(item)"
                  >{{ item }}</span
                >
              </div>
            </div>
            <div class="cityBox">
              <div class="label">N</div>
              <div class="cities">
                <span
                  v-for="item in allcity.N"
                  :key="item.index"
                  @click="cityClick(item)"
                  >{{ item }}</span
                >
              </div>
            </div>
            <div class="cityBox">
              <div class="label">P</div>
              <div class="cities">
                <span
                  v-for="item in allcity.P"
                  :key="item.index"
                  @click="cityClick(item)"
                  >{{ item }}</span
                >
              </div>
            </div>
            <div class="cityBox">
              <div class="label">Q</div>
              <div class="cities">
                <span
                  v-for="item in allcity.Q"
                  :key="item.index"
                  @click="cityClick(item)"
                  >{{ item }}</span
                >
              </div>
            </div>
            <div class="cityBox">
              <div id="R" class="label">R</div>
              <div class="cities">
                <span
                  v-for="item in allcity.R"
                  :key="item.index"
                  @click="cityClick(item)"
                  >{{ item }}</span
                >
              </div>
            </div>
            <div class="cityBox">
              <div class="label">S</div>
              <div class="cities">
                <span
                  v-for="item in allcity.S"
                  :key="item.index"
                  @click="cityClick(item)"
                  >{{ item }}</span
                >
              </div>
            </div>
            <div class="cityBox">
              <div class="label">T</div>
              <div class="cities">
                <span
                  v-for="item in allcity.T"
                  :key="item.index"
                  @click="cityClick(item)"
                  >{{ item }}</span
                >
              </div>
            </div>
            <div class="cityBox">
              <div class="label">W</div>
              <div class="cities">
                <span
                  v-for="item in allcity.W"
                  :key="item.index"
                  @click="cityClick(item)"
                  >{{ item }}</span
                >
              </div>
            </div>
            <div class="cityBox">
              <div class="label">X</div>
              <div class="cities">
                <span
                  v-for="item in allcity.X"
                  :key="item.index"
                  @click="cityClick(item)"
                  >{{ item }}</span
                >
              </div>
            </div>
            <div class="cityBox">
              <div id="Y" class="label">Y</div>
              <div class="cities">
                <span
                  v-for="item in allcity.Y"
                  :key="item.index"
                  @click="cityClick(item)"
                  >{{ item }}</span
                >
              </div>
            </div>
            <div class="cityBox">
              <div class="label">Z</div>
              <div class="cities">
                <span
                  v-for="item in allcity.Z"
                  :key="item.index"
                  @click="cityClick(item)"
                  >{{ item }}</span
                >
              </div>
            </div>
          </div>
          <el-input
            suffix-icon="el-icon-arrow-down"
            v-model="searchBox.input1"
            slot="reference"
          >
          </el-input>
        </el-popover>
      </el-form-item>

      <el-form-item>
        <el-popover placement="bottom" width="598" trigger="click">
          <div class="popover-content">
            <h4>热门景点</h4>
            <div>
              <span
                v-for="item in hotAttr"
                :key="item.index"
                @click="hotClick(item)"
                >{{ item }}</span
              >
            </div>
          </div>
          <el-input
            class="box2"
            placeholder="搜索目的地、景点……"
            v-model="searchBox.input2"
            slot="reference"
          >
          </el-input>
        </el-popover>
      </el-form-item>

      <el-form-item>
        <div class="search-btn el-icon-search" @click="searchClick"></div>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
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
a {
  display: block;
  width: 100%;
  height: auto;
}

.el-form--inline .el-form-item {
  margin-right: 0px;
}
.el-input /deep/.el-input--suffix .el-input__inner {
  padding-right: 0px;
}
.el-input /deep/ .el-input__inner {
  height: 60px;
  width: 350px;
  font-size: 16px;
  line-height: 60px;
  border: 1px solid lightgrey;
  border-radius: 0px;
}
/* 搜索框1 */
.allcity {
  height: 300px;
  overflow: scroll;
  overflow-x: hidden;
}

.allcity .label {
  margin-top: 20px;
  float: left;
  color: #0071c2;
  text-align: right;
  width: 40px;
}
.allcity .cities {
  margin-top: 20px;
  float: left;
  margin-left: 30px;
  width: 400px;
}
.allcity span {
  display: inline-block;
  width: 78px;
}
.allcity span:hover {
  color: #0071c2;
  cursor: pointer;
}

.box2 /deep/ .el-input__inner {
  width: 635px;
}
.popover-content h4 {
  text-indent: 2em;
  width: 595px;
  height: 30px;
  line-height: 30px;
  background-color: #f2f2f2;
}
.popover-content span {
  display: inline-block;
  width: 119px;
  height: 40px;
  line-height: 40px;
  text-align: center;
}
.popover-content span:hover {
  color: white;
  background-color: #0071c2;
}
.search-btn {
  height: 60px;
  width: 106px;
  font-size: 33px;
  background-color: #0071c2;
  color: white;
  line-height: 60px;
}
.search-btn:hover {
  cursor: pointer;
  background-color: #003680;
}
</style>

<script>
export default {
  data() {
    return {
      searchBox: {
        input1: "上海",
        input2: "",
      },
      allcity: {
        hotcity: [
          "北京",
          "上海",
          "成都",
          "重庆",
          "南京",
          "三亚",
          "西安",
          "厦门",
          "杭州",
          "广州",
          "哈尔滨",
          "苏州",

          "丽江",
        ],
        A: [
          "安吉",
          "安庆",
          "安康",
          "安阳",
          "安顺",
          "澳门",
          "阿克苏",
          "阿勒泰",
          "阿坝",
          "阿拉善",
          "阿拉尔",
          "阿里",
          "鞍山",
        ],
        B: [
          "亳州",
          "保亭",
          "保定",
          "保山",
          "包头",
          "北京",
          "北屯",
          "北海",
          "博尔塔拉",
          "宝鸡",
          "巴中",
          "巴彦淖尔",
          "巴音郭楞",
          "本溪",
          "毕节",
          "滨州",
          "白城",
          "白山",
          "白沙",
          "白银",
          "百色",
          "蚌埠",
        ],
        C: [
          "从化区",
          "崇左",
          "常州",
          "常德",
          "成都",
          "承德",
          "昌吉",
          "昌江",
          "昌都",
          "朝阳",
          "楚雄",
          "池州",
          "沧州",
          "滁州",
          "潮州",
          "澄迈",
          "赤峰",
          "郴州",
          "重庆",
          "长春",
          "长沙",
          "长治",
          "长白山",
        ],
        D: [
          "东方",
          "东莞",
          "东营",
          "丹东",
          "儋州",
          "大兴安岭",
          "大同",
          "大庆",
          "大理",
          "大连",
          "定安",
          "定西",
          "德宏",
          "德州",
          "德阳",
          "敦煌",
          "稻城",
          "达州",
          "迪庆",
          "都江堰",
        ],
        E: ["峨眉山", "恩施", "鄂尔多斯", "鄂州"],
        F: ["佛山", "凤凰", "抚州", "抚顺", "福州", "阜新", "阜阳", "防城港"],
        G: [
          "固原",
          "广元",
          "广安",
          "广州",
          "果洛",
          "桂林",
          "甘南",
          "甘孜",
          "贵港",
          "贵阳",
          "赣州",
          "高雄",
          "鼓浪屿",
        ],
        H: [
          "华山",
          "合肥",
          "呼伦贝尔",
          "呼和浩特",
          "和田",
          "哈密",
          "哈尔滨",
          "怀化",
          "惠东",
          "惠州",
          "杭州",
          "横店影视城",
          "汉中",
          "河池",
          "河源",
          "海东",
          "海北",
          "海口",
          "海林",
          "海西",
          "淮北",
          "淮南",
          "淮安",
          "湖州",
          "红河",
          "花莲",
          "菏泽",
          "葫芦岛",
          "衡水",
          "衡阳",
          "贺州",
          "邯郸",
          "香港",
          "鹤壁",
          "鹤岗",
          "黄冈",
          "黄南",
          "黄山",
          "黄果树",
          "黄石",
          "黑水",
          "黑河",
        ],
        J: [
          "九华山",
          "九寨沟",
          "九江",
          "佳木斯",
          "吉安",
          "吉林市",
          "嘉义县",
          "嘉义市",
          "嘉兴",
          "嘉峪关",
          "基隆",
          "揭阳",
          "晋中",
          "晋城",
          "景德镇",
          "江口",
          "江门",
          "济南",
          "济宁",
          "济源",
          "焦作",
          "荆州",
          "荆门",
          "酒泉",
          "金华",
          "金昌",
          "金门",
          "锦州",
          "鸡西",
        ],
        K: ["克孜勒苏", "克拉玛依", "喀什", "开封", "昆山", "昆明"],
        L: [
          "临夏",
          "临汾",
          "临沂",
          "临沧",
          "临高",
          "丽水",
          "丽江",
          "乐东",
          "乐山",
          "六安",
          "六盘水",
          "兰州",
          "凉山",
          "吕梁",
          "娄底",
          "庐山风景区",
          "廊坊",
          "拉萨",
          "来宾",
          "林芝",
          "柳州",
          "泸州",
          "泸沽湖",
          "洛阳",
          "漯河",
          "理县",
          "聊城",
          "辽源",
          "辽阳",
          "连云港",
          "陇南",
          "陵水",
          "龙岩",
        ],
        M: [
          "梅州",
          "漠河",
          "澳门",
          "牡丹江",
          "眉山",
          "绵阳",
          "苗栗",
          "茂名",
          "莫干山",
          "马祖",
          "马鞍山",
        ],
        N: [
          "内江",
          "南京",
          "南充",
          "南宁",
          "南平",
          "南投",
          "南昌",
          "南通",
          "南阳",
          "南靖",
          "宁德",
          "宁波",
          "怒江",
          "那曲",
        ],
        P: [
          "屏东",
          "平凉",
          "平顶山",
          "攀枝花",
          "普洱",
          "普陀山",
          "澎湖",
          "濮阳",
          "盘锦",
          "莆田",
          "萍乡",
        ],
        Q: [
          "七台河",
          "千岛湖",
          "庆阳",
          "曲靖",
          "泉州",
          "清远",
          "琼中",
          "琼海",
          "秦皇岛",
          "衢州",
          "钦州",
          "青岛",
          "黔东南",
          "黔南",
          "黔西南",
          "齐齐哈尔",
        ],
        R: ["日喀则", "日照"],
        S: [
          "三亚",
          "三明",
          "三沙",
          "三门峡",
          "上海",
          "上饶",
          "十堰",
          "双鸭山",
          "商丘",
          "商洛",
          "四平",
          "宿州",
          "宿迁",
          "山南",
          "朔州",
          "松原",
          "汕头",
          "汕尾",
          "沈阳",
          "深圳",
          "石嘴山",
          "石家庄",
          "石林",
          "石河子",
          "神农架",
          "绍兴",
          "绥化",
          "苏州",
          "遂宁",
          "邵阳",
          "随州",
          "韶关",
        ],
        T: [
          "台东",
          "台中",
          "台北",
          "台南",
          "台州",
          "吐鲁番",
          "唐山",
          "塔城",
          "天水",
          "天津",
          "太原",
          "太湖",
          "屯昌",
          "桃园",
          "泰安",
          "泰山",
          "泰州",
          "腾冲",
          "通化",
          "通辽",
          "铁岭",
          "铜仁",
          "铜川",
          "铜陵",
        ],
        W: [
          "万宁",
          "乌兰察布",
          "乌海",
          "乌镇",
          "乌鲁木齐",
          "五家渠",
          "五常",
          "五指山",
          "吴忠",
          "威海",
          "文山",
          "文昌",
          "无锡",
          "梧州",
          "武夷山",
          "武威",
          "武当山",
          "武汉",
          "武隆区",
          "温州",
          "渭南",
          "潍坊",
          "芜湖",
        ],
        X: [
          "万宁",
          "乌兰察布",
          "乌海",
          "乌镇",
          "乌鲁木齐",
          "五家渠",
          "五常",
          "五指山",
          "吴忠",
          "威海",
          "文山",
          "文昌",
          "无锡",
          "梧州",
          "武夷山",
          "武威",
          "武当山",
          "武汉",
          "武隆区",
          "温州",
          "渭南",
          "潍坊",
          "芜湖",
        ],
        Y: [
          "云林",
          "云浮",
          "伊春",
          "伊犁",
          "宜兰",
          "宜宾",
          "宜昌",
          "宜春",
          "岳阳",
          "延安",
          "延边",
          "扬州",
          "榆林",
          "永州",
          "烟台",
          "玉林",
          "玉树",
          "玉溪",
          "益阳",
          "盐城",
          "营口",
          "运城",
          "银川",
          "阳朔",
          "阳江",
          "阳泉",
          "雅安",
          "鹰潭",
        ],
        Z: [
          "中卫",
          "中山",
          "周口",
          "周庄",
          "张家口",
          "张家界",
          "张掖",
          "彰化",
          "昭通",
          "枣庄",
          "株洲",
          "淄博",
          "湛江",
          "漳州",
          "珠海",
          "肇庆",
          "自贡",
          "舟山",
          "资阳",
          "遵义",
          "郑州",
          "镇江",
          "驻马店",
        ],
      },
      hotAttr: [
        "外滩",
        "嘉北郊野公园",
        "迪士尼",
        "辰山植物园",
        "上海博物馆",
        "朱家角",
        "南京路",
        "上海欢乐谷",
      ],
      shanghai: [
        "外滩",
        "自然博物馆",
        "迪士尼",
        "辰山植物园",
        "上海博物馆",
        "朱家角",
        "南京街",
        "上海欢乐谷",
      ],
      beijing: [
        "故宫",
        "天坛",
        "鸟巢",
        "国家大剧院",
        "北京欢乐谷",
        "北海公园",
        "北京野生动物园",
      ],
      chengdu: [
        "大熊猫",
        "都江堰",
        "武侯祠",
        "杜甫草堂",
        "宽窄巷子",
        "海洋公园",
      ],
      nanjing: [
        "夫子庙",
        "秦淮河",
        "科举博物馆",
        "红山森林动物园",
        "总统府",
        "栖霞山",
      ],
      chongqing: [
        "磁器口",
        "天生三桥",
        "湖广会馆",
        "丰都鬼城",
        "洪崖洞",
        "长江索道",
        "大足石刻",
        "解放碑",
      ],
    };
  },
  methods: {
    cityClick(city) {
      this.searchBox.input1 = city;
      if (city.includes("上海")) {
        this.hotAttr = this.shanghai;
      } else if (city.includes("北京")) {
        this.hotAttr = this.beijing;
      } else if (city.includes("南京")) {
        this.hotAttr = this.nanjing;
      } else if (city.includes("成都")) {
        this.hotAttr = this.chengdu;
      } else if (city.includes("重庆")) {
        this.hotAttr = this.chongqing;
      } else {
        this.hotAttr = "暂无数据";
      }
    },
    searchClick() {
      if (this.searchBox.input2) {
        this.$axios
          .get(
            "http://49.234.18.247:8080/api/FunGetCommentNumByAttLocation/" +
              this.searchBox.input2
          )
          .then((response) => {
            if (response.data.length > 0) {
              console.log(response.data);
              this.$router.push({
                path: "/attraction/city",
                query: {
                  search: this.searchBox.input2,
                },
              });
            } else {
              this.$axios
                .get(
                  "http://49.234.18.247:8080/api/FunGetAttractionInfoByName/" +
                    this.searchBox.input2
                )
                .then((response) => {
                  if (response.data.length !== 0) {
                    this.$router.push({
                      path: "/attraction/city",
                      query: {
                        find: this.searchBox.input2,
                      },
                    });
                  } else {
                    this.$notify({
                      title: "尊敬的用户",
                      message:
                        "非常抱歉!我们暂无" +
                        this.searchBox.input2 +
                        "的相关信息！",
                      position: "top-left",
                    });
                  }
                });
            }
          });
      } else {
        this.$router.push({
          path: "/attraction/city",
          query: {
            search: this.searchBox.input1,
          },
        });
      }
    },
    hotClick(value) {
      this.$router.push({
        path: "/attraction/city",
        query: {
          find: value,
        },
      });
    },
  },
};
</script>
