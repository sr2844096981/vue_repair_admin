<template>
  <div>
    <div class="page-header">
      <i class="el-icon-s-order"></i>
      <span>维修订单</span>
    </div>
    <el-card shadow="never">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <!-- 未派工 -->
        <el-tab-pane label="未派工" name="unallocated">
          <el-table :data="ordersData" border style="width: 100%">
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="repairArea" label="报修地址">
            </el-table-column>
            <el-table-column prop="repairProject" label="报修项目">
            </el-table-column>
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
        </el-tab-pane>
        <!-- 维修完成 -->
        <el-tab-pane label="已完工" name="completed">已完工</el-tab-pane>
        <!-- 全部订单 -->
        <el-tab-pane label="全部订单" name="allOrder">
          <el-table :data="ordersData" border style="width: 100%">
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="repairArea" label="报修地址" width="180">
            </el-table-column>
            <el-table-column prop="repairProject" label="报修项目" width="120">
            </el-table-column>
            <el-table-column prop="time" label="预约时间" width="100">
            </el-table-column>
            <el-table-column prop="phone" label="联系方式" width="180">
            </el-table-column>
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
                  v-if="scope.row.schedule == '已报修'"
                  @click="handleDistribution(scope.$index, scope.row)"
                  >未派工</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <el-pagination background layout="prev, pager, next" :total="1000">
          </el-pagination>
        </el-tab-pane>
      </el-tabs>
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
        <el-table-column prop="name" label="姓名" width="80">
        </el-table-column>
        <el-table-column prop="phone" label="电话"> </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column prop="status" label="状态" width="100">
        </el-table-column>
        <el-table-column label="操作" >
          <template slot-scope="scope">
          <a class="send-out" :href="emailInfo" @click="sendOut(scope.row)" rel="nofollow"
            >向该受理人发送详情邮件</a
          >
          </template>
        </el-table-column>
      </el-table>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleDistribution=false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// api
import { GetAllOrders, AcceptancenOrder, AssignmentOrder } from "@/request/apisRepair/order";
import {  QueryStaff } from "@/request/apisRepair/staff";
// 组件
import TableData from './tableData'
export default {
  components:{TableData},
  components:{TableData},
  data() {
    return {
      activeName: "unallocated",
      ordersData: [],
      detailsData: {},
      dialogVisibleDetails: false,
      dialogVisibleDistribution: false,
      valueAcceptor: [],
      emailInfo: "javascript:void(0);",
      staffData: [],
      // 选中工种value
      valueWorkType: "",
      // 工种选择器菜单
      optionsWorkType: [
        {
          value: "木工",
          label: "木工",
        },
        {
          value: "电工",
          label: "电工",
        },
      ],
    };
  },
  mounted() {
    this.getAllOrders();
  },
  methods: {
    // 获取全部订单数据
    getAllOrders() {
      GetAllOrders().then((res) => {
        // console.log(res.data);
        if (res.data.code !== 200) return this.$message.error("获取数据失败");
        this.ordersData = res.data.data;
        this.operationStatus();
      });
    },
    // 增加操作状态属性
    operationStatus() {
      let ordersData = JSON.parse(JSON.stringify(this.ordersData));
      for (let i = 0; i < ordersData.length; i++) {
        switch (ordersData[i].schedule) {
          case "已报修":
            ordersData[i].operationStatus = "受理";
            break;
          case "已受理":
            ordersData[i].operationStatus = "派工";
            break;
          case "已派工":
            ordersData[i].operationStatus = "签到";
            break;
          case "已完工":
            ordersData[i].operationStatus = "";
            break;
        }
        this.ordersData = ordersData;
      }
    },
    // 操作对应方法
    handleOperation(index, row) {
      switch (row.operationStatus) {
        case "受理":
          this.handleAcceptancen(index, row);
          break;
        case "派工":
          this.handleDistribution(index, row);
          break;
        case "签到":
          this.handleSignIn(index, row);
          break;
      }
    },
    // 切换顶部选项卡方法
    handleClick(tab, event) {
      // console.log(tab.name, event);
      switch (tab.name) {
        // 全部订单
        case "allOrder":
          this.getAllOrders();
          break;
      }
    },
    // 点击详情方法
    handleDetails(index, row) {
      this.detailsData = this.ordersData[index];
      this.dialogVisibleDetails = true;
    },
    // 点击受理方法
    handleAcceptancen(index, row) {
      this.$confirm("确定受理?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let userInfo = JSON.parse(localStorage.getItem("userInfo"));
          const id = userInfo.id;
          const repairId = row.id;
          const name = userInfo.name;
          AcceptancenOrder(id, repairId, name).then((res) => {
            if (res.data.code !== 200) return this.$message.error("受理失败");
            this.$message.success("受理成功");
            this.getAllOrders();
          });
        })
        .catch(() => {
          this.$message.info("已取消受理");
        });
    },
    // 点击派工方法
    handleDistribution(index, row) {
      this.detailsData = this.ordersData[index];
      this.dialogVisibleDistribution = true;
    },
    // 根据工种查询员工
    queryStaff() {
      QueryStaff(this.valueWorkType).then((res) => {
        if (res.data.code !== 200) return this.$message.error("获取数据失败");
        if (res.data.data.length < 1) this.$message.info("没有符合条件的数据");
        this.staffData = res.data.data;
      });
    },
    // 发送邮件
    sendOut(row) {
      let emailAddress = row.email;
      let emailBody =
        "【报修区域 - " +
        this.detailsData.repairArea +
        "】" +
        "【报修项目 - " +
        this.detailsData.repairProject +
        "】" +
        "【报修内容 - " +
        this.detailsData.content +
        "】" +
        "【联系方式 - " +
        this.detailsData.phone +
        "】" +
        "【报修项目 - " +
        this.detailsData.repairProject +
        "】" +
        "【报修日期 - " +
        this.detailsData.date +
        "】" +
        "【预约时间 - " +
        this.detailsData.time +
        "】" +
        "【报修图片链接 - " +
        this.detailsData.image +
        "】" +
        "【订单编号 - " +
        this.detailsData.id +
        "】";

      this.emailInfo =
        "mailto:" +
        emailAddress +
        "?subject=维修订单详情&body=" +
        emailBody;
        // 派工成功请求
        AssignmentOrder(row.phone,this.detailsData.id,row.name).then(res=>{
        if (res.data.code !== 200) return this.$message.error("派工失败");
        this.getAllOrders();
      })
    },
    // 签到
    handleSignIn(index,row){
      console.log(row);
      // 派工成功请求
        // AssignmentOrder(row.phone,this.detailsData.id,row.name).then(res=>{
        // if (res.data.code !== 200) return this.$message.error("派工失败");
        // this.getAllOrders();
        // })
    }
  },
};
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

.el-select{
  margin-bottom: 20px ;
}
</style>