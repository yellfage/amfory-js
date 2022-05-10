const path = require('path')
const { SourceMapDevToolPlugin } = require('webpack')
const ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin')

const TS_CONFIG_PATH = path.resolve(__dirname, '../../../tsconfig.json')

module.exports = {
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.js'],
  },
  stats: { modules: false, children: false },
  performance: { hints: false },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'esbuild-loader',
            options: {
              loader: 'ts',
              target: 'esnext',
              tsconfigRaw: require(TS_CONFIG_PATH),
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new SourceMapDevToolPlugin({
      filename: '[file].map',
    }),
    new ForkTsCheckerPlugin({
      typescript: { configFile: TS_CONFIG_PATH },
    }),
  ],
}
