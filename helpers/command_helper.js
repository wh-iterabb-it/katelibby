import program from 'commander';

const pkg = require('../package.json');

program
  .version(pkg.version)
  .option('--config <path>', 'define config path')
  .parse(process.argv);

export default program;
