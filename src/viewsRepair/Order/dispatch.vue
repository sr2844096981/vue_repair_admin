<template>
  <div>
    <el-dialog
      title="派工"
      :visible.sync="dialogVisibleDistribution"
      width="70%"
    >
      <el-select
        v-model="valueWorkType"
        @change="queryStaff"
        placeholder="请选择工种"
      >
        <el-option
          v-for="item in unitData"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <!-- 表格模块 -->
      <el-table :data="staffData" border style="width: 100%">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="id" label="编号" width="80"></el-table-column>
        <el-table-column prop="name" label="姓名" width="80"> </el-table-column>
        <el-table-column prop="phone" label="电话"> </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column prop="status" label="状态" width="100">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <a
              class="send-out"
              :href="emailInfo"
              @click="sendOut(scope.row)"
              rel="nofollow"
              >向该受理人发送详情邮件</a
            >
          </template>
        </el-table-column>
      </el-table>

      <span slot="footer" class="dialog-footer">
        <el-button @click="close">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// api

import {  AssignmentOrder } from "@/request/apisRepair/order";
import { QueryStaff } from "@/request/apisRepair/staff";
export default {
  props: ["dialogVisibleDistribution", "unitData","detailsData","getAllOrders"],
  data() {
    return {
      // 选中工种value
      valueWorkType: "",
      // 员工数据
      staffData: [],
      // 邮件信息
      emailInfo: "javascript:void(0);",
    };
  },
  methods: {
    //   通知父组件关闭对话框
    close(){
        this.$emit("closeDialog")
    },
    // 根据工种查询员工
    queryStaff(val) {
      // console.log(this.unitData);
      // console.log(val);
      QueryStaff(val).then((res) => {
        // console.log(res);
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
        "mailto:" + emailAddress + "?subject=维修订单详情&body=" + emailBody;
      // 派工成功请求
      AssignmentOrder(row.phone, this.detailsData.id, row.name).then((res) => {
        if (res.data.code !== 200) return this.$message.error("操作失败");
        this.getAllOrders();
      });
    },
  },
  mounted(){

  }
};
</script>

<style>
</style>