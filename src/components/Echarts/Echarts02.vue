<template>
  <div>
    <div id="echarts02" style="width: 600px; height: 400px"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  components: {},
  data() {
    return {};
  },
  mounted() {
    var chartDom = document.getElementById("echarts02");
    var myChart = echarts.init(chartDom);
    var option;
    option = {
      // 设置线条颜色
      //   color: ["#3F58FD"],
      // 图表标题
      //   title: {
      //     text: "",
      //   },
      // 图表提示框组件
      tooltip: {
        // 触发方式 坐标轴
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#6a7985",
          },
        },
      },
      // 图例组件
      // legend: {
      //     data: ['Line 3']
      // },
      // 工具箱组件 可以另存为图片
      // toolbox: {
      //     feature: {
      //         saveAsImage: {}
      //     }
      // },
      // 网格配置 可以控制图表大小
      grid: {
        left: "10px",
        right: "50px",
        top: "10px",
        bottom: "120px",
        containLabel: true,
      },
      // 设置x轴
      xAxis: [
        {
          type: "category",
          // 线条和坐标轴是否有缝隙
          boundaryGap: false,
          data: [
            "0:00",
            "2:00",
            "4:00",
            "6:00",
            "8:00",
            "10:00",
            "12:00",
            "14:00",
            "16:00",
            "18:00",
            "20:00",
            "22:00",
            "24:00",
          ],
        },
      ],
      // 设置y轴
      yAxis: [
        {
          type: "value",
        },
      ],
      // 系列图表配置
      series: [
        {
          name: "浏览量",
          type: "line",
          smooth: true,
          //   单独修改线条样式
          lineStyle: {
            width: 2,
            color: ["#3F58FD"],
            opacity: .4
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgba(130,150,254)",
              },
              {
                offset: 1,
                color: "rgba(240,243,255)",
              },
            ]),
          },
          emphasis: {
            focus: "series",
          },
          data: [
            800,
            700,
            900,
            1000,
            1200,
            1500,
            1400,
            1200,
            1500,
            1600,
            1300,
            900,
            800,
          ],
        },
      ],
    };

    option && myChart.setOption(option);

    // 图表缩放
/*     window.addEventListener("resize",function(){
        myChart.resize();
    }) */
  },
  methods: {},
};
</script>

<style lang="css" scoped>
</style>
