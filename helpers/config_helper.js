import path from 'path';

import logger from '../utils/logger';
import program from './command_helper';

let config = {};

let configFile = path.join(__dirname, '../', 'config/config.js');

if (program.config) {
  configFile = program.config;
}

try {
  config = require(configFile);
  logger.debug('configuration loaded...');
  logger.debug(`loading configuration from ${configFile}...`);
} catch (e) {
  logger.error(`config not found ${configFile}`);
}

export default config;
