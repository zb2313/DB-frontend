<template>
  <el-container direction="vertical">
    <Header activeIndex="0" />
    <!-- 搜索区域 -->
    <div
      class="search"
      :style="{
        backgroundImage: 'url(' + coverImgUrl + ')',
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
      }"
    >
      <div class="block">
        <h1 style="font-size: 30px">搜索预订美好体验</h1>
        <p style="margin-top: 4px">发现目的地更多精彩活动，尽享欢乐旅程</p>
        <!-- 搜索框 -->
        <el-row type="flex">
          <el-col :span="16"
            ><div>
              <el-input
                v-model="input"
                placeholder="搜索旅行地/酒店/景点……"
              ></el-input></div
          ></el-col>
          <el-col :span="2"
            ><div>
              <el-button type="primary" icon="el-icon-search" @click="onSearch"
                >搜索</el-button
              >
            </div></el-col
          >
        </el-row>
      </div>
    </div>

    <!-- 内容展示区域 -->
    <el-main>
      <div class="attraction main">
        <h2 class="title">
          <span @click="onClick(0, 0)" :class="{ titleClick: show[0] == 0 }"
            >门票<i v-show="!show[0]"></i
          ></span>
          <span @click="onClick(0, 1)" :class="{ titleClick: show[0] == 1 }"
            >周边游<i v-show="show[0]"></i
          ></span>

          <span class="more">
            <router-link to="/attraction/city?search=全部">
              更多景点
              <div class="el-icon-arrow-right right-arrow"></div> </router-link
          ></span>
          <span class="dropdown" v-if="!show[0]">
            <el-popover placement="bottom-end" width="50" trigger="click"
              ><div class="drop-content">
                <span
                  v-for="item in attrDropdown"
                  :key="item.index"
                  @click="changeCity1(item)"
                  >{{ item }}</span
                >
              </div>
              <span
                slot="reference"
                style="color: #0071c2; font-size: 14px; float: right"
                class="drop-btn"
                >玩在{{ attrStart }}
                <div class="el-icon-caret-bottom"></div
              ></span>
            </el-popover>
          </span>
        </h2>

        <div class="attrBox Box1" v-if="!show[0]">
          <div class="rightBox">
            <dl class="keyword-short">
              <dt>热门主题游</dt>
              <dd>
                <span title="地标">
                  <router-link to="/attraction/city?search=全部&label=地标">
                    地标
                  </router-link>
                </span>
                <el-divider direction="vertical"></el-divider>
                <span title="亲子">
                  <router-link to="/attraction/city?search=全部&label=亲子">
                    亲子
                  </router-link>
                </span>
                <el-divider direction="vertical"></el-divider>
                <span title="建筑">
                  <router-link to="/attraction/city?search=全部&label=建筑">
                    建筑
                  </router-link>
                </span>
              </dd>

              <dd style="margin-top: 10px">
                <span title="休闲">
                  <router-link to="/attraction/city?search=全部&label=休闲">
                    休闲
                  </router-link>
                </span>
                <el-divider direction="vertical"></el-divider>
                <span title="历史">
                  <router-link to="/attraction/city?search=全部&label=历史">
                    历史
                  </router-link>
                </span>
              </dd>
            </dl>

            <dl class="keyword-short" style="margin-top: 30px">
              <dt>热门目的地</dt>
              <dd>
                <span title="北京">
                  <router-link to="/attraction/city?search=北京">
                    北京
                  </router-link>
                </span>
                <el-divider direction="vertical"></el-divider>
                <span title="上海">
                  <router-link to="/attraction/city?search=上海">
                    上海
                  </router-link>
                </span>
                <el-divider direction="vertical"></el-divider>
                <span title="南京">
                  <router-link to="/attraction/city?search=南京">
                    南京
                  </router-link>
                </span>
              </dd>

              <dd style="margin-top: 10px">
                <span title="成都">
                  <router-link to="/attraction/city?search=成都">
                    成都
                  </router-link>
                </span>
                <el-divider direction="vertical"></el-divider>
                <span title="乌鲁木齐">
                  <router-link to="/attraction/city?search=乌鲁木齐">
                    乌鲁木齐
                  </router-link>
                </span>
                <el-divider direction="vertical"></el-divider>
                <span title="重庆">
                  <router-link to="/attraction/city?search=重庆">
                    重庆
                  </router-link>
                </span>
              </dd>
            </dl>
          </div>
          <div class="leftBox">
            <div
              class="attriInfo"
              v-for="(item, index) in attractions.slice(0, 6)"
              :key="index"
              @click="toArrDetail(item.attractionid)"
            >
              <div
                class="infoImg"
                :style="{
                  backgroundImage: 'url(' + item.picture + ')',
                  backgroundSize: '100% 100%',
                  backgroundRepeat: 'no-repeat',
                }"
              ></div>
              <div class="infoDetail">
                <div class="Name" style="font-size: 14px">
                  {{ item.attractionname }}
                </div>
                <div
                  v-show="!item.star"
                  style="
                    height: 20px;
                    width: 50px;
                    font-size: 12px;
                    margin-top: 2px;
                    color: lightgray;
                  "
                >
                  暂无评分
                </div>
                <img
                  src="../assets/img/star.svg"
                  v-for="i in item.star"
                  :key="i"
                  style="margin-top: 2px"
                />
                <div class="Details">
                  <span class="address">{{ fun_district(item.location) }}</span>
                  <span class="price price1">{{ item.price }}元</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="attrBox Box1" v-else>
          <div
            class="districtBtn"
            v-for="(item, index) in district"
            :key="index"
            @click="districtClick(index)"
            :class="{ districtClick: districtIndex == index }"
          >
            {{ item }}
          </div>
          <div class="moreCity">
            <div
              class="box"
              v-for="item in moreCity"
              :key="item.index"
              :style="{
                backgroundImage: 'url(' + item.img + ')',
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat',
              }"
            >
              <div class="mask" @click="moreCityClick(item.cityname)">
                <div class="text">
                  <h4>{{ item.cityname }}</h4>
                  <p>{{ item.num }}项</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="hotel main">
        <h2 class="title">
          <span @click="onClick(1, 0)" :class="{ titleClick: show[1] == 0 }"
            >国内酒店<i v-show="!show[1]"></i
          ></span>
          <span @click="onClick(1, 1)" :class="{ titleClick: show[1] == 1 }"
            >国外酒店<i v-show="show[1]"></i
          ></span>

          <span class="more">
            <router-link to="/hotel/city?search=全部">
              更多酒店
              <div class="el-icon-arrow-right right-arrow"></div> </router-link
          ></span>
          <span class="dropdown" v-if="!show[1]">
            <el-popover placement="bottom-end" width="50" trigger="click"
              ><div class="drop-content">
                <span
                  v-for="item in attrDropdown"
                  :key="item.index"
                  @click="changeCity2(item)"
                  >{{ item }}</span
                >
              </div>
              <span
                slot="reference"
                style="color: #0071c2; font-size: 14px; float: right"
                class="drop-btn"
                >住在{{ hotelStart }}
                <div class="el-icon-caret-bottom"></div
              ></span>
            </el-popover>
          </span>
        </h2>

        <div class="hotelBox Box1" v-if="!show[1]">
          <div class="rightBox">
            <dl class="keyword-short">
              <dt>热门地标周边酒店</dt>
              <dd>
                <span>
                  <a href="" target="_blank"> 还没想好周末去哪玩？</a>
                </span>
              </dd>
            </dl>

            <dl class="keyword-short" style="margin-top: 30px">
              <dt>促销</dt>
              <dd style="margin-top: 10px">
                <span>
                  <a href="" target="_blank"> 全国火车站周边酒店8折起</a>
                </span>
              </dd>
              <dd style="margin-top: 10px">
                <span>
                  <a href="" target="_blank"> 全国机场周边酒店8折起</a>
                </span>
              </dd>
              <dd style="margin-top: 10px">
                <span>
                  <a href="" target="_blank"> 优选酒店80元起</a>
                </span>
              </dd>
            </dl>
          </div>
          <div class="leftBox">
            <div
              class="hotelInfo"
              v-for="(item, index) in hotels.slice(0, 6)"
              :key="index"
              @click="toHotelDetail(item.hoteid)"
            >
              <div
                class="infoImg"
                :style="{
                  backgroundImage: 'url(' + item.picture + ')',
                  backgroundSize: '100% 100%',
                  backgroundRepeat: 'no-repeat',
                }"
              ></div>
              <div class="infoDetail">
                <div class="Name" style="font-size: 14px">
                  {{ item.hotelname.split("(")[0] }}
                </div>
                <img
                  src="../assets/img/diamond.svg"
                  v-for="i in item.star"
                  :key="i"
                  style="margin-top: 2px"
                />
                <div class="Details">
                  <span class="address">{{
                    fun_hotel_district(item.location)
                  }}</span>
                  <span class="Price"
                    ><span class="price"> ￥{{ item.lowestprice }}</span
                    ><i>起</i></span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="hotelBox Box1" v-if="show[1]">
          <el-empty :image-size="200"></el-empty>
        </div>
      </div>

      <div class="tickets main">
        <h2 class="title">
          <span @click="onClick(2, 0)" :class="{ titleClick: show[2] == 0 }"
            >国内特价机票<i v-show="!show[2]"></i
          ></span>
          <span @click="onClick(2, 1)" :class="{ titleClick: show[2] == 1 }"
            >国际特价机票<i v-show="show[2]"></i
          ></span>

          <span class="more"
            ><router-link to="/tickets">
              更多机票
              <div class="el-icon-arrow-right right-arrow"></div> </router-link
          ></span>

          <span class="dropdown" v-if="!show[2]">
            <el-popover placement="bottom-end" width="50" trigger="click"
              ><div class="drop-content">
                <span
                  v-for="item in ticketDropdown"
                  :key="item.index"
                  @click="changeCity3(item)"
                  >{{ item }}</span
                >
              </div>
              <span
                slot="reference"
                style="color: #0071c2; font-size: 14px; float: right"
                class="drop-btn"
                >{{ ticketStart }}出发
                <div class="el-icon-caret-bottom"></div
              ></span>
            </el-popover>
          </span>
        </h2>
        <div class="Box2" v-if="!show[2]">
          <div class="ticketBox">
            <div
              class="ticketInfo"
              v-for="item in tickets.slice(0, 12)"
              :key="item.index"
            >
              <div class="item-company">{{ item.companY_NAME }}</div>
              <div class="item-name">
                {{ item.starT_AIRPORT }}
                <div class="dancheng"></div>
                {{ item.enD_AIRPORT.slice(2) }}
              </div>
              <div class="item-date">
                {{ item.starT_TIME }} — {{ item.enD_TIME }}
              </div>
              <div class="item-info">
                <strong>￥{{ item.price }}</strong
                ><i>起</i>
                <div
                  class="item-btn"
                  @click="
                    toTicketDetail(
                      item.starT_TIME,
                      item.enD_AIRPORT.slice(0, 2)
                    )
                  "
                >
                  立抢
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="Box1" v-if="show[2]">
          <el-empty :image-size="200"></el-empty>
        </div>
      </div>
    </el-main>

    <Footer />
  </el-container>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
