<template>
	<div>
		<photo-uploader />
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
			title: '',
			author: {
				firstName: '',
				lastName: ''
			},
			pages: 0,
			published: '',
			releaseDate: '',
			publisher: '',
			img: ''
		};
	},
	methods: {
		addBook() {}
	}
};
</script>

<style lang="scss" scoped></style>
