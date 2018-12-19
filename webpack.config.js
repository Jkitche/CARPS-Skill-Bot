const path = require("path");

module.exports = {
	entry: './src/index.ts',
	mode: 'development',
	output: {
		filename: 'carpsbot.js',
		path: path.resolve(__dirname, "dist"),
	},
	devtool: 'source-map',
	resolve: {
		extensions: ['.ts', '.js', '.json'],
	},
	module: {
		rules: [
			{ test: /\.ts?$/, loader: 'awesome-typescript-loader' },
		],
	},
	externals: ["fs"]
};
