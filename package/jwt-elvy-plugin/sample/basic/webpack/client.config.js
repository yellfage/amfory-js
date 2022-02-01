const path = require('path')
const { merge } = require('webpack-merge')
const HtmlPlugin = require('html-webpack-plugin')

const baseConfig = require('./base.config')

const INPUT_PATH = path.resolve(__dirname, '../src')
const OUTPUT_PATH = path.resolve(__dirname, '../dist')

module.exports = merge(baseConfig, {
  entry: {
    client: `${INPUT_PATH}/client.ts`,
  },
  output: {
    filename: '[name].js',
    path: OUTPUT_PATH,
  },
  devServer: {
    port: 5004,
    historyApiFallback: true,
  },
  plugins: [
    new HtmlPlugin({
      hash: false,
      template: `${INPUT_PATH}/index.html`,
      filename: 'index.html',
    }),
  ],
})
