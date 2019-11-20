<template>
	<transition name="s-preloader">
		<div v-if="showPreloader" class="s-preloader">
			<div class="s-preloader__balls">
				<div class="s-preloader__ball" :style="{ 'background-color': ballColor }"></div>
				<div class="s-preloader__ball" :style="{ 'background-color': ballColor }"></div>
				<div class="s-preloader__ball" :style="{ 'background-color': ballColor }"></div>
			</div>
		</div>
	</transition>
</template>

<script>
export default {
	props: {
		ballColor: {
			default: '#00C086',
			type: String
		},
		showPreloader: {
			type: Boolean
		}
	}
};
</script>

<style lang="scss" scoped>
.s-preloader {
	display: flex;
	flex-flow: column nowrap;
	justify-content: center;
	align-items: center;

	height: 4em;
	background-color: transparent;

	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -100%);
	z-index: 99999;

	&-leave-to {
		animation: fadeOut 0.1s;
	}

	&__balls {
		width: 4em;
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: space-between;
	}

	&__ball {
		width: 0.8em;
		height: 0.8em;
		border-radius: 50%;

		&:nth-of-type(1) {
			transform: translateX(-100%);
			animation: left-swing 0.5s ease-in alternate infinite;
		}

		&:nth-of-type(3) {
			transform: translateX(-95%);
			animation: right-swing 0.5s ease-out alternate infinite;
		}
	}
}

@keyframes left-swing {
	50%,
	100% {
		transform: translateX(95%);
	}
}

@keyframes right-swing {
	50% {
		transform: translateX(-95%);
	}

	100% {
		transform: translateX(100%);
	}
}
</style>
