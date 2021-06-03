<template>
  <div class="home">
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="logo">一休后台管理系统</div>
        <el-menu
          background-color="#282E38"
          text-color="#fff"
          active-text-color="#F57D2D"
          router
          :collapse="isCollapse"
          :collapse-transition="false"
          :default-active="activePath"
        >
          <el-menu-item
            :index="subItem.path"
            v-for="subItem in menulist"
            :key="subItem.id"
            @click="saceNavState(subItem.path)"
          >
            <i :class="subItem.icon"></i>
            <span slot="title">{{ subItem.name }}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div class="header-left">
            <i
              :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
              @click="toggleCollapse"
            ></i>
            <span>后台管理系统</span>
          </div>
          <div class="header-right">
            <el-avatar size="medium" :src="circleUrl"></el-avatar>
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                {{ userName }}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="showChangeAvatarDialog"
                  >修改头像</el-dropdown-item
                >
                <el-dropdown-item>修改密码</el-dropdown-item>
                <el-dropdown-item command="handleLogout"
                  >退出登录</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
    <ChangeAvatarDialog
      :ChangeAvataVisible="ChangeAvataVisible"
      @closeChangeAvataDialog="closeChangeAvataDialog"
    />
  </div>
</template>

<script>
// 引入公共的bug，来做为中间传达的工具
import Bus from "@/utils/bus.js";
import ChangeAvatarDialog from "./Index/changeAvatarDialog";
export default {
  name: "Home",
  components: { ChangeAvatarDialog },
  data() {
    return {
      // 菜单列表
      menulist: [
        {
          id: 1,
          path: "/index",
          icon: "el-icon-s-home",
          name: "首页",
        },
        {
          id: 2,
          path: "/notice",
          icon: "el-icon-data-analysis",
          name: "公告管理",
        },
        {
          id: 3,
          path: "/order",
          icon: "el-icon-s-order",
          name: "维修订单",
        },
        {
          id: 4,
          path: "/staff",
          icon: "el-icon-s-custom",
          name: "工人管理",
        },
        {
          id: 5,
          path: "/QRcode",
          icon: "el-icon-s-grid",
          name: "二维码",
        },
        {
          id: 10,
          path: "/showdata",
          icon: "el-icon-s-data",
          name: "数据展示",
        },
        {
          id: 11,
          path: "/demo",
          icon: "el-icon-s-data",
          name: "测试",
        },
        {
          id: 12,
          path: "/bmap",
          icon: "el-icon-s-data",
          name: "百度地图测试",
        },
        {
          id: 13,
          path: "/amap",
          icon: "el-icon-s-data",
          name: "高德地图测试",
        },
        {
          id: 14,
          path: "/bmapgl",
          icon: "el-icon-s-data",
          name: "百度地图GL测试",
        },
      ],
      // 激活的菜单项
      activePath: "",
      circleUrl: JSON.parse(localStorage.getItem("userInfo")).avatar,
      isCollapse: false,
      userName: "",
      // 控制修改头像对话框显示与隐藏
      ChangeAvataVisible: false,
    };
  },
  created() {
    this.getUserInfo();
    this.watchCircleUrl()
    this.activePath = window.sessionStorage.getItem("activePath");
  },
  methods: {
    // 保存激活菜单项
    saceNavState(activePath) {
      window.sessionStorage.setItem("activePath", activePath);
      this.activePath = activePath;
    },
    // 折叠侧边栏
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    // 下拉框	点击菜单项触发的事件回调
    handleCommand(command) {
      if (command === "showChangeAvatarDialog") {
        this.showChangeAvatarDialog();
      } else if (command === "handleLogout") {
        this.handleLogout();
      }
      return;
    },
    // 获取用户信息
    getUserInfo() {
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      this.circleUrl = userInfo.avatar;
      this.userName = userInfo.position;
    },
    // 打开修改头像对话框
    showChangeAvatarDialog() {
      this.ChangeAvataVisible = true;
    },
    // 监听修改头像变化
    watchCircleUrl() {
      // 用$on事件来接收参数
      Bus.$on("circleUrl", (data) => {
        // 接收组件A传过来的数据
        this.circleUrl = data;
      });
    },
    // 子组件传回来的关闭事件
    closeChangeAvataDialog() {
      this.ChangeAvataVisible = false;
    },
    // 退出登录
    handleLogout(command) {
      window.localStorage.clear();
      this.$router.push("/login");
      this.$message.success("退出成功！");
    },
  },
};
</script>

<style lang="css" scoped>
.home {
  height: 100%;
}
.el-container {
  height: 100%;
}
.el-header {
  background-color: #fff;
  color: #333;
  padding-right: 50px;
}

.el-aside {
  background-color: #282e38;
  color: #fff;
}

.el-main {
  background-color: #f0f2f7;
  color: #333;
}

.logo {
  height: 60px;
  line-height: 60px;
  text-align: center;
  font-size: 14px;
}
.header-left {
  float: left;
}
.header-left i {
  font-size: 24px;
  cursor: pointer;
}
.header-left span {
  line-height: 60px;
  margin-left: 10px;
  font-size: 16px;
}
.header-right {
  float: right;
}
.el-avatar {
  margin-top: 10px;
  margin-right: 10px;
}

.el-dropdown {
  top: -10px;
}

.el-menu {
  border-right: none;
}
</style>