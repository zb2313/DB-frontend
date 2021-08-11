<template>
  <div class="border">
    <Header activeIndex="4" />
    <div class="amap-wrap">
      <el-amap
        vid="amapDemo"
        isHotspot="true"
        :amap-manager="amapManager"
        :center="center"
        :zoom="zoom"
        :lang="lang"
        :events="events"
      ></el-amap>
      <div class="info">
        <p>position:{{ position }}</p>
        <p>address:{{ address }}</p>
      </div>
    </div>
    
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import { AMapManager, lazyAMapApiLoaderInstance } from "vue-amap";
const amapManager = new AMapManager();
export default {
  name: "AMAP",
  components:{
    Header,
  },
  data() {
    const _this = this;
    return {
      position: [0, 0],
      address: "",
      distance:0,
      map: null,
      lang: "zh_en",
      zoom: 18,
      center: [116.397428, 39.90923],
      amapManager,
      events: {
        init() {
          lazyAMapApiLoaderInstance.load().then(() => {
            _this.initMap();
          });
        },
        click(e) {
          // 点击获得经纬度和地址
          let { lng, lat } = e.lnglat;
          _this.position = [lng, lat];
          // 更改地图中心点
          _this.map.setCenter([lng, lat]);

          var geocoder = new AMap.Geocoder({
            radius: 1000,
            extensions: "all",
          });

          geocoder.getAddress([lng, lat], function (status, result) {
            if (status === "complete" && result.info === "OK") {
              if (result && result.regeocode) {
                console.log(result.regeocode);
                _this.address = result.regeocode.formattedAddress;
                _this.$nextTick();
              }
            }
          });
        },
      },
    };
  },
  methods: {
    initMap() {
      this.map = amapManager.getMap();
      // 比例尺
      this.map.addControl(new AMap.Scale());
      // 工具条
      this.map.addControl(
        new AMap.ToolBar({
          position: "LT",
          useNative: true,
          autoPosition: false,
          locate: true,
          ruler: false,
          liteStyle: true,
          // direction: false,
        })
      );
      let a = this;
      AMapUI.loadUI(['control/BasicControl'], function(BasicControl) {

        var layerCtrl = new BasicControl.LayerSwitcher({
            theme: 'my-red',
            position: 'tr'
        });

        a.map.addControl(layerCtrl);
      });
      let marker = new AMap.Marker({
        position: [121, 31],
        title: "here",
        // anchor: "bottom-left",
        // icon: "@/assets/位置.png",
        // content: "你好",
        draggable: true,
        raiseOnDrag: true,
        animation: "AMAP_ANIMATION_DROP",
      });
      marker.setMap(this.map);

      // 高德UI
      AMapUI.loadUI(["overlay/SimpleMarker"], (SimpleMarker) => {
        const marker = new SimpleMarker({
          iconLabel: "A",
          iconStyle: "red",
          map: this.map,
          position: this.map.getCenter(),
          animation: "AMAP_ANIMATION_DROP",
        });
      });

      // 热点信息展示
      let placeSearch = new AMap.PlaceSearch(); //构造地点查询类
      let infoWindow = new AMap.AdvancedInfoWindow({
        // isCustom: true,  //使用自定义窗体
        // anchor: 'top-left',  //设置锚点
        // offset: new AMap.Pixel(1, 1),
      });

      // 地图的热点
      this.map.on("hotspotclick", function (result) {
        placeSearch.getDetails(result.id, function (status, result) {
          if (status === "complete" && result.info === "OK") {
            placeSearch_CallBack(result);
          }
        });
      });
      //回调函数
      
      function placeSearch_CallBack(data) {
        //infoWindow.open(map, result.lnglat);
        let poiArr = data.poiList.pois;
        let location = a.position;
        infoWindow.setContent(createContent(poiArr[0]));
        infoWindow.open(a.map, location);
      }
      function createContent(poi) {
        //信息窗体内容
        var s = [];
        s.push('<div class="info-title">'+poi.name+'</div><div class="info-content">'+"地址：" + poi.address);
        s.push("电话：" + poi.tel);
        s.push("类型：" + poi.type);
        s.push('<div>');
        return s.join("<br>");
      }

      //创建右键菜单
      let contextMenu = new AMap.ContextMenu();
       //右键放大
      contextMenu.addItem("放大一级", function () {
          a.map.zoomIn();
      }, 0);
      //右键缩小
      contextMenu.addItem("缩小一级", function () {
          a.map.zoomOut();
      }, 1);
      // 右键添加Marker标记
      let contextMenuPositon;
      contextMenu.addItem("添加标记", function () {

        AMapUI.loadUI(['overlay/SvgMarker'], function(SvgMarker) {
          if (!SvgMarker.supportSvg) {
              //当前环境并不支持SVG，此时SvgMarker会回退到父类，即SimpleMarker
          }
           //创建一个shape实例
          var shape = new SvgMarker.Shape.TriangleFlagPin({
              height: 50, //高度
              //width: **, //不指定时会维持默认的宽高比
              fillColor: 'lightpink', //填充色
              strokeWidth: 1, //描边宽度
              strokeColor: 'aliceblue' //描边颜色
          });

          //利用该shape构建SvgMarker
          var marker = new SvgMarker(
              //第一个参数传入shape实例
              shape,
              //第二个参数为SimpleMarker的构造参数（iconStyle除外）
              {
                  showPositionPoint: false, //显示定位点
                  map: a.map,
                  position: contextMenuPositon
              }
          );
       });
      }, 2);
        //地图绑定鼠标右击事件——弹出右键菜单
      this.map.on('rightclick', function (e) {
        contextMenu.open(a.map, e.lnglat);
        contextMenuPositon = e.lnglat;
      });
     
    },
  },
};
</script>

<style>
.amap-wrap {
  height: 70vh;
  width: 70vw;
  position:relative;
  top:3vh;
  left:20vw;
}

.info {
  width: 300px;
  height: 60px;
  position:absolute;
  top:5px;
  left:100px;
  background-color: rgba(226, 180, 180, 0.3);
}
.info-title{
  font-weight: bolder;
  color: #fff;
  font-size: 14px;
  line-height: 26px;
  padding: 0 0 0 6px;
  background: #25A5F7
}
.info-content{
  padding: 4px;
  color: #666666;
  line-height: 23px;
  font: 12px Helvetica, 'Hiragino Sans GB', 'Microsoft Yahei', '微软雅黑', Arial;
}

  /* 定义 my-red 主题 */
  
  .amap-ui-control-theme-my-red .amap-ui-control-layer {
      box-shadow: 0 1px 5px rgba(0, 0, 0, 0.4);
      background: #25A5F7;
  }
  
  .amap-ui-control-theme-my-red .amap-ui-control-layer-expanded {
      color: #fff;
      background: #25A5F7;
  }
  
  .amap-ui-control-theme-my-red .amap-ui-control-layer-toggle {
      color: #fff;
  }
</style>