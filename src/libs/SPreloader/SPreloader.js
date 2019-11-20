import Vue from 'vue';
import SPreloader from './SPreloader.vue';

const Preloader = Vue.extend(SPreloader);
const instancePreloader = new Preloader();

Vue.prototype.$spreloader = {
	show(color) {
		if (color) {
			instancePreloader.$props.ballColor = color;
		}
		instancePreloader.$mount();
		document.body.appendChild(instancePreloader.$el);

		instancePreloader.$props.showPreloader = true;
	},
	hide() {
		instancePreloader.$props.showPreloader = false;
	}
};
