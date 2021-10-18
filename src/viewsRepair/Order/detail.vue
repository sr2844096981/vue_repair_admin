<template>
  <div>
    <el-card>
      <el-descriptions
        id="printArea"
        class="margin-top"
        title="维修信息详情"
        :column="2"
        border
      >
        <template slot="extra">
          <el-button type="warning" size="small" v-print="printObj"
            >打印</el-button
          >
        </template>
        <!--startprint-->
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            订单编号
          </template>
          {{ detailsData.id }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-mobile-phone"></i>
            用户编号
          </template>
          {{ detailsData.s_id }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-location-outline"></i>
            报修区域
          </template>
          {{ detailsData.repairArea }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-tickets"></i>
            详细地址
          </template>
          {{ detailsData.address }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-office-building"></i>
            报修项目
          </template>
          {{ detailsData.repairProject }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            联系方式
          </template>
          {{ detailsData.phone }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            报修日期
          </template>
          {{ detailsData.date }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            预约时间
          </template>
          {{ detailsData.time }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            报修内容
          </template>
          {{ detailsData.content }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            维修工人
          </template>
          {{ detailsData.worker }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            订单状态
          </template>
          {{ detailsData.schedule }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            评价分数
          </template>
           {{ detailsData.appraise }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            用户评价
          </template>
          {{ detailsData.description }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            报修图片
          </template>
          <img style="width: 150px" :src="detailsData.image" />
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            负责人签名
          </template>
          <img style="height:46px" :src="signatureURL" />
        </el-descriptions-item>

        <!--endprint-->
      </el-descriptions>

      <div class="signature-wrap">
        <h2>签名区域</h2>
        <Signature class="signature" @signatureURL="getsignatureURL" />
      </div>
    </el-card>
  </div>
</template>

<script>
// api
import { GetOrderDetail } from "@/request/apisRepair/order";
// 组件
import Signature from "@/components/Signature";

export default {
  components: { Signature },

  data() {
    return {
      // 详情数据
      detailsData: {},
      // 签名图片
      signatureURL: "",
      // 打印对象
      printObj: {
        id: "printArea",
      },
    };
  },
  mounted() {
    // 获取订单详情
    GetOrderDetail(this.$route.params.id).then((res) => {
      if (res.data.code !== 200) return this.$message.error("获取信息失败！");
      this.detailsData = res.data.data;
    });
  },
  methods: {
    getsignatureURL(val) {
      this.signatureURL = val;
    },
  },
  watch: {},
};
</script>

<style lang="css" scoped>
.signature-wrap {
  padding: 20px 0;
}
.signature {
  margin: 20px 0 0 40px;
}
</style>

