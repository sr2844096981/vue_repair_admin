<template>
  <div>
    <el-card shadow="never">
      <el-button
        type="success"
        style="margin-bottom: 20px"
        @click="getAllUnit"
        >添加人员</el-button
      >
      <el-button type="danger" style="margin-bottom: 20px" @click="exportData"
        >导出excel</el-button
      >
      <!-- <TableData :config="table_config" /> -->
      <!-- 表格模块 -->
      <el-table :data="pagingData" border style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="工号">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="姓名">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="部门">
                <span>{{ props.row.unit }}</span>
              </el-form-item>
              <el-form-item label="电话">
                <span>{{ props.row.phone }}</span>
              </el-form-item>
              <el-form-item label="邮箱">
                <span>{{ props.row.email }}</span>
              </el-form-item>
              <el-form-item label="状态">
                <span>{{ props.row.status }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="id" label="编号" width="80"></el-table-column>
        <el-table-column prop="name" label="姓名" width="100">
        </el-table-column>
        <el-table-column prop="unit" label="部门" width="100">
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
      <el-pagination
        style="margin-top: 30px"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        background
        :page-sizes="[2, 4, 6, 8]"
        :page-size="4"
        layout="total, sizes, prev, pager, next, jumper"
        :total="staffData.length"
      >
      </el-pagination>
    </el-card>
    <!-- 添加员工对话框 -->
    <el-dialog title="添加" :visible.sync="dialogVisibleAdd" width="50%">
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
          <el-select v-model="formStaffInfo.unit"  placeholder="请选择工种">
            <el-option v-for="item in unitData" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="addStaff">添 加</el-button>
      </span>
    </el-dialog>

    <!-- 修改员工对话框 -->
    <el-dialog title="修改" :visible.sync="dialogVisibleEdit" width="50%">
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
          <el-select v-model="formStaffInfo.unit" placeholder="请选择工种">
             <el-option v-for="item in unitData" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="handleUpdate">修 改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 引入分页
import { pageData } from "@/utils/Pagination";
// 引入分页
import { exportData } from "@/utils/exportToExcel";
// 组件
import TableData from "@/components/TableData";
// api
import {
  GetAllStaff,
  AddStaff,
  UpdateStaffInfo,
  DeleteStaff,
  GetAllUnit,
} from "@/request/apisRepair/staff";
export default {
  components: { TableData },
  data() {
    return {
      // 员工列表数据
      staffData: [],
      //   控制添加员工对话框
      dialogVisibleAdd: false,
      dialogVisibleEdit: false,
      // 员工信息表单
      formStaffInfo: {},
      // 分页后的数组
      pagingData: [],
      //  每页显示条数
      pageSize: 4,
      // 所有工种
      unitData: [],
    };
  },
  mounted() {
    this.getAllStaff();
  },

  methods: {
    // 获取全部维修人员数据
    getAllStaff() {
      GetAllStaff().then((res) => {
        console.log(res.data);
        if (res.data.code !== 200) return this.$message.error("获取数据失败");
        this.staffData = res.data.data;
      });
    },
    // 获取所有工种
    getAllUnit() {
      this.dialogVisibleAdd = true;
      GetAllUnit().then((res) => {
        console.log(res.data);
        if (res.data.code !== 200) return this.$message.error("获取数据失败");
        this.unitData = res.data.data;
      });
    },
    // 添加员工
    addStaff() {
      console.log(this.formStaffInfo);
      AddStaff(this.formStaffInfo).then((res) => {
        console.log(res);
        if (res.data.code !== 200) return this.$message.error("添加数据失败");
        this.$message.success("添加数据成功");
        this.dialogVisibleAdd = false;
        this.getAllStaff();
        console.log(this.staffData);
      });
    },
    // 展示更改员工信息对话框
    showdialogVisibleAdd(index, row) {
      this.formStaffInfo = row;
      this.dialogVisibleEdit = true;
    },
    // 修改维修员工信息
    handleUpdate(index, row) {
      UpdateStaffInfo(this.formStaffInfo).then((res) => {
        if (res.data.code !== 200) return this.$message.error("添加数据失败");
        this.$message.success("添加数据成功");
        this.dialogVisibleEdit = false;
        this.getAllStaff();
      });
    },
    // 删除维修员工信息
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then((res) => {
          DeleteStaff(row.id).then((res) => {
            if (res.data.code !== 200)
              return this.$message.error("删除数据失败");
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
    // 每页条数改变时触发
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.pagingData = pageData(this.staffData, 1, val);
    },
    // 页码改变时触发
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagingData = pageData(this.staffData, val, this.pageSize);
      console.log(pageData(this.staffData, val, this.pageSize));
    },
    // 导出excel
    exportData() {
      const headers = {
        工号: "id",
        姓名: "name",
        部门: "unit",
        电话: "phone",
        邮箱: "email",
      };
      exportData(headers, this.staffData, "维修人员信息表");
    },
  },
  watch: {
    staffData: function () {
      this.pagingData = pageData(this.staffData, 1, this.pageSize);
    },
  },
};
</script>

<style lang="css" >
</style>