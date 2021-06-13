<template>
  <div>
    <el-table :data="pagingData" border style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="repairArea" label="报修地址"> </el-table-column>
      <el-table-column prop="repairProject" label="报修项目"> </el-table-column>
      <el-table-column prop="date" label="预约"> </el-table-column>
      <el-table-column prop="phone" label="联系方式"> </el-table-column>
      <el-table-column prop="schedule" label="状态"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleDetails(scope.$index, scope.row)"
            >详情</el-button
          >
          <el-button
            size="mini"
            type="warning"
            v-if="scope.row.operationStatus !== ''"
            @click="handleOperation(scope.$index, scope.row)"
            >{{ scope.row.operationStatus }}</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      style="margin-top: 30px"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      background
      :page-sizes="[2, 4, 6, 8]"
      :page-size="4"
      layout="total, sizes, prev, pager, next, jumper"
      :total="ordersData.length"
    >
    </el-pagination>
  </div>
</template>

<script>
// 引入分页
import { pageData } from "@/utils/Pagination";
export default {
  data() {
    return {
      // 分页后的数组
      pagingData: [],
      //  每页显示条数
      pageSize: 4,
    };
  },
  props: {
    ordersData: {
      type: Array,
      default: () => {},
    },
    handleDetails: {
      type: Function,
      default: () => {},
    },
    handleOperation: {
      type: Function,
      default: () => {},
    },
  },
  methods: {
    // 每页条数改变时触发
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.pagingData = pageData(this.ordersData, 1, val);
    },
    // 页码改变时触发
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagingData = pageData(this.ordersData, val, this.pageSize);
    },
  },
  watch: {
    ordersData: function () {
      this.pagingData = pageData(this.ordersData, 1, this.pageSize);
    },
  },
};
</script>  

<style lang="css" scoped>
</style>