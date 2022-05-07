/* eslint-disable no-undef */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const path = require('path');

module.exports = {
	entry: {
		app: './src/scripts/app.js',
		sw_test: './src/scripts/sw_test.js',
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
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
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeRedundantAttributes: true,
				useShortDoctype: true,
				removeEmptyAttributes: true,
				removeStyleLinkTypeAttributes: true,
				keepClosingSlash: true,
				minifyJS: true,
				minifyCSS: true,
				minifyURLs: true,
			},
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
			description: 'Portal of Food is a web application that helps you to find the best restaurant in your area.',
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
		new ServiceWorkerWebpackPlugin({
			entry: path.resolve(__dirname, 'src/scripts/sw.js'),
			filename: 'sw.js',
			minify: true
		}),
	],
};