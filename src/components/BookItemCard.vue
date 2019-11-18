<template>
	<li class="books__item-card book-card">
		<div class="book-card__img"></div>
		<h2 class="book-card__title"></h2>
		<span class="book-card__publisher"></span>
		<time class="book-card__publised"></time>
		<time class="book-card__release"></time>
		<span class="book-card__pages"></span>
	</li>
</template>

<script>
export default {
	name: 'BookItemCard',
	props: {},
};
</script>

<style lang="scss" scoped></style>
