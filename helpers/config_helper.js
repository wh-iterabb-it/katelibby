import program from 'commander';

let configFile = '../config/config';

program
  .version('0.0.1')
  .option('--config <path>', 'set config path')
  .parse(process.argv);

// load config file
if (program.config) {
  configFile = program.config;
}

// load config file
const config = require(configFile);

export default config;
