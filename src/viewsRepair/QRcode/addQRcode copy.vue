<template>
  <div>
    <el-card shadow="never">
      <el-form ref="formQRinfo" label-width="80px">
        <el-form-item label="区域">
          <el-input v-model="formQRinfo.area"></el-input>
        </el-form-item>
        <el-form-item label="位置">
          <el-input v-model="formQRinfo.address"></el-input>
        </el-form-item>
        <el-form-item label="设备">
          <el-input v-model="formQRinfo.project"></el-input>
        </el-form-item>
        <el-form-item label="设备编号">
          <el-input
            v-model="formQRinfo.deviceId"
            :disabled="status == 'update' ? true : false"
          ></el-input>
        </el-form-item>
        <el-form-item label="负责人">
          <el-input v-model="formQRinfo.worker"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            v-if="status === 'add'"
            @click="onEstablish"
            >创建二维码</el-button
          >
          <el-button type="primary" v-else @click="updateDeviceInfo"
            >修改二维码</el-button
          >
          <el-button type="primary" v-if="QRcodeUrl !== ''" @click="onSee"
            >查看二维码</el-button
          >
          <el-button @click="goBack">返 回</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 查看二维码 -->
    <el-dialog title="查看二维码" :visible.sync="dialogVisible" width="650px">
      <iframe
        :src="QRcodeUrl"
        width="100%"
        height="400px"
        scrolling="yes"
        frameborder="0"
      ></iframe>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onBlank">新标签页打开</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

// api
import { AddDevice, UpdateDeviceInfo } from "@/request/apisRepair/qrcode";
export default {
  data() {
    return {
      formQRinfo: {
        area: "一号教学楼",
        address: "411教室",
        project: "投影仪",
        worker: "未知单位",
        deviceId: "",
        codeUrl: "",
      },
      QRcodeUrl: "",
      // 查看二维码弹窗
      dialogVisible: false,
      // 状态 添加or修改
      status: "add",
    };
  },
  mounted() {
    if (this.$route.params.id !== "add") {
      this.formQRinfo.deviceId = this.$route.params.id;
      this.status = "update";
    }

  },
  methods: {
    // 查看二维码
    onSee() {
      this.dialogVisible = true;
    },
    // 创建二维码
    onEstablish() {
      let projectInfo = JSON.stringify(this.formQRinfo);
      this.QRcodeUrl =
        "https://cli.im/api/qrcode/code?text=" +
        projectInfo +
        "&&mhid=tUuVXQi4zMohMHYtLNBdOKw";
      this.formQRinfo.codeUrl =
        "https://cli.im/api/qrcode/code?text=" +
        projectInfo +
        "&&mhid=tUuVXQi4zMohMHYtLNBdOKw";


       
      AddDevice(this.formQRinfo).then((res) => {
        if (res.data.code !== 200) return this.$message.error("添加数据失败");
        this.$message.success("添加数据成功");
      });
    },
    // 新标签页打开二维码
    onBlank() {
      window.open(this.QRcodeUrl, "_blank");
    },
    // 修改信息
    updateDeviceInfo() {
      let projectInfo = JSON.stringify(this.formQRinfo);
      this.QRcodeUrl =
        "https://cli.im/api/qrcode/code?text=" +
        projectInfo +
        "&&mhid=tUuVXQi4zMohMHYtLNBdOKw";
      this.formQRinfo.codeUrl =
        "https://cli.im/api/qrcode/code?text=" +
        projectInfo +
        "&&mhid=tUuVXQi4zMohMHYtLNBdOKw";
      UpdateDeviceInfo(this.formQRinfo).then((res) => {
        console.log(res);
        if (res.data.code !== 200) return this.$message.error("修改数据失败");
        this.$message.success("修改数据成功");
      });
    },
    // 返回上一页
    goBack() {
      this.$router.go(-1); //返回上一层
    },
  },
};
</script>

<style>
</style>