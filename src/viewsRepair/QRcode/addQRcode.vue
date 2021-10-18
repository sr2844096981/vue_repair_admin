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
            v-model="formQRinfo.id"
            placeholder="只能是数字类型"
            :disabled="status == 'update' ? true : false"
          ></el-input>
        </el-form-item>
        <el-form-item label="负责人">
          <el-input v-model="formQRinfo.worker"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-if="status === 'add'" @click="commonCode"
            >创建二维码</el-button
          >
          <el-button type="primary" v-else @click="commonCode"
            >修改二维码</el-button
          >
          <el-button type="primary" v-if="QRcodeUrl !== ''" @click="onSee"
            >查看二维码</el-button
          >
          <el-button @click="goBack">返 回</el-button>
        </el-form-item>
      </el-form>
      <!-- 二维码 -->
      <el-card style="width: 190px">
        <div id="qrcode" ref="qrcode"></div>
      </el-card>
    </el-card>
    <!-- 查看二维码 -->
    <!--     <el-dialog title="查看二维码" :visible.sync="dialogVisible" width="650px">
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onBlank">新标签页打开</el-button>
      </span>
    </el-dialog> -->
  </div>
</template>

<script>
// api
import { AddDevice, UpdateDeviceInfo } from "@/request/apisRepair/qrcode";
import { AddAnnImageToServer } from "@/request/apisRepair/notice";
// 引入生成二维码
import { CreateQrcode } from "@/utils/qrcode";
// 引入将base64转Blob
import { ConvertBase64UrlToBlob } from "@/utils/convertBase64UrlToBlob";
// 引入将base64转Blob
import { UploadFile } from "@/utils/uploadFile";

export default {
  data() {
    return {
      formQRinfo: {
        area: "",
        address: "",
        project: "",
        worker: "",
        id: "",
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
      this.formQRinfo.id = this.$route.params.id;
      this.status = "update";
    }
  },
  methods: {
    // 添加 / 修改设备信息公共部分
    commonCode() {
      if (
        this.formQRinfo.area === "" ||
        this.formQRinfo.address === "" ||
        this.formQRinfo.project === "" ||
        this.formQRinfo.project === "" ||
        this.formQRinfo.worker === ""
      ) {
        return this.$message.error("所有项为必填项");
      }
      let projectInfo = JSON.stringify(this.formQRinfo);
      //清除二维码
      if (document.querySelector("#qrcode").querySelector("img")) {
        document.querySelector("#qrcode").innerHTML = "";
      }
      // 创建二维码
      CreateQrcode(this.$refs.qrcode, projectInfo, 150);

      let img = document.querySelector("#qrcode").querySelector("img");
      img.onload = () => {
        // base64转blob
        const file = ConvertBase64UrlToBlob(img.src);
        // 上传文件
        const fd = UploadFile("fileName", file, "ming.png");
        AddAnnImageToServer(fd).then((res) => {
          // console.log(res.data.data);
          this.formQRinfo.codeUrl = res.data.data.fileName;
        });
        if (this.status === "add") {
          this.onEstablish();
        } else {
          this.updateDeviceInfo();
        }
      };
    },
    // 新增设备二维码
    onEstablish() {
      AddDevice(this.formQRinfo).then((res) => {
        if (res.data.code !== 200) return this.$message.error("添加数据失败");
        this.$message.success("添加数据成功");
      });
    },
    // 修改设备二维码
    updateDeviceInfo() {
      UpdateDeviceInfo(this.formQRinfo).then((res) => {
        if (res.data.code !== 200) return this.$message.error("修改数据失败");
        this.$message.success("修改数据成功");
      });
    },
    // 查看二维码
    onSee() {
      this.dialogVisible = true;
    },
    // 新标签页打开二维码
    onBlank() {
      window.open(this.QRcodeUrl, "_blank");
    },
    // 返回上一页
    goBack() {
      this.$router.go(-1); //返回上一层
    },
  },
};
</script>

<style lang="css" >
</style>