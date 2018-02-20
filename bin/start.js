// @flow
/* eslint-disable no-console */
process.env.NODE_ENV = 'development';

import chalk from 'chalk';
import config from '../config';
import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackConfig from '../config/webpack/webpack.dev.config';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

let isDone = false;
const app = express();
const { output: { publicPath } } = webpackConfig;
const webpackCompiler = webpack(webpackConfig);

console.log(chalk.blue('[React-Boilerplate] Setting up a development environment...'));

app.use(
  webpackDevMiddleware(webpackCompiler, {
    logLevel: 'silent',
    publicPath,
  }),
);

app.use(
  webpackHotMiddleware(webpackCompiler, {
    reload: true,
  }),
);

app.use('*', (req, res, next) => {
  const filename = path.join(webpackCompiler.outputPath, 'index.html');

  webpackCompiler.outputFileSystem.readFile(filename, (err, result) => {
    if (err) return next(err);

    res.set('content-type', 'text/html');
    res.send(result);
    return res.end();
  });
});

webpackCompiler.plugin('done', () => {
  if (!isDone) {
    isDone = true;

    app.listen(config.port, () => {
      console.log(
        chalk.green(
          `[React-Boilerplate] Server successfully started at: http://${config.host}:${
            config.port
          }`,
        ),
      );
    });
  }
});
/* eslint-enable no-console */
