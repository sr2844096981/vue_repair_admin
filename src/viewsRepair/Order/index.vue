<template>
  <div>
    <div class="page-header">
      <i class="el-icon-s-order"></i>
      <span>维修订单</span>
    </div>

    <el-card shadow="never">
      <!-- 筛选 -->
      请选择要查询的订单状态：
      <el-select
        v-model="valueStates"
        clearable
        @change="queryOrder"
        placeholder="请选择"
      >
        <el-option
          v-for="item in optionsStates"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <!-- 检索 手机号-->
      <el-input
        placeholder="手机号检索"
        @change="search"
        @clear="getAllOrders"
        v-model="inputTel"
        clearable
        style="width: 220px; margin: 30px"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="search"
        ></el-button>
      </el-input>
      <!-- 检索 日期 -->
      <el-date-picker
      v-model="date"
      type="date"
      value-format="yyyy-MM-dd"
      @change="changeDate"
      placeholder="选择日期">
    </el-date-picker>
         
      <!-- 导出 -->
      <el-button class="exportData-btn" type="danger" @click="exportData"
        >导出excel</el-button
      >
      <!-- 表格 -->
      <TableData
        :ordersData="ordersData"
        :handleDetails="handleDetails"
        :handleOperation="handleOperation"
      />
    </el-card>

    <!-- 派工对话框 -->
    <Dispatch
      :dialogVisibleDistribution="dialogVisibleDistribution"
      :unitData="unitData"
      :detailsData="detailsData"
      :getAllOrders="getAllOrders"
      @closeDialog="closeDialog"
    />
  </div>
</template>
<script src="./indexJs.js">
</script>

<style lang="css" scoped>
.el-tabs__content {
  margin-top: 30px;
}

.el-pagination {
  margin-top: 30px;
}

.send-out {
  margin: 10px;
  float: right;
  color: #0000ee;
}

.el-select {
  margin-bottom: 20px;
}

.exportData-btn {
  float: right;
  margin-top: 30px;
}
</style>