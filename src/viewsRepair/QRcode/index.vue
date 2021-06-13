<template>
  <div>
    <el-card shadow="never">
      <el-button type="success" @click="goAddQRcode">添加二维码</el-button>
      <el-input
        placeholder="请输入搜索关键词"
        prefix-icon="el-icon-search"
        v-model="searchKey"
        clearable
        style="display: inline-block; width: 180px; margin: 30px;"
      >
      </el-input>
      <el-button type="warning" @click="goPrinting" style="float:right; margin:30px"
        >批量下载 / 打印二维码</el-button
      >

      <!-- 表格模块 -->
      <el-table
        :data="pagingData"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column
          prop="deviceId"
          label="编号"
          width="80"
        ></el-table-column>
        <el-table-column prop="area" label="区域" width="100">
        </el-table-column>
        <el-table-column prop="project" label="项目" width="100">
        </el-table-column>
        <el-table-column prop="address" label="位置"> </el-table-column>
        <el-table-column prop="worker" label="负责单位"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleUpdate(scope.$index, scope.row)"
              >修改</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        style="margin-top: 30px"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        background
        :page-sizes="[2, 4, 6, 8]"
        :page-size="4"
        layout="total, sizes, prev, pager, next, jumper"
        :total="QRcodeData.length"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
// 引入分页
import { pageData } from "@/utils/Pagination";
// api
import { GetAllDevice, DeleteStaff } from "@/request/apisRepair/qrcode";
// 引入公共的bug，来做为中间传达的工具
import Bus from "@/utils/bus.js";
export default {
  data() {
    return {
      // 搜索关键字
      searchKey: "",
      QRcodeData: [],
      // 分页后的数组
      pagingData: [],
      //  每页显示条数
      pageSize: 4,
      // 选中的数据
      multipleSelection: [],
    };
  },
  mounted() {
    this.getAllDevice();
  },
  methods: {
    //   跳转添加设备二维码
    goAddQRcode() {
      let id = "add";
      this.$router.push(`/addQRcode/${id}`);
    },
    // 获取全部二维码记录
    getAllDevice() {
      GetAllDevice().then((res) => {
        // console.log(res);
        this.QRcodeData = res.data.data;
        // console.log(res.data.data);
      });
    },
    // 删除二维码记录
    handleDelete(index, row) {
      DeleteStaff(row.deviceId).then((res) => {
        // console.log(res);
        if (res.data.code !== 200) return this.$message.error("删除失败");
        this.$message.success("删除成功");
        this.getAllDevice();
      });
    },
    //修改记录
    handleUpdate(index, row) {
      this.$router.push({
        path: `/addQRcode/${row.deviceId}`,
      });
    },
    // 每页条数改变时触发
    handleSizeChange(val) {
      this.pageSize = val;
      this.pagingData = pageData(this.QRcodeData, 1, val);
    },
    // 页码改变时触发
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pagingData = pageData(this.QRcodeData, val, this.pageSize);
    },
    // 选择时触发方法
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 跳转打印二维码页
    goPrinting() {
      if(this.multipleSelection.length<=0) return this.$message.error("请至少选择1条记录");
      //发射组件A的数据
      Bus.$emit("printingData", this.multipleSelection);
      this.$router.push("/printingQRcode");
/*       let printingQRcode = this.$router.resolve({
        name: "/printingQRcode",
      });
      window.open(printingQRcode.href, "_blank"); */
    },
  },
  watch: {
    QRcodeData: function () {
      this.pagingData = pageData(this.QRcodeData, 1, this.pageSize);
    },
  },
};
</script>

<style lang="css" scoped>

</style>