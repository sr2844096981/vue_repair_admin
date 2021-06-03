<template>
  <div>
    <el-table :data="tableData" stripe border height="400" style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="title" label="标题"> </el-table-column>
      <el-table-column prop="time" label="发布时间" >
      </el-table-column>
      <el-table-column label="封面" >
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
          <el-input type="textarea"  rows="9" v-model="detailsData.content" disabled></el-input>
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
import { GetNoticeList, DeleteNotice } from "@/request/apisRepair/notice";
export default {
  data() {
    return {
      id: {
        id: JSON.parse(localStorage.getItem("userInfo")).id,
      },
      tableData: [],
      detailsData: {
      },
      dialogVisible: false,
    };
  },
  created() {},
  mounted() {
    this.getNoticeList()
  },
  methods: {
    // 获取公告列表
    getNoticeList() {
      GetNoticeList(this.id).then((res) => {
        this.tableData = res.data.data;
      });
    },
    handleShow(index, row) {
      console.log(index, row);
      this.detailsData = row;
      this.dialogVisible = true;
    },
    handleDelete(index, row) {
      DeleteNotice({ id: row.id }).then((res) => {
        if (res.data.code !== 200) return this.$message.error("删除失败");
        this.getNoticeList()
        this.$message.success("删除成功");
      });
    },
  },
};
</script>
 <style lang="css">
</style>>
