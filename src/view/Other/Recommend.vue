

<template>
  <div class="amap-wrapper">
    <el-amap
      class="amap-box"
      vid="amap"
      :amap-manager="amapManager"
      isHotspot: true
      :room="room"
      :center="center"
      resizeEnable="true"
      :plugin="plugin"
      :events="mapEvents"
    >
    <el-amap-marker v-for="(marker,index) in markers" :key="index" :position="marker.position"></el-amap-marker>

    </el-amap>
  </div>
</template>

<script>
import VueAMap from "vue-amap";
const amapManager = new VueAMap.AMapManager();
export default {
  data() {
    return {
      room: 17,
      center: [120, 30],
      markers: [{ position: [120, 30.128667] }, { position: [119, 30] }],
      plugin: [
        {
          pName: "ToolBar",
          postition: "LB",
          useNative: true,
        },
        {
          pName: "Scale",
        },
      ],
      amapManager,
      mapEvents: {},
    };
  },
};
</script>

<style scoped>
.amap-wrapper {
  width: 800px;
  height: 500px;
  margin: 40px auto;
}
</style>

