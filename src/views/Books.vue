<template>
	<section class="books">
		<div class="container">
			<header class="books__header">
				<div class="books__actions">
					<van-button class="books__action books__action--btn" icon="plus" type="default">Добавить книгу</van-button>
					<page-filters class="books__action" @filter-change="handleFilterChange" />
				</div>
			</header>
			<div class="books__content">
				<book-list :show-grid="filters.showGrid" :sort-type="filters.sortType" />
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
		BookList,
	},
	data: () => ({
		filters: {
			sortType: 0,
			showGrid: true,
		},
	}),
	methods: {
		handleFilterChange(filters) {
			this.filters = filters;
			// console.log(filters);
			console.log(this.filters);
		},
	},
};
</script>
<style lang="scss" scoped>
.books {
	width: 100%;
	height: 100%;
	padding: 0 16px;
	padding-top: 5rem;

	@media screen and (max-width: 768px) {
		padding: 0;
		padding-top: 5rem;
	}

	&__header {
	}

	&__actions {
		display: flex;
		flex-flow: row wrap;
		justify-content: space-between;
		align-items: center;

		@media screen and (max-width: 480px) {
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
		}

		margin: 15px 0 0;
	}

	&__content {
	}
}
</style>
