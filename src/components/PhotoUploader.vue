<template>
	<div class="upload">
		<div class="upload__content">
			<ul class="list">
				<li
					v-for="(photo, i) in photosToRender"
					class="list__item"
					:style="{ backgroundImage: `url('${photo}')` }"
					:key="i"
				>
					<v-icon @click="remove(photo)" class="delete-pic-btn">close</v-icon>
				</li>
				<li :class="['list__item list__item--input-con', { 'list__item--disabled': disabled }]">
					<input
						id="photo-uploader"
						class="list__input"
						type="file"
						accept="image/*"
						:disabled="disabled"
						:multiple="multiple"
						@change="upload"
					/>
					<span class="list__span">{{ disabled ? disabledUploadText : uploadText }}</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	name: 'PhotoUploader',
	props: {
		disabled: {
			default: false,
			type: Boolean
		},
		multiple: {
			default: false,
			type: Boolean
		},
		uploadText: {
			default: 'Загрузите фото',
			type: String
		},
		disabledUploadText: {
			default: 'Загрузка фото недоступна',
			type: String
		}
	},
	data() {
		return {
			photos: new Set(),
			photosToRender: []
		};
	},
	methods: {
		convertToBase64(file) {
			return new Promise((resolve, reject) => {
				const reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = () => resolve(reader.result);
				reader.onerror = err => reject(err);
			});
		},
		async upload() {
			const fileInput = document.getElementById(this.id);
			if ('files' in fileInput) {
				if (fileInput.files.length > 0) {
					for (const file of fileInput.files) {
						await this.convertToBase64(file).then(res => {
							this.photos.add(res);
							fileInput.value = '';
						});
					}

					this.photosToRender = Array.from(this.photos);

					this.$emit('upload', this.photosToRender);
				}
			}
		},
		remove(photo) {
			this.photosToRender = this.photosToRender.filter(item => item !== photo);

			if (this.photos.has(photo)) {
				this.photos.delete(photo);
			}

			this.$emit('on-remove', this.photosToRender);
		}
	}
};
</script>
<style lang="scss" scoped>
.upload {
	display: block;
	width: 100%;
	height: 100%;

	&__content {
		display: block;
		width: 100%;
		height: 100%;
	}
}

.list {
	display: flex;
	flex-flow: row wrap;
	justify-content: flex-start;
	align-items: flex-start;
	align-content: flex-start;

	width: 100%;
	height: 100%;

	&__item {
		display: flex;
		flex-flow: column nowrap;
		justify-content: center;
		align-items: center;
		align-content: center;

		width: 200px;
		height: 200px;
		border: 1px solid rgba(100, 100, 100, 0.5);
		border-radius: 12px;
		padding: 0;
		margin: 0 15px 15px;
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center center;
		position: relative;
		overflow: hidden;

		&:first-child {
			margin-left: 0;
		}

		&--input-con {
			border: 1px dashed rgba(100, 100, 100, 0.5);
			background-color: #f5f5f5;
			margin-left: 0;
			margin-bottom: 0;
		}

		&--disabled {
			&::after {
				content: '';
				display: block;
				width: 100%;
				height: 100%;
				background-color: darken($color: #f5f5f5, $amount: 10%);
				filter: blur(50%);
				position: absolute;
			}
		}
	}

	&__input {
		display: block;
		border: none;
		outline: none;
		width: 100%;
		height: 100%;
		opacity: 0;
		z-index: 10;
	}

	&__span {
		position: absolute;
		width: 100%;
		padding: 0 15px;
		font-weight: 700;
		text-align: center;
		color: #1e1e1e;
		z-index: 1;
	}
}

.delete-pic-btn {
	position: absolute !important;
	top: 5px;
	right: 5px;

	display: flex;
	flex-flow: column nowrap;
	justify-content: center;
	align-items: center;

	width: 20px;
	height: 20px;

	background-color: rgba(255, 50, 50, 0.9);
	border-radius: 5px;
	transition: 0.3s;
	z-index: 10;

	color: #fff;
	font-size: 18px;

	&:hover {
		border-radius: 50%;
		cursor: pointer;
	}
}
</style>
