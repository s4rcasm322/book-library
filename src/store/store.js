import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		books: []
	},
	mutations: {
		SET_BOOKS(state, value) {
			state.books = value;
		}
	},
	actions: {},
	modules: {}
});
