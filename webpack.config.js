const path = require('path');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

const ENV_PROD = process.env.NODE_ENV === 'production';

module.exports = {
	entry: './src/index.ts',
	mode: ENV_PROD ? 'production' : 'development',
	output: {
		filename: 'carpsbot.js',
		path: path.resolve(__dirname, 'dist'),
	},
	target: 'node',
	devtool: 'source-map',
	plugins: [
		new FriendlyErrorsPlugin({
			compilationSuccessInfo: {
				messages: [
					'You application is running here http://localhost:3000',
				],
				notes: [
					'Some additionnal notes to be displayed unpon successful compilation',
				],
			},
			onErrors: function(severity, errors) {
				// You can listen to errors transformed and prioritized by the plugin
				// severity can be 'error' or 'warning'
			},
			clearConsole: true,
			additionalFormatters: [],
			additionalTransformers: [],
		}),
	],
	resolve: {
		extensions: ['.ts', '.js', '.json'],
	},
	module: {
		rules: [{ test: /\.ts?$/, loader: 'awesome-typescript-loader' }],
	},
};
