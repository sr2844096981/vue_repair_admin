<template>
  <div class="main">
    <div class="control">
      <!-- 实时时间 -->
      <div class="showTime">
        <span class="num" ref="showTime">2020年3月17-0时54分14秒</span>
      </div>
      <!-- 订单数量 -->
      <div class="order-num">
        今日新增订单<span class="num">0023</span> 历史累计订单:<span class="num"
          >1223</span
        >
      </div>
      <!-- 切换全屏 -->
      <el-button
        type="success"
        icon="el-icon-full-screen"
        circle
        class="full-screen"
        size="small"
        @click="screenfull"
      ></el-button>
      <!-- <i class="el-icon-full-screen full-screen" @click="screenfull"></i> -->
    </div>
    <!-- 图表 -->
    <div class="eacharts01">
      <Eacharts01 style="width:100%;height:100%"/>
    </div>
    <div class="eacharts02">
      <Eacharts03 style="width:100%;height:100%" />
    </div>
    <!--地图容器-->
    <baidu-map
      class="bm-view"
      :center="center"
      :zoom="17"
      :scroll-wheel-zoom="true"
    >
      <!-- 最新订单 跳动的点 -->
      <bm-marker
        :position="{ lng: 116.046185, lat: 36.456501 }"
        :dragging="true"
        animation="BMAP_ANIMATION_BOUNCE"
      >
        <bm-label
          content="新的维修订单"
          :labelStyle="{
            color: 'green',
            border: '2px solid #000',
            fontSize: '16px',
          }"
          :offset="{ width: -35, height: 30 }"
        />
      </bm-marker>
      <!-- 标记点 -->
      <bm-marker
        v-for="(item, index) in marker"
        :key="item.id"
        :position="{ lng: item.lngPosition, lat: item.latPosition }"
        :dragging="true"
        @click="infoWindowOpen(index)"
      >
        <bm-info-window
          :show="item.showInfo"
          @close="infoWindowClose(index)"
          @open="infoWindowOpen(index)"
          >{{ infoText }}
        </bm-info-window>
      </bm-marker>
    </baidu-map>
  </div>
</template>

