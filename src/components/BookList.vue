<template>
	<ul v-if="showGrid" class="books__list">
		<book-item-card
			v-for="book in books"
			:key="book.id"
			:title="book.title"
			:author="book.author"
			:pages="Number(book.pages)"
			:published="Number(book.publishDate)"
			:release="book.releaseDate"
			:publisher="book.publisher"
			:img="book.img"
			@clickBook="$emit('bookClick', book.id)"
			@edit="$emit('edit', book.id)"
			@remove="$emit('remove', book.id)"
		/>
	</ul>
	<ul v-else class="books__list">
		<book-item-row
			v-for="book in books"
			:key="book.id"
			:title="book.title"
			:author="book.author"
			:pages="Number(book.pages)"
			:published="Number(book.publishDate)"
			:release="book.releaseDate"
			:publisher="book.publisher"
			:img="book.img"
			@clickBook="$emit('bookClick', book.id)"
			@edit="$emit('edit', book.id)"
			@remove="$emit('remove', book.id)"
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
		BookItemRow
	},
	props: {
		showGrid: {
			default: true,
			type: Boolean
		},
		sortType: {
			type: Number
		},
		books: {
			type: Array
		}
	}
};
</script>

<style lang="scss" scoped>
.books {
	&__list {
		display: flex;
		flex-flow: row wrap;
		justify-content: flex-start;
		align-items: flex-start;
		align-content: flex-start;

		width: 100%;

		@media screen and (max-width: 768px) {
			justify-content: center;
		}
	}
}
</style>
