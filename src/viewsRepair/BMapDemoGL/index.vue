<template>
  <div>
    <div class="bm-view" id="container"></div>
  </div>
</template>

<script>
import { BMPGL } from "@/plugins/bmpgl.js";
export default {
  name: "bmapgl",
  data() {
    return {};
  },
  created() {
    this.initMap();
  },
  methods: {
    // 初始化BMapGL
    initMap() {
      BMPGL()
        .then((BMapGL) => {
          // 创建地图实例
          let map = new BMapGL.Map("container");
          // 创建点坐标 axios => res 获取的初始化定位坐标
          var point = new BMapGL.Point(116.404, 39.915);
          // 初始化地图，设置中心点坐标和地图级别
          map.centerAndZoom(point, 15);
          //开启鼠标滚轮缩放
          map.enableScrollWheelZoom(true);
          map.setHeading(30);
          map.setTilt(60);
          // 保存数据
          // this.myMap = map
          // console.log(map);
          this.marker();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 创建标记点
    marker() {

var point = new BMapGL.Point(116.404, 39.925);

      console.log('123');
      let marker = new BMapGL.Marker(point);
      map.addOverlay(marker);
      // 创建信息窗口
      let opts = {
        width: 200,
        height: 100,
        title: "故宫博物院",
      };
      let infoWindow = new BMapGL.InfoWindow(
        "地址：北京市东城区王府井大街88号乐天银泰百货八层",
        opts
      );
      // 点标记添加点击事件
      marker.addEventListener("click", function () {
        map.openInfoWindow(infoWindow, point); // 开启信息窗口
      });
    },
  },
};
</script>

<style lang="css" scoped>
.el-alert {
  margin-bottom: 20px;
}

.bm-view {
  width: 100%;
  height: 520px;
}
</style>