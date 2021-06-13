<template>
  <div>
    <el-table :data="pagingData" stripe border height="400" style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="title" label="标题"> </el-table-column>
      <el-table-column prop="time" label="发布时间"> </el-table-column>
      <el-table-column label="封面">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.image"
            fit="fill"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleShow(scope.$index, scope.row)"
            >查看</el-button
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
    <!-- 分页 -->
    <el-pagination
      style="margin-top: 30px"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      background
      :page-sizes="[1, 2, 4, 6, 8]"
      :page-size="2"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.length"
    >
    </el-pagination>
    <!-- 查看公告对话框 -->
    <el-dialog title="详情" :visible.sync="dialogVisible" width="50%">
      <el-form :model="detailsData" label-width="80px">
        <el-form-item label="公告id">
          <el-input v-model="detailsData.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="detailsData.author" disabled></el-input>
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="detailsData.title" disabled></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input
            type="textarea"
            rows="9"
            v-model="detailsData.content"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="封面">
          <el-image
            style="width: 100px; height: 100px"
            :src="detailsData.image"
            fit="fit"
          ></el-image>
        </el-form-item>
        <el-form-item label="发布时间">
          <el-input v-model="detailsData.time" disabled></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 引入分页
import { pageData } from "@/utils/Pagination";
// api
import { GetNoticeList, DeleteNotice } from "@/request/apisRepair/notice";
export default {
  data() {
    return {
      id: {
        id: JSON.parse(localStorage.getItem("userInfo")).id,
      },
      tableData: [],
      detailsData: {},
      dialogVisible: false,
      // 分页后的数组
      pagingData: [],
      //  每页显示条数
      pageSize: 2,
    };
  },
  mounted() {
    this.getNoticeList();
  },

  methods: {
    // 获取公告列表
    getNoticeList() {
      GetNoticeList(this.id).then((res) => {
        this.tableData = res.data.data;
      });
    },
    // 查看公告详情方法
    handleShow(index, row) {
      console.log(index, row);
      this.detailsData = row;
      this.dialogVisible = true;
    },
    // 删除公告方法
    handleDelete(index, row) {
      DeleteNotice({ id: row.id }).then((res) => {
        if (res.data.code !== 200) return this.$message.error("删除失败");
        this.getNoticeList();
        this.$message.success("删除成功");
      });
    },
    // 每页条数改变时触发
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.pagingData = pageData(this.tableData, 1, val);
    },
    // 页码改变时触发
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pagingData = pageData(this.tableData, val, this.pageSize);
    },
  },
    watch: {
    tableData: function () {
      this.pagingData = pageData(this.tableData, 1, this.pageSize);
    },  
  }
};
</script>
 <style lang="css">
</style>>
