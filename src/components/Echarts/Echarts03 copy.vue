<template>
  <div>
    <div id="echarts03" style="width: 300px; height: 200px"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
// api
import { GetOrderNumByRegion } from "@/request/apisRepair/showdata";
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
              borderRadius: 5,
            },
            data: this.regionData,
          },
        ],
      };

      option && myChart.setOption(option);
    },
    // 获取全部区域的订单统计信息
    getOrderNumByRegion() {
      // console.log("123");
      GetOrderNumByRegion().then((res) => {
        // console.log(res.data.data);
        let regionData = [];

        // A区教学楼 0，1，2
        let aqjxl = {};
        aqjxl.value =
          res.data.data[0].processNum +
          res.data.data[1].processNum +
          res.data.data[2].processNum;
        aqjxl.name = "A区教学楼";
        regionData.push(aqjxl);

        // B区教学楼 3，4，5
        let bqjxl = {};
        bqjxl.value =
          res.data.data[3].processNum +
          res.data.data[4].processNum +
          res.data.data[5].processNum;
        bqjxl.name = "B区教学楼";
        regionData.push(bqjxl);

        // A区宿舍楼 10，11，12，13，14
        let aqssl = {};
        aqssl.value =
          res.data.data[10].processNum +
          res.data.data[11].processNum +
          res.data.data[12].processNum +
          res.data.data[13].processNum +
          res.data.data[14].processNum;
        aqssl.name = "A区宿舍楼";
        regionData.push(aqssl);

        // B区宿舍楼 15，16，17，18，19
        let bqssl = {};
        bqssl.value =
          res.data.data[15].processNum +
          res.data.data[16].processNum +
          res.data.data[17].processNum +
          res.data.data[18].processNum +
          res.data.data[19].processNum;
        bqssl.name = "B区宿舍楼";
        regionData.push(bqssl);

        // 行政办公区 8，9
        let xzbgq = {};
        xzbgq.value = res.data.data[8].processNum + res.data.data[9].processNum;
        xzbgq.name = "行政办公区";
        regionData.push(xzbgq);

        // 艺体实验区 6，7，22，25，26
        let ytsyl = {};
        ytsyl.value =
          res.data.data[6].processNum +
          res.data.data[7].processNum +
          res.data.data[22].processNum +
          res.data.data[25].processNum +
          res.data.data[26].processNum;
        ytsyl.name = "艺体实验区";
        regionData.push(ytsyl);

        // 其他 20，21，23，24
        let qt = {};
        qt.value =
          res.data.data[20].processNum +
          res.data.data[21].processNum +
          res.data.data[23].processNum +
          res.data.data[24].processNum;
        qt.name = "其他";
        regionData.push(qt);
        this.regionData = regionData;
        // 图标序列
        let regionIndex = [];
        for(let i=0;i<regionData.length;i++){
          regionIndex.push(regionData[i].name)
        }
        this.regionIndex = regionIndex
        // console.log(regionIndex);


      });
    },
  },
};
</script>

<style lang="css" scoped>
</style>
