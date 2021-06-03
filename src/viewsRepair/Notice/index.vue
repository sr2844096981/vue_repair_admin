<template>
  <div>
    <div class="page-header">
      <i class="el-icon-s-claim"></i>
      <span>公告管理</span>
    </div>
    <el-card shadow="never">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="管理公告" name="administer">
          <AdministerNotice ref="administerNotice" />
        </el-tab-pane>
        <el-tab-pane label="发布公告" name="release">
          <ReleaseNotice/>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import ReleaseNotice from "./releaseNotice";
import AdministerNotice from "./administerNotice";
export default {
  components: { ReleaseNotice, AdministerNotice },
  data() {
    return {
      activeName: "administer",
    };
  },
  mounted() {},
  methods: {
    // 切换标签页，如果切换到管理公告子组件获取公告列表方法
    handleClick(tab, event) {
      if (tab.name == "administer") {
        this.$refs.administerNotice.getNoticeList();
      }
    },
  },
};
</script>

<style>
</style>