<template>
	<div class="filters">
		<van-dropdown-menu class="filters__sort" :overlay="false" active-color="#00c086">
			<van-dropdown-item class="filters__sort-item" v-model="filters.sortType" :options="sortTypes" />
		</van-dropdown-menu>

		<div class="filters__buttons">
			<van-button
				class="filters__button"
				:class="{ 'filters__button--active': filters.showGrid }"
				plain
				type="default"
				:disabled="filters.showGrid"
				@click="changeView"
			>
				<svg
					x="0px"
					y="0px"
					width="1.2em"
					height="1em"
					viewBox="0 0 35 35"
					style="enable-background:new 0 0 35 35;"
					xml:space="preserve"
				>
					<g>
						<rect width="16" height="16" />
						<rect x="19" width="16" height="16" />
						<rect y="19" width="16" height="16" />
						<rect x="19" y="19" width="16" height="16" />
					</g>
				</svg>
			</van-button>
			<van-button
				class="filters__button"
				:class="{ 'filters__button--active': !filters.showGrid }"
				plain
				icon="bars"
				type="default"
				:disabled="!filters.showGrid"
				@click="changeView"
			></van-button>
		</div>
	</div>
</template>
<script>
export default {
	name: 'page-filters',
	data: () => ({
		sortTypes: [
			{ value: 0, text: 'По алфавиту' },
			{ value: 1, text: 'По убыванию алфавита' },
			{ value: 2, text: 'По возрастанию даты публикации' },
			{ value: 3, text: 'По убыванию даты публикации' },
		],
		filters: {
			sortType: 0,
			showGrid: true,
		},
	}),
	watch: {
		filters: {
			deep: true,
			handler(value) {
				this.$emit('filter-change', value);
			},
		},
	},
	methods: {
		changeView() {
			this.filters.showGrid = !this.filters.showGrid;
		},
	},
};
</script>
<style lang="scss" scoped>
.filters {
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
	align-items: center;

	width: auto;

	&__sort {
		min-width: 255px;
		max-height: 44px;
		margin-right: 20px;
		border: 1px solid #00c086;
		padding: 0 8px;

		&:hover {
			cursor: pointer;
		}

		/deep/ span {
			display: block;
			width: 100%;
			padding: 0;

			&::after {
				right: 0;
			}

			div {
				padding-right: 10px;
			}
		}
	}

	&__sort-item {
		/deep/ .van-dropdown-item {
			position: absolute;
			top: 43px !important;
			left: -1px;
			bottom: auto;

			min-width: 255px;
			min-height: auto;
			border-width: 0 1px 1px 1px;
			border-style: solid;
			border-color: #00c086;

			.van-dropdown-item__content {
				position: static;
				min-height: 100%;
				max-height: 100%;
				transition: none !important;
			}
		}
	}

	&__buttons {
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-end;
		align-items: center;
	}

	&__button {
		display: flex;
		flex-flow: row nowrap;
		justify-content: center;
		align-items: center;

		padding: 10px;
		margin: 0;
		margin-right: 5px;
		min-height: auto;
		height: auto;
		line-height: 1;
		transition: 0.3s;

		&:last-child {
			margin-right: 0;
		}

		&:hover,
		&--active {
			color: #fff;
			background-color: #00c086;

			svg {
				transition: 0.3s;
				fill: #fff;
			}
		}

		&:disabled {
			opacity: 1;
			cursor: default;
		}
	}
}
</style>
