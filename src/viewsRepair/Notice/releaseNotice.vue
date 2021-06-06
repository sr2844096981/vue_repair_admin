<template>
  <div>
    <el-form ref="form" :model="noticeForm" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="noticeForm.title"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <el-input
          type="textarea"
          rows="9"
          v-model="noticeForm.content"
        ></el-input>
      </el-form-item>
      <el-form-item label="封面">
        <div class="image-wrap">
          <img
            class="image"
            ref="preview-image"
            :src="previewImage"
            alt="图片预览"
          />
        </div>
        <input type="file" ref="file" @change="onFileChange" hidden />
        <el-button class="closeImg" type="success" @click="$refs.file.click()"
          >选择图片</el-button
        >
        <el-button
          class="closeImg"
          type="success"
          @click="cropperSuccess"
          v-if="flag"
          >裁剪完成</el-button
        >
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="release">立即发布</el-button>
        <el-button @click="saveDraft">保存草稿</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// api
import {
  ReleaseNotice,
  AddAnnImageToServer,
} from "@/request/apisRepair/notice";
// 引入裁切图片相关
import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";
export default {
  data() {
    return {
      // 预览图片
      previewImage: "",
      // 裁切器实例
      cropper: null,
      imageUrl: "",
      form: {},
      noticeForm: {
        a_id: JSON.parse(localStorage.getItem("userInfo")).id,
        author: JSON.parse(localStorage.getItem("userInfo")).position,
        title: "",
        content: "",
        image: "",
      },
      dialogImageUrl: "",
      dialogVisible: false,
      formData: new FormData(),
      flag: false,
    };
  },
  mounted() {
    this.getDraft();
  },
  methods: {
    // 发布公告方法
    release() {
      console.log(this.noticeForm);
      ReleaseNotice(this.noticeForm).then((res) => {
        if (res.data.code !== 200) return this.$message.error("发布失败");
        this.$message.success("发布成功");
        this.noticeForm.title = "";
        this.noticeForm.content = "";
        this.noticeForm.image = "";
      });
    },
    // 保存草稿方法
    saveDraft() {
      window.localStorage.setItem(
        "noticeForm",
        JSON.stringify(this.noticeForm)
      );
      this.$message.success("保存成功");
    },
    // 获取本地草稿
    getDraft() {
      let noticeForm = JSON.parse(localStorage.getItem("noticeForm"));
      if (noticeForm) {
        this.noticeForm.title = noticeForm.title;
        this.noticeForm.content = noticeForm.content;
        this.noticeForm.image = noticeForm.image;
      }
    },
    // 裁切器设置
    setCropper() {
      // 初始化裁切器
      const image = this.$refs["preview-image"];
      this.cropper = new Cropper(image, {
        // 裁切比例
        aspectRatio: 4 / 3,
        // 移动画布
        dragMove: "move",
      });
    },
    // 选择图片触发事件
    onFileChange() {
      // 显示裁切完成按钮
      this.flag = true;
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
    // 完成裁剪
    cropperSuccess() {
      // 加载中
      // this.loading = true;
      // 将裁切后的图片上传到服务器
      this.cropper.getCroppedCanvas().toBlob((file) => {
        const fd = new FormData();
        fd.append("fileName", file, "不清楚为什么需要文件名.png");
        // console.log(fd.get("fileName"));
        AddAnnImageToServer(fd).then((res) => {
          console.log(res.data.data.fileName);
          this.noticeForm.image = res.data.data.fileName;
          this.previewImage = res.data.data.fileName;
          // 对话框关闭，销毁裁切器
          this.cropper.destroy();
        });
      });
      this.flag = false;
    },
    // 对话框关闭时的回调
    onDialogClosed() {
      // 对话框关闭，销毁裁切器
      this.cropper.destroy();
      // 清空预览图片
      this.previewImage = "";
    },
    // 上传图片前预处理
    beforeAvatarUpload(file) {
      console.log(file);
      // 校验图片大小
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) return this.$message.error("上传图片大小不能超过 2MB!");
      // 预览图片
      const nfile = this.$refs.file;
      const blobData = window.URL.createObjectURL(file);
      console.log(blobData);
      // this.previewImage = blobData;
    },
    preserve() {
      this.$message.success("保存成功");
    },
  },
};
</script>

<style  lang="css" scoped>
.closeImg {
  float: left;
  margin: 20px 0 0 20px;
}
.image-wrap {
  float: left;
  height: 240px;
  width: 320px;
  margin: 0 auto;
  border-radius: 20px;
  overflow: hidden;
  border: 1px dotted #c0c4cc;
}

.image {
  display: block;
  max-width: 100%;
}
</style>