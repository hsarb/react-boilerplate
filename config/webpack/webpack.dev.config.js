import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import config from '../../config';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';

const packageJSON = require('../../package.json');

export default {
  context: config.paths.src,
  devtool: 'eval',
  entry: {
    app: ['react-hot-loader/patch', 'webpack-hot-middleware/client?reload=true', './index.js'],
    vendor: Object.keys(packageJSON.dependencies),
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    path: config.paths.build,
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js'],
    modules: [config.paths.src, 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: {
                      node: 'current',
                    },
                    modules: false,
                    useBuiltIns: false,
                    debug: false,
                  },
                ],
                '@babel/preset-stage-0',
                '@babel/preset-flow',
                ['@babel/preset-react', { development: true }],
              ],
            },
          },
        ],
        include: config.paths.src,
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: ['file-loader?name=img/img-[hash:6].[ext]'],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin(config.globals),
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      children: true,
      minChunks: 2,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: module => module.context && module.context.indexOf('node_modules') >= 0,
    }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'manifest', minChunks: Infinity }),
    new HtmlWebpackPlugin({
      template: `${config.paths.src}/index.html`,
      filename: 'index.html',
      inject: 'body',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new BundleAnalyzerPlugin(),
  ],
};