<script>
// 引用全屏显示插件
import screenfull from "screenfull";
import Eacharts01 from "../../components/Echarts/Echarts01.vue";
import Eacharts02 from "../../components/Echarts/Echarts02.vue";
import Eacharts03 from "../../components/Echarts/Echarts03.vue";
export default {
  name: "bmap",
  components: { Eacharts01, Eacharts02,Eacharts03 },

  data() {
    return {
      // 地图中心点坐标,,
      center: {
        lng: 116.046329,
        lat: 36.457444,
      },
      // 标记点
      marker: [
        {
          // id
          id: 1,
          // 坐标 经度
          lngPosition: 116.045408,
          // 坐标 纬度
          latPosition: 36.455528,
          // 信息
          windowInfo: {
            text: "1号宿舍楼",
          },
          showInfo: false,
        },
        {
          // id
          id: 2,
          // 坐标 经度
          lngPosition: 116.045251,
          // 坐标 纬度
          latPosition: 36.455819,
          // 信息
          windowInfo: {
            text: "2号宿舍楼",
          },
          showInfo: false,
        },
        {
          // id
          id: 3,
          // 坐标 经度
          lngPosition: 116.045058,
          // 坐标 纬度
          latPosition: 36.456149,
          // 信息
          windowInfo: {
            text: "3号宿舍楼",
          },
          showInfo: false,
        },
        {
          // id
          id: 4,
          // 坐标 经度
          lngPosition: 116.045067,
          // 坐标 纬度
          latPosition: 36.456461,
          // 信息
          windowInfo: {
            text: "4号宿舍楼",
          },
          showInfo: false,
        },
        {
          // id
          id: 5,
          // 坐标 经度
          lngPosition: 116.045723,
          // 坐标 纬度
          latPosition: 36.457571,
          // 信息
          windowInfo: {
            text: "5号宿舍楼",
          },
          showInfo: false,
        },
        {
          // id
          id: 6,
          // 坐标 经度
          lngPosition: 116.045902,
          // 坐标 纬度
          latPosition: 36.458039,
          // 信息
          windowInfo: {
            text: "6号宿舍楼",
          },
          showInfo: false,
        },
        {
          // id
          id: 7,
          // 坐标 经度
          lngPosition: 116.04716,
          // 坐标 纬度
          latPosition: 36.455118,
          // 信息,
          windowInfo: {
            text: "1号教学楼",
          },
          showInfo: false,
        },
        {
          // id
          id: 8,
          // 坐标 经度
          lngPosition: 116.047515,
          // 坐标 纬度
          latPosition: 36.455459,
          // 信息
          windowInfo: {
            text: "2号宿舍楼",
          },
          showInfo: false,
        },
        {
          // id
          id: 9,
          // 坐标 经度
          lngPosition: 116.047596,
          // 坐标 纬度
          latPosition: 36.455902,
          // 信息,
          windowInfo: {
            text: "3号宿舍楼",
          },
          showInfo: false,
        },
        {
          // id
          id: 10,
          // 坐标 经度
          lngPosition: 116.047659,
          // 坐标 纬度
          latPosition: 36.456635,
          // 信息
          windowInfo: {
            text: "6号教学楼",
          },
          showInfo: false,
        },
      ],
      // 信息框内容
      infoText: "",
    };
  },
  mounted() {
    this.untreated();
    this.funIntroduction();
    this.nowtime();
  },
  methods: {
    // 关闭信息窗口
    infoWindowClose(index) {
      this.marker[index].showInfo = false;
    },
    // 显示信息窗口
    infoWindowOpen(index) {
      this.infoText = this.marker[index].windowInfo.text;
      this.marker[index].showInfo = true;
    },
    // 实时时间
    nowtime() {
      let _this = this;
      let t = null;

      t = setTimeout(time, 1000); //開始运行
      function time() {
        clearTimeout(t); //清除定时器
        let dt = new Date();
        let y = dt.getFullYear();
        let mt = dt.getMonth() + 1;
        let day = dt.getDate();
        let h = dt.getHours(); //获取时
        let m = dt.getMinutes(); //获取分
        let s = dt.getSeconds(); //获取秒
        _this.$refs.showTime.innerHTML =
          y + "-" + mt + "-" + day + " " + h + ":" + m + " " + s;
        t = setTimeout(time, 1000); //设定定时器，循环运行
      }
    },
    // 全屏显示
    screenfull() {
      if (screenfull.isFullscreen == false) {
        this.$router.push("/bmapscreenfull");
      } else {
        this.$router.push("/bmap");
      }
      // 切换全屏
      screenfull.toggle();
    },
    // 功能介绍
    funIntroduction() {
      this.$notify({
        title: "提示",
        message:
          "这是提示文案。鼠标左键可拖动地图，滚轮缩放地图。点击标记点可查看详情。",
        position: "bottom-right",
      });
    },
    // 未处理订单提示
    untreated() {
      const h = this.$createElement;
      this.$notify({
        title: "警告",
        message: h(
          "i",
          { style: "color: teal" },
          "您有" + 10 + "条订单未处理，请及时处理"
        ),
        type: "warning",
        duration: 0,
      });
    },
    // 不可自动关闭通知
    open2() {
      this.$notify({
        title: "提示",
        message: "这是一条不会自动关闭的消息",
        duration: 0,
      });
    },
  },
};
</script>

<style lang="css" scoped>
.main {
  /* background-color: red; */
  position: relative;
  height: 100vh;
  overflow: hidden;
}

.bm-view {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
}

.control {
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  z-index: 999;
  height: 40px;
  padding-top: 10px;
  background-color: #fff;
  border-radius: 10px;
}

.full-screen {
  position: absolute;
  right: 10px;
  top: 5px;
}

.order-num {
  text-align: center;
  line-height: 20px;
  vertical-align: middle;
}

.num {
  color: #f57d2d;
  vertical-align: middle;
  font-family: "electronicFont";
}

.order-num .num {
  font-weight: 700;
  font-size: 2.5rem;
}

.showTime {
  position: absolute;
  top: 10px;
  left: 10px;
}

.showTime .num {
  font-size: 1.5rem;
  color: #409eff;
}
.eacharts01,
.eacharts02{
  width: 320px;
  height: 220px;
  padding: 10px;
  border-radius: 10px;
  background-color: #fff;
  z-index: 999;
}
.eacharts01{
  position: absolute;
  top: 60px;
  left: 10px;

}
.eacharts02{
  position: absolute;
  top: 380px;
  left: 10px;
}
</style>