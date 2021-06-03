<template>
  <div>
    <!-- 页头 -->
    <div class="page-header">
      <i class="el-icon-s-home"></i>
      <span>首页</span>
    </div>
    <!-- 账号信息部分 -->
    <el-card shadow="never">
      <div class="userInfo">
        <div class="userAvatar">
          <el-avatar :size="50" :src="circleUrl"></el-avatar>
        </div>
        <ul class="infoItem1">
          <li>
            <span class="nickname">{{ userName }}</span>
            <i class="el-icon-edit"></i>
          </li>
          <li>
            <span>ID：</span><span>{{ userId }}</span>
          </li>
          <li><span>角色：</span><el-tag size="small">{{position}}</el-tag></li>
        </ul>

        <ul class="infoItem2">
          <li>当前合同数<span>22</span>项</li>
          <li><span>房源数777</span>比</li>
          <li>新增房源 <span>32</span> 家</li>
        </ul>
        <ul class="infoItem3">
          <li>
            <span class="icon"><i class="el-icon-s-cooperation"></i></span>
            <span class="title">卖家总数</span>
            <span class="number">456</span>
          </li>
          <li>
            <span class="icon"><i class="el-icon-s-opportunity"></i></span>
            <span class="title">浏览总数</span>
            <span class="number">999</span>
          </li>
          <li>
            <span class="icon"><i class="el-icon-s-flag"></i></span>
            <span class="title">目标客户</span>
            <span class="number">666</span>
          </li>
        </ul>
      </div>
    </el-card>
    <!-- 备忘录部分 -->
    <div class="browse clearfix">
      <el-card class="box-card f-l" shadow="never">
        <el-calendar style="height: 500px" v-model="value">
          <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
          <template slot="dateCell" slot-scope="{ date, data }">
            <div
              @click="isSelected(data, dealMyDate(data.day))"
              style="width: 100%; height: 100%"
              :class="dealMyDate(data.day) ? 'isSelectedclass' : ''"
            >
              <span :class="data.isSelected ? 'is-selected' : ''"
                >{{ data.day.split("-")[2] }}
                {{ data.isSelected ? "✔️" : "" }}</span
              >
              <br />
            </div>
          </template>
        </el-calendar>
      </el-card>

      <el-card class="box-card f-r" style="overflow-y: scroll" shadow="never">
        <template>
          <h2>日历备忘录</h2>
          <br />
          <el-tag
            v-for="(item, index) in tagData"
            :key="index"
            closable
            :disable-transitions="false"
            @close="handleClose(item, index)"
          >
            {{ item }}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputNotepad"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          >
          </el-input>
          <el-button
            v-else
            class="button-new-tag"
            size="small"
            @click="showInput"
            >+ New Tag</el-button
          >
        </template>
      </el-card>
    </div>
  </div>
</template>
<script src="./indexJs.js">
</script>


<style lang="css" scoped>
@import url(./indexCss.css);
</style>
<style lang="css">
/* 日历 */
.el-calendar-table .el-calendar-day {
  height: 35px !important;
}
.el-calendar-table .el-calendar-day {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 2px !important;
  height: 48px !important;
  text-align: center;
}
</style>