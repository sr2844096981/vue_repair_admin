<template>
  <div>
    <div id="echarts01" style="width: 300px; height: 200px"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { GetOrderNumByWeek } from "@/request/apisRepair/showdata";

export default {
  components: {},
  data() {
    return {
      // x轴数据
      xAxisData: [],
      // y轴数据
      yAxisData: [],
    };
  },
  mounted() {
    this.getOrderNumByWeek();
    setTimeout(() => {
      this.dataConfig();
    }, 1000);
  },
  methods: {
    dataConfig() {
      var chartDom = document.getElementById("echarts01");
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        color: ["#80FFA5"],
        title: {
          text: "近七日订单数量统计图",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        /*  legend: {
          data: ["订单总量"],
        }, */
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: this.xAxisData,
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "订单数量",
            type: "line",
            stack: "总量",
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(128, 255, 165)",
                },
                {
                  offset: 1,
                  color: "rgba(1, 191, 236)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: this.yAxisData,
          },
        ],
      };

      option && myChart.setOption(option);
    },
    getOrderNumByWeek() {
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      let id = userInfo.id;
      let name = userInfo.name;
      GetOrderNumByWeek(id, name).then((res) => {
        // console.log(res.data.data);
        let xAxisData = [];
        let yAxisData = [0, 0, 0, 0, 0, 0, 0];
        for (let i = 0; i < res.data.data.length; i++) {
          xAxisData.push(res.data.data[i].day.substring(5));
          yAxisData.push(res.data.data[i].num);
        }
        this.xAxisData = xAxisData;
        this.yAxisData = yAxisData;
      });
    },
  },
};
</script>

<style lang="css" scoped>
</style>
