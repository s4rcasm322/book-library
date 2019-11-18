import Vue from 'vue';
import VueRouter from 'vue-router';
import Books from '../views/Books.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'books',
		component: Books,
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
