<template>
	<div class="add-book">
		<div class="container">
			<header class="add-book__header">
				<a class="add-book__back" href="#" @click.prevent="$router.push('/')">Назад</a>
				<h2 class="add-book__title">Добавлений новой книги</h2>
			</header>

			<div class="add-book__content">
				<photo-uploader class="add-book__upload" @upload="newBook.img = $event" @remove="newBook.img = ''" />

				<van-cell-group class="add-book__fields">
					<van-field
						class="add-book__field"
						v-model="newBook.title"
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
						class="add-book__field"
						v-model="newBook.author.firstName"
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
						class="add-book__field"
						v-model="newBook.author.lastName"
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
						class="add-book__field"
						v-model="newBook.publisher"
						clearable
						maxlength="30"
						show-word-limit
						label-width="115"
						label="Издательство"
						placeholder="Издательство"
					/>
					<van-field
						class="add-book__field"
						label-width="115"
						label="Год публикации"
						:error-message="errors.publishDate ? errors.publishDate : ''"
					>
						<input
							slot="input"
							class="van-field__control"
							v-model="newBook.publishDate"
							type="tel"
							placeholder="Год публикации"
							v-mask="'####'"
						/>
					</van-field>
					<van-field
						class="add-book__field"
						label-width="115"
						label="Дата выхода в тираж"
						:error-message="errors.releaseDate ? errors.releaseDate : ''"
					>
						<input
							slot="input"
							class="van-field__control"
							v-model="newBook.releaseDate"
							type="tel"
							placeholder="Дата выхода в тираж"
							v-mask="'##.##.####'"
						/>
					</van-field>
					<van-field
						class="add-book__field"
						required
						label-width="115"
						label="Кол-во страниц"
						:error-message="errors.pages ? errors.pages : ''"
					>
						<input
							slot="input"
							class="van-field__control"
							v-model="newBook.pages"
							type="number"
							min="1"
							max="10000"
							placeholder="Кол-во страниц"
							v-mask="'#####'"
						/>
					</van-field>
				</van-cell-group>
			</div>

			<div class="add-book__actions">
				<van-button class="add-book__action" type="primary" @click="addBook">Добавить</van-button>
				<van-button class="add-book__action add-book__action--cancel" type="default" @click="$router.push('/')"
					>Отмена</van-button
				>
			</div>
		</div>
	</div>
</template>

<script>
import PhotoUploader from '@/components/PhotoUploader.vue';
export default {
	name: 'add-book',
	components: {
		PhotoUploader
	},
	data() {
		return {
			newBook: {
				title: '',
				author: {
					firstName: '',
					lastName: ''
				},
				pages: '',
				publishDate: '',
				releaseDate: '',
				publisher: '',
				img: ''
			},
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
			if (this.newBook.title.trim() === '') {
				this.errors.title = 'Название должно быть заполнено!';
			}

			if (this.newBook.author.firstName.trim() === '') {
				this.errors.firstName = 'Имя автора должно быть заполнено!';
			}

			if (this.newBook.author.lastName.trim() === '') {
				this.errors.lastName = 'Фамилия автора должна быть заполнено!';
			}

			if (this.newBook.publishDate) {
				if (Number(this.newBook.publishDate) < 1800) {
					this.errors.publishDate = 'Год публикации должен быть не меньше 1800!';
				}
			}

			if (new Date(this.newBook.releaseDate) < new Date('01.01.1800')) {
				this.errors.releaseDate = 'Тираж не может датироваться ранее 01.01.1800!';
			}

			if (this.newBook.pages > 10000 || Number(this.newBook.pages) <= 0) {
				this.errors.pages = 'Кол-во страниц не может быть меньше 0 и превышать 10000';
			}
		},
		addBook() {
			this.falidateForm();
			if (Object.entries(this.errors).length === 0) {
				this.$spreloader.show();

				setTimeout(() => {
					if (this.books.length > 0) {
						this.newBook.id = this.books[this.books.length - 1].id + 1;
					} else {
						this.newBook.id = 1;
					}

					this.books.push(this.newBook);
					window.localStorage.setItem('books', JSON.stringify(this.books));

					this.$spreloader.hide();

					this.$router.push('/');
				}, 500);
			}
		}
	},
	created() {
		const localBooks = JSON.parse(window.localStorage.getItem('books'));
		if (localBooks && this.books.length === 0) {
			this.books = localBooks;
		}
	}
};
</script>

<style lang="scss" scoped>
.add-book {
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

	&__title {
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

	&__fields {
		flex: 1;
		width: 90%;
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
