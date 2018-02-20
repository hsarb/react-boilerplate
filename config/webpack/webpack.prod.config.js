/* eslint-disable no-console */
import config from '../../config';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ManifestPlugin from 'webpack-manifest-plugin';
import SWPrecacheWebpackPlugin from 'sw-precache-webpack-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import webpack from 'webpack';

const packageJSON = require('../../package.json');

export default {
  context: config.paths.src,
  entry: {
    app: ['./index.js'],
    vendor: Object.keys(packageJSON.dependencies),
  },
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].chunk.js',
    path: config.paths.build,
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js'],
    modules: [config.paths.src, 'node_modules'],
    unsafeCache: true,
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
                '@babel/preset-react',
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
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.HashedModuleIdsPlugin(),
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
    new UglifyJsPlugin({ sourceMap: true }),
    new ManifestPlugin({
      fileName: 'asset-manifest.json',
    }),
    new SWPrecacheWebpackPlugin({
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      filename: 'service-worker.js',
      logger(message) {
        if (message.indexOf('Total precache size is') === 0) return;
        if (message.indexOf('Skipping static resource') === 0) return;

        console.log(message);
      },
      minify: true,
      navigateFallback: '/index.html',
      staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
    }),
  ],
};
/* eslint-enable no-console */
