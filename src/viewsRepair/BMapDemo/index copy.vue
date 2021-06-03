<template>
  <div>
    <el-card shadow="never">
      <el-alert title="提示：鼠标左键可拖动地图；右键调整视图角度；滚轮缩放地图。" type="info" show-icon> </el-alert>
      <!--创建地图容器-->
      <div id="container" class="allmap"></div>
    </el-card>
  </div>
</template>

<script>
import { BMPGL } from "@/plugins/bmpgl.js";
export default {
  name: "bmapgl",
  data() {
    return {
      ak: "P0aw3mz8OoP7Lekoa1eMTBDbNZXqzTf1", // 百度的地图密钥
      myMap: null,
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      // 传入密钥获取地图回调。
      BMPGL(this.ak)
        .then((BMapGL) => {
          // 创建地图实例
          let map = new BMapGL.Map("container");
          // 创建点坐标 axios => res 获取的初始化定位坐标
          let point = new BMapGL.Point(116.046266, 36.45592);
          // 初始化地图，设置中心点坐标和地图级别
          map.centerAndZoom(point, 19);
          //开启鼠标滚轮缩放
          map.enableScrollWheelZoom(true);
          // map.setHeading(64.5)
          // map.setTilt(73)
          map.setHeading(30);
          map.setTilt(60);
          // 保存数据
          // this.myMap = map
          // -------------- //
// 创建点标记
var marker1 = new BMapGL.Marker(new BMapGL.Point(116.046266, 36.45592));
var marker2 = new BMapGL.Marker(new BMapGL.Point(116.404, 39.915));
var marker3 = new BMapGL.Marker(new BMapGL.Point(116.395, 39.935));
var marker4 = new BMapGL.Marker(new BMapGL.Point(116.415, 39.931));
// 在地图上添加点标记
map.addOverlay(marker1);
map.addOverlay(marker2);
map.addOverlay(marker3);
map.addOverlay(marker4);

        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 标记的
    marke(){

    }
  },
};
</script>

<style lang="css" scoped>

.el-alert{
  margin-bottom: 20px;
}
.allmap {
  width: 100%;
  height: 520px;
  position: relative;
  z-index: 1;
}
</style>