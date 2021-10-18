<template>
  <div>
    <el-card shadow="never" class="box-card">
      <img @load="deaw()" src="../assets/sina.jpg" id="bg" ref="bgimg" alt="" />
      <div class="sign f-l">
        <canvas
          id="canvas"
          width="600"
          height="400"
          @mousedown="canvasDown($event)"
          @mousemove="canvasMove($event)"
          @mouseup="canvasUp($event)"
          @mouseleave="canvasLeave($event)"
          ref="canvas"
          >抱歉，您的浏览器不支持canvas元素
        </canvas>
      </div>
      <div class="setcanvas">
        <el-form ref="form" label-width="80px">
          <el-form-item label="设置颜色">
            <el-color-picker
              v-model="color"
              show-alpha
              :predefine="predefineColors"
              @active-change="setColor"
            >
            </el-color-picker>
          </el-form-item>
          <el-form-item label="设置粗细">
            <el-slider
              v-model="valueWidth"
              :min="1"
              :max="50" 
              style="width:200px"
              @change="setWidth"
            ></el-slider>
          </el-form-item>
          <el-form-item>
          <el-button @click="clear">清空</el-button>
          <el-button type="primary" @click="sign">提交</el-button>
        </el-form-item>
        </el-form>  
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 选中的颜色
      color: "#FDC600",
      //  预定义颜色,
      predefineColors: [
        "#ff4500",
        "#ff8c00",
        "#ffd700",
        "#90ee90",
        "#00ced1",
        "#1e90ff",
        "#c71585",
        "rgba(255, 69, 0, 0.68)",
        "rgb(255, 120, 0)",
        "hsv(51, 100, 98)",
        "hsva(120, 40, 94, 0.5)",
        "hsl(181, 100%, 37%)",
        "hsla(209, 100%, 56%, 0.73)",
        "#c7158577",
      ],
      // 线条粗细
      valueWidth: 12,
    };
  },
  mounted() {
    this.show();
  },
  methods: {
    show() {
      this.canvas = this.$refs.canvas; //指定canvas
      this.ctx = this.canvas.getContext("2d"); //设置2D渲染区域
      this.ctx.lineWidth = this.valueWidth; //设置线的宽度
      this.ctx.strokeStyle = this.color; //设置线的颜色""
      this.ctx.lineCap = "round"; //设置线的端点形状
      // console.log(this.ctx);
    },
    deaw() {
      let img = this.$refs.bgimg;
      // console.log(img);
      let pattern = this.ctx.createPattern(img, "no-repeat");
      // console.log(pattern);
      this.ctx.fillStyle = pattern;
      this.ctx.fillRect(0, 0, 600, 400);
    },
    canvasDown(e) {
      this.canvasMoveUse = true;
      const canvasX = e.clientX - e.target.offsetLeft;
      const canvasY =
        e.clientY - e.target.offsetTop + document.documentElement.scrollTop;
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
        canvasY = e.clientY - t.offsetTop + document.documentElement.scrollTop;
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
      this.ctx.lineWidth = this.valueWidth; //设置线的宽度
      this.ctx.strokeStyle = this.color; //设置线的颜色
      this.ctx.lineCap = "round"; //设置线的端点形状
      this.ctx.lineJoin = "round"; //设置线交合形状
    },
    sign() {
      // 生成base64图片
      console.log(this.canvas.toDataURL());
      // base64转png
      let file = this.canvas.toDataURL(); // 把整个base64给file
      // let name = filename + ".png"; // 定义文件名字（例如：cober.png）
      var type = "image/png"; // 定义图片类型（canvas转的图片一般都是png，也可以指定其他类型）
      let conversions = this.base64ToBlob(file, type); // 调用base64转图片方法
      console.log(conversions);
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
    // 选择颜色
    setColor(e) {
      // console.log(e);
      this.ctx.strokeStyle = e; //设置线的颜色"#FDC600"
    },
    // 设置粗细
    setWidth(e) {
      //  console.log(e);
      this.ctx.lineWidth = e; //设置线的宽度
    },
  },
};
</script>

<style lang="css" scoped>
.setcanvas{
  margin-top:30px;width:500px;float:right
}
#canvas {
  border: 2px solid #409EFF;
}

#bg {
  display: none;
}
</style>
