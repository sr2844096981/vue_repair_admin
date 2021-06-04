<template>
  <div>
    <el-dialog
      title="修改头像"
      width="400px"
      :show-close="false"
      :visible.sync="ChangeAvataVisible"
    >
      <div class="image-wrap" @click="$refs.file.click()">
        <img class="image" ref="preview-image" :src="previewImage" alt="点击选择图片" />
      </div>
      <input type="file" ref="file" @change="onFileChange" hidden />
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
// api
import { ChangeAvatar } from "@/request/apisRepair/index";
// 引入裁切图片相关
// import 'cropperjs/dist/cropper.css';
// import Cropper from 'cropperjs';

// const image = this.$refs["preview-image"];
// const cropper = new Cropper(image, {
//   aspectRatio: 1,
//   crop(event) {
//     console.log(event.detail.x);
//     console.log(event.detail.y);
//     console.log(event.detail.width);
//     console.log(event.detail.height);
//     console.log(event.detail.rotate);
//     console.log(event.detail.scaleX);
//     console.log(event.detail.scaleY);
//   },
// });


export default {
  props: ["ChangeAvataVisible"],
  data() {
    return {
      // 预览图片
      previewImage:"@/assets/logo.png",
      imageUrl: "",
      changeAvatarForm: {
        id: JSON.parse(localStorage.getItem("userInfo")).id,
        fileName: "",
      },
    };
  },
  mounted() {},
  methods: {
    // 选择图片出发事件
    onFileChange(){
      const file = this.$refs.file
      console.log(file.files[0]);
    },
    // 修改头像方法
    upload() {
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
.image-wrap {
  height: 200px;
  width: 200px;
  margin: 0 auto;
  border: 1px solid #999;
}

.image{
  display: block;
  /* This rule is very important, please don't ignore this */
  max-width: 100%;
}
</style>