export default {
  name: "Homepage",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      coverImgUrl: require("../assets/img/scene.jpg"),
      currentCity: "",
      adcode: 110101,
      weather: "",
      attrStart: "北京",
      hotelStart: "北京",
      ticketStart: "北京",
      ticketEnd: "上海",
      attrDropdown: [
        "上海",
        "北京",
        "兰州",
        "南京",
        "重庆",
        "深圳",
        "桂林",
        "苏州",
      ],
      ticketDropdown: [
        "上海",
        "北京",
        "广州",
        "南京",
        "重庆",
        "深圳",
        "桂林",
        "苏州",
      ],
      show: [0, 0, 0],
      attractions: [],
      hotels: [],
      tickets: [],
      input: "",
      districtIndex: 0,
      moreCity: [],
      district: [
        "华东",
        "华南",
        "华北",
        "华中",
        "东北",
        "西南",
        "西北",
        "东南",
        "青藏",
      ],
      East: [
        {
          city: "上海",
          img: "https://tse1-mm.cn.bing.net/th/id/R-C.fd4071651758c92e3dbe30e03bf53125?rik=6vUCEGSS%2fklXWw&riu=http%3a%2f%2fseopic.699pic.com%2fphoto%2f50027%2f8290.jpg_wh1200.jpg&ehk=YbR7p0eYqa8bC2GyAkDaBpu0M0nWgnCooQ44elA8Y3A%3d&risl=&pid=ImgRaw&r=0",
        },
        {
          city: "杭州",
          img: "https://tse4-mm.cn.bing.net/th/id/OIP-C.gUDmbZXLq-pjjaY_SDyrNAHaEo?pid=ImgDet&rs=1",
        },
        {
          city: "嘉兴",
          img: "http://youimg1.c-ctrip.com/target/tg/724/140/612/1afd0d13fb454f70944f8f7eb05d1d47.jpg",
        },
        {
          city: "苏州",
          img: "https://tse1-mm.cn.bing.net/th/id/R-C.7d4ca9938806f0946a2a7ef783b36c2f?rik=nSfApmlhLx47Zg&riu=http%3a%2f%2fpic13.nipic.com%2f20110304%2f6647776_112750640147_2.jpg&ehk=ayL%2f51d5IgMK92LX6Rv%2f%2bTnHyXUJpPxcWLlqNX%2f%2bSsk%3d&risl=&pid=ImgRaw&r=0",
        },
        {
          city: "无锡",
          img: "https://tse1-mm.cn.bing.net/th/id/OIP-C.d3Kfe2neFkI8iaoz23dzLgHaE8?pid=ImgDet&rs=1",
        },
        {
          city: "南京",
          img: "https://tse1-mm.cn.bing.net/th/id/R-C.d87aa69fc20c3666cd8dc6a8b8381ac5?rik=xASHZ5wXZLvdZg&riu=http%3a%2f%2fseopic.699pic.com%2fphoto%2f50120%2f4922.jpg_wh1200.jpg&ehk=DCEYR9WLT1Sg1%2fLlN0CHJIfsP85XPBEOK2lDDz98Qz8%3d&risl=&pid=ImgRaw&r=0",
        },
        {
          city: "舟山",
          img: "https://tse1-mm.cn.bing.net/th/id/R-C.26c06babfc145e5b18e85fb9f0cbc9f1?rik=FGSBrhHZpTnojA&riu=http%3a%2f%2fp8.itc.cn%2fq_70%2fimages03%2f20200918%2ff6eef8dda15f4475aa53a3c59725a728.jpeg&ehk=6OpqN2OwrL%2fLMe8B%2bcF4ZxhlDNyWTZFO5b5OlC0uQdw%3d&risl=&pid=ImgRaw&r=0",
        },
        {
          city: "宁波",
          img: "https://n.sinaimg.cn/sinakd20201221s/685/w950h535/20201221/f23a-kfnaptu6578615.jpg",
        },
      ],
      South: [
        {
          city: "桂林",
          img: "https://tse1-mm.cn.bing.net/th/id/OIP-C.-7UVd36uMUXaRx0AnXTP7AHaFh?pid=ImgDet&rs=1",
        },
        {
          city: "北海",
          img: "https://tr-osdcp.qunarzz.com/tr-osd-tr-manager/img/42464c7eb92074321a15a37633b15739.jpg",
        },
        {
          city: "三亚",
          img: "https://tse1-mm.cn.bing.net/th/id/R-C.45b994ca132c08ceeb0530d6d8ed4755?rik=QE7MkYuPgFVkUQ&riu=http%3a%2f%2fwww.jinmalvyou.com%2fPublic%2fjs%2fkindeditor%2fattached%2fimage%2f20171207%2f20171207163031_75018.jpg&ehk=Jq424vohijs5AFNzqNmkowgMsqezf68cdLvkMiVEQJw%3d&risl=&pid=ImgRaw&r=0",
        },
        {
          city: "海口",
          img: "https://tse1-mm.cn.bing.net/th/id/R-C.723b294d79736b312d51914ceaabf41e?rik=QnBt5eb5TDRbGw&riu=http%3a%2f%2fwww.dazijia.com%2fUploads%2fgonglue%2f20190718%2f5d30686df1903.jpeg&ehk=A8rgCM0lmIn10FT0S3wn0Y%2b%2b%2fbmyiJWCeUbiNDt7wLY%3d&risl=&pid=ImgRaw&r=0",
        },
        {
          city: "广州",
          img: "https://img.zcool.cn/community/01e9265aee648ea801219b7f672df5.jpg@1280w_1l_2o_100sh.jpg",
        },
        {
          city: "深圳",
          img: "https://img.zcool.cn/community/01d8835d36bd08a8012187f40438fc.jpg@3000w_1l_0o_100sh.jpg",
        },
        {
          city: "香港",
          img: "https://tse1-mm.cn.bing.net/th/id/R-C.07869c62b3af21c995784b0a1b1856a1?rik=ewpT3RVILvuxlA&riu=http%3a%2f%2fseopic.699pic.com%2fphoto%2f50111%2f3200.jpg_wh1200.jpg&ehk=8vlvh37sYK8Qubhyx%2fOQ%2f4egGS9flCO9emw5fozkblU%3d&risl=&pid=ImgRaw&r=0",
        },
        {
          city: "澳门",
          img: "https://marriotteventsasia.com.cn/wp-content/uploads/2020/10/mfmsi-attraction-tower-3410-ver-clsc.jpg",
        },
      ],
      North: [
        {
          city: "北京",
          img: "https://tse1-mm.cn.bing.net/th/id/OIP-C.2sFT0VRnh4BNRuPG6PGoTQHaD-?pid=ImgDet&rs=1",
        },
        {
          city: "天津",
          img: "https://tse1-mm.cn.bing.net/th/id/R-C.4713c7b9f10db60652874a6bc1d79b73?rik=uSuQ13B4DgZ9qw&riu=http%3a%2f%2fup.deskcity.org%2fpic_source%2f47%2f13%2fc7%2f4713c7b9f10db60652874a6bc1d79b73.jpg&ehk=l09xJ8Bl%2fu%2bZNAu%2bgG1HyjsVZudmrzmzheeR05IJVQs%3d&risl=&pid=ImgRaw&r=0",
        },
        {
          city: "张家口",
          img: "https://tse1-mm.cn.bing.net/th/id/R-C.fee3e2bc35726f0dfc20a48541066bc8?rik=Xceaj4IBRRmNSg&riu=http%3a%2f%2fwhgdly.zjk.gov.cn%2fupload2%2fimages%2f2014%2f12%2f23105414953.png&ehk=tOxInOg%2bUbTCYGjEYfe5qKPmzGdQm0SyJJi%2f33meP5M%3d&risl=&pid=ImgRaw&r=0",
        },
        {
          city: "唐山",
          img: "https://tse1-mm.cn.bing.net/th/id/R-C.fb18fa638f989cdc49bbc22076f452a9?rik=%2fLqCOKsTE8Taxw&riu=http%3a%2f%2fwww.planning.org.cn%2fcase%2fuploads%2f2014%2f04%2f4984_1398753429.jpg&ehk=Yul3%2fT8nZ6xhqAnY9B3u4bPEh3QOd76%2bCZ3iMrIDFJg%3d&risl=&pid=ImgRaw&r=0",
        },
        {
          city: "呼和浩特",
          img: "https://pic.iranshao.com/photo/image/6f617678b3c28b212f5faba81d600f4e.jpg!660x360",
        },
        {
          city: "鄂尔多斯",
          img: "https://tse1-mm.cn.bing.net/th/id/R-C.871b901a7297c643ff643ea25ad083a9?rik=G%2bzRudTV8ufzGw&riu=http%3a%2f%2finews.gtimg.com%2fnewsapp_match%2f0%2f4686658162%2f0&ehk=g6Qaa5zx21wu0hF0N6f%2brYZJqjCCNaklsvAZnEbGPYY%3d&risl=&pid=ImgRaw&r=0",
        },
        {
          city: "呼伦贝尔",
          img: "https://tse1-mm.cn.bing.net/th/id/R-C.d223badbdb5959843421884429951c9e?rik=LcGOwuZvi9eO5Q&riu=http%3a%2f%2fwww.04700.cn%2fuploadfile%2f2020%2f0428%2f20200428104427998.jpg&ehk=qmrvXHPUeiq2NAAVAulLxFxjnBE3v43T1ItMw%2flPptg%3d&risl=&pid=ImgRaw&r=0",
        },
        {
          city: "包头",
          img: "https://youimg1.c-ctrip.com/target/10041700000139v3s9433.jpg",
        },
      ],
      Center: [
        {
          city: "西安",
          img: "https://tse1-mm.cn.bing.net/th/id/R-C.156ba713b36f78eaad37b92d92207a89?rik=XeVgdc1wAP4%2bkw&riu=http%3a%2f%2fi1.hdslb.com%2fbfs%2farchive%2f9ca0bc904223a641a8eea5fd7b44d37c66120e13.jpg&ehk=qHweFAYNv%2fUAIisggYfP6HIp55bw%2bNbPa9lro4YM7tA%3d&risl=&pid=ImgRaw&r=0",
        },
        {
          city: "洛阳",
          img: "https://tse1-mm.cn.bing.net/th/id/R-C.5468dfbad8bda038106cffefaade48e2?rik=zcjuEEx9BPSwyA&riu=http%3a%2f%2fimage.urbanlight.cn%2f2020%2f04%2f6372385254264683212925314.png&ehk=U4kkZbf1yYTMPDwJqJSavCGMmoMPcne8h1MlsbyUruw%3d&risl=&pid=ImgRaw&r=0",
        },
        {
          city: "青岛",
          img: "https://tse1-mm.cn.bing.net/th/id/R-C.d62347666e13a8e3c0bd967e6a737e5e?rik=61RQ%2fGISetKzAg&riu=http%3a%2f%2fx0.ifengimg.com%2fcmpp%2f2019_50%2f7d7f3ee13f7611d_size942_w1920_h1272.jpg&ehk=oRrP5%2buJyOMG9WzX0SRgGdq08mNaFv2GJVhmH7ye7SU%3d&risl=&pid=ImgRaw&r=0",
        },
        {
          city: "济南",
          img: "https://tse1-mm.cn.bing.net/th/id/R-C.7944d74a22810e27d5f93985689dcb71?rik=wTOuWl%2b225C2Gg&riu=http%3a%2f%2fseopic.699pic.com%2fphoto%2f50129%2f2785.jpg_wh1200.jpg&ehk=N7OnMEfqA7%2bLHJTp2xot%2fl4p92lv3ixC6pzWWdU4gGc%3d&risl=&pid=ImgRaw&r=0",
        },
        {
          city: "张家界",
          img: "https://tse1-mm.cn.bing.net/th/id/R-C.b4f80c2b5cbb25b5a87c0b86ef07abad?rik=ca0RPCFbRoCchA&riu=http%3a%2f%2fwww.zjj-cts.com%2fupload%2f2016%2f11%2f1479820532741.jpg&ehk=pZjdy%2fUjFzNneITNNqHB16cdLVgKaY4jjLkE%2bUVaqEs%3d&risl=&pid=ImgRaw&r=0",
        },
        {
          city: "武汉",
          img: "https://pic1.zhimg.com/v2-207d9c4720977eb5f5df7a6d66b43650_r.jpg?source=172ae18b",
        },
        {
          city: "南昌",
          img: "https://sucai.zhipianbang.com/img/2020/02/27/e2fc1f1ee474ebb6e8ece20c8c1a9623.jpg",
        },
        {
          city: "恩施",
          img: "https://5b0988e595225.cdn.sohucs.com/images/20190920/dfc9e218b40d4a2887b8ebeb10a7368d.jpeg",
        },
      ],
      NorthEast: [
        {
          city: "大连",
          img: "https://tse1-mm.cn.bing.net/th/id/R-C.53f32dab217b794f5f9cdafc003741d1?rik=9XfSFD2oBwWV9g&riu=http%3a%2f%2fimg.ewebweb.com%2fuploads%2f20200406%2f01%2f1586106874-VvAfnwUoNs.jpeg&ehk=iDbOw38sMkxv%2fdBzKegdLJdsOvlH6BnOKFEoMLdfyBk%3d&risl=&pid=ImgRaw&r=0",
        },
        {
          city: "沈阳",
          img: "https://tse1-mm.cn.bing.net/th/id/R-C.8bed0c97ea84986138668e6b9243dbb0?rik=gf%2f1yEAhG9tsdA&riu=http%3a%2f%2fimages2.fengjing.com%2forginpicSL%2f20110210%2f20110210094005843.jpg&ehk=ZVwhvua3tvf8%2fHHAtVhaIwl59Zwhvtqevox2KywY9ck%3d&risl=&pid=ImgRaw&r=0",
        },
        {
          city: "哈尔滨",
          img: "https://tse1-mm.cn.bing.net/th/id/R-C.1cea6f705779fb519096f90d4d27dbf1?rik=i2Z9mXSFjJY1uA&riu=http%3a%2f%2fp0.itc.cn%2fimages01%2f20200613%2f3645893ffeb349b2bcae27d580331a6b.jpeg&ehk=3qDPQmM3q%2bcOlYkNZ9kVukcLseO1fGNO4rQb9qsT4Q4%3d&risl=&pid=ImgRaw&r=0",
        },
        {
          city: "大兴安岭",
          img: "https://tse1-mm.cn.bing.net/th/id/R-C.69b45345f1f91f92f0955478c7c4ea9a?rik=3zI4O7U1Z6AOZg&riu=http%3a%2f%2f5b0988e595225.cdn.sohucs.com%2fimages%2f20190908%2f7e5ff545d7d2472a976d35de67fc3f17.jpeg&ehk=G6T6HzJtxnqyPpoU8camEwGga3aXZusNHF6AS%2bHR7V8%3d&risl=1&pid=ImgRaw&r=0",
        },
        {
          city: "牡丹江",
          img: "https://tse1-mm.cn.bing.net/th/id/R-C.d14d15d042933e5c2a193a0351ee125e?rik=TTVmzhS6uyuCtw&riu=http%3a%2f%2fpic5.40017.cn%2f03%2f000%2f65%2f7c%2frBANB1x9-ZWAIOfYAAIPuqDBRUI921.jpg&ehk=5LeMX2PDnWBLnotJFAzWHC02Ipx6w0wqtPh7zlj8jDo%3d&risl=&pid=ImgRaw&r=0",
        },
      ],
      SouthWest: [
        {
          city: "重庆",
          img: "https://img.zcool.cn/community/0191ef5a310e79a80121db8045d368.jpg@1280w_1l_2o_100sh.jpg",
        },
        {
          city: "成都",
          img: "https://tse1-mm.cn.bing.net/th/id/R-C.893f090707df8043a034bcaca0c481ad?rik=mXQuqliFY4ZfLw&riu=http%3a%2f%2fwww.desktx.com%2fd%2ffile%2fscreen%2f20170206%2f3aaf92cfece919e50ed1724fa88b05d6.jpg&ehk=pt7qnD0h6tMsRs%2fjpG4QLvunY1Qpv4IGzqWQJ7JG92w%3d&risl=&pid=ImgRaw&r=0",
        },
        {
          city: "乐山",
          img: "https://tse1-mm.cn.bing.net/th/id/R-C.36ce19d6dac37f5025394af0df60119f?rik=4BvWXyT%2bhG9RJA&riu=http%3a%2f%2fp5.itc.cn%2fq_70%2fimages03%2f20201122%2f503641d0381e4ff29b81a49985c5fd4c.jpeg&ehk=7u4lwZR41FnKXh%2bYwoTrtCwNBq%2fWUxuht92AucEcsUA%3d&risl=&pid=ImgRaw&r=0",
        },
        {
          city: "西昌",
          img: "https://epaper.scdaily.cn/scrb/20171106/7df3617dde898c4961d02ae7d37cb16e.jpg",
        },
        {
          city: "大理",
          img: "https://gss0.baidu.com/7Po3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/5d6034a85edf8db1dc03302a0723dd54564e744a.jpg",
        },
        {
          city: "昆明",
          img: "https://dssbfile.ydgz.kmzscc.com/newUploads/image/2019/09/12/5d799feab6b32.jpg",
        },
        {
          city: "香格里拉",
          img: "https://pic3.zhimg.com/v2-b53b61f4e659762501c0dd496d4d66ff_1200x500.jpg",
        },
        {
          city: "丽江",
          img: "https://img1.qunarzz.com/travel/poi/1806/d1/5f53dd6f3b80ea37.png_r_720x400x95_01b8b747.png",
        },
      ],
      NorthWest: [
        {
          city: "乌鲁木齐",
          img: "https://pic4.zhimg.com/v2-3ce48abf488bdce3f2357099c00dd9ee_720w.jpg?source=172ae18b",
        },
        {
          city: "阿泰勒",
          img: "https://pic1.zhimg.com/v2-45675d9c62a13e93e144cb9c033dcf99_r.jpg",
        },
        {
          city: "吐鲁番",
          img: "https://tse1-mm.cn.bing.net/th/id/R-C.a6f120f318c70d01aa4f7687cc75f6d6?rik=ue8TZO%2fZPW2rrQ&riu=http%3a%2f%2fimages1.aoyou.cc%2fhomepage%2fNewsNotice%2f201202%2f0N6T6P09131459.jpg&ehk=pd%2fFgkOksqV7oEBytOWmAgo888Lbt%2f6jlTk4yFOqU84%3d&risl=&pid=ImgRaw&r=0",
        },
        {
          city: "张掖",
          img: "https://pic2.zhimg.com/v2-67f09ec94c8575cd7dad5f3a98f988e0_r.jpg?source=1940ef5c",
        },
        {
          city: "酒泉",
          img: "https://gss0.baidu.com/9fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/d833c895d143ad4be38bde978f025aafa40f063b.jpg",
        },
        {
          city: "嘉峪关",
          img: "https://tse1-mm.cn.bing.net/th/id/R-C.219df8734291fb1169c9bbf2e36e73a7?rik=s%2bAtVcfs5KhZ%2fA&riu=http%3a%2f%2fqmtx.tourgansu.com%2fupload%2f20180613%2f402836c063ab912c0163f74d15de007c.jpg&ehk=3I7TDFpyJ1LAhW%2fh0eK2s2A9gsO1%2btTB7EFUG7%2bOXAQ%3d&risl=&pid=ImgRaw&r=0",
        },
        {
          city: "兰州",
          img: "https://img95.699pic.com/photo/50123/2309.jpg_wh860.jpg",
        },
        {
          city: "西宁",
          img: "https://tr-osdcp.qunarzz.com/tr-osd-tr-manager/img/da63743b75b0eb600eb0bb76f4ccca4d.jpg",
        },
      ],
      SouthEast: [
        {
          city: "厦门",
          img: "https://gss0.baidu.com/-4o3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/dc54564e9258d109972fe8a0dc58ccbf6d814dd7.jpg",
        },
        {
          city: "漳州",
          img: "https://huiquanbao.oss-cn-beijing.aliyuncs.com/6/portal/attachment/69/2019/10/10/d626005f87f31d8430a47ed94522417c9ace1680.jpg",
        },
        {
          city: "福州",
          img: "https://img.zcool.cn/community/018dc75bc2a129a8012099c89ed1b6.jpg@1280w_1l_2o_100sh.jpg",
        },
        {
          city: "台北",
          img: "https://tse1-mm.cn.bing.net/th/id/R-C.77831b1736cfe6587c8518a0b8383cc5?rik=HK3bxro3HIf4Hw&riu=http%3a%2f%2fyouimg1.c-ctrip.com%2ftarget%2f100a060000001ad3r18CA.jpg&ehk=dw0yxttPKpzx5sUJXP7%2b%2bZT%2fUTo2J2ijRsuJcrXgMug%3d&risl=&pid=ImgRaw&r=0",
        },
      ],
      Tibet: [
        {
          city: "拉萨",
          img: "https://tse1-mm.cn.bing.net/th/id/R-C.59c454cb1b9e1bf2e3eaee65e3edf323?rik=puOulLJhluDruQ&riu=http%3a%2f%2fwww.dazijia.com%2fUploads%2fgonglue%2f20180514%2fpcgonglue_5af9a96b82a4a.jpg&ehk=EN3K8Dkt7e6q06hIM%2fel%2bcDfBiSiszZTwTmajf5mJc4%3d&risl=&pid=ImgRaw&r=0",
        },
        {
          city: "林芝",
          img: "https://tse1-mm.cn.bing.net/th/id/R-C.8a6fc1bd9257c3475747039a27ba28d1?rik=B%2btqiROJWk6HZw&riu=http%3a%2f%2f5b0988e595225.cdn.sohucs.com%2fimages%2f20171226%2fc0b2a6d709244e5293eecf569c3777db.jpeg&ehk=Dul8mkk%2bFV1qACQw6yMhpXfLOgaKi19QdvT7uIy%2f0ao%3d&risl=&pid=ImgRaw&r=0",
        },
        {
          city: "日喀则",
          img: "https://pic2.zhimg.com/v2-8b50e09321f11de80ae28773aae5fb01_r.jpg",
        },
      ],
    };
  },
  methods: {
    // 点击搜索按钮
    onSearch() {
      var cities =
        "上海市嘉定区浦东区黄埔区朱家松江区普陀区;北京市东城区昌平区海淀区丰台区西城区;南京市秦淮区玄武区栖霞区江宁区;重庆市沙坪坝区武隆区北碚区九龙坡区渝中区大足区丰都县渝北区;成都市青羊区都江堰武侯区金牛区成华区";
      if (cities.includes(this.input)) {
        this.$notify({
          title: "尊敬的用户",
          message: "正在为您推荐" + this.input + "的相关信息！",
          position: "top-left",
        });
        this.currentCity = this.input;
        this.getAdcode(this.currentCity);
        this.attrStart = this.input;
        this.hotelStart = this.input;
        // this.ticketStart = this.input;
      } else {
        this.$axios
          .get(
            "http://49.234.18.247:8080/api/FunGetAttractionInfoByName/" +
              this.input
          )
          .then((response) => {
            if (response.data.length !== 0) {
              this.$router.push({
                path: "/attraction/city",
                query: { find: this.input },
              });
            } else {
              this.$axios
                .get(
                  "http://49.234.18.247:8080/api/FunGetHotelInfoByName/" +
                    this.input
                )
                .then((response) => {
                  if (response.data.length !== 0) {
                    this.$router.push({
                      path: "/hotel/city",
                      query: { find: this.input },
                    });
                  } else {
                    this.$notify({
                      title: "尊敬的用户",
                      message:
                        "非常抱歉!我们暂无" + this.input + "的相关信息！",
                      position: "top-left",
                    });
                  }
                });
            }
          });
      }
    },
    onClick(a, b) {
      this.$set(this.show, a, b);
    },
    districtClick(index) {
      this.districtIndex = index;
      switch (index) {
        case 0:
          this.loadCities(this.East);
          break;
        case 1:
          this.loadCities(this.South);
          break;
        case 2:
          this.loadCities(this.North);
          break;
        case 3:
          this.loadCities(this.Center);
          break;
        case 4:
          this.loadCities(this.NorthEast);
          break;
        case 5:
          this.loadCities(this.SouthWest);
          break;
        case 6:
          this.loadCities(this.NorthWest);
          break;
        case 7:
          this.loadCities(this.SouthEast);
          break;
        case 8:
          this.loadCities(this.Tibet);
          break;
      }
    },
    moreCityClick(city) {
      this.$router.push({
        path: "/attraction/city",
        query: { search: city },
      });
    },
    loadCity(city) {
      var obj = { cityname: city.city, num: "", img: city.img };
      this.$axios
        .get(
          "http://49.234.18.247:8080/api/FunGetCommentNumByAttLocation/" +
            city.city +
            "市"
        )
        .then((response) => {
          obj.num = response.data.length;
        });
      return obj;
    },
    loadCities(district) {
      this.moreCity = [];
      for (var i = 0; i < district.length; i++) {
        var tmp = this.loadCity(district[i]);
        this.moreCity.push(tmp);
      }
    },
    // 改变景点推荐城市
    changeCity1(newCity) {
      this.attrStart = newCity;
      this.getAttrbyCity(newCity);
    },
    toArrDetail(AttrID) {
      this.$router.push({
        path: "/attraction/detail",
        query: { id: AttrID },
      });
    },
    // 改变酒店推荐城市
    changeCity2(newCity) {
      this.hotelStart = newCity;
      this.getHotelbyCity(newCity);
    },
    toHotelDetail(HotelID) {
      this.$router.push({
        path: "/hotel/detail",
        query: { id: HotelID },
      });
    },
    // 改变航班出发城市
    changeCity3(newCity) {
      this.ticketStart = newCity;
      this.getTicketbyCity(newCity);
    },
    toTicketDetail(date, to) {
      var year = date.slice(0, 4);
      var month = date.slice(5, 7);
      var day = date.slice(8, 10);
      var d = year + "-" + month + "-" + day;
      this.$router.push({
        path: "/tickets/planequery",
        query: { date: d, from: this.ticketStart, to: to },
      });
    },
    // 截取部分地址
    fun_district(detail) {
      var i = 0;
      var len = detail.length;
      var res = "";
      while (
        detail[i] != "路" &&
        detail[i] != "镇" &&
        detail[i] != "村" &&
        detail[i] != "嘴" &&
        isNaN(detail[i]) &&
        i < len
      ) {
        res += detail[i];
        i++;
      }
      if (
        detail[i] == "路" ||
        detail[i] == "镇" ||
        detail[i] == "村" ||
        detail[i] == "嘴"
      ) {
        return res + detail[i];
      } else {
        return res;
      }
    },
    // 酒店地址处理
    fun_hotel_district(detail) {
      var tmp;
      if (detail[5] == "市") {
        tmp = detail.slice(3, 6) + detail.slice(7);
      } else if (detail[5] == "省") {
        tmp = detail.slice(3, 6) + detail.slice(7, 10) + detail.slice(11);
      } else {
        tmp = detail;
      }
      return this.fun_district(tmp);
    },
    // 浏览器获得当前城市名
    getLocation() {
      let a = this;
      navigator.geolocation.getCurrentPosition(function (position) {
        var Ing, Lat;
        Ing = position.coords.longitude.toFixed(6);
        Lat = position.coords.latitude.toFixed(6);

        fetch(
          "https://restapi.amap.com/v3/geocode/regeo?key=b46e001d88ea385075cc97e1c892ce37&location=" +
            Ing +
            "," +
            Lat
        )
          .then(function (response) {
            return response.json();
          })
          .then(function (myJson) {
            a.currentCity = myJson.regeocode.addressComponent.province;
            a.adcode = myJson.regeocode.addressComponent.adcode;
            a.attrStart = a.currentCity.substr(0, a.currentCity.length - 1);
            a.ticketStart = a.attrStart;
            a.hotelStart = a.attrStart;
          });
      });
    },
    // 根据城市名获取景点信息
    getAttrbyCity(city) {
      this.$axios
        .get(
          "http://49.234.18.247:8080/api/FunGetCommentNumByAttLocation/" + city
        )
        .then((response) => {
          this.attractions = response.data;
        });
    },
    // 根据城市名获取酒店信息
    getHotelbyCity(city) {
      this.$axios
        .get(
          "http://49.234.18.247:8080/api/FunGetCommentNumByHotelLocation/" +
            city
        )
        .then((response) => {
          this.hotels = response.data;
        });
    },
    // 根据城市名获取机票信息
    getTicketbyCity(from, to, date) {
      this.$axios
        .get(
          "http://49.234.18.247:8080/api/FunGetLowestFlightPrice/" +
            from +
            "&" +
            to +
            "&" +
            date
        )
        .then((response) => {
          var day = date.split("-");
          for (var i = 0; i < response.data.length; i++) {
            response.data[i].enD_AIRPORT = to + response.data[i].enD_AIRPORT;
            response.data[i].starT_TIME =
              day[0] +
              "年" +
              day[1] +
              "月" +
              day[2] +
              "日" +
              " " +
              response.data[i].starT_TIME;
          }
          for (let i = 0; i < response.data.length; i++) {
            this.tickets.push(response.data[i]);
          }
        });
    },
    getAdcode(city) {
      let a = this;
      fetch(
        "https://restapi.amap.com/v3/geocode/geo?address=" +
          city +
          "&key=b46e001d88ea385075cc97e1c892ce37"
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (myJson) {
          a.adcode = myJson.geocodes[0].adcode;
        });
    },
  },
  created() {
    // 获取浏览器地理位置
    this.getLocation();
    this.getAttrbyCity(this.attrStart);
    this.getHotelbyCity(this.hotelStart);
    for (var i = 0; i < 4; i++) {
      this.getTicketbyCity("北京", "广州", "2021-09-" + (i + 12));
      this.getTicketbyCity("北京", "上海", "2021-09-" + (i + 12));
    }
    this.loadCities(this.East);
  },
  mounted() {},
  watch: {
    adcode(newValue, oldValue) {
      let a = this;
      fetch(
        "https://restapi.amap.com/v3/weather/weatherInfo?city=" +
          newValue +
          "&key=b46e001d88ea385075cc97e1c892ce37&extensions=all"
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (myJson) {
          var future = myJson.forecasts[0].casts;
          var current = myJson.forecasts[0].casts[0];
          var city = myJson.forecasts[0].city;
          var time = myJson.forecasts[0].reporttime;
          a.$notify({
            title: "实时天气",
            dangerouslyUseHTMLString: true,
            message:
              "<p>发布时间：" +
              time +
              "</p>" +
              "<p>城市/区：" +
              city +
              "</p>" +
              "<p>天气：" +
              current.dayweather +
              "</p>" +
              "<p>温度：" +
              current.nighttemp +
              "~" +
              current.daytemp +
              "℃</p>" +
              "<p>风力：" +
              current.daypower +
              "级</p>" +
              "<p>风向：" +
              current.daywind +
              "</p>",
            position: "top-left",
          });
          a.$nextTick(() => {
            a.$notify({
              title: "未来三天",
              dangerouslyUseHTMLString: true,
              message:
                "<p>" +
                future[1].date +
                "&nbsp;&nbsp;" +
                future[1].nighttemp +
                "~" +
                future[1].daytemp +
                "℃&nbsp;&nbsp;" +
                future[1].dayweather +
                "</p>" +
                "<p>" +
                future[2].date +
                "&nbsp;&nbsp;" +
                future[2].nighttemp +
                "~" +
                future[2].daytemp +
                "℃&nbsp;&nbsp;" +
                future[2].dayweather +
                "</p>" +
                "<p>" +
                future[3].date +
                "&nbsp;&nbsp;" +
                future[3].nighttemp +
                "~" +
                future[3].daytemp +
                "℃&nbsp;&nbsp;" +
                future[3].dayweather +
                "</p>" +
                "<h4>请注意天气合理出行！</h4>",
              position: "top-left",
              duration: 5500,
            });
          });
        });
    },
    attrStart(newValue, oldValue) {
      this.getAttrbyCity(newValue);
    },
    hotelStart(newValue, oldValue) {
      this.getHotelbyCity(newValue);
    },
    ticketStart(newValue, oldValue) {
      this.tickets = [];
      if (newValue !== "广州") {
        for (var i = 0; i < 4; i++) {
          this.getTicketbyCity(newValue, "广州", "2021-09-" + (i + 12));
        }
      }
      if (newValue !== "北京") {
        for (var j = 0; j < 4; j++) {
          this.getTicketbyCity(newValue, "北京", "2021-09-" + (j + 12));
        }
      }
      if (newValue !== "上海") {
        for (var k = 0; k < 4; k++) {
          this.getTicketbyCity(newValue, "上海", "2021-09-" + (k + 12));
        }
      }
    },
  },
};
</script>

