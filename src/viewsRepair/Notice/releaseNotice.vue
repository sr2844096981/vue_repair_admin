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
        <el-upload
          class="upload-demo"
          drag
          action="http://localhost:8084/magicCampus/addAnnImageServer.do"
          multiple
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload>
        <div class="image-wrap">
          <img class="image" ref="preview-image" :src="previewImage" alt="图片预览"/>
        </div>
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
import { ReleaseNotice } from "@/request/apisRepair/notice";
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
        aspectRatio: 1,
        // 移动画布
        dragMove: "move",
      })
    },
    // 上传图片文件方法
    handleAvatarSuccess(res, file) {
      console.log(res);
      this.noticeForm.image = res.data.fileName;
    },
    // 上传图片前预校验
    beforeAvatarUpload(file) {
      console.log(file);
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    preserve() {
      this.$message.success("保存成功");
    },
  },
};
</script>

<style  lang="css" scoped>

.upload-demo{
  float: left;
}
.image-wrap {
  float: right;
  height: 240px;
  width: 320px;
  margin: 0 auto;
  border-radius: 20px;
  border: 1px dotted #C0C4CC;
}

.image {
  display: block;
  /* This rule is very important, please don't ignore this */
  max-width: 100%;
}
</style>