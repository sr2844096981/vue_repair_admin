<template>
  <div>
    <el-card class="memo" shadow="never">
      <h2>备忘录</h2>
      <br />
      <el-tag
        :key="tag"
        v-for="tag in dynamicTags"
        closable
        :disable-transitions="false"
        @close="handleClose(tag)"
      >
        {{ tag }}
      </el-tag>
      <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="inputValue"
        ref="saveTagInput"
        size="small"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
      >
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput"
        >+ New Tag</el-button
      >
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dynamicTags: ["吃饭", "睡觉"],
      inputVisible: false,
      inputValue: "",
    };
  },
  beforeCreate() {},
  mounted() {
    if (window.localStorage.getItem("memoInfo")) {
      this.dynamicTags = window.localStorage.getItem("memoInfo").split("&");
    }
  },
  methods: {
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      console.log(this.dynamicTags.length <= 0);
      if (this.dynamicTags.length <= 0) {
        window.localStorage.removeItem("memoInfo");
      } else {
        window.localStorage.setItem("memoInfo", this.dynamicTags.join("&"));
      }
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
        window.localStorage.setItem("memoInfo", this.dynamicTags.join("&"));
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
  },
};
</script>

<style lang="css" scoped>
.memo {
  height: 220px;
}

/* tag标签 */
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>