<style scoped>
.search {
  background: #f2f2f2;
  padding: 45px 20px;
}
.search p {
  margin-bottom: 5px;
}
.block {
  margin-left: 24%;
  width: 70%;
  color: white;
}
.el-input /deep/ .el-input__inner {
  height: 55px;
}
.el-button {
  background-color: #003680;
  border: none;
  height: 54px;
}

.title {
  font: 16px/26px "Microsoft YaHei", SimHei, SimSun, Tahoma, Verdana, Arial,
    sans-serif;
}
.Box1 {
  width: 100%;
  height: 390px;
  background-color: #f2f2f2;
  border: 1px solid #e0e0e0;
  border-top: 2px solid #003680;
  margin-bottom: 20px;
  margin-top: 3px;
}
.Box2 {
  width: 100%;
  height: 456px;
  background-color: #f2f2f2;
  border: 1px solid #e0e0e0;
  border-top: 2px solid #003680;
  margin-bottom: 20px;
  margin-top: 3px;
}
.rightBox {
  float: left;
  width: 25%;
  height: 100%;
  border-right: 1px dashed #807c7c;
}
.more {
  padding: 2px 4px;
  height: 15px;
  width: 60px;
  font-size: 13px;
}
.more a {
  color: #0a4fb1 !important;
}
.more:hover {
  border: 1px solid #0a4fb1;
  border-radius: 5px;
}
.right-arrow {
  font-weight: 700;
}
.keyword-short {
  margin-left: 10%;
}
.keyword-short dd a {
  color: #003680 !important;
  font-size: 13px;
}
.leftBox {
  float: left;
  width: 74%;
  height: 100%;
}

