<template>
	<div id="app">
		<header class="header">
			<div class="container">
				<div class="header__content">
					<div class="header__back">
						<button class="header__back-btn"></button>
					</div>
					<h1 class="header__title">Библиотека</h1>
				</div>
			</div>
		</header>
		<main>
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

.container {
	width: 100%;
	max-width: 1000px;
	margin: 0 auto;
	padding: 0;
}

.header {
	position: fixed;
	top: env(safe-area-inset-top);
	left: 0;
	right: 0;
	z-index: 59999;
	transform: translate3d(0, 0, 0);

	display: flex;
	flex-flow: row nowrap;
	justify-content: center;
	align-items: center;

	width: 100%;
	min-height: 55px;
	background-color: #00c086;

	&__content {
	}
}
</style>
