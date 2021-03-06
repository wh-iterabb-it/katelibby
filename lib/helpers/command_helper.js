const program = require('commander');

const pkg = require('../package.json');

program
  .version(pkg.version)
  .option('--config <path>', 'set config path')
  .option('--debug', 'debug flag to display debug in stdout')
  .parse(process.argv);

module.exports.default = program;
