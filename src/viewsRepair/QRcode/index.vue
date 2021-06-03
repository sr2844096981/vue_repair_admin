<template>
  <div>
    <el-card shadow="never">
      <el-button type="success" @click="goAddQRcode">添加二维码</el-button>

      <!-- 表格模块 -->
      <el-table :data="QRcodeData" border style="width: 100%">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="deviceId" label="编号" width="80"></el-table-column>
        <el-table-column prop="area" label="区域" width="100">
        </el-table-column>
        <el-table-column prop="project" label="项目" width="100">
        </el-table-column>
        <el-table-column prop="address" label="位置"> </el-table-column>
        <el-table-column prop="worker" label="负责单位"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleUpdate(scope.$index, scope.row)">修改</el-button>
            
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
// api
import { GetAllDevice,DeleteStaff } from "@/request/apisRepair/qrcode";
export default {
  data() {
    return {
      QRcodeData: [],
    };
  },
  mounted() {
    this.getAllDevice()
  },
  methods: {
    //   跳转添加设备二维码
    goAddQRcode() {
      let id = "add"
      this.$router.push(`/addQRcode/${id}`);
    },
    // 获取全部二维码记录
    getAllDevice() {
      GetAllDevice().then((res) => {
        // console.log(res);
        this.QRcodeData = res.data.data
      });
    },
    // 删除二维码记录
    handleDelete(index,row){
      DeleteStaff(row.deviceId).then(res=>{
        // console.log(res);
          if (res.data.code !== 200) return this.$message.error("删除失败");
          this.$message.success("删除成功");
          this.getAllDevice()
      })
    },
    //修改记录
     handleUpdate(index,row){
       this.$router.push({
        path: `/addQRcode/${row.deviceId}`
      })
     }
  },
};
</script>

<style>
</style>