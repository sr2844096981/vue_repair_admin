<template>
  <div class="main">
    <div class="control">
      <!-- 实时时间 -->
      <div class="showTime">
        <span class="num" ref="showTime">2020年3月17-0时54分14秒</span>
      </div>
      <!-- 订单数量 -->
      <div class="order-num">
        今日新增订单<span class="num">{{sameDayNum}}</span> 历史累计订单:<span class="num"
          >{{allDayNum}}</span
        >
      </div>
      <!-- 切换全屏 -->
<!--       <el-button
        type="success"
        icon="el-icon-full-screen"
        circle
        class="full-screen"
        size="small"
        @click="screenfull"
      ></el-button> -->
      <!-- <i class="el-icon-full-screen full-screen" @click="screenfull"></i> -->
    </div>
    <!-- 图表 -->
    <div class="eacharts01">
      <Eacharts01 style="width:100%;height:100%"/>
    </div>
    <div class="eacharts02">
      <Eacharts03 style="width:100%;height:100%" />
    </div>
    <!--地图容器-->
    <baidu-map
      class="bm-view"
      :center="center"
      :zoom="17"
      :scroll-wheel-zoom="true"
    >
      <!-- 最新订单 跳动的点 -->
      <bm-marker
        :position="leapPosition"
        :dragging="true"
        animation="BMAP_ANIMATION_BOUNCE"
      >
        <bm-label
          :content="content"
          :labelStyle="{
            color: 'green',
            border: '2px solid #000',
            fontSize: '16px',
          }"
          :offset="{ width: -35, height: 30 }"
        />
      </bm-marker>
      <!-- 标记点 -->
      <!-- <bm-marker
        v-for="(item, index) in marker"
        :key="item.id"
        :position="{ lng: item.lngPosition, lat: item.latPosition }"
        :dragging="true"
        @click="infoWindowOpen(index)"
      >
        <bm-info-window
          :show="item.showInfo"
          @close="infoWindowClose(index)"
          @open="infoWindowOpen(index)"
          >{{ infoText }}
        </bm-info-window>
      </bm-marker> -->
    </baidu-map>
  </div>
</template>

<script src="./indexJs.js">
</script>

<style lang="css" scoped>
@import url(./indexCss.css);
</style>