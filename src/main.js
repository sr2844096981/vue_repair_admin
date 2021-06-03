import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

// 全局样式
import './assets/css/global.css';
// 字体样式
import './assets/css/font.css';

// 高德地图
import './plugins/aMap'

// 百度地图
import './plugins/bMap'





Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')