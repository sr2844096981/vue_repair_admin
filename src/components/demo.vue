<template>
  <div>
    
<br>
      <el-upload
      class="avatar-uploader"
      action="/api/magicCampus/postAdminUpload"
      name="fileName"
      :data="form"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
      <!-- name="fileName" -->

<!-- http://192.168.43.58:8080/api/magicCampus/postUploadInfo -->
<!-- https://jsonplaceholder.typicode.com/posts/ -->
<!-- <el-button @click="upload">提交</el-button> -->
  </div>
</template>

<script>
export default {
  data() {
      return {
        imageUrl: '',
        emilcontent:'###data内容###',
        form:{
          id: 5
        }
      };
    },
    methods: {
      
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        console.log(file);
      },
      beforeAvatarUpload(file) {
        console.log(file);
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
/*       upload(file){
        console.log(file);
      } */
      async upload(file) {
        console.log(file);
        let fd = new FormData();
         fd.append('fileName',file);//传文件
         let {data:res} = await this.$http.post('/api/magicCampus/postUploadInfo',file)
         console.log(res);

      }
    }



    
  
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
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
