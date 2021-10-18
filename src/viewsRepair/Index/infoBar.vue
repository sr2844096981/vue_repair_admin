<template>
  <div>
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
            <span>ID：</span><span>{{ userId }}</span>
          </li>
          <li>
            <span>角色：</span><el-tag size="small">{{ position }}</el-tag>
          </li>
        </ul>

        <ul class="infoItem2">
          <li>正在维修数<span>22</span>个</li>
          <li>未维修数<span>777</span>个</li>
          <li>新增记录 <span>32</span> 条</li>
        </ul>
        <ul class="infoItem2">
          <li>今日未处理<span>777</span>个</li>
          <li>往日遗留 <span>32</span> 条</li>
        </ul>
        <ul class="infoItem3">
          <li>
            <span class="icon"><i class="el-icon-s-cooperation"></i></span>
            <span class="title">维修总数</span>
            <span class="number">456</span>
          </li>
          <li>
            <span class="icon"><i class="el-icon-s-opportunity"></i></span>
            <span class="title">浏览总数</span>
            <span class="number">999</span>
          </li>
          <li>
            <span class="icon"><i class="el-icon-s-flag"></i></span>
            <span class="title">目标数量</span>
            <span class="number">666</span>
          </li>
        </ul>
      </div>
    </el-card>
  </div>
</template>

<script>
// 引入公共的bug，来做为中间传达的工具
import Bus from "@/utils/bus.js";
export default {
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
    };
  },
  mounted() {
    this.getUserInfo();
    this.watchCircleUrl();
  },
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
  },
};
</script>

<style lang="css">
.userInfo {
    display: flex;
    padding: 15px;
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
    height: 392px;
}
</style>