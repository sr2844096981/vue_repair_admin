<template>
  <div>
    <h2>工作日历</h2>
    <el-calendar v-model="value">
      <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
      <template slot="dateCell" slot-scope="{ date, data }">
        <p class="date-content">
          {{ data.day | getDay }}
          <!-- {{ isWeek(date) ? "休" : "" }} -->
          <span class="xiu" v-if="isWeek(date)">休</span>
        </p>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  filters: {
    getDay(value) {
      // 2021-09-01
      const day = value.split("-")[2];
      return day.startsWith("0") ? day.substr(1) : day;
    },
  },
  data() {
    return {
      value: new Date(),
    };
  },
  methods: {
    // 判断是否周末
    isWeek(date) {
      return date.getDay() === 6 || date.getDay() === 0;
    },
  },
};
</script>

<style lang="css">
/* 日历 */

.calendar-wrap {
  width: 600px;
  /* height: 300px; */
}

.el-calendar__body {
  padding: 12px 20px 12px !important;
}

.el-calendar-day {
  height: 34px !important;
}
.el-calendar-table td,
.el-calendar-table tr td:first-child,
.el-calendar-table tr:first-child td {
  border: none;
}

.date-content {
  text-align: center;
  position: relative;
}

.xiu {
  position: absolute;
  top: -9px;
  left: 41px;
  background-color: #ffd200;
  box-shadow: 0 2px 3px 2px rgb(0 0 0 / 10%);
  border-radius: 4px;
  padding: 2px;
  color: #fff;
}
</style>