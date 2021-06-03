<template>
  <div>
    <el-table :data="tableData" border>
      <!-- 索引 -->
      <el-table-column type="index"></el-table-column>

      <!--回调-->
      <el-table-column
        v-if="item.type === 'function'"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
      >
        <template slot-scope="scope">
          <span
            v-html="item.callback && item.callback(scope.row, item.prop)"
          ></span>
        </template>
      </el-table-column>
      <!--插槽slot-->
      <el-table-column
        v-else-if="item.type === 'slot'"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
      >
        <template slot-scope="scope">
          <slot :name="item.slotName" :data="scope.row"></slot>
        </template>
      </el-table-column>
      <!-- 文本渲染 -->
      <el-table-column
        v-for="item in config.thead"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { GetTableData } from "@/request/common";
export default {
  name: "TableComponent",
  data() {
    return {
      tableData: [],
    };
  },
  props: {
    config: {
      type: Object,
      default: () => {},
    },
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      let requestData = {
        url: this.config.url,
        //   data:{}
      };
      GetTableData(requestData).then((res) => {
        if (res.data.code !== 200) return this.$message.error("获取数据失败");
        this.tableData = res.data.data;
      });
    },
  },
};
</script>

<style>
</style>