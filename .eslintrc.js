module.exports = {
	root: true,
	env: {
		es6: true,
		node: true
	},
	extends: ['plugin:vue/essential', '@vue/prettier', 'eslint:recommended'],
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'off' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'off' : 'off',
		quotes: [process.env.NODE_ENV === 'production' ? 'off' : 'off', 'single'],
		indent: [2, 'tab']
	},
	parserOptions: {
		parser: 'babel-eslint'
	}
};