.attrBox .box {
  float: left;
  margin: 5px;
  width: 264px;
  height: 155px;
  text-indent: 1em;
  border-radius: 2px;
}
.attrBox .districtBtn {
  display: inline-block;
  margin: 10px 8px 8px 8px;
  color: gray;
  font-weight: 600;
  font-size: 13px;
  text-align: center;
  width: 60px;
  height: 30px;
  line-height: 30px;
}
.attrBox .districtBtn:hover {
  color: white;
  background-color: #0a4fb1;
  border-radius: 3px;
  cursor: pointer;
}
.districtClick {
  color: white !important;
  background-color: #0a4fb1;
  border-radius: 3px;
}
.mask {
  width: 264px;
  height: 155px;
  color: white;
  text-indent: 5px;
  border-radius: 2px;
}
.mask p {
  font-size: 12px;
}
.mask .text {
  position: relative;
  top: 110px;
  width: 100%;
  height: 50px;
}
.mask:hover {
  cursor: pointer;
}
.attriInfo,
.hotelInfo {
  float: left;
  margin: 21px 0px 0px 15px;
  width: 255px;
  height: 164px;
  background-color: #fff;
}

.infoImg {
  height: 60%;
  width: 100%;
}

.infoDetail {
  padding: 3px 13px;
}

