import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
// 引入echarts
// import echarts from 'echarts'
import Global from './components/Global.vue'

Vue.config.productionTip = false;
Vue.prototype.GLOBAL = Global;
// Vue.prototype.$echarts = echarts;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
