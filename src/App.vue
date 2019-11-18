<template>
	<div id="app">
		<header class="header">
			<div class="header__content container">
				<h1 class="header__title">Библиотека</h1>
			</div>
		</header>
		<main class="main">
			<router-view />
		</main>
	</div>
</template>

<style lang="scss">
@import './libs/normalize/normalize.scss';
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600&display=swap&subset=cyrillic');
*,
*::before,
*::after {
	box-sizing: border-box;
}

body,
html,
#app {
	height: 100%;
	margin: 0;
	padding: 0;

	font-size: 16px;
	font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
	line-height: 1.42;

	@media screen and (max-width: 768px) {
		font-size: 14px;
	}

	@media screen and (max-width: 480px) {
		font-size: 12px;
	}
}

ul {
	margin: 0;
	padding: 0;
	list-style: none;
}

h1,
h2,
h3,
h4,
h5,
h6,
p,
a {
	text-decoration: none;
	margin: 0;
}

button {
	cursor: pointer;
}

.container {
	width: 100%;
	max-width: 940px;
	margin: 0 auto;
	padding: 0;

	@media screen and (max-width: 768px) {
		width: 95%;
	}
}
</style>

<style lang="scss" scoped>
.header {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 10;
	transform: translate3d(0, 0, 0);

	display: flex;
	flex-flow: row nowrap;
	justify-content: center;
	align-items: center;

	width: 100%;
	height: 55px;
	background-color: #00c086;
	box-shadow: 0 0 6px rgba(40, 40, 40, 0.15);

	&__content {
		display: flex;
		flex-flow: row nowrap;
		justify-content: center;
		align-items: center;

		height: 100%;
		padding: 5px 0;

		@media screen and (max-width: 768px) {
			justify-content: flex-start;
		}
	}

	&__title {
		display: flex;
		justify-content: center;
		align-items: center;

		height: 100%;
		transition: 0.3s;

		font-size: 32px;
	}
}

.main {
	padding-top: 55px;
}
</style>
