import path from 'path';

import logger from '../utils/logger';
import program from './command_helper';

let config = {};

let configFile = path.join(__dirname, '../', 'config/config.js');

if (program.config) {
  configFile = program.config;
}

function loadConfig(configFile) {
  try {
    config = require(configFile);
  } catch (e) {
    if (configFile !== path.join(__dirname, '../', 'config/config.js')) {
    	logger.warn(`config not found ${configFile} attempting example`);
      loadConfig(path.join(__dirname, '../', 'config/config.js'));
    }
  }
}

loadConfig(configFile);

export default config;
