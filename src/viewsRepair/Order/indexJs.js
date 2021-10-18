// api
import { GetAllOrders, AcceptancenOrder, WorkSign, Complete, QueryOrder } from "@/request/apisRepair/order";
// api
import {
    GetAllUnit,
} from "@/request/apisRepair/staff";

// 组件
import TableData from './tableData'
import Dispatch from './dispatch'
// 工具
import { exportData } from "@/utils/exportToExcel"

export default {
    components: { TableData, Dispatch },
    data() {
        return {
            // 订单列表
            ordersData: [],
            // 订单详情数据
            detailsData: {},
            // 检索关键词
            inputTel: "",
            // 检索结果
            pagingData: [],
            // 控制详情对话框的显示与隐藏
            dialogVisibleDetails: false,
            // 控制派工对话框的显示与隐藏
            dialogVisibleDistribution: false,
            // 所有工种
            unitData: [],
            // 选中的订单状态
            valueStates: "",
            // 状态选择器菜单
            optionsStates: [{
                value: '',
                label: '全部订单'
            }, {
                value: '已报修',
                label: '已报修'
            }, {
                value: '已受理',
                label: '已受理'
            }, {
                value: '已派工',
                label: '已派工'
            }, {
                value: '已完工',
                label: '已完工'
            }, {
                value: '已评价',
                label: '已评价'
            }],
            // 日期
            date: ""
        };
    },
    mounted() {
        this.getAllOrders();
    },
    methods: {
        // 检索 日期
        changeDate() {
            if (this.date === null) return this.getAllOrders()
            this.ordersData = this.ordersData.filter((item) => {
                // return item.project === this.searchKey
                // 字符串查找，如果返回结果不等于-1，说明可以查到
                // console.log(item);
                return item.date.indexOf(this.date) != -1;
            });
        },
        // 获取全部订单数据
        getAllOrders() {
            GetAllOrders().then((res) => {
                // console.log(res.data);
                if (res.data.code !== 200) return this.$message.error("获取数据失败");
                this.ordersData = res.data.data;
                this.operationStatus();
            });
            // 隐藏分页器 
            document.querySelector("#pagination").style.display = "block";
        },
        // 根据订单状态查询订单
        queryOrder() {
            // console.log(this.valueStates);
            if (this.valueStates == "") return this.getAllOrders()
            let userInfo = JSON.parse(localStorage.getItem("userInfo"));
            let id = userInfo.id;
            let name = userInfo.name;
            QueryOrder(id, name, this.valueStates).then(res => {
                if (res.data.code !== 200) return this.$message.error("获取数据失败");
                this.ordersData = res.data.data;
                this.operationStatus();
            })
        },
        // 根据手机号检索订单
        search() {
            this.ordersData = this.ordersData.filter((item) => {
                // return item.project === this.searchKey
                // 字符串查找，如果返回结果不等于-1，说明可以查到
                // console.log(item);
                return item.phone.indexOf(this.inputTel) != -1;
            });
            // 隐藏分页器
            // document.querySelector("#pagination").style.display = "none";
        },
        // 导出excel
        exportData() {
            const headers = {
                '订单编号': 'id',
                '用户编号': 's_id',
                '报修区域': 'repairArea',
                '详细地址': 'address',
                '报修项目': 'repairProject',
                '联系方式': 'phone',
                '报修日期': 'date',
                '预约时间': 'time',
                '报修内容': 'content',
                '维修工人': 'worker',
                '用户评价': 'phone',
                '评价分数': 'appraise',
                '订单状态': 'schedule',
            }
            exportData(headers, this.ordersData, '维修订单 ' + this.valueStates)
        },
        // 关闭派工对话框
        closeDialog() {
            this.dialogVisibleDistribution = false
        },
        // 增加操作状态属性
        operationStatus() {
            let ordersData = JSON.parse(JSON.stringify(this.ordersData));
            for (let i = 0; i < ordersData.length; i++) {
                switch (ordersData[i].schedule) {
                    case "已报修":
                        ordersData[i].operationStatus = "受理";
                        break;
                    case "已受理":
                        ordersData[i].operationStatus = "派工";
                        break;
                    case "已派工":
                        ordersData[i].operationStatus = "签到";
                        break;
                    case "维修中":
                        ordersData[i].operationStatus = "完工";
                        break;
                    case "已完工":
                        ordersData[i].operationStatus = "";
                        break;
                    case "已评价":
                        ordersData[i].operationStatus = "";
                        break;

                }
                this.ordersData = ordersData;
            }
        },
        // 操作对应方法
        handleOperation(index, row) {
            switch (row.operationStatus) {
                case "受理":
                    this.handleAcceptancen(index, row);
                    break;
                case "派工":
                    this.handleDistribution(index, row);
                    break;
                case "签到":
                    this.handleSignIn(index, row);
                    break;
                case "完工":
                    this.handleComplete(index, row);
                    break;
            }
        },
        // 切换顶部选项卡方法
        handleClick(tab, event) {
            // console.log(tab.name, event);
            switch (tab.name) {
                // 全部订单
                case "allOrder":
                    this.getAllOrders();
                    break;
            }
        },
        // 点击详情方法
        handleDetails(index, orderId) {
            // console.log(orderId);
            this.$router.push(`/order/detail/${orderId}`)
        },
        // 点击受理方法
        handleAcceptancen(index, row) {
            this.$confirm("确定受理?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                })
                .then(() => {
                    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
                    const repairId = row.id;
                    const name = userInfo.name;
                    AcceptancenOrder(repairId, name).then((res) => {
                        if (res.data.code !== 200) return this.$message.error("受理失败");
                        this.$message.success("受理成功");
                        this.getAllOrders();
                    });
                })
                .catch(() => {
                    this.$message.info("已取消受理");
                });
        },

        // 点击派工方法
        handleDistribution(index, row) {
            this.detailsData = this.ordersData[index];
            this.dialogVisibleDistribution = true;
            this.getAllUnit()
        },
        // 获取工种
        getAllUnit() {
            GetAllUnit().then((res) => {
                console.log(res);
                if (res.data.code !== 200) return this.$message.error("获取数据失败");
                this.unitData = res.data.data;
            });
        },

        // 签到
        handleSignIn(index, row) {
            // 派工成功请求
            WorkSign(row.id).then(res => {
                // console.log(res);
                if (res.data.code !== 200) return this.$message.error("操作失败");
                this.$message.success("签到成功");
                this.getAllOrders();
            })
        },
        // 完工
        handleComplete(index, row) {
            // console.log(row);
            Complete(row.id).then(res => {
                console.log(res);
                if (res.data.code !== 200) return this.$message.error("操作失败");
                this.$message.success("操作成功");
                this.getAllOrders();
            })
        },
    },
};