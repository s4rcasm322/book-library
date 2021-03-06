import Vue from 'vue';
import VueRouter from 'vue-router';
import Books from '../views/Books.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'books',
		component: Books
	},
	{
		path: '/add-book',
		name: 'add-books',
		component: () => import('../views/AddBook.vue')
	},
	{
		path: '/book/:id/:isEditing?',
		name: 'book',
		component: () => import('../views/Book.vue'),
		props: true
	}
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
});

export default router;
