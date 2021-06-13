<template>
  <div>
    <div class="topbtn noprint">
      <el-button type="danger" @click="$router.back(-1)">返 回</el-button>
      <el-button type="primary" @click="printing">打 印</el-button>
      <el-button type="primary" @click="printing">下载 PDF</el-button>
      打印布局 :
      <el-select v-model="spanValue" placeholder="请选择">
        <el-option
          v-for="item in optionsLayout"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      二维码尺寸 :
      <el-select v-model="QRcodeSize" placeholder="请选择" @change="changeSize">
        <el-option
          v-for="item in optionsSize"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <el-divider class="noprint">打印预览</el-divider>
    <!-- <el-card > -->
    <el-col :span="spanValue"
      ><img
        src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
        class="image"
      />
      <!-- 
            AC6#312001 设备编号
            AC  设备类别代号
            6#312   设备所在的主项（建筑物/车间/工段）编号
            001 相同设备的编号
         -->
      <p class="number">AC6#312001</p>
    </el-col>
    <el-col :span="spanValue"
      ><img
        src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
        class="image"
      />
      <p class="number">AC6#312001</p></el-col
    >
    <el-col :span="spanValue"
      ><img
        src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
        class="image"
      />
      <p class="number">AC6#312001</p></el-col
    >
    <el-col :span="spanValue"
      ><img
        src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
        class="image"
      />
      <p class="number">AC6#312001</p></el-col
    >
    <el-col :span="spanValue"
      ><img
        src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
        class="image"
      />
      <p class="number">AC6#312001</p></el-col
    >
    <el-col :span="spanValue"
      ><img
        src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
        class="image"
      />
      <p class="number">AC6#312001</p></el-col
    >
    <!-- </el-card> -->
  </div>
</template>

<script>
// 引入公共的bug，来做为中间传达的工具
import Bus from "@/utils/bus.js";
export default {
  data() {
    return {
      printingData: [],
      //   布局下拉列表选项
      optionsLayout: [
        {
          value: 24,
          label: "每行1列",
        },
        {
          value: 12,
          label: "每行2列",
        },
        {
          value: 8,
          label: "每行3列",
        },
        {
          value: 6,
          label: "每行4列",
        },
        {
          value: 4,
          label: "每行6列",
        },
        {
          value: 3,
          label: "每行8列",
        },
      ],
      // el-col中:span 的值
      spanValue: 6,
      //   尺寸下拉列表选项
      optionsSize: [
        {
          value: 100,
          label: "100*100 像素",
        },
        {
          value: 200,
          label: "200*200 像素",
        },
        {
          value: 300,
          label: "300*300 像素",
        },
        {
          value: 500,
          label: "500*500 像素",
        },
        {
          value: 800,
          label: "800*800 像素",
        },
      ],
      //   二维码大小
      QRcodeSize: 200,
    };
  },
  created() {
    console.log(this.printingData);
    // 用$on事件来接收参数
    Bus.$on("printingData", (data) => {
      // 接收组件A传过来的数据
      this.printingData = data;
      console.log(data);
    });
  },
  methods: {
    //   打印 / 下载PDF
    printing() {
      window.print();
    },
    // 修改二维码尺寸
    changeSize() {
      let img = document.querySelectorAll(".image");
      /* for (let i = 0; i < img.length; i++) {
        img[i].style.width = this.QRcodeSize + "px";
      } */
      img.forEach(currentValue => {
          currentValue.style.width = this.QRcodeSize + "px";
      });
    },
  },
};
</script>

<style lang="css" scoped>
.topbtn {
  background-color: #f0f5f5;
  padding: 30px 80px;
}

.topbtn .el-button {
  margin-right: 30px;
}

.image {
  display: block;
  margin: 0 auto;
}

.number {
  text-align: center;
  margin: 20px 0;
}

.el-divider {
  margin: 50px 0;
}
.el-select{
    margin-right: 30px;
    margin-left: 5px;
}
@media print {
  .noprint {
    display: none;
    color: green;
  }
}
</style>