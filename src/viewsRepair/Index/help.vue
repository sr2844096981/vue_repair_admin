<template>
  <div>
    <el-card class="box-card-help" shadow="never">
      <h2>帮助链接</h2>
      <ul class="infoItem3">
        <li>
          <span class="icon"><i class="el-icon-discover"></i></span>
          <span class="number">入门指南</span>
        </li>
        <li>
          <span class="icon"><i class="el-icon-s-management"></i></span>
          <span class="number">在线帮助手册</span>
        </li>
        <li @click="goqq">
          <a
            target="_blank"
            href="http://wpa.qq.com/msgrd?v=3&uin=2844096981&site=qq&menu=yes"
            style="text-decoration:none"
          >
            <span class="icon"><i class="el-icon-phone-outline"></i></span>
            <span class="number">技术支持</span>
          </a>
        </li>
      </ul>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    goqq() {
      //  window.location.href=";
    },
  },
};
</script>

<style lang="css">
/* 帮助链接 */

.box-card {
  position: relative;
}

.box-card-help {
  margin-top: 20px;
  position: absolute;
  bottom: 4px;
  /* right: 0; */
  width: 100%;
}

.box-card-help .infoItem3 {
  border: none;
  margin-top: 10px;
  width: 100%;
}

.box-card-help .infoItem3 .icon {
  width: 45px;
  height: 45px;
  line-height: 45px;
  font-size: 28px;
  cursor: pointer;
}
</style>