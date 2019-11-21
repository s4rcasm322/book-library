<template>
	<div class="book">
		<div class="container">
			<header class="book__header">
				<a class="book__back" href="#" @click.prevent="$router.push('/')">Назад</a>
				<h2 class="book__header-title">{{ isEdit ? 'Редактирование' : 'Подробности' }}</h2>
			</header>

			<div class="book__content">
				<photo-uploader
					v-if="isEdit"
					class="book__upload"
					:photo="details.img"
					@upload="details.img = $event"
					@remove="details.img = $event"
				/>
				<div
					v-else
					class="book__img"
					:style="{ backgroundImage: `url(${details.img || require('@/assets/no-image.png')})` }"
				></div>

				<van-cell-group v-if="isEdit" class="book__fields">
					<van-field
						class="book__field"
						v-model="details.title"
						required
						clearable
						maxlength="30"
						show-word-limit
						label-width="115"
						label="Название"
						placeholder="Название"
						:error-message="errors.title ? errors.title : ''"
					/>
					<van-field
						class="book__field"
						v-model="details.author.firstName"
						required
						clearable
						maxlength="20"
						show-word-limit
						label-width="115"
						label="Имя автора"
						placeholder="Имя автора"
						:error-message="errors.firstName ? errors.firstName : ''"
					/>
					<van-field
						class="book__field"
						v-model="details.author.lastName"
						required
						clearable
						maxlength="20"
						show-word-limit
						label-width="115"
						label="Фамилия автора"
						placeholder="Фамилия автора"
						:error-message="errors.lastName ? errors.lastName : ''"
					/>
					<van-field
						class="book__field"
						v-model="details.publisher"
						clearable
						maxlength="30"
						show-word-limit
						label-width="115"
						label="Издательство"
						placeholder="Издательство"
					/>
					<van-field
						class="book__field"
						label-width="115"
						label="Год публикации"
						:error-message="errors.publishDate ? errors.publishDate : ''"
					>
						<input
							slot="input"
							class="van-field__control"
							v-model="details.publishDate"
							type="tel"
							placeholder="Год публикации"
							v-mask="'####'"
						/>
					</van-field>
					<van-field
						class="book__field"
						label-width="115"
						label="Дата выхода в тираж"
						:error-message="errors.releaseDate ? errors.releaseDate : ''"
					>
						<input
							slot="input"
							class="van-field__control"
							v-model="details.releaseDate"
							type="tel"
							placeholder="Дата выхода в тираж"
							v-mask="'##.##.####'"
						/>
					</van-field>
					<van-field
						class="book__field"
						required
						label-width="115"
						label="Кол-во страниц"
						:error-message="errors.pages ? errors.pages : ''"
					>
						<input
							slot="input"
							class="van-field__control"
							v-model="details.pages"
							type="number"
							min="1"
							max="10000"
							placeholder="Кол-во страниц"
							v-mask="'#####'"
						/>
					</van-field>
				</van-cell-group>
				<div v-else class="book__info">
					<h3 class="book__info-text book__info-text--title">{{ details.title || 'Название отсутсвует' }}</h3>
					<h4 class="book__info-text book__info-text--author">
						{{
							details.author.firstName || details.author.lastName
								? `${details.author.firstName} ${details.author.lastName}`
								: 'Автор незивестен'
						}}
					</h4>
					<span class="book__info-text">Издательство: {{ details.publisher || 'Информация отсутствует' }}</span>
					<time class="book__info-text">Год публикации: {{ details.publishDate || 'Информация отсутствует' }}</time>
					<time class="book__info-text"
						>Дата выхода в тираж: {{ details.releaseDate || 'Информация отсутствует' }}</time
					>
					<span class="book__info-text">Cтраниц: {{ details.pages || 'Информация отсутствует' }}</span>
				</div>
			</div>

			<div v-if="!isEdit" class="book__actions">
				<van-button
					class="book__action"
					type="info"
					@click="
						isEdit = true;
						$router.replace(`/book/${id}/${true}`);
					"
					>Редактировать</van-button
				>
				<van-button class="book__action book__action--cancel" type="default" @click="removeBook">Удалить</van-button>
			</div>
			<div v-else class="book__actions">
				<van-button class="book__action" type="info" @click="saveBook">Сохранить</van-button>
				<van-button class="book__action book__action--cancel" type="default" @click="cancelEdit">Отмена</van-button>
			</div>
		</div>
	</div>
