<template>
  <div>
    <div class="box-card">
      <canvas
        id="canvas"
        width="350"
        height="200"
        @mousedown="canvasDown($event)"
        @mousemove="canvasMove($event)"
        @mouseup="canvasUp($event)"
        @mouseleave="canvasLeave($event)"
        ref="canvas"
        >抱歉，您的浏览器不支持canvas元素
      </canvas>
      <div class="setcanvas">
        <el-button @click="clear">重置</el-button>
        <el-button type="success" @click="sign">确认</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
       this.show()
  },
  created() {},
  methods: {
    show() {
      this.canvas = this.$refs.canvas; //指定canvas
      this.ctx = this.canvas.getContext("2d"); //设置2D渲染区域
      this.ctx.lineWidth = 2; //设置线的宽度
      this.ctx.strokeStyle = "#000"; //设置线的颜色""
      this.ctx.lineCap = "round"; //设置线的端点形状
      // console.log(this.ctx);
    },
    deaw() {
      this.ctx.fillStyle = "#fff";
      //   this.ctx.fillRect(0, 0, 300, 200);
    },
    canvasDown(e) {
      console.log("canvasDown",e);
      this.canvasMoveUse = true;
      const canvasX = e.clientX - e.target.offsetLeft;
      const canvasY =
        e.clientY -
        e.target.offsetTop +
        document.querySelector(".el-main").scrollTop;
      this.ctx.beginPath(); // 移动的起点
      this.ctx.moveTo(canvasX, canvasY);
    },
    canvasMove(e) {
      if (this.canvasMoveUse) {
        // 只有允许移动时调用
        const t = e.target;
        let canvasX;
        let canvasY;
        canvasX = e.clientX - t.offsetLeft;
        canvasY =
          e.clientY -
          t.offsetTop +
          document.querySelector(".el-main").scrollTop;
        this.ctx.lineTo(canvasX, canvasY);
        this.ctx.stroke();
      }
    },
    canvasUp(e) {
      this.canvasMoveUse = false;
    },
    canvasLeave(e) {
      this.canvasMoveUse = false;
    },
    // 清空画布
    clear() {
      // canvas每当高度或宽度被重设时，画布内容就会被清空
      let c = this.$refs.canvas;
      c.width = c.width;
      // 恢复原画布
      this.deaw();
      this.ctx.lineWidth = 2; //设置线的宽度
      this.ctx.strokeStyle = "#000"; //设置线的颜色
      this.ctx.lineCap = "round"; //设置线的端点形状
      this.ctx.lineJoin = "round"; //设置线交合形状
      // 子传父组件
      this.$emit("signatureURL", "");
    },
    sign() {
      // 生成base64图片
      // console.log(this.canvas.toDataURL());
      // 子传父组件
      this.$emit("signatureURL", this.canvas.toDataURL());
      // base64转png
      let file = this.canvas.toDataURL(); // 把整个base64给file
      // let name = filename + ".png"; // 定义文件名字（例如：cober.png）
      var type = "image/png"; // 定义图片类型（canvas转的图片一般都是png，也可以指定其他类型）
      let conversions = this.base64ToBlob(file, type); // 调用base64转图片方法
      // console.log(conversions);
      // conversions 就是转化之后的图片文件
    },
    //base64转图片方法
    base64ToBlob(urlData, type) {
      let arr = urlData.split(",");
      let mime = arr[0].match(/:(.*?);/)[1] || type;
      // 去掉url的头，并转化为byte
      let bytes = window.atob(arr[1]);
      // 处理异常,将ascii码小于0的转换为大于0
      let ab = new ArrayBuffer(bytes.length);
      // 生成视图（直接针对内存）：8位无符号整数，长度1个字节
      let ia = new Uint8Array(ab);
      for (let i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
      }
      return new Blob([ab], {
        type: mime,
      });
    },
  },
};
</script>

<style lang="css" scoped>
.box-card {
  width: 100%;
  height: 200px;
}

#canvas {
  border: 2px solid #409eff;
  float: left;
}

.setcanvas {
  float: left;
  margin-left: 20px;
  margin-top: 150px;
}

</style>
