// @flow
/* eslint-disable no-console */
process.env.NODE_ENV = 'test';

import chalk from 'chalk';
import jest from 'jest';

const argv = process.argv.slice(2);

if (argv.indexOf('--integration') >= 0) {
  console.log(chalk.blue('[React-Boilerplate] Running integration tests...'));

  argv.splice(argv.indexOf('--integration'), 1);
  argv.push(`--config=./config/test/jest.integration.config.js`);
} else {
  console.log(chalk.blue('[React-Boilerplate] Running unit tests...'));

  argv.push(`--config=./config/test/jest.unit.config.js`);
}

jest.run(argv).then(() => {
  console.log(chalk.green('[React-Boilerplate] Test run complete!'));
});