</template>

<script>
import PhotoUploader from '@/components/PhotoUploader.vue';
export default {
	name: 'book',
	components: {
		PhotoUploader
	},
	props: ['isEditing', 'id'],
	data() {
		return {
			isEdit: this.isEditing,
			details: {},
			errors: {}
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
	methods: {
		falidateForm() {
			this.errors = {};
			if (this.details.title.trim() === '') {
				this.errors.title = 'Название должно быть заполнено!';
			}

			if (this.details.author.firstName.trim() === '') {
				this.errors.firstName = 'Имя автора должно быть заполнено!';
			}

			if (this.details.author.lastName.trim() === '') {
				this.errors.lastName = 'Фамилия автора должна быть заполнено!';
			}

			if (this.details.publishDate) {
				if (Number(this.details.publishDate) < 1800) {
					this.errors.publishDate = 'Год публикации должен быть не меньше 1800!';
				}
			}

			if (new Date(this.details.releaseDate) < new Date('01.01.1800')) {
				this.errors.releaseDate = 'Тираж не может датироваться ранее 01.01.1800!';
			}

			if (this.details.pages > 10000 || Number(this.details.pages) <= 0) {
				this.errors.pages = 'Кол-во страниц не может быть меньше 0 и превышать 10000';
			}
		},
		cancelEdit() {
			this.isEdit = false;
			this.$router.replace(`/book/${this.id}`);
			this.getBookDetails();
		},
		saveBook() {
			this.falidateForm();
			if (Object.entries(this.errors).length === 0) {
				this.$spreloader.show();

				setTimeout(() => {
					this.books.map(book => {
						if (book.id === this.details.id) {
							book = this.details;
						}
					});
					window.localStorage.setItem('books', JSON.stringify(this.books));

					this.isEdit = false;
					this.$router.replace(`/book/${this.id}`);

					this.$spreloader.hide();
				}, 500);
			}
		},
		removeBook() {
			this.$spreloader.show();

			setTimeout(() => {
				this.books = this.books.filter(book => book.id !== this.details.id);
				window.localStorage.setItem('books', JSON.stringify(this.books));

				this.$spreloader.hide();

				this.$router.push('/');
			}, 500);
		},
		getBookDetails() {
			this.details = Object.assign(
				{},
				this.books.find(book => book.id == this.id)
			);
		}
	},
	created() {
		const localBooks = JSON.parse(window.localStorage.getItem('books'));
		if (localBooks && this.books.length === 0) {
			this.books = localBooks;
		}

		this.getBookDetails();
	}
};
</script>

<style lang="scss" scoped>
.book {
	padding: 5rem 0;

	&__header {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 20px;
	}

	&__back {
		margin-right: auto;
		color: #00a086;
		font-size: 22px;
		font-weight: 500;
	}

	&__header-title {
		margin-right: auto;
		text-align: center;
		color: #444444;
	}

	&__upload {
		margin-right: 20px;
		margin-bottom: 20px;
	}

	&__content {
		display: flex;
		flex-flow: row wrap;

		margin-bottom: 30px;

		@media screen and (max-width: 768px) {
			flex-flow: column nowrap;
			justify-content: center;
			align-items: center;
		}
	}

	&__img {
		width: 400px;
		height: 600px;

		border-radius: 12px;
		padding: 0;
		margin-right: 15px;
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center center;
		overflow: hidden;
	}

	&__fields {
		flex: 1;
		width: 90%;
	}

	&__info {
		flex: 1;
		display: flex;
		flex-flow: column nowrap;

		width: 90%;
	}

	&__info-text {
		font-size: 20px;
		margin-bottom: 10px;

		&--title {
			font-size: 24px;
			margin-bottom: 0;
		}

		&--author {
			font-size: 22px;
			margin-bottom: 20px;
		}
	}

	&__actions {
		display: flex;
		flex-flow: row wrap;
		justify-content: center;
		align-items: center;

		width: 100%;
	}

	&__action {
		min-width: 150px;
		margin: 0 20px;
		cursor: pointer;

		font-size: 18px;
		color: #ffffff;

		&--cancel {
			background-color: red;
		}
	}
}
</style>
