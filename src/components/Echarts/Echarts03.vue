<template>
  <div>
    <div id="echarts03" style="width: 300px; height: 200px"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  components: {},
  data() {
    return {
      regionData: [],
      regionIndex:[]
    };
  },
  mounted() {
    // this.getOrderNumByRegion();

    setTimeout(() => {
      this.dataConfig();
    }, 1000);
  },
  methods: {
    dataConfig() {
      var chartDom = document.getElementById("echarts03");
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        title: {
          text: "区域订单统计",
          left: "left",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        // 颜色解释
        // legend: {
        //   left: "center",
        //   top: "bottom",
        //   data: this.regionIndex,
        // },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: { show: true },
          },
        },
        series: [
          {
            name: "维修订单",
            type: "pie",
            radius: [9, 63],
            center: ["55%", "50%"],
            roseType: "area",
            itemStyle: {
              borderRadius: 6,
            },
            data:  [
                {value: 40, name: '学生生活区'},
                {value: 38, name: '科学教研区'},
                {value: 32, name: '行政办公区'},
                {value: 28, name: '体育运动区'},
                {value: 26, name: '生态休闲区'},
                {value: 18, name: '入口景观区'}
            ],
          },
        ],
      };

      option && myChart.setOption(option);
    },
   
  },
};
</script>

<style lang="css" scoped>
</style>
