const path = require('path');

const logger = require('../utils/logger').default;

let config = {};

const configFile = path.join(__dirname, '../', 'config/config.js');

function loadConfig(configPath) {
  try {
    config = require(configPath);
  } catch (e) {
    if (configPath !== path.join(__dirname, '../../', 'config/config.js.example')) {
    	logger.info(`config not found ${configPath} attempting example`);
      loadConfig(path.join(__dirname, '../../', 'config/config.js.example'));
    }
  }
}

loadConfig(configFile);

module.exports.default = config;
