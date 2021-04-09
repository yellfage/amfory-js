/* eslint-disable @typescript-eslint/no-var-requires */
const { DefinePlugin } = require('webpack')
const ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin')

const path = require('path')

const { NODE_ENV } = process.env

const PATH_SRC = path.resolve(__dirname, 'src')
const PATH_OUTPUT = path.resolve(__dirname, 'dist')
const PATH_TS_CONFIG = path.resolve(__dirname, 'tsconfig.json')

module.exports = {
  mode: NODE_ENV,
  entry: {
    index: PATH_SRC,
    settings: `${PATH_SRC}/settings`
  },
  output: {
    filename: '[name].js',
    path: PATH_OUTPUT,
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  stats: { modules: false, children: false },
  performance: { hints: false },
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: [PATH_SRC],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    useBuiltIns: 'usage',
                    corejs: 3
                  }
                ]
              ]
            }
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new ForkTsCheckerPlugin({
      typescript: { configFile: PATH_TS_CONFIG }
    }),
    new DefinePlugin({
      DEVELOPMENT: NODE_ENV === 'development'
    })
  ]
}
