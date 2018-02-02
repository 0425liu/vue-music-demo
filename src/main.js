import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router';
import store from './store';
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import 'common/scss/index.scss'
import axios from 'axios'

Vue.prototype.axios = axios;

fastclick.attach(document.body);
Vue.use(VueLazyload, {
    loading: require('common/images/default.png')
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: "#app",
    router,
    store,
    render: h => h(App),
});