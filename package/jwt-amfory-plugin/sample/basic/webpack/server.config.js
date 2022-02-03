const path = require('path')
const { merge } = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const NodemonPlugin = require('nodemon-webpack-plugin')

const baseConfig = require('./base.config')

const INPUT_PATH = path.resolve(__dirname, '../src')
const OUTPUT_PATH = path.resolve(__dirname, '../dist')

module.exports = merge(baseConfig, {
  entry: {
    server: `${INPUT_PATH}/server.ts`,
  },
  output: {
    filename: '[name].js',
    path: OUTPUT_PATH,
  },
  externalsPresets: { node: true },
  externals: [nodeExternals()],
  plugins: [new NodemonPlugin()],
})
