<template>
	<ul v-if="showGrid" class="books__list">
		<book-item-card
			v-for="book in books"
			:key="book.title"
			:title="book.title"
			:last-name="book.lastName"
			:pages="book.pages"
			:published="book.published"
			:release="book.releaseDate"
			:publisher="book.publisher"
			:img="book.img"
		/>
	</ul>
	<ul v-else class="books__list">
		<book-item-row
			v-for="book in books"
			:key="book.title"
			:title="book.title"
			:last-name="book.lastName"
			:pages="book.pages"
			:published="book.published"
			:release="book.releaseDate"
			:publisher="book.publisher"
			:img="book.img"
		/>
	</ul>
</template>

<script>
import BookItemCard from './BookItemCard';
import BookItemRow from './BookItemRow';

export default {
	name: 'BookList',
	components: {
		BookItemCard,
		BookItemRow,
	},
	props: {
		showGrid: {
			default: true,
			type: Boolean,
		},
		sortType: {
			type: Number,
		},
		books: {
			type: Array,
		},
	},
};
</script>

<style lang="scss" scoped>
.books {
	&__list {
	}
}
</style>
