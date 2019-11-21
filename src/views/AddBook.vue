<template>
	<div class="add-book">
		<div class="container">
			<h2 class="add-book__title">Добавлений новой книги</h2>

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
						:error="false"
						error-message="Поле должно быть заполнено!"
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
						error-message
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
						error-message
					/>
					<van-field
						class="add-book__field"
						v-model="newBook.publisher"
						required
						clearable
						maxlength="30"
						show-word-limit
						label-width="115"
						label="Издательство"
						placeholder="Издательство"
						error-message
					/>
					<van-field class="add-book__field" required clearable label-width="115" label="Год публикации" error-message>
						<input
							slot="input"
							class="van-field__control"
							v-model="newBook.publishDate"
							type="number"
							placeholder="Год публикации"
							v-mask="'####'"
						/>
					</van-field>
					<van-field
						class="add-book__field"
						required
						clearable
						label-width="115"
						label="Дата выхода в тираж"
						error-message
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
					<van-field class="add-book__field" required clearable label-width="115" label="Кол-во страниц" error-message>
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
				<van-button class="add-book__action" type="default" @click="addBook">Добавить</van-button>
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
			}
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
		addBook() {
			this.$spreloader.show();

			setTimeout(() => {
				this.newBook.id = this.books[this.books.length - 1].id + 1;
				this.books.push(this.newBook);
				window.localStorage.setItem('books', JSON.stringify(this.books));

				this.$spreloader.hide();

				this.$router.push('/');
			}, 500);
		}
	},
	mounted() {
		const localBooks = JSON.parse(window.localStorage.getItem('books'));
		if (localBooks) {
			this.books = localBooks;
		}
		console.log(this.books);
	}
};
</script>

<style lang="scss" scoped>
.add-book {
	padding: 5rem 0;

	&__title {
		margin-bottom: 20px;
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
		background-color: lighten($color: #00a086, $amount: 5%);
		cursor: pointer;

		font-size: 18px;
		color: #ffffff;

		&--cancel {
			background-color: red;
		}
	}
}
</style>