.Details .address {
  font: 12px/14px "Microsoft YaHei", SimHei, SimSun, Tahoma, Verdana, Arial,
    sans-serif;
  color: #666;
}

.Details .price {
  color: orangered;
  font: bold 22px/22px "Lucida Console", "Courier New", monospace, sans-serif;
}
.Price,
.price1 {
  float: right;
}

.Details i {
  margin-left: 3px;
  font-style: normal;
  font-size: 13px;
}
.attriInfo:hover,
.hotelInfo:hover,
.ticketInfo:hover {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  cursor: pointer;
}
.ticketBox {
  width: 100%;
  height: 100%;
}
.ticketInfo {
  float: left;
  margin: 10px 5px 0px 5px;
  padding-left: 10px;
  width: 255px;
  height: 140px;
  background-color: #fff;
  border-radius: 2px;
  font-family: "Microsoft YaHei", SimHei, SimSun, Tahoma, Verdana, Arial,
    sans-serif;
}
.dancheng {
  display: inline-block;
  width: 30px;
  height: 13px;
  background: center/100% url("../assets/img/dancheng.png") no-repeat;
}
.item-company {
  margin-top: 15px;
  font-weight: 600;
  color: tomato;
}
.item-name {
  margin-top: 15px;
  margin-bottom: 5px;
  font-size: 14px;
}
.item-date {
  font-size: 13px;
  color: #666;
}
.item-info {
  margin-top: 11px;
  margin-left: -3px;
}
.item-info > i {
  font-style: normal;
  font-size: 12px;
}
.item-btn {
  margin-right: 14px;
  float: right;
  height: 26px;
  width: 55px;
  background-color: orange;
  border-radius: 3px;
  text-align: center;
  color: white;
  line-height: 26px;
  font-size: 14px;
}
.item-btn:hover {
  background-color: #ffb71b;
}

.titleClick {
  color: #003680;
}

.title span {
  position: relative;
  margin-left: 15px;
}

.title > span:hover {
  color: #003680;
  cursor: pointer;
}
.title span i {
  position: absolute;
  left: 50%;
  margin-left: -6px;
  bottom: -7px;
  width: 0;
  height: 0;
  overflow: hidden;
  line-height: 0;
  font-size: 0;
  vertical-align: middle;
  border-bottom: 6px solid #003680;
  border-top: 0 none;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
}

.drop-content span {
  display: block;
  color: black;
  font-size: 13px;
  height: 20px;
  line-height: 20px;
  text-align: center;
}
.drop-content span:hover {
  background-color: #2577e3;
  color: white;
  cursor: pointer;
}

dt {
  font-size: 18px;
  margin: 8px 0;
}
</style>