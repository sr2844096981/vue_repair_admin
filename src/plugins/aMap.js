// 高德地图
import Vue from 'vue'
import AmapVue from '@amap/amap-vue';

AmapVue.config.version = '2.0'; // 默认2.0，这里可以不修改
AmapVue.config.key = 'cab59d62d9bafde50a14c1114c6f64eb';
AmapVue.config.plugins = [
    'AMap.ToolBar',
    'AMap.MoveAnimation',
    // 在此配置你需要预加载的插件，如果不配置，在使用到的时候会自动异步加载
];
Vue.use(AmapVue);