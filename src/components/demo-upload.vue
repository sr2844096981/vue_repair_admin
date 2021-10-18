<template>
  <div>
    <el-upload
      list-type="picture-card"
      action="#"
      :limit="1"
      :file-list="fileList"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-change="handleChange"
      :before-upload="handleBeforeUpload"
      :class="{ disabled: fileComputed }"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import {UpdateAvatarToServer} from "@/request/apisRepair/index"
export default {
  data() {
    return {
      fileList: [
        {
          url: "https://img0.baidu.com/it/u=3202154817,1211255950&fm=26&fmt=auto&gp=0.jpg",
        },
      ],
      dialogVisible: false,
      dialogImageUrl: "",
    };
  },
  computed: {
    // 如果返回true 不显示+上传
    fileComputed() {
      return this.fileList.length === 1;
    },
  },
  methods: {
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleRemove(file, fileList) {
      //  fileList  删除后剩余的图片
      // console.log(file, fileList);
      this.dialogImageUrl = "";
      this.fileList = fileList;
    },
    handleChange(file, fileList) {
      console.log(file, fileList);
      UpdateAvatarToServer({fileName:file}).then(res=>{
        console.log(res);
      })
      this.fileList = fileList.map((item) => item);
    },
    handleBeforeUpload(file) {
      // console.log(file);
      // 检查文件类型
      const types = ["image/jpeg", "image/gif", "image/jpg", "image/png"];
      if (!types.includes(file.type)) {
        this.$message.error("图片类型只能是：" + types);
        return false;
      }
      // 检查文件大小
      const maxSize = 2 * 1024 * 1024;
      if (maxSize < file.size) {
        this.$message.error("图片大小不能超过2M");
        return false;
      }
      return true
    },
  },
};
</script>

<style lang="css" >
.disabled .el-upload--picture-card {
  display: none;
}
</style>