<template>
	<div class="upload">
		<div class="upload__content">
			<div class="upload__photo" :style="{ backgroundImage: `url('${localPhoto}')` }">
				<input id="photo-uploader" class="upload__input" type="file" accept="image/*" @change="upload" />
				<span class="upload__label" v-if="!localPhoto">Загрузите фото</span>
				<i v-if="localPhoto" @click="removePhoto" class="material-icons upload__delete-btn">close</i>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'PhotoUploader',
	props: {
		photo: String
	},
	data() {
		return {
			localPhoto: ''
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
			const fileInput = document.getElementById('photo-uploader');
			if ('files' in fileInput) {
				if (fileInput.files.length > 0) {
					for (const file of fileInput.files) {
						await this.convertToBase64(file).then(res => {
							this.localPhoto = res;
							fileInput.value = '';
						});
					}

					this.$emit('upload', this.localPhoto);
				}
			}
		},
		removePhoto() {
			this.localPhoto = null;
			this.$emit('remove', this.localPhoto);
		}
	}
};
</script>
<style lang="scss" scoped>
.upload {
	display: block;
	width: 400px;
	height: 600px;

	&__content {
		display: block;
		width: 100%;
		height: 100%;
	}

	&__photo {
		display: flex;
		flex-flow: column nowrap;
		justify-content: center;
		align-items: center;
		align-content: center;

		width: 100%;
		height: 100%;
		border: 1px solid rgba(100, 100, 100, 0.5);
		border-radius: 12px;
		padding: 0;
		margin: 0 15px 15px;
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center center;
		position: relative;
		overflow: hidden;

		border: 1px dashed rgba(100, 100, 100, 0.5);
		background-color: #f5f5f5;
		margin-left: 0;
		margin-bottom: 0;
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

	&__label {
		position: absolute;
		width: 100%;
		padding: 0 15px;
		font-weight: 700;
		text-align: center;
		color: #1e1e1e;
		z-index: 1;
	}

	&__delete-btn {
		position: absolute;
		top: 5px;
		right: 5px;
		z-index: 10;

		padding: 5px;

		background-color: rgba(255, 50, 50, 0.9);
		border-radius: 6px;
		transition: 0.3s;
		cursor: pointer;

		color: #fff;
		font-size: 18px;
		text-align: center;

		&:hover {
			border-radius: 50%;
		}
	}
}
</style>
