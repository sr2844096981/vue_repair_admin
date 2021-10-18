<template>
  <div>
    <el-card shadow="never">
      <el-button type="success" @click="goAddQRcode">添加设备二维码</el-button>
      <el-input
        placeholder="请输入设备名"
        prefix-icon="el-icon-search"
        v-model="searchKey"
        clearable
        style="display: inline-block; width: 180px; margin: 30px"
        @change="search"
        @clear="getAllDevice"
      >
      </el-input>
      <el-button
        type="warning"
        @click="goPrinting"
        style="float: right; margin: 30px"
        >批量下载 / 打印二维码</el-button
      >

      <!-- 表格模块 -->
      <el-table
        :data="pagingData"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
        @expand-change="handleExpandChange"
      >
        <!-- 展开行 -->
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="编号">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="区域">
                <span>{{ props.row.area }}</span>
              </el-form-item>
              <el-form-item label="设备">
                <span>{{ props.row.project }}</span>
              </el-form-item>
              <el-form-item label="位置">
                <span>{{ props.row.address }}</span>
              </el-form-item>
              <el-form-item label="负责单位">
                <span>{{ props.row.worker }}</span>
              </el-form-item>
              <el-form-item label="二维码">
                <img :src="createCodeUrl" alt="" />
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="id" label="编号" width="80"></el-table-column>
        <el-table-column prop="area" label="区域" width="100">
        </el-table-column>
        <el-table-column prop="project" label="设备" width="100">
        </el-table-column>
        <el-table-column prop="address" label="位置"> </el-table-column>
        <el-table-column prop="worker" label="负责人"></el-table-column>
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
            <el-button
              size="mini"
              type="warning"
              @click="handleDown(scope.$index, scope.row)"
              >下载二维码</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        ref="pagination"
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

      <div style="display: none" id="qrcode" ref="qrcode"></div>
      <div id="test" ref="test"></div>
    </el-card>
  </div>
</template>

<script>
// 引入分页
import { pageData } from "@/utils/Pagination";
// 引入生成二维码
import { CreateQrcode } from "@/utils/qrcode";
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
      // 生成的二维码url
      createCodeUrl: "",
      // 兄弟组件传值
      codeNodeArr:null
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
      if ((this.$refs.pagination.$el.style.display = "none")) {
        this.$refs.pagination.$el.style.display = "";
      }
      GetAllDevice().then((res) => {
        this.QRcodeData = res.data.data;
      });
    },
    // 展开行
    handleExpandChange(row, expandedRows) {
      let {
        id: deviceId,
        address,
        project: repairProject,
        area: repairArea,
        worker,
      } = row;
      let projectInfo = {
        deviceId,
        address,
        repairProject,
        repairArea,
        worker,
      };
      // console.log(projectInfo);
      CreateQrcode(this.$refs.qrcode, JSON.stringify(projectInfo), 150);
      setTimeout(() => {
        this.createCodeUrl = this.$refs.qrcode.querySelector("img").src;
      }, 500);
    },
    // 下载二维码
    handleDown(index, row) {
      let {
        id: deviceId,
        address,
        project: repairProject,
        area: repairArea,
        worker,
      } = row;
      let projectInfo = {
        deviceId,
        address,
        repairProject,
        repairArea,
        worker,
      };
      // console.log(projectInfo);
      CreateQrcode(this.$refs.qrcode, JSON.stringify(projectInfo), 150);
      setTimeout(() => {
        this.createCodeUrl = this.$refs.qrcode.querySelector("img").src;
        // console.log(this.$refs.qrcode.querySelector("img").src);
        let link = document.createElement("a");
        link.href = this.createCodeUrl;
        link.download = projectInfo.deviceId + "-设备二维码.png";
        link.click();
      }, 500);
    },
    // 删除二维码记录
    handleDelete(index, row) {
      DeleteStaff(row.id).then((res) => {
        // console.log(res);
        if (res.data.code !== 200) return this.$message.error("删除失败");
        this.$message.success("删除成功");
        this.getAllDevice();
      });
    },
    //修改记录
    handleUpdate(index, row) {
      this.$router.push({
        path: `/addQRcode/${row.id}`,
      });
    },
    // 搜索
    search() {
      this.pagingData = this.QRcodeData.filter((item) => {
        // return item.project === this.searchKey
        // 字符串查找，如果返回结果不等于-1，说明可以查到
        return item.project.indexOf(this.searchKey) != -1;
      });
      // 隐藏分页器
      this.$refs.pagination.$el.style.display = "none";
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
      console.log(val);
    },
    // 跳转打印二维码页
    goPrinting() {
      if (this.multipleSelection.length <= 0)
        return this.$message.error("请至少选择1条记录"); 
      this.codeNodeArr = this.multipleSelection.map((item) => {
        console.log(item);
        CreateQrcode(this.$refs.qrcode, JSON.stringify(item), 150);
        return this.$refs.qrcode.querySelector("img");
        // console.log(this.$refs.qrcode.querySelector("img"));
      });
      console.log(this.codeNodeArr);
      this.$router.push("/printingQRcode");
    },
  },
  beforeDestroy() {
      //发射组件A的数据
      Bus.$emit("printingData", this.codeNodeArr);
    
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