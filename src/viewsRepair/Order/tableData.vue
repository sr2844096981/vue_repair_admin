<template>
  <div>
    <el-table :data="ordersData" border style="width: 100%">
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
  </div>
</template>

<script>
export default {
  data() {
    return {};
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
  mounted() {
    console.log(this.ordersData);
  },
  methods: {
  },
};
</script>  

<style>
</style>