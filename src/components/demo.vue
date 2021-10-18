<template>
  <div>
    <el-card>
      <!-- 输入框 -->
      <el-input
        placeholder="请输入内容"
        :value="inputValue"
        @input="handleInputValue"
      >
        <el-button slot="append" @click="addItemToList">添加</el-button>
      </el-input>
      <!-- 列表 -->
      <el-table
        :data="listInfo"
        :show-header="false"
        style="width: 100%"
        >
        <el-table-column prop="info" label="内容"> </el-table-column>
        <el-table-column label="是否完成" width="100">
          <template slot-scope="scope">
            <el-tag size="medium" v-if="scope.row.done" type="success"
              >已完成</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-link type="primary" @click="removeItem(scope.row.id)"
              >删除
            </el-link>
            <el-link
              type="danger"
              v-if="!scope.row.done"
              @click="finishItem(scope.row.id)"
            >
              完成</el-link
            >
          </template>
        </el-table-column>
      </el-table>
      <p>{{ unDoneLength }}条未完成</p>
      <el-button @click="clearFinish">清除已完成</el-button>
      <el-radio-group v-model="tabPosition" @change="changeTab" style="margin-bottom: 30px">
        <el-radio-button label="all">全部</el-radio-button>
        <el-radio-button label="finish">已完成</el-radio-button>
        <el-radio-button label="unfinish">未完成</el-radio-button>
      </el-radio-group>
    </el-card>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      tabPosition:"all"
    };
  },
  created() {
    this.$store.dispatch("getList");
  },
  computed: {
    ...mapState([ "inputValue"]),
    ...mapGetters(["unDoneLength","listInfo"]),
  },
  methods: {
    // 监听输入框内容
    handleInputValue(e) {
      this.$store.commit("setInputValue", e);
    },
    // 向列表中添加事项
    addItemToList() {
      // .trim() 去除字符串首尾空格
      if (this.inputValue.trim().length <= 0)
        return this.$message.warning("文本框内容不能为空！");
      this.$store.commit("addItem");
    },
    // 根据id删除事项
    removeItem(id) {
      this.$store.commit("removeItem", id);
    },
    // 完成事项
    finishItem(id) {
      this.$store.commit("finishItem", id);
    },
    // 清除已完成
    clearFinish() {
      this.$store.commit("clearFinish");
    },
    // 切换Tab 
    changeTab() {
      this.$store.commit("changeTab",this.tabPosition);
    },
  },
};
</script>

<style lang="css" scoped>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>