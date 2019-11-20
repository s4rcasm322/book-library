import Vue from 'vue';
import App from './App.vue';
import router from './router/router.js';
import store from './store/store.js';

import Vant from 'vant';
import { Lazyload } from 'vant';

import 'vant/lib/index.css';

Vue.use(Vant);
Vue.use(Lazyload);

import '@/libs/SPreloader/SPreloader.js';

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');
