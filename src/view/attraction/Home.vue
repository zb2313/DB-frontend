<template>
  <el-container direction="vertical">
    <Header activeIndex="2" />

    <div class="Form"></div>
    <SearchAttr />

    <!-- 热门目的地 -->
    <div class="main hot">
      <h3>热门目的地</h3>
      <div class="mainDest">
        <router-link to="/attraction/city?search=北京"
          ><div
            class="attrBox"
            :style="{
              backgroundImage: 'url(' + baseImg1 + ')',
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat',
            }"
          >
            北京
          </div></router-link
        >
        <router-link to="/attraction/city?search=上海"
          ><div
            class="attrBox margin"
            :style="{
              backgroundImage: 'url(' + baseImg2 + ')',
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat',
            }"
          >
            上海
          </div></router-link
        >
        <router-link to="/attraction/city?search=南京"
          ><div
            class="attrBox margin"
            :style="{
              backgroundImage: 'url(' + baseImg3 + ')',
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat',
            }"
          >
            南京
          </div></router-link
        >
      </div>
    </div>

    <div class="main"><el-divider></el-divider></div>

    <!-- 产品优势 -->
    <div class="main advantage">
      <h3>找我们就对了</h3>
      <ul style="margin-top: 20px">
        <li>
          <img src="../../assets/img/attraction.svg" />
          <div>
            <h4>探索热门景点</h4>
            <p>尽情体验目的地，著名景点、观光导览和丰富活动等你来</p>
          </div>
        </li>
        <li>
          <img src="../../assets/img/book.svg" style="margin-left: 34px" />
          <div>
            <h4>快速又灵活</h4>
            <p>在线订票仅需几分钟，许多景点支持免费取消</p>
            <br />
          </div>
        </li>
        <li>
          <img
            src="../../assets/img/service-staff.svg"
            style="margin-left: 34px"
          />
          <div>
            <h4>随时提供支持</h4>
            <p>旅道客服团队7x24小时提供专业帮助</p>
            <br />
          </div>
        </li>
      </ul>
    </div>

    <div class="main"><el-divider></el-divider></div>

    <div class="main more">
      <h3>探索更多目的地</h3>
      <div class="menubox">
        <el-menu
          default-active="1"
          mode="horizontal"
          active-text-color="#003680"
          @select="handleSelect"
        >
          <el-menu-item index="1"> 华东</el-menu-item>
          <el-menu-item index="2"> 华南</el-menu-item>
          <el-menu-item index="3"> 华北</el-menu-item>
          <el-menu-item index="4"> 华中</el-menu-item>
          <el-menu-item index="5"> 东北</el-menu-item>
          <el-menu-item index="6"> 西南</el-menu-item>
          <el-menu-item index="7"> 西北</el-menu-item>
          <el-menu-item index="8"> 东南</el-menu-item>
          <el-menu-item index="9"> 青藏</el-menu-item>
        </el-menu>
      </div>
    </div>
    <div class="main moreCity">
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
    <Footer1 />
  </el-container>
</template>

<style scoped>
/* 搜索框 */
.Form {
  width: 100%;
  height: 130px;
  margin-bottom: -105px;
  text-align: center;
  background-color: #f2f2f2;
}

/* 展示区域公用 */
h3 {
  font-size: 20px;
}
.el-divider--horizontal {
  width: 1100px;
}

/* 热门推荐 */
.hot {
  height: 245px;
  margin-top: 55px;
  margin-bottom: 15px;
}
.mainDest {
  margin-top: 20px;
  width: 100%;
  height: 200px;
  font-family: "Courier New", Courier, monospace;
  font-size: 30px;
  font-weight: 600;
}

.attrBox {
  float: left;
  width: 352px;
  height: 100%;
  color: #fff;
  text-align: center;
  line-height: 200px;
  border-radius: 2px;
}

.margin {
  margin-left: 20px;
}
/* 产品优势 */
.advantage {
  height: 125px;
  margin-top: 5px;
}
.advantage img,
.advantage li,
.advantage div {
  display: inline-block;
}
.advantage li {
  width: 366px;
  height: 60px;
}
.advantage img {
  margin-bottom: 25px;
}
.advantage div {
  width: 290px;
  margin-left: 8px;
}
.advantage p {
  font-size: 13px;
  margin-top: 5px;
}

/* 更多目的地 */
.more {
  margin-top: 5px;
}
.el-menu--horizontal > .el-menu-item {
  height: 50px;
  color: gray;
}
.moreCity {
  margin-top: 15px;
  margin-bottom: 30px;
}
.moreCity .box {
  float: left;
  margin: 5px;
  width: 264px;
  height: 150px;
  border-radius: 2px;
}
.mask {
  width: 264px;
  height: 150px;
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
</style>

<script>
import Header from "@/components/Header.vue";
import Footer1 from "@/components/Footer1.vue";
import SearchAttr from "@/components/SearchAttr.vue";

export default {
  name: "Home",
  components: {
    Header,
    Footer1,
    SearchAttr,
  },
  data() {
    return {
      moreCity: [],
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
      baseImg1:
        "https://pic3.zhimg.com/v2-0f86a4704003167642f64e3b97c4f332_r.jpg",
      baseImg2:
        "https://up.enterdesk.com/edpic_source/51/aa/d9/51aad9c29763f5bfad72e62c5f4e4829.jpg",
      baseImg3:
        "https://tse1-mm.cn.bing.net/th/id/R-C.27bdf04611785da2ebaeaa3d796856b6?rik=jd7OfzZFr8z1RA&riu=http%3a%2f%2fimg.ivsky.com%2fimg%2ftupian%2fpre%2f201508%2f15%2fconfucius_temple-003.jpg&ehk=g6EJct1fvTL3Kf1xnGezuiUqZ9F%2fbEx7Bk%2bqD9iHWg4%3d&risl=&pid=ImgRaw&r=0",
    };
  },
  methods: {
    handleSelect(index) {
      switch (index) {
        case "1":
          this.loadCities(this.East);
          break;
        case "2":
          this.loadCities(this.South);
          break;
        case "3":
          this.loadCities(this.North);
          break;
        case "4":
          this.loadCities(this.Center);
          break;
        case "5":
          this.loadCities(this.NorthEast);
          break;
        case "6":
          this.loadCities(this.SouthWest);
          break;
        case "7":
          this.loadCities(this.NorthWest);
          break;
        case "8":
          this.loadCities(this.SouthEast);
          break;
        case "9":
          this.loadCities(this.Tibet);
          break;
      }
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
    moreCityClick(city) {
      this.$router.push({
        path: "/attraction/city",
        query: { search: city },
      });
    },
  },
  created() {
    this.loadCities(this.East);
  },
};
</script>

