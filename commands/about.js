import pkjson from '../package.json';
import toHHMMSS from '../utils/format';
import logger from '../utils/logger';
import config from '../helpers/config_helper';

module.exports = (args) => {
  if (typeof args !== 'undefined') {
    switch (args) {
      case 'help':
      default: 
        return Promise.resolve('About this bot, will return \r\n' +
          'Syntax is ' + config.commandChar + 'about');
    }
  } else {
  	const time = process.uptime();
    const uptime = toHHMMSS(time + '');
  	const response = `About this Bot\r\nVersion: ${pkjson.version}\r\nTotal Uptime of Bot: ${uptime}`;
  	return Promise.resolve(response);
  }
};
