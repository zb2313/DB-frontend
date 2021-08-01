<template>
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
</template>

<script>
import { AMapManager, lazyAMapApiLoaderInstance } from "vue-amap";
const amapManager = new AMapManager();
export default {
  name: "AMAP",
  data() {
    const _this = this;
    return {
      position: [0, 0],
      address: "",
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
      // MapType
      this.map.addControl(new AMap.MapType());
      this.map.addControl(new AMap.OverView());

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
      let infoWindow = new AMap.InfoWindow({});

      // 地图的热点
      this.map.on("hotspotover", function (result) {
        placeSearch.getDetails(result.id, function (status, result) {
          if (status === "complete" && result.info === "OK") {
            placeSearch_CallBack(result);
          }
        });
      });
      //回调函数
      let a = this;
      function placeSearch_CallBack(data) {
        //infoWindow.open(map, result.lnglat);
        let poiArr = data.poiList.pois;
        let location = poiArr[0].location;
        infoWindow.setContent(createContent(poiArr[0]));
        infoWindow.open(a.map, location);
      }
      function createContent(poi) {
        //信息窗体内容
        let s = [];
        s.push(
          '<div class="info-title">' +
            poi.name +
            '</div><div class="info-content">' +
            "地址：" +
            poi.address
        );
        s.push("电话：" + poi.tel);
        s.push("类型：" + poi.type);
        s.push("<div>");
        return s.join("<br>");
      }
    },
  },
};
</script>

<style scoped>
.amap-wrap {
  height: 100vh;
  width: 100vw;
}

.info {
  width: 300px;
  height: 60px;
  position: absolute;
  top: 50px;
  left: 100px;
  background-color: rgba(95, 91, 91, 0.3);
}
</style>