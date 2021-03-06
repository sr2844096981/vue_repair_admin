// 引用全屏显示插件
// import screenfull from "screenfull";
import Eacharts01 from "../../components/Echarts/Echarts01.vue";
import Eacharts03 from "../../components/Echarts/Echarts03.vue";
// api
import { GetOrderNumByToday, GetOrderNumByAll, GetRepairListByToday } from "@/request/apisRepair/showdata"
import { QueryOrder } from "@/request/apisRepair/order";

export default {
    name: "bmap",
    components: { Eacharts01, Eacharts03 },
    data() {
        return {
            // 当天订单数量
            sameDayNum: 0,
            // 全部订单数量
            allDayNum: 0,
            // 地图中心点坐标,,
            center: {
                lng: 116.046329,
                lat: 36.457444,
            },
            // 跳动点的坐标
            leapPosition: {
                lng: 116.046329,
                lat: 36.457444,
            },
            // 新订单信息
            content: '新订单信息',
            // 轮询新订单定时器
            timerLoopRequest: null,
            // 标记点
            marker: [],
            // 信息框内容
            infoText: "",
            // 今日订单
            orderToday: [],
            // 轮询时新增数量
            newNum: 0
        };
    },
    mounted() {
        this.showMarker();
        this.untreated();
        this.funIntroduction();
        this.nowtime();
        this.getOrderNum();
        this.getRepairListByToday();
        // 轮询
        this.loopRequest();


    },
    beforeDestroy() {
        if (this.timerLoopRequest) { //如果定时器还在运行 或者直接关闭，不用判断
            clearInterval(this.timerLoopRequest); //关闭
        }
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
        /*         screenfull() {
                    if (screenfull.isFullscreen == false) {
                        this.$router.push("/bmapscreenfull");
                    } else {
                        this.$router.push("/bmap");
                    }
                    // 切换全屏
                    screenfull.toggle();
                }, */
        // 功能介绍
        funIntroduction() {
            this.$notify({
                title: "提示",
                message: "这是提示文案。鼠标左键可拖动地图，滚轮缩放地图。点击标记点可查看详情。",
                position: "bottom-right",
            });
        },
        // 未处理订单提示
        untreated() {
            // 未处理数
            let untreatedOrderNum = 0
            QueryOrder('id', 'name', '已报修').then(res => {
                console.log(res.data.data.length);
                untreatedOrderNum = res.data.data.length
            })
            const h = this.$createElement;
            setTimeout(() => {
                this.$notify({
                    title: "警告",
                    message: h(
                        "i", { style: "color: teal" },
                        "您有" + untreatedOrderNum + "条订单未处理，请及时处理"
                    ),
                    type: "warning",
                    duration: 0,
                });
            }, 1000);
        },
        // 通知
        open3() {
            this.$notify.info({
                title: '新订单',
                message: this.content
            });
        },
        // 获取订单数量
        getOrderNum() {
            // 当天订单数量
            GetOrderNumByToday().then(res => {
                    console.log(res);
                    if (res.data.code !== 200) return this.$message.error("获取失败");
                    this.sameDayNum = res.data.data
                })
                // 全部订单数量
            GetOrderNumByAll().then(res => {
                if (res.data.code !== 200) return this.$message.error("获取失败");
                this.allDayNum = res.data.data
            })
        },
        // 获取当天新增订单
        getRepairListByToday() {
            GetRepairListByToday().then(res => {
                // console.log(res.data);
                if (res.data.data.length <= this.newNum) return
                this.newNum = res.data.data.length;
                // console.log(res.data);
                // 新订单通知展示内容
                this.content = "位置：" + res.data.data[this.newNum - 1].repairArea + "，项目：" + res.data.data[this.newNum - 1].repairProject
                this.open3();
                // 新订单地图展示内容
                // leapPosition 跳动点坐标
                console.log(res.data.data[res.data.data.length - 1].repairArea);
                let str = res.data.data[res.data.data.length - 1].repairArea
                let index = str.lastIndexOf("-")
                str = str.substring(index + 1, str.length);
                // console.log(str) 
                for (let k = 0; k < this.marker.length; k++) {
                    if (str == this.marker[k].windowInfo.text) {
                        this.leapPosition.lng = this.marker[k].lngPosition
                        this.leapPosition.lat = this.marker[k].latPosition
                        this.center.lng = this.marker[k].lngPosition
                        this.center.lat = this.marker[k].latPosition
                    }
                }
                this.orderToday = res.data.data
            })
        },
        // 轮询新订单
        loopRequest() {
            this.timerLoopRequest = setInterval(() => {
                console.log("轮询新订单");
                // 在这里发送请求获取数据
                this.getRepairListByToday()
            }, 5000);
        },
        // 标记点信息
        showMarker() {
            this.marker = [{
                    // id
                    id: 1,
                    // 坐标 经度
                    lngPosition: 116.045408,
                    // 坐标 纬度
                    latPosition: 36.455528,
                    // 信息
                    windowInfo: {
                        text: "一号宿舍楼",
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
                        text: "二号宿舍楼",
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
                        text: "三号宿舍楼",
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
                        text: "四号宿舍楼",
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
                        text: "五号宿舍楼",
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
                        text: "六号宿舍楼",
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
                        text: "一号教学楼",
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
                        text: "二号宿舍楼",
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
                        text: "三号宿舍楼",
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
                        text: "六号教学楼",
                    },
                    showInfo: false,
                },
            ]
        },

    },
};