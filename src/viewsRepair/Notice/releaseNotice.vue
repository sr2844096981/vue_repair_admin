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
          action="http://localhost:8084/magiccampus/addAnnImageServer"
          multiple
          :on-success="handleAvatarSuccess"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="release">立即发布</el-button>
        <el-button @click="saveDraft">保存草稿</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { ReleaseNotice } from "@/request/apisRepair/notice";

export default {
  data() {
    return {
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
    // 上传图片文件方法
    handleAvatarSuccess(res, file) {
      // console.log(res);
      this.noticeForm.image = res.data.fileName;
    },
    // 上传图片前预校验
    /* beforeAvatarUpload(file) {
      console.log(file);
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }, */
    preserve() {
      this.$message.success("保存成功");
    },
  },
};
</script>

<style>
</style>