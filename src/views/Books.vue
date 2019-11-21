<template>
	<section class="books">
		<div class="container">
			<header class="books__header">
				<div class="books__actions">
					<van-button
						class="books__action books__action--btn"
						icon="plus"
						type="default"
						@click="$router.push('/add-book')"
						>Добавить книгу</van-button
					>
					<page-filters class="books__action" @filter-change="filters = $event" />
				</div>
			</header>
			<div class="books__content">
				<book-list
					v-if="!showPreloader && books.length > 0"
					:books="localBooks"
					:show-grid="filters.showGrid"
					:sort-type="filters.sortType"
					@bookClick="openBookDetails"
					@edit="openBookDetails($event, true)"
					@remove="removeBook"
				/>

				<p v-if="!showPreloader && books.length === 0" class="books__no-books">Вы еще не добавляли книг :(</p>
			</div>
		</div>
	</section>
</template>
<script>
import PageFilters from '@/components/PageFilters.vue';
import BookList from '@/components/BookList.vue';

export default {
	name: 'books',
	components: {
		PageFilters,
		BookList
	},
	data() {
		return {
			filters: {
				sort: {
					type: 'title',
					isDesc: true
				},
				showGrid: true
			},
			localBooks: [],
			showPreloader: true
		};
	},
	computed: {
		books: {
			get() {
				return this.$store.state.books;
			},
			set(val) {
				this.$store.commit('SET_BOOKS', val);
			}
		}
	},
	watch: {
		filters: {
			deep: true,
			handler(val) {
				this.sortBooks(val.sort.type, val.sort.isDesc);
			}
		}
	},
	methods: {
		getBooks() {
			this.$spreloader.show();
			const localBooks = JSON.parse(window.localStorage.getItem('books'));

			if (localBooks) {
				this.books = localBooks;
				this.localBooks = [...this.books];
				this.sortBooks(this.filters.sort.type, this.filters.sort.isDesc);
			}

			setTimeout(() => {
				this.showPreloader = false;
				this.$spreloader.hide();
			}, 500);
		},
		sortBooks(sortParam, isDesc) {
			this.localBooks.sort((a, b) => {
				if (a[sortParam] > b[sortParam]) {
					return isDesc ? 1 : -1;
				}
				if (a[sortParam] < b[sortParam]) {
					return isDesc ? -1 : 1;
				}
				return 0;
			});
		},
		openBookDetails(id, isEditing) {
			this.$router.push({
				name: 'book',
				params: { id, isEditing }
			});
		},
		removeBook(id) {
			this.$spreloader.show();

			setTimeout(() => {
				this.books = this.books.filter(book => book.id !== id);
				this.localBooks = [...this.books];
				window.localStorage.setItem('books', JSON.stringify(this.books));

				this.sortBooks(this.filters.sort.type, this.filters.sort.isDesc);

				this.$spreloader.hide();
			}, 500);
		}
	},
	created() {
		this.getBooks();
	}
};
</script>
<style lang="scss" scoped>
.books {
	width: 100%;
	height: 100%;
	padding: 5rem 0;

	&__actions {
		display: flex;
		flex-flow: row wrap;
		justify-content: space-between;
		align-items: center;

		@media screen and (max-width: 535px) {
			flex-flow: column nowrap;
			align-items: flex-start;
		}
	}

	&__action {
		&--btn {
			background-color: #00c086;
			border: 1px solid #00c086;
			transition: 0.3s;

			font-size: 16px;
			color: #fff;

			&:hover {
				background-color: transparent;
				color: #444444;
			}

			@media screen and (max-width: 535px) {
				margin-bottom: 15px;
			}
		}
	}

	&__content {
		width: 100%;
		height: 100%;
		margin-top: 2rem;
	}

	&__no-books {
		width: 100%;
		text-align: center;
		font-size: 23px;
		color: rgba(40, 40, 40, 0.4);
	}
}
</style>
