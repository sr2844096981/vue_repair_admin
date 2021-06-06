<template>
  <div>
    <el-dialog
      title="修改头像"
      width="400px"
      :show-close="false"
      :visible.sync="ChangeAvataVisible"
      @closed="onDialogClosed"
    >
      <div class="image-wrap">
        <img class="image" ref="preview-image" :src="previewImage" />
      </div>
      <input type="file" ref="file" @change="onFileChange" hidden />
      <div slot="footer" class="dialog-footer">
        <el-button type="success" @click="$refs.file.click()"
          >选择图片</el-button
        >
        <!-- <el-button @click="yuantu">原图上传测试</el-button> -->
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="upload" :loading="loading"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 引入公共的bug，来做为中间传达的工具
import Bus from "@/utils/bus.js";
// api
import { ChangeAvatar, UpdateAvatarToServer } from "@/request/apisRepair/index";
// 引入裁切图片相关
import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";

export default {
  props: ["ChangeAvataVisible"],
  data() {
    return {
      // 预览图片
      previewImage: "",
      // 裁切器实例
      cropper: null,
      // 确定加载动画
      loading: false,
      imageUrl: "",
      changeAvatarForm: {
        id: JSON.parse(localStorage.getItem("userInfo")).id,
        fileName: "",
      },
    };
  },
  mounted() {},
  methods: {
    // 裁切器设置
    setCropper() {
      // 初始化裁切器
      const image = this.$refs["preview-image"];
      this.cropper = new Cropper(image, {
        // 裁切比例
        aspectRatio: 1,
        // 移动画布
        dragMove: "move",
      });
    },
    // 选择图片触发事件
    onFileChange() {
      // 选择图片前，销毁裁切器
      if (this.cropper) this.cropper.destroy();
      const file = this.$refs.file;
      // console.log(file.files[0]);
      // 预览图片
      const blobData = window.URL.createObjectURL(file.files[0]);
      // console.log(blobData);
      this.previewImage = blobData;
      setTimeout(this.setCropper, 300);
    },
    // 对话框关闭时的回调
    onDialogClosed() {
      // 对话框关闭，销毁裁切器
      this.cropper.destroy();
      // 清空预览图片
      this.previewImage = "";
    },
    // 原图上传
    yuantu() {
      const file = this.$refs.file;
      console.log(file.files[0]);
      const fd = new FormData();
      fd.append("fileName", file.files[0]);
      UpdateAvatarToServer(fd).then((res) => {
        console.log(res.data);
      });
    },
    // 修改头像方法(
    upload() {
      // 加载中
      this.loading = true;
      // 将裁切后的图片上传到服务器
      this.cropper.getCroppedCanvas().toBlob((file) => {
        const fd = new FormData();
        fd.append("fileName", file, "不清楚为什么需要文件名.png");
        // console.log(fd.get("fileName"));
        UpdateAvatarToServer(fd).then((res) => {
          console.log(res.data.data.fileName);
          this.changeAvatarForm.fileName = res.data.data.fileName;
        });
      });
      setTimeout(() => {
        console.log(this.changeAvatarForm);
        ChangeAvatar(this.changeAvatarForm).then((res) => {
          console.log(res);
          if (res.data.code !== 200) return this.$message.error("修改头像失败");
          this.$message.success("修改头像成功");
          //发射组件A的数据
          Bus.$emit("circleUrl", this.changeAvatarForm.fileName);
          // 更新到 localStorage
          let userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
          userInfo.avatar = this.changeAvatarForm.fileName;
          window.localStorage.setItem("userInfo", JSON.stringify(userInfo));
          // 关闭对话框
          this.close();
          // 加载完成
          this.loading = false;
        });
      }, 500);
    },
    // 回传给父组件 关闭信息
    close() {
      this.$emit("closeChangeAvataDialog", this.ChangeAvataVisible);
    },
  },
};
</script>


<style lang="css" scoped>
.image-wrap {
  height: 300px;
  width: 300px;
  margin: 0 auto;
  border: 1px solid #999;
}

.image {
  display: block;
  /* This rule is very important, please don't ignore this */
  max-width: 100%;
}
</style>