/* eslint-disable no-undef */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const WebpackPwaManifest = require('webpack-pwa-manifest');

module.exports = {
	entry: path.resolve(__dirname, 'src/scripts/app.js'),
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
					},
				],
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					// Creates `style` nodes from JS strings
					'style-loader',
					// Translates CSS into CommonJS
					'css-loader',
					// Compiles Sass to CSS
					'sass-loader',
				],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'src/templates/index.html'),
			filename: 'index.html',
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, 'src/public/'),
					to: path.resolve(__dirname, 'dist/'),
				},
			],
		}),
		new WebpackPwaManifest({
			name: 'Portal of Restaurants',
			short_name: 'POS',
			description: 'Portal of Food is a web application that helps you to find the best restaurant in your area. You can search for restaurant by name, location, category, and more. You can also add your favorite restaurant to your favorite list. You can also see your favorite restaurant list. You can also see the restaurant list in your area. You can also see the restaurant list in your favorite category. You can also see the restaurant list in your favorite location. You can also see the restaurant list in your favorite name. You can also see the restaurant list in your favorite category and location.',
			background_color: '#ffd369',
			theme_color: '#ffd369',
			display: 'standalone',
			start_url: '.',
			crossorigin: 'use-credentials',
			icons: [
				{
					src: path.resolve(__dirname, 'src/public/images/icons/icon.png'),
					sizes: [72, 96, 128, 144, 192, 256, 384, 512],
					destination: path.resolve(__dirname, 'dist/icons'),
					type: 'image/png',
				},
				{
					src: path.resolve(__dirname, 'src/public/images/icons/icon.png'),
					sizes: [72, 96, 128, 144, 192, 256, 384, 512],
					destination: path.resolve(__dirname, 'dist/icons'),
					type: 'image/png',
					purpose: 'maskable',
				},
			],
		}),
	],
};