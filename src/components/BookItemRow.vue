<template>
	<li class="books__item-row book-row">
		<div class="book-row__content" @click="$emit('bookClick')">
			<van-image class="book-row__img" width="100" fit="scale-down" alt="Фото книги" lazy-load :src="img" />
			<div class="book-row__text-con">
				<h2 class="book-row__title">{{ title || 'Название отсутсвует' }}</h2>
				<h3 class="book-row__author">
					{{ `${author.firstName || ''} ${author.lastName || ''}` || 'Название отсутсвует' }}
				</h3>
				<div class="book-row__info">
					<span class="book-row__info-text">Издательство: {{ publisher || 'Неизвестен' }}</span>
					<time class="book-row__info-text">Год публикации: {{ published || 'Информация отсутствует' }}</time>
					<time class="book-row__info-text">Дата выхода в тираж: {{ release || 'Информация отсутствует' }}</time>
					<span class="book-row__info-text">Cтраниц: {{ pages || 'Информация отсутствует' }}</span>
				</div>
			</div>
		</div>
		<div class="book-row__actions">
			<span class="book-row__action" @click="$emit('clickEdit')">
				<i class="material-icons">edit</i>
			</span>
			<span class="book-row__action" @click="$emit('clickRemove')">
				<i class="material-icons">delete</i>
			</span>
		</div>
	</li>
</template>

<script>
export default {
	name: 'BookItemrow',
	props: {
		title: String,
		author: Object,
		pages: Number,
		published: Number,
		release: String,
		publisher: String,
		img: String
	}
};
</script>

<style lang="scss" scoped>
.book-row {
	display: flex;
	width: 100%;
	margin-bottom: 20px;
	background-color: #fff;
	box-shadow: 0 0 8px rgba(40, 40, 40, 0.1);

	&__img {
		margin-right: 15px;
	}

	&__content {
		// padding: 15px;
		flex: 1;
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-start;
		align-items: flex-start;
	}

	&__text-con {
		flex: 1;
		display: flex;
		flex-flow: column nowrap;
		justify-content: center;
		align-items: flex-start;

		width: 100%;
		// padding: 05px;
		padding: 10px 0;
	}

	&__title {
		font-size: 22px;
		line-height: 1;
	}

	&__author {
		font-size: 18px;
	}

	&__info {
		display: flex;
		flex-flow: column nowrap;

		font-size: 16px;
		line-height: 1.2;
	}

	&__actions {
		flex: 0 1;
		display: flex;
		flex-flow: column nowrap;
		justify-content: center;
		align-items: center;

		width: 100%;
		padding: 5px;
		border-top: 1px solid rgba(80, 80, 80, 0.1);
	}

	&__action {
		width: 24px;
		height: 24px;
		padding: 5px;
		margin: 10px 0;
		border-radius: 50%;
		transition: 0.3s;
		cursor: pointer;
		box-sizing: content-box;

		&:hover {
			background-color: #cacaca;
		}

		&:active {
			background-color: lighten($color: #cacaca, $amount: 10%);
		}

		i {
			user-select: none;
		}
	}
}
</style>
