<template>
	<transition name="book-card">
		<li class="books__item-card book-card">
			<div class="book-card__content" @click="$emit('clickBook')">
				<van-image
					class="book-card__img"
					width="100%"
					height="350"
					fit="scale-down"
					alt="Фото книги"
					lazy-load
					:src="img"
				/>
				<h2 class="book-card__title">{{ title || 'Название отсутсвует' }}</h2>
				<h3 class="book-card__author">
					{{ author.firstName || author.lastName ? `${author.firstName} ${author.lastName}` : 'Автор незивестен' }}
				</h3>
				<div class="book-card__info">
					<span class="book-card__info-text">
						Издательство:
						{{ publisher || 'Информация отсутствует' }}
					</span>
					<time class="book-card__info-text">
						Год публикации:
						{{ published || 'Информация отсутствует' }}
					</time>
					<time class="book-card__info-text">
						Дата выхода в тираж:
						{{ release || 'Информация отсутствует' }}
					</time>
					<span class="book-card__info-text">
						Cтраниц:
						{{ pages || 'Информация отсутствует' }}
					</span>
				</div>
			</div>
			<div class="book-card__actions">
				<span class="book-card__action" @click="$emit('edit')">
					<i class="material-icons">edit</i>
				</span>
				<span class="book-card__action" @click="$emit('remove')">
					<i class="material-icons">delete</i>
				</span>
			</div>
		</li>
	</transition>
</template>

<script>
export default {
	name: 'BookItemCard',
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
.book-card {
	width: calc(33.3333% - 20px);
	min-width: 220px;
	margin: 0 10px 20px;
	margin-bottom: 20px;
	background-color: #fff;
	box-shadow: 0 0 8px rgba(40, 40, 40, 0.1);
	overflow: hidden;

	@media screen and (max-width: 500px) {
		width: 75%;
		max-width: auto;
		margin-right: 0;
	}

	&-leave-to {
		animation: fadeOut 0.3s;
	}

	&__content {
		padding: 15px 10px;
	}

	&__title {
		font-size: 22px;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	&__author {
		margin-bottom: 10px;
		font-size: 18px;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	&__info {
		display: flex;
		flex-flow: column nowrap;
		margin-bottom: 10px;

		font-size: 16px;
	}

	&__info-text {
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	&__actions {
		display: flex;
		flex-flow: row nowrap;
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
		margin: 0 10px;
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
