<template>
  <div class="main">
    <!-- 页头 -->
    <div class="page-header">
      <i class="el-icon-s-home"></i>
      <span>首页</span>
    </div>
    <!-- 账号信息部分 -->
    <InfoBar />
    <!-- 备忘录部分 -->
    <div class="browse clearfix">
      <!-- 日历 -->
      <el-card shadow="never" class="f-l calendar-wrap">
        <Calendar />
      </el-card>
      <div class="f-r box-card">
        <!-- 备忘录 -->
        <Memo />
        <!-- 帮助链接 -->
        <Help />
      </div>
    </div>
  </div>
</template>

<script>

import InfoBar from "./infoBar";
import Calendar from "./calendar";
import Memo from "./memo";
import Help from "./help";
export default {
  name: "Index",
  components: { InfoBar, Memo, Calendar, Help },
  data() {
    return {
     
    };
  },
  mounted() {
    
  },
  created() {},
  methods: {
   
  },
  created() {},
  watch: {},
};
</script>

<style lang="css" scoped>

.main{
  width: 1227px;
  margin: 0 auto;
}

</style>
