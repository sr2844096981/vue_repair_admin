<template>
  <div>
    <div class="page-header">
      <i class="el-icon-s-order"></i>
      <span>维修订单</span>
    </div>
    <el-card shadow="never">
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
      <!-- 表格 -->
      <TableData
        :ordersData="ordersData"
        :handleDetails="handleDetails"
        :handleOperation="handleOperation"
      />
    </el-card>
    <!-- 订单详情对话框 -->
    <el-dialog title="详情" :visible.sync="dialogVisibleDetails" width="50%">
      <el-form :model="detailsData" label-width="80px">
        <el-form-item label="订单编号">
          <el-input v-model="detailsData.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="用户编号">
          <el-input v-model="detailsData.s_id" disabled></el-input>
        </el-form-item>
        <el-form-item label="报修区域">
          <el-input v-model="detailsData.repairArea" disabled></el-input>
        </el-form-item>
        <el-form-item label="报修项目">
          <el-input v-model="detailsData.repairProject" disabled></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="detailsData.phone" disabled></el-input>
        </el-form-item>
        <el-form-item label="报修日期">
          <el-input v-model="detailsData.date" disabled></el-input>
        </el-form-item>
        <el-form-item label="预约时间">
          <el-input v-model="detailsData.time" disabled></el-input>
        </el-form-item>
        <el-form-item label="报修内容">
          <el-input v-model="detailsData.content" disabled></el-input>
        </el-form-item>
        <el-form-item label="报修图片">
          <img style="width: 150px" :src="detailsData.image" alt="" srcset="" />
        </el-form-item>
        <el-form-item label="用户评价">
          <el-input v-model="detailsData.description" disabled></el-input>
        </el-form-item>
        <el-form-item label="评价分数">
          <el-rate
            v-model="detailsData.appraise"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value} 分"
          >
          </el-rate>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleDetails = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisibleDetails = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 派工对话框 -->
    <el-dialog
      title="派工"
      :visible.sync="dialogVisibleDistribution"
      width="70%"
    >
      <el-select
        v-model="valueWorkType"
        @change="queryStaff"
        placeholder="请选择工种"
      >
        <el-option
          v-for="item in optionsWorkType"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <!-- 表格模块 -->
      <el-table :data="staffData" border style="width: 100%">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="id" label="编号" width="80"></el-table-column>
        <el-table-column prop="name" label="姓名" width="80"> </el-table-column>
        <el-table-column prop="phone" label="电话"> </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column prop="status" label="状态" width="100">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <a
              class="send-out"
              :href="emailInfo"
              @click="sendOut(scope.row)"
              rel="nofollow"
              >向该受理人发送详情邮件</a
            >
          </template>
        </el-table-column>
      </el-table>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleDistribution = false">关 闭</el-button>
      </span>
    </el-dialog>
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
</style>