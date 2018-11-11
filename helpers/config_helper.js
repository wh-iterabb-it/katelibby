const path = require('path');

const logger = require('../utils/logger');
const program = require('./command_helper');

let config = {};

let configFile = path.join(__dirname, '../', 'config/config.js');

if (program.config) {
  configFile = program.config;
}

function loadConfig(configPath) {
  try {
    config = require(configPath);
  } catch (e) {
    if (configPath !== path.join(__dirname, '../', 'config/config.js.example')) {
    	logger.info(`config not found ${configPath} attempting example`);
      loadConfig(path.join(__dirname, '../', 'config/config.js.example'));
    }
  }
}

loadConfig(configFile);

export default config;
