const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const ExtractPlugin = require('extract-text-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

config = {
	target:'web',
	entry: path.join(__dirname, 'src/index.js'),
	output: {
		filename: 'bundle.js',
		path: path.join(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				test: /\.jsx$/,
				loader: 'babel-loader'
			},
			{
				test: /\.(gif|jpg|jpeg|png|svg)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit:1024,//如果文件大小小于1024转译成base64
							name: '[name]-aaa.[ext]'
						}
					}
				]
			}
		]
	},
	plugins:[
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: isDev ? '"development"' : '"production"'
			}
		}),
		new HtmlPlugin()
	]
}

if(isDev){//开发环境
	config.devtool = '#cheap-module-eval-source-map'
	config.module.rules.push({
				test: /\.styl$/,
				use: [
					'style-loader',
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true
						}
					},
					'stylus-loader'
				]
			})
	config.devServer = {
		port: 8000,
		host: '0.0.0.0',
		overlay: {
			errors: true
		},
		//open: false,
		hot: true
	}
	config.plugins.push(
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin()
		)
}else{
	config.output.filename = '[name].[chunkhash:8].js'
	config.module.rules.push({
				test: /\.styl$/,
				use: ExtractPlugin.extract({
					fallback: 'style-loader',
					use:[
						'css-loader',
						{
							loader: 'postcss-loader',
							options: {
								sourceMap: true
							}
						},
						'stylus-loader'
					]
				})
			})
	config.plugins.push(
			new ExtractPlugin('styles.[contentHash:8].css')
		)
}


module.exports = config