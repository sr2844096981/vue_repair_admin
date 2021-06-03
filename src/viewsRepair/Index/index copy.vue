<template>
  <div>
    <!-- 页头 -->
    <div class="page-header">
      <i class="el-icon-s-home"></i>
      <span>首页</span>
    </div>
    <!-- 账号信息部分 -->
    <el-card shadow="never">
      <div class="userInfo">
        <div class="userAvatar">
          <el-avatar :size="50" :src="circleUrl"></el-avatar>
        </div>
        <ul class="infoItem1">
          <li>
            <span class="nickname">{{ userName }}</span>
            <i class="el-icon-edit"></i>
          </li>
          <li>
            <span>登录名：</span><span>{{ userId }}</span>
          </li>
          <li><span>账号状态：</span><el-tag size="small">启用</el-tag></li>
        </ul>

        <ul class="infoItem2">
          <li>当前合同数<span>22</span>项</li>
          <li><span>房源数777</span>比</li>
          <li>新增房源 <span>32</span> 家</li>
        </ul>
        <ul class="infoItem3">
          <li>
            <span class="icon"><i class="el-icon-s-cooperation"></i></span>
            <span class="title">卖家总数</span>
            <span class="number">456</span>
          </li>
          <li>
            <span class="icon"><i class="el-icon-s-opportunity"></i></span>
            <span class="title">浏览总数</span>
            <span class="number">999</span>
          </li>
          <li>
            <span class="icon"><i class="el-icon-s-flag"></i></span>
            <span class="title">目标客户</span>
            <span class="number">666</span>
          </li>
        </ul>
      </div>
    </el-card>
    <!-- 浏览分析图标部分 -->
    <div class="browse clearfix">
      <el-card class="box-card f-l" shadow="never">
        <el-calendar style="height: 500px" v-model="value">
          <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
          <template slot="dateCell" slot-scope="{ date, data }">
            <div
              @click="isSelected(data, dealMyDate(data.day))"
              style="width: 100%; height: 100%"
              :class="dealMyDate(data.day) ? 'isSelectedclass' : ''"
            >
              <span :class="data.isSelected ? 'is-selected' : ''"
                >{{ data.day.substring(data.day.length-2) }}
                {{ data.isSelected ? "✔️" : "" }}</span
              >
              <!-- 显示日{{ data.day.split('-')[2]}} -->
              <br />
              <span class="is-selected">{{ dealMyDate(data.day) }}</span>
            </div>
          </template>
        </el-calendar>
      </el-card>

      <el-card class="box-card f-r" style="overflow-y: scroll" shadow="never">
        <template>
          <el-input
            v-model="input"
            clearable
            placeholder="请输入内容"
            style="width: 350px; margin-right: 30px"
          ></el-input>
          <el-button type="primary">添加</el-button>
          <el-button type="danger">清空</el-button>
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="address" label="备忘录"></el-table-column>
            <el-table-column label="操作" width="80">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="small"
                  @click="handleClick(scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-card>
    </div>
  </div>
</template>
<script>
// 引入公共的bug，来做为中间传达的工具
import Bus from "@/utils/bus.js";

export default {
  name: "Index",
  components: {},
  data() {
    return {
      userId: "",
      circleUrl: "",
      userNumber: "",
      userName: "",
      value: new Date(),
      tableData: [],
      input: "",
      resDate: [
        { date: "2021-01-27", content: "写博客" },
        { date: "2021-01-26", content: "学习VUE" },
        { date: "2021-02-09", content: "放假" },
        { date: "2021-02-11", content: "过年" }
      ]

    };
  },
  mounted() {
    this.getUserInfo();
    this.watchCircleUrl();
  },
  created() {
    this.$nextTick(() => {
      // 点击前一个月
      let prevBtn = document.querySelector(
        ".el-calendar__button-group .el-button-group>button:nth-child(1)"
      );
      prevBtn.addEventListener("click", e => {
        this.prevBtnmonth(this.value);
      });

      //点击下一个月
      let nextBtn = document.querySelector(
        ".el-calendar__button-group .el-button-group>button:nth-child(3)"
      );
      nextBtn.addEventListener("click", () => {
        this.nextBtnmonth(this.value);
      });

      //点击今天
      let todayBtn = document.querySelector(
        ".el-calendar__button-group .el-button-group>button:nth-child(2)"
      );
      todayBtn.addEventListener("click", () => {
        this.todayBtnmonth(this.value);
      });
    });
  },
  methods: {
    prevBtnmonth(ins) {
      console.log("上个月按钮事件");
      console.log(ins);
    },
    nextBtnmonth(ins) {
      console.log("下个月按钮事件");
      console.log(ins);
    },
    todayBtnmonth(ins) {
      console.log("今天按钮事件");
      console.log(ins);
    },
    // 是否选中日期
    isSelected(ins, ins2) {
      console.log(ins.day);
      console.log(ins2);
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
    isSelected(data) {
      console.log(data);
    },
    // 获取localStorage中的userInfo
    getUserInfo() {
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      this.circleUrl = userInfo.avatar;
      this.userName = userInfo.position;
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
  },
  created() {},
  watch: {},
};
</script>

<style lang="css" scoped>
.userInfo {
  display: flex;
  padding: 20px;
}
.userAvatar {
  margin-top: 10px;
}
.infoItem1 {
  margin-left: 20px;
}
.infoItem1 .nickname {
  font-size: 14px;
  font-weight: 600;
}
.infoItem1 i {
  color: #f57d2d;
}
.infoItem1 li {
  margin-bottom: 5px;
}
.infoItem2 {
  flex: 1;
  margin-left: 80px;
}
.infoItem2 span {
  color: #f57d2d;
  font-weight: 600;
}
.infoItem2 li {
  margin-bottom: 5px;
}
.infoItem3 {
  display: flex;
  width: 400px;
  border-left: 3px dashed #ccc;
  padding: 0 30px 0 50px;
}
.infoItem3 li {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
}
.infoItem3 span {
  flex: 1;
  margin-bottom: 5px;
}
.infoItem3 .icon {
  display: block;
  width: 35px;
  height: 35px;
  background-color: #f0f2f7;
  border-radius: 100px;
  font-size: 22px;
  line-height: 35px;
  text-align: center;
  color: #3f58fd;
}

.infoItem3 .number {
  font-size: 14px;
  font-weight: 600;
  color: #3f58fd;
}

/* 浏览 */
.browse {
  margin-top: 20px;
}

.browse .box-card {
  width: 49.5%;
  height: 370px;
}
</style>
<style lang="css">
/* 日历 */
.el-calendar-table .el-calendar-day {
  height: 35px !important;
}
</style>