import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store.js'
import ElementUI from 'element-ui'
import Print from 'vue-print-nb' //打印插件
import 'element-ui/lib/theme-chalk/index.css';
import './plugins/element.js'

// 全局样式
import './assets/css/global.css';
// 字体样式
import './assets/css/font.css';
// element样式
import './assets/css/element.css';
// 百度地图
import './plugins/bMap'


Vue.use(ElementUI)
Vue.use(Print)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')