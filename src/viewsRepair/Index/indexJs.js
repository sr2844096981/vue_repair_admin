// 引入公共的bug，来做为中间传达的工具
import Bus from "@/utils/bus.js";

export default {
    name: "Index",
    components: {},
    data() {
        return {
            // id
            userId: "",
            // 头像
            circleUrl: "",
            // 角色
            position: "",
            // 用户名
            userName: "",
            value: new Date(),
            tagData: [],
            inputNotepad: "",
            resDate: [{ date: "2021-05-17", content: ["吃饭", "睡觉", "吃饭"] }],
            // 选中的日期
            currentDate: "",
            // 暂存记事本记录
            newContent: [],
            inputVisible: false,
            inputValue: "",
        };
    },
    mounted() {
        this.getUserInfo();
        this.watchCircleUrl();
        this.getNowFormatDate();
        this.loadShowTag();
    },
    created() {},
    methods: {
        // 获取localStorage中的userInfo
        getUserInfo() {
            let userInfo = JSON.parse(localStorage.getItem("userInfo"));
            this.circleUrl = userInfo.avatar;
            this.position = userInfo.position;
            this.userName = userInfo.name;
            this.userId = userInfo.id;
            this.watchCircleUrl();
        },
        // 监听修改头像变化
        watchCircleUrl() {
            // 用$on事件来接收参数
            Bus.$on("circleUrl", (data) => {
                // 接收组件A传过来的数据
                this.circleUrl = data;
            });
        },
        // 格式化当前日期
        getNowFormatDate() {
            var date = new Date();
            var seperator1 = "-";
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            var currentdate = year + seperator1 + month + seperator1 + strDate;
            return (this.currentDate = currentdate);
        },

        dealMyDate(v) {
            let len = this.resDate.length;
            let res = "";
            for (let i = 0; i < len; i++) {
                if (this.resDate[i].date == v) {
                    res = this.resDate[i].content;
                    break;
                }
            }
            return res;
        },
        // 选中的日期
        isSelected(date) {
            this.currentDate = date.day;
            this.newContent = []
            this.showTag();
        },
        // 显示标签
        showTag() {
            // 清除空的记录
            for (let i = 0; i < this.resDate.length; i++) {
                if (this.resDate[i].content == "") {
                    this.resDate.splice(this.resDate.indexOf(i), 1);
                }
            }
            for (let i = 0; i < this.resDate.length; i++) {
                if (this.resDate[i].date === this.currentDate) {
                    // 有记录
                    this.tagData = this.resDate[i].content;
                    this.newContent = this.resDate[i].content;
                    return;
                }
            }
            // 无记录
            this.tagData = [];
        },
        // 页面加载时，显示标签
        loadShowTag() {
            let notepadInfo = JSON.parse(localStorage.getItem("notepadInfo"));
            this.resDate = notepadInfo;
            this.showTag();
        },
        // 删除标签
        handleClose(tag, index) {
            this.newContent.splice(index, 1);
            // 自动保存
            this.addaddNotepad();
        },
        // 显示input输入框
        showInput() {
            this.inputVisible = true;
            this.$nextTick((_) => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },
        // 添加备忘录
        handleInputConfirm() {
            let inputValue = this.inputNotepad;
            if (inputValue) {
                this.newContent.push(inputValue);
            }
            this.inputVisible = false;
            this.inputNotepad = "";
            this.tagData = this.newContent;
            // 自动保存
            this.addaddNotepad();
        },
        // 保存记事本记录
        addaddNotepad() {
            let date = this.currentDate;
            let content = this.newContent;
            let vote = {};
            vote.date = date;
            vote.content = content;
            for (let i = 0; i < this.resDate.length; i++) {
                if (this.resDate[i].date == date) {
                    this.resDate.splice(i, 1);
                    break;
                }
            }
            this.resDate.push(vote);
            window.localStorage.setItem("notepadInfo", JSON.stringify(this.resDate));
            this.showTag();
        },

    },
    created() {},
    watch: {},
};