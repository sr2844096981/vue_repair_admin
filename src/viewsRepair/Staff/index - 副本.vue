<template>
  <div>
    <el-card shadow="never">
      <el-button type="success" style="margin-bottom: 20px;" @click="dialogVisibleAdd = true"
        >添加人员</el-button
      >
      <!-- 表格模块 -->
      <el-table :data="staffData" border style="width: 100%">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="id" label="编号" width="80"></el-table-column>
        <el-table-column prop="name" label="姓名" width="100">
        </el-table-column>
        <el-table-column prop="typeWork" label="工种" width="100">
        </el-table-column>
        <el-table-column prop="phone" label="电话"> </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column prop="status" label="状态" width="100">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="showdialogVisibleAdd(scope.$index, scope.row)"
              >修改</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加员工对话框 -->
    <el-dialog
      title="添加"
      :visible.sync="dialogVisibleAdd"
      width="50%"
      :before-close="handleUpdate"
    >
      <el-form ref="formStaffInfo" :model="formStaffInfo" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="formStaffInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="formStaffInfo.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="formStaffInfo.email"></el-input>
        </el-form-item>
        <el-form-item label="工种">
          <el-select v-model="formStaffInfo.typeWork" placeholder="请选择工种">
            <el-option label="木工" value="mugong"></el-option>
            <el-option label="电工" value="diangong"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="addStaff">添 加</el-button>
      </span>
    </el-dialog>

    <!-- 修改员工对话框 -->
    <el-dialog
      title="修改"
      :visible.sync="dialogVisibleAdd"
      width="50%"
      :before-close="handleUpdate"
    >
      <el-form ref="formStaffInfo" :model="formStaffInfo" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="formStaffInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="formStaffInfo.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="formStaffInfo.email"></el-input>
        </el-form-item>
        <el-form-item label="工种">
          <el-select v-model="formStaffInfo.typeWork" placeholder="请选择工种">
            <el-option label="木工" value="木工"></el-option>
            <el-option label="电工" value="电工"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="handleUpdate">修 改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  GetAllStaff,
  AddStaff,
  UpdateStaffInfo,
  DeleteStaff,
} from "@/request/apisRepair/staff";
export default {
  data() {
    return {
      staffData: [],
      //   控制添加员工对话框
      dialogVisibleAdd: false,
      // 员工信息表单
      formStaffInfo: {},
    };
  },
  mounted() {
    this.getAllStaff();
  },
  methods: {
    // 获取全部维修人员数据
    getAllStaff() {
      GetAllStaff().then((res) => {
        if (res.data.code !== 200) return this.$message.error("获取数据失败");
        this.staffData = res.data.data;
      });
    },
    // 添加员工
    addStaff() {
      AddStaff(this.formStaffInfo).then((res) => {
        if (res.data.code !== 200) return this.$message.error("添加数据失败");
        this.$message.success("添加数据成功");
        this.dialogVisibleAdd = false;
        this.getAllStaff();
      });
    },
    // 展示更改员工信息对话框
    showdialogVisibleAdd(index, row) {
      this.formStaffInfo = row;
      this.dialogVisibleAdd = true;
    },
    // 修改维修员工信息
    handleUpdate(index, row) {
      UpdateStaffInfo(this.formStaffInfo).then((res) => {
        if (res.data.code !== 200) return this.$message.error("添加数据失败");
        this.$message.success("添加数据成功");
        this.dialogVisibleAdd = false;
        this.getAllStaff();
      });
    },
    // 删除维修员工信息
    handleDelete(index, row) {
      this.$confirm(
        "此操作将永久删除该记录, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then((res) => {
          DeleteStaff(row.id).then((res) => {
            if (res.data.code !== 200) return this.$message.error("删除数据失败");
            this.$message.success("删除数据成功");
            this.getAllStaff();
          });
        })
        .catch((res) => {
          console.log(res);
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });

    },
  },
};
</script>

<style>
</style>