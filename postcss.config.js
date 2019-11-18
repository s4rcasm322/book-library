module.exports = {
	plugins: {
		autoprefixer: {},
		'postcss-pxtorem': {
			rootValue: 16,
			unitPrecision: 5,
			propList: ['font', 'font-size', 'line-height', 'letter-spacing'],
			replace: true,
		},
	},
};
