// api
import { GetAllOrders, AcceptancenOrder, AssignmentOrder, WorkSign, Complete, QueryOrder } from "@/request/apisRepair/order";
import { QueryStaff } from "@/request/apisRepair/staff";
// 组件
import TableData from './tableData'
export default {
    components: { TableData },
    data() {
        return {
            // 订单列表
            ordersData: [],
            // 订单详情数据
            detailsData: {

            },
            // 控制详情对话框的显示与隐藏
            dialogVisibleDetails: false,
            // 控制派工对话框的显示与隐藏
            dialogVisibleDistribution: false,
            // ？？？
            valueAcceptor: [],
            // 邮件信息
            emailInfo: "javascript:void(0);",
            // 员工数据
            staffData: [],
            // 选中工种value
            valueWorkType: "",
            // 工种选择器菜单
            optionsWorkType: [{
                    value: "宿管部",
                    label: "宿管部",
                },
                {
                    value: "消防部",
                    label: "消防",
                },
                {
                    value: "五金部",
                    label: "五金",
                },
                {
                    value: "电器部",
                    label: "电器",
                },
            ],
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

        };
    },
    mounted() {
        this.getAllOrders();
    },
    methods: {
        // 获取全部订单数据
        getAllOrders() {
            GetAllOrders().then((res) => {
                console.log(res.data);
                if (res.data.code !== 200) return this.$message.error("获取数据失败");
                this.ordersData = res.data.data;
                this.operationStatus();
            });
        },
        // 根据订单状态查询订单
        queryOrder() {
            console.log(this.valueStates);
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
        handleDetails(index, row) {
            this.detailsData = this.ordersData[index];
            // 将评分转为数字类型
            this.detailsData.appraise = Number(this.detailsData.appraise)
            this.dialogVisibleDetails = true;
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
                    const id = userInfo.id;
                    const repairId = row.id;
                    const name = userInfo.name;
                    AcceptancenOrder(id, repairId, name).then((res) => {
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
        },
        // 根据工种查询员工
        queryStaff() {
            QueryStaff(this.valueWorkType).then((res) => {
                if (res.data.code !== 200) return this.$message.error("获取数据失败");
                if (res.data.data.length < 1) this.$message.info("没有符合条件的数据");
                this.staffData = res.data.data;
            });
        },
        // 发送邮件
        sendOut(row) {
            let emailAddress = row.email;
            let emailBody =
                "【报修区域 - " +
                this.detailsData.repairArea +
                "】" +
                "【报修项目 - " +
                this.detailsData.repairProject +
                "】" +
                "【报修内容 - " +
                this.detailsData.content +
                "】" +
                "【联系方式 - " +
                this.detailsData.phone +
                "】" +
                "【报修项目 - " +
                this.detailsData.repairProject +
                "】" +
                "【报修日期 - " +
                this.detailsData.date +
                "】" +
                "【预约时间 - " +
                this.detailsData.time +
                "】" +
                "【报修图片链接 - " +
                this.detailsData.image +
                "】" +
                "【订单编号 - " +
                this.detailsData.id +
                "】";

            this.emailInfo =
                "mailto:" +
                emailAddress +
                "?subject=维修订单详情&body=" +
                emailBody;
            // 派工成功请求
            AssignmentOrder(row.phone, this.detailsData.id, row.name).then(res => {
                console.log(res);
                if (res.data.code !== 200) return this.$message.error("操作失败");
                this.getAllOrders();
            })
        },
        // 签到
        handleSignIn(index, row) {
            // 派工成功请求
            WorkSign(row.id).then(res => {
                console.log(res);
                if (res.data.code !== 200) return this.$message.error("操作失败");
                this.$message.success("签到成功");
                this.getAllOrders();
            })
        },
        // 完工
        handleComplete(index, row) {
            console.log(row);
            Complete(row.id).then(res => {
                console.log(res);
                if (res.data.code !== 200) return this.$message.error("操作失败");
                this.$message.success("操作成功");
                this.getAllOrders();
            })
        },
    },
};