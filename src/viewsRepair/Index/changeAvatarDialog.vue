<template>
  <div>
    <el-dialog
      title="修改头像"
      :show-close="false"
      :visible.sync="ChangeAvataVisible"
    >
      <el-upload
        class="avatar-uploader"
        action="http://localhost:8084/magiccampus/updateAdminHeaderServer"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img
          v-if="changeAvatarForm.fileName"
          :src="changeAvatarForm.fileName"
          class="avatar"
        />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="upload">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 引入公共的bug，来做为中间传达的工具
import Bus from "@/utils/bus.js";
import { ChangeAvatar } from "@/request/apisRepair/index";
export default {
  props: ["ChangeAvataVisible"],
  data() {
    return {
      imageUrl: "",
      changeAvatarForm: {
        id: JSON.parse(localStorage.getItem("userInfo")).id,
        fileName: "",
      },
    };
  },
  mounted() {},
  methods: {
    // 上传图片文件成功后的回调
    handleAvatarSuccess(res, file) {
      this.changeAvatarForm.fileName = res.data.fileName;
    },
    // 上传图片前预校验
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      /*       
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      } */
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 修改头像方法
    upload() {
      ChangeAvatar(this.changeAvatarForm).then((res) => {
        console.log(res);
        if (res.data.code !== 200) return this.$message.error("修改头像失败");
        this.$message.success("修改头像成功");
        //发射组件A的数据
        Bus.$emit('circleUrl', this.changeAvatarForm.fileName) ;
        // 更新到 localStorage
        let userInfo = JSON.parse(window.localStorage.getItem("userInfo"))
        userInfo.avatar =  this.changeAvatarForm.fileName;
        window.localStorage.setItem("userInfo", JSON.stringify(userInfo));
        // 关闭对话框
        this.close();
      });
    },
    // 回传给父组件 关闭信息
    close() {
      this.$emit("closeChangeAvataDialog", this.ChangeAvataVisible);
    },
  },
};
</script>


<style lang="css" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  background-color: aliceblue;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>