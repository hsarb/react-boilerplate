// @flow
/* eslint-disable no-console */
process.env.NODE_ENV = 'production';

import chalk from 'chalk';
import config from '../config';
import fs from 'fs-extra';
import webpack from 'webpack';
import webpackConfig from '../config/webpack/webpack.prod.config';

function build() {
  console.log(chalk.blue('[React-Boilerplate] Creating a production build...'));

  const webpackCompiler = webpack(webpackConfig);

  return new Promise((resolve, reject) => {
    webpackCompiler.run((err, stats) => {
      if (err) return reject(err);

      const messages = stats.toJson();

      if (messages.errors.length) return reject(new Error(messages.errors.join('\n')));

      return resolve();
    });
  });
}

async function clean() {
  console.log(chalk.blue('[React-Boilerplate] Cleaning build directory...'));

  await fs.emptyDirSync(config.paths.build);
}

function compile() {
  return Promise.resolve()
    .then(() => clean())
    .then(() => build())
    .then(() => {
      console.log(chalk.green('[React-Boilerplate] Build successfully compiled!'));
      console.log(chalk.green('[React-Boilerplate] Check the ./build directory'));
    })
    .catch(error => {
      console.log(chalk.green('[React-Boilerplate] Build encountered an error!'));
      console.log(chalk.red(error));
    });
}

compile();

/* eslint-enable no-console */
